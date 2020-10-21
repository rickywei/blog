# The Log-Structured Merge-Tree

## Idea

1. Use high speed of sequental write of disk

## Component

![LSM component](./img/lsm.png)

1. $C_0$ stsys in memory all the time
2. $C_1$ in disk but some of frequence referral page in memory

## Insert

1. Write insert operation to log in order to recovery in case
2. Insert new entry to $C_0$
3. When the size of $C_0$ larger than some threshold, merge to $C_1$
4. $C_1$ likes B-tree, but its full

## Merge

![LSM Merge](./img/lsmmerge.png)

1. Read $C_1$ unmerged leaf node into emptying block in memory
2. Read $C_0$ from leaf node and merge it with emptying block
3. Write merge result into filling block, delete used node from $C_0$
4. Do step 2-3 until the filling block is full, append this block into disk's new position

Notes

1. $C_0$ does not use all ettries to merege. It remains frequent visited entry
2. $C_1$'s old block can be used for recovery. New block is written on new position
3. Usually, there are some unfull filling block, which will be stored in memory for next merge
4. When set checkpoint, cached info will be written to disk

## Search, delete and update

![LSM SDU](./img/lsmsdu.png)

Search

1. Search happens from $C_0$ to $C_k$
2. Latest T time visited entries are cached in $C_0$, kT time visited entries are cached in $C_k$. This method can reduce search time

Delete

1. Delete operation is done by insert
2. Check if deleted entry exists in $C_0$, if not, write a kv, which value is entry which is needed to be deleted
3. During merge, delete entry which has the same value as the kv

Update

1. Set the entry as delete
2. When merge out from $C_0$, write the new value in $C_0$