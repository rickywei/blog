# 内联函数

## 内敛与汇编

1. 内敛展开后无函数调用

```cpp
int add15(int a) { return a + 15; }
int main() {
  int a = 1;
  int b = add15(a);
  return 0;
}

inline int __attribute__((always_inline)) add15(int a) { return a + 15; }
int main() {
  int a = 1;
  int b = add15(a);
  return 0;
}
```

```x86asm
        .file   "a.cc"
        .text
        .section        .text._Z5add15i,"axG",@progbits,_Z5add15i,comdat
        .weak   _Z5add15i
        .type   _Z5add15i, @function
_Z5add15i:
.LFB0:
        .cfi_startproc
        pushq   %rbp
        .cfi_def_cfa_offset 16
        .cfi_offset 6, -16
        movq    %rsp, %rbp
        .cfi_def_cfa_register 6
        movl    %edi, -4(%rbp)
        movl    -4(%rbp), %eax
        addl    $15, %eax
        popq    %rbp
        .cfi_def_cfa 7, 8
        ret
        .cfi_endproc
.LFE0:
        .size   _Z5add15i, .-_Z5add15i
        .text
        .globl  main
        .type   main, @function
main:
.LFB1:
        .cfi_startproc
        pushq   %rbp
        .cfi_def_cfa_offset 16
        .cfi_offset 6, -16
        movq    %rsp, %rbp
        .cfi_def_cfa_register 6
        subq    $16, %rsp
        movl    $1, -4(%rbp)
        movl    -4(%rbp), %eax
        movl    %eax, %edi
        call    _Z5add15i               ; call function
        movl    %eax, -8(%rbp)
        movl    $0, %eax
        leave
        .cfi_def_cfa 7, 8
        ret
        .cfi_endproc
.LFE1:
        .size   main, .-main
        .ident  "GCC: (Debian 8.3.0-6) 8.3.0"
        .section        .note.GNU-stack,"",@progbits

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

        .file   "a.cc"
        .text
        .globl  main
        .type   main, @function
main:
.LFB1:
        .cfi_startproc
        pushq   %rbp
        .cfi_def_cfa_offset 16
        .cfi_offset 6, -16
        movq    %rsp, %rbp
        .cfi_def_cfa_register 6
        movl    $1, -4(%rbp)
        movl    -4(%rbp), %eax
        movl    %eax, -12(%rbp)
        movl    -12(%rbp), %eax
        addl    $15, %eax
        movl    %eax, -8(%rbp)
        movl    $0, %eax
        popq    %rbp
        .cfi_def_cfa 7, 8
        ret
        .cfi_endproc
.LFE1:
        .size   main, .-main
        .ident  "GCC: (Debian 8.3.0-6) 8.3.0"
        .section        .note.GNU-stack,"",@progbits
```

## inline的使用

1. inline需要在函数定义（而非声明）前才有用
2. inline只是建议，编译器不一定内联展开
3. inline函数应该是小函数且被多次调用
4. inline函数体内不应该有loop，if，switch
5. inline函数不能是虚函数（虚函数发生在运行时，而内联展开在编译时）
6. inline会将代码复制多次，占用内存

## 内敛函数和宏函数的区别

1. inline发生在编译期，宏在预处理期
2. inline函数在编译期会进行类型检查，宏仅仅是文本替换
3. inline函数利于调试（相比于宏）
