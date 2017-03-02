class Piece {
  constructor(options) {
    this.symbol = options["symbol"];
    this.coords = options["coords"];
  }

  moveLeft() {
    if (!this.fallen() && !this.atTop() && !this.atLeftBorder()) {

      let oldCoords = this.coords;

      oldCoords.forEach((coord) => {
        let [row, col] = coord;
        this.board.grid[row][col] = undefined;
      }, this);

      this.coords = [];

      oldCoords.forEach((coord) => {
        let [row, col] = coord;
        col = col - 1;
        this.coords.push([row, col]);
        this.board.grid[row][col] = this;
      }, this);

      if (this.center) {
        this.center = [this.center[0], this.center[1] - 1];
      }
    }
  }

  moveRight() {
    if (!this.fallen() && !this.atTop() && !this.atRightBorder()) {

      let oldCoords = this.coords;

      oldCoords.forEach((coord) => {
        let [row, col] = coord;
        this.board.grid[row][col] = undefined;
      }, this);

      this.coords = [];

      oldCoords.forEach((coord) => {
        let [row, col] = coord;
        col = col + 1;
        this.coords.push([row, col]);
        this.board.grid[row][col] = this;
      }, this);

      if (this.center) {
        this.center = [this.center[0], this.center[1] + 1];
      }
    }
  }

  atRightBorder() {
    for (let i = 0; i < this.coords.length; i++) {
      let [row, col] = this.coords[i];
      if (col === 9) {
        return true;
      }
    }
    return false;
  }

  atLeftBorder() {
    for (let i = 0; i < this.coords.length; i++) {
      let [row, col] = this.coords[i];
      if (col === 0) {
        return true;
      }
    }
    return false;
  }

  fallen() {
    for (let i = 0; i < this.coords.length; i++) {
      let [row, col] = this.coords[i];
      if (row === 19 || (this.board.grid[row + 1][col] && !this.coordsIncluded([row + 1, col]))) {
        return true;
      }
    }

    return false;
  }

  coordsIncluded(coord) {
    for (let i = 0; i < this.coords.length; i++) {
      if (this.coords[i][0] === coord[0] && this.coords[i][1] === coord[1]) {
        return true;
      }
    }

    return false;
  }

  spin(clockwise) {
    const oldCoords = this.coords;
    const rotatedCoords = [];

    oldCoords.forEach((oldCoord) => {
      let [row, col] = oldCoord;
      let posFromCenter = [row - this.center[0], col - this.center[1]];
      [row, col] = posFromCenter;

      let newRow;
      let newCol;

      if (clockwise) {
        [newRow, newCol] = [col + this.center[0], (row * -1) + this.center[1]];
      } else {
        [newRow, newCol] = [(col * -1) + this.center[0], row + this.center[1]];
      }

      rotatedCoords.push([newRow, newCol]);
    }, this);

    if (this.validCoords(rotatedCoords)) {

      oldCoords.forEach((coord) => {
        let [row, col] = coord;
        this.board.grid[row][col] = undefined;
      }, this);

      this.coords = [];

      rotatedCoords.forEach((coord) => {
        this.board.grid[coord[0]][coord[1]] = this;
        this.coords.push(coord);
      });
    }

  }

  validCoords(coords) {
    for (let i = 0; i < coords.length; i++) {
      let [row, col] = coords[i];
      if (row < 0 || row > 19 || col < 0 || col > 9) {
        return false;
      }
    }
    return true;
  }

  moveDown() {
    if (this.atTop()) {
      let oldCoords = this.coords;

      this.coords = [];
      oldCoords.forEach((coord) => {
        let [row, col] = coord;
        row = row + 1;
        this.coords.push([row, col]);
        this.board.grid[row][col] = this;
      });

    } else {
      let oldCoords = this.coords;

      oldCoords.forEach((coord) => {
        let [row, col] = coord;
        this.board.grid[row][col] = undefined;
      }, this);

      this.coords = [];
      oldCoords.forEach((coord) => {
        let [row, col] = coord;
        row = row + 1;
        this.coords.push([row, col]);
        this.board.grid[row][col] = this;
      }, this);
    }

    if (this.center) {
      this.center = [this.center[0] + 1, this.center[1]];
    }
  }

  atTop() {
    for (let i = 0; i < this.coords.length; i++) {
      if (this.coords[i][0] === -1) {
        return true;
      }
    }

    return false;
  }
}

class SpinnablePiece extends Piece {
  constructor(options) {
    super(options);
    this.center = options.center;
  }

  spin() {
    Piece.prototype.spin.call(this, true);
  }

}

class TogglingPiece extends Piece {
  constructor(options) {
    super(options);
    this.rotated = false;
    this.center = options.center;
  }

  spin() {
     if (this.rotated) {
       Piece.prototype.spin.call(this, false);
       this.rotated = false;
     } else {
       Piece.prototype.spin.call(this, true);
       this.rotated = true;
     }
  }
}

class StaticPiece extends Piece {
  constructor(options) {
    super(options);
  }

  spin() {

  }
}

module.exports = Piece;

Piece.PIECES =
  [
    {
      symbol: "I",
      coords: [[-1, 3], [-1, 4], [-1, 5], [-1, 6]],
      center: [-1, 4],
      spinnable: false
    },
    { symbol: "J",
      coords: [[-1, 4], [-1, 5], [-1, 6], [0, 6]],
      center: [-1, 5],
      spinnable: true
    },
    {
      symbol: "L",
      coords: [[-1, 4], [-1, 5], [0, 4], [-1, 6]],
      center: [-1, 5],
      spinnable: true
    },
    {
      symbol: "O",
      coords: [[-1, 4], [-1, 5], [0, 4], [0, 5]],
      center: null,
      spinnable: false
    },
    {
      symbol: "S",
      coords: [[0, 3], [-1, 4], [0, 4], [-1, 5]],
      center: [-1, 4],
      spinnable: false
    },
    {
      symbol: "T",
      coords: [[-1, 4], [-1, 5], [0, 5], [-1, 6]],
      center: [-1, 5],
      spinnable: true
    },
    {
      symbol: "Z",
      coords: [[-1, 4], [-1, 5], [0, 5], [0, 6]],
      center: [-1, 5],
      spinnable: false
    }
  ];

 Piece.randomPieceOptions = () => {
   const randIndex = Math.floor(Math.random() * Piece.PIECES.length);
   const options = Piece.PIECES[randIndex];
   if (options.spinnable && options.center) {
     return new SpinnablePiece(options);
   } else if (options.center) {
     return new TogglingPiece(options);
   } else {
     return new StaticPiece(options);
   }
 };
