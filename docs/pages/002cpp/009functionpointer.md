# 函数指针

## 函数指针

1. 函数名`say`是一个函数指针常量，`fp`是一个函数指针变量

```cpp
void say(int num) { cout << "number is " << num << endl; }

void (*fp)(int);  // declare a function pointer
fp = &say;
(*fp)(1);
fp(1);

typedef void (*FP)(int);  // define a type of function pointer
FP f = say;
f(1);
```

## 函数指针和 & *

1. 函数被隐式转换成函数指针
2. `*`解函数指针，得到的结果又会被隐式转换成函数指针
3. `$`只能使用一次，因为其结果是指向函数指针的指针，不能再对右值取地址

```cpp
void (*fp1)(int) = say;
void (*fp2)(int) = *say;
void (*fp3)(int) = &say;
void (*fp4)(int) = *&say;
void (*fp5)(int) = &*say;
void (*fp6)(int) = **say;
// void (*fp7)(int) = &&say; //error
void (*fp8)(int) = *******say;
```
