// Variables

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const timerText = document.querySelector('#timer');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const skipQuestion = document.querySelector('#skip');
const result = document.querySelector('#result');



let currentQuestion = {};
let acceptingAnswers = true;
let timeLeft = 90;
let intervalId = null;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let correct = 0;
let wrong = 0;
let skipped = 0;

let questions = [
    {
      question: "Commonly used data types DO NOT include:",
      choice1: "strings", 
      choice2: "booleans", 
      choice3: "alerts", 
      choice4: "numbers",
      answer: 3,
    },
    {
      question: "The condition in an if / else statement is enclosed within ____.",
      choice1: "quotes", 
      choice2: "curly brackets", 
      choice3: "parentheses", 
      choice4: "square brackets",
      answer: 3,
    },
    {
      question: "Arrays in JavaScript can be used to store ____.",
      choice1: "numbers and strings",
      choice2: "other arrays",
      choice3: "booleans",
      choice4: "all of the above",
      answer: 4,
    },
    {
      question:
        "String values must be enclosed within ____ when being assigned to variables.",
      choice1: "commas", 
      choice2: "curly brackets", 
      choice3: "quotes",
      choice4: "parentheses",
      answer: 3,
    },
    {
      question:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choice1: "JavaScript", 
      choice2: "terminal / bash", 
      choice3: "for loops", 
      choice4: "console.log",
      answer: 4,
    },
    {
      question:
        "Which variable name is NOT allowed?",
      choice1: "<code>let my-name = 'Bob'</code>", 
      choice2: "<code>let $bills = 'Cash Money'</code>", 
      choice3: "<code>let _ = 'underscore'</code>", 
      choice4: "<code>let bobBobbertson = 'Bob Bobbertson'</code>",
      answer: 1,
    },
    {
      question:
        "Which of the following is not a framework?",
      choice1: "jQuery", 
      choice2: ".NET", 
      choice3: "JavaScript",
      choice4: "None of the mentioned",
      answer: 3,
    },
    {
      question:
        'How do you call a function named "myFunction"?',
      choice1: "myFunction()", 
      choice2: "call function myFunction()", 
      choice3: "call myFunction()",
      choice4: "None of the mentioned",
      answer: 1,
    },
    {
      question:
        'Which of the following is a server-side Java Script object?',
      choice1: "Function", 
      choice2: "File", 
      choice3: "FileUpload",
      choice4: "Date",
      answer: 2,
    },
    {
      question:
        'Which tool can you use to ensure code quality?',
      choice1: "Angular", 
      choice2: "jQuery", 
      choice3: "RequireJS",
      choice4: "ESLint",
      answer: 4,
    }
  ];

const TIME_PENALTY = 10000;
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

// Functions

startGame = () => {
    questionCounter = 0;
    score = 0;
    localStorage.setItem("correctans", 0);
    localStorage.setItem("skippedans", 0);
    localStorage.setItem("wrongans", 0);
    intervalId = setInterval(() => {
      if(timeLeft!=0){
        timeLeft -= 1;

      }
         timerText.innerText = timeLeft;
      }, 1000);
    availableQuestions = [...questions];
    getNewQuestion();
}

timeOver = () => {
  setInterval(() => {
    if(timerText.innerText==0){
      localStorage.setItem("mostRecentScore", score);
      return window.location.assign("end.html");
    }
}, 1000);
}



getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS || timeLeft <= 0) {
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign("end.html");
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    })
    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

skipQuestion.addEventListener("click", function() {
  if(questionCounter == MAX_QUESTIONS){
    skipQuestion.style.backgroundColor='#a0c7ce';
    skipQuestion.style.pointerEvents='none';
    skipQuestion.style.userSelect='none';
  }
  else{
    getNewQuestion();
  }
  skipped+=1;
  localStorage.setItem("skippedans", skipped);
});


result.addEventListener("click", function() {
  localStorage.setItem("mostRecentScore", score);
  return window.location.assign("end.html");
});

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

            if(classToApply === "correct") {
                incrementScore(SCORE_POINTS);   
            }

            if(classToApply === "incorrect") {
                reduceTime(TIME_PENALTY);
            }

            selectedChoice.parentElement.classList.add(classToApply);
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion();
            }, 1000)
    })

});

incrementScore = num => {
    score += num   
    scoreText.innerText = score;
    correct+=1;
    localStorage.setItem("correctans", correct);
}

reduceTime = () => {
  if(timeLeft>10){
    timeLeft -= 10
  }
  else{
    timeLeft = 0
  }
  timerText.innerText = timeLeft;
  wrong+=1;
  localStorage.setItem("wrongans", wrong);

}

startGame();
timeOver();