const cells = document.querySelectorAll(".cell");
const titleHeader = document.querySelector(".player-select");
const xPlayer = document.querySelector("#chooseX");
const oPlayer = document.querySelector("#chooseO");

let player = "X";
let isPauseGame = false;
let isGameStart = false;

const inputCells = ["", "", "", "", "", "", "", "", ""];
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => tapCell(cell, index));
});
function tapCell(cell, index) {}
