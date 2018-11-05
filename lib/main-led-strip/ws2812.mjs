import getNativeBindings from 'rpi-ws281x-native/lib/get-native-bindings'
import constants from 'rpi-ws281x-native/lib/constants'

const {stripType, paramCodes} = constants
const bindings = getNativeBindings()
const DEFAULT_DMA = 10
const DEFAULT_FREQ = 800000

export default class Ws2812 {
  constructor(ledCount = 16) {
    const arrayBuffer = new ArrayBuffer(ledCount * 4 + 8) // 0xWWRRGGBB
    this.buffer = Buffer.from(arrayBuffer)
    this.array = new Uint32Array(arrayBuffer)
    this.brightness = 255

    bindings.setParam(paramCodes.dma, DEFAULT_DMA)
    bindings.setParam(paramCodes.freq, DEFAULT_FREQ)
    bindings.setChannelParam(0, paramCodes.count, ledCount)
    bindings.setChannelParam(0, paramCodes.gpio, 18)
    bindings.setChannelParam(0, paramCodes.invert, 0)
    bindings.setChannelParam(0, paramCodes.brightness, this.brightness)
    bindings.setChannelParam(0, paramCodes.stripType, stripType.WS2812)

    bindings.init()
  }

  render() {
    bindings.setChannelParam(0, paramCodes.brightness, this.brightness)
    bindings.setChannelData(0, this.buffer)
    bindings.render()
  }

  reset() {
    this.array.fill(0)
  }

  finalize(cb) {
    this.reset()
    this.render()
    bindings.finalize()
    process.nextTick(() => cb())
  }
}

