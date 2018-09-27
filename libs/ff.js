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

const ffmpeg = async (config) => {
  const filters = [
    `select='isnan(prev_selected_t)+gte(t-prev_selected_t\,${config.interval})'`,
    `scale=${config.width}:${config.height}`
  ]
  if (config.tile)
    filters.push(`tile=${config.tile.cols}x${config.tile.rows}`)
  const file = `${config.output}/${config.name}-%0${config.padding}d.jpg`
  await cmd(`ffmpeg -i ${config.input.filename} -vf "${filters.join(",")}" -qscale:v 8 -vsync 0 -y ${file}`)
}

module.exports = {
  init: ffinit,
  mpeg: ffmpeg,
  probe: ffprobe
}
