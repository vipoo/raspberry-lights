
import lircClient from 'lirc-client'

const lirc = lircClient({host: '127.0.0.1', port: 8765})

export async function connect() {
  await new Promise((res, rej) => lirc.on('connect', res))
}    

export async function toggleLight() {
  await lirc.sendOnce('ledstrip', 'KEY_LIGHTS_TOGGLE')
}

export default {connect, toggleLight}
