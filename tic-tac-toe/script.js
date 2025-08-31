const cells = document.querySelectorAll(".cell");
const titleHeader = document.querySelector(".player-select");
const xPlayer = document.querySelector("#chooseX");
const oPlayer = document.querySelector("#chooseO");
const resetBtn = document.querySelector(".reset");

let player = "O";
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

function tapCell(cell, index) {
  if (cell.textContent == "" && !isPauseGame) {
    isGameStart = true;
    updateCell(cell, index);
    if (!checkWinner()) {
      changePlayer();
      randomPick();
    }
  }
}

function updateCell(cell, index) {
  cell.textContent = player;
  inputCells[index] = player;
  cell.style.color = player == "X" ? "#1892EA" : "#A737FF";
}

function changePlayer() {
  player = player == "X" ? "O" : "X";
}

function randomPick() {
  isPauseGame = true;
  setTimeout(() => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * inputCells.length);
    } while (inputCells[randomIndex] != "");
    updateCell(cells[randomIndex], randomIndex, player);
    if (!checkWinner()) {
      changePlayer();
      isPauseGame = false;
      return;
    }
    player = player == "X" ? "O" : "X";
  }, 1000);
}

function checkWinner() {
  for (const [a, b, c] of winConditions) {
    if (
      inputCells[a] == player &&
      inputCells[b] == player &&
      inputCells[c] == player
    ) {
      declareWinner([a, b, c]);
      return true;
    }
  }
  if (inputCells.every((cell) => cell != "")) {
    declareDraw();
    return true;
  }
}

function declareWinner(winningIndices) {
  isPauseGame = true;
  winningIndices.forEach(
    (index) => (cells[index].style.background = "#2A2343")
  );
}

function declareDraw() {
  isPauseGame = true;
}

function choosePlayer(selectedPlayer) {
  if (!isGameStart) {
    player = selectedPlayer;
    if (player == "X") {
      xPlayer.classList.add("player-active");
      oPlayer.classList.remove("player-active");
    } else {
      xPlayer.classList.remove("player-active");
      oPlayer.classList.add("player-active");
    }
  }
}

resetBtn.addEventListener("click", () => {
  inputCells.fill("");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.background = "";
  });
  isPauseGame = false;
  isGameStart = false;
});
