#!/bin/bash

set -e

PI=pi@$PI_HOST

rsync --exclude 'node_modules' --exclude '.git' -avz -e "ssh -o StrictHostKeyChecking=no" ./ $PI:~/$1/
