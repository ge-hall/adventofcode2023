const fs = require('fs');

let maps = new Map();
let data = fs.readFileSync('test', 'utf8');
let lines = data.split('\n'); // Split lines into array
console.log(`lines: ${JSON.stringify(lines)}`);

// Five of a kind, where all five cards have the same label: AAAAA
// Four of a kind, where four cards have the same label and one card has a different label: AA8AA
// Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
// Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
// Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
// One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
// High card, where all cards' labels are distinct: 23456

const FIVE_OF_A_KIND = 0;
const FOUR_OF_A_KIND = 1;
const FULL_HOUSE = 2;
const THREE_OF_A_KIND = 3;
const TWO_PAIR = 4;
const ONE_PAIR = 5;
const HIGH_CARD = 6;
function hand_type(evaluation) {
    if (evaluation === FIVE_OF_A_KIND) {
        return 'Five of a kind';
    } else if (evaluation === FOUR_OF_A_KIND) {
        return 'Four of a kind';
    } else if (evaluation === FULL_HOUSE) {
        return 'Full house';
    } else if (evaluation === THREE_OF_A_KIND) {
        return 'Three of a kind';
    } else if (evaluation === TWO_PAIR) {
        return 'Two pair';
    } else if (evaluation === ONE_PAIR) {
        return 'One pair';
    } else if (evaluation === HIGH_CARD) {
        return 'High card';
    }
}
const CARD_ORDER = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
function evaluate(hand) {
    console.log(`hand: ${hand}`);
    let cards = new Map()
    for ( let card = 0; card <hand.length; card++) {
        if (cards.has(hand[card])) {
            cards.set(hand[card], cards.get(hand[card]) + 1);
        } else {
            cards.set(hand[card], 1);
        }
    }
    console.log(`cards: ${JSON.stringify(Array.from(cards.entries()))}`);
    let jokers = 0;
    if ( cards.has('J')) {
        jokers = cards.get('J');
        cards.delete('J');
    }
    let pairs = 0;
    let threeOfKind = 0;
    let fourOfKind = 0;
    let fiveOfKind = 0;
    for ( let [card, count] of cards) {
        if (count === 2) {
            pairs++;
        } else if (count === 3) {
            threeOfKind++;
        } else if (count === 4) {
            fourOfKind++;
        } else if (count === 5) {
            fiveOfKind++;
        }
    }
    if ( fiveOfKind > 0
        || (fourOfKind === 1 && jokers === 1)
        || (threeOfKind === 1 && jokers === 2)
        || (pairs === 2 && jokers === 1)
        || (pairs === 1 && jokers === 3)){
        return FIVE_OF_A_KIND
    } else if ( fourOfKind === 1
        || (threeOfKind && jokers ===1)
        || (pairs > 0 && jokers === 2)) {
        return FOUR_OF_A_KIND
    } else if ( (threeOfKind > 0 && pairs > 0)
        || (pairs === 2 && jokers === 1)) {
        return FULL_HOUSE
    } else if ( threeOfKind > 0
        || (pairs === 1 && jokers === 1)) {
        return THREE_OF_A_KIND
    } else if ( pairs > 1
        || (pairs === 1 && jokers === 1)) {
        return TWO_PAIR
    } else if ( (pairs === 1 && jokers ===0)
        || (pairs === 0 && jokers === 1)) {
        return ONE_PAIR
    } else if ( jokers >= 4) {
        return FIVE_OF_A_KIND
    } else if ( jokers === 3) {
        return FOUR_OF_A_KIND
    } else if ( jokers === 2) {
        return THREE_OF_A_KIND
    } else if ( jokers === 1) {
        return ONE_PAIR
    }else {
        return HIGH_CARD
    }

}
let hands = [];
for ( let i = 0; i < lines.length; i++) {
    let [hand, bid] = lines[i].split(" ");
    let result = evaluate(hand);
    console.log(`result: ${hand_type(result)}, hand: ${hand}, bid: ${bid}`);
    // add to array, sort desc which will give a rank from low to high
    // so first element will have rank 1
    hands.push([result, hand, parseInt(bid),]);
}
console.log(`hands: ${JSON.stringify(hands)}`);
hands.sort((a,b) => {
    let handCompare = function (aElement, bElement) {
        for( let hc = 0; hc < aElement.length; hc++) {
            if (aElement[hc] !== bElement[hc]) {
                let a = CARD_ORDER.indexOf(aElement[hc]);
                let b = CARD_ORDER.indexOf(bElement[hc]);
                return b -a;
            }
        }
        return 0;
    };
    if ( a[0] === b[0]) {
        // if same rank, sort by hand
        console.log(handCompare(a[1], b[1]));
        return handCompare(a[1], b[1]);
    }
    return b[0] - a[0]
});
console.log(`sorted hands: ${JSON.stringify(hands)}`);
let results = hands.map((hand, index) => index+1*hand[1]);
// console.log(`results: ${JSON.stringify(results)}`);
// console.log();
let total = 0;
for ( let i = 0; i < hands.length; i++) {
    console.log(`${i+1}: ${hands[i][1]}, bid: ${hands[i][2]}, result: ${hands[i][2]*(i+1)}`);
    total += hands[i][2]*(i+1);

    console.log(`total: ${total}`);
}
console.log(`total: ${total}`);


// 6	JJJJJ Five of a kind
console.log( `Five of a kind: ${hand_type(FIVE_OF_A_KIND)} = ${FIVE_OF_A_KIND} evaluate: ${evaluate('JJJJJ')}`);
// 6	JJ79J Four of a kind
console.log( `four of a kind: ${hand_type(FOUR_OF_A_KIND)} = ${FOUR_OF_A_KIND} evaluate: ${evaluate('JJ79J')}`);
// 6	JJ842 three of a kind
console.log( `three of a kind: ${hand_type(THREE_OF_A_KIND)} = ${THREE_OF_A_KIND} evaluate: ${evaluate('JJ842')}`);
// 6	JJ9J9 five of a kind
console.log( `five of a kind: ${hand_type(FIVE_OF_A_KIND)} = ${FIVE_OF_A_KIND} evaluate: ${evaluate('JJ9J9')}`);
// 6	J3AJQ three of a kind
// 6	J3AJT three of a kind
// 6	J43JJ four of a kind
// 6	J6Q9J
// 6	J8KJ2
// 6	J9JK4
// 6	J9QJ2
// 6	J9QJA


