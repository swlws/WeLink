#!/usr/bin/env bash

root_dir=$(pwd)
echo ${root_dir}/doc

echo "build project ui-pc, and then move ui-pc/dist to ./doc"
pnpm build:ui
rm -rf ./doc
mv ${root_dir}/projects/ui-pc/dist ./doc
