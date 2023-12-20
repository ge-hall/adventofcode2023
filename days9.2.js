const fs = require('fs');

let data = fs.readFileSync('input9.1', 'utf8');
let map = new Map();
let lines = data.split('\n'); // Split lines into array
console.log(`lines: ${JSON.stringify(lines)}`);
let histories = [];

for ( let i = 0; i < lines.length; i++) {
    let line = lines[i];
    console.log(`line: ${line}`);
    histories.push(line.split(" ").map((x) => parseInt(x)));
}

console.log(`histories: ${JSON.stringify(histories)}`);

let extrapolation= [];
let idx = 0;

for ( history of histories) {
    console.log(`history: ${JSON.stringify(history)}`);
    // get differences

    let diff = [];
    let current = [...history];
    extrapolation.push([])
    extrapolation[idx].push(current);
    console.log(`current: ${JSON.stringify(current)}`);
    while (  current.filter((x) => x !== 0).length !== 0) {
        console.log(`current: ${JSON.stringify(current)}`);
        for (let i = 1; i < current.length; i++) {
            diff.push(current[i] - current[i - 1]);
        }
        extrapolation[idx].push(diff);
        current = diff;
        diff = [];
        console.log(`current next: ${JSON.stringify(current)}`);
        console.log(`checking: ${current.filter((x) => x !== 0).length}`);

    }
    console.log(`next: ${JSON.stringify(extrapolation)}`);
    idx++;
}

let results = [];
// process extrapolations
for ( ex of extrapolation) {
    console.log(`extrapolation: ${JSON.stringify(ex)}`);
    let current = ex.reverse();
    console.log(`current: ${JSON.stringify(current)}`);

    let prev = 0;
    for ( let i = 1; i < current.length; i++) {
        console.log(`current: ${JSON.stringify(current[i])}`);
        prev = parseInt(current[i][0])-prev;
        console.log(`prev: ${prev}`);
    }
    console.log(`next: ${prev}`);
    results.push(prev)

}
console.log(`results: ${results.reduce((a, b) => a + b, 0)}`);

