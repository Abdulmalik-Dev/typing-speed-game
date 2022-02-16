// Cash
let container = document.querySelector(".container"),
  startEndGame = document.querySelector(".start-end-game"),
  select = document.querySelector("#roleSelect"),
  theRole = document.querySelector("#role"),
  theSeconds = document.querySelector("#seconds"),
  btnStartGame = document.querySelector(".start-end-game .start button"),
  theWord = document.querySelector(".container .theWord"),
  theInput = document.querySelector(".container input"),
  wordsCenter = document.querySelector(".container .words-center"),
  timeLift = document.querySelector(".container .time-lift span"),
  currentScore = document.querySelector(".container .score #currentScore"),
  scores = document.querySelector(".container .score #scores"),
  gameRole = {
    easy: 6,
    normal: 4,
    hard: 3,
  },
  currentRole = select.value,
  //   The Words
  words = [`HTML`, "CSS", "JavaScript", "PHP", "Bootstrap", "ReactJs"];
// Set The Role For The Game
select.addEventListener("change", () => {
  currentRole = select.value;
});
// Start The Game
btnStartGame.addEventListener("click", () => {
  //   Set Game Role
  theRole.innerHTML = Object.keys(gameRole).filter(
    (ele) => ele === currentRole
  );
  //   Set Game Seconds
  theSeconds.innerHTML = gameRole[currentRole];
  //  Set The Time Lift
  timeLift.innerHTML = gameRole[currentRole];
  //   Set The Score
  scores.innerHTML = words.length;
  // Turn Off The Paste
  theInput.onpaste = () => false;

  //   Remove Div For Start And End Game
  startEndGame.classList.remove("show");

  theInput.focus();

  showWords();
  timeLiftCount();
});
// show words Function
function showWords() {
  // Make Random On Words And Appear a Word To Make Test For It
  let random = Math.floor(Math.random() * words.length);
  theWord.innerHTML = words[random];
  //   Remove This Word From Word's box
  words.splice(words.indexOf(theWord.innerHTML), 1);

  getAllWords();
}
// Function To Get All Words On The Words Center
function getAllWords() {
  wordsCenter.innerHTML = "";
  //   Appear All Words
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div"),
      textNode = document.createTextNode(words[i]);
    div.appendChild(textNode);
    wordsCenter.appendChild(div);
  }
}
// Time Lift Function
function timeLiftCount() {
  let count = setInterval(() => {
    //   Check If The Count Arrived To 0
    if (timeLift.innerHTML > 0) timeLift.innerHTML--;
    else {
      clearInterval(count);
      //   Check If The Word Wrote Correct Or No
      if (theInput.value !== theWord.innerHTML) finishGame();
      else {
        //   Encriment The Score level
        currentScore.innerHTML++;
        complateGame();
      }
    }
  }, 1000);
}
// Complate Game Function
function complateGame() {
  theInput.value = "";
  //   Ckeck If The Words Finished Form Word's box Or No
  if (words.length > 0) {
    showWords();
    // Reset The Time Lift And Restart The Function
    timeLift.innerHTML = gameRole[currentRole];
    timeLiftCount();
  } else finishGame();
}
// Function To Finish Game
function finishGame() {
  // Appear The Start And End Div
  startEndGame.classList.add("show");
  //   Hide The Start Div
  document.querySelector(".start").classList.remove("show");
  //   Appear The End Div
  document.querySelector(".end").classList.add("show");
  //   Set The Details
  document.querySelector("#gameEndedWithThisRole").innerHTML += Object.keys(
    gameRole
  ).filter((ele) => ele === currentRole);
  document.querySelector("#gameEndedWithThisTimeLift").innerHTML +=
    gameRole[currentRole];
  document.querySelector(
    "#gameEndedWithThisScore"
  ).innerHTML += `${currentScore.innerHTML} From ${scores.innerHTML}`;
  document.querySelector("#congratz").innerHTML +=
    scores.innerHTML === currentScore.innerHTML ? "Seccuss" : "Faild";
}

// Again Game
document.querySelector(".end button").onclick = () => window.location.reload();
