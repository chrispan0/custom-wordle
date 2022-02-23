export default class Position {
    
//////////////////////
/// POSITION CLASS ///
//////////////////////

// ----------------------------------------------------------------------------- //

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
        if (this.cols <= this.col) {
            this.col = 0;
            this.row++;
        }
        if (this.rows <= this.row) {
            this.row = this.rows - 1;
            this.col = this.cols - 1;
        }
        return this;
    }
    prev() {
        this.col--;
        if (this.col < 0) {
            this.col = this.cols - 1;
            this.row--;
        }
        if (this.row < 0) {
            this.row = 0;
            this.col = 0;
        }
        return this;
    }
    rowChangeNext() {
        if (this.getRow() == this.next().getRow()) {
            this.prev();
            return false;
        }
        this.prev();
        return true;
    }
    rowChangePrev() {
        if (this.getRow() == this.prev().getRow()) {
            this.next();
            return false;
        }
        this.next();
        return true;
    }
    print() {
        console.log("Row: " + this.row + ", Col: " + this.col);
    }
}
