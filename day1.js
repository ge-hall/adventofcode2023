const fs = require("fs");
const readline = require("readline");
console.log("setup readstream");
const rl = readline.createInterface({
  input: fs.createReadStream("./input1.2"),
  output: process.stdout,
  terminal: false,
});

const coords = [];

rl.on("line", (line) => {
  console.log("on line: ", line);

  function get_coord(line) {
    let first = ""
    let last = ""
    line.split("").forEach((ch) => {
      if(!isNaN(ch)) {
        if(first === "") {
          first = ch
        } else {
          last = ch
        }
      }
    });
    if(last === "") {
      last = first
    }
    return first + last;
  }

  const coord = get_coord(line);

  coords.push(coord);
});
//On each line, the calibration value can be found by combining the
// _first digit_ and the _last digit_ (in that order) to form a single
// _two-digit number_

// In this example, the calibration values of these four lines are `12`, `38`, `15`, and `77`.
// Adding these together produces `_142_`.
rl.on("close", () => {
  console.log(coords);
  let coord_sum = 0
  coords.forEach((cal) => {
    console.log("coord: ", cal);
    coord_sum += parseInt(cal);
  });
  console.log("coord_sum: ", coord_sum);
});
