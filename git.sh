# !/bin/bash

git add .
git commit 
while ! git push; do sleep 2; done