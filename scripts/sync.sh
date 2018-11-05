#!/bin/bash

set -e

PI=pi@$PI_HOST

rsync --exclude 'node_modules' -avz -e "ssh -o StrictHostKeyChecking=no"  ./ $PI:~/work/

while true; do
  inotifywait -q --exclude 'node_modules' -r -e modify,attrib,close_write,move,create,delete ./
  rsync -q --exclude 'node_modules' -avz -e "ssh -o StrictHostKeyChecking=no"  ./ $PI:~/work/
done
