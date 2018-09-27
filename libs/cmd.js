const exec = require("child_process").exec
const cmd = (command, options = {}) => {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) return reject(error)
      resolve(stdout || stderr)
    })
  })
}

module.exports = cmd
