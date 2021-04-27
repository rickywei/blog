# debian/ubuntu 命令行安装VMware Tools

```shell
# VM -> reinstall vmware tools, this step will mount the CD

# create a dir to mount the cdrom
mkdir /mnt/cdrom

# mount
mount /dev/cdrom /mnt/cdrom

# copy vmware tools to home
cp /mnt/cdrom/VMwareTools*.tar.gz ~

# extract the file
cd ~
tar -xzf VMwareTools*.tar.gz

# install the tools
cd vmware-tools-distrb
sudo ./vmware-install.pl
```
