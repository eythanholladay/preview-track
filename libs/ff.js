const cmd = require("./cmd")

const ffinit = async () => {
  let results = await cmd(`ffmpeg -version`)
  results = results.match(/ffmpeg version ([0-9]+\.[0-9]+)/)
  if (results == null || parseFloat(results[1]) < 4)
    throw new Error("Could not find FFMpeg v4. Please download and install before continuing: https://www.ffmpeg.org")
}

const ffprobe = async (file) => {
  let results = await cmd(`ffprobe -v quiet -show_format -select_streams v:0 -print_format json -show_entries stream=height,width,duration ${file}`)
  results = JSON.parse(results)
  results = Object.assign({}, results.streams[0], results.format)
  results.duration = parseFloat(results.duration)
  return results
}

const map = (x, in_min, in_max, out_min, out_max) => {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

const ffmpeg = async (config) => {
  let scale = `scale=${config.width}`
  if (config.height) {
    scale += `:${config.height}`
  }
  const filters = [
    `select='isnan(prev_selected_t)+gte(t-prev_selected_t\,${config.interval})'`,
    scale
  ]
  if (config.tile) {
    filters.push(`tile=${config.tile.cols}x${config.tile.rows}`)
  }
  const quality = Math.round(map(config.quality, 0, 100, 31, 2))
  const file = `${config.output}/${config.name}-%0${config.padding}d.jpg`
  await cmd(`ffmpeg -i ${config.input.filename} -vf "${filters.join(",")}" -qscale:v ${quality} -vsync 0 -huffman optimal -y ${file}`)
}

module.exports = {
  init: ffinit,
  mpeg: ffmpeg,
  probe: ffprobe
}
