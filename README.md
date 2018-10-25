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
- `npm run bin-mac` - Tests the macos standalone executable
- `npm run tile` - Tests tiled preview track output
- `npm run default` - Tests default preview track output
- `npm run poster` - Tests poster output
- `npm run gif` - Tests gif output

### Usage
`preview-track [options] <file ...>`
- -V, --version             output the version number
- -o, --output \<path>      The output folder
- -i, --interval \<seconds> The interval in seconds
- -w, --width \<pixels>     Width of thumbnail image
- -h, --height \<pixels>    Height of thumbnail image
- -t, --tile [dimensions]   The tile row and column count in 3x3 format
- -q, --quality [value]     The jpeg quality from 0 - 100
- -p, --poster              Export a poster frame
- -s, --start [time]        The start time in seconds or timecode
- -g, --gif                 Export an animated gif
- -e, --end [time]          The end time in seconds or timecode
- -f, --fps [frames]        Frames per second for gif output
- --help                    output usage information

### Examples
- Default preview track output, single thumbnails images, 10 second interval
    - `preview-track test/test.mp4 -o test/output/`

- 3 x 2 tiled thumbnails at 10 second intervals
    - `preview-track test/test.mp4 -t 3x2 -o test/output/3x2`

- 6 x 5 tiled thumbnails at 2 second intervals
    - `preview-track test/test.mp4 -t -i 2 -o test/output/6x5`

- Poster image of the 28th second of the video
    - `preview-track test/test.mp4 -p -s 28 -q 90 -o test/output/`
    - `preview-track test/test.mp4 -p -s 00:00:28 -q 90 -o test/output/`

- Animated gif
    - `preview-track test/test.mp4 -g -s 24 -e 32 -f 12 -w 540 -o test/output/`

### Dependencies
- https://zeit.co/pkg
- https://www.ffmpeg.org
- https://github.com/jprichardson/node-fs-extra
- https://github.com/tj/commander.js/
