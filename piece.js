class Piece {
  constructor(options) {
    this.symbol = options["symbol"];
    this.coords = options["coords"];
  }

  moveLeft() {
    if (!this.fallen() && !this.atTop() && this.coords[0][1] > 0) {

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
    if (!this.fallen() && !this.atTop() && this.coords[this.coords.length - 1][1] < 9) {

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
    const oldCoords = this.coords;
    const rotatedCoords = [];

    oldCoords.forEach((oldCoord) => {
      let [row, col] = oldCoord;
      let posFromCenter = [row - this.center[0], col - this.center[1]];
      [row, col] = posFromCenter;
      let [newRow, newCol] = [col + this.center[0], (row * -1) + this.center[1]];
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
      let [row, col] = coords;
      if (row < 0 || row > 19 || col < 0 || col > 9) {
        return false;
      }
    }
    return true;
  }
}

class TogglingPiece extends Piece {
  constructor(options) {
    super(options);
  }
}

module.exports = Piece;

Piece.PIECES =
  [
    {
      symbol: "I",
      coords: [[-1, 3], [-1, 4], [-1, 5], [-1, 6]],
      center: null
    },
    { symbol: "J",
      coords: [[-1, 4], [-1, 5], [-1, 6], [0, 6]],
      center: [-1, 5]
    },
    {
      symbol: "L",
      coords: [[-1, 4], [-1, 5], [0, 4], [-1, 6]],
      center: [-1, 5]
    },
    {
      symbol: "O",
      coords: [[-1, 4], [-1, 5], [0, 4], [0, 5]],
      center: null
    },
    {
      symbol: "S",
      coords: [[0, 3], [-1, 4], [0, 4], [-1, 5]],
      center: null
    },
    {
      symbol: "T",
      coords: [[-1, 4], [-1, 5], [0, 5], [-1, 6]],
      center: [-1, 5]
    },
    {
      symbol: "Z",
      coords: [[-1, 4], [-1, 5], [0, 5], [0, 6]],
      center: null
    }
  ];

 Piece.randomPieceOptions = () => {
   const randIndex = Math.floor(Math.random() * Piece.PIECES.length);
   const options = Piece.PIECES[randIndex];
   if (options.center) {
     return new SpinnablePiece(options);
   } else {
     return new TogglingPiece(options);
   }
 };
