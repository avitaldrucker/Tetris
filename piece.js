class Piece {

  constructor(options) {
    this.symbol = options["symbol"];
    this.coords = options["coords"];
  }

  moveLeft() {
    if (this.canMoveSideways("l")) {

      let oldCoords = this.coords;
      this.clearBoard();

      this.addModifiedCoords("col", -1);

      this.center = [this.center[0], this.center[1] - 1];
    }
  }

  drop() {
    while (!this.fallen()) {
      this.moveDown();
    }
  }

  canMoveSideways(direction) {
    return !this.fallen()
      && !this.aboveTop()
      && !this.atBorder(direction)
      && !this.neighborsAt(direction);
  }

  differentPieceAtPos(pos) {
    return this.board.gridAt(pos) && !this.coordsIncluded(pos);
  }

  neighborsAt(dir) {
    for (let i = 0; i < this.coords.length; i++) {
      let [row, col] = this.coords[i];

      let neighborPos = dir === "l" ? [row, col - 1] : [row, col + 1];

      if (this.differentPieceAtPos(neighborPos)) { return true; }
    }

    return false;
  }

  moveRight() {
    if (this.canMoveSideways("r")) {
      let oldCoords = this.coords;

      this.clearBoard();

      this.addModifiedCoords("col", 1);

      this.center = [this.center[0], this.center[1] + 1];
    }
  }

  atBorder(dir) {
    const borderIndex = dir === "l" ? 0 : 9;

    for (let i = 0; i < this.coords.length; i++) {
      let [row, col] = this.coords[i];
      if (col === borderIndex) { return true; }
    }

    return false;
  }

  fallen() {
    for (let i = 0; i < this.coords.length; i++) {
      let [row, col] = this.coords[i];

      if (row === 19 || this.differentPieceAtPos([row + 1, col])) {
        return true;
      }
    }

    return false;
  }

  coordsIncluded(coord) {

    for (let i = 0; i < this.coords.length; i++) {
      let [ownRow, ownCol] = this.coords[i];

      if (ownRow === coord[0] && ownCol === coord[1]) {
        return true;
      }
    }

    return false;
  }

  rotatedCoords(clockwise) {
    const coords = [];

    this.coords.forEach((coord) => {
      coords.push(this.rotateCoord(coord, clockwise));
    }, this);

    return coords;
  }

  rotateCoord(coord, clockwise) {
    let [centerRow, centerCol] = this.center;

    let posFromCenter = [coord[0] - centerRow, coord[1] - centerCol];
    let [row, col] = posFromCenter;

    if (clockwise) {
      return [col + centerRow, (row * -1) + centerCol];
    } else {
      return [(col * -1) + centerRow, row + centerCol];
    }
  }

  spin(clockwise) {

    const rotatedCoords = this.rotatedCoords(clockwise);
    if (this.validCoords(rotatedCoords)) {

      this.clearBoard();

      this.coords = [];

      rotatedCoords.forEach((coord) => {
        this.board.grid[coord[0]][coord[1]] = this;
        this.coords.push(coord);
      }, this);

    }
  }

  validCoords(coords) {
    for (let i = 0; i < coords.length; i++) {
      if (this.validPos(coords[i])) {
        return false;
      }
    }
    return true;
  }

  validPos(pos) {
    let [row, col] = pos;

    return row < 0
      || row > 19
      || col < 0
      || col > 9
      || this.differentPieceAtPos(pos);
  }

  moveDown() {
    if (!this.aboveTop()) { this.clearBoard(); }

    let oldCoords = this.coords;

    this.addModifiedCoords("row", 1);
    this.center = [this.center[0] + 1, this.center[1]];
  }

  addModifiedCoords(line, num) {
    const oldCoords = this.coords;
    this.coords = [];

    oldCoords.forEach((coord) => {
      let [row, col] = coord;
      line === "row" ? (row = row + num) : (col = col + num);

      this.coords.push([row, col]);
      this.board.grid[row][col] = this;
    }, this);
  }

  clearBoard() {
    this.coords.forEach((coord) => {
      let [row, col] = coord;
      this.board.grid[row][col] = null;
    }, this);
  }

  aboveTop() {
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
     if (this.rotated && this.symbol !== "O") {
       Piece.prototype.spin.call(this, false);
       this.rotated = false;
     } else if (this.symbol !== "O"){
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

const iPiece = {
  symbol: "I",
  coords: [[-1, 3], [-1, 4], [-1, 5], [-1, 6]],
  center: [-1, 4],
  spinnable: false
};

const jPiece = { symbol: "J",
  coords: [[-1, 4], [-1, 5], [-1, 6], [0, 6]],
  center: [-1, 5],
  spinnable: true
};

const lPiece = {
  symbol: "L",
  coords: [[-1, 4], [-1, 5], [0, 4], [-1, 6]],
  center: [-1, 5],
  spinnable: true
}

const oPiece = {
  symbol: "O",
  coords: [[-1, 4], [-1, 5], [0, 4], [0, 5]],
  center: [-1, 4],
  spinnable: false
};

const sPiece = {
  symbol: "S",
  coords: [[0, 3], [-1, 4], [0, 4], [-1, 5]],
  center: [-1, 4],
  spinnable: false
};

const tPiece = {
  symbol: "T",
  coords: [[-1, 4], [-1, 5], [0, 5], [-1, 6]],
  center: [-1, 5],
  spinnable: true
};

const zPiece = {
  symbol: "Z",
  coords: [[-1, 4], [-1, 5], [0, 5], [0, 6]],
  center: [-1, 5],
  spinnable: false
};

Piece.PIECES = [iPiece, jPiece, lPiece, oPiece, sPiece, tPiece, zPiece];


 Piece.randomPiece = () => {
   const randIndex = Math.floor(Math.random() * Piece.PIECES.length);
   const options = Piece.PIECES[randIndex];
   if (options.spinnable && options.center) {
     return new SpinnablePiece(options);
   } else {
     return new TogglingPiece(options);
   }
 };
