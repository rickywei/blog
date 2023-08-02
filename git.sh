# !/bin/bash

cnpm run crowdin:sync

git add .
git commit 
while ! git push; do sleep 2; done