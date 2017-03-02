class View {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.bindKeyHandlers = this.bindKeyHandlers.bind(this);
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
    setInterval(this.game.update.bind(this.game), 500);
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);

    requestAnimationFrame(this.animate.bind(this));
  }

}


module.exports = View;
