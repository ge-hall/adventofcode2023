function sumCalibrationValues(document) {
    let sum = 0;

    // Split the document into lines
    const lines = document.split('\n');

    // Iterate through each line
    for (let line of lines) {
        // Remove any non-digit characters and extract the first and last digits
        const digits = line.replace(/\D/g, '');
        const firstDigit = digits.charAt(0);
        const lastDigit = digits.charAt(digits.length - 1);

        // Convert the digits to a number and add it to the sum
        sum += parseInt(firstDigit + lastDigit);
    }

    return sum;
}

// Example usage
const document = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const totalSum = sumCalibrationValues(document);
console.log(totalSum);