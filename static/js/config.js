var boardPvp = null;
var boardPvm = null;
var game = new Chess();
var $status = $("#status");
var $fen = $("#fen");
var $pgn = $("#pgn");
var user = null;

const pvpBtn = document.querySelector(".pvp");
const pvmBtn = document.querySelector(".pvm");
const myboardPvp = document.querySelector("#myBoardPvp");
const myboardPvm = document.querySelector("#myBoardPvm");
const boardCtn = document.querySelector(".boardContainer");

pvpBtn.addEventListener("click", () => {
  myboardPvm.style.display = "none";
  myboardPvp.style.display = "block";
  boardPvp?.start();
  game.reset();
  if (!boardPvp) boardPvp = Chessboard("myBoardPvp", configPvp);
  updateStatus();
});

pvmBtn.addEventListener("click", () => {
  myboardPvm.style.display = "block";
  myboardPvp.style.display = "none";
  boardPvm?.start();
  game.reset();
  user = Math.floor(Math.random() * 2) ? "b" : "w";
  console.log(user);
  if (!boardPvm) boardPvm = Chessboard("myBoardPvm", configPvm);
  boardPvm.orientation(user == "b" ? "black" : "white");
  updateStatus();
});
