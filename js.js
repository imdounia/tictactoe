// DOM elements
const cases = [...document.getElementsByClassName("case")];
let player = document.getElementById("player");
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let scoreNul = document.getElementById("scoreNul");

// states of game
let state = {
  playerongoing: 1,
  scoreJ1: 0,
  scoreJ2: 0,
  matchNul: 0,
  c1: 0,
  c2: 0,
  c3: 0,
  c4: 0,
  c5: 0,
  c6: 0,
  c7: 0,
  c8: 0,
  c9: 0,
};

const resetState = () => {
  playerongoing = 1;
  state.c1 = 0;
  state.c2 = 0;
  state.c3 = 0;
  state.c4 = 0;
  state.c5 = 0;
  state.c6 = 0;
  state.c7 = 0;
  state.c8 = 0;
  state.c9 = 0;
};


function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            location.reload();
        }
    }, 1000);
}

window.onload = function () {
    var threeMinutes = 60 * 1,
        display = document.querySelector('#time');
    startTimer(threeMinutes, display);
};

const victory = () => {
  if (
    (state.c1 == state.c2 && state.c2 == state.c3 && state.c1 > 0) ||
    (state.c1 == state.c4 && state.c4 == state.c7 && state.c1 > 0) ||
    (state.c1 == state.c5 && state.c5 == state.c9 && state.c1 > 0) ||
    (state.c3 == state.c5 && state.c5 == state.c7 && state.c7 > 0) ||
    (state.c2 == state.c5 && state.c5 == state.c8 && state.c2 > 0) ||
    (state.c3 == state.c6 && state.c6 == state.c9 && state.c3 > 0) ||
    (state.c4 == state.c5 && state.c5 == state.c6 && state.c4 > 0) ||
    (state.c7 == state.c8 && state.c8 == state.c9 && state.c7 > 0)
  ) {
    console.log("winner !");
    return true;
  } else if (
    state.c1 !== 0 &&
    state.c2 !== 0 &&
    state.c3 !== 0 &&
    state.c4 !== 0 &&
    state.c5 !== 0 &&
    state.c6 !== 0 &&
    state.c7 !== 0 &&
    state.c8 !== 0 &&
    state.c9 !== 0
  ) {
    return null;
  } else {
    return false;
  }
};

const playCase = (e) => {
  let idCase = e.target.id;

  // if the case is already full we don't return anything
  if (state[idCase] !== 0) return;

  state[idCase] = state.playerongoing;

  let isVictory = victory();
  if (isVictory === true) {
    // if victory

    alert("The winner is " + state.playerongoing);

    if (state.playerongoing == 1) {
      state.scoreJ1++;
      score1.textContent = state.scoreJ1;
    } else {
      state.scoreJ2++;
      score2.textContent = state.scoreJ2;
    }

    resetState();
    cases.forEach((c) => (c.textContent = ""));
  } else if (isVictory === null) {
    // if nul

    alert("Match nul !");

    state.matchNul++;
    scoreNul.textContent = state.matchNul;
    player.textContent = "1";

    resetState();
    cases.forEach((c) => (c.textContent = ""));
  } else if (isVictory === false) {
    // else continue the game
    if (state.playerongoing == 1) {
      state.playerongoing = 2;
      e.target.textContent = "X";
      player.textContent = "2";
    } else {
      state.playerongoing = 1;
      e.target.textContent = "O";
      player.textContent = "1";
    }
  }
};

cases.forEach((el) => {
  el.addEventListener("click", playCase);
});