//  CUSTOM WORDLE -- by Phineas Ziegler

import { dict } from "./dict.js";
import { answers } from "./answers.js";
import Position from "./position.js";


// ----------------------------------------------------------------------------- //

/////////////////
/// CONSTANTS /// and init
/////////////////

// ----------------------------------------------------------------------------- //

const gridSpace = 2.5; // 5px border between tiles
const borderWidth = 2;
const yellowColor = "#b59f3b";
const greyColor = "#3a3a3c";
const greenColor = "#538d4e";
const borderColor = "#3a3a3c";
const borderColorActive = "#565758";
const emptyText = "";

let typing;     // set false to prevent input
let ended;
let rows;
let cols;
let answer;
let state;
let currPos;

let activeRows = [];

const d = new Date();
let seed = String((d.getMonth() + 1) + "/" + String(d.getDate() + "/" + String(d.getFullYear())));
document.getElementById("seed").value = seed;

function init() {
    seed = document.getElementById("seed").value;
    activeRows.forEach(e => e.remove());

    typing = true;     // set false to prevent input
    ended = false;
    rows = Math.round(parseFloat(document.getElementById("tries").value));
    cols = Math.round(parseFloat(document.getElementById("length").value));
    
    answer = randomWord(seed).toUpperCase();
    state = generateEmptyState(rows, cols);
    currPos = new Position(0, 0, rows, cols);
    generateBoard(state);
}


// ----------------------------------------------------------------------------- //

//////////////////
/// GENERATION ///
//////////////////

// ----------------------------------------------------------------------------- //

// Generate random word of length n
// https://stackoverflow.com/a/47593316
function randomWord(seed) {
    function xmur3(str) {
        for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
            h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
            h = h << 13 | h >>> 19;
        } return function () {
            h = Math.imul(h ^ (h >>> 16), 2246822507);
            h = Math.imul(h ^ (h >>> 13), 3266489909);
            return (h ^= h >>> 16) >>> 0;
        }
    }
    function sfc32(a, b, c, d) {
        return function () {
            a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
            var t = (a + b) | 0;
            a = b ^ b >>> 9;
            b = c + (c << 3) | 0;
            c = (c << 21 | c >>> 11);
            d = d + 1 | 0;
            t = t + d | 0;
            c = c + t | 0;
            return (t >>> 0) / 4294967296;
        }
    }
    // Create xmur3 state:
    let hash = xmur3(seed);
    // Output four 32-bit hashes to provide the seed for sfc32.
    let rand = sfc32(hash(), hash(), hash(), hash());

    let choices = answers.filter(word => word.length == cols);
    console.log("found " + choices.length + " options for word length " + cols + ".");

    if (choices.length > 0) {
        let outcome = Math.floor((choices.length + 1) * rand());
        // console.log(choices[outcome]);
        return choices[outcome];
    }
    return -1;

}

// Generates the beginning state
function generateEmptyState(tries, wordlength) {
    let output = [];
    for (let r = 0; r < tries; r++) {
        let row = [];
        for (let c = 0; c < wordlength; c++) {
            row.push(emptyText);
        }
        output.push(row);
    }
    return output;
}

// creates the board and tiles
function generateBoard(state) {    // default is 6x5
    let board = document.getElementById("board");
    board.style.width = ((cols * 335) / 5) + "px";
    
    for (let row = 0; row < state.length; row++) {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        for (let col = 0; col < state[row].length; col++) {
            let div = createDiv(row, col, calculateWidth(state), borderWidth);
            rowDiv.appendChild(div);
            activeRows.push(rowDiv);
        }
        board.appendChild(rowDiv);
    }
}

// create a tile element and appends a text element to itself
function createDiv(row, col, width, borderWidth) {
    let div = document.createElement("div");
    div.id = tileID(row, col);
    div.classList.add("tile");
    div.style.width = width + "px";
    div.style.height = width + "px";
    div.style.margin = gridSpace + "px";
    inactive(div);

    let p = createTextElem(row, col, width, borderWidth);
    div.appendChild(p);
    return div;
}

// create an empty tileText element
function createTextElem(row, col, width, borderWidth) {
    let p = document.createElement("p");
    p.id = textID(row, col);
    p.classList.add("tileText");
    p.innerText = emptyText;
    p.style.lineHeight = width - (borderWidth * 2) - (width / 17) + "px";
    p.style.fontSize = (width / 2) + 1 + "px";
    return p;
}

// calculate the width of the tiles
function calculateWidth(state) {
    let margin = gridSpace;
    let cols = state[0].length;
    let bWidth = boardWidth();
    let width = (bWidth / cols) - (2 * margin);
    return width;
}

// get the width of the board
function boardWidth() {
    let width = board.clientWidth;
    return width;
}

// ----------------------------------------------------------------------------- //

/////////////////////////
/// TILE/TEXT CONTROL ///
/////////////////////////

// ----------------------------------------------------------------------------- //

// tileID -- gives the id of a tile element at row,col coords
function tileID(row, col) {
    return "tile[" + row + ", " + col + "]";
}

// textID -- gives the ID of a tileText element at row,col coords
function textID(row, col) {
    return "text[" + row + ", " + col + "]";
}

// get a tile element
function getTile(position) {
    return document.getElementById(tileID(position.getRow(), position.getCol()));
}

// get a tileText element
function getTileText(position) {
    return document.getElementById(textID(position.getRow(), position.getCol()));
}

// editText -- change the text of a tile at a position
function editText(position, text) {
    getTileText(position).innerText = text;
    updateState(position, text);
}

// get the text of a text tile
function getText(position) {
    return getTileText(position).innerText;
}

// ----------------------------------------------------------------------------- //

////////////////
/// GAMEPLAY ///
////////////////

function green(element) {
    element.style.border = borderWidth + "px solid " + greenColor;
    element.style.backgroundColor = greenColor;
}

function yellow(element) {
    element.style.border = borderWidth + "px solid " + yellowColor;
    element.style.backgroundColor = yellowColor;
}

function grey(element) {
    element.style.border = borderWidth + "px solid " + greyColor;
    element.style.backgroundColor = greyColor;
}

function colorRow(position, score) {
    for (let i = 0; i < score.length; i++) {
        let pos = new Position(position.getRow(), i, rows, cols);
        switch (score[i]) {
            case 0:
                grey(getTile(pos));
                break;
            case 1:
                yellow(getTile(pos));
                break;
            case 2:
                green(getTile(pos));
                break;
        }
    }
}

function active(element) {
    element.style.border = borderWidth + "px solid " + borderColorActive;
}

function inactive(element) {
    element.style.border = borderWidth + "px solid " + borderColor;
}

function updateState(position, key) {
    state[position.getRow()][position.getCol()] = key;
}

function word(position) {
    let word = state[position.getRow()].join("");
    return word;
}

function checkValid(word) {
    if (dict[word]) {
        console.log(word + " valid");
        return true;
    }
    console.log(word + " invalid");
    return false;
}

function checkAnswer(word) {
    if (word == answer) {
        endGame(word);
        return score(word);
    }
    return score(word);
}

function score(word) {
    let ans = Array.from(answer);
    let guess = Array.from(word);
    let score = [];     // 0 = not there, 1 = good guess, wrong spot, 2 = correct guess

    for (let i = 0; i < guess.length; i++) {
        let index = myIndexOf(ans, guess[i], i);
        if (index == i) {
            ans[index] = "~";
            score.push(2);
        }
        else if (index == -1) {
            score.push(0);
        }
        else {
            ans[index] = "~";
            score.push(1);
        }
    }
    console.log(JSON.stringify(score));
    return score;
}

// finds the index of the elements occurence that is closest to the start index
function myIndexOf(array, element, start) {
    for (let i = start; i >= 0; i--) {
        if (array[i] == element) {
            return i;
        }
    }
    for (let i = start + 1; i < array.length; i++) {
        if (array[i] == element) {
            return i;
        }
    }
    return -1;
}

function checkIfEnded() {
    if(currPos.getRow() == rows - 1 && currPos.getCol() == cols-1) {
        endGame(word(currPos));
    }
}

function endGame(word) {
    if (word == answer) {
        ended = true;
        console.log("YOU WIN!");
    }
    else {
        ended = true;
        console.log("YOU LOSE!");
    }
}

// ----------------------------------------------------------------------------- //

///////////////////////
/// EVENT HANDLING ////
///////////////////////

// ----------------------------------------------------------------------------- //

document.addEventListener("keydown", (e) => {
    if (!typing || ended) {
        return;
    }
    let key = e.key;
    switch (key) {
        case "Backspace":
            handleBackspace();
            break;
        case "Enter":
            handleEnter();
            break;
        default:
            if (new RegExp('^[a-zA-Z]{1}$').test(key)) {
                handleInput(key.toUpperCase());
            }
    }
});

Array.from(document.querySelectorAll("ul > label > input")).forEach(e => e.addEventListener("focus", () => {
    typing = false;
}));
Array.from(document.querySelectorAll("ul > label > input")).forEach(e => e.addEventListener("focusout", () => {
    typing = true;
}));

document.getElementById("generate").addEventListener("click", () => {
    init();
});

Array.from(document.querySelectorAll(".letter")).forEach(e => e.addEventListener("click", () => {
    e.id = e.innerText.toUpperCase();
    if (ended) {
        return;
    }
    handleInput(e.innerText.toUpperCase());
}));

document.getElementById("backspace").addEventListener("click", () => {
    if (ended) {
        return;
    }
    handleBackspace();
});

document.getElementById("enter").addEventListener("click", () => {
    if (ended) {
        return;
    }
    handleEnter();
});

function handleBackspace() {
    if (getText(currPos) == emptyText && !currPos.rowChangePrev()) {
        currPos.prev();
    }
    if (getText(currPos) != emptyText) {
        editText(currPos, emptyText);
        inactive(getTile(currPos));
    }
}

function handleEnter() {
    if (getText(currPos) == emptyText) {
        return;
    }
    if (checkValid(word(currPos))) {
        let score = checkAnswer(word(currPos));
        colorRow(currPos, score);
        checkIfEnded();
        currPos.next();
    }
}

// assumes valid input
function handleInput(key) {
    if (getText(currPos) == emptyText) {
        editText(currPos, key);
        active(getTile(currPos));
    }
    if (!currPos.rowChangeNext()) {
        currPos.next();
    }

}

///////////////
/// RUNTIME ///
///////////////

// ----------------------------------------------------------------------------- //

init();

