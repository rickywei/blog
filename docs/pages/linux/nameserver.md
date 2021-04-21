# debian/ubuntu 永久修改nameserver

```shell
sudo apt update
sudo apt install resolvconf

# add your desired nameserver in this file
sudo vim /etc/resolvconf/resolv.conf.d/head
# such as
# nameserver 8.8.8.8
# nameserver 8.8.4.4
```
