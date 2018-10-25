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
- `npm run test` - Tests the preview-track script
- `npm run build` - Creates standalone executables for Mac, Windows and Linux
- `npm run test-bin` - Tests the standalone executables (mac, win10 and linux)

### Usage
`preview-track [options] <file ...>`
- -V, --version             output the version number
- -o, --output \<path>      The output folder
- -i, --interval \<seconds> The interval in seconds
- -w, --width \<pixels>     Width of thumbnail image
- -h, --height \<pixels>    Height of thumbnail image
- -t, --tile [dimensions]   The tile row and column count in 3x3 format
- --help                    output usage information

### Examples
- Default preview track output, single thumbnails images, 10 second interval
    - `preview-track test/test.mp4 -o test/output/`

- 3 x 2 tiled thumbnails at 10 second intervals
    - `preview-track test/test.mp4 -t 3x2 -o test/output/3x2`

- 6 x 5 tiled thumbnails at 2 second intervals
    - `preview-track test/test.mp4 -t -i 2 -o test/output/6x5`

### Dependencies
- https://zeit.co/pkg
- https://www.ffmpeg.org
- https://github.com/jprichardson/node-fs-extra
- https://github.com/tj/commander.js/
