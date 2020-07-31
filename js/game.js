const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "What does HTML stand for?",
    choice1: "Hyper Text Markup Language",
    choice2: "High Text Markup Language",
    choice3: "Hyper Tabular Markup Language",
    choice4: "None of these",
    answer: 1
  },
  {
    question:
      "which of the following tag is used to mark a begining of paragraph ?",
    choice1: "<TD>",
    choice2: "<br>",
    choice3: "<P>",
    choice4: "<TR>",
    answer: 3
  },
  {
    question: "From which tag descriptive list starts ?",
    choice1: "<LL>",
    choice2: "<DD>",
    choice3: "<DL>",
    choice4: "<DS>",
    answer: 3
  },
  {
    question: "The attribute of <form> tag",
    choice1: "Method",
    choice2: "Action",
    choice3: "Both (a)&(b)",
    choice4: "None of these",
    answer: 3
  },
  {
    question: "Correct HTML tag for the largest heading is",
    choice1: "<h1>",
    choice2: "<h2>",
    choice3: "<h3>",
    choice4: "<h4>",
    answer: 1
  },
  {
    question: "Markup tags tell the web browser",
    choice1: "How to organise the page",
    choice2: "How to display the page",
    choice3: "How to display message box on page",
    choice4: "None of these",
    answer: 2
  },
  {
    question: "www is based on which model?",
    choice1: "Local-server",
    choice2: "Client-server",
    choice3: "3-tier",
    choice4: "None of these",
    answer: 2
  },
  {
    question: "What are Empty elements and is it valid?",
    choice1: "No, there is no such terms as Empty Element",
    choice2: "Empty elements are element with no data",
    choice3: "No, it is not valid to use Empty Element",
    choice4: "None of these",
    answer: 2
  },
  {
    question: "Which of the following attributes of text box control allow to limit the maximum character?",
    choice1: "size",
    choice2: "len",
    choice3: "maxlength",
    choice4: "all of these",
    answer: 3
  },
  {
    question: "Web pages starts with which ofthe following tag?",
    choice1: "<Body>",
    choice2: "<Title>",
    choice3: "<HTML>",
    choice4: "<Form>",
    answer: 3
  },

];
//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();