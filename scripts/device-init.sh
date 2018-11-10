#!/bin/bash

set -x
set -e

PI=pi@$PI_HOST

ssh-copy-id $PI

ssh $PI "mkdir -p ~/tmp"
scp -r ./scripts/files pi@$PI_HOST:~/tmp

ssh $PI 'sudo apt-get update -y'
ssh $PI 'sudo apt-get upgrade -y'
ssh $PI 'sudo apt-get install -y lirc git'

ssh $PI 'sudo install -v -m 644 ./tmp/files/modules              "/etc/modules"'
ssh $PI 'sudo install -v -m 644 ./tmp/files/lirc_options.conf    "/etc/lirc/lirc_options.conf"'
ssh $PI 'sudo install -v -m 644 ./tmp/files/ledstrip.lircd.conf  "/etc/lirc/lircd.conf.d/ledstrip.lircd.conf"'
ssh $PI 'sudo install -v -m 644 ./tmp/files/main-app.service     "/etc/systemd/system/main-app.service"'
ssh $PI 'sudo systemctl daemon-reload'
ssh $PI 'sudo systemctl restart main-app'

ssh $PI "sudo grep -q -F 'lirc-rpi' /boot/config.txt || echo \"dtoverlay=lirc-rpi,gpio_in_pin=23,gpio_out_pin=22\" >> /boot/config.txt"

ssh $PI "rm -rf ~/tmp"

ssh $PI 'mkdir -p ~/main-app-service'

sudo systemctl stop main-app.service
