# Go刷题

## Abstract

**本文意在提供一个Go刷题语法指南，方便从其他语言切换**

~~（小声bb：go刷题简直头大，甚是怀念西加加）~~

## 变量

```go
// var varname type
var a int     //a==0, default
var b int = 1
// short declaration operator
// variable type will be deduced automatically
c := 2

// use _ to ingore value
_,f:=3,4
```

## 条件判断

```go
if 1%2 == 1 {
    fmt.Println("odd number")
}

// no implicit type convert
if 1 % 2 { //non-bool 1 % 2 (type int) used as if condition
    fmt.Println("odd number")
}
```

## 循环

```go
nums := []int{1, 2, 3}
for i := 0; i < len(nums); i++ {
    fmt.Println(nums[i])
}

// while
i := 0
for i < len(nums) {
    fmt.Println(nums[i])
    i++
}

// range for can traverse index and value at same time
for i, v := range nums {
    fmt.Println(i, v)
}

// two variable
for i, j := 0; i < m && j < n; i, j = i+1, j+1 {
    // can not use i++,j++
}
```

## 数据结构

### 数组

```go
// struct
type people struct {
    firtname,lastname string
    age int
}

// array
array:=[3]int{1,2,3}
array:=[...]int{1,2,3} //... will be the number of elements
//dimension is a part of array type
fmt.Println(reflect.TypeOf(array)) //[3]int

// slice, dynamic array
sli := make([]int, 3)    //len(sli)==3, cap(sli)==3
sli := make([]int, 3, 5) //len(sli)==3, cap(sli)==5
fmt.Println(reflect.TypeOf(sli)) //[]int

// subslicing
// both array and slice can be subsliced, do as [start,end)
sub := array[1:3]
sub := sli[:]

// slice, append
sli = append(sli, 1)
sli = append(sli, []int{1, 2, 3}...)

// slice, copy
newsli:=sli //shadow copy

newsli:=make([]int,len(sli))
copy(newsli,sli) //deep copy
```

### 字典map

```go
// map
mp:=make(map[string]int) //key: string, value: int

// range traverse map
for key, val := range mp {
    fmt.Println(key, val)
}

//detect if key "hello" is exist
mp["hello"] = 1
if val, ok := mp["hello"]; ok {
    // ok==true
    fmt.Println("exist", val)
} else {
    // ok==false
    fmt.Println("not exist")
}
```

### 栈

```go
// use slice to simulate stack
stack := make([]int, 0)

// push
stack = append(stack, 1)

// pop
stack = stack[:len(stack)-1]
```

### 队列

```go
// use slice to simulate queue
queue := make([]int, 0)

// push
queue = append(queue, 1)

// front
queue = queue[1:len(queue)]
```

### 堆

```go
package main

import (
	"container/heap"
	"fmt"
	"math/rand"
	"time"
)

type minHeap []int

func (h minHeap) Len() int {
	return len(h)
}

func (h minHeap) Less(i, j int) bool {
	return h[i] < h[j]
}

func (h minHeap) Swap(i, j int) {
	h[i], h[j] = h[j], h[i]
}

func (h *minHeap) Push(x interface{}) {
	*h = append(*h, x.(int))
}

func (h *minHeap) Pop() interface{} {
	n := len(*h)
	res := (*h)[n-1]
	*h = (*h)[:n-1]
	return res
}

func main() {
	h := &minHeap{}
	heap.Init(h)
	rand.Seed(time.Now().Unix())
	for i := 0; i < 10; i++ {
		heap.Push(h, rand.Intn(20))
	}
	for i := 0; i < 10; i++ {
		fmt.Print(heap.Pop(h), " ")
	}
}
```

## 排序&&搜索

```go
// check sort package
import "sort"
```

## 字符串处理

```go
// modify a string
s := "hello?"
bs := []byte(s)
bs[len(bs)-1] = '!'
s = string(bs)
fmt.Println(s)
```

