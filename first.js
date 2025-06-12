let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let cntClicks = 0;
let win = 0; // to check if we got winner or not

let winpattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // Player O turn
      box.innerText = "O";
      turnO = false;
    } else {
      // Player X turn
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();

    cntClicks++;
    if (cntClicks === 9 && win === 0) {
      // console.log("Draw");
      drawGame();
      cntClicks = 0;
    }
  });
});

const checkWinner = () => {
  for (let pattern of winpattern) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // console.log("Winner is ", pos1Val);   // Either O or X is winner
        showWinner(pos1Val);
        win = 1;
      }
    }
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is Player ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const resetGame = () => {
  turnO = true;
  cntClicks = 0;
  win = 0;
  msgContainer.classList.add("hide");
  enableBoxes();
};

const drawGame = () => {
  msg.innerText = "Game Draw, Play Again";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
