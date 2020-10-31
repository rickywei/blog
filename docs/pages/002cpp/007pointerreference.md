# 指针和引用

## 指针和引用区别

1. 指针可以为空，引用不行
2. 指针可以不初始化，引用必须初始化
3. 指针所指可以改变，引用初始化后所指不可改变（因为是指针常量）
4. 指针和引用的`++`意义不同
5. 指针sizeof得到指针大小，引用sizeof得到类型大小

## 引用的底层

1. 引用是个指针常量`int* const ra =&a`
2. 通过汇编可看出引用其实是个指针
   1. lea 了一个地址
      1. mov 会解地址，实际移动的为值
      2. lea 不会解地址，直接赋值地址
   2. 大小为8B，（64bits machine）
   3. 另外a的地址为数据rbp-数据总大小（包含padding）
   4. 使用`int *pa=&a` 得到相同的汇编
   5. 使用`const`也得到相同汇编

```cpp
int main() {
  int a = 1;
  int b = a;
  int &ra = a;
  return 0;
}
```

```x86asm
gdb> disassemble /m
Dump of assembler code for function main():
1	int main() {
   0x0000555555555125 <+0>:	push   %rbp
   0x0000555555555126 <+1>:	mov    %rsp,%rbp

2	  int a = 1;
=> 0x0000555555555129 <+4>:	movl   $0x1,-0x14(%rbp)

3	  int b = a;
   0x0000555555555130 <+11>:	mov    -0x14(%rbp),%eax
   0x0000555555555133 <+14>:	mov    %eax,-0x4(%rbp)

4	  int &ra = a;
   0x0000555555555136 <+17>:	lea    -0x14(%rbp),%rax
   0x000055555555513a <+21>:	mov    %rax,-0x10(%rbp)

5	  return 0;
   0x000055555555513e <+25>:	mov    $0x0,%eax

6	}
   0x0000555555555143 <+30>:	pop    %rbp
   0x0000555555555144 <+31>:	retq   

End of assembler dump.
```