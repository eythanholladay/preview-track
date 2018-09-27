const { exec } = require('pkg')
//pkg . --target node10-macos-x64,node10-win-x64,node10-linux-x64 --out-path bin
exec([".", "--target", "node10-macos-x64,node10-win-x64,node10-linux-x64", "--out-path", "bin" ])
