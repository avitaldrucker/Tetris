const View = require('./tetris_view');
const Game = require('./tetris_game');

document.addEventListener("DOMContentLoaded", function() {
  const game = new Game();
  new View(game).start();
});
