import Board from './board';

class Game {
  constructor() {
    this.board = new Board();
    window.board = this.board;
    this.mostRecentLevel = this.level();
    this.gameOverButtonCreated = false;
    this.switchView = false;
  }

  step(timeDelta) {
    this.draw();
    this.board.draw();
    if (this.board.over()) {
      this.switchView = true;
    }
  }

  draw() {

    if (!this.over()) {
      let sidebar = document.getElementById("sidebar");

      const scoreboardToRemove = document.getElementById("scoreboard");

      if (scoreboardToRemove) { sidebar.removeChild(scoreboardToRemove); }

      sidebar.appendChild(this.createScoreboard());
    }


  }

  createGameOverSection() {
    const div = document.createElement("div");
    div.id = "game-over";

    let header = document.createElement("H1");
    let levelText = document.createTextNode("Game over!");

    let button = document.createElement("button");
    button.id = "play-again";
    button.value = "Click to play again";

    const root = document.getElementById("root");
    root.appendChild(div);

    // document.getElementById("play-again").addEventListener("click", function() {
    //   const game = new Game();
    //   new View(game, ctx).start();
    // });
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
    let scoreText = document.createTextNode("Score: " + this.score());
    scoreHeader.appendChild(scoreText);
    return scoreHeader;
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

  drop() {
    this.board.drop();
  }

  // switchView() {
  //   return this.board.switchView;
  // }
}

module.exports = Game;
