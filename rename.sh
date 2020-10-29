#!/bin/bash

dir=$1
idx=$2
gap=$3

echo $dir
cd $dir

for file in `ls . | grep '[0-9]\{1,\}.\{1,\}\.md' `; do
	cur_idx=`echo $file | grep -oE '[0-9]+'`
	#echo "$file :  $cur_idx"
	if [ $((10#$cur_idx)) -ge  $idx ]
	then 
		cur_idx=$((10#$cur_idx + gap))
		cur_idx=$(printf '%03d' $cur_idx)
		#echo $cur_idx
		name=`echo $file | sed -E "s/^[0-9]+/$cur_idx/g"`
		echo "mv $file $name"
		mv $file $name	
	fi
done
