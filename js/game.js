import Level from "./Level.js";

window.onscroll = function() {
  console.log(this.scrollTop);
};

console.log(window.scrollTop);

// Declaration of my global variables
var currentLevelNumber = -1;
var currentLevel = null;

const btnStart = document.getElementById("start_game");
const boxGameOver = document.getElementById("game-over");
const boardGame = document.getElementById("game_board");
var blocImgRandom = document.getElementsByClassName("bloc-img");
var randomSelect = document.getElementById("random-img-select");
var level = document.getElementsByClassName("level");
const sectionBoxes = document.getElementById("section-boxes");
const playerLifes = document.getElementById("player-lifes");
const numberToFind = document.querySelector("#numberToFind");
var chosenAnimal;

function hideStartButton() {
  btnStart.classList.toggle("is-hidden");
}

function randomBloc(val) {
  const previous = document.querySelector(".bloc-img.is-active");
  const blocImgRand = val[Math.floor(Math.random() * val.length)];
  const disAttr = blocImgRand.querySelector("img").getAttribute("alt");
  if (previous) previous.classList.remove("is-active");
  blocImgRand.classList.add("is-active");
  // displayAttribute(disAttr);
  return blocImgRand.querySelector("img").alt.toLowerCase();
}

// function displayAttribute(attr) {
//   randomSelect.innerHTML = `You must find the <b class="color-purple">${attr}</b> in the box.`;
// }

function gameOver() {
  currentLevelNumber = -1;
  hideStartButton();
  boardGame.classList.add("is-hidden");
  boxGameOver.classList.remove("is-hidden");
}

function openBox(evt) {
  const img = evt.target || evt.srcElement;
  const target = img.getAttribute("data-box-content");
  img.src = `./img/box-${target}.png`;

  if (target === chosenAnimal && target !== null) {
    currentLevel.found++;
    if (currentLevel.isFinished()) {
      chosenAnimal = randomBloc(blocImgRandom);
      setTimeout(function() {
        setNextLevel(chosenAnimal);
      }, 1500);
    }
  } else {
    currentLevel.loseLife();
    img.classList.add("none");
    if (currentLevel.lives >= 1)
      playerLifes.removeChild(playerLifes.children[0]);
    else gameOver();
  }
  img.classList.add("opened");
}

function listenBoxClicks(boxes) {
  boxes.forEach(box => {
    box.onclick = openBox;
  });
}

function $(sCSS) {
  const tmp = document.querySelectorAll(sCSS);
  return tmp.length === 1 ? tmp[0] : tmp;
}

function setNextLevel(animal, isRestart) {
  currentLevelNumber++;
  currentLevel = new Level(currentLevelNumber, animal);
  if (currentLevelNumber > 0 || currentLevel < 5) {
    const activeLevelItem = $(".level.is-active");
    const nextActiveLevel = activeLevelItem.nextElementSibling;
    activeLevelItem.classList.remove("is-active");
    nextActiveLevel.classList.add("is-active");
  }
  currentLevel.drawBoxes();
  //console.log("Current-level", currentLevel.levelName);
  const boxes = document.querySelectorAll(".box");
  listenBoxClicks(boxes);
  playerLifes.innerHTML = currentLevel.drawLives();
  numberToFind.innerHTML = currentLevel.petsToFind();
  //
}

function startGame() {
  chosenAnimal = randomBloc(blocImgRandom);
  setNextLevel(chosenAnimal);
  hideStartButton();
  const firstLevelItem = document.querySelector(".level:first-of-type");
  const previousActiveLevel = document.querySelector(".level.is-active");
  if (previousActiveLevel) previousActiveLevel.classList.remove("is-active");
  firstLevelItem.classList.add("is-active");
  boxGameOver.classList.add("is-hidden");
  boardGame.classList.remove("is-hidden");
}

btnStart.onclick = startGame;
