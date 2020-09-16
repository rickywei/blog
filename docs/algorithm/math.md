# Math

## When

1. divide
   1. 2: the last number is 0, 2, 4, 8
   2. 3: the sume of each digit of this number divides 3
   3. 5: the last number is 0, 5
2. GCD
3. LCM
4. base conversion

## Issue

## Template

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

## prefix, infix, postfix

```cpp
```
