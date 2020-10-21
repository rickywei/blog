# Unix信号

## 信号

```cpp
void (*signal(int sig, void (*func)(int)))(int);
```

1. 信号是软件中断
2. 每个信号都有一个名字，这些名字都以3个字符SIG开头
3. 信号出现时可
   1. 忽略此信号，SIGKILL和SIGSTOP不可被忽略
   2. 捕捉信号
   3. 执行系统默认动作