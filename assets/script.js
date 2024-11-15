"use strict";
const $ = document;

const dice = $.querySelector(".btn--roll");
const hold = $.querySelector(".btn--hold");
const player0 = $.querySelector(".player--0");
const player1 = $.querySelector(".player--1");
const currentPlayer0 = $.querySelector("#current--0");
const currentPlayer1 = $.querySelector("#current--1");
const scorePlayer0 = $.querySelector("#score--0");
const scorePlayer1 = $.querySelector("#score--1");
const srcImage = $.querySelector(".dice");
const namePlayer0 = $.querySelector("#name--0");
const namePlayer1 = $.querySelector("#name--1");
const newGame = $.querySelector(".btn--new");

// add audio to our game
const successAudio = new Audio("assets/audio/success.wav");

const imgArr = ["dice-1", "dice-2", "dice-3", "dice-4", "dice-5", "dice-6"];

var sumOrg0;
var sumOrg1;
var randNumberLast;
var randNumberLast2;
let flag = 0;
let sum = 0,
  sum2 = 0;

const rollDice = function () {
  const randNumber = Math.floor(Math.random() * 6) + 1;
  srcImage.setAttribute("src", `assets/img/${imgArr[randNumber - 1]}.png`);

  if (randNumber !== 1) {
    if (flag === 0) {
      sum += randNumber;
      randNumberLast = randNumber;
      currentPlayer0.textContent = sum;
    } else {
      sum2 += randNumber;
      randNumberLast2 = randNumber;
      currentPlayer1.textContent = sum2;
    }
  } else {
    flag === 0 ? (sum = 0) : (sum2 = 0);
    currentPlayer0.textContent = 0;
    currentPlayer1.textContent = 0;
    switchPlayer();
  }
};

const holdScore = function () {
  if (flag === 0) {
    sumOrg0 = Number(scorePlayer0.textContent) + sum;
    scorePlayer0.textContent = sumOrg0;
    sum = 0;
    currentPlayer0.textContent = 0;
  } else {
    sumOrg1 = Number(scorePlayer1.textContent) + sum2;
    scorePlayer1.textContent = sumOrg1;
    sum2 = 0;
    currentPlayer1.textContent = 0;
  }
  checkWinner();
  switchPlayer();
};

const switchPlayer = function () {
  flag = flag === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

const checkWinner = function () {
  if (Number(scorePlayer0.textContent) >= 20) {
    player1.classList.add("player--active");
    player0.classList.add("player--winner");
    namePlayer0.classList.add("name");
    srcImage.classList.add("hidden");
    currentPlayer0.textContent = randNumberLast;
    // setTimeout(resetGame, 3000);
    dice.setAttribute("disabled", true);
    hold.setAttribute("disabled", true);
    startConfetti();
    successAudio.play();
  } else if (Number(scorePlayer1.textContent) >= 20) {
    player0.classList.add("player--active");
    player1.classList.add("player--winner");
    namePlayer1.classList.add("name");
    srcImage.classList.add("hidden");
    currentPlayer1.textContent = randNumberLast2;
    // setTimeout(resetGame, 3000);
    dice.setAttribute("disabled", true);
    hold.setAttribute("disabled", true);
    startConfetti();
    successAudio.play();
  }
};

const resetGame = function () {
  srcImage.classList.remove("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  currentPlayer0.textContent = 0;
  currentPlayer1.textContent = 0;
  srcImage.classList.add("hidden");
  sum = 0;
  sum2 = 0;
  sumOrg0 = 0;
  sumOrg1 = 0;
  flag = 0;
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};

const newGameFunc = function () {
  resetGame();
  srcImage.classList.remove("hidden");
  dice.removeAttribute("disabled");
  hold.removeAttribute("disabled");
};

const startConfetti = function () {
  const colors = [
    "#bb0000",
    "#ffffff",
    "#B86E95",
    "#FFE400",
    "#FFBD00",
    "#E89400",
    "#FFCA6C",
    "#FDFFB8",
  ];

  const end = Date.now() + 25 * 100;

  (function frame() {
    flag == 0
      ? confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        })
      : confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

dice.addEventListener("click", rollDice);
hold.addEventListener("click", holdScore);
newGame.addEventListener("click", newGameFunc);
