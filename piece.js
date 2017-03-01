class Piece {
  constructor(board, symbol, pos) {
    this.symbol = symbol;
    this.pos = pos;
    this.board = board;
  }

  moveLeft() {
    let [row, col] = this.pos;

    if (col > 0) {
      this.board.grid[row][col] = undefined;

      col = col - 1;

      this.pos = [row, col];
      this.board.grid[row][col] = this;
    }
  }

  moveRight() {
    let [row, col] = this.pos;
    if (col < 9) {
      this.board.grid[row][col] = undefined;
      col = col + 1;
      this.pos = [row, col];
      this.board.grid[row][col] = this;
    }
  }

  falling() {
    let [row, col] = this.pos;
    if (row >= 19) {
      return false;
    }
    const pieceBelow = this.board.grid[row + 1][col];
    return !pieceBelow && this.pos[0] < 19;
  }

  moveDown() {
    let [row, col] = this.pos;
    this.board.grid[row][col] = undefined;
    row = row + 1;
    this.pos = [row, col];
    this.board.grid[row][col] = this;
  }
}

module.exports = Piece;
