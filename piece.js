class Piece {
  constructor(board, options) {
    this.symbol = options["symbol"];
    this.coords = options["coords"];
    this.board = board;
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

module.exports = Piece;

Piece.PIECES =
  [
    { symbol: "L", coords: [[-1, 3], [-1, 4], [-1, 5], [-1, 6]] },
    { symbol: "J", coords: [[-1, 4], [-1, 5], [-1, 6], [0, 6]] },
    { symbol: "L", coords: [[-1, 4], [-1, 5], [0, 4], [-1, 6]] },
    { symbol: "O", coords: [[-1, 4], [-1, 5], [0, 4], [0, 5]] },
    { symbol: "S", coords: [[0, 3], [-1, 4], [0, 4], [-1, 5]] },
    { symbol: "T", coords: [[-1, 3], [-1, 4], [0, 4], [-1, 5]] },
    { symbol: "Z", coords: [[-1, 3], [-1, 4], [0, 4], [0, 5]] }
  ];

 Piece.randomPieceOptions = () => {
   const randIndex = Math.floor(Math.random() * Piece.PIECES.length);
   return Piece.PIECES[randIndex];
 };
