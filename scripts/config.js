function openPlayerConfig(event) {
  const selectedPlayerId = +event.target.dataset.playerid; //+'1' => 1
  editedPlayer = selectedPlayerId;
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig(event) {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("playername").trim();

  if (!enteredPlayerName) {
    event.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = "Please enter a valid name!";
    return;
  }

  const updatedPlayerDataElement = document.getElementById(
    `player-${editedPlayer}-data`
  );

  updatedPlayerDataElement.children[1].textContent = enteredPlayerName;

  players[editedPlayer - 1].name = enteredPlayerName;
  // if(editedPlayer === 1) {
  //   players[0].name = enteredPlayerName;
  // } else {
  //   players[1].name = enteredPlayerName;
  // }
  closePlayerConfig();
}
