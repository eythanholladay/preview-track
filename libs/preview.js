const fs = require("fs-extra")
const path = require("path")
const ff = require("./ff")
const vtt = require("./vtt")

const init = async (options = "") => {
  if (typeof options == "string")
    options = {input: options}
  const input = options.input
  const meta = await ff.probe(input)
  const config = {
    input: meta,
    name: path.basename(input, path.extname(input)),
    output: options.output || path.dirname(input),
    interval: options.interval || 10,
    width: options.width,
    height: options.height,
    quality: options.quality,
    start: options.start || 0,
    end: options.end || meta.duration,
    fps: options.fps || 15,
    tile: (options.tile === true) ? "6x5" : options.tile,
  }
  if (options.poster !== true) {
    if (isNaN(config.width))
      config.width = isNaN(config.height) ? 160 : -1

    if (isNaN(config.height))
      config.height = -1
  }

  if (config.tile) {
    const parts = config.tile.split("x")
    config.tile = {
      cols: parseInt(parts[0]),
      rows: parseInt(parts[1])
    }
  }

  config.frames = Math.floor(meta.duration / config.interval)
  config.padding = config.frames.toString().length

  await fs.ensureDir(config.output)
  return config
}

const track = async (options) => {
  await ff.init()
  const config = await init(options)
  await ff.mpeg(config)
  await vtt(config)
}

const poster = async (options) => {
  await ff.init()
  const config = await init(options)
  await ff.poster(config)
}

const gif = async (options) => {
  await ff.init()
  const config = await init(options)
  await ff.gif(config)
}

module.exports = {track, poster, gif}
