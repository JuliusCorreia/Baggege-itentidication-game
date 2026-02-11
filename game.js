// game.js

// Canvas setup
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const statusText = document.getElementById("status-text");
const scoreText = document.getElementById("score-text");
const levelText = document.getElementById("level-text");
const itemsText = document.getElementById("items-text");
const streakText = document.getElementById("streak-text");
const nextButton = document.getElementById("next-button");
const resetButton = document.getElementById("reset-button");

const level1Button = document.getElementById("level1-button");
const level2Button = document.getElementById("level2-button");
const level3Button = document.getElementById("level3-button");

const graduationModal = document.getElementById("graduation-modal");
const graduationTitle = document.getElementById("graduation-title");
const graduationBody = document.getElementById("graduation-body");
const continueButton = document.getElementById("continue-button");
const resetModalButton = document.getElementById("reset-modal-button");

function showGraduation(messageTitle, messageBody, nextLevel) {
  graduationTitle.textContent = messageTitle;
  graduationBody.textContent = messageBody;
  graduationModal.classList.remove("hidden");

  continueButton.onclick = () => {
    graduationModal.classList.add("hidden");
    if (nextLevel) {
      currentLevel = nextLevel;
    }
    resetGame();
  };

  resetModalButton.onclick = () => {
    graduationModal.classList.add("hidden");
    currentLevel = 1;
    highestUnlockedLevel = 1;
    resetGame();
  };
}


// Core state
let score = 0;
let currentItem = null;
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let lastResult = null; // { correct: boolean, delta: number }

// Timing and accuracy
let startTime = null;        // when current item became active
let totalDecisions = 0;      // how many items answered
let correctDecisions = 0;    // how many correct
let currentStreak = 0;

// Levels
let currentLevel = 1;         // current level
let highestUnlockedLevel = 1; // how far the user has progressed

// Game state: "answering" or "feedback"
let gameState = "answering";

// Simple recent-items buffer to reduce repetition
const recentItems = [];
const RECENT_BUFFER_SIZE = 5;

// Per-category stats
const stats = {
  cabin: { correct: 0, total: 0 },
  "hold-only": { correct: 0, total: 0 },
  "not-allowed-dangerous": { correct: 0, total: 0 },
  "not-allowed-offensive": { correct: 0, total: 0 }
};

function updateLevelButtons() {
  // Clear states
  [level1Button, level2Button, level3Button].forEach(btn => {
    btn.classList.remove("level-btn-active", "level-btn-disabled");
  });

  // Base enabled/disabled depending on unlock
  if (highestUnlockedLevel < 2) {
    level2Button.classList.add("level-btn-disabled");
  }
  if (highestUnlockedLevel < 3) {
    level3Button.classList.add("level-btn-disabled");
  }

  // Active level styling
  if (currentLevel === 1) {
    level1Button.classList.add("level-btn-active");
  } else if (currentLevel === 2) {
    level2Button.classList.add("level-btn-active");
  } else if (currentLevel === 3) {
    level3Button.classList.add("level-btn-active");
  }

  levelText.textContent = `Level ${currentLevel}`;
}

// Animation
let itemTargetX = null; // where the item wants to be
const itemSpeed = 0.15; // how fast it moves (0–1 lerp)

// Trays (drop zones)
const zones = [
  {
    id: "cabin",
    label: "Cabin",
    icon: "🛄",
    x: 40,
    y: 360,
    width: 190,
    height: 100,
    baseColor: "#e5f9ed"
  },
  {
    id: "hold-only",
    label: "Hold only",
    icon: "📦",
    x: 260,
    y: 360,
    width: 190,
    height: 100,
    baseColor: "#fef7e5"
  },
  {
    id: "not-allowed-dangerous",
    label: "Dangerous goods",
    icon: "☢️",
    x: 480,
    y: 360,
    width: 190,
    height: 100,
    baseColor: "#fee2e2"
  },
  {
    id: "not-allowed-offensive",
    label: "Offensive weapons",
    icon: "⚔️",
    x: 700,
    y: 360,
    width: 190,
    height: 100,
    baseColor: "#ede9fe"
  }
];

// --- Random item selection with recent buffer ---
function createRandomItem() {
  const pool = ITEMS.filter(item => item.level === currentLevel);
  const effectivePool = pool.length > 0 ? pool : ITEMS;

  let itemData;
  let attempts = 0;

  do {
    itemData =
      effectivePool[Math.floor(Math.random() * effectivePool.length)];
    attempts += 1;
    // If pool is small, fall back quickly to avoid infinite loop
    if (attempts > 10 || effectivePool.length <= RECENT_BUFFER_SIZE) break;
  } while (recentItems.includes(itemData.name));

  // update recent buffer
  recentItems.push(itemData.name);
  if (recentItems.length > RECENT_BUFFER_SIZE) {
    recentItems.shift();
  }

  const width = 280;
  const height = 80;
  const targetX = (canvas.width - width) / 2;
  const startY = 180;
  const startX = -width; // conveyor from left

  itemTargetX = targetX;

  return {
    name: itemData.name,
    category: itemData.category,
    hazardType: itemData.hazardType,
    level: itemData.level,
    icon: itemData.icon,
    x: startX,
    y: startY,
    width,
    height,
    color: "#16a085"
  };
}

// --- Drawing ---
function drawBackground() {
  ctx.fillStyle = "#0b1c33";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // conveyor band
  ctx.fillStyle = "#152a4d";
  ctx.fillRect(0, 220, canvas.width, 120);
}

function drawZones() {
  zones.forEach((zone) => {
    const r = 14;
    const x = zone.x;
    const y = zone.y;
    const w = zone.width;
    const h = zone.height;

    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();

    ctx.fillStyle = zone.baseColor;
    ctx.fill();

    ctx.shadowColor = "rgba(15, 23, 42, 0.35)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;
    ctx.strokeStyle = "rgba(148, 163, 184, 0.9)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    ctx.beginPath();
    ctx.moveTo(x + 4, y + 6);
    ctx.lineTo(x + w - 4, y + 6);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "#0f172a";
    ctx.font = "18px system-ui";
    ctx.fillText(zone.icon, x + 10, y + 28);

    ctx.font = "12px system-ui";
    ctx.fillStyle = "#111827";
    ctx.fillText(zone.label, x + 40, y + 26);
  });
}

function drawItem(item) {
  if (!item) return;

  const r = 16;
  const x = item.x;
  const y = item.y;
  const w = item.width;
  const h = item.height;

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();

  ctx.fillStyle = item.color;
  ctx.fill();

  ctx.strokeStyle = "rgba(15, 23, 42, 0.6)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  if (lastResult) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();

    ctx.lineWidth = 3;
    ctx.strokeStyle = lastResult.correct ? "#16a34a" : "#dc2626";
    ctx.stroke();
    ctx.restore();

    const pillText = (lastResult.delta > 0 ? "+" : "") + String(lastResult.delta);
    const pillWidth = 40;
    const pillHeight = 20;
    const pillX = x + w - pillWidth - 10;
    const pillY = y - pillHeight - 6;

    ctx.beginPath();
    const pr = pillHeight / 2;
    ctx.moveTo(pillX + pr, pillY);
    ctx.lineTo(pillX + pillWidth - pr, pillY);
    ctx.quadraticCurveTo(pillX + pillWidth, pillY, pillX + pillWidth, pillY + pr);
    ctx.lineTo(pillX + pillWidth, pillY + pillHeight - pr);
    ctx.quadraticCurveTo(
      pillX + pillWidth,
      pillY + pillHeight,
      pillX + pillWidth - pr,
      pillY + pillHeight
    );
    ctx.lineTo(pillX + pr, pillY + pillHeight);
    ctx.quadraticCurveTo(
      pillX,
      pillY + pillHeight,
      pillX,
      pillY + pillHeight - pr
    );
    ctx.lineTo(pillX, pillY + pr);
    ctx.quadraticCurveTo(pillX, pillY, pillX + pr, pillY);
    ctx.closePath();

    ctx.fillStyle = lastResult.correct ? "#16a34a" : "#b91c1c";
    ctx.fill();

    ctx.fillStyle = "#f9fafb";
    ctx.font = "12px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(pillText, pillX + pillWidth / 2, pillY + pillHeight / 2);
    ctx.textAlign = "start";
    ctx.textBaseline = "alphabetic";
  }

  if (item.icon) {
    ctx.fillStyle = "#f9fafb";
    ctx.font = "22px system-ui";
    ctx.fillText(item.icon, x + 14, y + 30);
  }

  const textStartX = item.icon ? x + 50 : x + 14;
  ctx.fillStyle = "#ecf0f1";
  ctx.font = "16px system-ui";
  wrapText(item.name, textStartX, y + 26, w - (textStartX - x) - 14, 20);

  if (item.hazardType) {
    ctx.fillStyle = "rgba(226, 232, 240, 0.9)";
    ctx.font = "12px system-ui";
    ctx.fillText(`Hazard: ${item.hazardType}`, textStartX, y + h - 12);
  }
}

function wrapText(text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

// --- Main render loop ---
function render() {
  if (gameState === "answering" && currentItem && itemTargetX !== null && !isDragging) {
    const dx = itemTargetX - currentItem.x;
    if (Math.abs(dx) > 0.5) {
      currentItem.x += dx * itemSpeed;
    } else {
      currentItem.x = itemTargetX;
    }
  }

  drawBackground();
  drawZones();
  drawItem(currentItem);
  requestAnimationFrame(render);
}

// --- Input handling ---
function getCanvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  let clientX, clientY;

  if (event.touches && event.touches.length > 0) {
    // touchstart / touchmove
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  } else if (event.changedTouches && event.changedTouches.length > 0) {
    // touchend
    clientX = event.changedTouches[0].clientX;
    clientY = event.changedTouches[0].clientY;
  } else {
    // mouse events
    clientX = event.clientX;
    clientY = event.clientY;
  }

  return {
    x: ((clientX - rect.left) / rect.width) * canvas.width,
    y: ((clientY - rect.top) / rect.height) * canvas.height
  };
}

function isPointInItem(x, y, item) {
  return (
    x >= item.x &&
    x <= item.x + item.width &&
    y >= item.y &&
    y <= item.y + item.height
  );
}

function handlePointerDown(event) {
  if (!currentItem || gameState !== "answering") return;
  const { x, y } = getCanvasPoint(event);

  if (isPointInItem(x, y, currentItem)) {
    isDragging = true;
    dragOffsetX = x - currentItem.x;
    dragOffsetY = y - currentItem.y;
    event.preventDefault();
  }
}

function handlePointerMove(event) {
  if (!isDragging || !currentItem) return;
  const { x, y } = getCanvasPoint(event);
  currentItem.x = x - dragOffsetX;
  currentItem.y = y - dragOffsetY;
  event.preventDefault();
}

function handlePointerUp(event) {
  if (!isDragging || !currentItem) return;
  isDragging = false;
  const { x, y } = getCanvasPoint(event);

  const zone = zones.find(
    (z) =>
      x >= z.x &&
      x <= z.x + z.width &&
      y >= z.y &&
      y <= z.y + z.height
  );

  if (zone) {
    checkAnswer(zone);
  } else {
    statusText.textContent = "Time: 0.0s  •  Accuracy: " +
      (totalDecisions === 0
        ? 0
        : Math.round((correctDecisions / totalDecisions) * 100)) +
      "%  •  Drop the item into one of the zones.";
  }
  event.preventDefault();
}

// --- Answer checking & game state ---
function checkAnswer(zone) {
  if (gameState !== "answering") return;

  const now = performance.now();
  const timeTakenSeconds = startTime ? (now - startTime) / 1000 : 0;

  const correctCategory = currentItem.category;
  const droppedCategory = zone.id;

  let delta;
  let wasCorrect;

  if (correctCategory === droppedCategory) {
    delta = 10;
    score += delta;
    wasCorrect = true;
    correctDecisions += 1;
    currentStreak += 1;
  } else {
    delta = -5;
    score += delta;
    wasCorrect = false;
    currentStreak = 0;
  }

  if (stats[correctCategory]) {
    stats[correctCategory].total += 1;
    if (wasCorrect) stats[correctCategory].correct += 1;
  }

  totalDecisions += 1;
  const accuracy = totalDecisions === 0
    ? 0
    : Math.round((correctDecisions / totalDecisions) * 100);

  // Graduation rules with notifications

  // Level 1 -> Level 2
  if (currentLevel === 1 && highestUnlockedLevel === 1) {
    const minDecisions = 20;
    const minAccuracy = 80;
    if (totalDecisions >= minDecisions && accuracy >= minAccuracy) {
      highestUnlockedLevel = 2;
      updateLevelButtons();
      showGraduation(
        "Level 1 cleared – Level 2 unlocked",
        `Great work.\n\nAccuracy: ${accuracy}%\nItems answered: ${totalDecisions}\nScore: ${score}`,
        2 // jump to Level 2 on Continue
      );
    }
  }

  // Level 2 -> Level 3
  if (currentLevel === 2 && highestUnlockedLevel === 2) {
    const minDecisions2 = 30;
    const minAccuracy2 = 85;
    if (totalDecisions >= minDecisions2 && accuracy >= minAccuracy2) {
      highestUnlockedLevel = 3;
      updateLevelButtons();
      showGraduation(
        "Level 2 cleared – Level 3 unlocked",
        `Strong performance.\n\nAccuracy: ${accuracy}%\nItems answered: ${totalDecisions}\nScore: ${score}`,
        3 // jump to Level 3 on Continue
      );
    }
  }

  // All levels cleared – only when playing Level 3
  if (currentLevel === 3 && totalDecisions >= 30 && accuracy >= 90) {
    showGraduation(
      "All levels cleared",
      `You have completed Level 3.\n\nAccuracy: ${accuracy}%\nItems answered: ${totalDecisions}\nScore: ${score}\nBest streak: ${currentStreak}`,
      null // stay on Level 3, Continue just restarts same level
    );
  }


  updateLevelButtons();

  lastResult = { correct: wasCorrect, delta };

  const timeText = `Time: ${timeTakenSeconds.toFixed(1)}s`;
  const accuracyText = `Accuracy: ${accuracy}%`;

  function pct(cat) {
    const s = stats[cat];
    if (!s || s.total === 0) return 0;
    return Math.round((s.correct / s.total) * 100);
  }

  const catSummary =
    `Cabin ${pct("cabin")}% · Hold ${pct("hold-only")}% · ` +
    `Dangerous ${pct("not-allowed-dangerous")}% · Offensive ${pct("not-allowed-offensive")}%`;

  statusText.textContent = `${timeText}  •  ${accuracyText}  •  ${catSummary}`;
  scoreText.textContent = `Score: ${score}`;
  itemsText.textContent = `Items: ${totalDecisions}`;
  streakText.textContent = `Streak: ${currentStreak}`;

  gameState = "feedback";
  nextButton.disabled = false;
}

// Next item
function goToNextItem() {
  if (gameState !== "feedback") return;

  lastResult = null;

  currentItem = createRandomItem();
  startTime = performance.now();
  gameState = "answering";
  nextButton.disabled = true;

  const accuracy = totalDecisions === 0
    ? 0
    : Math.round((correctDecisions / totalDecisions) * 100);

  statusText.textContent = `Time: 0.0s  •  Accuracy: ${accuracy}%`;
}

// Reset game
function resetGame() {
  score = 0;
  totalDecisions = 0;
  correctDecisions = 0;
  currentStreak = 0;
  lastResult = null;
  gameState = "answering";

  Object.keys(stats).forEach(cat => {
    stats[cat].correct = 0;
    stats[cat].total = 0;
  });

  itemsText.textContent = "Items: 0";
  streakText.textContent = "Streak: 0";

  updateLevelButtons();

  currentItem = createRandomItem();
  startTime = performance.now();

  statusText.textContent = "Time: 0.0s  •  Accuracy: 0%";
  scoreText.textContent = `Score: ${score}`;
  nextButton.disabled = true;
}

// --- Initialise ---
canvas.addEventListener("mousedown", handlePointerDown);
canvas.addEventListener("mousemove", handlePointerMove);
canvas.addEventListener("mouseup", handlePointerUp);
canvas.addEventListener("mouseleave", handlePointerUp);

canvas.addEventListener("touchstart", handlePointerDown, { passive: false });
canvas.addEventListener("touchmove", handlePointerMove, { passive: false });
canvas.addEventListener("touchend", handlePointerUp, { passive: false });

nextButton.addEventListener("click", goToNextItem);
resetButton.addEventListener("click", resetGame);

level1Button.addEventListener("click", () => {
  if (gameState !== "answering") return;
  currentLevel = 1;
  resetGame();
});

level2Button.addEventListener("click", () => {
  if (highestUnlockedLevel < 2 || gameState !== "answering") return;
  currentLevel = 2;
  resetGame();
});

level3Button.addEventListener("click", () => {
  if (highestUnlockedLevel < 3 || gameState !== "answering") return;
  currentLevel = 3;
  resetGame();
});

updateLevelButtons();
resetGame();
render();
