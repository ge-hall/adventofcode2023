const fs = require('fs');

let data = fs.readFileSync('input14.1', 'utf8');
let map = new Map();
let lines = data.split('\n'); // Split lines into array
console.log(`lines: ${JSON.stringify(lines)}`);
// convert input to 2d array
let images = [];
let image = [];
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if ( line === "") {
        console.log(`line: ${JSON.stringify(line)}`);
        images.push(image);
        image = [];
        continue;
    }
    image.push(line.split(""));
}
images.push(image);

function print_image( image ){
    for (let row = 0; row < image.length; row++) {
        let row_string = "";
        for (let col = 0; col < image[row].length; col++) {
            row_string += image[row][col];
        }
        console.log(`${row_string}`);
    }
}
console.log("=====================");
console.log(`images length: ${images.length}`);
print_image(images[0]);
console.log(`images ${JSON.stringify(images)}`);
console.log('=====================');

tiltNorth(images[0]);

function tiltNorth(image) {
    let sum = 0;
    // build vertical strings
    for (let col = 0; col < image[0].length; col++) {
        let col_string = [];
        for (let row = 0; row < image.length; row++) {
            col_string.push(image[row][col]);
        }
        // count rocks and intervals
        let intervals = [[0,0]];
        let interval = 0;
        console.log(`col_string: ${JSON.stringify(col_string)}`);
        for (let i = 0; i < col_string.length; i++) {
            if (col_string[i] === 'O') {
                // console.log(`interval: ${interval}, i: ${i}`);
                intervals[interval][1] += 1;

            } else if (col_string[i] === '#') {
                interval++;
                intervals.push([i,0]);
            }
        }
        console.log(`intervals: ${JSON.stringify(intervals)}`);
        for ( interval of intervals) {
            if (interval[1] > 0) {
                let l =  col_string.length - (interval[0]===0 ? interval[0]: interval[0] +1);
                console.log(`l = ${l}`);
                console.log(`n/2 = ${interval[1]/2}`);
                console.log(`(a + l = a:${(l - interval[1] +1)} + l:${l}`);
                let interim = (interval[1]/2) *
                    ((l - interval[1] +1) + l) ;
                sum += interim;
                console.log(`interim: ${interim}`);
            }
        }
    }

    console.log(`sum: ${sum}`);
}
