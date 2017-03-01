import Piece from './piece';

class Board {
  constructor() {
    this.level = 0;
    this.descentSpeed = 0;
    this.grid = [];
    for (let i = 0; i < 20; i++) {
      this.grid[i] = [];
      for (let j = 0; j < 10; j++) {
        this.grid[i][j] = null;
      }
    }
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
        let tile = document.createElement("li");
        let piece = this.grid[row][col];

        if (piece) {
          tile.className = piece.symbol;
        }

        ul.appendChild(tile);
      }
      div.appendChild(ul);
    }


    root.appendChild(div);
  }

  spawnPiece() {
    this.grid[0][4] = new Piece(this, "L", [0, 4]);
  }

  fallingPiece() {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        let piece = this.grid[row][col];
        if (piece && piece.falling()) {
          return piece;
        }
      }
    }

  }

  moveLeft() {
    const fallingPiece = this.fallingPiece();
    if (fallingPiece) {
      fallingPiece.moveLeft();
    }
  }

  moveRight() {
    const fallingPiece = this.fallingPiece();
    if (fallingPiece) {
      fallingPiece.moveRight();
    }
  }

  update() {
    const piece = this.fallingPiece();
    if (piece) {
      piece.moveDown();
    }
    else {
      this.spawnPiece();
    }
  }

  clearRows() {

  }
}

module.exports = Board;
