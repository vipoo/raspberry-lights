#!/bin/bash

set -e
set -x

PI=pi@$PI_HOST

TARGET=$1
ssh $PI "cd ~/$TARGET && npm install --production"
