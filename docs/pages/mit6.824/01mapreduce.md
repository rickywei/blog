# MapReduce

## Abstract

1. MapReduce是一种处理大数据的编程模型

## Programming Model

1. Map
   1. map(k1,v1) -> list(k2,v2)
   2. 输入：key/value 键值对
   3. 输出：key/value 键值对，即一些中间结果
2. Reduce
   1. reduce(k2,list(v2)) -> list(v2)
   2. 输入：key/value 键值对，即map产生的中间结果
   3. 输出：最终结果

### Examples

#### Word Count

```cpp
map(String key, String value):
    // key: document name
    // value: document contents
    for each word w in value:
        EmitIntermediate(w, "1");
    
    reduce(String key, Iterator values):
    // key: a word
    // values: a list of counts
    int result = 0;
    for each v in values:
        result += ParseInt(v);
    Emit(AsString(result));
```

1. map为每个单词产生一个中间结果 word/1，1为单词出现的频率
2. reduce合并一个单词总共出现的频率

#### Distributed Grep

1. map(document name, document content) -> list(matched line, 1)
2. reduce(matched line, list(1)) -> list(matched line)

#### Inverted Index

1. map(document id, document content) -> list(word, document id)
2. reduce(word, list(document id)) -> (word, list(document id))

## Implementation

### Execution Overview

MapReduce被调用时将执行以下流程

![mapreduce overview](https://raw.githubusercontent.com/RickyWei/blog/img/img/20210301232911.png)

1. MapReduce库首先将输入文件分割成 M 块（每块通常16-64MB，此步骤可被多台机器并行执行）；在集群中开启MR程序
2. 其中一个为Master其余为Workers；Master将M个Map任务和R个Reduce任务分配给空闲的Worker
3. 被分配Map任务的Worker读取对应的输入块；解析出每个key/value对并送入用户定义的Map()函数；Map()产生的中间kv结果存放在内存中
4. 每隔一定时间Partition()函数（eg. `hash(key)%R`）将内存中的这些中间kv结果分到R个区域并写入磁盘；文件位置将会传给Master，Master再将其转发给Reduce Worker（增量式的推送）
5. 当Reduce Worker被Master通知时，它将通过RPC从Map Wroker读取中间结果；当Reduce Wroker读取完所有中间结果后，它将按key排序，所以具有相同key的kv对被放在了一起；
6. Reduce Worker遍历被排序的中间结果，将每个不同的key和其对应的所有values传入用户定义的Reduce()函数；最终结果被追加到该partition对用的文件中
7. 当所有Map和Reduce完成时，MapReduce调用返回

## Master Data Structures

1. 存储每个Map和Reduce任务的状态（等待（idle），正在执行，完成）；对非等待的任务存储其Worker ID
2. 存储每个完成的Map任务的中间结果的位置

## Fault Tolerance

### Worker Failure

1. Master会定期Ping Worker，当一定时间未收到回复认为Worker故障
2. 所有分配到该Worker的Map/Reduce任务被标为idle状态并等待reschedule到其他Worker
3. 该Worker上已结束的Map任务会被重新执行，因为中间结果保存在local disk；Reduce不会被重新执行，因为结果保存在global file system
4. 当Map任务因为故障从A迁移到B，对应的Reduce任务会被通知，如果该Reduce任务还未从A读取全部数据便会从B读取

### Master Failure

1. 一种方法是Master可以实现定期将自己的状态写入checkpoint，新的Master通过checkpoint启动

## Locality

1. 网络带宽是有限制的
2. 通常一个数据块在GFS上会有3份拷贝，Master在通过这些位置信息尝试安排Map任务在具有该数据副本的机器上；如果不行则尝试安排在离数据副本距离较近的机器上（如在同一个局域网内）

## Task Granularity

1. 理想情况下，M和R的数量应远大于机器的数量；这样可以提高动态的负载均衡；加速故障恢复
2. 实际中，Master需要做$O(M+R)$次的决定并在内存中保存$O(M*R)$的信息
3. 为了利用局部性，选择的M将使得被分割的问价大小介于16-64MB；R通常为机器数的一个小倍数（eg. machines=2000, M=200000, R=5000）

## Backup Tasks

1. MapReduce的总执行时间通常因为短板（如某个机器磁盘太慢）变得更长，如果该机器同时被别的MR调用分配任务，因为CPU或IO竞争会更慢
2. 替补任务是当一个MR调用接近完成时，Master为剩余正在执行的任务再分配一个机器，当任意一个机器结束时将该任务标记为完成

## Refinements

### Partitioning Function

1. 默认情况下，我们使用`hash(key) Mod R`这种partitioning函数，因为它可以产生较为均衡的R个分区
2. 某些情况下，我们希望一些特定的partition函数，比如将一个host的所有URL分在一起`hash(Hostname(urlkey)) mod R`

### Ordering Guarantees

1. MR保证再一个partition中，k/v对按key值排序
2. 有序性方便后续可能的查找等操作

### Combiner Function

1. 一些情况下，用户定义的Reduce方法是可结合可交换的（associative and commutative）
2. 我们可以在Map过程中执行Combiner Function（eg. 在word count中，Map可能会输出多个<the, 1>的键值对，我们可以执行Combiner Function做本地合并后再发送到网络中）
3. Combiner Function和Reduce Function基本相同，区别是输出不同（前者输出将要发送到Reduce的中间结果，后者为最终输出）

### Input and Output Types

1. MapReduce library提供了多种Input/Output类型（eg. "text"模式将每一行作为key/value对，key是改行在文件中的偏移量，value是该行的内容）
2. 用户通过实现`reader`接口可以定义自己的Input/Output类型；`reader`不仅可以从文件中读，也可以从内存或数据库等中读取

### Side-effects

1. 某些情况下，输出一些额外的辅助文件是很有用的
2. 但是用户需要自己保证这种side-effects的原子性和幂等性（eg. 一个方法是先输出到一个临时文件，最后再原子的重命名）

### Skipping Bad Records

1. 有时Map或Reduce函数在一些record中存在bug，此时可以选择跳过这些record（因为有时bug因为其他第三方库产生或者忽略一些记录不太影响结果）
2. MR提供这中可跳过record的mode；每个worker会安装一个signal handler，每当某个record引发错误时，signal handler会发送一个"last gasp" UDP报文给master，当master收到产生于一个record的多个错误，便认为该recod在下次被执行时应该被跳过

### Local Execution

1. 为了更好的debug，MR提供了一个库可以顺序的在本机执行所有MR操作

### Status Information

1. Master会开启一个内部的HTTP server，该server提供了MR的各种信息

### Counters

```cpp
Counter *uppercase;
uppercase = GetCounter("uppercase");
map(String name, String contents): 
    foreach word w in contents: 
        if (IsCapitalized(w)): 
            uppercase->Increment();
EmitIntermediate(w, "1");
```

1. MR提供统计某个事件出现次数的特性；用户可以通过创建一个counter对象并在Map/Reduce函数中增加它（eg. 统计有多少单词被处理）
2. 每个Worker中counter的值被放入在对Master的心跳检测ping的回应中
3. Master会处理每个counter的值（防止值被重复统计等，因为任务可能因为故障而被重新执行）并在MR结束时返回给用户

> MapReduce: Simplified Data Processing on Large Clusters