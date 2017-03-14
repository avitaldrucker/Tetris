import Game from './game';

export default class View {

  constructor(ctx) {
    this.bindKeyHandlers = this.bindKeyHandlers.bind(this);
    this.intervalTime = 600;
    this.downKeyPressed = false;
    this.gameView = true;
    this.ctx = ctx;
    this.replayed = false;
    this.played = false;
  }

  bindKeyHandlers() {
    this.addTileManipulationListeners();
    this.addSpeedResetListener();
  }

  accelerateDescent() {
    clearInterval(this.interval);
    this.interval = setInterval(this.game.update.bind(this.game), 40);
    this.downKeyPressed = true;
  }

  addTileManipulationListeners() {
    const gameControlCodes = [37, 38, 39, 40, 32];

    document.addEventListener("keydown", (e) => {

      if (gameControlCodes.includes(e.which)) { e.preventDefault(); }

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
          if (!this.downKeyPressed) { this.accelerateDescent(); }
          break;

          case 32:
          this.game.drop();
          break;
      }
    });
  }

  addSpeedResetListener() {
    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowDown") {
        clearInterval(this.interval);
        this.resetInterval();
        this.downKeyPressed = false;
      }
    });
  }

  start() {
    if (!this.played) {
      this.bindKeyHandlers();
      this.played = true;
    }

    requestAnimationFrame(this.animate.bind(this));

    if (this.interval) { clearInterval(this.interval); }
    this.intervalTime = 600;
    this.resetInterval();
  }

  resetInterval() {
    this.interval = setInterval(
      this.game.update.bind(this.game),
      this.intervalTime
    );
  }

  animate(time) {
    this.game.step();

    if (this.game.newLevel()) {
      clearInterval(this.interval);
      this.intervalTime -= 40;
      this.resetInterval();
    }

    if (this.game.switchView && this.gameView) {
      setTimeout(this.drawStartGame.bind(this), 1000);
    } else {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  switchView(newGame) {
    const main = document.getElementById("main");
    const gameOverContainer = document.getElementById("game-over-container");

    if (newGame) {
      main.className = "visible";
      gameOverContainer.className = "invisible";
      this.gameView = true;
    }
    else {
      main.className = "invisible";
      gameOverContainer.className = "visible";
      this.gameView = false;
    }
  }

  drawStartGame() {
    this.switchView(false);

    const gameOverContainer = document.getElementById("game-over-container");

    if (!this.played) {
      gameOverContainer.appendChild(this.createPlayButton());
      this.addPlayListener();
    }
    else if (!this.replayed) {
      const startButton = document.getElementById("button");
      gameOverContainer.insertBefore(this.createGameOverHeader(), startButton);
      startButton.textContent = "Play again";
      this.replayed = true;
    }

  }

  addPlayListener() {
    document.getElementById("button").addEventListener("click", (e) => {
      this.switchView(true);
      this.game = new Game(this.ctx);
      this.start();
    });
  }

  createGameOverHeader() {
    const gameOverHeader = document.createElement("H1");
    gameOverHeader.id = "game-over-header";
    const gameOverHeaderText = document.createTextNode("Game over");
    gameOverHeader.appendChild(gameOverHeaderText);

    return gameOverHeader;
  }

  createPlayButton(buttonText) {
    const button = document.createElement("button");
    button.textContent = "Start";
    button.id = "button";

    return button;
  }

}
