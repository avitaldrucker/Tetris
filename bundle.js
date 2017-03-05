/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _board = __webpack_require__(2);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(ctx) {
    _classCallCheck(this, Game);

    this.board = new _board2.default(ctx);
    window.board = this.board;
    this.mostRecentLevel = this.level();
    this.gameOverButtonCreated = false;
    this.switchView = false;
    this.ctx = ctx;
  }

  _createClass(Game, [{
    key: "step",
    value: function step(timeDelta) {
      this.draw();
      this.board.draw();
      if (this.board.over()) {
        this.switchView = true;
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      if (!this.over()) {
        var scoreContainer = document.getElementById("score-container");

        var scoreboardToRemove = document.getElementById("scoreboard");

        if (scoreboardToRemove) {
          scoreContainer.removeChild(scoreboardToRemove);
        }

        scoreContainer.appendChild(this.createScoreboard());
      }
    }
  }, {
    key: "createScoreboard",
    value: function createScoreboard() {
      var scoreboard = document.createElement("div");
      scoreboard.id = "scoreboard";

      scoreboard.appendChild(this.createLevelHeader());
      scoreboard.appendChild(this.createScoreHeader());
      return scoreboard;
    }
  }, {
    key: "createLevelHeader",
    value: function createLevelHeader() {
      var levelHeader = document.createElement("H1");
      var levelText = document.createTextNode("Level: " + this.level());
      levelHeader.appendChild(levelText);
      return levelHeader;
    }
  }, {
    key: "createScoreHeader",
    value: function createScoreHeader() {
      var scoreHeader = document.createElement("H1");
      scoreHeader.id = "score-header";
      var scoreText = document.createTextNode("Score: " + this.score());
      scoreHeader.appendChild(scoreText);
      return scoreHeader;
    }
  }, {
    key: "createGameOverSection",
    value: function createGameOverSection() {
      var div = document.createElement("div");
      div.id = "game-over";

      div.appendChild(this.createGameOverNotification());
      div.appendChild(this.createPlayButton());

      var root = document.getElementById("root");
      root.appendChild(div);
    }
  }, {
    key: "createGameOverNotification",
    value: function createGameOverNotification() {
      var header = document.createElement("H1");
      var levelText = document.createTextNode("Game over!");
      header.appendChild(levelText);

      return header;
    }
  }, {
    key: "createPlayButton",
    value: function createPlayButton() {
      var button = document.createElement("button");
      button.id = "play-again";
      button.innerHTML = "Click to play again";

      return button;
    }
  }, {
    key: "update",
    value: function update() {
      this.board.update();
    }
  }, {
    key: "over",
    value: function over() {
      return this.board.over();
    }
  }, {
    key: "newLevel",
    value: function newLevel() {
      if (this.level() > this.mostRecentLevel) {
        this.mostRecentLevel = this.level();
        return true;
      }
    }
  }, {
    key: "score",
    value: function score() {
      var clearPoints = this.board.rowsCleared * 50;
      var fallenPiecesPoints = this.board.piecesFallen * 15;

      return clearPoints + fallenPiecesPoints;
    }
  }, {
    key: "level",
    value: function level() {
      return Math.floor(this.score() / 180) + 1;
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.board.moveLeft();
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.board.moveRight();
    }
  }, {
    key: "spin",
    value: function spin() {
      this.board.spin();
    }
  }, {
    key: "drop",
    value: function drop() {
      this.board.drop();
    }
  }]);

  return Game;
}();

module.exports = Game;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tetris_game = __webpack_require__(0);

var _tetris_game2 = _interopRequireDefault(_tetris_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
  function View(game, ctx) {
    _classCallCheck(this, View);

    this.game = game;
    this.bindKeyHandlers = this.bindKeyHandlers.bind(this);
    this.intervalTime = 600;
    this.downKeyPressed = false;
    this.switchedView = false;
    this.keysBound = false;
    this.ctx = ctx;
  }

  _createClass(View, [{
    key: "bindKeyHandlers",
    value: function bindKeyHandlers() {
      document.addEventListener("keydown", function (e) {
        e.preventDefault();

        switch (e.which) {
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
            if (!this.downKeyPressed) {
              clearInterval(this.interval);
              this.interval = setInterval(this.game.update.bind(this.game), 40);
              this.downKeyPressed = true;
            }
            break;

          case 32:
            this.game.drop();
            break;

          default:
            return;
        }
      }.bind(this));

      document.addEventListener("keyup", function (e) {
        if (e.key === "ArrowDown") {
          clearInterval(this.interval);
          this.interval = setInterval(this.game.update.bind(this.game), this.intervalTime);
          this.downKeyPressed = false;
        }
      }.bind(this));
    }
  }, {
    key: "start",
    value: function start() {
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
  }, {
    key: "animate",
    value: function animate(time) {
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
  }, {
    key: "drawRestartGame",
    value: function drawRestartGame() {
      var _this = this;

      var main = document.getElementById("main");
      var pageContainer = document.getElementById("page-container");
      if (main) {
        main.className = "invisible";
      }

      var gameOverSection = document.getElementById("game-over");
      if (gameOverSection) {
        gameOverSection.className = "visible";
      }

      if (!gameOverSection) {
        gameOverSection = document.createElement("section");
        gameOverSection.id = "game-over";
        if (gameOverSection) {
          gameOverSection.className = "visible";
        }

        var gameOverHeader = document.createElement("H1");
        gameOverHeader.id = "game-over-header";
        var gameOverHeaderText = document.createTextNode("Game over");
        gameOverHeader.appendChild(gameOverHeaderText);

        var button = document.createElement("button");
        button.textContent = "Play again";
        button.id = "button";

        gameOverSection.appendChild(gameOverHeader);
        gameOverSection.appendChild(button);

        pageContainer.appendChild(gameOverSection);

        document.getElementById("button").addEventListener("click", function (e) {
          var main = document.getElementById("main");
          main.className = "visible";
          gameOverSection.className = "invisible";
          _this.switchedView = false;
          _this.game = new _tetris_game2.default(_this.ctx);
          _this.start();
        });
      }
    }
  }]);

  return View;
}();

module.exports = View;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _piece = __webpack_require__(3);

var _piece2 = _interopRequireDefault(_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
  function Board(ctx) {
    _classCallCheck(this, Board);

    this.level = 0;

    this.spawnPiece();

    this.grid = this.newGrid();
    this.rowsCleared = 0;
    this.piecesFallen = 0;

    this.switchView = false;
    this.ctx = ctx;

    this.dropped = false;
  }

  _createClass(Board, [{
    key: "newGrid",
    value: function newGrid() {
      var grid = [];
      for (var i = 0; i < 20; i++) {
        grid[i] = this.emptyRow();
      }

      return grid;
    }
  }, {
    key: "emptyRow",
    value: function emptyRow() {
      var row = [];
      for (var j = 0; j < 10; j++) {
        row.push(null);
      }

      return row;
    }
  }, {
    key: "spin",
    value: function spin() {
      if (this.fallingPiece && !this.fallingPiece.aboveTop()) {
        this.fallingPiece.spin();
      }
    }
  }, {
    key: "arrayEqual",
    value: function arrayEqual(arr1, arr2) {
      return arr1[0] === arr2[0] && arr1[1] === arr2[1];
    }
  }, {
    key: "draw",
    value: function draw() {
      var root = document.getElementById("root");

      if (!root) {
        return;
      }

      var divToRemove = document.getElementById("board");
      if (divToRemove) {
        root.removeChild(divToRemove);
      }

      root.appendChild(this.drawGrid());
    }
  }, {
    key: "drawGrid",
    value: function drawGrid() {
      var div = document.createElement("div");
      div.id = "board";

      for (var row = 0; row < this.grid.length; row++) {
        div.appendChild(this.drawRow(row));
      }

      return div;
    }
  }, {
    key: "drawRow",
    value: function drawRow(rowIdx) {
      var ul = document.createElement("ul");
      ul.className = "board";

      for (var col = 0; col < this.grid[0].length; col++) {
        var li = document.createElement("li");
        var tile = this.grid[rowIdx][col];

        if (tile) {
          li.className = tile.symbol + " tile";
        } else {
          li.className = "tile";
        }

        ul.appendChild(li);
      }

      return ul;
    }
  }, {
    key: "spawnPiece",
    value: function spawnPiece() {
      if (this.fallingPiece) {
        this.fallingPiece = this.nextPiece;
      } else {
        this.fallingPiece = _piece2.default.randomPiece();
        this.fallingPiece.board = this;
      }

      this.nextPiece = _piece2.default.randomPiece();
      this.nextPiece.board = this;
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      if (this.fallingPiece && !this.fallingPiece.aboveTop()) {
        this.fallingPiece.moveLeft();
      }
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      if (this.fallingPiece && !this.fallingPiece.aboveTop()) {
        this.fallingPiece.moveRight();
      }
    }
  }, {
    key: "updatePreview",
    value: function updatePreview() {
      if (!this.over()) {
        this.nextPiece.draw(this.ctx);
      } else {
        this.clearPreview();
      }
    }
  }, {
    key: "clearPreview",
    value: function clearPreview() {
      this.ctx.clearRect(0, 0, 300, 300);
    }
  }, {
    key: "drop",
    value: function drop() {
      if (this.fallingPiece.validCoords(this.fallingPiece.coords)) {
        this.fallingPiece.drop();
      }

      if (!this.over()) {
        if (!this.dropped) {
          this.piecesFallen += 1;
        }
        this.clearRows();
        this.spawnPiece();
      }
      this.dropped = true;
    }
  }, {
    key: "update",
    value: function update() {
      this.dropped = false;
      var topPiece = this.fallingPiece.aboveTop();
      if (!this.fallingPiece.fallen()) {
        this.fallingPiece.moveDown();
      }

      if (topPiece) {
        this.updatePreview();
      }

      if (this.fallingPiece.fallen() && !this.over()) {
        this.piecesFallen += 1;
        this.clearRows();
        this.spawnPiece();
      }
    }
  }, {
    key: "gridAt",
    value: function gridAt(pos) {
      var _pos = _slicedToArray(pos, 2),
          row = _pos[0],
          col = _pos[1];

      return this.grid[row][col];
    }
  }, {
    key: "over",
    value: function over() {
      return this.fallingPiece && this.fallingPiece.aboveTop() && this.fallingPiece.fallen();
    }
  }, {
    key: "clearRows",
    value: function clearRows() {
      var newGrid = this.nonFullRows();

      while (newGrid.length < 20) {
        this.rowsCleared += 1;
        newGrid.unshift(this.emptyRow());
      }

      this.grid = newGrid;
    }
  }, {
    key: "nonFullRows",
    value: function nonFullRows() {
      var _this = this;

      var newGrid = [];

      this.grid.forEach(function (row) {
        if (!_this.full(row)) {
          newGrid.push(row);
        }
      });

      return newGrid;
    }
  }, {
    key: "full",
    value: function full(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (!arr[i]) {
          return false;
        }
      }

      return true;
    }
  }]);

  return Board;
}();

module.exports = Board;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piece = function () {
  function Piece(options) {
    _classCallCheck(this, Piece);

    this.symbol = options["symbol"];
    this.coords = options["coords"];
    this.draw = options.draw;
  }

  _createClass(Piece, [{
    key: "moveLeft",
    value: function moveLeft() {
      if (this.canMoveSideways("l")) {

        var oldCoords = this.coords;
        this.clearBoard();

        this.addModifiedCoords("col", -1);

        this.center = [this.center[0], this.center[1] - 1];
      }
    }
  }, {
    key: "drop",
    value: function drop() {
      while (!this.fallen()) {
        this.moveDown();
      }
    }
  }, {
    key: "canMoveSideways",
    value: function canMoveSideways(direction) {
      return !this.fallen() && !this.aboveTop() && !this.atBorder(direction) && !this.neighborsAt(direction);
    }
  }, {
    key: "differentPieceAtPos",
    value: function differentPieceAtPos(pos) {
      return this.board.gridAt(pos) && !this.coordsIncluded(pos);
    }
  }, {
    key: "neighborsAt",
    value: function neighborsAt(dir) {
      for (var i = 0; i < this.coords.length; i++) {
        var _coords$i = _slicedToArray(this.coords[i], 2),
            row = _coords$i[0],
            col = _coords$i[1];

        var neighborPos = dir === "l" ? [row, col - 1] : [row, col + 1];

        if (this.differentPieceAtPos(neighborPos)) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      if (this.canMoveSideways("r")) {
        var oldCoords = this.coords;

        this.clearBoard();

        this.addModifiedCoords("col", 1);

        this.center = [this.center[0], this.center[1] + 1];
      }
    }
  }, {
    key: "atBorder",
    value: function atBorder(dir) {
      var borderIndex = dir === "l" ? 0 : 9;

      for (var i = 0; i < this.coords.length; i++) {
        var _coords$i2 = _slicedToArray(this.coords[i], 2),
            row = _coords$i2[0],
            col = _coords$i2[1];

        if (col === borderIndex) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "fallen",
    value: function fallen() {
      for (var i = 0; i < this.coords.length; i++) {
        var _coords$i3 = _slicedToArray(this.coords[i], 2),
            row = _coords$i3[0],
            col = _coords$i3[1];

        if (row === 19 || this.differentPieceAtPos([row + 1, col])) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "coordsIncluded",
    value: function coordsIncluded(coord) {

      for (var i = 0; i < this.coords.length; i++) {
        var _coords$i4 = _slicedToArray(this.coords[i], 2),
            ownRow = _coords$i4[0],
            ownCol = _coords$i4[1];

        if (ownRow === coord[0] && ownCol === coord[1]) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "rotatedCoords",
    value: function rotatedCoords(clockwise) {
      var _this = this;

      var coords = [];

      this.coords.forEach(function (coord) {
        coords.push(_this.rotateCoord(coord, clockwise));
      }, this);

      return coords;
    }
  }, {
    key: "rotateCoord",
    value: function rotateCoord(coord, clockwise) {
      var _center = _slicedToArray(this.center, 2),
          centerRow = _center[0],
          centerCol = _center[1];

      var posFromCenter = [coord[0] - centerRow, coord[1] - centerCol];
      var row = posFromCenter[0],
          col = posFromCenter[1];


      if (clockwise) {
        return [col + centerRow, row * -1 + centerCol];
      } else {
        return [col * -1 + centerRow, row + centerCol];
      }
    }
  }, {
    key: "spin",
    value: function spin(clockwise) {
      var _this2 = this;

      var rotatedCoords = this.rotatedCoords(clockwise);
      if (this.validCoords(rotatedCoords)) {

        this.clearBoard();

        this.coords = [];

        rotatedCoords.forEach(function (coord) {
          _this2.board.grid[coord[0]][coord[1]] = _this2;
          _this2.coords.push(coord);
        }, this);
      }
    }
  }, {
    key: "validCoords",
    value: function validCoords(coords) {
      for (var i = 0; i < coords.length; i++) {
        if (this.validPos(coords[i])) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: "validPos",
    value: function validPos(pos) {
      var _pos = _slicedToArray(pos, 2),
          row = _pos[0],
          col = _pos[1];

      return row < 0 || row > 19 || col < 0 || col > 9 || this.differentPieceAtPos(pos);
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      if (!this.aboveTop()) {
        this.clearBoard();
      }

      var oldCoords = this.coords;

      this.addModifiedCoords("row", 1);
      this.center = [this.center[0] + 1, this.center[1]];
    }
  }, {
    key: "addModifiedCoords",
    value: function addModifiedCoords(line, num) {
      var _this3 = this;

      var oldCoords = this.coords;
      this.coords = [];

      oldCoords.forEach(function (coord) {
        var _coord = _slicedToArray(coord, 2),
            row = _coord[0],
            col = _coord[1];

        line === "row" ? row = row + num : col = col + num;

        _this3.coords.push([row, col]);
        _this3.board.grid[row][col] = _this3;
      }, this);
    }
  }, {
    key: "clearBoard",
    value: function clearBoard() {
      var _this4 = this;

      this.coords.forEach(function (coord) {
        var _coord2 = _slicedToArray(coord, 2),
            row = _coord2[0],
            col = _coord2[1];

        _this4.board.grid[row][col] = null;
      }, this);
    }
  }, {
    key: "aboveTop",
    value: function aboveTop() {
      for (var i = 0; i < this.coords.length; i++) {
        if (this.coords[i][0] === -1) {
          return true;
        }
      }

      return false;
    }
  }]);

  return Piece;
}();

var SpinnablePiece = function (_Piece) {
  _inherits(SpinnablePiece, _Piece);

  function SpinnablePiece(options) {
    _classCallCheck(this, SpinnablePiece);

    var _this5 = _possibleConstructorReturn(this, (SpinnablePiece.__proto__ || Object.getPrototypeOf(SpinnablePiece)).call(this, options));

    _this5.center = options.center;
    return _this5;
  }

  _createClass(SpinnablePiece, [{
    key: "spin",
    value: function spin() {
      Piece.prototype.spin.call(this, true);
    }
  }]);

  return SpinnablePiece;
}(Piece);

var TogglingPiece = function (_Piece2) {
  _inherits(TogglingPiece, _Piece2);

  function TogglingPiece(options) {
    _classCallCheck(this, TogglingPiece);

    var _this6 = _possibleConstructorReturn(this, (TogglingPiece.__proto__ || Object.getPrototypeOf(TogglingPiece)).call(this, options));

    _this6.rotated = false;
    _this6.center = options.center;
    return _this6;
  }

  _createClass(TogglingPiece, [{
    key: "spin",
    value: function spin() {
      if (this.rotated && this.symbol !== "O") {
        Piece.prototype.spin.call(this, false);
        this.rotated = false;
      } else if (this.symbol !== "O") {
        Piece.prototype.spin.call(this, true);
        this.rotated = true;
      }
    }
  }]);

  return TogglingPiece;
}(Piece);

var StaticPiece = function (_Piece3) {
  _inherits(StaticPiece, _Piece3);

  function StaticPiece(options) {
    _classCallCheck(this, StaticPiece);

    return _possibleConstructorReturn(this, (StaticPiece.__proto__ || Object.getPrototypeOf(StaticPiece)).call(this, options));
  }

  _createClass(StaticPiece, [{
    key: "spin",
    value: function spin() {}
  }]);

  return StaticPiece;
}(Piece);

var iPiece = {
  symbol: "I",
  coords: [[-1, 3], [-1, 4], [-1, 5], [-1, 6]],
  center: [-1, 4],
  spinnable: false,
  draw: function draw(ctx) {
    prepareDraw(ctx);
    ctx.fillStyle = "cyan";

    addSquare(ctx, 0, 0);
    addSquare(ctx, 25, 0);
    addSquare(ctx, 50, 0);
    addSquare(ctx, 75, 0);
  }
};

var jPiece = { symbol: "J",
  coords: [[-1, 4], [-1, 5], [-1, 6], [0, 6]],
  center: [-1, 5],
  spinnable: true,
  draw: function draw(ctx) {
    prepareDraw(ctx);
    ctx.fillStyle = "blue";

    addSquare(ctx, 12.5, 0);
    addSquare(ctx, 37.5, 0);
    addSquare(ctx, 62.5, 0);
    addSquare(ctx, 62.5, 25);
  }
};

var lPiece = {
  symbol: "L",
  coords: [[-1, 4], [-1, 5], [0, 4], [-1, 6]],
  center: [-1, 5],
  spinnable: true,
  draw: function draw(ctx) {
    prepareDraw(ctx);
    ctx.fillStyle = "orange";

    addSquare(ctx, 12.5, 0);
    addSquare(ctx, 12.5, 25);
    addSquare(ctx, 37.5, 0);
    addSquare(ctx, 62.5, 0);
  }
};

var oPiece = {
  symbol: "O",
  coords: [[-1, 4], [-1, 5], [0, 4], [0, 5]],
  center: [-1, 4],
  spinnable: false,
  draw: function draw(ctx) {
    prepareDraw(ctx);
    ctx.fillStyle = "yellow";

    addSquare(ctx, 25, 0);
    addSquare(ctx, 25, 25);
    addSquare(ctx, 50, 0);
    addSquare(ctx, 50, 25);
  }
};

var sPiece = {
  symbol: "S",
  coords: [[0, 4], [-1, 5], [0, 5], [-1, 6]],
  center: [-1, 5],
  spinnable: false,
  draw: function draw(ctx) {
    prepareDraw(ctx);
    ctx.fillStyle = "green";

    addSquare(ctx, 12.5, 25);
    addSquare(ctx, 37.5, 25);
    addSquare(ctx, 37.5, 0);
    addSquare(ctx, 62.5, 0);
  }
};

var tPiece = {
  symbol: "T",
  coords: [[-1, 4], [-1, 5], [0, 5], [-1, 6]],
  center: [-1, 5],
  spinnable: true,
  draw: function draw(ctx) {
    prepareDraw(ctx);
    ctx.fillStyle = "purple";

    addSquare(ctx, 12.5, 0);
    addSquare(ctx, 37.5, 0);
    addSquare(ctx, 62.5, 0);
    addSquare(ctx, 37.5, 25);
  }
};

var zPiece = {
  symbol: "Z",
  coords: [[-1, 4], [-1, 5], [0, 5], [0, 6]],
  center: [-1, 5],
  spinnable: false,
  draw: function draw(ctx) {
    prepareDraw(ctx);
    ctx.fillStyle = "red";

    addSquare(ctx, 12.5, 0);
    addSquare(ctx, 37.5, 0);
    addSquare(ctx, 37.5, 25);
    addSquare(ctx, 62.5, 25);
  }
};

Piece.PIECES = [iPiece, jPiece, lPiece, oPiece, sPiece, tPiece, zPiece];

Piece.randomPiece = function () {
  var randIndex = Math.floor(Math.random() * Piece.PIECES.length);
  var options = Piece.PIECES[randIndex];
  if (options.spinnable && options.center) {
    return new SpinnablePiece(options);
  } else {
    return new TogglingPiece(options);
  }
};

var prepareDraw = function prepareDraw(ctx) {
  ctx.clearRect(0, 0, 300, 300);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
};

var addSquare = function addSquare(ctx, x, y) {
  ctx.fillRect(x, y, 25, 25);
  ctx.strokeRect(x, y, 25, 25);
};

module.exports = Piece;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var View = __webpack_require__(1);
var Game = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("canvas");
  canvas.width = 100;
  canvas.height = 50;
  var ctx = canvas.getContext("2d");

  var game = new Game(ctx);
  new View(game, ctx).start();
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map