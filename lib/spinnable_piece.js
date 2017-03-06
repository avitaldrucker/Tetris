import Piece from './piece';

export default class SpinnablePiece extends Piece {
  constructor(options) {
    console.log(Piece);
    super(options);
    this.center = options.center;
  }

  spin() {
    Piece.prototype.spin.call(this, true);
  }

}

// module.exports = SpinnablePiece;
