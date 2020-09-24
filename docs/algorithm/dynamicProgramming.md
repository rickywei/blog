# Dynamic Programming

## When

1. To find maximum or minimum

## Note

1. Actually, DP enums all possiable state combination
2. If the Recurrence Relation contains such as i-1, j-1,
   use dp table == `dp[m+1][n+1]` and start with 1 rather than 0

## Template

### 1 * n

1. House Robber

### k * n

1. Best Time to Buy and Sell Stock with Cooldown

### n * n

1. Longest Increasing Subsequence
2. Count All Palindrome Sub-Strings in a String

```cpp
for (int len = 1; len < n; ++i) {
    for (int i = 0; i + len - 1 < n; ++i) {
        j = i + len - 1;
        dp[i][j] <= dp[i][j - 1], dp[i - 1][j], dp[i-1][j-1]
    }
}
```

### n * m

1. Longest Common Subsequence

```cpp
for (int i = 0; i < m; ++i) {
    for (int j = 0; j < n; ++j) {
        dp[i][j] <= dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]
    }
}
```

### 01 knapsack

### Game

### bitmap
