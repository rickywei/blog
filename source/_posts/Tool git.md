---
title: git
date: 2019-12-26 10:17:12
update:
tags: [Git,Tool]
categories: Tool
description: 能用众力,则无敌于天下矣；能用众智,则无畏于圣人矣。
---

## Git

[Git Docs](https://git-scm.com/book/zh/v2)

## 概念

### 文件存储方式

![文件存储方式](https://s2.ax1x.com/2019/12/27/lE4UL6.png)

Git 更像是把数据看作是对小型文件系统的一组快照。 每次你提交更新，或在 Git 中保存项目状态时，
它主要对当时的全部文件制作一个快照并保存这个快照的索引。 
为了高效，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件。 
Git 对待数据更像是一个 快照流。

### 文件的三种状态

![文件三种状态](https://s2.ax1x.com/2019/12/27/lE4byq.png)

1. 已提交的 cmooitted
2. 已修改的 modified
3. 已暂存 staged

### 基本Git流程

1. 在**工作目录**中修改文件
2. 暂存文件，将文件的快照放入**暂存区域**
3. 提交更新，找到暂存区的文件，将快照永久性存储到**Git仓库**

## Git配置

1. 用户信息

   ```bash
   git config --global user.name "John Doe"
   git config --global user.email johndoe@example.com
   # check config info
   git config --list
   ```

## 获取Git仓库

1. 从现有项目或目录创建

   ```bash
   git init

   # git add .
   # git commit -m "initial"
   ```

2. 克隆仓库

   ```bash
   git clone [url]
   ```

## 基本使用

![文件的状态变化周期](https://s2.ax1x.com/2019/12/27/lE4jTU.png)

### 检查当前文件状态

```bash
git status

# 状态简览
git status -s
#  M README             -> 右边 M 文件已修改但未暂存
# MM Rakefile           -> 左边 M 文件已暂存
# A  lib/git.rb         -> A 新添加到暂存区的文件
# ?? LICENSE.txt        -> ?? 新添加的问跟踪文件
```

### 跟踪文件或暂存修改

git add 是多功能命令，相当于添加内容到下一次提交中，可用来

1. 开始跟踪新文件
2. 把一跟踪文件放到暂存区
3. 合并时把有冲突的文件标记为已解决状态

```bash
git add [file]
```

### 忽略文件

使用 .gitignore 文件忽略不需要的文件

### 查看已暂存和未暂存的修改

使用 git diff 可查看

1. 当前那些更新未被暂存
2. 哪些更新已经暂存准备好下次提交

```bash
git diff # 查看尚未暂存的文件更新了哪些部分

git diff --staged # 查看已暂存的更改 
```

### 提交更新

```bash
git commit -m "message"

git commit -a # 跳过使用暂存区，将所有已跟踪文件暂存并提交
```

### 移除文件

```bash
git rm -f [file] # 同时删除文件

git rm --cached [file] # 从git仓库中删除，但任然保留在工作目录中
```

### 移动文件

```bash
git mv [file_from] [file_to]

# equal to
mv [file_from] [file_to]
git rm [file_from]
git rm [file_to]
```

### 查看提交历史

```bash
git log
```

### 撤销操作

#### commit后发现，遗留文件没有添加或提交信息错误

```bash
git commit --amend # 该命令将暂存区的文件提交
                   # 如果自上次提交未做任何修改，那么快照不变，仅修改提交信息
```

#### 取消暂存的文件

```bash
git reset HEAD [file]
```

#### 撤销对文件的修改

```bash
git checkout -- [file]
```

### 远程仓库

远程仓库是指托管在因特网或其他网络中的你的项目的版本库。
你可以有好几个远程仓库，通常有些仓库对你只读，有些则可以读写

```bash
# 查看远程仓库
git remote -v # origin是git给clone的仓库服务器的默认名称

# 添加远程
git remote add [remote-name] [url]

# 从远程仓库抓取与拉取
git fetch [remote-name]

# 推送到远程仓库
git push [remote-name] [branch-name]

# 查看某个远程仓库
git remote show [remote-name]

# 远程仓库移除和重命名
git remote rm [remote-name]
git remote rename [old_name] [new_name]
```

### 打标签

Git 可以给历史中的某一个提交打上标签，以示重要。 比较有代表性的是人们会使用这个功能来标记发布结点（v1.0 等等）

两种类型标签

1. 轻量标签（lightweight），一个轻量标签很像一个不会改变的分支——它只是一个特定提交的引用
2. 附注标签（annotated），附注标签是存储在 Git 数据库中的一个完整对象。 它们是可以被校验的；其中包含打标签者的名字、电子邮件地址、日期时间；还有一个标签信息；并且可以使用 GNU Privacy Guard （GPG）签名与验证。 通常建议创建附注标签

```bash
# 轻量标签
git tag v1.0-lw

# 附注标签 -a
git tag -a v1.0 -m "message"

# 后期打标签
git log --pretty=oneline
git tag -a v1.0 9fceb02

# 共享标签
# 默认情况下，git push 命令并不会传送标签到远程仓库服务器上。 在创建完标签后你必须显式地推送标签到共享服务器上
git push origin v1.0
git push origin --tags # 一次推送多个标签

# 删除标签
git tag -d <tagname>
```

## 分支branch

![分支](https://s2.ax1x.com/2019/12/27/lEIyrt.png)

Git 的分支，其实本质上仅仅是指向提交对象的可变指针。 Git 的默认分支名字是 master。 在多次提交操作之后，你其实已经有一个指向最后那个提交对象的 master 分支。 它会在每次的提交操作中自动向前移动.HEAD记录当前位于哪个分支

```bash
# 创建分支
git branch [newbranch]

# 切换分支
git checkout [branch]

# 查看项目分叉历史
git log --oneline --decorate --graph --all

# 合并分支
git checkout master
git merge hotfix
git branch -d hotfix

# 合并冲突
# 当两个分支同时对同一个文件的同一部分做了修改，git无法干净的的合并
git status # 可以查看包含合并冲突而处于未合并状态的文件
git mergetool
```

## Github

### 添加SSH公钥

1. 生成SSH `$ ssh-keygen`
2. 添加到github
   ![Github添加SSH](https://s2.ax1x.com/2019/12/27/lEITrq.png)

### Fork

要参与某个项目，但是并没有推送权限，这时可以对这个项目进行“派生”。 派生的意思是指，GitHub 将在你的空间中创建一个完全属于你的项目副本，且你对其具有推送权限

1. 将派生出的副本克隆到本地
2. 创建出名称有意义的分支
3. 修改代码
4. 检查改动
5. 将改动提交到分支中
6. 将新分支推送到 GitHub 的副本中
7. 在fork的副本中可看到`Compare & pull request`

### 添加合作者

在项目settings中设置collaborators

### 组织管理

创建一个组织，只需要点击任意 GitHub 页面右上角的“+”图标，在菜单中选择“New organization”