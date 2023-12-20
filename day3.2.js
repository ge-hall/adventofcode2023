const fs = require("fs");
const readline = require("readline");
console.log("setup readstream");
const rl = readline.createInterface({
    input: fs.createReadStream("./input3.1"),
    output: process.stdout,
    terminal: false,
});

let symbols_points = [];
let grid = [];
let r = 0;
rl.on("line", (line) => {
    console.log(line);
    // process rows and  columns to find symbols
    for( let c = 0; c < line.length; c++ ) {
        if(line[c] !== "." && isNaN(line[c]) ){
            symbols_points.push([r, c]);
        }
        grid[r] = [...line];
    }
    r++;
});

rl.on("close", () => {
    // check for parts adjacent to symbols
    let parts_adjacent = new Set();
    symbols_points.forEach((symbol) => {
        console.log(`symbol: ${symbol}`);
        for (let r = symbol[0]-1; r <= symbol[0]+1; r++) {
            for (let c = symbol[1]-1; c <= symbol[1]+1; c++) {
                // keep to the grid
                if (r>=0 && c>=0 && r<grid.length && c<grid[r].length) {
                    console.log(`r: ${r}, c: ${c}, grid[r][c]: ${grid[r][c]}`)
                    if (grid[r][c] !== "." && !isNaN(parseInt(grid[r][c],10))) {

                        // traverse to start of number
                        let ch = c;
                        // traverse left until we hit a non-number or the start of the line
                        while (ch >= 0 && !isNaN(parseInt(grid[r][ch],10))) {
                            ch--;
                        }
                        console.log(`traverse to start of number:{r: ${r}, ch: ${ch+1}}`);
                        parts_adjacent.add(`${r},${ch+1}`);


                    }
                }
            }
        }
    });
    console.log("grid: ", grid[1][3]);
    console.log("symbols_points: ", symbols_points);
    console.log("parts_adjacent: ", parts_adjacent);
    let sum = 0;
    parts_adjacent.forEach((part) => {
        let [r,c] = part.split(",");
        let p = "";
        while (!isNaN(parseInt(grid[r][c],10))) {
            p += grid[r][c];
            c++;
        }
        console.log(`part: ${p}`);
        sum += parseInt(p);
    });
    console.log("sum: ", sum);
    console.log("done");
});
