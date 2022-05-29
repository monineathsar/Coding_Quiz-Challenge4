//RulesBox elements
var rulesBox = document.querySelector(".rulesBox");
var contBtn = rulesBox.querySelector(".buttons .contBtn");
var highscoreBtn = rulesBox.querySelector(".buttons .highscoreBtn");
//HighscoreBox elements
var highscoreBox = document.querySelector(".highscoreBox");
var backBtn = document.querySelector(".backBtn");
var highscoreHistory = document.querySelector("#highscoreHistory");
var highscoreForm = document.querySelector(".highscoreForm");
//QuizBox elements
var answerList = document.querySelector(".answerList");
var timeText = document.querySelector(".quizTimer .timerText");
var timeCount = document.querySelector(".quizTimer .timerMins");
var quizBox = document.querySelector(".quizBox");
var saveBtn = document.querySelector(".highscoreForm button")

var timeLeft = 180;
var scoresarray = [];
var currentQuestion = 0;
var timeComplete = 0;
var timer;

//questions
const questions = [
  {
  order: 1,
  question: "What does HTML stand for?",
  answer: "Hyper Text Markup Language",
  choices: [
    "Hypo Text Madeup Language",
    "Hyper Text Markup Language",
    "Hypo Text Multiple Language",
    "Hyper Tool Multi Language"
  ]
},
  {
  order: 2,
  question: "What does CSS stand for?",
  answer: "Cascading Style Sheet",
  choices: [
    "Computer Style Sheet",
    "Colorful Style Sheet",
    "Coding Style Sheet",
    "Cascading Style Sheet"
  ]
},
  {
  order: 3,
  question: "what is CSS used for?",
  answer: "the styling and layout of the webpage",
  choices: [
    "the user interaction of the webpage",
    "the functionality of the webpage",
    "the styling and layout of the webpage",
    "the text information of the webpage"
  ]
},
  {
  order: 4,
  question: "What is a boolean?",
  answer: "coding variable that has the value of 'true' and 'false'.",
  choices: [
    "coding variable that has the value of 'true' and 'false'.",
    "coding variable that has the value of 'odd' and 'even'",
    "coding variable that has the value within sqaure brackets ",
    "coding variable that has the value of '0'"
  ]
},
  {
  order: 5,
  question: "What is the correct point system order in CSS?",
  answer: "id > class > elements",
  choices: [
    "class > id > elements",
    "id > class > elements",
    "elements < id < class",
    "id < elements < class"
  ]
}
]

//starts the timer once player click on continue button on rules page
function startTimer() {
  timer = setInterval(function(){
  timeLeft--;

  if (timeLeft <= 0) {
    clearInterval(timer);
    sendMessage();
  } else {
    var minute = Math.floor(timeLeft / 60);
    var second = timeLeft - (minute * 60);
    second = second > 9 ? second : "0" + second;
    document.getElementById("timerMins").innerHTML = minute + ":" + second;
  } 
  }, 1000);
}

//when player click on continue or highscore button on rules page
contBtn.onclick = function() {
  document.querySelector(".timerText").innerHTML = "Time Left";
  document.getElementById("timerMins").style.display = "block";
  timeLeft = 180;
  currentQuestion = 0;
  openQuizBox();
  startTimer();
  generateQuestions(currentQuestion);
}

highscoreBtn.onclick = function() {
  openHighscore();
}

//reloads rules box when player is done viewing highscores page
backBtn.onclick = function() {
  reloadsRules();
}

//save player's score and initial to Highscore history
saveBtn.onclick = function() {
  var initial = document.getElementById("playerInitials").value.trim();
  if (initial === "") {
    return;
  }

  var currentPlayer = {
    username: initial, 
    score: timeComplete};

  scoresarray.push(currentPlayer);
  localStorage.setItem("data", JSON.stringify(scoresarray));

  openHighscore();
}
//fuctions of main page buttons for highscore, continue, and back buttons of game
function openQuizBox() {
  rulesBox.classList.add("deactRules");
  highscoreForm.classList.add("deactHighscoreForm");
  quizBox.classList.remove("deactQuizBox");
  
}

function openHighscore() {
  rulesBox.classList.add("deactRules");
  quizBox.classList.add("deactQuizBox");
  highscoreForm.classList.add("deactHighscoreForm");
  highscoreBox.classList.remove("deactHighscoreBox"); 


  var storedScoreArray = JSON.parse(localStorage.getItem("data"));
  if (storedScoreArray !== null) {
    storedScoreArray.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    scoresarray = storedScoreArray;
  }

  renderHighscore();
}

function renderHighscore() {
  highscoreHistory.innerHTML = "";

  for (var i = 0; i < scoresarray.length; i++) {
    var score = scoresarray[i];

    var li = document.createElement("li");
    li.classList.add("history");

    var initialDiv = document.createElement("div");
    initialDiv.innerHTML = score.username;
    li.appendChild(initialDiv);

    var scoreDiv = document.createElement("div");
    scoreDiv.innerHTML = score.score;
    li.appendChild(scoreDiv); 

    highscoreHistory.appendChild(li);
  }
}

function openHighscoreForm() {
  rulesBox.classList.add("deactRules");
  quizBox.classList.add("deactQuizBox");
  highscoreBox.classList.add("deactHighscoreBox");
  highscoreForm.classList.remove("deactHighscoreForm");
}
function reloadsRules() {
  rulesBox.classList.remove("deactRules");
  highscoreForm.classList.add("deactHighscoreForm");
  highscoreBox.classList.add("deactHighscoreBox");
}

//message for when timer ends and game is over
function sendMessage() {
  document.querySelector(".timerText").innerHTML = "GAME OVER!";
  document.getElementById("timerMins").style.display = "none";
  openHighscoreForm();
}

function generateQuestions(index){
  if (index > 4) { 
    timeComplete = timeLeft;
    clearInterval(timer);
    sendMessage();
    highscoreForm.classList.remove("deactHighscoreForm");
    return;
  }
  var questionText = document.querySelector(".questionText");

  questionText.innerHTML = "<span>" + questions[index].order + "." + questions[index].question + "</span>";
  answerList.innerHTML = '<div class="choice"><span>'+ questions[index].choices[0] +'</span></div>'
  + '<div class="choice"><span>'+ questions[index].choices[1] +'</span></div>'
  + '<div class="choice"><span>'+ questions[index].choices[2] +'</span></div>'
  + '<div class="choice"><span>'+ questions[index].choices[3] +'</span></div>'; 

  var choices = answerList.querySelectorAll(".choice");

  for (i=0; i < choices.length; i++){
      choices[i].setAttribute("onclick", "choiceSelected(this)");
  }
}


//when player clicks on an answer choice, it either subtracts 15 secs if incorrect then move to next question
function choiceSelected(answer) {
  if(answer.innerText !== questions[currentQuestion].answer){
    timeLeft = timeLeft - 15;
  }
  currentQuestion++;
  generateQuestions(currentQuestion);
}; 




