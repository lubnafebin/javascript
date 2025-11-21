let firstCard = 10;
let secondCard = 4;
let cards = [firstCard, secondCard];
let sum = firstCard + secondCard;
let hashBlackJack = false;
let isAlive = true;
let message = "";

let messageEl = document.getElementById("message");
let sumEl = document.getElementById("sum");
let cardEl = document.getElementById("card");

function startGame() {
  cardEl.textContent = "card :";

  for (let i = 0; i < cards.length; i++) {
    cardEl.textContent += cards[i] + " ";
  }

  sumEl.textContent = "Sum :" + sum;
  if (sum <= 20) {
    message = "do you want to draw a new card?";
  } else if (sum === 21) {
    message = "woo You got a BlackJack";
    hashBlackJack = true;
  } else {
    message = "You are out of game";
    isAlive = false;
  }
  messageEl.textContent = message;
}

function newCard() {
  
}
