# shell脚本

## 解释器

1. 文件开头指定解释器

```sh
#!/bin/bash
```

## 命令行参数

|:-|:-|
|$#|参数个数|
|$*|以一个单字符串显示所有向脚本传递的参数|
|$$|当前脚本PID|
|$!|后台运行的最后一个进程的PID|
|$@|与$*相似，但使用时加引号，每个参数分离|
|$-|显示该shell（terminal）的当前选项|
|$?|显示该shell最后一个命令的退出状态|

## 变量

1. 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头
2. 中间不能有空格，可以使用下划线
3. 不能使用标点符号
4. 不能使用bash里的关键字

```sh
var=123 # no space
echo $var # $ to use variable
echo ${var} # {} is optional

readonly var2 # a raedonly var

unset var # delete a var(can not delete readonly var)

```

## 字符串

1. 无引号
2. 单引号
   1. 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的
   2. 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用
3. 双引号
   1. 双引号里可以有变量
   2. 双引号里可以出现转义字符

```sh
wd=world
echo 'hello ,'$wd'' # hello world

echo ${#wd} # length 5

echo ${wd:0:3} #substr wor
```

## 数组

```sh
array=(1 2)
echo ${array[0]} # 1
array[100]=100
echo ${array[100]} # 100
echo ${array[99]} # empty line

echo ${array[@]} # 1 2 100

echo ${#array[@]} # length of whole array
echo ${#array[0]} # length of an element
```

## 运算符

```sh
a=`expr "$a" + "$num"` # for any shell
a=$(($a+$num)) # POSIX, for most
let a=a+num # need ksh/bash/zsh

# Arithmetic operator
# + - * / % = == !=

# Relational operator
# only for number but for string only with num
# -eq -ne -gt -lt -ge -le

# Logic operator
# ! -o -a || &&

# String operator
# = != -z(if len == 0) -n(if len != 0) $(if not empty)

# File test operator
# -f $file (if normal file)
# -d $file (if dir)
# ...
```

## 流程控制

1. 条件表达式写在方括号内，且有空格`[ $a == $b ]`

```sh
#if-else
a=10
b=20
if test $[a] -eq $[b] #can combine test
then
   echo "a == b"
elif [ $a -gt $b ]
then
   echo "a > b"
elif [ $a -lt $b ]
then
   echo "a < b"
else
   echo "没有符合的条件"
fi

#for
for str in 'This is a string' # ;do is ok
do
    echo $str
done

#while
a=0
while(($a < 5)); do
    echo $a
    a=$((a+1))
done

#until
a=0
until [ ! $a -lt 10 ]
do
   echo $a
   a=`expr $a + 1`
done

#swatch-case
read aNum
case $aNum in
    1|2|3|4|5)
        echo "$aNum"
    ;;
    *)
        echo "number not in 5"
    ;;
esac
```

## 函数

1. `function`可有可无
2. 返回值可以显示添加(0-255)，默认为函数中最后一条命令的执行结果

```sh
function func(){
    echo "hello"
    return "world"
}
```

## 文件包含

```sh
# test1.sh
hello="world"

#test2.sh
. ./test1.sh # use .
source ./test1.sh # use source

echo $hello
```

## 命令

1. shell脚本中可使用命令`ls grep`等
2. 需要用``包裹命令

## 疑难杂症

1. `008: value too great for base (error token is "008")` 008 解释为8禁止，使用`$((10#$var))`转化为10进制