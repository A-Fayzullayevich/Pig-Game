'use strict';
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

let scores, activePlaayer, playing, currentScore;
const newReset = function () {
  currentScore = 0;
  activePlaayer = 0;
  scores = [0, 0];
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
newReset();

const switching = function () {
  document.getElementById(`current--${activePlaayer}`).textContent = 0;
  currentScore = 0;
  activePlaayer = activePlaayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlaayer}`).textContent =
        currentScore;
    } else {
      switching();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlaayer] += currentScore;
    document.getElementById(`score--${activePlaayer}`).textContent =
      scores[activePlaayer];
    if (scores[activePlaayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlaayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlaayer}`)
        .classList.remove('player--active');
    } else {
      switching();
    }
  }
});

btnNew.addEventListener('click', newReset);
