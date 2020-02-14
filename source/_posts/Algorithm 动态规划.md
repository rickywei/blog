---
title: Algorithm 动态规划
date: 2020-01-03 18:55:36
update:
tags: [Algorithm]
categories: Algorithm
description: dynamic programming
---

## 主要思想

通过记录之前的最优结果，推导出本次最优解

1. 最优子结构
2. 重叠子问题

## 线性模型

状态排布为线性 `dp[i]`根据`dp[0...i-1]`得出

## 区间模型

区间模型的状态表示一般为`dp[i][j]`，表示区间`[i, j]`上的最优解，然后通过状态转移计算出`[i+1, j]`或者`[i, j+1]`上的最优解，逐步扩大区间的范围，最终求得`[0, n]`的最优解

## 背包模型

有$N$件物品和一个容量为$j$的背包，放入第$i$件物品耗费的费用是$C_{i}^{1}$
得到的价值是$W_{i}$，求将那些物品放入背包可是总价值最大

### 01 背包

每种物品仅有一件，可以选择放或不放

#### 基本思路

用子问题定义状态：$dp[i, j]$表示将前$i$件物品恰好放入容量为$j$的背包可获得的最大价值，
状态转移方程为
$$
dp[i,j]=max(dp[i-1,j],dp[i-1,j-C_i]+W_i)
$$

```cpp
for (int i = 1; i <= n; ++i)
{
    for (int j = c[i]; j <= j; ++j)
    {
        dp[i, j] = max(dp[i - 1, j], dp[i - 1, j - c[i]] + w[i]);
    }
}
```

#### 初始化细节问题

1. 恰好装满背包
   - `dp[0]=0; dp[1...V]=-infinty` 开始时只有容量为0的背包处于合法状态，最大价值为0
2. 不要求装满
   - `dp[0...V]=0`

#### 优化空间复杂度

以上方法时间和空间复杂度均为$O(VN)$，时间复杂度已不能优化，空间复杂度可优化到$O(V)$

```cpp
for (int i = 1; i <= n; ++i)
{
    for (int j = v; j >= c[i]; ++j) //已递减次序遍历容量，保证dp[j]的值等价于dp[i-1,j]
    {
        dp[j] = max(dp[j], dp[j - c[i]] + w[i]);
    }
}
```

### 完全背包

每种物品可以无限使用

#### 基本思路

对于每种物品，可取件数为 $0\rightarrow V/C_i$

```cpp
for (int i = 1; i <= n; ++i)
{
    for (int j = c[i]; j <= j; ++j)
    {
        for (int k = 0; k <= v / c[i]; ++k)
        {
            dp[i, j] = max(dp[i, j], dp[i - 1, j - k * c[i]] + k * w[i]);
        }
    }
}
```

#### 一个简单优化

如果两件物品 $i,j\rightarrow C_i\leq C_j \quad\And\And\quad W_i\geq W_j$ 可将物品 $j$ 丢弃不考虑

#### 转化为01背包

- 最直接的方法是把第 $i$ 件物品转化为 $V/C_i$ 件相等的物品
- 更有效的方法为，将第 $i$ 件物品拆成费用为 $C_i2^k$ 价值为$W_i2^k$ 的若干件物品,
  其中 $k$ 取遍满足 $C_i2^k\leq V$ 的非负整数

#### 优化空间复杂度

```cpp
for (int i = 1; i <= n; ++i)
{
    for (int j = c[i]; j <= v; ++j) //与01背包不同，此时是递增次序，因为此时第 i 件物品可以选择多次
    {
        dp[j] = max(dp[j], dp[j - c[i]] + w[i]);
    }
}
```

### 多重背包

第 $i$ 件物品最多有 $M_i$ 件可选

#### 基本思路

第 $i$ 件物品可取 $0\rightarrow M_i$ 件，共 $M_i+1$ 种情况

```cpp
for (int i = 1; i <= n; ++i)
{
    for (int j = c[i]; j <= j; ++j)
    {
        for (int k = 0; k <= m[i]; ++k)
        {
            dp[i, j] = max(dp[i, j], dp[i - 1, j - k * c[i]] + k * w[i]);
        }
    }
}
```

#### 转化为01背包

将物品划分为 $k$ 件，每件的系数为 $1,2,2^2,\cdots ,M_i-2^k+1$，且 $k$ 是满足 $M_i-2^k+1>0$ 的最大整数，如 $k=13 \rightarrow\text{coefficient}=1,2,4,6$

### 其他问题

#### 二维费用

对每种物品，有两种不同的费用或对物品总个数有限制

```cpp
dp[i, j, k] = max(dp[i-1,j,k],dp[i-1,v-c[i],vv-cc[i]]+w[i]);

dp[j, k] = max(dp[j,k],dp[v-c[i],vv-cc[i]]+w[i]); //改善空间复杂度
```

#### 分组的背包

物品被分为 $k$ 组，每组中只能选一个

```cpp
for (vector<int> k : groups)
{
    for (j = v; j >= 0; --j)
    {
        for (int i : k) //每组中选0或1件
        {
            dp[j] = max(dp[j], dp[j - c[i]] + w[i]);
        }
    }
}
```

#### 泛化物品

泛化物品值物品价值随分配的费用变化而变化，$w=f(v)| v\in[0,V]$

给定两个泛化物品 $a$ 和 $b$

$$
dp[v]=max(f_a(k)+f_b(v-k)|0\leq k \leq v)
$$

#### 输出方案

可以使用一般动态规划方案输出方法，记录每个状态的最优解是由哪个状态转移而来

```cpp
for (int i = 1; i <= n; ++i)
{
    for (int j = c[i]; j <= j; ++j)
    {
        if (dp[i - 1, j] >= dp[i - 1, j - c[i]] + w[i])
        {
            dp[i, j] = dp[i - 1, j];
            record[i, j] = 0; //该情况下，第 i 件物品没有选
        }
        else
        {
            dp[i, j] = dp[i - 1, j - c[i]] + w[i];
            record[i, j] = 1;
        }
    }
}
```

#### 求方案总数

如求装满背包或装至一定容量的方案总数

$$
dp[i,j]=sum(dp[i-1,j],dp[i,j-c[i]]) \qquad dp[0,0]=1
$$

#### 求解第 k 优解

如果要求第 $k$ 优解，那么状态 `dp[i,j]` 是一个大小为 k 的队列`dp[i,j,1...K]`，
其中`dp[i,j,k]`表示前 i 个物品中，背包大小为 j 时，第 k 优解的值

`dp[i,j]`这个有序队列由`dp[i-1,j];dp[i-1,j-c[i]]+w[i]`两个队列合并而来，合并操作为$O(K)$，
总时间$O(NVK)$

## 状态压缩DP

旅行商问题（TSP，Traveling Salesman Problem）：
给定一个$n$个顶点组成的带权有向图矩阵$d(i,j$(INF代表没有边)，求从顶点$0$出发，经过每个顶点恰好一次回到顶点$0$的最小权值

![TSP](https://s2.ax1x.com/2020/02/14/1XicV0.png)

TSP问题时NP难问题，所有可能的路线共$(n-1)!$种，一般此类问题$n$很小

1. 假设已经访问过的顶点集合为$S$
2. 当前所在顶点为$v$
3. `dp[S][v]`标识从$v$出发，访问剩余所有顶点，最终回到$0$的最小权值
4. $dp[V][0]=0$
5. $dp[S][v]=min{dp[S\cup {u}[u]+d(v,u)|u\notin S$
6. 在该递推式中，下标$S$代表集合，我们把它编码为一个整数，每个元素是否选取对应其二进制是否为1，**将状态压缩为一个整数**

```cpp
#include <iostream>
#include <random>
#include <queue>
using namespace std;

#define INF INT_MAX

int BitmaskDp(int **d, const int &kN, int **dp, int S, int v)
{
    if (dp[S][v] >= 0) //visited set S and vertex v
    {
        return dp[S][v];
    }
    if (S == (1 << kN) - 1 && v == 0) //visited all vertex and came back vertex 0
    {
        return dp[S][v] = 0;
    }
    int res = INT_MAX;
    for (int u = 0; u < kN; ++u)
    {
        if (!(S >> u & 1)) //if u is not visited, go u
        {
            res = min(res, BitmaskDp(d, kN, dp, S | 1 << u, u) + d[v][u]);
        }
    }
    return dp[S][v] = res;
}

int main()
{
    const int kN = 5;
    int **d = new int *[kN];
    for (int i = 0; i < kN; ++i)
    {
        d[i] = new int[kN];
        for (int j = 0; j < kN; ++j)
            d[i][j] = i == j ? 0 : INF;
    }
    d[0][1] = 3;
    d[0][3] = 4;
    d[1][2] = 5;
    d[2][0] = 4;
    d[2][3] = 5;
    d[3][4] = 3;
    d[4][0] = 7;
    d[4][1] = 1;

    int **dp = new int *[1 << kN];
    for (int i = 0; i < (1 << kN); ++i)
    {
        dp[i] = new int[kN];
        for (int j = 0; j < kN; ++j)
            dp[i][j] = -1;
    }
    cout << BitmaskDp(d, kN, dp, 0, 0) << endl;
    return 0;
}
```