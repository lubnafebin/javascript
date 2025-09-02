//represents dom elements with class and id
const cells = document.querySelectorAll(".cell");
const titleHeader = document.querySelector(".player-select");
const xPlayer = document.querySelector("#chooseX");
const oPlayer = document.querySelector("#chooseO");
const gameStatus = document.getElementById("gameStatus");
const resetBtn = document.querySelector(".reset");
resetBtn.disabled = true;
//initialize requires variables
let player = "O";
let isPauseGame = false;
let isGameStart = false;
let youWins = 0;
let cpuWins = 0;
let draws = 0;
let userPlayer = "X";
let cpuPlayer = "O";
let isPlayerSelected = false;
//represents the current state of the board
const inputCells = ["", "", "", "", "", "", "", "", ""];
/** Array of winning index combinations for a tic-tac-toe board. */
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
//initializing the cells as disabled in start
cells.forEach((cell) => cell.classList.add("disabled"));
//make the cells as clickable
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => tapCell(cell, index));
});
//make the cell functional
function tapCell(cell, index) {
  if (!isPlayerSelected) return;
  if (cell.textContent !== "" || isPauseGame) return;

  if (player === userPlayer) {
    isGameStart = true;
    updateCell(cell, index);
    if (!checkWinner()) {
      changePlayer();
      if (player === cpuPlayer) {
        randomPick();
      }
    }
  }
}
//update cell based on player
function updateCell(cell, index) {
  cell.textContent = player;
  inputCells[index] = player;
  cell.style.color = player == "X" ? "#39ADAD" : "#E1B42F";
}
//change the player in each cell
function changePlayer() {
  player = player == "X" ? "O" : "X";
  gameStatus.textContent = `${player}turn`;
}
//function for computer move.use random movement
function randomPick() {
  isPauseGame = true;
  setTimeout(() => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * inputCells.length);
    } while (inputCells[randomIndex] != "");
    updateCell(cells[randomIndex], randomIndex);

    if (!checkWinner()) {
      changePlayer();
      isPauseGame = false;
    }
  }, 1000);
}
//based on the winning condition check winner
function checkWinner() {
  let winningLines = [];
  for (const [a, b, c] of winConditions) {
    if (
      inputCells[a] == player &&
      inputCells[b] == player &&
      inputCells[c] == player
    ) {
      winningLines.push([a, b, c]);
    }
  }

  if (winningLines.length > 0) {
    declareWinner(player, winningLines);
    return true;
  }

  if (inputCells.every((cell) => cell != "")) {
    declareDraw();
    return true;
  }
}
//declare winner and change background of the winning lines.
function declareWinner(winner, winningLines) {
  isPauseGame = true;

  gameStatus.textContent = `${winner} wins!`;
  winningLines.forEach((line) => {
    line.forEach((index) => {
      cells[index].style.background = "#2A2343";
    });
  });

  if (winner === userPlayer) {
    youWins++;
    document.getElementById("xWins").textContent = youWins;
  } else {
    cpuWins++;
    document.getElementById("oWins").textContent = cpuWins;
  }

  resetBtn.disabled = false;
}
//function for draw
function declareDraw() {
  isPauseGame = true;
  gameStatus.textContent = `draw!`;

  draws++;
  document.getElementById("draws").textContent = draws;

  resetBtn.disabled = false;
}
//choose user player and cpu player
function choosePlayer(selectedPlayer) {
  userPlayer = selectedPlayer;
  cpuPlayer = selectedPlayer == "X" ? "O" : "X";

  if (!isGameStart) {
    player = "X";

    if (userPlayer == "X") {
      xPlayer.classList.add("player-active");
      oPlayer.classList.remove("player-active");
    } else {
      xPlayer.classList.remove("player-active");
      oPlayer.classList.add("player-active");
    }
    isPlayerSelected = true;
    cells.forEach((cell) => cell.classList.remove("disabled"));
    if (userPlayer === "O") {
      randomPick();
    }
  }
}
//reset game
resetBtn.addEventListener("click", () => {
  inputCells.fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.background = "";
  });
  isPauseGame = false;
  isGameStart = false;
});
