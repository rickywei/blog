---
title: Debian10 双网卡配置
date: 2019-12-25 21:37:06
update:
tags: [Linux,Debian,Network,Virtual Box]
categories: Linux
description: debian10，virtualbox 配置双网卡，能ping通物理机和外网
---

## 配置VirtualBox双网卡

### set VM network adapter (nat netwok and host-only)

nat network用于链接外网

![nat network用于链接外网](https://s2.ax1x.com/2019/12/29/lnhvu9.png)

host-only用于与物理机通信

![host-only用于与物理机通信](https://s2.ax1x.com/2019/12/29/ln4AjH.png)

### 查看网卡名称

   ![查看网卡名称](https://s2.ax1x.com/2019/12/29/ln42Ux.png)

   可看到三个网卡

   1. lo 回环网络
   2. enp0s3
   3. enp0s8

### 编辑/etc/network/interfaces文件

```bash
sudo vim /etc/network/interfaces

# for centos
sudo vim /etc/sysconfig/network-scripts/ifcfg-enp0s3
```

![/etc/network/interfaces](https://s2.ax1x.com/2019/12/29/lnIClD.png)

`重启 $ sudo reboot`
