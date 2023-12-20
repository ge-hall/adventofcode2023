const fs = require('fs');

let data = fs.readFileSync('test15', 'utf8');
let commands = data.split(','); // Split lines into array
console.log(`commands: ${JSON.stringify(commands)}`);
let hashMap = new Map();
for ( let op = 0; op < commands.length; op++) {
    let val = commands[op].split(/(=|-)/);
    console.log(`val: ${JSON.stringify(val[0])}`);
    let h = hash(val[0]);
    console.log(`hash(val): ${h}`);
    let map = hashMap.get(h);

    if (commands[op].includes("=")) {
        if (map === undefined) {
            map = new Map();
            map.set(val[0], val[2]);
            hashMap.set(h, map);
        } else {
            map.set(val[0], val[2]);
        }
    } else {
       if (map !== undefined) {
           let result = map.get(val[0]);
           console.log(`result: ${result}`);
       }
    }
    console.log(`hashMap: ${JSON.stringify(Array.from(hashMap.get(0)))}`);
    //process result
}
let val = 'qp';
hash(val);

function hash(val) {
let current = 0

    for (let c = 0; c < val.length; c++) {
        //console.log(`val[c]: ${val.charCodeAt(c)}`);
        current += val.charCodeAt(c);
        //console.log(`current: ${current}`);
        current *= 17;
        //console.log(`current *= 17: ${current}`);
        current %= 256;
        //console.log(`current %= 256: ${current}`);
    }
    //console.log(`current: ${current}`);
    return current;
}