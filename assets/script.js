//RulesBox elements
var rulesBox = document.querySelector(".rulesBox");
var contBtn = rulesBox.querySelector(".buttons .contBtn");
var highscoreBtn = rulesBox.querySelector(".buttons .highscoreBtn");
//HighscoreBox elements
var highscoreBox = document.querySelector(".highscoreBox");
var backBtn = document.querySelector(".backBtn");
var highscoreHistory = document.querySelector("#highscoreHistory");
var highscoreForm = document.querySelector(".highscoreForm");
var scoresarray = [];
//QuizBox elements
var answerList = document.querySelector(".answerList");
var quizBox = document.querySelector(".quizBox");
var saveBtn = document.querySelector(".highscoreForm button")
var currentQuestion = 0;
//timer elements
var timeLeft = 180;
var timeComplete = 0;
var timer;

//Quiz questions in array object form
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

  if (timeLeft <= 0) { //clears timer once timer hits 0
    clearInterval(timer);
    gameOverMessage();
  } else { //displays the time left in Minutes:seconds format
    var minute = Math.floor(timeLeft / 60);
    var second = timeLeft - (minute * 60);
    second = second > 9 ? second : "0" + second;
    document.getElementById("timerMins").innerHTML = minute + ":" + second;
  } 
  }, 1000);
}

//when player click on continue button, the quiz starts and the timer will count down
contBtn.onclick = function() {
  //this will reload timer if player wants to play the quiz agian without refreshing the page
  document.querySelector(".timerText").innerHTML = "Time Left";
  document.getElementById("timerMins").style.display = "block";
  //tells the game to start with 3 mins and begining on question #1
  timeLeft = 180;
  currentQuestion = 0;
  //opens quiz box to generate questions and start timer fuctions
  openQuizBox();
  startTimer();
  generateQuestions(currentQuestion);
}

//if player clicks on highscore button, highscore box will show highscore history
highscoreBtn.onclick = function() {
  openHighscore();
}

//reloads rules box when player is done viewing highscores page
backBtn.onclick = function() {
  reloadsRules();
}

//save player's score and initial to Highscore history at end of quiz
saveBtn.onclick = function() {
  //trimming player's input to remove any spaces
  var initial = document.getElementById("playerInitials").value.trim();
  if (initial === "") {
    return;
  }
  //player array object to be saved into scores array
  var currentPlayer = {
    username: initial, 
    score: timeComplete};
  
  //puts player's score in empty scores array and saved on local storage 
  scoresarray.push(currentPlayer);
  localStorage.setItem("data", JSON.stringify(scoresarray));
  //reveals Highscore box to show player's sumitted scores 
  openHighscore();
}
//fuctions of main page buttons for highscore, continue, and back buttons of game
function openQuizBox() {
  rulesBox.classList.add("deactRules"); //hides rules box
  highscoreForm.classList.add("deactHighscoreForm"); //hides highscore box
  quizBox.classList.remove("deactQuizBox"); //shows quiz box
  
}

function openHighscore() {
  rulesBox.classList.add("deactRules"); //hides rules box
  quizBox.classList.add("deactQuizBox"); //hides quiz box
  highscoreForm.classList.add("deactHighscoreForm"); //hides highscore form box
  highscoreBox.classList.remove("deactHighscoreBox"); //shows highscore box

  //pulls stored score arrays from local storage 
  var storedScoreArray = JSON.parse(localStorage.getItem("data"));
  if (storedScoreArray !== null) { //sorts highscores from highest to lowest 
    storedScoreArray.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    scoresarray = storedScoreArray;
  }

  //show stored highscores in highscore box
  renderHighscore();
}

//pulls stored highscore from local storage
function renderHighscore() {
  highscoreHistory.innerHTML = "";

  for (var i = 0; i < scoresarray.length; i++) {
    var score = scoresarray[i];

    var li = document.createElement("li");
    li.classList.add("history");
    //puts player's initials under the initial column
    var initialDiv = document.createElement("div");
    initialDiv.innerHTML = score.username;
    li.appendChild(initialDiv);
    //puts the accociated player's score under the score column
    var scoreDiv = document.createElement("div");
    scoreDiv.innerHTML = score.score;
    li.appendChild(scoreDiv); 

    //creates player's initals & score into list elements
    highscoreHistory.appendChild(li);
  }
}

//opens highscore form at the end of quiz
function openHighscoreForm() {
  rulesBox.classList.add("deactRules"); //hides rules box
  quizBox.classList.add("deactQuizBox"); //hides quiz box
  highscoreBox.classList.add("deactHighscoreBox"); //hides highscore box
  highscoreForm.classList.remove("deactHighscoreForm"); //shows highscore form box
}

//loads rules box after player clicks back to main page and is done viewing highscore history in highscore box
function reloadsRules() {
  rulesBox.classList.remove("deactRules"); //shows rules box
  highscoreForm.classList.add("deactHighscoreForm"); //hides highscore form
  highscoreBox.classList.add("deactHighscoreBox"); //hides highscore box
}

//removes timer text to show "Game Over" message when quiz ends
function gameOverMessage() {
  document.querySelector(".timerText").innerHTML = "GAME OVER!";
  document.getElementById("timerMins").style.display = "none";
  openHighscoreForm(); //shows highscore form for player to enter their initials
}

//pulls questions onto quiz box
function generateQuestions(index){
  if (index > 4) { //if all questions are answered
    timeComplete = timeLeft; //takes the value of how much time is left on timer and saves it in current Player's array as player's score
    clearInterval(timer); //stops timer from continuing countdown
    gameOverMessage(); //calls gameOverMessage function
    highscoreForm.classList.remove("deactHighscoreForm"); //shows highscore from for player to enter their initials
    return;
  }
  //moves to next question after previous question was answered
  var questionText = document.querySelector(".questionText");

  //shows question text in quiz box
  questionText.innerHTML = "<span>" + questions[index].order + "." + questions[index].question + "</span>"; 
  //shows answers choices in quiz box in order it was written in questions object array
  answerList.innerHTML = '<div class="choice"><span>'+ questions[index].choices[0] +'</span></div>'
  + '<div class="choice"><span>'+ questions[index].choices[1] +'</span></div>'
  + '<div class="choice"><span>'+ questions[index].choices[2] +'</span></div>'
  + '<div class="choice"><span>'+ questions[index].choices[3] +'</span></div>'; 

  //grabs all choices array from questions array object
  var choices = answerList.querySelectorAll(".choice");
  //adds even listener for when player clicks on their choice
  for (i=0; i < choices.length; i++){
      choices[i].setAttribute("onclick", "choiceSelected(this)");
  }
}

//when player clicks on an answer choice
function choiceSelected(answer) { 
  //checks the player's selected choice to match correct answer
  if(answer.innerText !== questions[currentQuestion].answer){
    //if player's selected choice does not match answer, 15 secs is subtracted from timer
    timeLeft = timeLeft - 15;
  }
  //moves to next question after player makes selection
  currentQuestion++;
  //generates next question
  generateQuestions(currentQuestion);
}; 




