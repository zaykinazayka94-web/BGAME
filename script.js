const levels = [
  { emoji: "🚢💙🧊", answers: ["титаник"] },
  { emoji: "🦁👑", answers: ["король лев"] },
  { emoji: "🧙‍♂️⚡🏰", answers: ["гарри поттер"] },
  { emoji: "🕷️🧑🏙️", answers: ["человек-паук", "человек паук"] },
  { emoji: "🦖🏝️🚁", answers: ["парк юрского периода"] },
  { emoji: "🤖🌍🚀", answers: ["валли", "валли", "wall-e", "walle"] },
  { emoji: "👨‍🚀🌌🕳️", answers: ["интерстеллар"] },
  { emoji: "💍🔥🌋", answers: ["властелин колец"] },
  { emoji: "🏹❄️🎯", answers: ["голодные игры"] },
  { emoji: "💊🕶️🖥️", answers: ["матрица"] },
];

const gameCard = document.getElementById("gameCard");
const resultCard = document.getElementById("resultCard");
const levelBadge = document.getElementById("levelBadge");
const progressFill = document.getElementById("progressFill");
const emojiPuzzle = document.getElementById("emojiPuzzle");
const answerForm = document.getElementById("answerForm");
const answerInput = document.getElementById("answerInput");
const feedback = document.getElementById("feedback");
const skipBtn = document.getElementById("skipBtn");
const restartBtn = document.getElementById("restartBtn");
const resultScore = document.getElementById("resultScore");
const resultText = document.getElementById("resultText");

let currentLevel = 0;
let score = 0;

function normalize(text) {
  return text.trim().toLowerCase().replace(/[ё]/g, "е");
}

function renderLevel() {
  const total = levels.length;
  const levelNumber = currentLevel + 1;
  levelBadge.textContent = `Уровень ${levelNumber} / ${total}`;
  emojiPuzzle.textContent = levels[currentLevel].emoji;
  progressFill.style.width = `${(levelNumber / total) * 100}%`;
  feedback.textContent = "";
  feedback.className = "feedback";
  answerInput.value = "";
  answerInput.focus();
}

function showFeedback(message, ok) {
  feedback.textContent = message;
  feedback.className = `feedback ${ok ? "feedback--ok" : "feedback--bad"}`;
}

function goNextLevel() {
  currentLevel += 1;
  if (currentLevel >= levels.length) {
    finishGame();
    return;
  }
  renderLevel();
}

function finishGame() {
  gameCard.classList.add("hidden");
  resultCard.classList.remove("hidden");
  resultScore.textContent = `Твой результат: ${score} из ${levels.length}`;

  const ratio = score / levels.length;
  if (ratio === 1) {
    resultText.textContent = "Идеально! Ты настоящий киноман.";
  } else if (ratio >= 0.7) {
    resultText.textContent = "Очень круто! Ты отлично разбираешься в кино.";
  } else if (ratio >= 0.4) {
    resultText.textContent = "Неплохо! Еще немного практики, и будет максимум.";
  } else {
    resultText.textContent = "Начало положено! Попробуй еще раз и прокачай результат.";
  }
}

function restartGame() {
  currentLevel = 0;
  score = 0;
  resultCard.classList.add("hidden");
  gameCard.classList.remove("hidden");
  renderLevel();
}

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const userAnswer = normalize(answerInput.value);
  if (!userAnswer) {
    showFeedback("Введи название фильма перед проверкой.", false);
    return;
  }

  const level = levels[currentLevel];
  const isCorrect = level.answers.some((answer) => normalize(answer) === userAnswer);
  if (isCorrect) {
    score += 1;
    showFeedback("Верно! Отличная работа.", true);
  } else {
    showFeedback(`Почти! Правильный ответ: ${level.answers[0]}.`, false);
  }

  setTimeout(goNextLevel, 850);
});

skipBtn.addEventListener("click", () => {
  const level = levels[currentLevel];
  showFeedback(`Пропуск. Ответ: ${level.answers[0]}.`, false);
  setTimeout(goNextLevel, 850);
});

restartBtn.addEventListener("click", restartGame);

renderLevel();
