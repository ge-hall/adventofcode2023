const fs = require('fs');

let data = fs.readFileSync('test12', 'utf8');
let map = new Map();
let lines = data.split('\n'); // Split lines into array
console.log(`lines: ${JSON.stringify(lines)}`);

// convert input to 2d array
let image = [];
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    image.push(line.split(" "));
}

function print_image( image ){
    for (let row = 0; row < image.length; row++) {
        let row_string = "";
        for (let col = 0; col < image[row].length; col++) {
            row_string += image[row][col];
        }
        console.log(`${row_string}`);
    }
}

console.log(0);
print_image(image);
console.log('=====================');

// parse line to fill obvious positions

// any that have more than one arrangement
// use ( M - n1 -n2 ) *n_sizes
// where n_sizes is the number of different group sizes
// n1 and n2 are the sizes of the groups
// M is the number of positions that can have more than
// one position

for ( line of image ) {
    console.log(line);

    // get group_info
    let group_info = line[1].split(",").map( x => parseInt(x) );
    console.log(`group_info: ${JSON.stringify(group_info)}`);

    // attempt to reconcile where mappable spaces are separated by .
    let remapped = line[0].split(".").filter(x=>x.length > 0);
    console.log(`remapped: ${JSON.stringify(remapped)}`);

    // find certain groups and mappable spaces
    let mappable_map = new Map();
    for (let i = 0; i < remapped.length; i++) {
        //let res = remapped[i].split("").filter(x => x === "#").length;
        console.log(`remapped[i]: ${JSON.stringify(remapped[i])}, remapped[i].length: ${remapped[i].length}`);
        let mappable = "";
        if ( remapped[i].split("").filter( x => x === "#").length === remapped[i].length) {
            mappable = "absolute";
        } else {
            mappable = "undefined";
        }
        mappable_map.set(i, mappable);
    }
    console.log(`certain: ${JSON.stringify(certain)}`);
    console.log(`mappable: ${JSON.stringify(mappable)}`);

    // map groups to mappable and certain
    // process mappable spaces
    for ( let i = 0; i < mappable.length; i++) {
        let pos = mappable[i];
        let res = remapped[pos].split("").filter(x => x === "#").length;
        console.log(`mappable set: ${remapped[pos]}`);

    }

    console.log('=====================');


}
