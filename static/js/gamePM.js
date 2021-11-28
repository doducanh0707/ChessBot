function onDragStartPvm(source, piece, position, orientation) {
  if (game.game_over()) return false;

  if (
    (game.turn() === "w" && piece.search(/^b/) !== -1) ||
    (game.turn() === "b" && piece.search(/^w/) !== -1)
  ) {
    return false;
  }

  if (piece.search(`^${user == "b" ? "w" : "b"}`) !== -1) return false;
}

function requestMove() {
  var possibleMoves = game.moves();

  if (possibleMoves.length === 0) return;

  var randomIdx = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIdx]);
  boardPvm.position(game.fen());
}

function makeRandomMove() {
  var possibleMoves = game.moves();

  // game over
  if (possibleMoves.length === 0) return;

  var randomIdx = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIdx]);
  boardPvm.position(game.fen());
}

function onDropPvm(source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: "q",
  });

  // illegal move
  if (move === null) return "snapback";

  // make random legal move for black
  window.setTimeout(makeRandomMove, 250);

  updateStatus();
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEndPvm() {
  boardPvm.position(game.fen());
  updateStatus();
}

function updateStatus() {
  var status = "";

  var moveColor = "White";
  if (game.turn() === "b") {
    moveColor = "Black";
  }

  // checkmate?
  if (game.in_checkmate()) {
    status = "Game over, " + moveColor + " is in checkmate.";
  }

  // draw?
  else if (game.in_draw()) {
    status = "Game over, drawn position";
  }

  // game still on
  else {
    status = moveColor + " to move";

    // check?
    if (game.in_check()) {
      status += ", " + moveColor + " is in check";
    }
  }

  $status.html(status);
  $fen.html(game.fen());
  $pgn.html(game.pgn());
}

var configPvm = {
  draggable: true,
  position: "start",
  pieceTheme: "/static/img/chesspieces/{piece}.png",
  onDragStart: onDragStartPvm,
  onDrop: onDropPvm,
  onSnapEnd: onSnapEndPvm,
};
