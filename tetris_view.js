class View {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.bindKeyHandlers = this.bindKeyHandlers.bind(this);
    this.intervalTime = 600;
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

          default: return;
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
    this.game.step(timeDelta);

    if (this.game.newLevel()) {
      clearInterval(this.interval);
      this.intervalTime -= 50;
      this.interval = setInterval(this.game.update.bind(this.game), this.intervalTime);
    }

    requestAnimationFrame(this.animate.bind(this));
  }

}


module.exports = View;
