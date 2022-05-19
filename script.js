//elements

const rulesBox = document.querySelector(".rulesBox");
const contBtn = rulesBox.querySelector(".buttons .contBtn");


const scoreBox = document.querySelector(".scoreBox");
const highscoreBtn = scoreBox.querySelector(".highscoreBtn button");
const answerList = document.querySelector(".answerList");
const timeText = document.querySelector(".quizTimer .timerText");
const timeCount = document.querySelector(".quizTimer .timerMins");

const quizBox = document.querySelector(".quizBox");

//add event lister to continue button
contBtn.onclick = () => {
    rulesBox.classList.add("deactRules");
    quizBox.classList.remove("deactQuizBox");
    generateQuestions(0); 
  
}

function generateQuestions(index){
    const questionText = document.querySelector(".questionText");

    questionText.innerHTML = "<span>" + questions[index].order + "." + questions[index].question + "</span>";
    answerList.innerHTML = '<div class="choice"><span>'+ questions[index].choices[0] +'</span></div>'
    + '<div class="choice"><span>'+ questions[index].choices[1] +'</span></div>'
    + '<div class="choice"><span>'+ questions[index].choices[2] +'</span></div>'
    + '<div class="choice"><span>'+ questions[index].choices[3] +'</span></div>'; 

    const choices = answerList.querySelectorAll(".choice");

    for (i=0; i <choices.length; i++){
        choices[i].setAttribute("onclick", "choiceSelected(this)");
    }
}
//if Highscore button is clicked

function choiceSelected(answer) {
    
}
// highscoreBtn.addEventListener("click", ".scoreBox")





//questions

let questions = [
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
