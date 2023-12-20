const fs = require('fs');

let maps = new Map();
let data = fs.readFileSync('input8.1', 'utf8');
let lines = data.split('\n'); // Split lines into array
console.log(`lines: ${JSON.stringify(lines)}`);

class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [null, null];
    }

    addChild(value, pos) {
        if ( pos === 0 ) {
            this.children[0] = new TreeNode(value);
        } else {
            this.children[1] = new TreeNode(value);
        }
    }

    getValue() {
        return this.value;
    }

    getLeft()  {
        return this.children[0];
    }

    getRight() {
        return this.children[1];
    }
}

// read first line as instructionr
let instructions = lines[0];
console.log(`instruction: ${instructions}`);

// read second line as blank
let blank = lines[1];
console.log(`blank: ${blank}`);

let map  = new Map();
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
let limit = Number.MAX_SAFE_INTEGER;

let current_element = "AAA";
console.log(`initial current_element: ${JSON.stringify(current_element)}`);

while (true) {
    // iterate over instructions with condition to break
    // trigger break with variable
    let found = false;
    for ( let i = 0; i < instructions.length; i++) {
        steps++;
        if ( steps >= limit ) {
            found = true;
            break;
        }
        // get current instruction
        let instruction = instructions[i];
         console.log(`current instruction: ${instruction}`);

        // get current element
        let current = map.get(current_element);
        console.log(`current element: ${current}`);

        // update current element based on instruction
        if ( instruction === "L") {
            current_element = current[0];
        } else if ( instruction === "R") {
            current_element = current[1];
        }
        // console.log(`current_element: ${current_element}`);

        // break if instruction is "end"
        if (current_element === "ZZZ") {
            console.log(`instruction: ${instructions}`);
            found = true;
            break;
        }

    }
    if ( found ) {
        console.log(`steps: ${steps}`);
        break;
    }

}
