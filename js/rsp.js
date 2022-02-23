const $computer = document.querySelector("#computer");
const $score = document.querySelector("#score");
const $rock = document.querySelector("#rock");
const $scissors = document.querySelector("#scissors");
const $paper = document.querySelector("#paper");
const IMG_URL = "./rsp.png";
$computer.style.background = `url(${IMG_URL}) 0 0`;
$computer.style.backgroundSize = "auto 200px";

const rspX = {
  scissors: "0",
  rock: "-220px",
  paper: "-440px",
};
let computerChoice = "scissors";
const changeComputerHand = () => {
  if (computerChoice === "scissors") {
    computerChoice = "rock";
  } else if (computerChoice === "rock") {
    computerChoice = "paper";
  } else if (computerChoice === "paper") {
    computerChoice = "scissors";
  }
  $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
  $computer.style.backgroundSize = "auto 200px";
};

let intervalId = setInterval(changeComputerHand, 50);

const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
};
let clickable = true;
let myWinCnt = 0;
let comWinCnt = 0;
const clickButton = () => {
  if (clickable) {
    clearInterval(intervalId);
    clickable = false;
    //점수 계산 및 화면 효시
    const myChoice =
      event.target.textContent === "바위"
        ? "rock"
        : event.target.textContent === "가위"
        ? "scissors"
        : "paper";
    const myScore = scoreTable[myChoice];
    const computerScore = scoreTable[computerChoice];
    const diff = myScore - computerScore;
    if (diff === 2 || diff === -1) {
      console.log("승리");
      myWinCnt++;
    } else if (diff === -2 || diff === 1) {
      console.log("패배");
      comWinCnt++;
    } else {
      console.log("무승부");
    }
    const whoWin = document.querySelector("#whoWin");
    if (myWinCnt === 2) {
      whoWin.textContent = "나의 승리";
      return;
    }
    if (comWinCnt === 2) {
      whoWin.textContent = "나의 패배";
      return;
    }
    setTimeout(() => {
      clickable = true;
      intervalId = setInterval(changeComputerHand, 50);
    }, 1000);
  }
};
$rock.addEventListener("click", clickButton);
$scissors.addEventListener("click", clickButton);
$paper.addEventListener("click", clickButton);
