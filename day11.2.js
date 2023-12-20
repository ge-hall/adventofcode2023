const fs = require('fs');

let data = fs.readFileSync('input11.1', 'utf8');
let map = new Map();
let lines = data.split('\n'); // Split lines into array
// console.log(`lines: ${JSON.stringify(lines)}`);


// convert input to 2d array
let image = [];
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    image.push(line.split(""));
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

// The image includes empty space (.) and galaxies (#).

// The researcher is trying to figure out the sum of the
// lengths of the shortest path between every pair of galaxies.
// However, there's a catch: the universe expanded in the time
// it took the light from those galaxies to reach the observatory.

// Due to something involving gravitational effects, only some
// space expands. In fact, the result is that any rows or columns
// that contain no galaxies should all actually be twice as big.

// find rows and columns that have no galaxies.
// expand rows and columns that have no galaxies.

console.log("--------------------");
print_image(image);
console.log(`size = ${image.length} x ${image[0].length}`);

// keep track of empty rows and columns
// rather than expand them, we can add into the
// distance if there exists an e that es in r1 < e and r2 > e
let empty_rows = [];
let empty_cols = [];
for ( let row = 0; row < image.length; row++) {
    // check if row has no galaxies
    if (image[row].indexOf("#") === -1) {
        // empty row
        empty_rows.push(row);
    }
}
console.log("--------------------");
print_image(image);
console.log(`size = ${image.length} x ${image[0].length}`);

for ( let col = 0; col < image[0].length; col++) {
    let galaxy_count = 0;
    // check if col has no galaxies
    for ( let row = 0; row < image.length; row++) {
        if (image[row][col] === "#") {
            galaxy_count++;
        }
    }
    if (galaxy_count === 0) {
      // empty column
        empty_cols.push(col);
    }

}
console.log("--------------------");
print_image(image);

let pairs = [];
for(let r1 = 0; r1 < image.length; r1++) {
    for(let c1 = 0; c1 < image[r1].length; c1++) {
        if(image[r1][c1] === ".") continue;
        for(let r2 = r1; r2 < image.length; r2++) {
            for(let c2 = (r1 == r2 ? c1 + 1 : 0); c2 < image[r2].length; c2++) {
                if(image[r2][c2] === "#") {
                    console.log(`Pair: (${image[r1][c1]}, ${image[r2][c2]})`);
                    pairs.push([r1, c1, r2, c2]);
                }
            }
        }
    }
}

console.log(`pairs: ${JSON.stringify(pairs)}`);
console.log(`pairs length: ${pairs.length}`);
console.log(`empty_rows: ${JSON.stringify(empty_rows)}`);
console.log(`empty_cols: ${JSON.stringify(empty_cols)}`);
let sum_distance = 0;
for (pair of pairs) {
    let r1 = pair[0];
    let c1 = pair[1];
    let r2 = pair[2];
    let c2 = pair[3];
    let row_expansion = 0;
    if (Math.abs(r2-r1) > 1) {
        for( row of empty_rows) {
            if ( row > Math.min(r1, r2) && row < Math.max(r1, r2) ){
                console.log(`expanding row: ${row}, r1: ${r1}, r2: ${r2}`);
                row_expansion+=999_999;
            }
        }
    }
    let col_expansion = 0;
    if (Math.abs(c2-c1) > 1) {
        for( col of empty_cols) {
            if ( col > Math.min(c1, c2) && col < Math.max(c1, c2) ) {
                console.log(`expanding col: ${col}, c1: ${c1}, c2: ${c2}`);
                col_expansion+=999_999;
            }
        }
    }
    let distance = Math.abs(r1 - r2) + Math.abs(c1 - c2) + row_expansion + col_expansion;
    console.log(`distance: ${distance}`);
    sum_distance += distance;
}
console.log(`sum_distance: ${sum_distance}`);