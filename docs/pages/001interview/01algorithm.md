# Algorithm

## 排序算法

1. 各种排序算法比较 ![sort](./imgalg/sort.png)
2. 排序的稳定性指，具有相同的key的数据在排序后相对位置不变

## 桶排序，计数排序，基数排序

1. 桶排序
   1. 扫描数组，得到最大最小值maxv，minv
   2. 设置桶的个数为k，则把[minv,maxv]均匀分成k个区间
   3. 扫描数组，`bucket[(array[i]-minv)/k].push_back(array[i])`
   4. 每个桶各自排序
2. 计数排序
   1. 扫描数组，得到maxv，minv
   2. 开辟数组count，len=maxv-minv+1
   3. 扫描数组，`count[array[i-minv]]+=1`
   4. 根据count[] 放回 array[]
3. 计数排序
   1. 从低位（个位）开始，将该位上数相同的数放在一起，直到最高位

## 快排及其优化

```cpp
void qsort(int array[], int l, int r) {
  if (l >= r) return;
  int pivot = array[r];
  int i = l;
  for (int j = l; j < r; ++j) {
    if (array[j] <= pivot) {
      swap(array[i++], array[j]);
    }
  }
  swap(array[i], array[r]);
  qsort(array, l, i - 1);
  qsort(array, i + 1, r);
}
```

1. 随机选取pivot / 三位区中选取pivot
2. 到达一定深度后使用插入排序

## 堆

1. 基于vector实现最大堆
   1. push_head() 将新节点加入vector.push_back()；交换新节点与父节点直到新节点不大于父节点
   2. pop_heap() 将堆顶与堆vector.back()交换；vector.pop_back()；交换堆顶与较大的子节点直到不小于任何一个子节点
   3. make_heap() 已有vector数据的情况下建堆；从bottom/2开始向上每个节点取该节点与子节点中的最大值
   4. sort_heap() 不断pop_heap()使得vector元素从小到大排列

## 树的遍历

```cpp
void PreOrder(Tree *root) {
  stack<Tree *> s;
  Tree *p = root;
  while (p != nullptr || !s.empty()) {
    while (p != nullptr) {
      cout << p->val << endl;
      s.push(p);
      p = p->left;
    }
    if (!s.empty()) {
      p = s.top();
      s.pop();
      p = p->right;
    }
  }
}

void InOrder(Tree *root) {
  stack<Tree *> s;
  Tree *p = root;
  while (p != nullptr || !s.empty()) {
    while (p != nullptr) {
      s.push(p);
      p = p->left;
    }
    if (!s.empty()) {
      p = s.top();
      cout << p->val << endl;
      s.pop();
      p = p->right;
    }
  }
}

void PostOrder(Tree *root) {
  stack<Tree *> s;
  Tree *cur;
  Tree *pre = nullptr;
  s.push(root);
  while (!s.empty()) {
    cur = s.top();
    if ((cur->left == nullptr && cur->right == nullptr) ||
        (pre != nullptr && (pre == cur->left || pre == cur->right))) {
      cout << cur->val << endl;
      s.pop();
      pre = cur;
    } else {
      if (cur->right != nullptr) s.push(cur->right);
      if (cur->left != nullptr) s.push(cur->left);
    }
  }
}
```

## LRU

```cpp
class LRU {
 public:
  LRU(int capacity) : capacity_(capacity) {}

  int Get(int key) {
    if (mp_.find(key) == mp_.end()) {
      return -1;
    }
    auto key_value = *mp_[key];
    cache_.erase(mp_[key]);
    cache_.push_front(key_value);
    mp_[key] = cache_.begin();
    return key_value.second;
  }

  void Put(int key, int value) {
    if (mp_.find(key) == mp_.end()) {
      if (cache_.size() >= capacity_) {
        mp_.erase(cache_.back().first);
        cache_.pop_back();
      }
    } else {
      cache_.erase(mp_[key]);
    }
    cache_.push_front({key, value});
    mp_[key] = cache_.begin();
  }

 private:
  int capacity_;
  list<pair<int, int>> cache_;
  unordered_map<int, list<pair<int, int>>::iterator> mp_;
};
```

## 二维数组中查值

```cpp
bool findNumberIn2DArray(vector<vector<int>> &matrix, int target) {
  int i = matrix.size() - 1, j = 0;
  while (i >= 0 && j < matrix[0].size()) {
    if (matrix[i][j] > target)
      i--;
    else if (matrix[i][j] < target)
      j++;
    else
      return true;
  }
  return false;
}
```

## 旋转数组二分

```cpp
int search(vector<int> &nums, int target) {
  int n = (int)nums.size();
  if (!n) {
    return -1;
  }
  if (n == 1) {
    return nums[0] == target ? 0 : -1;
  }
  int l = 0, r = n - 1;
  while (l <= r) {
    int mid = (l + r) / 2;
    if (nums[mid] == target) return mid;
    if (nums[0] <= nums[mid]) {
      if (nums[0] <= target && target < nums[mid]) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[n - 1]) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
  }
  return -1;
}
```

## kmp

```cpp
int KMP(string s, string p) {
  int m = s.size(), n = p.size();
  vector<int> next(n);  // next[i]标识i之前的前缀和后缀的最长匹配
                        // abababca = [-1,0,0,1,2,3,4,0]
  next[0] = -1;
  int i = 0, j = -1;
  while (i < n) {
    if (j == -1 || p[i] == p[j]) {
      ++i;
      ++j;
      next[i] = j;
    } else {
      j = next[j];
    }
  }

  i = 0, j = 0;
  while (i < m && j < n) {
    if (j == -1 || s[i] == p[j]) {
      ++i;
      ++j;
    } else {
      j = next[j];  // 不匹配时i不变，j从next[j]开始
    }
  }
  if (j >= n)
    return i - j;
  else
    return -1;
}
```

## 最大子数组和

```cpp
int maxSubArray(vector<int> &nums) {
  int pre = 0, maxAns = nums[0];
  for (const auto &x : nums) {
    pre = max(pre + x, x);
    maxAns = max(maxAns, pre);
  }
  return maxAns;
}
```

## 最长公共子序列

```cpp
int longestCommonSubsequence(string text1, string text2) {
  int m = text1.size(), n = text2.size();
  int dp[m + 1][n + 1];
  memset(dp, 0, sizeof(dp));
  for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
      if (text1[i - 1] == text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}
```

## 最长回文子串

```cpp
string longestPalindrome(string s) {
  int n = s.size();
  vector<vector<int>> dp(n, vector<int>(n));
  string ans;
  for (int l = 0; l < n; ++l) {
    for (int i = 0; i + l < n; ++i) {
      int j = i + l;
      if (l == 0) {
        dp[i][j] = 1;
      } else if (l == 1) {
        dp[i][j] = (s[i] == s[j]);
      } else {
        dp[i][j] = (s[i] == s[j] && dp[i + 1][j - 1]);
      }
      if (dp[i][j] && l + 1 > ans.size()) {
        ans = s.substr(i, l + 1);
      }
    }
  }
  return ans;
}
```

## 最长回文子序列

```cpp
int longestPalindromeSubseq(string s) {
  int n = s.size();
  vector<vector<int>> dp(n, vector<int>(n, 0));
  for (int i = 0; i < n; i++) {
    dp[i][i] = 1;
  }
  for (int len = 2; len <= n; len++) {
    for (int i = 0; i <= n - len; i++) {
      int j = i + len - 1;
      if (s[i] == s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[0][n - 1];
}
```

## 有限状态机

1. 表示有限个状态以及在这些状态之间的转移和动作等行为的数学计算模型
2. 节点为当前状态，边为转换条件

## Top K 问题

1. 快排的partition
   1. 划分后可得到pivot的位置，再根据此时需要数的个数继续划分，直到k==0
2. 堆
   1. 若求最大top k，维持一个最小堆，当堆满时将顶部元素和新数比较，若新数较大则移除对顶插入
   2. 求最小top k，维持最大堆

## 海量数据问题

1. bloom filter
   1. bloom filter使用一个m bit保存信息，初始全为0
   2. 使用n个hash函数，一个值通过n个hash后将对应位设置为1
   3. 查找值存在时，查看n个hash对应的位是否都为1，有重合的问题
2. hash
   1. 将大文件的内容经过hash分割未小文件，这样每个小文件的内容相同
   2. 若分割后的文件依旧超出内存，则可再次hash
3. bit map
   1. 用 1 bit 标记该值是否存在
   2. 用 2 bit 标记值是01否00存在，是否重复10
4. heap