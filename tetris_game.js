import Board from './board';

class Game {
  constructor() {
    this.board = new Board();
    window.board = this.board;
  }

  step(timeDelta) {
    this.draw();
    this.board.draw();
  }

  draw() {
    const sidebar = document.getElementById("sidebar");
    const scoreboardToRemove = document.getElementById("scoreboard");

    if (scoreboardToRemove) {
      sidebar.removeChild(scoreboardToRemove);
    }

    const div = document.createElement("div");
    div.id = "scoreboard";

    let levelHeader = document.createElement("H1");
    let levelText = document.createTextNode("Level: " + this.level());
    levelHeader.appendChild(levelText);

    let scoreHeader = document.createElement("H1");
    let scoreText = document.createTextNode("Score: " + this.score());
    scoreHeader.appendChild(scoreText);

    div.appendChild(levelHeader);
    div.appendChild(scoreHeader);

    sidebar.appendChild(div);
  }

  update() {
    if (!this.over()) {
      this.board.update();
    }
  }

  over() {
    return this.board.over();
  }

  score() {
    return (this.board.rowsCleared * 50) + (this.board.piecesFallen * 15);
  }

  level() {
    return Math.floor(this.score() / 180) + 1;
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
