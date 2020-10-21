# Fast-DFS

## Characters

1. Client
2. Tracker Server
   1. tracker works as scheduler, it contains info of each storage server
3. Storage Server
   1. storage servers are gouped
   2. server in same group has same data
   3. storage server relies on OS's file system since it store file directly
   4. storage server has two level sub dir, each level has 256 folder named from 00 to FF

## Upload

1. Client requests tracker to get a storage server's IP and port
2. Client send file to storage server
3. Storage server write file to disk
4. Storage return file_id, path, filename... to Client

## Download

1. Client send file info to tracker to get a storage server's IP and port
2. Tracker follow these rules to choose storage node and promise reqired file available
   1. source storage node, souce node's address is encoded in file name
   2. whose current timestamp > created time + max sync time
   3. whose file created timestamp < storage node's lates sync timestamp
3. Client gets file from storage

## Synchronize

1. Storage reports its state and file info to tracker periodically

## File Organization

1. group1/M00/00/FF/wKiyCl48KhqATsPqAABdrZgsqUU663.jpg
2. FID = group + virtual disk path + two level sub dir + file name

## Deploy

![fastdfs](./img/fastdfs.png)
