---
title: C++ new与malloc区别
date: 2019-12-29 20:26:15
update:
tags: [C,C++]
categories: [C++]
description: new/delete 与 marrloc/free
---

## 本质不同

1. `new/delete` 是C++操作符，需要编译器支持
2. `malloc/free`是库函数，需要头文件支持

## 参数不同

1. `new` 操作符申请内存时无需指定内存块大小，编译器根据类型信息自动计算

   `int *p2 = new int[length];`
2. `malloc` 需要显示的指出所需内存大小

   `int *p1 = (int *)malloc(sizeof(int) * length);`

## 返回类型不同

1. `new`
   1. 成功：返回对象类型的指针，无须强制转化，是**类型安全**的操作符
   2. 失败：抛出`bad_alloc`异常
2. `malloc`
   1. 成功：返回`void*`指针，需要强制类型转换
   2. 失败：返回`NULL`

## 是否调用构造函数不同

1. `new`会自动调用类型的构造函数
2. `malloc`不调用，仅分配空间

## 是否能重新分配内存不同

1. `new`无对应重新分配操作
2. `malloc`分配后，可使用`relooc`重新分配内存，如果指针所指有足够的连续空间
   直接扩大分配，返回原来的指针，若空间不够，按新指定的大小开辟空间，将原有数据拷贝到新空间中

## 是否允许重载不同

1. `new`可以重载
2. `malloc`不可重载
