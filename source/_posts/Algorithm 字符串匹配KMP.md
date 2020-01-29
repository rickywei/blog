---
title: Algorithm 字符串匹配KMP
date: 2020-01-18 14:39:14
update:
tags: [Algorithm]
categories: Algorithm
description: KMP
---

## 暴力匹配方法

时间复杂度为 $O(mn)$

```cpp
int find(string s, string p)
{
    int m = s.length(), n = p.length();
    for (int i = 0; i <= m - n; ++i)
    {
        if (s[i] == p[0])
        {
            for (int j = 0; j < n; ++j)
            {
                if (s[i + j] != p[j])
                {
                    break;
                }
                if (j == n - 1)
                {
                    return i;
                }
            }
        }
    }
    return -1;
}
```

## KMP

KMP算法作用在于在某处匹配失败时，不必使下标 $i,j$ 完全回溯，减少比必要的匹配

KMP的部分匹配表**PMT**的值是字符串的前缀集合与后缀集合的交集中最长元素的长度,
同时匹配失败时，根据前缀和后缀的共有长度进行移动

1. “a” 的前缀为空，后缀为空，共有长度为0
2. “ab“的前缀为[a]，后缀为[b]，共有长度为0
3. “aba“的前缀为[a,ab]，后缀为[a,ba]，共有长度为1
4. “abab“的前缀为[a,ab,aba]，后缀为[b,ab,bab]，共有长度为2

| char  | a   | b   | a   | b   | a   | b   | c   | a   |
| ----- | --- | --- | --- | --- | --- | --- | --- | --- |
| index | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| pmt   | 0   | 0   | 1   | 2   | 3   | 4   | 0   | 1   |

为了编程方便，使用next数组替换PMT，就是将PMT表向右偏移一位，第0位的值设为-1

1. next[i] 表示子串 p[0,i) 的前后缀最大共有长度
2. next[0] 的前缀和后缀的共有长度=-1 （可理解为因为此时没有前缀和后缀）
3. next[1] 代表 p[0,1) 的前缀和后缀共有长度=0
4. next[2] 代表 p[0,2) 的前缀和后缀共有长度=1

| char  | a   | b   | a   | b   | a   | b   | c   | a   |
| ----- | --- | --- | --- | --- | --- | --- | --- | --- |
| index | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| pmt   | 0   | 0   | 1   | 2   | 3   | 4   | 0   | 1   |
| next  | -1  | 0   | 0   | 1   | 2   | 3   | 4   | 0   |

求next数组的方法为，从模式串的下标为1处开始对自身进行匹配，next值为能匹配的最长长度

![next](https://s2.ax1x.com/2020/01/19/19dtns.png)

```cpp
void getnext(string p, int next[])
{
    next[0] = -1;
    int i = 0, j = -1, m = p.length();
    while (i < m)
    {
        if (j == -1 || p[i] == p[j])
        {
            next[++i] = ++j;
        }
        else
        {
            j = next[j];
        }
    }
}
```

KMP的核心便是通过next数组，和之前的匹配避免不必要的匹配

![KMP](https://s2.ax1x.com/2020/01/19/19dV6H.jpg)

当在 i=6 匹配失败时，不将 j 回溯为 0，而是 `j = next[j]`，
这样移动后，j 之前的子串的后缀和跟他相等的前缀继续匹配

时间复杂度为 $O(m+n)$

```cpp
int kmp(string s, string p, int next[])
{
    int i = 0, j = 0, m = s.length(), n = p.length();
    while (i < m && j < n)
    {
        if (j == -1 || s[i] == p[j])
        {
            ++i, ++j;
        }
        else
        {
            j = next[j];
        }
    }
    if (j == n)
    {
        return i - j;
    }
    return -1;
}
```
