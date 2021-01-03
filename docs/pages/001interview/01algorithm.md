# Algorithm

## 进制转换

1. x 进制转 10 = x^0 + x^1 + ...
2. 10 进制转 x
   1. 将10进制数不断除x，取整数商作为下次被除数，小数部分乘x（小数部分乘x后可能不是整数，取ceil）
   2. 如10进制100转8进制，100/8=12.5, 12/8=1.5, 1/8=0.125，结果为144

## 蓄水池抽样

1. 给定一个数据流，数据流长度N很大，且N直到处理完所有数据之前都不可知，请问如何在只遍历一遍数据（O(N)）的情况下，能够随机选取出k个不重复的数据
2. ![proof](./imgalg/proof.jpg)

```cpp
for i= k+1 to N  
    M=random(1, i);  
    if( M < k)  
     SWAP the Mth value and ith value  
end for  
```

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

## hash

1. hash冲突解决
   1. 开放定址法
      1. 线性探查，冲突后向后找第一个可以放的位置
      2. 二次探查，左右跳跃式探查
   2. 链地址法，相同hash建立链表
   3. 二次hash法，再次hash直到没有冲突
   4. 使用公共溢出区，冲突的元素直接填溢出区
2. 一致性hash
   1. 环形，每个节点hash到环上，数据存放在顺时针的第一个节点上
   2. 当一个节点宕机时，其数据顺移到顺时针的下个节点
   3. 当添加一个节点时，按顺时针改变某些数据的节点为新的节点
   4. 当节点较少时，两个节点在环上分布不均匀，可以将每个节点多次hash，生成虚拟节点

## k个一组反转链表

```cpp
// 翻转一个子链表，并且返回新的头与尾
pair<ListNode*, ListNode*> myReverse(ListNode* head, ListNode* tail) {
  ListNode* prev = tail->next;
  ListNode* p = head;
  while (prev != tail) { // 判断条件妙啊
    ListNode* nex = p->next;
    p->next = prev;
    prev = p;
    p = nex;
  }
  return {tail, head};
}

ListNode* reverseKGroup(ListNode* head, int k) {
  ListNode* hair = new ListNode(0);
  hair->next = head;
  ListNode* pre = hair;

  while (head) {
    ListNode* tail = pre;
    // 查看剩余部分长度是否大于等于 k
    for (int i = 0; i < k; ++i) {
      tail = tail->next;
      if (!tail) {
        return hair->next;
      }
    }
    ListNode* nex = tail->next;
    pair<ListNode*, ListNode*> result = myReverse(head, tail);
    head = result.first;
    tail = result.second;
    // 把子链表重新接回原链表
    pre->next = head;
    tail->next = nex;
    pre = tail;
    head = tail->next;
  }

  return hair->next;
}
```

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

## 红黑树

1. 节点非黑即红
2. 根节点永远为黑
3. 所有叶子节点都为空且为黑
4. 不能有两个连续的红节点
5. 从任意节点到子节点的所有路径黑高相同

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

## 两个有序数组的第k大值和中位数

```cpp
float findTheKBigNum(int *a, int *b, int aStart, int bStart, int aLen, int bLen,
                     int k) {
  // 这里使用较短的数组作为a，保证不越界
  if (aLen > bLen) {
    findTheKBigNum(b, a, bStart, aStart, bLen, aLen, k);
  }
  if (aLen == 0) {
    return b[bStart + k - 1];
  }
  if (k == 1) {
    return a[aStart] < b[bStart] ? a[aStart] : b[bStart];
  }

  int p1 = k / 2 < aLen ? k / 2 : aLen;
  int p2 = k - p1;
  if (a[aStart + p1 - 1] < b[bStart + p2 - 1]) {
    return findTheKBigNum(a, b, aStart + p1, bStart, aLen - p1, bLen, k - p1);
  } else if (a[aStart + p1 - 1] > b[bStart + p2 - 1]) {
    return findTheKBigNum(a, b, aStart, bStart + p2, aLen, bLen - p2, k - p2);
  } else {
    return a[aStart + p1 - 1];
  }
}

float mediumNum(int *a, int *b, int m, int n) {
  int k = (m + n) / 2;
  if ((m + n) % 2 == 0) {
    //  如果合并后的数组长度是偶数，中位数为第k大和第k+1大之和的一半
        return (findTheKBigNum(a, b, 0, 0, m, n, k)+findTheKBigNum（a, b, 0, 0, m, n, k+1))/2;
  } else {
    return findTheKBigNum(a, b, 0, 0, m, n, k + 1);
  }
}
```

## sunday字符串匹配

```cpp
int strStr(string haystack, string needle) {
  if (haystack.size() < needle.size()) return -1;
  map<char, int> mp;
  for (int i = 0; i < needle.size(); ++i) {
    mp[needle[i]] = needle.size() - i; //move
  }
  for (int i = 0; i <= haystack.size() - needle.size();) {
    bool flag = true;
    for (int j = 0; j < needle.size(); ++j) {
      if (haystack[i + j] != needle[j]) {
        flag = false;
        if (mp.count(haystack[i + needle.size()]))
          i += mp[haystack[i + needle.size()]]; //move
        else
          i += needle.size() + 1; //move
        break;
      }
    }
    if (flag) return i;
  }
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
  for (int len = 0; len < n; ++len) {
    for (int i = 0; i + len < n; ++i) {
      int j = i + len;
      if (len == 0) {
        dp[i][j] = 1;
      } else if (len == 1) {
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

## 矩阵顺时针旋转90

```cpp
// 先按主对角线旋转，在左右反转
```

## 前缀，中缀，后缀

1. 中转前
   1. 逆序扫描，其他与转后缀相似（左右括号处理互换）
2. 中转后
   1. 运算符栈S1，中间结果栈S2
   2. 遇到操作数，压入S2
   3. 遇到操作符，与S1栈顶比较
      1. S1为空或为(，直接压入
      2. 若优先级比S1高压入
      3. 否则S1弹出直到可以放
   4. 遇到(，直接放入
   5. 遇到)，将S1弹出直到(
   6. 扫描完时，将S1压入S2
   7. S2的逆序即为后缀表达式

## 有限状态机

1. 表示有限个状态以及在这些状态之间的转移和动作等行为的数学计算模型
2. 节点为当前状态，边为转换条件

## Top K 问题

1. 快排的partition
   1. 划分后可得到pivot的位置，再根据此时需要数的个数继续划分，直到k==0
2. 堆
   1. 若求最大top k，维持一个最小堆，当堆满时将顶部元素和新数比较，若新数较大则移除堆顶元素，插入新元素
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

## 赛马

1. 25匹马，5个跑道，最少多少次决定前5名
   1. 前五次每5个一比，得出各组第一 A1 B1 C1 D1 E1
   2. 第六次比较 A1 B1 C1 D1 E1 找出第一名，假设为A1且顺序为 A1 B1 C1 D1 E1
   3. 第七次比较 A2 A3 B1 B2 C1 找出第二第三A2 A3，因为B1和C1肯定淘汰 D1 E1
   4. 第八次比较 A4 A5 B1 B2 C1 找出第四第五，因为B1和C1肯定淘汰 D1 E1
2. 64匹马，8个赛道，找前4名，11次
3. 64匹马，8个赛道，找前8名，11次

## 毒老鼠

1. 八瓶水，三只老鼠找有毒的瓶子
2. 000=0
  001=1
  010=2
  011=3
  100=4
  101=5
  110=6
  111=7
3. 每一位对应一只老鼠，即1号老鼠混吃1 3 5 7等等，如果1死，2活，3死对应101=5号瓶子有毒

## 100个人1人有新冠，最少多少个试剂盒

1. 7=2^7>=100，多个人血液可以混合后再用一份试剂测

## 两根蜡烛确定15分钟

1. 先留一根的一端不点，另1端和另一根的两端都点，然后等一根烧完再点最后一端

## 舞会黑白帽子

1. 一群人开舞会，每人头上都戴着一顶帽子。帽子只有黑白两种，黑的至少有一顶。每个人都能看到其它人帽子的颜色，却看不到自己的。主持人先让大家看看别人头上戴的是什幺帽子，然 后关灯，如果有人认为自己戴的是黑帽子，就打自己一个耳光。第一次关灯，没有声音。于是再开灯，大家再看一遍，关灯时仍然鸦雀无声。一直到第三次关灯，才 有劈劈啪啪打耳光的声音响起。问有多少人戴着黑帽子
2. 若是两个人，设A、B是黑帽子,第二次关灯就会有人打耳光。原因是A看到B第一次没打耳光，就知道B也一定看到了有带黑帽子的人，可A除了知道B带黑帽子外，其他人都是白帽子，就可推出他自己是带黑帽子的人！同理B也是这么想的，这样第二次熄灯会有两个耳光的声音。
2，如果是三个人，A,B,C. A第一次没打耳光，因为他看到B,C都是带黑帽子的；而且假设自己带的是白帽子，这样只有BC戴的是黑帽子；按照只有两个人带黑帽子的推论，第二次应该有人打耳光；可第二次却没有。。。于是他知道B和C一定看到了除BC之外的其他人带了黑帽子，于是他知道BC看到的那个人一定是他，所以第三次有三个人打了自己一个耳光

## 青青草原

1. 假设只有 1 只狼和 1 只羊，那么羊肯定会被吃掉
2. 假设有 2 只狼和 1 只羊，由于吃掉羊的狼会被另一只狼吃掉，所以羊不会被吃掉
3. 假设有 3 只狼和 1 只羊，他们绝对聪明肯定会抢着吃羊，因为一旦吃掉羊就会变成第二种羊不会被吃掉的情况
4. 以此类推，可以得出：当狼为奇数时羊会被吃掉，狼为偶数时不会被吃掉

## 一根棍子截成三段，能构成三角形的概率

1. 线性规划，1/4

## 飞机飞圈

1. 地球是圆环，一架飞机加满油可飞半圈，飞机必须从飞机场起飞和降落，最少多少架飞机使得至少一个飞机飞完一圈？
2. 最优应该是 5 架：首先顺时针，A/B/C 同时出发，飞到 1/8 处，各耗油 15（按照题意进行转换：每辆飞机起始各有 60油），此时 C 将剩余的 45 油分给 A/B 各 15 油，然后 C 剩余 15 油可以顺利返回机场，于是此时 A/B 在 1/8 处依然 60 满油，接着 A/B 继续同行至 1/4 处，各耗油 15，此时在 1/4 处， A/B 各剩余 45 油，然后 B 将 15油给 A，此时 B 剩余 30 油可以顺利返回机场，而 A 此时有 60 油，可以行驶 1/2 来到 3/4 处，这也是逆向的 1/4 处
3. 逆向的时候，D 先出行，行驶至逆向 1/4 的时候此时 E 也同时出发，此时 D 剩余 30 油而将 15 油给 A，自己同样剩余 15 油，于是 A/D 可同时行驶逆向 1/8 处，此时 E 刚好行驶至逆向 1/8 处，还剩余 45 油，分给 A/D 各 15 油，自己剩余 15 油，于是 A/D/E 都可以顺利返航

## 变色龙

1. 在一座荒岛上有三种变色龙，分别是 12 只棕色，15 只灰色以及 16 只黑色。当两只不同颜色的变色龙相遇时他们会同时变色为另外一种颜色，例如当 1 只棕色和 1 只灰色的变色龙相遇时他们会同时变成黑色的。请问这个荒岛上这些变色龙可能全部变成同一种颜色吗？
2. 1黑1灰变2棕，此时有12+2棕，15-1灰，16-1黑。14棕14灰变28黑，全黑

## rand5 rand7

rand5生成rand7，一个rand5生成1-5，一个rand5生成0 5 10 15 20，相加等到1-24，除0外其他数概率相同，取1-21模7后+1

```cpp
int x = 22;
while (x > 21) {
  x = rand5() + (rand5() - 1) * 5;
}
return 1 + x % 7;
```

rand7 rand5

```cpp
int x = MAX_INT;
while(x > 5)
  x = Rand7();
return x;
```

## 两个人抛硬币，先为正面的人获胜，概率为

$$
\frac{2}{3}=\frac{1/2*(1-(1/4)^n)}{1-1/4}
$$
