import huejay from 'huejay'
import lircClient from 'lirc-client'

const lirc = lircClient({host: '127.0.0.1', port: 8765})

const username = 'p9LwtALNFiSIXdfdfdoC4LEnwEZ4xTezw7TEVs30'
const host = '192.168.86.29'

async function findBridge() {
  const bridges = await huejay.discover()

  for (let bridge of bridges) {
    console.log(`Id: ${bridge.id}, IP: ${bridge.ip}`);
  }

  return bridges[0]
}


/*async function registerRaspberryLights() {
  const bridge = await findBridge()

  console.log(Object.keys(bridge))

  console.log('Press button')
  const client = new huejay.Client({
    host: bridge.ip,
    port: 80,
    username: 'raspberry-lights',
    timeout: 30000
  })

  const user = new client.users.User
  user.deviceType = 'raspberry-lights'

  const createdUser = await client.users.create(user)
  console.log(`New user created - Username: ${createdUser.username}`)
  console.log(createdUser)
}

registerRaspberryLights()*/
const timeout = ms => new Promise(res => setTimeout(res, ms))

async function testMyLightStatus() {
  const client = new huejay.Client({
    host,
    port: 80,
    username,
    timeout: 30000
  })

  const lights = await client.lights.getAll()
  const myLight = lights.find(l => l.name === 'deans light')

  return myLight.on
}


//irsend SEND_ONCE ledstrip KEY_LIGHTS_TOGGLE

async function monitorMyLightStatus(cb) {
  let wasOn = null
  while(true) {
    const isOn = await testMyLightStatus()
    if(isOn !== wasOn && wasOn !== null)
      cb(isOn)
    wasOn = isOn
    await timeout(20)
  }
}

lirc.on('connect', () => {
  console.log('Connected to lirc')
  monitorMyLightStatus(isOn => {
    console.log(`On: ${isOn}`)

    lirc.sendOnce('ledstrip', 'KEY_LIGHTS_TOGGLE').catch(error => {
        if (error) console.log(error);
    })
  })
})
