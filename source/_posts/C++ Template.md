---
title: C++ Template
date: 2020-01-07 22:19:09
update:
tags: [C++]
categories: [C++]
description: C++ Template and generic programming
---

## 编写类型无关的代码

1. 模板中的函数参数是`const`引用
   1. 保证函数可用于不能拷贝的类型
2. 函数体中的条件判断仅使用`<`或`less`比较运算
3. 尽量减少对实参类型的要求
4. 当使用模板时，所有不依赖于模板参数的名字都必须是可见的，
   当模板实例化时，模板的定义，包括类模板的成员的定义，也必须是可见的

## 模板实参推断

### 函数模板显式实参

有时编译器无法推断出模板实参类型，有时用户希望控制模板实例化

```cpp
template <typename T1, typename T2, typename T3>
T1 sum(T2, T3);

// T1 类型无法推断，需要显式指定
auto ret = sum<int>(1, 2);

// 显示模板实参由左至右顺序与对应的模板参数匹配，只有最右边参数的显示模板实参才可以忽略(可推断出的前提下)
// 下面模板需显示指定所有三个模板参数
template <typename T1, typename T2, typename T3>
T3 sum(T2, T1);
auto ret = sum<long long, int, long>(i, lng);
```

### 尾置返回类型与类型转换

```cpp
template <typename It>
auto fcn(It beg, It end) -> decltype(*beg)
{
    return *beg; //返回序列中一个元素的引用
}
```

### 从左值引用函数参数推断类型

当一个函数参数是模板类型参数的一个普通（左值）引用时（T&），只能传递给它一个左值；
实参可以是 const 类型，也可以不是，如果实参是const的，则T被推断为const类型

### 从右值引用函数参数推断类型

当一个函数参数是一个右值引用时（T&&），可传递给它一个右值，推断过程类似普通左值引用函数参数推断过程

### 引用折叠和右值引用参数

当我们将一个左值传递给函数的右值引用参数，且该右值引用只想模板类型参数（如T&&）时，编译器推断模板
类型参数为实参的左值引用类型，当调用`template<typename T>void f(T&&); f(i)`时，编译器推断T的类型
为`int&`而非 int

T 被推断为 T& 看起来像是 f3 的函数参数应该是一个类型 int& 的右值引用，通常不能直接定义一个引用的引用
但可以通过类型别名或模板类型参数间接定义

如果我们间接创建一个引用的引用，则这些引用形成**折叠**，引用会折叠成一个普通的左值引用类型，
只有右值引用的右值引用会折叠成右值引用

`T& & / T& && / T&& & -> T&`

`T&& && -> T&&`

1. 如果一个函数参数是一个只想模板类型参数的右值引用，则它可以被绑定到一个左值，且
2. 如果实参是一个左值，则推断出的模板实参类型将是一个左值引用，且函数参数将被实例化为一个（普通）
   左值医用参数（T&）
3. 以上两条规则暗示，可以将任意类型的实参传递给 T&& 类型的函数参数

```cpp
template <typename T>
void f(T &&val)
{
    T t = val; //当val是右值时，t是int类型
               //当val是左值时，t是int&
}
```

### std::move

```cpp
template <typename T>
typename remove_reference<T>::type &&move(T &&t)
{
    return static_cast<typename remove_reference<T>::type &&>(t);
}

string s1("hi"), s2;
s2 = std::move(string("bye")); //正确，从一个右值移动数据
// 推断出 T 的类型为 string
// remove_reference 用 string 实例化
// remove_reference<string>::type 是 string
// move 的返回类型是 string&&
// move 的函数参数 t 的类型为 string&&
// string&& move(string &&t);

s2 = std::move(s1); //正确，但移动后，s1的值不确定
// 推断出 T 的类型为 string&
// remove_reference 用 string& 实例化
// remove_reference<string&>:: type 是 string
// move 的返回类型仍是 string&&
// move 的函数参数 t 实例化为 string&& 折叠为 string&
// string&& move(string &t);
```

### 转发

某些函数需要将其一个或多个实参连同类型不变地转发给其他函数，在此情况下，
需要保持被转发实参的所有性质，包裹实参类型是否是 const 的以及实参是左值还是右值

```cpp
template <typename F, typename T1, typename T2>
void flip1(F f, T1 t1, T2 t2) // 不完整的转发，顶层const和引用丢失
{
    f(t2, t1);
}

void f(int v1, int &v2)
{
    cout << v1 << " " << ++v2 << endl;
}

// 使用右值引用保持实参的所有类型信息
template <typename F, typename T1, typename T2>
void flip2(F f, T1 &&t1, T2 &&t2)
{
    f(t2, t1);
}
// 可工作于左值引用，但不能用于接受右值引用参数的函数
// 因为此时传递给 g 的参数 t2 和其他任意变量一样，是左值表达式
void g(int &&i, int &&j)
{
    cout << i << " " << j << endl;
}

// 使用 std::forward 保持类型信息
template <typename F, typename T1, typename T2>
void flip(F f, T1 &&t1, T2 &&t2)
{
    f(std::forward<T2>(t2), std::forward<T1>(t1)); //forward 必须显式指定类型
}
```

## 可变参数模板

一个可变参数模板就是一个可接受可变数目参数的模板函数或模板类。
可变数目的参数被称为**参数包**：1.模板参数包，表示0\*个模板参数 2.函数参数包，表示0\*个函数参数

```cpp
template <typename T, typename... Args>     //Args 表示零个或多个模板类型参数
void foo(const T &t, const Args &... rest); //rest 表示零个或多个函数参数

//sizeof... 可产看包中元素个数
```

### 编写可变参数函数模板

对于编写可变参数的函数，也可以使用`initializer_list`,但此时所有实参都具有相同的类型

对于可变参数函数，通常是递归的，为了终止递归，需要定义一个非可变参数的函数

```cpp
template <typename T>
ostream &print(ostream &os, const T &t)
{
    return os << t;
}

template <typename T, typename... Args>
ostream &print(ostream &os, const T &t, const Args &... rest)
{
    os << t << " ";
    return print(os, rest...); // 递归调用
}
```

### 包扩展

```cpp
template <typename T, typename... Args>
ostream &print(ostream &os, const T &t, const Args &... rest) // 扩展 Args
{
    os << t << " ";
    return print(os, rest...); // 扩展 rest
}

// 第一个扩展操作扩展模板参数包，为 print 生成函数参数列表，
// 将 const Arg& 引用到每个类型中
print(cout, i, s, 42);
// 实例化为
print(ostrean &, const int &, const string &, const int &);
// 第二个扩展操作出现在对 print 的调用中，为 print 调用生成实参列表

// 还可以对每个实参调用某个函数
template <typename... Args>
ostream &errorMsg(ostream &os, const Args &... rest)
{
    return print(os, debug_rep(rest)...);
}

errorMsg(cerr, e1, e2, e3);
//==
print(cerr, debug_rep(e1), debug_rep(e2), debug_rep(e3));
// print(os, debug_rep(rest...)); compile error
```

## 模板特例化

在某些情况下，通用模板的定义对特定类型不合适

```cpp
template <typename T>
int compare(const T &, const T &);

template <size_t N, size_t M>
int compare(const char (&)[N], const char (&)[M]);
// 只有给compare一个字符串字面常量或数组时，编译器才会调用第二个compare
//当传递字符指针时，会调用第一个

// 此时需要模板特例化处理字符指针（而不是数组）
template <> // <>
int compare(cosnt char *const &p1, const char *const &p2)
{
    return strcmp(p1, p2);
}

// 类模板特里化
namespace std
{
    template<>
    struct hash<MyClass>
    {
    }
}
```
