//RulesBox elements
var rulesBox = document.querySelector(".rulesBox");
var contBtn = rulesBox.querySelector(".buttons .contBtn");
var highscoreBtn = rulesBox.querySelector(".buttons .highscoreBtn");
//HighscoreBox elements
var highscoreBox = document.querySelector(".highscoreBox");
var backBtn = document.querySelector(".backBtn")
//QuizBox elements
var answerList = document.querySelector(".answerList");
var timeText = document.querySelector(".quizTimer .timerText");
var timeCount = document.querySelector(".quizTimer .timerMins");

var quizBox = document.querySelector(".quizBox");

var highscoreHistory = document.querySelector("#highscoreHistory");

var scores = [];
var currentQuestion = 0;

//starts the timer once player click on continue button on rules page
function startTimer() {
  var count = 15;
  var timer = setInterval(function(){
  count--;

  if (count === 0) {
    clearInterval(timer);
    sendMessage();
  } else {
    var minute = Math.floor(count / 60);
    var second = count - (minute * 60);
    second = second > 9 ? second : "0" + second;
    document.getElementById("timerMins").innerHTML = minute + ":" + second;
  } 
  }, 1000);
}
//when player click on continue or highscore button on rules page
contBtn.onclick = function() {
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

//fuctions of main page buttons for highscore, continue, and back buttons of game
function openQuizBox() {
  rulesBox.classList.add("deactRules");
  quizBox.classList.remove("deactQuizBox");
}

function openHighscore() {
  rulesBox.classList.add("deactRules");
  highscoreBox.classList.remove("deactHighscoreBox"); 
}

function reloadsRules() {
  rulesBox.classList.remove("deactRules");
  highscoreBox.classList.add("deactHighscoreBox");
}

//message for when timer ends and game is over
function sendMessage() {
  document.querySelector(".timerText").innerHTML = "GAME OVER!";
  document.getElementById("timerMins").style.display = "none";
}

function generateQuestions(index){
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


//when player clicks on an answer choice
function choicesSelected(answer) {
    //player's answer
    let playerSelectedAnswer = answer.textContent; 
    //correct answer
    let correctAnswer = questions[questionCount].answer; 
    //grabs all answer choices
    const allChoices = answerList.children.length;

    if(playerSelectedAnswer === correctAnswer){
        nextBtn.classList.add("show");
    }else{
     
    }
}



//if Highscore button is clicked

// highscoreBtn.addEventListener("click", ".scoreBox")

//once quiz starts, timer also starts


function showScore(){
    var scoreList = JSON.parse(localStorage.getItem('scores'));
    if (scoreList !== null){
      scores = scoreList;
    }

    renderScore();
}

function renderScore(){
    highscoreHistory.innerHTML = "";
    for (var i = 0; i < scores.length; i++) {
        var score = scores[i];

        var li = document.createElement("li");
        li.textContent = score;
    }
}


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
