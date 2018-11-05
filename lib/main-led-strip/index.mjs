import Ws2812 from './ws2812'
import debug from 'lib/logger'

const log = debug('mainLedStrip')

const count = 32 + 33 //160-11
let strip = null 

function on(r, g, b) {
  log('Turning on')
  for (let i = 0; i < count; i++) {
    strip.array[i] = rgb(r, g, b)
  }

  strip.render()
}

function off() {
  log('Turning off')
  for (let i = 0; i < count; i++) {
    strip.array[i] = rgb(0, 0, 0)
  }

  strip.render()
}

export function connect() {
  strip = new Ws2812(count)
}

export function toggleLight(isOn) {
  if(isOn)
    on(64, 255, 200)
  else
    off()
}

function rgb(r, g, b) {
  return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff)
}

export default {connect, toggleLight}
