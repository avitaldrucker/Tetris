import View from './view';
import Game from './game';

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("canvas");
  canvas.width = 100;
  canvas.height = 50;
  const ctx = canvas.getContext("2d");

  new View(ctx).drawStartGame();
});
