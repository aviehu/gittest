#!/bin/bash
set -e

# Settings
dir=./clone
repo_src=git@github.com:roeeyud/pubui.git
repo_trg=git@github.com:roeeyud/pubui-release.git
src_branch=master

repo_src_url=$repo_src
repo_trg_url=$repo_trg

echo "Clone Source..."
git clone --depth 1 -b $src_branch $repo_src_url $dir

echo "CD"
cd ./$dir

echo "Remove GIT"
rm -rf .git

echo "Init GIT"
git init
git add .
git commit -m "Release"
git remote add origin $repo_trg_url

echo "Push..."
git push -u origin master

rm -rf ./clones
