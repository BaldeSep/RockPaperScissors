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

function game(maxRounds = 5) {
  let round = 1;

  let playerSelection;
  let computerSelection;

  let playerWins = 0;
  let computerWins = 0;

  for (let i = round; i <= maxRounds; i++) {
    playerSelection = prompt(`Round: ${i} || Enter Rock, Paper, or Scissors`);

    while (
      !playerSelection ||
      (!isPaper(playerSelection) &&
        !isRock(playerSelection) &&
        !isScissors(playerSelection))
    ) {
      playerSelection = prompt(
        "Enter valid play!!! Enter Rock, Paper, or Scissors"
      );
    }
    computerSelection = computerPlay();

    roundResult = playRound(playerSelection, computerSelection);
    alert(roundResult.text);
    if (roundResult.result < 0) {
      computerWins++; // player looses
    } else if (roundResult.result > 0) {
      playerWins++; // computer looses
    }
  }

  if (playerWins > computerWins) {
    alert(`You Win!!! Player: ${playerWins} Computer: ${computerWins}`);
  } else if (playerWins < computerWins) {
    alert(`You Loose!!! Player: ${playerWins} Computer: ${computerWins}`);
  } else {
    alert(`Draw!!! Player: ${playerWins} Computer: ${computerWins}`);
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
        text: `You Lose! ${computerSelection} beats ${playerSelection} `,
        result
      };
    } else if (result === 0) {
      return { text: `No Winner! Draw`, result };
    } else {
      return {
        text: `You Win! ${playerSelection} beats ${computerSelection}`,
        result
      };
    }
  }
}

game();
