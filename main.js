/* Start and Setting Button First page*/
const startBtn = document.querySelector(".startBtn");
const settingBtn = document.querySelector(".settingBtn");
const start = document.querySelector(".start");
const timer = document.querySelector(".timer");
const quizzes = document.querySelector(".quizzes");
const timerCounter = timer.querySelector("h1");
const youLose = document.querySelector(".youLose");
let answers = document.querySelector(".quizzes .answers");
const right = document.querySelector(".right");
const rang = document.querySelector(".rang");
let boxes = document.querySelectorAll(".quizzes .box");
let startTimer = 3;
let counterTime = 10 + startTimer;
let indexOfQuestion = 0;
let inter2;
let quizTime = document.querySelector(".quizzes .quiz h2 span");
let points = 0;

let answersArray = [1, 3, 2, 0, 0];

const checkAnswer = (index, questionIndex) => {
  return index === answersArray[questionIndex++] ? true : false;
};

let arrayQu = [
  (que1 = {
    title: `What is the fastest animal in the world?`,
    a: `Turtle`,
    b: `Cheetah`,
    c: `Rabbit`,
    d: `Leopard`,
  }),
  (que2 = {
    title: `What is "cynophobia"?`,
    a: `Fear of cats`,
    b: `Fear of close doors`,
    c: `Fear of dark lights`,
    d: `Fear of dogs`,
  }),
  (que3 = {
    title: `How many languages are written from right to left?`,
    a: `17`,
    b: `36`,
    c: `12`,
    d: `10`,
  }),
  (que4 = {
    title: `What is the name of the biggest technology company in South Korea?`,
    a: `Samsung Electronics`,
    b: `Hyundai Motor`,
    c: `SK Holdings`,
    d: `POSCO`,
  }),
  (que5 = {
    title: `What is the name of the largest ocean on earth?`,
    a: `The Pacific Ocean`,
    b: `The Southern Ocean`,
    c: `The Atlantic basin`,
    d: `Indian Ocean`,
  }),
];

function makeQuestion(indexQQ) {
  quizzes.innerHTML = `<div class="quiz">
  <h1>${arrayQu[indexQQ].title}</h1>
  <div class="an">
    <div class="quizTime">
      <h2>0:<span>60</span></h2>
    </div>
  </div>
  <div class="answers">
    <div class="box">
      <div class="a">A</div>
      <h2>${arrayQu[indexQQ].a}</h2>
    </div>
    <div class="box">
      <div class="b">B</div>
      <h2>${arrayQu[indexQQ].b}</h2>
    </div>
    <div class="box">
      <div class="c">C</div>
      <h2>${arrayQu[indexQQ].c}</h2>
    </div>
    <div class="box">
      <div class="d">D</div>
      <h2>${arrayQu[indexQQ].d}</h2>
    </div>
  </div>
</div>`;
}

function cl() {
  boxes = document.querySelectorAll(".quizzes .box");
  boxes.forEach((box, index) => {
    box.addEventListener("click", function () {
      clearInterval(inter2);
      if (checkAnswer(index, indexOfQuestion - 1)) {
        points++;
        if (indexOfQuestion < arrayQu.length) {
          nextQuestion();
        } else {
          quizzes.style.display = "none";
          youLose.style.display = "block";
          youLose.querySelector(
            "span"
          ).textContent = `${points}/${arrayQu.length}`;
        }
        rightWRonAnswer(true);
      } else {
        if (indexOfQuestion < arrayQu.length) {
          nextQuestion();
        } else {
          quizzes.style.display = "none";
          youLose.style.display = "block";
          youLose.querySelector(
            "span"
          ).textContent = `${points}/${arrayQu.length}`;
        }
        rightWRonAnswer(false);
      }
    });
  });
}

startBtn.addEventListener("click", function () {
  start.style.display = "none";
  beReady();
});

function beReady() {
  makeQuestion(indexOfQuestion);
  indexOfQuestion++;
  quizTime = document.querySelector(".quizzes .quiz h2 span");
  boxes = document.querySelectorAll(".quizzes .box");
  startTimer = 3;
  timerCounter.textContent = startTimer;
  quizzes.style.display = "none";
  counterTime = 10 + startTimer;
  const inter = setInterval(() => {
    startTimer--;
    timerCounter.textContent = startTimer;
    if (startTimer === 0) {
      timer.style.display = "none";
      quizzes.style.display = "flex";
      right.style.display = "none";
      rang.style.display = "none";
      clearInterval(inter);
    }
  }, 1000);
  timer.style.display = "block";
  inter2 = setInterval(() => {
    counterTime--;
    quizTime.textContent = counterTime;
    if (counterTime == 0) {
      clearInterval(inter2);
      if (indexOfQuestion < arrayQu.length) {
        nextQuestion();
      }
      if (indexOfQuestion == arrayQu.length) {
        quizzes.style.display = "none";
        youLose.style.display = "block";
        youLose.querySelector(
          "span"
        ).textContent = `${points}/${arrayQu.length}`;
      }
    }
  }, 1000);
  cl();
}

function nextQuestion() {
  beReady();
}

youLose.querySelector("button").addEventListener("click", function () {
  location.reload();
});

function rightWRonAnswer(arg) {
  if (arg) {
    right.style.display = "block";
    right.querySelector(".box").style.opacity = "0.6";
  } else {
    rang.style.display = "block";
    rang.querySelector(".box").style.opacity = "0.6";
  }
}
