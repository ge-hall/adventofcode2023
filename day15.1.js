const fs = require('fs');

let data = fs.readFileSync('input15.1', 'utf8');
let commands = data.split(','); // Split lines into array
console.log(`commands: ${JSON.stringify(commands)}`);


//let val = 'rn=1';

let sum = 0;
for ( let i = 0; i < commands.length; i++) {
    console.log(`commands[i]: ${commands[i]}`);
    val = runCommand(commands[i]);
    console.log(`val: ${val}`);
    sum += val;
}
console.log(`sum: ${sum}`);

function runCommand(val) {
    let current = 0

    for (let c = 0; c < val.length; c++) {
        console.log(`val[c]: ${val.charCodeAt(c)}`);
        current += val.charCodeAt(c);
        console.log(`current: ${current}`);
        current *= 17;
        console.log(`current *= 17: ${current}`);
        current %= 256;
        console.log(`current %= 256: ${current}`);
    }
    console.log(`current: ${current}`);
    return current;
}