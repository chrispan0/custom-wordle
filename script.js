//  CUSTOM WORDLE -- by Phineas Ziegler

// ----------------------------------------------------------------------------- //

/////////////////
/// CONSTANTS ///
/////////////////

// ----------------------------------------------------------------------------- //

const gridSpace = 2.5; // 5px border between tiles
const borderWidth = 2;
const yellowColor = "#b59f3b";
const greyColor = "#3a3a3c";
const greenColor = "#538d4e";
const borderColor = "#3a3a3c";
const borderColorActive = "#565758";


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
    div.style.border = borderWidth + "px solid " + borderColor;

    let p = createTextElem(row, col, width, borderWidth);
    div.appendChild(p);
    return div;
}

// create an empty tileText element
function createTextElem(row, col, width, borderWidth) {
    let p = document.createElement("p");
    p.id = textID(row, col);
    p.classList.add("tileText");
    p.innerText = "";
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
}

// ----------------------------------------------------------------------------- //

//////////////////////
/// POSITION CLASS ///
//////////////////////

// ----------------------------------------------------------------------------- //

class position {
    constructor(row, col, rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.row = row;
        this.col = col;
    }
    setRow(row) {
        this.row = row;
    }
    getRow() {
        return this.row;
    }
    setCol(col) {
        this.col = col;
    }
    getCol() {
        return this.col;
    }
    next() {
        this.col++;
        if(this.cols <= this.col) {
            this.col = 0;
            this.row++;
        }
        if(this.rows <= this.row) {
            this.row = this.rows - 1;
            this.col = this.cols - 1;
        }
        return this;
    }
    prev() {
        this.col--;
        if(this.col < 0) {
            this.col = this.cols - 1;
            this.row--;
        }
        if(this.row < 0) {
            this.row = 0;
            this.col = 0;
        }
        return this;
    }
    print() {
        console.log("Row: " + this.row + ", Col: " + this.col);
    }
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

// ----------------------------------------------------------------------------- //

// ----------------------------------------------------------------------------- //

///////////////
/// RUNTIME ///
///////////////

// ----------------------------------------------------------------------------- //

const rows = 6;
const cols = 5;

let currPos = new position(0, 0, rows, cols);

generateBoard(generateEmptyState(rows, cols));

// // Temporary way to check results
grey(getTile(currPos));
editText(currPos, "P");
grey(getTile(currPos.next()));
editText(currPos, "E");
yellow(getTile(currPos.next()));
editText(currPos, "N");
grey(getTile(currPos.next()));
editText(currPos, "I");
grey(getTile(currPos.next()));
editText(currPos, "S");

green(getTile(currPos.next()));
editText(currPos, "T");
yellow(getTile(currPos.next()));
editText(currPos, "O");
grey(getTile(currPos.next()));
editText(currPos, "U");
grey(getTile(currPos.next()));
editText(currPos, "G");
yellow(getTile(currPos.next()));
editText(currPos, "H");

grey(getTile(currPos.next()));
editText(currPos, "C");
green(getTile(currPos.next()));
editText(currPos, "H");
grey(getTile(currPos.next()));
editText(currPos, "A");
yellow(getTile(currPos.next()));
editText(currPos, "N");
yellow(getTile(currPos.next()));
editText(currPos, "T");

green(getTile(currPos.next()));
editText(currPos, "T");
green(getTile(currPos.next()));
editText(currPos, "H");
green(getTile(currPos.next()));
editText(currPos, "O");
green(getTile(currPos.next()));
editText(currPos, "R");
green(getTile(currPos.next()));
editText(currPos, "N");








