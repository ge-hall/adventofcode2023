const fs = require('fs');

let data = fs.readFileSync('test', 'utf8');
let map = new Map();
let lines = data.split('\n'); // Split lines into array
console.log(`lines: ${JSON.stringify(lines)}`);

// read first line as instructionr
let instructions = lines[0];
console.log(`instruction: ${instructions}`);

// read second line as blank
let blank = lines[1];
console.log(`blank: ${blank}`);

// read remaining lines as instructions into map
for (let i = 2; i < lines.length; i++) {
    let line = lines[i];
    console.log(`line: ${line}`);

    // split line into parts
    let parts = line.split("=");
    // console.log(`parts: ${parts}`);

    // trim parts of spaces
    parts[0] = parts[0].trim();
    parts[1] = parts[1].trim();

    // extract numbers fromparts[1]
    // remove "()"
    parts[1] = parts[1].replace(/\(|\)/g, "");
    // console.log(`parts[1]: ${parts[1]}`);

    // split parts[1] into instructions
    parts[1] = parts[1].split(",").map(x => x.trim());
    // console.log(`parts[1]: ${parts[1]}`);

    // add parts to  map
    map.set(parts[0], parts[1]);
}
console.log(`map: ${JSON.stringify(Array.from(map))}`);

// process instructions using map and not TreeNode
// use infinite loop with break on condition
let steps = 0;
let limit = 12;//Number.MAX_SAFE_INTEGER;


// find all ghost_starts
let ghost_elements = [];
for ( let [key] of map) {
    if ( key.endsWith("A") ) {
        ghost_elements.push(key);
    }
}
console.log(`instruction: ${instructions}`);
console.log(`ghost_starts: ${JSON.stringify(ghost_elements)}`);


while (true) {
    // iterate over instructions with condition to break
    // trigger break with variable
    let found = false;

    // TODO: reduce checkspace by finding solve
    // for first ghost_element
    // then incrementally check next ghost_element
    // if not found at same level, continues search on that element
    // if solve found for that ghost_element, then incrementally check
    // next ghost_element.
    // This would require different algorithm which would be
    // more manageable if traversing occurred in a function.
    // this would allow the depth to be returned when an Z is found
    // for each ghost_element.
    // We could track search depth for each ghost_element in a simple array
    // [25,0,0,0,0] for example to show that ghost_element 0 is at depth 25
    // the rest have not been searched.
    // next we search ghost_elements[1] from depths[1]
    // this approach doesn't really make significant saving as the solution
    // depth is the same for all ghost_elements. So if we check when we reach
    // any Z we are not reducing the ops much at all.
    for ( let i = 0; i < instructions.length; i++) {
        // count steps
        steps++;

        // check if limit reached for DEBUG only
        if ( steps >= limit ) {
            found = true;
            break;
        }

        // get current instruction
        let instruction = instructions[i];
        // console.log(`current instruction: ${instruction}`);

        // For this current instruction
        // need to run over all ghost_starts
        // to be iterative and synchronised
        // need to have array of current_elements
        // get current element.
        for (let i = 0; i < ghost_elements.length; i++) {
            // get current element
            let current = map.get(ghost_elements[i]);
            // console.log(`current element: ${current}`);

            // update current element based on instruction
            if (instruction === "L") {
                ghost_elements[i] = current[0];
            } else if (instruction === "R") {
                ghost_elements[i] = current[1];
            }
        }
        console.log(`next element: ${ghost_elements}`);
        // break if all elements ends with Z
        if (ghost_elements.filter(x => x.endsWith("Z")).length === ghost_elements.length) {
            console.log(`All Z`);
            found = true;
            break;
        }
    }
    if ( found ) {
        console.log(`steps: ${steps}`);
        break;
    }

}
