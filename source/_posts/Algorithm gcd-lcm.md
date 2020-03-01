---
title: Algorithm gcd&&lcm
date: 2020-03-01 17:46:10
update:
tags: [Algorithm,math]
categories: [Algorithm]
description: [最大公因数与最小公倍数]
---

## gcd

### 欧几里得算法

$$
gcd(a,b)=gcd(a,a\mod b)
$$

1. $r=a \mod b=a-k\times b$
2. Suppose $d$ is a common divisor of $(a,b)\rightarrow r\mod d==0$
3. $a=k\times b + r\rightarrow a\mod d==0$
4. $gcd(a,b)==gcd(a,a\mod b)$

## lcm

$$
lcm(a,b)=\frac{a\times b}{gcd(a,b)}
$$
