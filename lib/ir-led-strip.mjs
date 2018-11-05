import lircClient from 'lirc-client'
import debug from 'lib/logger'

const log = debug('mainLedStrip')
const lirc = lircClient({host: '127.0.0.1', port: 8765})

export async function connect() {
  await new Promise(res => lirc.on('connect', res))
}    

export async function toggleLight() {
  log('Toggling')
  await lirc.sendOnce('ledstrip', 'KEY_LIGHTS_TOGGLE')
}

export default {connect, toggleLight}
