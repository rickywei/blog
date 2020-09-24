# Math

## divide

   1. 2: the last number is 0, 2, 4, 8
   2. 3: the sume of each digit of this number divides 3
   3. 5: the last number is 0, 5

## GCD LCM


```cpp
// a=q*b+r gcd(a,b)=gcd(b,r)
int GCD(int a, int b) {
    return b == 0 ? a : GCD(b, a % b);
}

int LCM(int a, int b) {
    return a * b / GCD(a, b);
}

// base 10 to n
vector<int> convert(int num, int n) {
    vector<int> res;
    while (num) {
        res.push_back(num % n);
        num /= n;
    }
    reverse(res.begin(), res.end());
    return res;
}
```

## base conversion

## Probability

   1. $A_n=n!$
   2. $C_n^r=\frac{n(n-1)\cdots (n-r)}{A_r}$

## prefix, infix, postfix

## Boyer-Moore Voting Algorithm

1. To find the majority of a sequence
2. First pass finds possible element and second pass check it
3. This can be used to find elements which more than 1/m of the sequence and the max number of elements is 1/(m+1)

```cpp
// first pass
int cand = 0, count = 0;
for (int x : xs) {
    if (i == 0) {
        cand = x;
        count = 1;
    } else if (cand == x) {
        ++count;
    } else {
        --count;
    }
}
// second pass
// check
```
