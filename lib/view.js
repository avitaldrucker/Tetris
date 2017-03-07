import Game from './game';

export default class View {
  constructor(game, ctx) {
    this.game = game;
    this.bindKeyHandlers = this.bindKeyHandlers.bind(this);
    this.intervalTime = 600;
    this.downKeyPressed = false;
    this.switchedView = false;
    this.keysBound = false;
    this.ctx = ctx;
  }

  bindKeyHandlers() {
    document.addEventListener("keydown", function(e) {


      switch(e.which) {
          case 37:
          e.preventDefault();
          this.game.moveLeft();
          break;

          case 38:
          e.preventDefault();
          this.game.spin();
          break;

          case 39:
          e.preventDefault();
          this.game.moveRight();
          break;

          case 40:
          e.preventDefault();
          if (!this.downKeyPressed) {
            clearInterval(this.interval);
            this.interval = setInterval(this.game.update.bind(this.game), 40);
            this.downKeyPressed = true;
          }
          break;

          case 32:
          e.preventDefault();
          this.game.drop();
          break;

          default: return;
      }
    }.bind(this));

    document.addEventListener("keyup", function(e) {
      if (e.key === "ArrowDown") {
        clearInterval(this.interval);
        this.interval = setInterval(this.game.update.bind(this.game), this.intervalTime);
        this.downKeyPressed = false;
      }
    }.bind(this));
  }

  start() {
    if (!this.keysBound) {
      this.bindKeyHandlers();
      this.keysBound = true;
    }

    requestAnimationFrame(this.animate.bind(this));

    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(this.game.update.bind(this.game), this.intervalTime);
  }

  animate(time) {
    this.game.step();

    if (this.game.newLevel()) {
      clearInterval(this.interval);
      this.intervalTime -= 40;
      this.interval = setInterval(this.game.update.bind(this.game), this.intervalTime);
    }

    if (this.game.switchView && !this.switchedView) {
      this.intervalTime = 600;
      setTimeout(this.drawRestartGame.bind(this), 1000);
      this.switchedView = true;
    }


    requestAnimationFrame(this.animate.bind(this));
  }

  drawRestartGame() {

    const main = document.getElementById("main");
    const gameOverContainer = document.getElementById("game-over-container");
    if (main) {
      main.className = "invisible";
    }

    let gameOverSection = document.getElementById("game-over");
    if (gameOverSection) { gameOverSection.className = "visible"; }

    if (!gameOverSection) {
      gameOverSection = document.createElement("section");
      gameOverSection.id = "game-over";
      if (gameOverSection) { gameOverSection.className = "visible"; }

      const gameOverHeader = document.createElement("H1");
      gameOverHeader.id = "game-over-header";
      const gameOverHeaderText = document.createTextNode("Game over")
      gameOverHeader.appendChild(gameOverHeaderText);

      const button = document.createElement("button");
      button.textContent = "Play again";
      button.id = "button";

      gameOverSection.appendChild(gameOverHeader);
      gameOverSection.appendChild(button);

      gameOverContainer.appendChild(gameOverSection);

      document.getElementById("button").addEventListener("click", (e) => {
        let main = document.getElementById("main");
        main.className = "visible";
        gameOverSection.className = "invisible";
        this.switchedView = false;
        this.game = new Game(this.ctx);
        this.start();
      });
    }


  }

}


// module.exports = View;
