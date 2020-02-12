---
title: C++ Google编程规范
date: 2020-02-04 22:25:41
update:
tags: [C++]
categories: [C++]
description: Google C++ 命名约定
---

## 通用命名规则

函数命名, 变量命名, 文件命名要有描述性; 少用缩写(一些特定的广为人知的缩写是允许的)

```cpp
// good
int price_count_reader;    // 无缩写
int num_errors;            // "num" 是一个常见的写法
int num_dns_connections;   // 人人都知道 "DNS" 是什么


// bad
nt n;                     // 毫无意义.
int nerr;                  // 含糊不清的缩写.
int n_comp_conns;          // 含糊不清的缩写.
int wgc_connections;       // 只有贵团队知道是什么意思.
int pc_reader;             // "pc" 有太多可能的解释了.
int cstmr_id;              // 删减了若干字母.
```

## 文件命名

文件名要全部小写, 可以包含下划线 (\_) 或连字符 (-),依照项目的约定. 如果没有约定, 那么 “_” 更好.

1. C++ 文件要以 .cc 结尾, 头文件以 .h 结尾. 专门插入文本的文件则以 .inc 结尾
2. 不要使用已经存在于 `/usr/include` 下的文件名
3. 通常应尽量让文件名更加明确. `http_server_logs.h` 就比 `logs.h` 要好. 定义类时文件名一般成对出现, 如 `foo_bar.h` 和 `foo_bar.cc`, 对应于类 FooBar
4. 内联函数必须放在 .h 文件中. 如果内联函数比较短, 就直接放在 .h 中

## 类型命名

所有类型命名 —— 类, 结构体, 类型定义 (typedef), 枚举, 类型模板参数 —— 均使用相同约定, 即以大写字母开始, 每个单词首字母均大写, 不包含下划线

```cpp
// 类和结构体
class UrlTable;
class UrlTableTester;
struct UrlTableProperties;

// 类型定义
typedef hash_map<UrlTableProperties *, string> PropertiesMap;

// using 别名
using PropertiesMap = hash_map<UrlTableProperties *, string>;

// 枚举
enum UrlTableErrors;
```

## 变量命名

变量 (包括函数参数) 和数据成员名一律小写, 单词之间用下划线连接. 类的成员变量以下划线结尾, 但结构体的就不用

### 普通变量命名

```cpp
string table_name;  // 好 - 用下划线.
string tablename;   // 好 - 全小写.

string tableName;  // 差 - 混合大小写
```

### 类数据成员

```cpp
// 不管是静态的还是非静态的, 类数据成员都可以和普通变量一样, 但要接下划线

class TableInfo {
private:
  string table_name_;  // 好 - 后加下划线.
  string tablename_;   // 好.
  static Pool<TableInfo>* pool_;  // 好.
};
```

### 结构体变量

```cpp
// 不管是静态的还是非静态的, 结构体数据成员都可以和普通变量一样, 不用像类那样接下划线

struct UrlTableProperties {
  string name;
  int num_entries;
  static Pool<UrlTableProperties>* pool;
};
```

## 常量命名

声明为 `constexpr` 或 `const` 的变量, 或在程序运行期间其值始终保持不变的, 命名时以 “k” 开头, 大小写混合

```cpp
const int kDaysInAWeek = 7;
```

## 函数命名

一般来说, 函数名的每个单词首字母大写 (即 “驼峰变量名” 或 “帕斯卡变量名”), 没有下划线. 对于首字母缩写的单词, 更倾向于将它们视作一个单词进行首字母大写

```cpp
StartRpc() // StartRPC()
AddTableEntry()
DeleteUrl()
OpenFileOrDie()
```

取值和设值函数的命名与变量一致. 一般来说它们的名称与实际的成员变量对应, 但并不强制要求. 例如 `int count()`与 `void set_count(int count)`

## 命名空间命名

1. 命名空间以小写字母命名. 最高级命名空间的名字取决于项目名称. 要注意避免嵌套命名空间的名字之间和常见的顶级命名空间的名字之间发生冲突
2. 顶级命名空间的名称应当是项目名或者是该命名空间中的代码所属的团队的名字. 命名空间中的代码, 应当存放于和命名空间的名字匹配的文件夹或其子文件夹中
3. 注意 不使用缩写作为名称 的规则同样适用于命名空间. 命名空间中的代码极少需要涉及命名空间的名称, 因此没有必要在命名空间中使用缩写.
4. 要避免嵌套的命名空间与常见的顶级命名空间发生名称冲突. 由于名称查找规则的存在, 命名空间之间的冲突完全有可能导致编译失败. 尤其是, 不要创建嵌套的 std 命名空间. 建议使用更独特的项目标识符 (`websearch::index`, `websearch::index_util`) 而非常见的极易发生冲突的名称 (比如 `websearch::util`).
5. 对于 `internal` 命名空间, 要当心加入到同一 `internal` 命名空间的代码之间发生冲突 (由于内部维护人员通常来自同一团队, 因此常有可能导致冲突). 在这种情况下, 请使用文件名以使得内部名称独一无二 (例如对于 `frobber.h`, 使用 `websearch::index::frobber_internal`).

## 枚举命名

单独的枚举值应该优先采用 常量 的命名方式. 但 宏 方式的命名也可以接受. 枚举名 `UrlTableErrors` (以及 `AlternateUrlTableErrors`) 是类型, 所以要用大小写混合的方式

```cpp
enum UrlTableErrors {
    kOK = 0,
    kErrorOutOfMemory,
    kErrorMalformedInput,
};
enum AlternateUrlTableErrors {
    OK = 0,
    OUT_OF_MEMORY = 1,
    MALFORMED_INPUT = 2,
};
```

## 宏命名

大写+下划线 `MY_MACRO_THAT_SCARES_SMALL_CHILDREN`
