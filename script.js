//  WORDLE
const gridSpace = 2.5; // 5px border between tiles

function generateEmptyState(tries, wordlength) {
    let output = [];
    for(let r = 0; r < tries; r++) {
        let row = [];
        for(let c = 0; c < wordlength; c++) {
            row.push(" ");
        }
        output.push(row);
    }
    return output;
}

function generateBoard(state) {    // default is 6x5
    let board = document.getElementById("board");
    for (let row = 0; row < state.length; row++) {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        for (let col = 0; col < state[row].length; col++) {
            let div = createDiv(row, col, calculateWidth(state), 2);
            rowDiv.appendChild(div);
        }
        board.appendChild(rowDiv);
    }
}

function createDiv(row, col, width, borderWidth) {
    let div = document.createElement("div");
    div.id = tileID(row, col);
    div.classList.add("tile");
    div.style.width = width + "px";
    div.style.height = width + "px";
    div.style.margin = gridSpace + "px";
    div.style.border = borderWidth + "px solid rgb(51, 51, 51)";

    let p = createTextElem(row, col, width, borderWidth);
    div.appendChild(p);
    return div;
}

function createTextElem(row, col, width, borderWidth) {
    console.log(borderWidth);
    let p = document.createElement("p");
    p.id = textID(row, col);
    p.classList.add("tileText");
    p.innerText = "I";
    p.style.lineHeight = width - (borderWidth * 2) - (width / 12.5) + "px";
    p.style.fontSize = width / 1.5 + "px";
    return p;
}

function tileID(row, col) {
    return "tile[" + row + ", " + col + "]";
}

function textID(row, col) {
    return "text[" + row + ", " + col + "]";
}

function getTile(row, col) {
    return document.getElementById(tileID(row, col));
}

function getTileText(row, col) {
    return document.getElementById(textID(row, col));
}

function calculateWidth(state) {
    let margin = gridSpace;
    let cols = state[0].length;
    let bWidth = boardWidth();
    let width = (bWidth / cols) - (2 * margin);
    return width;
}

function boardWidth() {
    return board.clientWidth;
}

function editText(row, col, text) {
    getTileText(row, col).innerText = text;
}

// RUNTIME

let state = generateEmptyState(6, 5);
generateBoard(state);

// editText(2, 4, "0");

