const fs = require('fs');

let seeds = [];
let maps = new Map();
let data = fs.readFileSync('input6.1', 'utf8');
let lines = data.split('\n'); // Split lines into array
console.log(`lines: ${JSON.stringify(lines)}`);

let times = []
    times.push(parseInt(lines[0].split(" ").slice(1).filter((x) => x.length > 0).join("")));
console.log(`times: ${JSON.stringify(times[0])}`);
let distance = []
    distance.push(parseInt(lines[1].split(" ").slice(1).filter((x) => x.length > 0).join("")));
console.log(`distance: ${distance[0]}`);
let results = [];
let records = 0;
// races
for ( let r = 0; r < times.length; r++) {


    // we can ignore 0
    // iterate over i = 1 to n i+=2
    // n_distance += time - (n-i)
    // run each race
    let record_count = 0;
    console.log(`Race ${r+1}`);
    let race_distance = 0;
    for ( let button = 1, i = 1; i < times[r]; button+=2, i++) {

        // release button at speed
        //for (let ms = button; ms < times[r]; ms++) {
            // update race_distance
            race_distance +=  times[r]-button;
        //}
        //console.log(`hold: ${i},  distance: ${race_distance}, record: ${distance[r]}`);
        if (race_distance > distance[r]) {
            record_count++;
        }
    }
   results.push(record_count);
   console.log(`Records: ${record_count}`);

}
let result = 1;
for (let i = 0; i < results.length; i++) {
    result *= results[i];
}
console.log(`Result: ${result}`);

