# OpenCV

## Install

```bash
# [compiler]
sudo apt-get install build-essential
# [required]
sudo apt-get install cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev
# [optional]
sudo apt-get install python-dev python-numpy libtbb2 libtbb-dev libjpeg-dev libpng-dev libtiff-dev libjasper-dev libdc1394-22-dev

unzip opencv.3.4.0.zip
cd opencv-3.4.0
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=Release -D CMAKE_INSTALL_PREFIX=/usr/local/opencv-3.4.0 ..
sudo make -j2 # runs 2 jobs in parallel
sudo make install

# add following 2 lines to ~/.bashrc
export PKG_CONFIG_PATH=/usr/local/opencv-3.4.0/lib/pkgconfig
export LD_LIBRARY_PATH=/usr/local/opencv-3.4.0/lib

source ~./bashrc

# check version
pkg-config --modversion opencv
```
