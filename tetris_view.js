class View {
  constructor(game) {
    this.game = game;
    this.bindKeyHandlers = this.bindKeyHandlers.bind(this);
    this.intervalTime = 600;
    this.downKeyPressed = false;
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
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
    this.interval = setInterval(this.game.update.bind(this.game), this.intervalTime);
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    // if (!this.game.over()) {
      this.game.step(timeDelta);
    // }

    if (this.game.newLevel()) {
      clearInterval(this.interval);
      this.intervalTime -= 50;
      this.interval = setInterval(this.game.update.bind(this.game), this.intervalTime);
    }

    if (this.game.switchView) {
      setTimeout(this.drawRestartGame.bind(this), 1000);
    }


    requestAnimationFrame(this.animate.bind(this));
  }

  drawRestartGame() {
    const main = document.getElementById("main");
    const body = document.getElementById("body");
    if (main) {
      body.removeChild(main);
    }

    let gameOverSection = document.getElementById("game-over");

    if (!gameOverSection) {
      gameOverSection = document.createElement("section");
      gameOverSection.id = "game-over";

      const gameOverHeader = document.createElement("H1");
      const gameOverHeaderText = document.createTextNode("Game over!")
      gameOverHeader.appendChild(gameOverHeaderText);

      const button = document.createElement("button");
      button.setAttribute("value", "Play again")
      // const button.value = "Play again";

      gameOverSection.appendChild(gameOverHeader);
      gameOverSection.appendChild(button);

      body.appendChild(gameOverSection);
    }


  }

}


module.exports = View;
