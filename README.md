# preview-track
Tool for generating thumbnail preview tracks.

### Install
- Install node by downloading the latest version at [nodejs](http://nodejs.org)
    - To see if you already have a version node installed, run `node -v`
- `cd` to the local copy of the `preview-track` repository
- run `npm install -g` to install dependencies and create global command line utility.
    - or run `npm install` then `npm run build` to build standalone executable.

### Scripts
NPM Scripts for testing and building:
- `npm run build` - Creates standalone executables for Mac, Windows and Linux
- `npm run test` - Tests the standalone executables (mac, win10 and linux)

### Usage
`preview-track [options] <file ...>`
- -V, --version             output the version number
- -o, --output \<path>      The output folder
- -i, --interval \<seconds> The interval in seconds
- -w, --width \<pixels>     Width of thumbnail image
- -h, --height \<pixels>    Height of thumbnail image
- -t, --tile [dimensions]   The tile row and column count in 3x3 format
- --help                    output usage information

### Dependencies
- https://zeit.co/pkg
- https://www.ffmpeg.org
- https://github.com/jprichardson/node-fs-extra
- https://github.com/tj/commander.js/
