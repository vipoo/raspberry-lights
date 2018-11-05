import fs from 'fs'

export default function main() {
  fs.writeFileSync('/sys/devices/platform/soc/20980000.usb/buspower', '0x0')
}

//exec('sudo sh -c 'echo 0x0 > /sys/devices/platform/soc/20980000.usb/buspower'')