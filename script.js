//  WORDLE

let state = [
    ["_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_"],
];
const gridSpace = 2.5; // 5px border between tiles

function generateBoard(state) {    // default is 6x5
    let board = document.getElementById("board");
    for (let row = 0; row < state.length; row++) {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        for (let col = 0; col < state[row].length; col++) {
            let div = createDiv(row, col);
            rowDiv.appendChild(div);
        }
        board.appendChild(rowDiv);
    }
}

function createDiv(row, col) {
    let div = document.createElement("div");
    div.id = tileID(row, col);
    div.classList.add("tile");
    let width = calculateWidth(state);
    div.style.width = width + "px";
    div.style.height = width + "px";
    div.style.margin = gridSpace + "px";
    return div;
}

function tileID(row, col) {
    return "tile[" + row + ", " + col + "]";
}

function getDiv(row, col) {
    return getElementById(tileID(row, col));
}

function calculateWidth(state) {
    let margin = gridSpace;
    console.log(margin);
    // let rows = state.length;
    let cols = state[0].length;
    let bWidth = boardWidth();
    let width = (bWidth / cols) - (2 * margin);
    // console.log(width);
    return width;
}

function boardWidth() {
    return board.clientWidth;
}

generateBoard(state);

