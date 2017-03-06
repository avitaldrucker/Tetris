import Board from './board';

export default class Game {

  constructor(ctx) {
    this.board = new Board(ctx);
    window.board = this.board;
    this.mostRecentLevel = this.level();
    this.gameOverButtonCreated = false;
    this.switchView = false;
    this.ctx = ctx;
  }

  step(timeDelta) {
    this.draw();
    this.board.draw();
    if (this.board.over()) { this.switchView = true; }
  }

  draw() {
    if (!this.over()) {
      let scoreContainer = document.getElementById("score-container");

      const scoreboardToRemove = document.getElementById("scoreboard");

      if (scoreboardToRemove) {
        scoreContainer.removeChild(scoreboardToRemove);
      }

      scoreContainer.appendChild(this.createScoreboard());
    }

  }

  createScoreboard() {
    const scoreboard = document.createElement("div");
    scoreboard.id = "scoreboard";

    scoreboard.appendChild(this.createLevelHeader());
    scoreboard.appendChild(this.createScoreHeader());
    return scoreboard;
  }

  createLevelHeader() {
    let levelHeader = document.createElement("H1");
    let levelText = document.createTextNode("Level: " + this.level());
    levelHeader.appendChild(levelText);
    return levelHeader;
  }

  createScoreHeader() {
    let scoreHeader = document.createElement("H1");
    scoreHeader.id = "score-header";
    let scoreText = document.createTextNode("Score: " + this.score());
    scoreHeader.appendChild(scoreText);
    return scoreHeader;
  }

  createGameOverSection() {
    const div = document.createElement("div");
    div.id = "game-over";

    div.appendChild(this.createGameOverNotification());
    div.appendChild(this.createPlayButton());

    const root = document.getElementById("root");
    root.appendChild(div);
  }

  createGameOverNotification() {
    let header = document.createElement("H1");
    let levelText = document.createTextNode("Game over!");
    header.appendChild(levelText);

    return header;
  }

  createPlayButton() {
    let button = document.createElement("button");
    button.id = "play-again";
    button.innerHTML = "Click to play again";

    return button;
  }

  update() {
    this.board.update();
  }

  over() {
    return this.board.over();
  }

  newLevel() {
    if (this.level() > this.mostRecentLevel) {
      this.mostRecentLevel = this.level();
      return true;
    }
  }

  score() {
    const clearPoints = this.board.rowsCleared * 50;
    const fallenPiecesPoints = this.board.piecesFallen * 15;

    return clearPoints + fallenPiecesPoints;
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

  drop() {
    this.board.drop();
  }
}

// module.exports = Game;
