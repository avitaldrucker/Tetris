import Piece from './piece';

class Board {

  constructor() {
    this.level = 0;

    this.spawnPiece();

    this.grid = this.newGrid();
    this.rowsCleared = 0;
    this.piecesFallen = 0;

    this.switchView = false;
  }

  newGrid() {
    const grid = [];
    for (let i = 0; i < 20; i++) { grid[i] = this.emptyRow(); }

    return grid;
  }

  emptyRow() {
    const row = [];
    for (let j = 0; j < 10; j++) { row.push(null); }

    return row;
  }

  spin() {
    if (this.fallingPiece && !this.fallingPiece.aboveTop()) {
      this.fallingPiece.spin();
    }
  }

  arrayEqual(arr1, arr2) {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
  }

  draw() {
    const root = document.getElementById("root");

    if (!root) { return; }

    const divToRemove = document.getElementById("board");
    if (divToRemove) { root.removeChild(divToRemove); }

    root.appendChild(this.drawGrid());
  }

  drawGrid() {
    const div = document.createElement("div");
    div.id = "board";

    for (let row = 0; row < this.grid.length; row++) {
      div.appendChild(this.drawRow(row));
    }

    return div;
  }

  drawRow(rowIdx) {
    const ul = document.createElement("ul");

    for (let col = 0; col < this.grid[0].length; col++) {
      let li = document.createElement("li");
      let tile = this.grid[rowIdx][col];

      if (tile) { li.className = tile.symbol; }

      ul.appendChild(li);
    }

    return ul;
  }

  spawnPiece() {
    if (this.fallingPiece) {
      this.fallingPiece = this.nextPiece;
    } else {
      this.fallingPiece = Piece.randomPiece();
      this.fallingPiece.board = this;
    }

    this.nextPiece = Piece.randomPiece();
    this.nextPiece.board = this;
  }

  moveLeft() {
    if (this.fallingPiece && !this.fallingPiece.aboveTop()) {
      this.fallingPiece.moveLeft();
    }
  }

  moveRight() {
    if (this.fallingPiece && !this.fallingPiece.aboveTop()) {
      this.fallingPiece.moveRight();
    }
  }

  updatePreview() {
    if (!this.over()) {
      const sidebar = document.getElementById("sidebar");

      let previewHeader = document.getElementById("preview-header");
      if (previewHeader) { sidebar.removeChild(previewHeader); }

      sidebar.appendChild(this.createPreviewHeader());
    }
  }

  createPreviewHeader() {
    const previewHeader = document.createElement("H1");
    previewHeader.id = "preview-header";
    let previewText = document.createTextNode(this.nextPiece.symbol);
    previewHeader.appendChild(previewText);

    return previewHeader;
  }

  drop() {
    if (this.fallingPiece.validCoords(this.fallingPiece.coords)) {
      this.fallingPiece.drop();
    }
  }

  update() {
    const topPiece = this.fallingPiece.aboveTop();
    if (!this.fallingPiece.fallen()) { this.fallingPiece.moveDown(); }

    if (topPiece) { this.updatePreview(); }

    if (this.fallingPiece.fallen() && !this.over()) {
      this.piecesFallen += 1;
      this.clearRows();
      this.spawnPiece();
    }
  }

  gridAt(pos) {
   let [row, col] = pos;
   return this.grid[row][col];
  }

  over() {
    return this.fallingPiece
      && this.fallingPiece.aboveTop()
      && this.fallingPiece.fallen();
  }

  clearRows() {
    const newGrid = this.nonFullRows();

    while (newGrid.length < 20) {
      this.rowsCleared += 1;
      newGrid.unshift(this.emptyRow());
    }

    this.grid = newGrid;
  }

  nonFullRows() {
    const newGrid = [];

    this.grid.forEach((row) => {
      if (!this.full(row)) { newGrid.push(row); }
    });

    return newGrid;
  }

  full(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i]) { return false; }
    }

    return true;
  }
}

module.exports = Board;
