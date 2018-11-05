import {getLightStatus} from 'lib/hue'
import {delay} from 'lib/promise-helpers'
import WebSocket from 'ws'
import debug from 'lib/logger'

const log = debug('monitorHue')

async function getLightToggleStatus(cb) {
  let wasOn = false
  const forever = true
  while (forever) {
    try {
      const isOn = await getLightStatus('deans light')
      if(isOn !== wasOn)
        await cb(isOn)
      wasOn = isOn
    } catch(err) {
      log(err.message)
      await delay(2000)
    }
    await delay(20)
  }
}

export default async function main() {
  let currentIsOn = null

  log('Starting Hue Monitor')
  const wss = new WebSocket.Server({ port: 8080 })
  log('Listening for clients on port 8080')

  wss.on('error', x => log('error', x))
  wss.on('close', x => log('closed', x))
  wss.on('listening', () => log('listening', wss.address()))

  wss.on('connection', ws => {
    log('new client connectted')
    if(currentIsOn !== null) {
      const isOn = currentIsOn
      ws.send(JSON.stringify({isOn}))
      log('sent current status', {isOn})
    }
  })

  getLightToggleStatus(async isOn => {
    log(`On: ${isOn}`)
    currentIsOn = isOn

    wss.clients.forEach(c => {
      if(c.readyState === WebSocket.OPEN) {
        c.send(JSON.stringify({isOn}))
        log('sent current status', {isOn})
      }
    })
  })
}
