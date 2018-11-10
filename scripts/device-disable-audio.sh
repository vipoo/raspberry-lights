#!/bin/bash

set -e
set -x

PI=pi@$PI_HOST

file=/boot/config.txt

ssh $PI << EOF
  sudo sed $file -i -e "s|^dtparam=audio=on|dtparam=audio=off|" $file
EOF

