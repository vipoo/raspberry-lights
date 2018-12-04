#!/bin/bash

set -x
set -e

PI=pi@$PI_HOST

ssh-copy-id $PI

ssh $PI "mkdir -p ~/tmp"
scp -r ./scripts/files pi@$PI_HOST:~/tmp

ssh $PI 'sudo apt-get update -y'
ssh $PI 'sudo apt-get upgrade -y'

ssh $PI 'sudo install -v -m 644 ./tmp/files/main-app.service     "/etc/systemd/system/main-app.service"'
ssh $PI 'sudo systemctl daemon-reload'
ssh $PI 'sudo systemctl restart main-app'

ssh $PI "rm -rf ~/tmp"

ssh $PI 'mkdir -p ~/main-app-service'

ssh $PI 'sudo systemctl stop main-app.service'
