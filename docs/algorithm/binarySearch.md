# Binary Search

## When

1. To search an input array directly
2. To search between 0 and maximum possible value, this range is consecutive and implicitly sorted

## Issue

1. To avoid overflow, use `int m = l + (r - l)/2`
2. Use `m=(l+r)/2` to find Minimum, use `m=(l+r)/2+1` to find Maximum

## Template

```cpp
int l = 0, r = n;
while (l < r) {
    int mid = (l + r) / 2;

    // check if mid is ok

    if (ok) {
        // change l
    } else {
        // change r
    }
}
```
