# 将代码同时提交到github和gitee

1. 分别在github和gitee建立repository
2. git clone repository 到本地
3. 修改文件 .git/config
4. 添加gitee到remote

```txt
  1[core]
  2     repositoryformatversion = 0
  3     filemode = true
  4     bare = false
  5     logallrefupdates = true
  6 [remote "origin"]
  7     url = https://github.com/RickyWei/blog.git
  8     url = https://gitee.com/RickyWei/blog.git
  9     fetch = +refs/heads/*:refs/remotes/origin/*
 10 [branch "master"]
 11     remote = origin
 12     merge = refs/heads/master
 ```
