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
    tile: (options.tile === true) ? "6x5" : options.tile
  }
  if (isNaN(config.width))
    config.width = isNaN(config.height) ? 160 : Math.floor(config.height * (meta.width / meta.height))

  if (isNaN(config.height))
    config.height = Math.floor(config.width * (meta.height / meta.width))

  if (config.tile) {
    const parts = config.tile.split("x")
    config.tile = {
      cols: parseInt(parts[0]),
      rows: parseInt(parts[1])
    }
  }
  await fs.ensureDir(config.output)
  return config
}

const preview = async (options) => {
  await ff.init()
  const config = await init(options)
  await ff.mpeg(config)
  await vtt(config)
}

module.exports = preview
