import Piece from './piece';


export default class TogglingPiece extends Piece {
  constructor(options) {
    super(options);
    this.rotated = false;
    this.center = options.center;
  }

  spin() {
     if (this.rotated && this.symbol !== "O") {
       Piece.prototype.spin.call(this, false);
       this.rotated = false;
     } else if (this.symbol !== "O"){
       Piece.prototype.spin.call(this, true);
       this.rotated = true;
     }
  }
}
