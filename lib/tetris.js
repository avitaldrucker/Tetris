const View = require('./view');
const Game = require('./game');

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("canvas");
  canvas.width = 100;
  canvas.height = 50;
  const ctx = canvas.getContext("2d");

  const game = new Game(ctx);
  new View(game, ctx).start();
});
