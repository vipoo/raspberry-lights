import Ws2812 from './ws2812'

const count = 35 //160-11
let strip = null 

function on(x) {
  for (let i = 0; i < count; i++) {
    strip.array[i] = rgb(x, x, x)
  }

  strip.render()
}

function off() {
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
  	on(250)
  else
  	off()
}

function rgb(r, g, b) {
  return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
}

function rgbw(r, g, b, w) {
  return (
    ((w & 0xff) << 24) | ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff)
  );
}

export default {connect, toggleLight}
