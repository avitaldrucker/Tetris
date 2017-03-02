import Piece from './piece';

class Board {
  constructor() {
    this.level = 0;
    this.descentSpeed = 0;
    this.grid = [];
    this.fallingPiece = null;
    for (let i = 0; i < 20; i++) {
      this.grid[i] = this.emptyRow();
    }
    this.rowsCleared = 0;
    this.piecesFallen = -1;
  }

  emptyRow() {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push(null);
    }

    return row;
  }

  spin() {
    if (this.fallingPiece) {
      this.fallingPiece.spin();
    }
  }

  arrayEqual(arr1, arr2) {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
  }

  draw() {

    const root = document.getElementById("root");
    const divToRemove = document.getElementById("board");
    if (divToRemove) {
      root.removeChild(divToRemove);
    }

    const div = document.createElement("div");
    div.id = "board";

    let ul;

    for (let row = 0; row < this.grid.length; row++) {
      ul = document.createElement("ul");
      for (let col = 0; col < this.grid[0].length; col++) {
        let li = document.createElement("li");
        let tile = this.grid[row][col];

        if (tile) {
          li.className = tile.symbol;
        }

        ul.appendChild(li);
      }
      div.appendChild(ul);
    }


    root.appendChild(div);
  }

  spawnPiece() {
    const piece = Piece.randomPieceOptions();
    piece.board = this;
    return piece;
  }

  moveLeft() {
    if (this.fallingPiece) {
      this.fallingPiece.moveLeft();
    }
  }

  moveRight() {
    if (this.fallingPiece) {
      this.fallingPiece.moveRight();
    }
  }

  update() {
    if (this.fallingPiece && this.fallingPiece.fallen()) {
      this.fallingPiece = null;
    }

    if (this.fallingPiece) {
      this.fallingPiece.moveDown();
    }
    else {
      this.piecesFallen += 1;
      this.clearRows();
      this.fallingPiece = this.spawnPiece();
    }
  }

  over() {
    return this.fallingPiece && this.fallingPiece.atTop() && this.fallingPiece.fallen();
  }

  clearRows() {
    const newGrid = [];

    for (let row = this.grid.length - 1; row >= 0; row--) {
      if (!this.full(this.grid[row])) {
        newGrid.unshift(this.grid[row]);
      }
    }

    while (newGrid.length < 20) {
      this.rowsCleared += 1;
      newGrid.unshift(this.emptyRow());
    }

    this.grid = newGrid;
  }

  full(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i]) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Board;
