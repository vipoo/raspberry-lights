#!/bin/bash

set -e
set -x

PI=pi@$PI_HOST

ssh $PI << EOF
  sudo apt-get purge dphys-swapfile -y
  sudo apt-get autoremove -y
EOF
