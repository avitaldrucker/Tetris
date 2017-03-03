import Game from './tetris_game';

class View {
  constructor(game) {
    this.game = game;
    this.bindKeyHandlers = this.bindKeyHandlers.bind(this);
    this.intervalTime = 600;
    this.downKeyPressed = false;
    this.switchedView = false;
  }

  bindKeyHandlers() {
    document.addEventListener("keydown", function(e) {
      e.preventDefault();

      switch(e.which) {
          case 37:
          this.game.moveLeft();
          break;

          case 38:
          this.game.spin();
          break;

          case 39:
          this.game.moveRight();
          break;

          case 40:
          if (!this.downKeyPressed) {
            clearInterval(this.interval);
            this.interval = setInterval(this.game.update.bind(this.game), 40);
            this.downKeyPressed = true;
          }
          break;

          case 32:
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
    this.bindKeyHandlers(); //remove key handlers when game over

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
      this.intervalTime -= 50;
      this.interval = setInterval(this.game.update.bind(this.game), this.intervalTime);
    }

    if (this.game.switchView && !this.switchedView) {
      setTimeout(this.drawRestartGame.bind(this), 1000);
      this.switchedView = true;
    }


    requestAnimationFrame(this.animate.bind(this));
  }

  drawRestartGame() {

    const main = document.getElementById("main");
    const body = document.getElementById("body");
    if (main) {
      main.className = "invisible";
    }

    let gameOverSection = document.getElementById("game-over");

    if (!gameOverSection) {
      gameOverSection = document.createElement("section");
      gameOverSection.id = "game-over";

      const gameOverHeader = document.createElement("H1");
      const gameOverHeaderText = document.createTextNode("Game over!")
      gameOverHeader.appendChild(gameOverHeaderText);

      const button = document.createElement("button");
      button.setAttribute("value", "Play again");
      button.id = "button";

      gameOverSection.appendChild(gameOverHeader);
      gameOverSection.appendChild(button);

      body.appendChild(gameOverSection);

      document.getElementById("button").addEventListener("click", (e) => {
        let main = document.getElementById("main");
        main.className = "visible";
        this.switchedView = false;
        this.game = new Game();
        this.start();
      });
    }


  }

}


module.exports = View;
