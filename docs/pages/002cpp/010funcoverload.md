# 函数重载

## 编译器对于函数重载

1. 函数会被 name mangling，及编译出的函数符号名称被修改，通常加上参数类型
2. 返回值不能用于重载
   1. 因为在编译期不会判断函数类型
   2. 我们可能忽略函数返回值，如使用`func()`而不是`int ret=func()`

## 函数匹配

1. 名称查找 candidate functions
2. 按参数个数和类型（match/convertible）查找 viable functions
3. 查找最佳匹配，若 F1 的所有实参的隐式转换不劣于 F2 的所有实参的隐式转换，且满足下列条件，则确定 F1 是优于 F2 的函数
   1. 至少存在一个 F1 的实参，其隐式转换优于 F2 的该实参的对应的隐式转换
   2. 从 F1 的返回类型到要初始化的类型的标准转换序列优于从 F2 的返回类型到该类型的标准转换序列
   3. F1 的返回类型是与正在初始化的引用相同种类的引用（左值或右值），而 F2 的返回类型不是
   4. F1 是非模板函数而 F2 是模板特化
   5. F1 与 F2 都是模板特化，且按照模板特化的偏序规则，F1 更特殊
   6. F1 与 F2 为拥有相同形参类型列表的非模板函数，且按照制约的偏序规则，F1 比 F2 更受制约
   7. F1 是类 D 的构造函数，F2 是 D 的基类 B 的构造函数，而对应每个实参的 F1 和 F2 的形参均具有相同类型
   8. F2 是重写的候选而 F1 不是
   9. F1 和 F2 都是重写候选，而 F2 是带逆序形参的合成重写候选而 F1 不是
   10. F1 是从用户定义推导指引所生成而 F2 不是
   11. F1 是复制推导候选而 F2 不是
   12. F1 是从非模板构造函数生成而 F2 是从构造函数模板生成
4. 隐式转换优先级
    1. 准确匹配：不要求转换、左值到右值转换、限定性转换、函数指针转换、 (C++17 起)类类型到相同类的用户定义转换
    2. 提升：整型提升、浮点提升
    3. 转换：整型转换、浮点转换、浮点整型转换、指针转员指针转换、布尔转换、派生类到其基类的用户定义转换标准转换序列的等级是其所含的标准转换（至多可有三次转换）中的最差等级

## 在C中实现重载

1. 可变参数
   1. 可变参数原理，函数调用时参数从右到左压栈，只要知道第一个参数的地址和各个参数类型，就可得到所有参数
2. 函数指针
   1. 定义一个函数指针类型，再定义改类型的多个函数
   2. 利用`void*`接受任意类型指针，再在具体函数中处理类型

```cpp
int open(const char *pathname, int flags);
int open(const char *pathname, int flags, mode_t mode);

//variadic functions -> take variadic arguments
int open(const char *path, int oflag, ... ); // actual declaration

// enables access to variadic function arguments
// parmN <- Name of the last named parameter in the function definition
void va_start( va_list ap, parmN );

// the next variadic function argument
T va_arg( va_list ap, T );

// makes a copy of the variadic function arguments
void va_copy( va_list dest, va_list src );

// ends traversal of the variadic function arguments
void va_end( va_list ap );

// holds the information needed by va_start, va_arg, va_end, and va_copy
va_list args; // va_list is a type

int GetMax(int n, ...) {
  int res = INT_MIN;
  va_list args;
  va_start(args, n);
  for (int i = 0; i < n; ++i) {
    res = max(res, va_arg(args, int));
  }
  va_end(args); // necessary
  return res;
}

//func pointer
typedef void (*Add)(void* res, void*, void*);

void AddII(void* res, void* a, void* b) {
  *(int*)res = *(int*)a + *(int*)b;
}

void AddDD(void* res, void* a, void* b) {
  *(double*)res = *(double*)a + *(double*)b;
}

void Func(Add f, void* res, void* a, void* b) {
  f(res, a, b);
}

int ires, ia = 1, ib = 2;
double dres, da = 1.0, db = 2.0;
Func(AddII, &ires, &ia, &ib);
Func(AddDD, &dres, &da, &db);
```
