const fs = require("fs");
const readline = require("readline");
console.log("setup readstream");
const rl = readline.createInterface({
    input: fs.createReadStream("./input2.1"),
    output: process.stdout,
    terminal: false,
});

// record the information from each game (your puzzle input).
// Each game is listed with its ID number (like the `11` in `Game 11: ...`)
// followed by a semicolon-separated list of subsets of cubes that were revealed
// from the bag (like `3 red, 5 green, 4 blue`).

// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

// In game 1, three sets of cubes are revealed from the bag (and then put back again).
// The first set is 3 blue cubes and 4 red cubes;
// the second set is 1 red cube, 2 green cubes, and 6 blue cubes;
// the third set is only 2 green cubes.
//
// The Elf would first like to know which games would have been possible
// if the bag contained _only 12 red cubes, 13 green cubes, and 14 blue cubes_?
// In the example above, games 1, 2, and 5 would have been _possible_ if the bag
// had been loaded with that configuration. However, game 3 would have been _impossible_
// because at one point the Elf showed you 20 red cubes at once; similarly,
// game 4 would also have been _impossible_ because the Elf showed you
// 15 blue cubes at once.
// If you add up the IDs of the games that would have been possible, you get `_8_`.
//
// Determine which games would have been possible if the bag had been
// loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes.
// _What is the sum of the IDs of those games?_
possible_games = [];
rl.on("line", (line) => {
    console.log("on line: ", line);

    // transform the lines from
    // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    // to
    // [3 blue, 4 red], [1 red, 2 green, 6 blue], [2 green]
    // this is a game that has 3 sets of cubes revealed from the bag

    // possible games are limited by the number of cubes in the bag
    // if the bag has 12 red, 13 green, and 14 blue cubes

    // parse a game
    let game = line.split(": ");
    console.log("game: ", game);
    let game_id = game[0].split(" ")[1];

    let cubes = game[1].split("; ");
    console.log("cubes: ", cubes);
    // parse each set of cubes
    let sets = cubes.map(set => {
        return set.split(", ")
    })
    console.log("sets: ", sets);
    // [3 blue, 4 red]
    // count the number of each color
    let colors = {};
    sets.forEach(set => {
        set.forEach(col => {
            let [number, color] = col.split(" ");
            if(colors[color]) {
                // get max of the two numbers
                colors[color] = Math.max(colors[color], parseInt(number));
                // colors[color] += parseInt(number);
            } else {
                colors[color] = parseInt(number);
            }
        })
    })
    console.log("colors: ", colors);
    // check if the colors are within the limits
    let possible = true;
    if(colors["red"] > 12) {
        possible = false;
    }
    if(colors["green"] > 13) {
        possible = false;
    }
    if(colors["blue"] > 14) {
        possible = false;
    }
    console.log("possible: ", possible);
    if(possible) {
        possible_games.push(game_id);
    }



});

rl.on("close", () => {
    console.log("possible_games: ", possible_games);
    let game_sum = 0
    possible_games.forEach((game) => {
        console.log("game: ", game);
        game_sum += parseInt(game);
    });
    console.log("game_sum: ", game_sum);
});

