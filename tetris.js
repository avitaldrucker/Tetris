const View = require('./tetris_view');
const Game = require('./tetris_game');

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("canvas");
  canvas.width = 200;
  canvas.height = 100;
  const ctx = canvas.getContext("2d");

  const game = new Game(ctx);
  new View(game, ctx).start();
});
