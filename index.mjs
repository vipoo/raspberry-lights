import monitorHue from 'app/monitor-hue'
import lights from 'app/lights'
import powerSaving from 'app/power-saving'

powerSaving()

Promise.all([lights(), monitorHue()])
  .catch(err => {
    console.log(err.stack)
    process.exit(-1)
  })