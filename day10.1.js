const fs = require('fs');

let data = fs.readFileSync('test', 'utf8');
let map = new Map();
let lines = data.split('\n'); // Split lines into array
console.log(`lines: ${JSON.stringify(lines)}`);

// convert input to 2d array
let metal_island = [];
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    metal_island.push(line.split(""));
}
let r = 1;
let c = 2;

for ( let row = 0; row < metal_island.length; row++) {
    let row_string = "";
    for ( let col = 0; col < metal_island[row].length; col++) {
        row_string += metal_island[row][col];
    }
    console.log(`${row_string}`);
}

/**
 * This function returns the possible directions that can be taken from a given position on a metal island grid.
 * It checks the neighboring cells for valid directions and adds them to an array.
 *
 * @param {number} r - The row index of the current position on the metal island grid.
 * @param {number} c - The column index of the current position on the metal island grid.
 * @param {Array<Array<string>>} metal_island - The metal island grid.
 *
 * @return {Array<string>} - An array of possible directions ('north', 'east', 'south', 'west') that can be taken from the current position.
 */
function getPossibleDirections(r, c, metal_island) {
    let possibleDirections = [];

// check north
    if (r > 0 && (metal_island[r - 1][c] === '|' || metal_island[r - 1][c] === 'F' || metal_island[r - 1][c] === '7')) {
        possibleDirections.push('north');
    }

// check east
    if (c < metal_island[r].length - 1 &&
        (metal_island[r][c + 1] === '-'
            || metal_island[r][c + 1] === 'J'
            || metal_island[r][c + 1] === '7'
        )) {
        possibleDirections.push('east');
    }

// check south
    if (r < metal_island.length - 1 &&
        (metal_island[r + 1][c] === '|'
            || metal_island[r + 1][c] === 'L'
            || metal_island[r + 1][c] === 'J'
        )) {
        possibleDirections.push('south');
    }

// check west
    if (c > 0 &&
        (metal_island[r][c - 1] === '-'
            || metal_island[r][c - 1] === 'L'
            || metal_island[r][c - 1] === 'F'
        )) {
        possibleDirections.push('west');
    }
    return possibleDirections;
}
/**
 * Calculates the next position based on the current row and column and the first direction.
 * Please note that the values of 'r', 'c', and 'first_direction' variables must be set before calling this function.
 *
 * @returns {Object} An object containing the next row and next column values.
 */
function getNextPosition( r, c, direction) {
    let nextRow = r;
    let nextCol = c;

    if (direction === "north") {
        nextRow--;
    } else if (direction === "east") {
        nextCol++;
    } else if (direction === "south") {
        nextRow++;
    } else if (direction === "west") {
        nextCol--;
    }
    return {nextRow, nextCol};
}

/**
 * Checks if the given coordinates are out of bounds on the metal island.
 *
 * @param {number} nextRow - The next row coordinate.
 * @param {number} nextCol - The next column coordinate.
 * @param {Array} metal_island - The metal island grid.
 * @returns {boolean} - Returns true if the coordinates are out of bounds, false otherwise.
 */
function isOutOfBounds(nextRow, nextCol, metal_island) {
    if (nextRow < 0 || nextRow >= metal_island.length || metal_island[nextRow] === undefined) {
        return true;
    }
    if (nextCol < 0 || nextCol >= metal_island[nextRow].length) {
        return true;
    }
    return false;
}

// rules

//  | is a vertical pipe connecting north and south.
//  - is a horizontal pipe connecting east and west.
//  L is a 90-degree bend connecting north and east.
//  J is a 90-degree bend connecting north and west.
//  7 is a 90-degree bend connecting south and west.
//  F is a 90-degree bend connecting south and east.
//  . is ground; there is no pipe in this tile.
//  S is the starting position of the animal;
//  there is a pipe on this tile, but your sketch
//  doesn't show what shape the pipe has.

// Based on the acoustics of the animal's scurrying,
// you're confident the pipe that contains the animal
// is one large, continuous loop.

// process
// start at S and travel along the pipes
// when you reach an L or J, turn 90 degrees
// when you reach a 7, turn 180 degrees
// when you reach a F, turn 270 degrees
// when you reach a ., stop
// when you reach an S, stop and mark pipe as the loop
// middle of the loop is the answer

// find S
for ( let i = 0; i < metal_island.length; i++ ) {
    for ( let j = 0; j < metal_island[i].length; j++ ) {
        if ( metal_island[i][j] === 'S' ) {
            r = i;
            c = j;
        }
    }
}


// Start as S


// check possible directions
let possible_directions = getPossibleDirections(r, c, metal_island);
console.log('Possible directions:', possible_directions);

// follow the first path
let direction = possible_directions[0];
console.log(`first direction: ${direction}`);
let possible_loops = [[r, c]];
// loop until we identify the loop
let loop_count = 0;

while (loop_count < 8) {
    let current = metal_island[r][c];
    console.log(`r: ${r}, c: ${c} = ${current}`);

    loop_count++;

    let {nextRow, nextCol} = getNextPosition(r, c, direction);
    console.log(`nextRow: ${nextRow}, nextCol: ${nextCol}`);

    // check if illegal move
    if (isOutOfBounds(nextRow, nextCol, metal_island)) {
        console.log(`Illegal move - out of bounds: ${nextRow}, ${nextCol}`);
        break;
    }

    let next = metal_island[nextRow][nextCol];
    possible_loops[0].push([nextRow, nextCol]);

    // should be able to use a switch statement
    // to work out next direction or end
    switch (next) {
        case "F":
            if ( direction === "north" ) {
                direction = "east";
            } else if ( direction === "west" ) {
                direction = "south";
            } else {
                console.log(`next: ${next} is not a valid direction`);
                break;
            }
            console.log(`next: ${next}, direction: ${direction}`);
            break;
        case "L":

            if ( direction === "west" ) {
                direction = "north";
            } else if ( direction === "south" ) {
                direction = "east";
            } else {
                console.log(`next: ${next} is not a valid direction`);
                break;
            }
            console.log(`next: ${next}, direction: ${direction}`);
            break;
        case "J":
            if ( direction === "west" ) {
                direction = "north";
            } else if ( direction === "south" ) {
                direction = "west";
            } else {
                console.log(`next: ${next} is not a valid direction`);
                break;
            }
            console.log(`next: ${next}, direction: ${direction}`);
            break;
        case "7":
            if ( direction === "east" ) {
                direction = "south";
            } else if ( direction === "north" ) {
                direction = "west";
            } else {
                console.log(`next: ${next} is not a valid direction`);
                break;
            }
            console.log(`next: ${next}, direction: ${direction}`);
            break;
        case "S":
            console.log(`found loop: ${current}, next: ${metal_island[nextRow][nextCol]}`);
            break;
        case "-":

            if ( direction === "east" ) {
                direction = "east";
            } else if ( direction === "west" ) {
                direction = "west";
            } else {
                console.log(`next: ${next} is not a valid direction`);
                break;
            }
            console.log(`next: ${next}, direction: ${direction}`);
            break;
        case "|":
            if ( direction === "north" ) {
                direction = "north";
            } else if ( direction === "south" ) {
                direction = "south";
            } else {
                console.log(`next: ${next} is not a valid direction`);
                break;
            }
            console.log(`next: ${next}, direction: ${direction}`);
            break;
    }

    // set current
    r = nextRow;
    c = nextCol;


    console.log(`Next position: r: ${nextRow}, c: ${nextCol} = ${metal_island[nextRow][nextCol]}`);

}
console.log(`Possible loops: ${possible_loops}`);


