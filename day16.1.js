const fs = require('fs');

let data = fs.readFileSync('test16', 'utf8');
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