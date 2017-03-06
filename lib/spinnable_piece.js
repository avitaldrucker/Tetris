class SpinnablePiece extends Piece {
  constructor(options) {
    super(options);
    this.center = options.center;
  }

  spin() {
    Piece.prototype.spin.call(this, true);
  }

}

module.exports = SpinnablePiece;
