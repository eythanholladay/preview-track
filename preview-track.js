const preview = require("./libs/preview.js")

const error = (msg) => {
  if (msg.message)
    msg = msg.message
  console.error(msg)
  process.exit(1)
}

const app = require("commander")
  .version("0.1.0")
  .usage("[options] <file ...>")
  .option("-o, --output <path>", "The output folder")
  .option("-i, --interval <seconds>", "The interval in seconds", parseInt)
  .option("-w, --width <pixels>", "Width of thumbnail image", parseInt)
  .option("-h, --height <pixels>", "Height of thumbnail image", parseInt)
  .option("-t, --tile [dimensions]", "The tile row and column count in 3x3 format")
  .option("-q, --quality [value]", "The jpeg quality from 0 - 100. Defaults to 79.", parseInt)
  .parse(process.argv)

const files = app.args
if (files.length <= 0)
  error("No video file provided")

files.forEach((file) => {
  preview({input: file, ...app})
    .catch(error)
})
