function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'You won, <span id="winner-name">PLAYER NAME</span>!';
  gameOverElement.style.display = "none";
  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

// Starts the game only if the 2 players set their names. By checking the name values from the object inside the players array which is defined in app.js.
function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  const selectedField = event.target;
  // the guard below is checking if the element we click is list item if not it returns. If its not here when we click between the fields it will delete all of the LI's.
  if (event.target.tagName !== "LI" || gameOver) {
    return;
  }

  const selectedColumn = +selectedField.dataset.col - 1;
  const selectedRow = +selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert("Please select empty field");
    return;
  }
  selectedField.textContent = players[activePlayer].symbol; // player[0]
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  console.log(gameData);

  const winnerId = checkForGameOver();

  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

// function checkForGameOver() {
// ---   Stinky Stinky
//    if(gameData[0][0] === 1 && gameData[0][1] === 1 && gameData[0][2] === 1 ) {
//     return 1;
//   }
//    if(gameData[0][0] === 2 && gameData[0][1] === 2 && gameData[0][2] === 2 ) {
//     return 2;
//   }
// }

// Stinky Stinky 2
// function checkForGameOver() {
//   if (
//     gameData[0][0] > 0 &&
//     gameData[0][0] === gameData[0][1] &&
//     gameData[0][1] === gameData[0][2]
//   ) {
//     return gameData[0][0];
//   }

//   if (
//     gameData[1][0] > 0 &&
//     gameData[1][0] === gameData[1][1] &&
//     gameData[1][1] === gameData[1][2]
//   ) {
//     return gameData[1][0];
//   }

//   if (
//     gameData[2][0] > 0 &&
//     gameData[2][0] === gameData[2][1] &&
//     gameData[2][1] === gameData[2][2]
//   ) {
//     return gameData[2][0];
//   }
// }

function checkForGameOver() {
  // Checking the rows for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  // Checking the columns for equality
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  // Diagonal: Top left to bottom right

  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }
  // Diagonal: Bottom left to top right
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function endGame(winnerId) {
  gameOver = true;
  gameOverElement.style.display = "block";
  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "It's a draw!";
  }
}
