import Board from './board';

class Game {
  constructor() {
    this.board = new Board();
    window.board = this.board;
    this.level = 0;
  }

  step(timeDelta) {
    this.board.draw();
  }

  update() {
    if (!this.over) {
      this.board.update();
    }
  }

  over() {
    return this.board.over();
  }

  score() {
    return (this.board.rowsCleared * 50) + (this.board.piecesFallen * 15);
  }

  moveLeft() {
    this.board.moveLeft();
  }

  moveRight() {
    this.board.moveRight();
  }

  spin() {
    this.board.spin();
  }
}

module.exports = Game;
