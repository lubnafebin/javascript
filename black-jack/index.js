let firstCard = 20
let secondCard = 1
let sum = firstCard+secondCard
let hashBlackJack = false
let isAlive = true
let message = ""

function startGame() {
  if (sum <= 20) {
    message = "do you want to draw a new card?";
  } else if (sum === 21) {
    message = "woo You got a BlackJack";
  } else {
    message = "You are out of game";
  }
  console.log(message);
}
