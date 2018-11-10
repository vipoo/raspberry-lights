import fs from 'fs'
import {exec} from 'lib/exec'

export default function main() {
  fs.writeFileSync('/sys/devices/platform/soc/20980000.usb/buspower', '0x0')
  exec('vcgencmd display_power 0')
}
