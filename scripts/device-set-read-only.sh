#!/bin/bash

set -e

PI=pi@$PI_HOST

ssh $PI 'sudo bash -s' < ./scripts/set-read-only.sh

echo 'On next reboot, device will be in read only mode'
