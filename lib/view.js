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
    this.replay = false;
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
    const keyUpCallback = (e) => {
    }
    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowDown") {
        clearInterval(this.interval);
        this.interval = setInterval(this.game.update.bind(this.game), this.intervalTime);
        this.downKeyPressed = false;
      }
    });
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
    if (main) { main.className = "invisible"; }

    gameOverContainer.className = "visible";

      if (!this.replay) {
        gameOverContainer.appendChild(this.createGameOverHeader());
        gameOverContainer.appendChild(this.createPlayAgainButton());
        this.replay = true;
      }

      document.getElementById("button").addEventListener("click", (e) => {
        let main = document.getElementById("main");
        main.className = "visible";
        gameOverContainer.className = "invisible";
        this.switchedView = false;
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

  createPlayAgainButton() {
    const button = document.createElement("button");
    button.textContent = "Play again";
    button.id = "button";

    return button;
  }

}
