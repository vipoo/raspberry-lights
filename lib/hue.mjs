import huejay from 'huejay'
import debug from 'lib/logger'
import axios from 'axios'

const log = debug('hue')

const username = 'p9LwtALNFiSIXdfdfdoC4LEnwEZ4xTezw7TEVs30'
const host = '192.168.86.29'
const url = `http://${host}/api/${username}/lights`

export async function findBridge() {
  const bridges = await huejay.discover()

  for (let bridge of bridges) {
    log(`Id: ${bridge.id}, IP: ${bridge.ip}`)
  }

  return bridges[0]
}

export async function registerRaspberryLights() {
  const bridge = await findBridge()

  log(Object.keys(bridge))

  log('Press button')
  const client = new huejay.Client({
    host: bridge.ip,
    port: 80,
    username: 'raspberry-lights',
    timeout: 30000
  })

  const user = new client.users.User
  user.deviceType = 'raspberry-lights'

  const createdUser = await client.users.create(user)
  log(`New user created - Username: ${createdUser.username}`)
  log(createdUser)
}

export async function getLightStatus(name) {
  const response = await axios.get(url)
  const lights = Object.values(response.data)
  const myLight = lights.find(l => l.name === name)

  return myLight.state.on && myLight.state.reachable
}

export default {getLightStatus}