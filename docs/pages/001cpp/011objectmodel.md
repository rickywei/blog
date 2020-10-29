# C++对象模型

## 类的大小

1. 空类占1B
   1. 编译器添加1B，目的是让该类可以实例化，因为实例化其实就是分配地址，若为0无法分配
2. 类的数据按类型和字节对齐占用空间
   1. 结构体变量的首地址能够被其最宽基本类型成员的大小所整除
   2. 结构体每个成员相对于结构体首地址的偏移量都是成员大小的整数倍，如有需要编译器会在成员之间加上填充字节
   3. 结构体的总大小为结构体最宽基本类型成员大小的整数倍，如有需要编译器会在最末一个成员之后加上填充字节
3. 类的普通函数不占字节
4. 类的虚函数不占字节，但是会引入虚表指针，整个类占8B(该类仅包含一个虚函数)

```cpp
class Base {
  int a;
  double b;
  void func(int a, int b) {}
};

// g++ -fdump-lang-class base.cc
// Class Base
//    size=16 align=8
//    base size=16 base align=8
// Base (0x0x7fe8a9e11420) 0

class Derived : public Base {
  char c;
};
// Class Derived
//    size=24 align=8
//    base size=17 base align=8
// Derived (0x0x7f23bcd1e548) 0
//   Base (0x0x7f23bce0c4e0) 0
```

## 虚函数

1. 每个类都有一个虚函数表，存放虚函数指针
2. 若子类重写虚函数，函数指针变化
   1. 重载：函数名相同，函数的参数个数、参数类型或参数顺序三者中必须至少有一种不同
   2. 重定义：也叫做隐藏，子类重新定义父类中有相同名称的非虚函数 ( 参数列表可以不同 ) ，指派生类的函数屏蔽了与其同名的基类函数
   3. 重写：也叫做覆盖，一般发生在子类和父类继承关系之间，子类重新定义父类中有相同名称和参数的虚函数 override
3. 子类虚函数表和基类相同，正因如此，子类的指针slice为基类指针时仍然能正确访问虚函数表
4. g++ 中vtable位于类的开始，然后基类成员变量，最后子类成员变量
5. g++ 中vptr同样位于类的开始
6. 当添加虚析构函数后，vtable有两个析构函数
   1. complete object destructor，只执行析构函数不delete()
   2. deleting destructor，真正delete()

```cpp
class Base {
  int a;
  double b;
  void func() {}
  virtual void vfunc() {}
  virtual void vfunc(int a) {cout << "Base" << a << endl;}
};

class Derived : public Base {
  char c;
  virtual void vfunc(int a) override {cout << "Derived" << a << endl;}
};
// Vtable for Base
// Base::_ZTV4Base: 4 entries
// 0     (int (*)(...))0
// 8     (int (*)(...))(& _ZTI4Base)
// 16    (int (*)(...))Base::vfunc
// 24    (int (*)(...))Base::vfunc

// Class Base
//    size=24 align=8
//    base size=24 base align=8
// Base (0x0x7fe98a7be420) 0
//     vptr=((& Base::_ZTV4Base) + 16)

// Vtable for Derived
// Derived::_ZTV7Derived: 4 entries
// 0     (int (*)(...))0
// 8     (int (*)(...))(& _ZTI7Derived)
// 16    (int (*)(...))Base::vfunc
// 24    (int (*)(...))Derived::vfunc

// Class Derived
//    size=32 align=8
//    base size=25 base align=8
// Derived (0x0x7fe98a6d0548) 0
//     vptr=((& Derived::_ZTV7Derived) + 16)
//   Base (0x0x7fe98a7be5a0) 0
//       primary-for Derived (0x0x7fe98a6d0548)


// use address to call vfunc
Base b;
Derived d;
typedef void (*Func)(int);
typedef void (*Func2)(Base *, int);
void *vptr_addr = (void *)*((size_t *)(&d));
void *func_addr = (void *)*((size_t *)vptr_addr + 1);
Func f = (Func)func_addr;
f(666); // Derived-1965035432
Func2 f2 = (Func2)func_addr;
f2(&b, 777); // Derived777, since addr is from d
f2(&d, 888); // Derived888
// (gdb) p d
// $1 = (Derived) {
//   <Base> = {
//     _vptr.Base = 0x555555557d60 <vtable for Derived+16>, 
//     a = 99, 
//     b = 6.9533558074397518e-310
//   }, 
//   members of Derived: 
//   c = 65 'A'
// }
// (gdb) info vtbl d
// vtable for 'Derived' @ 0x555555557d60 (subobject @ 0x7fffffffe0a0):
// [0]: 0x5555555552d6 <Derived::vfunc()>
// [1]: 0x55555555530e <Derived::vfunc(int)>

//typeinfo
Derived d;
typedef void (*Func)();
Func *f = (Func *)*(size_t *)(&d);
f--;
type_info *td = (type_info *)(*f);
cout << td->name() << endl; // 7Derived
  
// add virtual destructor
class Base {
 public:
  int a = 99;
  double b;
  void func() {}
  virtual void vfunc() { cout << "B" << endl; }
  virtual void vfunc(int a) { cout << "Base" << a << endl; }
  virtual ~Base(){};
};
// Vtable for Base
// Base::_ZTV4Base: 6 entries
// 0     (int (*)(...))0
// 8     (int (*)(...))(& _ZTI4Base)
// 16    (int (*)(...))Base::vfunc
// 24    (int (*)(...))Base::vfunc
// 32    (int (*)(...))Base::~Base
// 40    (int (*)(...))Base::~Base
```

## 多继承

1. 非菱形
   1. 子类的虚函数放在生命的第一个基类对的虚函数表中
   2. 成员变量按父类被声明顺序排序，接着是子类成员变量
2. 菱形
   1. 假设有B,B1(B),B2(B),D(B1,B2)那么B的成员会被D继承两次，产生歧义
   2. 使用虚继承
      1. 虚继承的子类，如果本身定义了新的虚函数，则编译器为其生成一个虚函数指针（vptr）以及一张虚函数表，该vptr位于对象内存最前面；非虚继承直接扩展父类虚函数表
      2. 虚继承的子类也单独保留了父类的vprt与虚函数表，这部分内容接与子类内容以一个四字节的0来分界
      3. 虚继承的子类对象中，含有四字节的虚表指针偏移值