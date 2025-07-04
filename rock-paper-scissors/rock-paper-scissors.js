let score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  lose: 0,
  tie: 0,
};

updateScoreElement();

function pickComputerMove() {
  randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie..";
    } else if (computerMove === "paper") {
      result = "You lose..";
    } else if (computerMove === "scissors") {
      result = "You win..";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win..";
    } else if (computerMove === "paper") {
      result = "Tie..";
    } else if (computerMove === "scissors") {
      result = "You lose..";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose..";
    } else if (computerMove === "paper") {
      result = "You win..";
    } else if (computerMove === "scissors") {
      result = "Tie..";
    }
  }

  if (result === "You win..") {
    score.win++;
  } else if (result === "You lose..") {
    score.lose++;
  } else if (result === "Tie..") {
    score.tie++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-moves").innerHTML = `You
      <img src="/images/${playerMove}-emoji.png" alt="rock" />
      <img src="/images/${computerMove}-emoji.png" alt="paper" />
      computer`;
}
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.win}, Loses: ${score.lose}, Ties: ${score.tie}`;
}

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});
