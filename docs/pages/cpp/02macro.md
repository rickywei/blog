# 宏

## 简单宏定义和函数宏

```cpp
#define PI 3.14

#define ADDONE(x) (x + 1)
```

## 宏仅仅是文本替换

1. 使用括号避免错误
2. 使用 `do{}while(0)` or `({...})` 定义多行宏，每行末尾添加续行符`\`
   1. `do{}while(0)`的好处是可以使用`if`等跳出语句
   2. 仅使用`{}`会造成麻烦--是否在结尾添加`;`--如在`if()`后使用，会使`else`错误

```cpp
#define SQUARE(x) x * x
int tmp = SQUARE(3 + 3);  // tmp = 3 + 3 * 3 + 3

#define SQUARE(x) ((x) * (x))
int tmp = SQUARE(3 + 3);  // tmp = ((3 + 3) * (3 + 3))
```

## 特殊符号

```cpp
// "x"
#define TOSTR(x) #x
string s = TOSTR(123);  //"123"

// xy
#define CONN(x, y) x##y
int a = (123, 456);  // a=123456
```

## 常用宏

```cpp
#ifndef _HEADER_H
#define _HEADER_H
// HEADER
#endif

__DATE__
__TIME__
__FILE__
__FUNCTION__
__LINE__
__cplusplus

//DEBUG
#define DBG(fmt, ...)             \
    do {                          \
        printf(fmt, __VA_ARGS__); \
    } while (0)

#define DBG(fmt, ...) ({ printf(fmt, __VA_ARGS__); })
```
