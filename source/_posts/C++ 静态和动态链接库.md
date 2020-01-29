---
title: C++ 静态和动态链接库
date: 2019-12-26 23:25:05
update:
tags: [C++,gcc,g++,Linux,Visual Studio,Windows]
categories: [C++]
description: Linux g++， Windows Visual Studio 创建和使用静态和动态链接库
---

## Linux

### 静态链接库

1. 创建文件

      ```cpp
      // hello.h
      #ifndef HELLO_H
      #define HELLO_H

      void hello(const char *str);

      #endif


      // hello.cpp
      #include <cstdio>

      void hello(const char *str)
      {
          printf("%s\n", str);
      }


      //main.cpp
      #include "hello.h"

      int main()
      {
          hello("hello");
          return 0;
      }
      ```

2. 静态库和动态库都由 .o 文件创建

   ```bash
   g++ -c hello.cpp
   # nm -C hello.o
   # U _GLOBAL_OFFSET_TABLE_
   #                  U puts
   # 0000000000000000 T hello(char const*)
   ```

3. 静态库命名 libxxx.a

    ```bash
   ar rcs libhello.a hello.o
   # r[ab][f][u]  - replace existing or insert new file(s) into the archive
   # [c]          - do not warn if the library had to be created
   # [s]          - create an archive index (cf. ranlib)

   g++ main.cpp -L. -l:libhello.a  -o main
   ./main
   ```

### 动态链接库

```bash
g++ main.cpp -L. -l:libhello.so  -o main
# g++: error trying to exec 'cc1plus': execvp: No such file or directory
# solve -> sudo apt-get install g++

./main
# ./main: error while loading shared libraries: libhello.so: cannot open shared object file: No such file or directory
# solve -> 1. add current path to /etc/ld/so.conf -> run ldconfig
#          2. add current path to environment variable
#             export LD_LIBRARY_PATH = $LD_LIBRARY_PATH:.
```

## Windows

### 静态链接库

>[reference](https://docs.microsoft.com/en-us/cpp/build/walkthrough-creating-and-using-a-static-library-cpp?view=vs-2019)

#### 创建

1. 新建static library项目
   ![create static library](https://s2.ax1x.com/2019/12/28/leC0Dx.png)
2. 添加一个对应的.h文件（eg. StaticLib.h）
3. 在头文件中编写类或函数声明
4. cpp中完成实现
5. Build

#### 使用

   1. 创建一个新的 c++ console app 在同一个solution下
      1. 在console项目上->右键->add->reference->选择StaticLib1
      2. 在console项目上->右键->properties->general->C/C++->Additional Include Directories添加StaticLib目录
      3. 在cpp中包含头文件`#include"StaticLib1/StaticLib.h"`
   2. 在不同solution下
      1. 将静态库的所有 .h .lib 文件复制到项目下
      2. cpp中

           ```cpp
           #include "StaticLib.h"

           #pragma comment(lib,"StaticLib")
           //在同一个solution下也可使用该方法，可省去配置proerties
           ```

### 动态链接库

>[reference](https://docs.microsoft.com/en-us/cpp/build/walkthrough-creating-and-using-a-dynamic-link-library-cpp?view=vs-2019)

1. 基本方法同上
2. 额外工作
   1. properties->linker->General->Additional Library Directories->add Dynamic Lib folder
   2. properties->linker->input->Additional Dependencies->DynamicLib.lib
   3. copy .dll to Debug folder

## Note

### 链接库版本

在其他项目中使用时，不能混用debug和release版本的dll

### .h .lib .dll

1. .h头文件是编译时必须的，lib是链接时需要的，dll是运行时需要的
2. .h文件的作用：声明函数接口
3. DLL文件作用：函数可执行代码
4. LIB文件作用：当我们在自己的程序中引用了一个H文件里的函数,链接器怎么知 道该调用哪个DLL文件呢?这就是LIB文件的作用了。它告诉链接器调用的函数在哪个DLL中，函数执行代码在DLL中的什么位置，这也就是为什么需要附加依赖项.LIB文件，它起到桥梁的作用
5. 如果是生成静态库文件，则没有DLL，只有lib，这时函数可执行代码部分也在lib文件中

### gcc与g++

g++在编译 .c 文件会去调用gcc