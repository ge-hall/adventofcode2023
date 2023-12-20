const fs = require('fs');

let data = fs.readFileSync('input13.1', 'utf8');
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
console.log(`images ${json.stringify(images)}`);
console.log('=====================');


function map_reflections(image_line) {
//console.log`image_line: ${image_line}`
    let reflection_points = [];
    let left = image_line[0];
    // check each position in the line
    // right includes i and so if there
    // exists a reflection between  2 & 3,
    // this would be discovered when i = 3
    // the formula used in result is all number of
    // lines to left which in this case is 3  0,1,2
    for (let i = 1; i < image_line.length; i++) {
        //console.log(`check left = ${left} and right from  char: ${image_line[i]} from image_line[${i}]`);
        // i == 1, l = 0 check left[l(0)] === image_line[i + image_line.length - l]
        let reflective = true;
        // check each left char and right char
        // number of chars to check
        // is equal to the min of length of the left and remaining to right
        let chars_to_check = Math.min(left.length, image_line.length - i);
        //console.log(`chars_to_check: ${chars_to_check}`);
        for ( let l = left.length -1; l >= 0 +left.length - chars_to_check; l--) {

            //console.log(`checking each char: ${left[l]}, ${image_line[i + left.length-1 - l]}`);

            if( left[l] !== image_line[i +left.length-1 - l]) {
                //console.log(`left[l]: ${left[l]}, image_line[i + left.length - l]: ${image_line[i + left.length-1 - l]}`);
                reflective = false;
                //console.log(`reflective: ${reflective}`);
                break;
            }
        }
        if ( reflective ) {
            //console.log(`reflective: ${reflective}`);
            reflection_points.push(i);
        }
        left += image_line[i];
        //console.log()

    }
    return reflection_points;
}


function get_common_reflection_point(reflections) {
    // get common elements
    console.log(`reflections: ${JSON.stringify(reflections)}`);
    // get all but one looking for smudges
    let mapped_elements = new Map();
    for (let i = 0; i < reflections.length; i++) {
        let elements = reflections[i];
        // elements is an array of values
        // check each element to see if it is already in the map
        for ( element of elements) {
            if (mapped_elements.has(element)) {
                let count = mapped_elements.get(element);
                mapped_elements.set(element, count + 1);
            } else {
                mapped_elements.set(element, 1);
            }
        }
    }
    console.log(`mapped_elements: ${JSON.stringify(Array.from(mapped_elements))}`);
    // smudge exists if count is 1 less than reflections.length.
    let smudges = Array.from(mapped_elements).filter(x => x[1] === reflections.length - 1);
    console.log(`smudges: ${JSON.stringify(smudges)}`);
    let common_elements = reflections[0].filter(x => reflections[1].includes(x));
    for (elements of reflections.slice(2)) {
        console.log(`elements: ${JSON.stringify(elements)}`);
        common_elements = common_elements.filter(x => elements.includes(x));
    }
    console.log(`common_elements: ${JSON.stringify(smudges[0])}`);

    return smudges[0] ? smudges[0][0] : undefined;
}

function horizontal_scan(image) {
    let markers = [];
    // console.log(`image: ${JSON.stringify(image)}`);
    // build vertical strings
    for (let col = 0; col < image[0].length; col++) {
        let col_string = [];
        for (let row = 0; row < image.length; row++) {
            col_string.push(image[row][col]);
        }

        let reflections = map_reflections(col_string);
        markers.push(reflections);
    }

    return markers;
}

function vertical_scan(image) {
    //console.log(`image: ${JSON.stringify(image)}`);
    let markers = [];
    for( let row = 0; row < image.length; row++) {

        let reflections = map_reflections(image[row]);
        markers.push(reflections);

    }
    return markers;
}

// let result = map_reflections("#.##..##.");
// console.log(`result: ${JSON.stringify(result)}`);


let result = 0;
for ( image of images) {
    // do vertical scan
    let reflections = vertical_scan(image);
    //console.log(`reflections: ${JSON.stringify(reflections)}`);
    let reflection_point = get_common_reflection_point(reflections);
    if ( reflection_point ) {
        console.log(`reflection_point: ${reflection_point}`);
        result += reflection_point;
    }
    // do horizontal scan
    let cols_above = horizontal_scan(image);
    // console.log(cols_above);
    reflection_point = get_common_reflection_point(cols_above);
    console.log(`reflection_point: ${reflection_point}`);
    if ( reflection_point ) {
        result += reflection_point *100;
        console.log(`reflection_point: ${reflection_point}`);
    }

}
console.log(`result: ${result}`);
