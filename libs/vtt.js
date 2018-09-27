const utils = require("./utils")
const fs = require("fs-extra")
const path = require("path")

const vtt = async (config) => {
  const {tile, width, height, interval, name} = config
  const frames = Math.floor(config.input.duration / interval)
  const fps = (tile) ? tile.cols * tile.rows : 1
  let output = "WEBVTT\n"
  let start, end, key, value, thumb = 0, sprite = 0, time = 0
  for (let i = 0; i < frames; i++) {
    start = utils.fromSeconds(time)
    end = utils.fromSeconds(time += interval)
    key = "wh"
    value = `${width},${height}`
    thumb = i % fps
    if (thumb === 0)
      sprite++
    if (tile) {
      key = `xy${key}`
      value = `${(thumb % tile.cols) * width},${Math.floor(thumb / tile.cols) * height},${value}`
    }
    output += `\n${start} --> ${end}\n${name}-${utils.fill(sprite)}.jpg#${key}=${value}\n`
  }
  await fs.writeFile(path.join(config.output, `${name}.vtt`), output)
}

module.exports = vtt
