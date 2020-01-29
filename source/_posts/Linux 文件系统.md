---
title: Linux文件系统
date: 2019-12-25 16:19:04
update: 
tags: [Linux]
categories: Linux
description: Linux文件系统
---
## Linux文件权限与目录配置

### Linux文件属性

[文件属性](![leFkHx.png](https://s2.ax1x.com/2019/12/28/leFkHx.png))

1. 文件权限
   1. 第一个字符 d 是目录，- 是文件，l 是链接文件，b 是
   2. 后面每三个字符一组，代表文件所有者权限，用户组权限，其他人权限,rwx=4+2+1=7
   3. 目录的 x 权限代表使用者能否进入该目录或成为工作目录的用途
2. 链接数
3. 所有者
4. 所属群组
5. 大小
6. 最后修改时间
7. 文件名

### 目录配置（FHS 3.0）

目录分类

![目录分类](https://s2.ax1x.com/2019/12/28/leAaBn.png)

目录树

![目录树](https://s2.ax1x.com/2020/01/01/lJcuN9.png)

The following directories, or symbolic links to directories, are required in /.

| Directory | Description                                       |
| :-------- | :------------------------------------------------ |
| bin       | Essential command binaries                        |
| boot      | Static files of the boot loader                   |
| dev       | Device files                                      |
| etc       | Host-specific system configuration                |
| lib       | Essential shared libraries and kernel modules     |
| media     | Mount point for removable media                   |
| mnt       | Mount point for mounting a filesystem temporarily |
| opt       | Add-on application software packages              |
| run       | Data relevant to running processes                |
| sbin      | Essential system binaries                         |
| srv       | Data for services provided by this system         |
| tmp       | Temporary files                                   |
| usr       | Secondary hierarchy                               |
| var       | Variable data                                     |

### 文件默认权限和隐藏属性

```bash
umask
# 0022
# 0 特殊权限 0 拥有者 2 用户组 2 其他人

lsattr
chatter
```

### 文件特殊权限

SUID=4，SGID=2，SBIT=1

#### SUID

```bash
$ ls -l /usr/bin/passwd
# -rwsr-xr-x 1 root root 63736 Jul 27  2018 /usr/bin/passwd
```

当 s 这个标志出现在文件拥有者的 x 权限上时,就被设施SUID特殊权限

1. SUID 权限仅对二进制程序（binary program）有效
2. 执行者对于该程序需要具有 x 的可执行权限
3. 本权限仅在执行该程序的过程中有效 （run-time）
4. 执行者将具有该程序拥有者 （owner） 的权限

#### SGID

1. SGID 对二进制程序有用；
2. 程序执行者对于该程序来说，需具备 x 的权限；
3. 执行者在执行的过程中将会获得该程序群组的支持！

#### SBIT

Sticky Bit, SBIT 目前只针对目录有效

1. 当使用者对于此目录具有 w, x 权限，亦即具有写入的权限时；
2. 当使用者在该目录下创建文件或目录时，仅有自己与 root 才有权力删除该文件

### 相关命令

```bash
cd # 跟换目录
pwd # 显示当前目录

mkdir # 创建新目录
touch # 创建空文件或修改文件时间

chmod
chgown
chgrp

cp
mv
rm

ls
cat
tac
nl
more
less
head
tail
od # 以二进制显示

file # 查看文件类型

which # 查找可执行文件
whereis # 在特定目录中查找文件
locate/updatedb # 在数据库中查找（/var/lib/mlocate）
find
```

## 文件系统与磁盘配置

### 文件系统组成

1. superblock 记录filesystem整体信息
   1. block 与 inode 的总量；
   2. 未使用与已使用的 inode / block 数量
   3. block 与 inode 的大小 （block 为 1, 2, 4K，inode 为 128Bytes 或 256Bytes）
   4. filesystem 的挂载时间、最近一次写入数据的时间、最近一次检验磁盘 （fsck） 的时间等文件系统的相关信息
   5. 一个 valid bit 数值，若此文件系统已被挂载，则 valid bit 为 0 ，若未被挂载，则 valid bit为 1 
   文件系统的格式与相关信息
2. inode 记录文件的属性，一个文件占用一个inode，同时记录此文件数据所在的block号码
3. block 实际记录文件内容，一个文件可能占用多个block

Ext4 文件为索引式文件系统，基本不需要磁盘整理

![索引式](https://s2.ax1x.com/2020/01/02/lJ5R1J.png)

FAT为顺序式

![顺序式](https://s2.ax1x.com/2020/01/02/lJ5TAK.png)

### 与目录树的关系

* 目录：当我们在 Linux 下的文件系统创建一个目录时，文件系统会分配一个 inode 与至少一块 block
给该目录。其中，inode 记录该目录的相关权限与属性，并可记录分配到的那块 block 号码；
而 block 则是记录在这个目录下的文件名与该文件名占用的 inode 号码数据
* 文件：当我们在 Linux 下的 ext2 创建一个一般文件时， ext2 会分配一个 inode 与相对于该文件大小
的 block 数量给该文件。例如：假设我的一个 block 为 4 KBytes ，而我要创建一个 100
KBytes 的文件，那么 linux 将分配一个 inode 与 25 个 block 来储存该文件！ 但同时请注意，
由于 inode 仅有 12 个直接指向，因此还要多一个 block 来作为区块号码的记录

### 软链接与硬链接

* Symbolic Link
  1. 就是创建一个独立的文件，而这个文件会让数据的读取指向它link的文件
  2. Symbolic link 所创建的文件为一个独立的新的文件，所以会占用掉 inode 与 block
  3. `ln -s [source] [target]`
* Hard Link
  1. 每个文件都会占用一个inode，文件内容由indoe的记录来指向
  2. 读取文件时，必须经过目录记录的文件名来指向到正确的inode号码才能读取
  3. 不能跨Filesystem，不能link目录
  4. hard link 只是在某个目录下的 block 多写入一个关连数据而已，既不会增加 inode 也不会耗用 block 数量

### 磁盘分区

1. `lsblk` 列出系统上所有磁盘列表
2. `gdisk`
3. `mkfs.xfs/mkfs.ext4`
4. 对于swap分区，可以使用实体分区，也可用一个大文件挂载代替`dd if=/dev/zero of=/tmp/swap bs=1M count=128`

### 相关命令

```bash
df # 列出文件系统的整体磁盘使用
du # 评估文件系统的磁盘使用量

dd if=inputfile of=outputfile bs=blocksize

mount/unmount
```

## 文件压缩与打包

```bash
# 压　缩 -czf
tar -czv -f 压缩后文件名.tar.bz2 要被压缩的文件或目录名称

# 查　询
tar -ztv -f 文件名.tar.bz2

# 解压缩 -xzf
tar -xcv -f 被解压文件名.tar.bz2 -C 欲解压缩的目录（默认 .）


# -z ：通过 gzip 的支持进行压缩/解压缩：此时文件名最好为 *.tar.gz
# -j ：通过 bzip2 的支持进行压缩/解压缩：此时文件名最好为 *.tar.bz2
# -J ：通过 xz 的支持进行压缩/解压缩：此时文件名最好为 *.tar.xz

# -c ：创建打包文件，可搭配 -v 来察看过程中被打包的文件名（filename）
# -t ：察看打包文件的内容含有哪些文件名，重点在察看“文件名”就是了；
# -x ：解打包或解压缩的功能，可以搭配 -C （大写） 在特定目录解开
# -v ：在压缩/解压缩的过程中，将正在处理的文件名显示出来

# -p（小写） ：保留备份数据的原本权限与属性，常用于备份（-c）重要的配置文件
# -P（大写） ：保留绝对路径，亦即允许备份数据中含有根目录存在之意!!!!! 具有绝对路径，可能发生覆盖
# --exclude=FILE：在压缩的过程中，不要将 FILE 打包
```
