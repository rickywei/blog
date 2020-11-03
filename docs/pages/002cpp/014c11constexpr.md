# C++11 constexpr

## constexpr 常量表达式

1. 常量表达式运行计算发生在编译期
2. 可以用于之前需要宏的场合，如数组大小

```cpp
constexpr int add(int a, int b) { return a + b; }
int sum = add(1, 2);  // calculate when compile
int array[add(1, 2)];
```

## constexpr 限制

1. 该函数只能有一个return，可用三元运算符`?:`代替分支return
2. 该函数只能调用constexpr函数
3. 只能使用全局constexpr变量

## 与const区别

1. constexpr的成员函数，变量默认也是const的，反之不是
2. constexpr告知编译器其值编译期可知，反之无
