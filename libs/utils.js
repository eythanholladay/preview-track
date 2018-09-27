const fill = (num, len = 2) =>
  num.toString().padStart(len, "0")

const fromSeconds = (time) => {
  let strTime = fill((time - Math.floor(time)) * 1000, 3)
  time = parseInt(time)
  strTime = fill(time % 60) + "." + strTime
  time = parseInt(time / 60)
  strTime = fill(time % 60) + ":" + strTime
  time = parseInt(time / 60)
  strTime = fill(time % 60) + ":" + strTime
  time = parseInt(time / 60)
  return strTime
}

const toSeconds = (timeCode, framerate = 30) => {
  const pieces = timeCode.split(":")
  const parts = pieces[2].split(".")
  const ms = parseInt(parts[1]) / 1000
  pieces[2] = parts[0]
  let time = parseInt(pieces.pop())
  while (pieces.length > 0)
    time += Math.pow(60, pieces.length) * parseInt(pieces.shift())
  return time + ms
}

module.exports = {toSeconds, fromSeconds, fill}
