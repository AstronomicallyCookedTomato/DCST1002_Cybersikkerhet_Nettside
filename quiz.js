const quizData = [
  {
    question: "Hvorfor bør du aktivere brannmur på ruteren din?",
    options: [
      "Den lar flere bruke samme nettverk samtidig",
      "For å tette kjente sikkerhetshull og sårbarheter",
      "Den blokkerer uvedkommende tilkoblinger",
    ],
    correct: 2,
    explanation: ""  
  },
  {
    question: "Hvilket passord egner seg best for god sikkerhet?",
    options: [
      "banan!",
      ")Password",
      "jegelskerkylling",
      "!#PøbeLSPinat_.,"
    ],
    correct: 3,
    explanation: "Gode passord kjennetegnes ved lengde, compleksitet i tegn brukt, unikhet og mangel av personlige eller vanlige ord."
  },
  {
    question: "Hva er fordelen med å segmentere hjemmenettverket ditt?",
    options: [
      "Øker hastigheten på nettet",
      "Hindrer at skadevare sprer seg mellom enheter",
      "Gjør det enklere å koble til gjester"
    ],
    correct: 1,
    explanation: ""
  },
  {
    question: "Du kobler deg til gratis WI-FI på en kafe. Hva er det beste tiltaket for å redusere risikoen for å bli utsatt for et angrep over nettet?",
    options: [
      "Bruke en pålitelig VPN og forsikre deg om at nettstedet bruker HTTPS før du sender sensitiv informasjon",
      "Deaktivere brannmuren for å få raskere tilkobling",
      "Godta alle sikkerhetsvarsler i nettleseren for å få tilgang raskere",
      "Dele passordene dine med kafeens ansatte for 'kundestøtte'"
    ],
    correct: 0,
    explanation: "Offentlige(åpne) nettverk er spessielt utsatt for flere trusler: Man-in-the-middle - En som kan lese og endre trafikk mellom deg og nettet, packet sniffing - ukryptert trafikk (HTTP) kan leses av andre på nettverket) og malvertising - infiserte sider eller usikre vedlegg som kan spre skadelig programvare."
  },
  {
    question: "Hva er formålet med å bruke VPN på et usikret nettverk?",
    options: [
      "Gjøre internett raskere",
      "At sjefen stopper å mase",
      "Kryptere all trafikk mellom deg og mottaker",
      "Fordi VPN hindrer at datamaskinen min blir stjålet!"
    ],
    correct: 2,
    explenation: ""
  },
  {
    question: "Hvorfor holder det ikke å kun bruke HTTPS beskytta nettsider når du er tilkoblet til et falskt nettverk?",
    options: [
      "HTTPS fungerer bare hjemme",
      "HTTPS krypterer kun trafikk i nettleseren",
      "HTTPS er et virus, lure spørsmål ",
      "HTTPS står for 'Hamptern trår trygt på spionoppdraget"
    ],
    correct: 1,
    explanation: ""
  },
  {
    question: "Hvilket alternativ er tryggest når du må jobbe med sensitiv informasjon?",
    options: [
      "Mobil hotspot",
      "Åpent nettverk"
    ],
    correct: 0,
    explanation: ""
  },
  {
    question: "Hvilke nettverk virker ekte?",
    options: [
      "Starcbucks",
      "Starbucks",
      "Starbubck",
      "Starducks"
    ],
    correct: 1,
    explanation: ""
  },
  {
    question: "Hvorfor bør du aktivere brannmur på ruteren din?",
    options: [
      "Den lar flere bruke samme nettverk samtidig",
      "For å tette kjente sikkerhetshull og sårbarheter",
      "Den blokkerer uvedkommende tilkoblinger",
    ],
    correct: 2,
    explanation: ""
  },
  {
    question: "Hvilken handling kan redusere risikoen for å koble til et falskt nettverk?",
    options: [
      "Slå på automatisk tilkobling",
      "Dobbeltsjekke nettverksnavnet",
      "Koble til nettverk som ikke har passord",
    ],
    correct: 1,
    explanation: ""
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
  nextBtn.style.display = 'none';
}

quiz.addEventListener('click', (e) => {
  if (e.target.classList.contains('option') && !answered) {
    answered = true;
    const selected = parseInt(e.target.dataset.index);
    const correct = quizData[currentQuestion].correct;
    const options = document.querySelectorAll('.option');
    
    options[correct].style.backgroundColor = '#16b883'; 
    options[correct].style.color = "white";
    if (selected === correct) {
      score++;
      e.target.style.color = "white";
    } else {
      e.target.style.backgroundColor = 'red';
      e.target.style.color = "white";
    }

    const explanationEl = document.createElement('p');

    explanationEl.textContent = quizData[currentQuestion].explanation;

    explanationEl.style.color = "white";

    explanationEl.style.marginTop = "15px";

    quiz.appendChild(explanationEl);

    nextBtn.style.display = 'inline-block';
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

