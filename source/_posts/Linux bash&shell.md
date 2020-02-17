---
title: linux bash&shell
date: 2020-01-08 19:31:54
update: 
tags: [Linux,bash,shell]
categories: Linux
description: bash & shell
---

## bash 变量

### 设置规则

1. 变量与变量内容以 = 连接
2. 等号两边不能直接接空白字符
3. 变量名只能是英文字母和数字，且以字母开头
4. 变量内容若有空白字符可以使用双引号或单引号将变量内容结合起来
   1. 双引号`""`内的特殊字符，保留原本的特性
   2. 单引号`''`内的特殊字符作为一般字符
5. 可以用 \ 将特殊字符变为一般字符
6. 在一串指令的执行中，还需要借由其他额外指令提供信息，可使用 $(指令)
7. 可累加内容`PATH=$PATH:newpath`
8. 若该变量需要在其他子程序执行，则需要以export来使变量编程环境变量
9. 通常大写名称的变量为系统默认变量
   1. PATH
   2. HOME
   3. SHELL
   4. HISTSIZE
   5. LANG
   6. PS1 提示符设置，就是命令行前的 $ 的设置
10. 可使用 unset 变量名 取消变量设置

## 数据流重导向

![数据流重导向](https://s2.ax1x.com/2020/01/09/lfdiqS.png)

1. 标准输入 < << 两个箭头为累加，一个为覆盖
2. 标准输出 > >>
3. 标准错误输出 > >>

## 连续命令执行

```bash
cmd1;cmd2 # 连续执行

cmd1&&cmd2 # 当cmd1执行且指令回传值 $?=0 即正常执行，执行cmd2

cmd1||cmd2 # 若cmd正常执行cmd2不执行，否则cmd2执行
```

## 管线命令 pipe

管线命令使用界定符 | 将上一次的输出作为下一次的输入

![pipe](https://s2.ax1x.com/2020/01/24/1VX9Re.png)

## shell

```bash
vim hello.sh
#!/bin/bash
#Program:
#       Print Hello World
#History:
#01/24/2020    username    v1.0
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:usr/local/sbin:~/bin
export PATH
echo -e "Hello World!\n"
exit 0

sh hello.sh
```

程序说明

1. `#!/bin/bash` 非必要，说明该script使用的shell名称，此处为bash
2. `#Program:` 非必要
3. `#History:` 非必要
4. `PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:usr/local/sbin:~/bin` 非必要，主要环境变量
5. 主程序
6. `exit 0` 回传值

script三种执行方式

1. sh 在新子bash中执行，结果无法返回到当前bash
   1. 在debian系，sh 调用为 dash 不是 bash, 可直接使用`bash script.sh`
2. ./
   1. 调用脚本开头`#!/bin/bash` 设定的shell
3. source 在当前bash中执行

script的默认变量

```bash
sh script arg1   arg2   arg3   arg4
    $0    $1     $2     $3     $4

$# 参数个数，此处为 4
$@ 代表"$1" "$2" "$3" "$4" 每个变量是独立的
$* 代表 "$1 $2 $3 $4"
脚本中可用shift x 移除前x个参数，不加个数x时默认为1个
```

### shell中的反引号

反引号中的命令会优先被执行

```bash
for file in `ls .`;do # file 取 ls 的结果
    #code
done
```

### 流程控制

[ condition ] **前后括号和条件之间有空格 ！！！**

#### 条件

```bash
if [ condition ]; then
    # code
elif [ condition ]; then
    # code
else
    # code
fi


case $var in
    "xxx1")
    # code
    ;;
    "xxx2")
    # code
    ;;
    *)
    # code
    ;;
esac
```

#### 循环

```bash
while [ condition ]
do
    # code
done


until [ condition ]
do
    # code
done


for var in con1 con2 con3 ...
do
    # code
done


for(( 初值; 条件; 变化 ))
do
    # code
done
```

### 函数

```bash
function func()
{
    # code
}

# call function
func arg1 arg2
```

### test

#### 数值测试

| 参数 | 说明           |
| :--- | :------------- |
| -eq  | 等于则为真     |
| -ne  | 不等于则为真   |
| -gt  | 大于则为真     |
| -ge  | 大于等于则为真 |
| -lt  | 小于则为真     |
| -le  | 小于等于则为真 |

#### 字符串测试

| 参数      | 说明                     |
| :-------- | :----------------------- |
| =         | 等于则为真               |
| !=        | 不相等则为真             |
| -z 字符串 | 字符串的长度为零则为真   |
| -n 字符串 | 字符串的长度不为零则为真 |

#### 文件测试

| 参数      | 说明                                 |
| :-------- | :----------------------------------- |
| -e 文件名 | 如果文件存在则为真                   |
| -r 文件名 | 如果文件存在且可读则为真             |
| -w 文件名 | 如果文件存在且可写则为真             |
| -x 文件名 | 如果文件存在且可执行则为真           |
| -s 文件名 | 如果文件存在且至少有一个字符则为真   |
| -d 文件名 | 如果文件存在且为目录则为真           |
| -f 文件名 | 如果文件存在且为普通文件则为真       |
| -c 文件名 | 如果文件存在且为字符型特殊文件则为真 |
| -b 文件名 | 如果文件存在且为块特殊文件则为真     |

### shell 的debug

```bash
sh -nvx script.sh
# -n 仅检查语法不执行
# -v 执行前将脚本内容输出
# -x 将使用到的脚本内容输出
```

### xargs

xargs 是给命令传递参数的一个过滤器，也是组合多个命令的一个工具

```bash
# xargs - build and execute command lines from standard input
# pre-commandx | args [options] [command [initial-arguments]]
```
