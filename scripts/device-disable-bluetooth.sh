#!/bin/bash

set -e
set -x

PI=pi@$PI_HOST

file=/boot/config.txt
ssh $PI << EOF
  sudo systemctl disable hciuart.service
  sudo systemctl disable bluetooth.service
  sudo apt-get purge pi-bluetooth bluez bluez-firmware -y
  sudo apt-get autoremove -y

  sudo bash -c 'grep -q "^dtoverlay=pi3-disable-bt" $file || printf  "\ndtoverlay=pi3-disable-bt\n" >> $file'
EOF
