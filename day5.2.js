const fs = require('fs');

let seeds = [];
let maps = new Map();

let data = fs.readFileSync('test', 'utf8');

let lines = data.split('\n'); // Split lines into array


let lineNum = 0;
let mapName = "";
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.length === 0) {
        continue;
    }
    if (lineNum++ === 0) {
        // get seeds
        seeds = line.split(":")[1].trim().split(" ").map(Number);
        // expand seed ranges to seeds
        console.log(seeds);
        continue;
    }

    // ignore empty lines
    if (line.length === 0) {
        return;
    }

    // ignore lines starting with alpha
    if (line.match(/^[a-zA-Z]/)) {

        mapName = line.split(" ")[0]

        maps.set(mapName, []);

// TODO: something is wrong here
        for (let j = i+1; j < lines.length; j++) {
            if (lines[j].length === 0 || isNaN(lines[j].split(" ")[0])) {
                i = j - 1; // Set outer loop index to correct position
                break;
            }

            maps.get(mapName).push(lines[j].split(" ").map(Number));
        }

    }
}


console.log(`maps: ${JSON.stringify(Array.from(maps))}`);

function tryMap(seed, dst, src, rng) {
    // if seed is in range of src
    if (seed >= src && seed <= src + rng) {
        return dst + (seed - src);
    }
    return seed;
}

// mapping a layer iterates through current map
function mapLayers(seed, map) {
    for( let i = 0; i < map.length; i++) {
        //console.log(`mapping layer: ${JSON.stringify(map[i])} with seed: ${seed}`);
        let [dst, src, rng] = map[i];
        // find map with seed
        let mapped = tryMap(seed, dst, src, rng);
        if ( mapped !== seed) {
            return mapped;
        }
    }
    return seed;
}


function findLocation(seed, maps) {
    //console.log(`searching map`);
    let val = seed;
    for( let [key, value] of maps) {
        //console.log(`key: ${key}, value: ${JSON.stringify(value)}`);
        // for current map, map this layer
        val= mapLayers(val, value);
    }
    return val;
}

let location = Number.MAX_SAFE_INTEGER;
for ( let i = 0; i < seeds.length; i+=2) {
    //console.log(`seeds: ${seeds[i]}, ${seeds[i+1]}`);
    for (let seed = seeds[i]; seed <= seeds[i]+seeds[i+1]; seed++) {
        let val = findLocation(seed, maps);
        if ( val < location) {
            location = val;
        }
        // console.log(`seed: ${seed}, location: ${location}`);
    }
}
console.log(`minimum location: ${location}`);
console.log("done reading file");



