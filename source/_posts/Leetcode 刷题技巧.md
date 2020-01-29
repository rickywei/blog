---
title: Leetcode 刷题技巧
date: 2020-01-21 20:48:47
update:
tags: [LeetCode, C++]
categories: C++
description: 刷题总结
---

## std

1. partation() 将容器分为两部分，返回第二部分的首个元素的迭代器

## 数据结构

1. 模运算很慢，如需判断 n%2 可已判断 n&1
2. 在不需要顺序的情况下，使用 unordered_map, unordered_set
3. 数组记得初始化

## 题目分类技巧

### string

1. stringstream 类可用来分隔字符串
2. 尽量在原字符串上操作，减少空间消耗
3. 匹配问题
   1. stack
   2. 两个指针
   3. 对称计数
