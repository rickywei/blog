# extern用法

## extern变量

1. 可以修饰变量和函数，表示该变量或函数在其他的地方被定义（本源文件或其他源文件），在这里声明使用它，这样多个源文件共享变量和函数

## extern "C"

1. 告知编译器按C语言规则寻找函数名，C++会修改函数名（通常加上返回类型和参数类型）

```cpp
int func(int a, double b) { return 0; }
// c func
// c++ _Z4funcid


#ifdef __cplusplus
extern "C" {
#endif
/* Declarations of this file */
#ifdef __cplusplus
}
#endif
```
