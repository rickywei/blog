# 智能指针

## 智能指针作用

1. 解决内存泄漏
   1. 保证堆上的对象一定会被释放，任何智能指针不应指向非堆内存，因为非堆内存不能delete
2. 本质RAII，使用对象管理资源，构造时获取资源，析构时释放
3. 两种模型
   1. 所有权
   2. 引用计数

## auto_ptr

1. auto_ptr使用所有权模型
2. deprecated
   1. 存在潜在风险，因为失去所有权的auto_ptr指向空

```cpp
auto_ptr<int> p1(new int(1));
auto_ptr<int> p2 = p1;  // p1 loss ownership
cout << *p1 << endl; //segment fault

 unique_ptr<int> p1(new int(1));
unique_ptr<int> p2;   // compile error, no copy constructor, no operator=
```

## unique_ptr

1. `unique_ptr`用来代替auto_ptr
2. `unique_ptr`支持移动语义

```cpp
unique_ptr<int> f() {
  unique_ptr<int> tmp(new int(1));
  return tmp;
}
```

## share_ptr weak_ptr

1. `shared_ptr`引用计数模型
2. `weak_ptr`是一种弱引用，不增加或减少引用计数
3. 问题
   1. `shared_ptr`可能造成循环引用，需要使用`weak_ptr`解决
   2. 不应用一个`raw pointer`初始化多个`shared_ptr`，会造成double free问题，因为此时有多个引用计数且都为1
   3. `this`指针也是`raw pointer`，在类中若想将`this`传递应该继承`enable_shared_from_this`
   4. 在调用`shared_from_this()`前应确保对象被`shared_ptr`持有，而不是一个`raw pointer`或`raw objector`，否则相当于调用`this`初始化多个`shared_ptr`

```cpp
class B;

class A {
 public:
  shared_ptr<B> b_;
  ~A() { cout << "~A()" << endl; }
};

class B {
 public:
  shared_ptr<A> a_; // both reference count reduced from 2 to 1 but not 0
//   weak_ptr<A> a_; // output ~A() ~B()
  ~B() { cout << "~B()" << endl; }
};

int main() {
  shared_ptr<A> a = make_shared<A>();
  shared_ptr<B> b = make_shared<B>();
  a->b_ = b;
  b->a_ = a;
  return 0;
}

//
class A : public enable_shared_from_this<A> {
 public:
  void Add2v(vector<shared_ptr<A>> &v) { v.push_back(shared_from_this()); }
};

int main() {
  vector<shared_ptr<A>> v;
  A a;
  a.Add2v(v);  // error

  shared_ptr<A> sp = make_shared<A>();
  sp->Add2v(v);  // ok
  return 0;
}
```

## 多线程和引用计数

1. 智能指针的类通常实现为一个指向对象的指针和一个指向引用计数的指针，两者的读写不是原子的
2. 智能指针线程安全级别等于built-in type
3. 多个线程访问同一个`shared_ptr`实例本身，需要加锁
4. 多个线程访问同一个`shared_ptr`实例副本，不需要加锁
