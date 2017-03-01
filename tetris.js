const View = require('./tetris_view');
const Game = require('./tetris_game');

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("canvas");

  canvasEl.width = 1000;
  canvasEl.height= 1000;

  const ctx = canvasEl.getContext("2d");

  const game = new Game();
  new View(game, ctx).start();
});
