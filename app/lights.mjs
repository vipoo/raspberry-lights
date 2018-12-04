import mainLedStrip from 'lib/main-led-strip'
import debug from 'lib/logger'

const log = debug('lights')

const totalCount = 11+14+50+36
const interval = 100

function wheel(pos) {
  if (pos < 85)
    return mainLedStrip.rgb(pos * 3, 255 - pos * 3, 0)
  else if(pos < 170) {
    pos -= 85
    return mainLedStrip.rgb(255 - pos * 3, 0, pos * 3)
  }
  
  pos -= 170
  return mainLedStrip.rgb(0, pos * 3, 255 - pos * 3)
}

export default async function main() {
  mainLedStrip.connect(totalCount)
  log('Connected to main strip')  

  const strip = mainLedStrip.getStrip()
  let index = 0

  setInterval(() => {
    for(let i = 0; i < totalCount; i++)
      strip.array[i] = wheel(index)
 
    strip.render()

    index += 1
    if(index >= 255)
      index = 0

  }, interval)
}