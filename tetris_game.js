import Board from './board';

class Game {
  constructor() {
    this.board = new Board();
    this.level = 0;
  }

  step(timeDelta) {
    this.board.draw();
  }

  update() {
    this.board.update();
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

  draw(ctx) {
    ctx.clearRect(0, 0, 1000, 1000);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 1000, 1000);
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(500, 0, 500, 500);
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(500, 500, 500, 500);
  }
}

module.exports = Game;
