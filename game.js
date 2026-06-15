alert(
  'Welcome! Press "S" to start ("R" to restart). On mobile? Just tap "Press S to start" to begin. Enjoy! - Chidera',
);
let playerName = prompt("What is your name?");
if (playerName === null || playerName === "") {
} else {
  playerName = playerName.slice(0, 10);
  let selectorAll = document.querySelectorAll.bind(document);
  selectorAll("label[for ='Player Pick']")[0].textContent =
    playerName + "'s Pick";
  selectorAll("label[for = 'Player Count']")[0].textContent =
    playerName + "'s Count";
}
document.addEventListener("keydown", function (event) {
  if (event.key.toUpperCase() === "R") {
    window.location.reload();
  }
});
let gameButtons = ["Rock", "Paper", "Scissors"];
let generatedValues;
let clickedValues;
let selector = document.querySelector.bind(document);
let round = 1;
let started = false;
let winValue = 1;
let loseValue = 1;
function beginning() {
  started = true;
  selector("p").textContent = "Rock";
  gameSound("Rock");
  setTimeout(() => {
    selector("p").textContent = "Paper";
    gameSound("Paper");
  }, 700);
  setTimeout(() => {
    selector("p").textContent = "Scissors";
    gameSound("Scissors");
  }, 1400);
  setTimeout(() => {
    selector("p").textContent = "GO!";
    gameSound("Go");
  }, 2100);
  setTimeout(() => {
    let audio = new Audio("./audio/Background music.mp3");
    audio.play();
    audio.loop = true;
    audio.volume = 0.1;
  }, 2400);
}
selector("p").addEventListener("click", function () {
  if (!started) {
    beginning();
    setTimeout(() => {
      computerSequence();
      for (let i = 0; i < gameButtons.length; i++) {
        document
          .querySelectorAll("button.container")
          [i].addEventListener("click", function () {
            let clickedButton = this.innerHTML;
            clickedValues = clickedButton;
            checkAnswer();
          });
      }
    }, 3000);
  }
});
document.addEventListener("keydown", function (event) {
  if (!started && (event.key === "S" || event.key === "s")) {
    beginning();
    setTimeout(() => {
      computerSequence();
      for (let i = 0; i < gameButtons.length; i++) {
        document
          .querySelectorAll("button.container")
          [i].addEventListener("click", function () {
            let clickedButton = this.innerHTML;
            clickedValues = clickedButton;
            checkAnswer();
          });
      }
    }, 3000);
  }
});
function computerSequence() {
  selector("p").textContent = "Round " + round;
  selector("p").style.color = "#ff9f1c";
  round++;
  let randomNumber = Math.floor(Math.random() * 3);
  generatedValues = gameButtons[randomNumber];
}
function checkAnswer() {
  if (generatedValues && clickedValues) {
    if (generatedValues === clickedValues) {
      selector("p").textContent = "Draw";
      selector("p").style.color = "#808080";
      let audio = new Audio("./audio/Draw.mp3");
      audio.play();
      let start = "Draw";
    } else if (
      (clickedValues === "Rock" && generatedValues === "Scissors") ||
      (clickedValues === "Paper" && generatedValues === "Rock") ||
      (clickedValues === "Scissors" && generatedValues === "Paper")
    ) {
      selector("p").textContent = "You Win 🚩";
      selector("#human-count").value = winValue;
      winValue++;
      let audio = new Audio("./audio/Win.mp3");
      audio.play();
      let start = "Win";
      gameSound(start);
    } else {
      selector("p").textContent = "You Lose ❌";
      selector("#robot-count").value = loseValue;
      loseValue++;
      let start = "Lose";
      gameSound(start);
    }
    selector("#robot-pick").value = generatedValues;
    selector("#player-pick").value = clickedValues;
    generatedValues = undefined;
    clickedValues = undefined;
    setTimeout(() => {
      computerSequence();
      selector("#robot-pick").value = "";
      selector("#player-pick").value = "";
    }, 2000);
  }
}
function gameSound(start) {
  let audio = new Audio("./audio/" + start + ".mp3");
  audio.play();
  audio.volume = 0.7;
}
