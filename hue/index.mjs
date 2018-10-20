import huejay from 'huejay'

const username = 'p9LwtALNFiSIXdfdfdoC4LEnwEZ4xTezw7TEVs30'
const host = '192.168.86.29'

export async function findBridge() {
  const bridges = await huejay.discover()

  for (let bridge of bridges) {
    console.log(`Id: ${bridge.id}, IP: ${bridge.ip}`);
  }

  return bridges[0]
}

export async function registerRaspberryLights() {
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

export async function getLightStatus(name) {
  const client = new huejay.Client({
    host,
    port: 80,
    username,
    timeout: 30000
  })

  const lights = await client.lights.getAll()
  const myLight = lights.find(l => l.name === name)

  return myLight.on
}

export default {getLightStatus}