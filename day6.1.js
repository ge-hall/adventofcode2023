const fs = require('fs');

let seeds = [];
let maps = new Map();
let data = fs.readFileSync('test', 'utf8');
let lines = data.split('\n'); // Split lines into array


let times = lines[0].split(" ").slice(1).filter((x) => x.length > 0).map(Number)
console.log(times);
let distance = lines[1].split(" ").slice(1).filter((x) => x.length > 0).map(Number);
console.log(distance);
let results = [];
// races
for ( let r = 0; r < times.length; r++) {
    // run each race
    let record_count = 0;
    // formula is
    // 0 first distance is 0
    // 1 second distance += time-1 = 14 when time  = 15
    // 2 third distance += time-3 = 14 + 12 = 26
    // 3 fourth distance += time-5 = 26 + 10 = 36
    // 4 fifth distance += time-7 = 36 + 8 = 44
    // we can ignore 0
    // iterate over i = 1 to n i+=2
    // n_distance += time - (n-i)
    console.log(`Race ${r+1}`);
    for ( let button = 0; button < times[r]; button++) {
        let race_distance = 0;
        // release button at speed
        for (let ms = button; ms < times[r]; ms++) {
            // update race_distance
            race_distance += button;
        }
        console.log(`hold: ${button},  distance: ${race_distance}, record: ${distance[r]}`);
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

