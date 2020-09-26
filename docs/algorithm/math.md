# Math

## divide

   1. 2: the last number is 0, 2, 4, 8
   2. 3: the sume of each digit of this number divides 3
   3. 5: the last number is 0, 5

## Mod

1. $(a+b)\%p=(a\%p+b\%p)\%p$
2. $(a-b)\%p=(a\%p-b\%p)\%p$
3. $(a*b)\%p=(a\%p*b\%p)\%p$
4. / does not has this property

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

1. infix to postfix
   1. if current character is an operand, output it
   2. else
      1. if the precedence of current operator is greater that precedence, push it to stack
      2. else, pop all operators from the stack which are greater than or equal to current operator
   3. if current character is '(', push it to stack
   4. if current character is ')', pop all operators until '('
   5. repeat 1-4
   6. pop stack until empty

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
