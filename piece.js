class Piece {
  constructor(board, symbol) {
    this.symbol = symbol;
    this.coords = [[0, 2], [0, 3], [0, 4], [0, 5]];
    this.board = board;
  }

  moveLeft() {

    if (this.coords[this.coords.length - 1][1] > 0) {

      let oldCoords = this.coords;

      oldCoords.forEach((coord) => {
        let [row, col] = coord;
        this.board.grid[row][col] = undefined;
      });

      this.coords = [];

      oldCoords.forEach((coord) => {
        let [row, col] = coord;
        col = col - 1;
        this.coords.push([row, col]);
        this.board.grid[row][col] = "filled";
      });
    }
  }

  // moveRight() {
  //   let [row, col] = this.pos;
  //   if (col < 9) {
  //     this.board.grid[row][col] = undefined;
  //     col = col + 1;
  //     this.pos = [row, col];
  //     this.board.grid[row][col] = "filled";
  //   }
  // }

  fallen() {
    for (let i = 0; i < this.coords.length; i++) {
      let [row, col] = this.coords[i];
      if (row === 19 || this.board.grid[row + 1][col] === "filled") {
        return true;
      }
    }

    return false;
  }

  moveDown() {
    let oldCoords = this.coords;

    oldCoords.forEach((coord) => {
      let [row, col] = coord;
      this.board.grid[row][col] = undefined;
    });

    this.coords = [];
    oldCoords.forEach((coord) => {
      let [row, col] = coord;
      row = row + 1;
      this.coords.push([row, col]);
      this.board.grid[row][col] = "filled";
    });
  }
}

module.exports = Piece;
