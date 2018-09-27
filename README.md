# preview-track
Tool for generating thumbnail preview tracks.

### Scripts
NPM Scripts for testing and building:
- `npm run build` - Creates standalone executables for Mac, Windows and Linux
- `npm run test` - Tests the standalone executables (mac, win10 and linux)

### Usage
`preview-track [options] <file ...>`
- -V, --version             output the version number
- -o, --output \<path>       The output folder
- -i, --interval \<seconds>  The interval in seconds
- -w, --width \<pixels>      Width of thumbnail image
- -h, --height \<pixels>     Height of thumbnail image
- -t, --tile [dimensions]   The tile row and column count in 3x3 format
- --help                    output usage information

### Dependencies
- https://zeit.co/pkg
- https://www.ffmpeg.org
- https://github.com/jprichardson/node-fs-extra
- https://github.com/tj/commander.js/
