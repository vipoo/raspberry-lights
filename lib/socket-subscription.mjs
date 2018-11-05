import WebSocket from 'ws'

export function onMessageFrom(connection, cb) {
  const ws = new WebSocket(connection)

  ws.on('error', x => console.log('error', x))
  ws.on('connect', () => console.log('connected.'))
  ws.on('close', () => setTimeout(() => {
    console.log('attempting re-connection')
    onMessageFrom(connection, cb)
  }, 2000))

  ws.on('message', data => cb(JSON.parse(data)))
}