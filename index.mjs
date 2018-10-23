
import hue from './hue'
import irLedStrip from './ir-led-strip'
import mainLedStrip from './main-led-strip'

const delay = ms => new Promise(res => setTimeout(res, ms))


async function getLightToggleStatus(cb) {
  let wasOn = false

  while(true) {
    try {
      const isOn = await hue.getLightStatus('deans light')
      if(isOn !== wasOn)
        await cb(isOn)
      wasOn = isOn
    } catch(err) {
      console.error(err.message)
      await delay(2000)
    }
    await delay(20)
  }
}

async function main() {
  await irLedStrip.connect()
  console.log('Connected to lirc')
  mainLedStrip.connect()
  console.log('Connected to main strip')  
  
  await getLightToggleStatus(async isOn => {
    console.log(`On: ${isOn}`)
    await irLedStrip.toggleLight(isOn)
    await mainLedStrip.toggleLight(isOn)
  })
}

main().catch(err => {
  console.log(err.stack)
  process.exit(-1)
})