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

// In game 1, the game could have been played with as few as 4 red, 2 green, and 6 blue cubes.
// If any color had even one fewer cube, the game would have been impossible.
// Game 2 could have been played with a minimum of 1 red, 3 green, and 4 blue cubes.
// Game 3 must have been played with at least 20 red, 13 green, and 6 blue cubes.
// Game 4 required at least 14 red, 3 green, and 15 blue cubes.
//    Game 5 needed no fewer than 6 red, 3 green, and 2 blue cubes in the bag.

//    The power of a set of cubes is equal to the numbers of red, green, and blue cubes
//    multiplied together. The power of the minimum set of cubes in game 1 is 48.
//    In games 2-5 it was 12, 1560, 630, and 36, respectively.
//    Adding up these five powers produces the sum 2286.


// what is the fewest number of cubes of each color that could have been in the bag
// to make the game possible?

power_games = [];
rl.on("line",
    (line) => {
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
                if (colors[color]) {
                    // get max of the two numbers
                    colors[color] = Math.max(colors[color], parseInt(number));
                    // colors[color] += parseInt(number);
                } else {
                    colors[color] = parseInt(number);
                }
            })
        })
        console.log("colors: ", colors);
        // multiply the number of each color together to get the power
        let power = colors["red"] * colors["green"] * colors["blue"];
        power_games.push(power);


    });

rl.on("close", () => {
    console.log("power_games: ", power_games);
    let game_sum = 0
    power_games.forEach((game) => {
        console.log("game: ", game);
        game_sum += parseInt(game);
    });
    console.log("game_sum: ", game_sum);
});

