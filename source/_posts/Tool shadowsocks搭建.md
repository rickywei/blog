---
title: Tool shadowsocks搭建
date: 2019-12-25 21:55:53
update:
tags: [Shadowsocks,Linux,Network,Tool]
categories: [Tool]
description: 有时你需要一把梯子
---

## Shadowsocks

```bash
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
pip install shadowsocks

vi /etc/shadowsocks.json
{
    "server":"0.0.0.0",
    "server_port":50013,
    "local_port":1080,
    "password":"1234567890",
    "timeout":600,
    "method":"aes-256-cfb"
}

vi /etc/systemd/system/shadowsocks.service
[Unit]
Description=Shadowsocks
[Service]
TimeoutStartSec=0
ExecStart=/usr/bin/ssserver -c /etc/shadowsocks.json
[Install]
WantedBy=multi-user.target

# 设置开机自启命令
systemctl enable shadowsocks
# 启动命令
systemctl start shadowsocks
#查看状态命令
systemctl status shadowsocks


#过程有2步，第1步安装相应的内核，第2步开启内核对应的加速
wget -N --no-check-certificate "https://raw.githubusercontent.com/chiakge/Linux-NetSpeed/master/tcp.sh" && chmod +x tcp.sh && ./tcp.sh
```
