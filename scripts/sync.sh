#!/bin/bash

# Supposed to run on rsync-host01, change rsync-host02 to rsync-host01 to make a script that is meant to run on rsync-host02.

while true; do
  rsync --exclude 'node_modules' -avz -e "ssh -o StrictHostKeyChecking=no"  /home/dean/personal/raspberry-lights pi@192.168.86.59:~/work/
  inotifywait --exclude 'node_modules' -r -e modify,attrib,close_write,move,create,delete /home/dean/personal/raspberry-lights
  rsync --exclude 'node_modules' -avz -e "ssh -o StrictHostKeyChecking=no"  /home/dean/personal/raspberry-lights pi@192.168.86.59:~/work/
done
