---
title: C++ 宏
date: 2019-12-29 20:51:13
update:
tags: [C,C++]
categories: [C++]
description: 宏
---

## 宏

宏定义`#define` 将一个标识符定义为一个字符串，宏处理（宏展开）发生在预处理阶段

### 宏就是简单替换

```cpp
//simple macro
//#define <macro name> <string>
#define PI 3.14

//macro with parameter
//#define <macro name> (<parameter list>) <body>
#define A(x) x

#define SQUARE(X) X * X
int tmp = SQUARE(3 + 3); //tmp=3+3*3+3=15
//to get 6*6
#define SQUARE(X) ((X) * (X)) //SQUARE((3+3)*(3+3))
```

### 宏定义的特点

1. 宏一般用大写，且末尾不加分号
2. 宏定义的参数无类型，不做语法检查，不做表达式求解，只替换
3. 宏定义通常在文件开头，可用 \#undef 宏名 终止
4. 宏定义可嵌套，但 " " 中永远不包含宏

### 宏定义的三个特殊符号

```cpp
// # 给x加双引号
//char* str = ToString(123132); -> str="123132";
#define ToString(x) #x

// ## 连接xy
//int n = Conn(123,456); -> n=123456; char* str = Conn("asdf", "adf"); -> str = "asdfadf";
#define Conn(x, y) x##y

// #@ 给x加上单引号，结果返回是一个const char
//char a = ToChar(1); -> a='1';
#define ToChar(x) #@ x
```

### do...while(0)在宏中的技巧

```cpp
#define foo(x) do{
      statement one;
      statement two;
  }while (0)

#define foo(x) {
      statement one;
      statement two;
  }

//do...while(0) 将宏定义为一个非复合语句,可用于如下情况
if(condition)
  foo(x);
else
  ...;
```

### 预定义的宏名

```cpp
    __LINE__ //当前行号
    __FILE__ //当前源文件名
    __DATE__ //编译日期
    __TIME__ //编译时间
    __STDC__ //当要求程序严格遵守ANSI C标准时赋值为1
    __cplusplus //当编写C++程序时该标识被定义
```
