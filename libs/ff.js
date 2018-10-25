const cmd = require("./cmd")
const utils = require("./utils")

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

const quality = (config) => {
  let qscale = ""
  if (config.quality) {
    qscale = `-qscale:v ${Math.round(utils.map(config.quality, 0, 100, 31, 2))}`
  }
  return qscale
}

const scale = (config) => {
  let scale = ""
  if (config.width || config.height) {
    scale = `scale=${config.width || -1}:${config.height || -1}`
  }
  return scale
}

const file = (config, extension) => {
  return `${config.output}/${config.name}${extension}`
}

const vf = (filters) => {
  filters = filters.filter(filter => !!filter)
  return filters.length > 0 ? `-vf "${filters.join(",")}"` : ""
}

const ffmpeg = async (config) => {
  const filters = [
    `select='isnan(prev_selected_t)+gte(t-prev_selected_t\,${config.interval})'`,
    scale(config),
    (config.tile) ? `tile=${config.tile.cols}x${config.tile.rows}` : ""
  ]
  await cmd(`ffmpeg -i ${config.input.filename} ${vf(filters)} ${quality(config)} -vsync 0 -huffman optimal -y ${file(config, `-%0${config.padding}d.jpg`)}`)
}

const ffposter = async (config) => {
  const filters = [
    scale(config)
  ]
  await cmd(`ffmpeg -i ${config.input.filename} -ss ${config.start} ${vf(filters)} -vframes 1 ${quality(config)} -huffman optimal -y ${file(config, ".jpg")}`)
}

const ffgif = async (config) => {
  await cmd(`ffmpeg -i ${config.input.filename} -ss ${config.start} -to ${config.end} -filter_complex "[0:v] fps=${config.fps},${scale(config)}:flags=lanczos,split [a][b];[a] palettegen=stats_mode=diff [p];[b][p] paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" ${file(config, ".gif")}`)
}

module.exports = {
  init: ffinit,
  mpeg: ffmpeg,
  probe: ffprobe,
  poster: ffposter,
  gif: ffgif
}
