//  CUSTOM WORDLE -- by Phineas Ziegler

// ----------------------------------------------------------------------------- //

/////////////////
/// CONSTANTS ///
/////////////////

// ----------------------------------------------------------------------------- //

const gridSpace = 2.5; // 5px border between tiles
const borderWidth = 2;

// ----------------------------------------------------------------------------- //

//////////////////
/// GENERATION ///
//////////////////

// ----------------------------------------------------------------------------- //

// Generates the beginning state
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

// creates the board and tiles
function generateBoard(state) {    // default is 6x5
    let board = document.getElementById("board");
    for (let row = 0; row < state.length; row++) {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        for (let col = 0; col < state[row].length; col++) {
            let div = createDiv(row, col, calculateWidth(state), borderWidth);
            rowDiv.appendChild(div);
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
    div.style.border = borderWidth + "px solid rgb(51, 51, 51)";

    let p = createTextElem(row, col, width, borderWidth);
    div.appendChild(p);
    return div;
}

// create an empty tileText element
function createTextElem(row, col, width, borderWidth) {
    console.log(borderWidth);
    let p = document.createElement("p");
    p.id = textID(row, col);
    p.classList.add("tileText");
    p.innerText = "";
    p.style.lineHeight = width - (borderWidth * 2) - (width / 12.5) + "px";
    p.style.fontSize = width / 1.5 + "px";
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
    return board.clientWidth;
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
function getTile(row, col) {
    return document.getElementById(tileID(row, col));
}

// get a tileText element
function getTileText(row, col) {
    return document.getElementById(textID(row, col));
}

// editText -- change the text of a tile at a position
function editText(row, col, text) {
    getTileText(row, col).innerText = text;
}

// ----------------------------------------------------------------------------- //

///////////////
/// RUNTIME ///
///////////////

// ----------------------------------------------------------------------------- //

const rows = 6;
const cols = 5;
generateBoard(generateEmptyState(rows, cols));

editText(0, 0, "W");
editText(0, 1, "r");
editText(0, 2, "d");
editText(0, 3, "l");
editText(0, 4, "e");


