let gameSeq= [];
let userSeq= [];
let highScore = 0;
let startSound = new Audio("simonsays.mp3");

let btns=["yellow","purple","red","green"];

let started = false;
let level =0;

let h2 = document.querySelector("h2");

// to start the game
document.addEventListener("keypress",function(){
  if (started == false){
    console.log("game is started");
    started =true;
    startSound.play();
    setTimeout(levelUp,1250);
  }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    } ,250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    } ,250);
}

// random color flash 
function levelUp(){
  userSeq=[];
  level++;
  h2.innerText = `Level ${level}`;

//   random button choose
  let randIdx = Math.floor(Math.random()*4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq)
  gameFlash(randBtn);
  playBeep(); 
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (level > highScore) {
      highScore = level;
      localStorage.setItem("highScore", highScore);
      document.querySelector("#high-score").innerText = `High Score: ${highScore}`;
    }

    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 250);
    let wrong = new Audio("wrong.wav");
    wrong.play();
    reset();
  }
}
 

function btnPress(){
   let btn = this;
   userFlash(btn);

   userColor = btn.getAttribute("id");
   userSeq.push(userColor);

   checkAns(userSeq.length-1)   ;
}


let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnPress);
}


function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level =0;
}

function playBeep() {
  let audio = new Audio("beep.wav");
  audio.play();
}