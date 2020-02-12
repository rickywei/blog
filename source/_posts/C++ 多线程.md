---
title: C++ 多线程
date: 2020-01-16 22:03:18
update:
tags: [C++, Multithreading]
categories: [C++]
description: C++ Multithreading
---

## 线程管理

1. 每个程序至少有一个线程：`main()`

### 启动线程

```cpp
#include <thread>
#include <utility>

std::thread t1; // t1 is not a thread
std::thread t2(f1, n + 1); // pass by value
std::thread t3(f2, std::ref(n)); // pass by reference
std::thread t4(std::move(t3)); // t4 is now running f2(). t3 is no longer a thread
std::thread t5(&foo::bar, &f); // t5 runs foo::bar() on object f
std::thread t6(b); // t6 runs baz::operator() on object b
```

### 等待线程完成

1. 如果打算等待对应线程，则需要细心挑选调用join()的位置。当在线程运行
之后产生异常，在join()调用之前抛出，就意味着这次调用会被跳过。
2. 一种方式是使用“资源获取即初始化方式”(RAII，Resource Acquisition Is Initialization)，并且提供一
个类，在析构函数中使用join()

```cpp
class thread_guard
{
    std::thread &t_;

public:
    explicit thread_guard(std::thread &t) : t_(t) {}
    ~thread_guard()
    {
        if (t_.joinable()) //join()只能join一次，否则错误，所以先判断
        {
            t_.join();
        }
    }
    thread_guard(thread_guard const &) = delete;
    thread_guard &operator=(thread_guard const &) = delete;
};

int main()
{
    //other variables
    std::thread t(a_func);
    thread_guard g(t); //最后声明的变量最先被销毁
    return 0;
}
```

### 后台运行线程

1. 使用`detach()`会让线程在后台运行，这就意味着主线程不能与之产生直接交互，不会等待这个线程结束
2. 如果线程分离，那么就不可能有 `std::thread` 对象能引用它
3. 调用 `std::thread` 成员函数`detach()`来分离一个线程，并且这个线程也无法加入

### 向线程函数传递参数

1. 线程构造时默认拷贝参数

```cpp
//最基本用法
void f(int i, std::string const& s);
std::thread t(f, 3, "hello");

//传递引用
void f(int &a);
int a;
std::thread(f, std::ref(a));
```

### 转移线程所有权

1. `std::thread` 是资源占有(resource-owning)类型，可移动，但不可拷贝

```cpp
std::thread t1(some_function); //
std::thread t2=std::move(t1); //
t1=std::thread(some_other_function); // 因为，所有者是一个临时对象——移动操作将会隐式的调用。
std::thread t3; //
t3=std::move(t2); //
t1=std::move(t3); //此时t1已经有相关联的线程，这里系统调用std::terminate() 终止程序继续运行
```

### 运行时决定线程数量

1. `std::thread::hardware_concurrency()`返回能并发在一个程序中的线程数量

### 标识线程

1. 线程标识类型为 `std::thread::id`
   1. 可以通过调用 `std::thread` 对象的成员函数 `get_id()` 来直接获取
   2. 当前线程中调用 `std::this_thread::get_id()`
2. 如果两个对象的 `std::thread::id` 相等，那它们就是同一个线程，或者都“无线程”

## 线程间共享数据

### 使用互斥量保护共享数据

1. C++中通过实例化 `std::mutex` 创建互斥量实例，通过成员函数`lock()`对互斥量上锁，`unlock()`进行解锁
2. 实践中不推荐直接去调用成员函数，调用成员函数就意味着，必须在每个函数出口都要去调用`unlock()`，也包括异常的情况
3. C++标准库为互斥量提供了一个**RAII**语法的模板类 `std::lock_guard` ，在构造时就能提供已锁的互斥量，并
   在析构的时候进行解锁，从而保证了一个已锁互斥量能被正确解锁
4. 某些情况下使用全局mutex变量没问题，但在大多数情况下，互斥量通常会与需要保护的数据放在同一类中，
   而不是定义成全局变量
5. **Note**当其中一个成员函数返回的是保护数据的指针或引用时，
   会破坏数据。具有访问能力的指针或引用可以访问(并可能修改)被保护的数据，而不会被互斥锁限制

```cpp
class cls
{
    std::mutex m_;
    int n_;

public:
    void increase()
    {
        std::lock_guard<std::mutex> gurad(m_);
        n_++;
    }
};
```

### 死锁及解决方案

1. 避免死锁的一般建议
   1. 避免嵌套锁
   2. 避免在持有锁时调用用户提供的代码
   3. 使用固定顺序获取锁
   4. 使用锁的层次结构
2. `std::lock` 可以一次性锁住多个(两个以上)的互斥量，并且没有副作用(死锁风险)
3. `std::scoped_lock<>` 是一个RAII类型模板类型，与 std::lock_guard<> 的功能等价，这个新类型能接受不定数量的互斥量类型作为模板参数，以及相应的互斥量(数量和类型)作为构造参数。互斥量支持构造即上锁，与 std::lock 的用法相同，其解锁阶段是在析构中进行
4. `std::unqiue_lock` 使用更为自由的不变量，这样`std::unique_lock` 实例不会总与互斥量的数据类型相关，使用起来要比 `std:lock_guard` 更加灵活
   1. 可将 `std::adopt_lock` 作为第二个参数传入构造函数，对互斥量进行管理；也可以将 `std::defer_lock` 作为第二个参数传递进去，表明互斥量应保持解锁状态
   2. 这样，就可以被 `std::unique_lock` 对象(不是互斥量)的`lock()`函数所获取，或传递 `std::unique_lock` 对象到 `std::lock()` 中

```cpp
class cls
{
    std::mutex m_;
    int n_;

public:
    cls(int n) : n_(n) {}
    friend void myswap(cls &l, cls &r);
};

void myswap(cls &l, cls &r)
{
    if (&l == &r)
        return;
    std::lock(l.m_, r.m_);
    std::lock_guard<std::mutex> Lock_l(l.m_, std::adopt_lock);
    std::lock_guard<std::mutex> Lock_r(r.m_, std::adopt_lock);
    std::swap(l.n_, r.n_);
}

// std::scoped_lock<>
void myswap(cls &l, cls &r)
{
    if (&l == &r)
        return;
    std::scoped_lock<std::mutex, std::mutex> guard(l.m_, r.m_);
    std::swap(l.n_, r.n_);
}

// std::unique_lock
void myswap(cls &l, cls &r)
{
    if (&l == &r)
        return;
    std::unique_lock<std::mutex> Lock_l(l.m_, std::defer_lock);
    std::unique_lock<std::mutex> Lock_r(r.m_, std::defer_lock);
    std::lock(Lock_l, Lock_r);
    std::swap(l.n_, r.n_);
}
```