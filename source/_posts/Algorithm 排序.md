---
title: Algorithm 排序
date: 2020-01-21 20:49:39
update:
tags: [Algorithm]
categories: [Algorithm]
description: sort tros
---

## Overview

| 方法     | 平均时间      | 最坏情况      | 辅助存储      |
| -------- | ------------- | ------------- | ------------- |
| 简单排序 | $\O(n^2)$     | $\O(n^2)$     | $\O(1)$       |
| 归并排序 | $\O(n\log n)$ | $\O(n\log n)$ | $\O(n)$       |
| 快速排序 | $\O(n\log n)$ | $\O(n^2)$     | $\O(n\log n)$ |
| 堆排序   | $\O(n\log n)$ | $\O(n\log n)$ | $\O(1)$       |
| 计数排序 | $\O(n)$       | $\O(n)$       | $\O(n)$       |

## 冒泡排序 Bubble Sort

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

## 选择排序 Select Sort

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

## 插入排序 Insert Sort

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

## 归并排序 Merge Sort

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

## 快速排序 Quick Sort

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

## 堆排序 Heap Sort

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

## 计数排序 Count Sort

对每个输入元素$x$,确定小于$x$的元素个数

（要求输入的数$x$都在区间$[0,k]$,当$k=O(n)$时，时间复杂度$O(n)$）

```cpp
void CountSort(int arr[], const int &kSize, const int k)
{
    int *C = new int[k + 1]();
    int *B = new int[kSize];
    for (int i = 0; i < kSize; ++i)
    {
        C[arr[i]] += 1;
        B[i] = arr[i];
    }
    for (int i = 1; i <= k; ++i)
    {
        C[i] += C[i - 1] - 1; //注意下标
    }
    for (int i = kSize - 1; i >= 0; --i) //倒序遍历
    {
        B[C[arr[i]]--] = arr[i];
    }
    for (int i = 0; i < kSize; ++i)
    {
        arr[i] = B[i];
    }
    delete[] B;
    delete[] C;
}
```
