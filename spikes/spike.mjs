import Ws2812 from './ws2812'

const count = 160-11
const w = new Ws2812(count)

export function on(x) {
  for (let i = 0; i < count; i++) {
    w.array[i] = rgb(x, x, x)
  }

  w.render()
}

export function off() {
  for (let i = 0; i < count; i++) {
    w.array[i] = rgb(0, 0, 0)
  }

  w.render()
}

let b = 1
setInterval(() => on(b++), 250)
//on()

/*let d = 255
let interv = setInterval(() => {
  for (let i = 0; i < count; i++) {
    w.array[i] = rgb(d, 0, d)
  }

  d = d - 1
  if(d < 0) {
    clearInterval(interv)
    w.finalize(() => process.exit(0))
  }
  else
    w.render()
}, 25)

*/
/*
const NUM_LEDS = 16
const STRIP_TYPE = 'ws2812';

const channel = ws281x(NUM_LEDS, {brightness: 12, dma: 10, stripType: STRIP_TYPE});
process.on('SIGINT', () => {
  ws281x.reset()
  ws281x.finalize()
  process.nextTick(() => process.exit(0))
})

//ws281x.setBrightness(128);
for (let i = 0; i < 3 * NUM_LEDS; i++) {
  channel.array[i] = rgbw(255, 0, 0, 0)
}

ws281x.brightness=255
ws281x.render()
console.log(ws281x)

setTimeout(() => {
  ws281x.reset()
  ws281x.finalize()
  process.nextTick(() => process.exit(0))
}, 3000)*/

function rgb(r, g, b) {
  return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
}

function rgbw(r, g, b, w) {
  return (
    ((w & 0xff) << 24) | ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff)
  );
}
