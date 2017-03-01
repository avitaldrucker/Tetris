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
    setInterval(this.game.update.bind(this.game), 1000);
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    // this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }

}

View.MOVES = {
  "a": [-1, 0],
  "d": [1, 0]
}

module.exports = View;
