function getCalibrationValue(line) {
    // Define a mapping of spelled-out digits to their numerical representation
    const digits = {
        "zero": 0,
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9
    };

    // Remove any non-word characters and split the line into words
    const words = line.replace(/\W/g, ' ').trim().split(' ');

    // Combine the first and last words to form a number
    const firstDigit = digits[words[0]];
    const lastDigit = digits[words[words.length - 1]];
    const number = parseInt(`${firstDigit}${lastDigit}`);

    return number;
}

function sumCalibrationValues(document) {
    let sum = 0;

    // Split the document into lines
    const lines = document.split('\n');

    // Iterate through each line
    for (let line of lines) {
        // Get the calibration value for the line and add it to the sum
        sum += getCalibrationValue(line);
    }

    return sum;
}

// Example usage
const document = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const totalSum = sumCalibrationValues(document);
console.log(totalSum);