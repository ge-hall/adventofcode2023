const fs = require("fs");
const readline = require("readline");
console.log("setup readstream");
const rl = readline.createInterface({
    input: fs.createReadStream("./input3.1"),
    output: process.stdout,
    terminal: false,
});

// You and the Elf eventually reach a gondola lift station;
// he says the gondola lift will take you up to the water source,
// but this is as far as he can bring you. You go inside.
//
//     It doesn't take long to find the gondolas, but there seems
//     to be a problem: they're not moving.
//
// "Aaah!"
//
// You turn around to see a slightly-greasy Elf with a wrench and a
// look of surprise.
//
// "Sorry, I wasn't expecting anyone! The gondola
// lift isn't working right now; it'll still be a while before I can
// fix it."
//
// You offer to help.
//
//     The engineer explains that an engine part seems to be missing
//     from the engine, but nobody can figure out which one. If you can
//     add up all the part numbers in the engine schematic, it should be
//     easy to work out which part is missing.
//
//     The engine schematic (your puzzle input) consists of a visual
//     representation of the engine. There are lots of numbers and symbols
//     you don't really understand, but apparently any number adjacent to a
//     symbol, even diagonally, is a "part number" and should be included in
//     your sum. (Periods (.) do not count as a symbol.)
//
// Here is an example engine schematic:
//
// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..
//
// In this schematic, two numbers are not part numbers because
// they are not adjacent to a symbol: 114 (top right) and 58 (middle right).
// Every other number is adjacent to a symbol and so is a part number;
// their sum is 4361.
//
// Of course, the actual engine schematic is much larger. What is the sum
// of all of the part numbers in the engine schematic?
class SpecialSet {
    constructor() {
        this.data = {};
    }

    add(coord, value) {
        const key = JSON.stringify([...coord, value]);
        this.data[key] = [coord, value];
    }

    has(coord, value) {
        const key = JSON.stringify([...coord, value]);
        return this.data[key] !== undefined;
    }

    values() {
        return Object.values(this.data);
    }
}
let part_vectors = []
let part_numbers = [];
let symbols = [];
let line_idx = 0;
rl.on("line", (line) => {
   //console.log("on line: ", line);
    // build list of part_number vectors
    // [[[0,0],[0,2]], ...]
    let part = [];
    let part_number = "";
    line.split("").forEach((char, index) => {
       //console.log("char: ", char);
        if(!isNaN(char)){
            part_number += char;
            if (part.length === 0){
                // set both coordinates to the same value as we don't know the length of the part yet
                part.push([line_idx, index]);
                part.push([line_idx, index]);
            }
            else {
                // update the second coordinate as we know the length of the part now
                    part[1] = [line_idx, index];

            }
        }
        else {
            if (part.length === 2) {
                //console.log("part: ", part);
                part_numbers.push(part_number);
                part_vectors.push(part);
                part = [];
                part_number = "";
            }
            // build list of symbols
            // [[1,3], [3,6], ...]
            if(char !== "."){
                symbols.push([line_idx, index]);
            }
        }
    });
    line_idx++;


    // check if each part_number vector is adjacent to a symbol
    // [1,3] is adjacent to [0,2] as both points are within 1 of each other
    // d = | (x2 - x1) * (y1 - y0) - (x1 - x0) * (y2 - y1) | / sqrt( (x2 - x1)^2 + (y2 - y1)^2 )
    parts_adjacent = new Set();
    parts_adjacent_label = [];
    part_vectors.forEach((part_vector, idx) => {
        // iterate over each point in a part_vector
        for( let i = part_vector[0][1]; i <= part_vector[1][1]; i++){
            // iterate over each symbol
            if (symbols.some((symbol) => {
                //console.log(`part_vector: ${part_vector}, symbol: ${symbol}`);
                //console.log(`dx: ${Math.abs(part_vector[0][0] - symbol[0])}, dy: ${Math.abs(i - symbol[1])}`);
                // if the point is within 1 of the symbol, add it to parts_adjacent
                return (Math.abs(part_vector[0][0] - symbol[0]) <= 1 && Math.abs(i - symbol[1]) <= 1)
            })) {
                if(!parts_adjacent.has(part_vector)){
                    parts_adjacent_label.push(part_numbers[idx]);
                }
                parts_adjacent.add(part_vector);
            }

        }
    });

});

rl.on("close", () => {
    let sum = 0;
    parts_adjacent_label.forEach((part) => {
        sum += parseInt(part);
    });
    console.log("parts_adjacent_label: ", parts_adjacent_label);
    console.log("sum: ", sum);
    //console.log("part_vectors: ", part_vectors);
    //console.log("symbols: ", symbols);
    console.log("done");
});
