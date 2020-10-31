# C++对象模型

## 字节对齐

1. 结构体变量的首地址能够被其最宽基本类型成员的大小所整除
2. 结构体每个成员相对于结构体首地址的偏移量都是成员大小的整数倍，如有需要编译器会在成员之间加上填充字节
3. 结构体的总大小为结构体最宽基本类型成员大小的整数倍，如有需要编译器会在最末一个成员之后加上填充字节

## 类的大小

1. 空类占1B
   1. 编译器添加1B，目的是让该类可以实例化，因为实例化其实就是分配地址，若为0无法分配
2. 类的普通函数不占字节
3. 类的虚函数不占字节，但是会引入虚表指针，占一个指针的大小
4. 类的函数存放在代码区，同一个类的各个实例公用，调用时会隐式传递`this`指针

```cpp
class A {
 public:
  int a;
};

class B : public A {
 public:
  int b;
};

// Class A
//    size=4 align=4             <- total size and align
//    base size=4 base align=4   <- size for class A when it is a base class and align
// A (0x0x7f6c6a9e6420) 0

// Class B
//    size=8 align=4
//    base size=8 base align=4
// B (0x0x7f6c6a8f8548) 0
//   A (0x0x7f6c6a9e6480) 0
```

## 虚函数

1. 每个类都有一个`vptr`指向虚函数表（指针数组），虚函数表存放虚函数指针
2. 子类复用基类虚函数表
3. 若子类重写虚函数，函数指针变化
   1. 重载：函数名相同，函数的参数个数、参数类型或参数顺序三者中必须至少有一种不同
   2. 重定义：也叫做隐藏，子类重新定义父类中有相同名称的非虚函数 ( 参数列表可以不同 ) ，指派生类的函数屏蔽了与其同名的基类函数
   3. 重写：也叫做覆盖，一般发生在子类和父类继承关系之间，子类重新定义父类中有相同名称和参数的虚函数 override
4. g++ 中`vtable`位于类的开始，然后基类成员变量，最后子类成员变量
5. g++ 中`vptr`同样位于类的开始
6. 当添加虚析构函数后，vtable有两个析构函数
   1. complete object destructor，只执行析构函数不delete()
   2. deleting destructor，真正delete()

```cpp
class A {
 public:
  int a;
  virtual void vf() { cout << "A" << endl; }
};

class B : public A {
 public:
  int b;
  virtual void vf() { cout << "B" << endl; }
};
// Vtable for A
// A::_ZTV1A: 3 entries
// 0     (int (*)(...))0            <- top_offset
// 8     (int (*)(...))(& _ZTI1A)   <- RTTI
// 16    (int (*)(...))A::vf        <- vptr point here

// Class A
//    size=16 align=8
//    base size=12 base align=8
// A (0x0x7fc704efa420) 0
//     vptr=((& A::_ZTV1A) + 16)

// Vtable for B
// B::_ZTV1B: 3 entries
// 0     (int (*)(...))0
// 8     (int (*)(...))(& _ZTI1B)
// 16    (int (*)(...))B::vf        <- B use same vptr of A

// Class B
//    size=16 align=8
//    base size=16 base align=8
// B (0x0x7fc704e0ca28) 0
//     vptr=((& B::_ZTV1B) + 16)
//   A (0x0x7fc704efaae0) 0
//       primary-for B (0x0x7fc704e0ca28)


// use address to call vfunc
A a;
B b;
typedef void (*Func)();
Func vf = *(Func *)*(size_t *)(&b);
vf();

//typeinfo
Func *f = (Func *)*(size_t *)(&b);
f--;
type_info *ti = (type_info *)(*f);
cout << ti->name() << endl;
  
// add virtual destructor
class A {
 public:
  int a;
  virtual void vf() { cout << "A" << endl; }
  virtual ~A() {}
};
// Vtable for A
// A::_ZTV1A: 5 entries
// 0     (int (*)(...))0
// 8     (int (*)(...))(& _ZTI1A)
// 16    (int (*)(...))A::vf
// 24    (int (*)(...))A::~A
// 32    (int (*)(...))A::~A

// Class A
//    size=16 align=8
//    base size=12 base align=8
// A (0x0x7fdbd9e9b420) 0
//     vptr=((& A::_ZTV1A) + 16)
```

## 多继承

### 普通多继承（非菱形）

1. 成员变量按父类被声明顺序排序，接着是子类成员变量
2. 子类的虚函数表只有一个，表项按父类被声明的顺序，中间隔开
3. top_offset用于当从子类到基类的转换时改变`this`指针
4. 当子类重写父类虚函数时，会有thunk加入基类的虚函数表，指向对应的子类虚函数

![vtable1](./img/vtable-Page-1.png)

```cpp
class A {
 public:
  int a;
  virtual void vfa() { cout << "A" << endl; }
};

class B {
 public:
  int b;
  virtual void vfb() { cout << "B" << endl; }
};

class C : public A, public B {
 public:
  int c;
  virtual void vfc() { cout << "C" << endl; }
};
// Vtable for C
// C::_ZTV1C: 7 entries
// 0     (int (*)(...))0
// 8     (int (*)(...))(& _ZTI1C)
// 16    (int (*)(...))A::vfa
// 24    (int (*)(...))C::vfc
// 32    (int (*)(...))-16          <- top_offset means the distance to change from B to C
// 40    (int (*)(...))(& _ZTI1C)
// 48    (int (*)(...))B::vfb

// Class C
//    size=32 align=8
//    base size=32 base align=8
// C (0x0x7fd3d9bf4e00) 0
//     vptr=((& C::_ZTV1C) + 16)
//   A (0x0x7fd3d9a34ba0) 0
//       primary-for C (0x0x7fd3d9bf4e00)
//   B (0x0x7fd3d9a34c00) 16
//       vptr=((& C::_ZTV1C) + 48)

// override
class C : public A, public B {
 public:
  int c;
  virtual void vfb() override { cout << "CB" << endl; }
  virtual void vfc() { cout << "C" << endl; }
};
// Vtable for C
// C::_ZTV1C: 8 entries
// 0     (int (*)(...))0
// 8     (int (*)(...))(& _ZTI1C)
// 16    (int (*)(...))A::vfa
// 24    (int (*)(...))C::vfb
// 32    (int (*)(...))C::vfc
// 40    (int (*)(...))-16
// 48    (int (*)(...))(& _ZTI1C)
// 56    (int (*)(...))C::_ZThn16_N1C3vfbEv  <- thunk/vcall_offset, point to the overrided function
```

### 菱形

1. 假设有A,B(A),C(A),D(B,C)那么A的成员会被D继承两次，产生歧义
   1. `d.a = 1; //wrong`
   2. `d.B::a = 1; d.C::a = 1; //right`

```cpp
class A {
 public:
  int a;
  virtual void vfa() { cout << "A" << endl; }
};

class B : public A {
 public:
  int b;
  virtual void vfb() { cout << "B" << endl; }
};

class C : public A {
 public:
  int c;
  virtual void vfc() { cout << "C" << endl; }
};

class D : public B, public C {
 public:
  int d;
  virtual void vfd() { cout << "D" << endl; }
};
// (gdb) set p pretty on
// (gdb) p d
// $1 = {
//   <B> = {
//     <A> = {
//       _vptr.A = 0x2, 
//       a = 1431655589                         <- int a; in B
//     }, 
//     members of B: 
//     b = 21845
//   }, 
//   <C> = {
//     <A> = {
//       _vptr.A = 0x7ffff7fe4530 <_dl_fini>, 
//       a = 0                                  <- int a; in C
//     }, 
//     members of C: 
//     c = 0
//   }, 
//   members of D: 
//   d = 1431655520
// }
```

1. 使用虚继承解决菱形继承问题
   1. 虚继承的子类，编译器为其生成一个虚函数指针（vptr）以及一张虚函数表，该vptr位于对象内存最前面；非虚继承直接扩展父类虚函数表
   2. VTT是所有vptr的集合
![vtable2](./img/vtable-Page-2.png)

```cpp
//virtual inherience
class A {
 public:
  int a;
  virtual void vfa() { cout << "A" << endl; }
};

class B : virtual public A {
 public:
  int b;
  virtual void vfb() { cout << "B" << endl; }
};

class C : virtual public A {
 public:
  int c;
  virtual void vfc() { cout << "C" << endl; }
};

class D : public B, public C {
 public:
  int d;
  virtual void vfd() { cout << "D" << endl; }
};
// $1 = {
//   <B> = {
//     <A> = {
//       _vptr.A = 0x555555557bf8 <vtable for D+96>, 
//       a = 0                                        <- only one int a;
//     }, 
//     members of B: 
//     _vptr.B = 0x555555557bb0 <vtable for D+24>, 
//     b = 1431655049
//   }, 
//   <C> = {
//     members of C: 
//     _vptr.C = 0x555555557bd8 <vtable for D+64>, 
//     c = 1431655749
//   }, 
//   members of D: 
//   d = 21845
// }

// Vtable for D
// D::_ZTV1D: 13 entries
// 0     32                         <- vbase_offset, distance from D to A(vptr of A)
// 8     (int (*)(...))0
// 16    (int (*)(...))(& _ZTI1D)
// 24    (int (*)(...))B::vfb       <- vptr of D && B
// 32    (int (*)(...))D::vfd
// 40    16
// 48    (int (*)(...))-16
// 56    (int (*)(...))(& _ZTI1D)
// 64    (int (*)(...))C::vfc       <- vptr of C
// 72    0
// 80    (int (*)(...))-32
// 88    (int (*)(...))(& _ZTI1D)
// 96    (int (*)(...))A::vfa       <- vptr of A

// Construction vtable for B (0x0x7fd0699bdbc8 instance) in D
// D::_ZTC1D0_1B: 8 entries
// 0     32
// 8     (int (*)(...))0
// 16    (int (*)(...))(& _ZTI1B)
// 24    (int (*)(...))B::vfb
// 32    0
// 40    (int (*)(...))-32
// 48    (int (*)(...))(& _ZTI1B)
// 56    (int (*)(...))A::vfa

// Construction vtable for C (0x0x7fd0699bdc30 instance) in D
// D::_ZTC1D16_1C: 8 entries
// 0     16
// 8     (int (*)(...))0
// 16    (int (*)(...))(& _ZTI1C)
// 24    (int (*)(...))C::vfc
// 32    0
// 40    (int (*)(...))-16
// 48    (int (*)(...))(& _ZTI1C)
// 56    (int (*)(...))A::vfa

// VTT for D
// D::_ZTT1D: 7 entries
// 0     ((& D::_ZTV1D) + 24)
// 8     ((& D::_ZTC1D0_1B) + 24)
// 16    ((& D::_ZTC1D0_1B) + 56)
// 24    ((& D::_ZTC1D16_1C) + 24)
// 32    ((& D::_ZTC1D16_1C) + 56)
// 40    ((& D::_ZTV1D) + 96)
// 48    ((& D::_ZTV1D) + 64)

// Class D
//    size=48 align=8
//    base size=32 base align=8
// D (0x0x7fd06ee23e00) 0
//     vptridx=0 vptr=((& D::_ZTV1D) + 24)
//   B (0x0x7fd0699bdbc8) 0
//       primary-for D (0x0x7fd06ee23e00)
//       subvttidx=8
//     A (0x0x7fd069aabc60) 32 virtual
//         vptridx=40 vbaseoffset=-24 vptr=((& D::_ZTV1D) + 96)
//   C (0x0x7fd0699bdc30) 16
//       subvttidx=24 vptridx=48 vptr=((& D::_ZTV1D) + 64)
//     A (0x0x7fd069aabc60) alternative-path
```
