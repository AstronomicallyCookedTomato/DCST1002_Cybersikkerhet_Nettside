const quizData = [
  {
    question: "What does 'phishing' mean?",
    options: [
      "Fishing in a lake",
      "Tricking someone into giving personal information",
      "A type of computer virus",
      "Encrypting your files"
    ],
    correct: 1
  },
  {
    question: "Which one is a strong password?",
    options: [
      "password123",
      "123456",
      "Qw!8zL#2xY",
      "mydogname"
    ],
    correct: 2
  },
  {
    question: "What to do if you get a suspicious email?",
    options: [
      "Click the link to see what it is",
      "Forward it to friends",
      "Delete it or report it as spam",
      "Reply asking if it's real"
    ],
    correct: 2
  }
];

const quiz = document.getElementById('quiz');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  answered = false;
  const q = quizData[currentQuestion];
  quiz.innerHTML = `
    <h2>${q.question}</h2>
    ${q.options.map((opt, i) => `<div class="option" data-index="${i}">${opt}</div>`).join('')}
  `;
}

quiz.addEventListener('click', (e) => {
  if (e.target.classList.contains('option') && !answered) {
    answered = true;
    const selected = parseInt(e.target.dataset.index);
    const correct = quizData[currentQuestion].correct;
    const options = document.querySelectorAll('.option');
    
    options[correct].style.backgroundColor = '#16b883'; 
    if (selected === correct) {
      score++;
    } else {
      e.target.style.backgroundColor = 'red';
    }
  }
});

nextBtn.addEventListener('click', () => {
  if (!answered) return;
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quiz.innerHTML = `
    <h2>You got ${score} out of ${quizData.length} correct!</h2>
    <button id="restart-btn">Try Again</button>
  `;
  nextBtn.style.display = 'none';
  scoreEl.textContent = '';

  // Add event listener for restart button
  const restartBtn = document.getElementById('restart-btn');
  restartBtn.addEventListener('click', restartQuiz);
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  nextBtn.style.display = 'inline-block';
  loadQuestion();
}

loadQuestion();

