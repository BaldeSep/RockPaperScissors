const MAX_ROUNDS = 5;
let currentRound = 1;

let playerScore = 0;
let computerScore = 0;

const roundCountElement = document.getElementById("round-count");
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");

roundCountElement.innerText = currentRound;
playerScoreElement.innerText = playerScore;
computerScoreElement.innerText = computerScore;

const roundOutputElement = document.getElementById("round-output");
const roundDrawElement = document.getElementById("draw");
const gameResultElement = document.getElementById("game-results");

document.querySelectorAll(".player-selection").forEach(selection => {
  selection.addEventListener("click", game);
});

function game(e) {
  if (currentRound > MAX_ROUNDS) {
    return;
  }
  const playerSelection = this.dataset.play;
  const computerSelection = computerPlay();
  const roundResult = playRound(playerSelection, computerSelection);

  if (roundResult.winLoseState === "Win") {
    updatePlayerScore();
  } else if (roundResult.winLoseState === "Lose") {
    updateComputerScore();
  }

  updateRound();

  if (currentRound > MAX_ROUNDS) {
    roundCountElement.innerText = "Game Over";
    if (playerScore > computerScore) {
      document.getElementById("game-win-lose").innerText = "Win";
      gameResultElement.children[0].classList.add("success");
      gameResultElement.style.display = gameResultElement.dataset.display;
    } else if (playerScore < computerScore) {
      document.getElementById("game-win-lose").innerText = "Lose";
      gameResultElement.children[0].classList.add("failure");
      gameResultElement.style.display = gameResultElement.dataset.display;
    } else {
      document.getElementById("game-win-lose").innerText = "Got A Draw";
      gameResultElement.children[0].classList.add("success");
      gameResultElement.style.backgroundColor = "gold";
      gameResultElement.style.display = gameResultElement.dataset.display;
    }
    return;
  }

  displayRoundResult(roundResult);
}

function updatePlayerScore(increment = 1) {
  playerScore += increment;
  playerScoreElement.innerText = playerScore;
}

function updateComputerScore(increment = 1) {
  computerScore += increment;
  computerScoreElement.innerText = computerScore;
}

function updateRound(increment = 1) {
  currentRound += increment;
  roundCountElement.innerText = currentRound;
}

function displayRoundResult(result) {
  const winLoseState = result.winLoseState;
  let winningPlay;
  let losingPlay;
  if (winLoseState === "Win") {
    winningPlay = result.roundWinningPlay;
    losingPlay = result.roundLosingPlay;
    roundOutputElement.children[0].classList.add("success");
    document.getElementById("round-win-lose").innerText = winLoseState;
    document.getElementById("round-winner").innerText = winningPlay;
    document.getElementById("round-loser").innerText = losingPlay;
    roundOutputElement.style.display = roundOutputElement.dataset.display;
    setTimeout(() => {
      roundOutputElement.style.display = "none";
    }, 1000);
  } else if (winLoseState === "Lose") {
    winningPlay = result.roundWinningPlay;
    losingPlay = result.roundLosingPlay;
    roundOutputElement.children[0].classList.add("failure");
    document.getElementById("round-win-lose").innerText = winLoseState;
    document.getElementById("round-winner").innerText = winningPlay;
    document.getElementById("round-loser").innerText = losingPlay;
    roundOutputElement.style.display = roundOutputElement.dataset.display;
    setTimeout(() => {
      roundOutputElement.style.display = "none";
    }, 1000);
  } else if (winLoseState === "Draw") {
    roundDrawElement.style.display = roundDrawElement.dataset.display;
    setTimeout(() => {
      roundDrawElement.style.display = "none";
    }, 1000);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function computerPlay() {
  const min = 1;
  const max = 4;
  const randomNum = getRandomInt(min, max);
  switch (randomNum) {
    case 1:
      return "Rock";
      break;
    case 2:
      return "Paper";
      break;
    case 3:
      return "Scissors";
      break;
    default:
      break;
  }
}

function capitalize(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
}

function isRock(play) {
  return Boolean(play.match(/^rock$/i));
}

function isPaper(play) {
  return Boolean(play.match(/^paper$/i));
}

function isScissors(play) {
  return Boolean(play.match(/^scissors$/i));
}

function versusRock(play) {
  if (isRock(play)) {
    return 0; //draw
  } else if (isPaper(play)) {
    return -1; //rock looses to paper
  } else {
    return 1; //rock wins against scissors
  }
}

function versusPaper(play) {
  if (isPaper(play)) {
    return 0; //draw
  } else if (isScissors(play)) {
    return -1; //paper looses to scissors
  } else {
    return 1; //paper wins against rock
  }
}

function versusScissors(play) {
  if (isScissors(play)) {
    return 0; //draw
  } else if (isRock(play)) {
    return -1; //scissors looses to rock
  } else {
    return 1; //scissors wins agains paper
  }
}

function playRound(playerSelection, computerSelection) {
  let result;
  if (isRock(playerSelection)) {
    result = versusRock(computerSelection);
  } else if (isPaper(playerSelection)) {
    result = versusPaper(computerSelection);
  } else if (isScissors(playerSelection)) {
    result = versusScissors(computerSelection);
  } else {
    return "invalid input";
  }
  return getRoundResult(result, playerSelection, computerSelection);
}

function getRoundResult(result, playerSelection, computerSelection) {
  playerSelection = capitalize(playerSelection);
  if (result < 0) {
    return {
      roundWinningPlay: computerSelection,
      roundLosingPlay: playerSelection,
      winLoseState: "Lose"
    };
  } else if (result === 0) {
    return { winLoseState: "Draw" };
  } else {
    return {
      roundWinningPlay: playerSelection,
      roundLosingPlay: computerSelection,
      winLoseState: "Win"
    };
  }
}

// game();
