import irLedStrip from 'lib/ir-led-strip'
import mainLedStrip from 'lib/main-led-strip'
import {onMessageFrom} from 'lib/socket-subscription'
import debug from 'lib/logger'

const log = debug('lights')

export default async function main() {
  await irLedStrip.connect()
  log('Connected to lirc')
  mainLedStrip.connect()
  log('Connected to main strip')  
  
  onMessageFrom('ws://127.0.0.1:8080', async ({isOn}) => {
    log(`On: ${isOn}`)
    await irLedStrip.toggleLight(isOn)
    await mainLedStrip.toggleLight(isOn)
  })
}

