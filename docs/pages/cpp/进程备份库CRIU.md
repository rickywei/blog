# 进程备份 CRIU

## Install

https://criu.org/Main_Page https://github.com/checkpoint-restore/criu

```bash
sudo apt-get install libprotobuf-dev libprotobuf-c0-dev protobuf-c-compiler protobuf-compiler python-protobuf
tar -xzf criu-3.14.tar.gz
cd criu-3.14
sudo make
sudo make install

# may meet problems
sudo apt-get install -y nftables
sudo apt-get install -y libnftables-dev
sudo apt-get install -y libprotobuf-c-dev
sudo apt-get install -y libnet-dev
sudo apt-get install -y libcap-dev
sudo apt-get install -y asciidoc
```

## 可能遇到问题

1. SystemV共享内存缺少IPC namespace，使用posix
2. 进程号被占用，查看是否是因为kill后进程变为僵尸进程，使用waitpid回收
