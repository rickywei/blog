---
title: Algorithm 排序
date: 2020-01-21 20:49:39
update:
tags: [Algorithm]
categories: [Algorithm,C++]
description: sort tros
---

## Overview

| 方法     | 平均时间      | 最坏情况      | 辅助存储      |
| -------- | ------------- | ------------- | ------------- |
| 简单排序 | $\O(n^2)$     | $\O(n^2)$     | $\O(1)$       |
| 快速排序 | $\O(n\log n)$ | $\O(n^2)$     | $\O(n\log n)$ |
| 堆排序   | $\O(n\log n)$ | $\O(n\log n)$ | $\O(1)$       |
| 归并排序 | $\O(n\log n)$ | $\O(n\log n)$ | $\O(n)$       |
| 基数排序 | $\O(d(n+rd)$  | $\O(d(n+rd)$  | $\O(rd)$      |

## 冒泡排序 bubble sort

两两交换，将大的数放到后面

```cpp
void BubbleSort(int arr[], const int &kSize)
{
    for (int i = 0; i < kSize - 1; ++i) //只用排n-1个数
    {
        for (int j = 0; j < kSize - 1 - i; ++j) //后i个数已经有序
        {
            if (arr[j + 1] < arr[j])
                swap(arr[j], arr[j + 1]);
        }
    }
}
```

## 选择排序 select sort

每次选择最小的放到对应位置

```cpp
void SelectSort(int arr[], const int &kSize)
{
    int min_index;
    for (int i = 0; i < kSize - 1; ++i)
    {
        min_index = i;
        for (int j = i + 1; j < kSize; ++j)
        {
            if (arr[j] < arr[min_index])
                min_index = j;
        }
        swap(arr[i], arr[min_index]);
    }
}
```

## 插入排序 insert sort

将数应插入合适的位置，通过将之前的数后移来寻找位置

```cpp
void InsertSort(int arr[], const int &kSize)
{
    int operation;
    int j;
    for (int i = 1; i < kSize; ++i)
    {
        operation = arr[i];
        for (j = i; j > 0 && operation < arr[j - 1]; --j)
        {
            arr[j] = arr[j - 1];
        }
        arr[j] = operation;
    }
}
```

## 快速排序 quick sort

递归，选择一个基数（通常为第一个数），将比它小的数放前面比它大的放后面

```cpp
int Partition(int arr[], const int p, const int r)
{
    int key = arr[r];
    int i = p;
    for (int j = p; j < r; ++j)
    {
        if (arr[j] <= key)
        {
            swap(arr[i++], arr[j]);
        }
    }
    swap(arr[i], arr[r]);
    return i;
}
void QuickSort(int arr[], const int p, const int r)
{
    if (p < r)
    {
        int q = Partition(arr, p, r);
        QuickSort(arr, p, q - 1);
        QuickSort(arr, q + 1, r);
    }
}
```

## 归并排序

二分数组，在合并子数组时排序

```cpp
void Merge(int arr[], const int left, const int right)
{
    int *tmp = new int[right - left + 1];
    for (int i = left; i <= right; ++i)
    {
        tmp[i-left] = arr[i];
    }
    int i = left, mid = (left + right) >> 1, j = mid + 1, position = left;
    while (i <= mid && j <= right)
    {
        if (tmp[i - left] < tmp[j - left])
        {
            arr[position++] = tmp[i++-left];
        }
        else
        {
            arr[position++] = tmp[j++-left];
        }
    }
    while (i <= mid && j > right)
    {
        arr[position++] = tmp[i++-left];
    }
    while (i > mid && j <= right)
    {
        arr[position++] = tmp[j++-left];
    }
    delete[] tmp;
}

void MergeSort(int arr[], const int left, const int right)
{
    if (left < right)
    {
        int mid = (left + right) >> 1;
        MergeSort(arr, left, mid);
        MergeSort(arr, mid + 1, right);
        Merge(arr, left, right);
        PrintArr(arr,10);
    }
}
```

## 堆排序

维护一个最大堆，每次从堆中取最大的逆序放回原数组

```cpp
void HeapSort(int arr[],const int& kSize)
{
    priority_queue<int> max_heap;
    for(int i=0;i<kSize;++i)
    {
        max_heap.push(arr[i]);
    }
    for(int i=kSize-1;i>=0;--i)
    {
        arr[i]=max_heap.top();
        max_heap.pop();
    }
}
```

```cpp
```

```cpp
```