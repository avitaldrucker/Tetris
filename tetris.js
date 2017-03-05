const View = require('./tetris_view');
const Game = require('./tetris_game');

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("canvas");
  canvas.width = 100;
  canvas.height = 50;
  const ctx = canvas.getContext("2d");

  const game = new Game(ctx);
  new View(game, ctx).start();
});
