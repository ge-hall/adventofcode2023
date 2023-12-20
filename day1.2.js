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

  function isNumber(current) {
    return ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero"].includes(current);
  }
  function word_to_number(word) {
    switch(word) {
      case "one":
        return "1";
      case "two":
        return "2";
      case "three":
        return "3";
      case "four":
        return "4";
      case "five":
        return "5";
      case "six":
        return "6";
      case "seven":
        return "7";
      case "eight":
        return "8";
      case "nine":
        return "9";
      case "zero":
        return "0";
      default:
        return "";
    }
  }

  function get_numbers_from_words(remainder) {
    remainder.forEach(ch => {

    })

    return ["12", 3];
  }

  function seek_number(line, ptr)
  {
    // seek through line until a number is found
    // number must start at ptr
    // give up if line[ptr] is a digit or ptr is out of bounds
    let number = ""
    let current = ""
    while (ptr < line.length) {
      if (!isNaN(line[ptr])){
        return "";
      }
      current += line[ptr];
      if (isNumber(current)) {
        return word_to_number(current);
      }
      ptr++;
    }
    return "";

  }

  function get_coord(line) {

    let first = ""
    let last = ""
   // iterate through line using for while with a ptr to current pos
    let current = ""
    let ptr = 0
    while (ptr < line.length) {
      current = line[ptr];
      console.log("current: ", current);
      // if digit set first and last and continue to next char
      if (!isNaN(current)) {
        if (first === "") {
          first = current;
        }
        last = current;
        ptr++;
        continue;
      }
      // if letter, seek for number
      else {
        let number = seek_number(line, ptr);
        if (number !== "") {
            if (first === "") {
                first = number;
            }
            last = number;
        }
      }
      ptr++;
    }

    // if current is a number, add to first if first is empty
    // if current is a number, add to last

    // if current is a letter, start seek for number as word



    return first + last;
  }

  const coord = get_coord(line);

  coords.push(coord);
});
//On each line, the calibration value can be found by combining the
// _first digit_ and the _last digit_ (in that order) to form a single
// _two-digit number_

// two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen

// In this example, the calibration values are `29`, `83`, `13`, `24`, `42`, `14`, and `76`.
// Adding these together produces `_281_`.

rl.on("close", () => {
  console.log(coords);
  let coord_sum = 0
  coords.forEach((cal) => {
    console.log("coord: ", cal);
    coord_sum += parseInt(cal);
  });
  console.log("coord_sum: ", coord_sum);
});
