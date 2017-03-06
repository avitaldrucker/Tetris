#Tetris#

[Live version][live]

[live]: http://avitaldrucker.com/Tetris/

Tetris is a browser-based, tile-matching game. The goal is to clear as many rows as possible by matching tiles.

##How to Play##
Tiles fall down the screen, leading to rows of fallen tiles. To clear rows, strategically place tiles so that they touch each other, minimizing gaps between tiles. A full row of tiles will be cleared. If the stack of fallen tiles hits the top of the grid, the player has lost. Players can move the tiles left and right through the left and right arrow keys, respectively. Tiles can be rotated with up key, and tiles' descent speed can be increased in with the down arrow key. Tiles can be instantly dropped with the space bar.

##Technologies Used##
* JavaScript
* Native browser DOM API
* HTML5 Canvas

##Technical Implementation Details##

###Rotation###

I implemented rotation through the subclasses SpinnablePiece, TogglingPiece, and StaticPiece, which inherit from the Piece class. Rotation is generally implemented by transforming every coordinate of a piece about the center coordinate of the piece, which is treated as the origin. Instances of SpinnablePiece rotate 90 degrees clockwise. On the other hand, if a player rotates a TogglingPiece, the piece will rotate 90 degrees clockwise but then upon another rotation will rotate 90 degrees counterclockwise. StaticPiece instances do not rotate. Below is the general spin() method of Piece, which uses the boolean clockwise:

```javascript
spin(clockwise) {

  const rotatedCoords = this.rotatedCoords(clockwise);
  if (this.validCoords(rotatedCoords)) {

    this.clearBoard();

    this.coords = [];

    rotatedCoords.forEach((coord) => {
      this.board.grid[coord[0]][coord[1]] = this;
      this.coords.push(coord);
    }, this);

  }
}
```
###Use of Asynchronous Callbacks###

I used asynchronous callbacks to implement the main functionality of the game. When the page content is loaded, `animate()` is called, which invokes `requestAnimationFrame()` and `animate()` itself. I thus implemented recursively a continuous repainting. I also implemented through `setInterval()` a continuous update of the state of the game: the board will spawn a piece if there is no piece currently following, and otherwise will move the falling piece down. Below is the board's `update()` method:

```javascript
update() {
  this.dropped = false;
  const topPiece = this.fallingPiece.aboveTop();
  if (!this.fallingPiece.fallen()) { this.fallingPiece.moveDown(); }

  if (topPiece) { this.updatePreview(); }

  if (this.fallingPiece.fallen() && !this.over()) {
    this.piecesFallen += 1;
    this.clearRows();
    this.spawnPiece();
  }
}
```

The frequency in which update() is called decreases as the level progresses, leading to faster tile falls.

###Preview of the Upcoming Piece###
At the start of the game, the board creates a current piece and a future piece. As the game progresses, whenever a piece has fallen, the future piece becomes the current piece and the board instantiates a new future piece to display. I used HTML5 Canvas to display the upcoming piece in the sidebar.
