let quizAttempts = 0;
if (localStorage.quizAttempts) {
  quizAttempts = Number(localStorage.quizAttempts);
  document.getElementById("quiz-attempts").textContent =
    "Quiz Atttempts: " + quizAttempts;
} else {
  localStorage.setItem("quizAttempts", 0);
}

document.querySelector("#submitBtn").addEventListener("click", gradeQuiz);

const wrongColor = "red";
const correctColor = "green";
shuffleQ1Choices();

function shuffleQ1Choices() {
  let q1Choices = ["font-color", "text-color", "color", "background-color"];
  shuffleArray(q1Choices);

  for (const choice of q1Choices) {
    let radioElement = document.createElement("input");
    radioElement.type = "radio";
    radioElement.name = "q1";
    radioElement.value = choice;

    let labelElement = document.createElement("label");
    labelElement.textContent = choice;
    labelElement.style.marginRight = "7px";

    labelElement.prepend(radioElement);
    console.log(labelElement);

    document.querySelector("#q1Area").append(labelElement);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function gradeQuiz() {
  let score = 0;

  let q1Answer = document.querySelector("input[name=q1]:checked");
  const q2Answer = document.querySelector("#q2Input").value;
  const q3Answer = document.getElementById("q3-container").value;
  const q4Answer = document.getElementById("q4-input").valueAsNumber;
  const q5Answer = document.getElementById("q5-input").value;

  const q1Area = document.getElementById("q1Area");
  const q2Area = document.getElementById("q2Area");
  const q3Area = document.getElementById("q3Area");
  const q4Area = document.getElementById("q4Area");
  const q5Area = document.getElementById("q5Area");

  if (q1Answer != null) {
    q1Answer = q1Answer.value;
  }
  if (q1Answer == "color") {
    score++;
    q1Area.style.backgroundColor = correctColor;
    document.getElementById("check-mark-1").hidden = false;
    document.getElementById("x-mark-1").hidden = true;
  } else {
    q1Area.style.backgroundColor = wrongColor;
    document.getElementById("check-mark-1").hidden = true;
    document.getElementById("x-mark-1").hidden = false;
  }

  if (q2Answer == "<body>") {
    score++;
    q2Area.style.backgroundColor = correctColor;
    document.getElementById("check-mark-2").hidden = false;
    document.getElementById("x-mark-2").hidden = true;
  } else {
    q2Area.style.backgroundColor = wrongColor;
    document.getElementById("check-mark-2").hidden = true;
    document.getElementById("x-mark-2").hidden = false;
  }

  if (parseInt(q3Answer) > 100) {
    score++;
    q3Area.style.backgroundColor = correctColor;
    document.getElementById("check-mark-3").hidden = false;
    document.getElementById("x-mark-3").hidden = true;
  } else {
    q3Area.style.backgroundColor = wrongColor;
    document.getElementById("check-mark-3").hidden = true;
    document.getElementById("x-mark-3").hidden = false;
  }

  if (q4Answer == 91) {
    score++;
    q4Area.style.backgroundColor = correctColor;
    document.getElementById("check-mark-4").hidden = false;
    document.getElementById("x-mark-4").hidden = true;
  } else {
    q4Area.style.backgroundColor = wrongColor;
    document.getElementById("check-mark-4").hidden = true;
    document.getElementById("x-mark-4").hidden = false;
  }

  if (q5Answer == "C") {
    score++;
    q5Area.style.backgroundColor = correctColor;
    document.getElementById("check-mark-5").hidden = false;
    document.getElementById("x-mark-5").hidden = true;
  } else {
    q5Area.style.backgroundColor = wrongColor;
    document.getElementById("check-mark-5").hidden = true;
    document.getElementById("x-mark-5").hidden = false;
  }

  const totalScore = score * 20;

  document.getElementById("scoreText").textContent =
    `Your Total Score is ${totalScore} / 100.`;

  document.getElementById("congratulations-text").hidden = totalScore < 80;

  quizAttempts++;
  localStorage.setItem("quizAttempts", quizAttempts);
  document.getElementById("quiz-attempts").textContent =
    "Quiz Attempts: " + quizAttempts;
}
