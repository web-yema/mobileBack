#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e
git pull
git add -A
git commit -m $1
echo '自动发布'
git push origin ly
git checkout master
git merge ly
git push origin master
echo '自动发布完成'
