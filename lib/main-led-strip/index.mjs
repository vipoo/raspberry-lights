import Ws2812 from './ws2812'
import debug from 'lib/logger'

const log = debug('mainLedStrip')

let count = 25 //32 + 33 //160-11
let strip = null 

export function getStrip() {
  return strip
}

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

export function connect(_count = 25) {
  count = _count
  strip = new Ws2812(count)
}

export function toggleLight(isOn) {
  if(isOn)
    on(255, 255, 255)
  else
    off()
}

export function rgb(r, g, b) {
  return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff)
}

export default {connect, toggleLight, getStrip, rgb}
