const quizData = [
  {
    question: "Hva kan gjøre det vanskelig for tyver å komme seg inn på maskinen din dersom den er frastjålet?",
    options: [
      "Skrive passord på en lapp og feste den på maskinen",
      "Deaktivere alle sikkerhetsinstillinger så det er enkelt å spore eller hente maskinen",
      "Et sterkt passord",
      "Bruke et enkelt lett gjettbart passord som '123456' eller 'password'"
    ],
    correct: 2,
    explanation: "Et sterkt passord beksytter datamaskinen din fordi den gjør det vanskelig for uvedkommende å logge inn eller få tilgang til filene dine."
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
    question: "Du mottar en e-post fra 'banken' som sier at kontoen din er suspendert og ber deg klikke inn på en lenke for å bekrefte brukernavn og passord. Hva er det tryggeste svaret?",
    options: [
      "Klikk inn på lenken og logg inn med det samme --- banken må jo verifisere deg",
      "Ikke klikk på lenken; gå direkte til bankens offisielle nettside eller ring banken via et kjent nummer for å bekrefte meldingen",
      "Svar på e-posten og oppgi personnummeret ditt så banken kan identifisere deg raskt",
      "Last ned vedleggene i e-posten og sjekk detaljer på kontoen"
    ],
    correct: 1,
    explanation: "Ekte banker ber sjelden om sensitiv informasjon via e-post eller gjennom ukjent lenke. Det ryggeste måten er å bruke kanaler som du vet er legitime (bankens nettsider du skriver inn manuelt, bankappen eller et offisielt nummer)."
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
    if (selected === correct) {
      score++;
    } else {
      e.target.style.backgroundColor = 'red';
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

