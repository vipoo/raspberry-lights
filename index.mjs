//import monitorHue from 'app/monitor-hue'
import lights from 'app/lights'
import powerSaving from 'app/power-saving'

//powerSaving()

Promise.all([lights()])
  .then(() => console.log('Lights should be on now'))
  .catch(err => {
    console.log(err.stack)
    process.exit(-1)
  })