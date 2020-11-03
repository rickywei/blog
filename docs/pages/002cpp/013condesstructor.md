# 构造与析构函数

## 默认构造析构函数

1. 若无自己声明的任意以下`constructor`，编译器默认以`inline`方式声明以下构造函数
   1. `default constructor`
   2. `copy constructor`
   3. `copy assignment operator`
   4. `move constructor`
   5. `move assigment operator`
2. 若无自己声明`destructor`，编译器默认自己生成
3. 同时编译器会生成
   1. `Class* operator&()`
   2. `const Class* operator&()`

## 构造函数

1. 默认构造函数可初始化
   1. 若有类内初始化值，则按此舒适化成员
   2. 调用成员对象的默认构造函数
2. 构造函数初始化顺序
   1. 虚基类
   2. 非虚基类
   3. 对象成员
   4. 类自身构造
3. 初始化列表中，变量被初始化的顺序决定于该变量在类中声明的位置
4. `const`成员必须在初始化列表中
5. `static`成员必须在类外初始化

```cpp
class A {
 public:
  A() { cout << "A constructor" << endl; }
  ~A() { cout << "A destructor" << endl; }
};

class B {
 public:
  B() { cout << "B constructor" << endl; }
  ~B() { cout << "B destructor" << endl; }
};

class C {
 public:
  C() { cout << "C constructor" << endl; }
  ~C() { cout << "C destructor" << endl; }
};

class D : public B, public C, public virtual A {};

int main() {
  D d;
  return 0;
}
// A constructor
// B constructor
// C constructor
// C destructor
// B destructor
// A destructor
```

## 虚析构函数

1. 析构函数应声明为虚函数，这样可以动态绑定真正的虚函数
2. 构造函数不能为虚函数
   1. 创建对象时必须知道对象实际类型，虚函数行为是运行期间确定类型
   2. 虚函数依赖于虚函数表，构造对象期间虚函数表还未完全初始化
