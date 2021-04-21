# debian/ubuntu 安装mysql

```shell
# install necessary package
sudo apt update
sudo apt install gnupg

# install by using apt
# you can find apt file here https://dev.mysql.com/downloads/mysql/
wget https://dev.mysql.com/get/mysql-apt-config_0.8.16-1_all.deb

# this step add the mysql.list under /etc/apt/sources.list.d
sudo dpkg -i mysql-apt-config*

# update source list
sudo apt update

# now we can install mysql by using apt
sudo apt install mysql-server
```
