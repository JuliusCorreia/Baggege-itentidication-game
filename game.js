// game.js

// Canvas setup
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const statusText = document.getElementById("status-text");
const scoreText = document.getElementById("score-text");
const levelText = document.getElementById("level-text");
const nextButton = document.getElementById("next-button");

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

// Game state: "answering" or "feedback"
let gameState = "answering";

// Animation
let itemTargetX = null; // where the item wants to be
let itemSpeed = 0.15;   // how fast it moves (0–1 lerp)

// --- Zones (we'll keep them simple rectangles for now) ---
// --- Trays (drop zones) ---
const zones = [
  {
    id: "cabin",
    label: "Cabin & hold allowed",
    icon: "🛄",                // placeholder icon
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
    icon: "☢",
    x: 480,
    y: 360,
    width: 190,
    height: 100,
    baseColor: "#fee2e2"
  },
  {
    id: "not-allowed-offensive",
    label: "Offensive weapons",
    icon: "⚠",
    x: 700,
    y: 360,
    width: 190,
    height: 100,
    baseColor: "#ede9fe"
  }
];

// --- Simple item representation for now ---
function createRandomItem() {
  const itemData = ITEMS[Math.floor(Math.random() * ITEMS.length)];

  const width = 280;
  const height = 80;
  const targetX = (canvas.width - width) / 2;
  const startY = 180;

  // Start slightly off the left side (conveyor effect)
  const startX = -width;

  itemTargetX = targetX;

  return {
    name: itemData.name,
    category: itemData.category,
    x: startX,
    y: startY,
    width,
    height,
    color: "#16a085"
  };
}


// --- Drawing functions ---
function drawBackground() {
  ctx.fillStyle = "#0b1c33";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // conveyor band hint
  ctx.fillStyle = "#152a4d";
  ctx.fillRect(0, 220, canvas.width, 120);
}

function drawZones() {
  zones.forEach((zone) => {
    // Tray base
    const r = 14;
    const x = zone.x;
    const y = zone.y;
    const w = zone.width;
    const h = zone.height;

    // Tray fill
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

    // Outer shadow
    ctx.shadowColor = "rgba(15, 23, 42, 0.35)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;
    ctx.strokeStyle = "rgba(148, 163, 184, 0.9)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Inner lip (like a tray edge)
    ctx.beginPath();
    ctx.moveTo(x + 4, y + 6);
    ctx.lineTo(x + w - 4, y + 6);
    ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Icon + label
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

  // Item background
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

  // Base outline
  ctx.strokeStyle = "rgba(15, 23, 42, 0.6)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Correct / wrong highlight
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

    // Score change pill
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
    ctx.quadraticCurveTo(pillX + pillWidth, pillY + pillHeight, pillX + pillWidth - pr, pillY + pillHeight);
    ctx.lineTo(pillX + pr, pillY + pillHeight);
    ctx.quadraticCurveTo(pillX, pillY + pillHeight, pillX, pillY + pillHeight - pr);
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

   // Item text: name
  ctx.fillStyle = "#ecf0f1";
  ctx.font = "16px system-ui";
  wrapText(item.name, x + 14, y + 26, w - 28, 20);

  // Item text: hazard type (smaller, secondary)
  if (item.hazardType) {
    ctx.fillStyle = "rgba(226, 232, 240, 0.9)";
    ctx.font = "12px system-ui";
    ctx.fillText(`Hazard: ${item.hazardType}`, x + 14, y + h - 12);
  }
}


// Simple multi-line text wrapper
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
  // Move item towards target if in answering state (simple conveyor slide-in)
  if (gameState === "answering" && currentItem && itemTargetX !== null && !isDragging) {
    const dx = itemTargetX - currentItem.x;
    // Only move if not already very close
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
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  const clientY = event.touches ? event.touches[0].clientY : event.clientY;
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

  // Did we drop inside any zone?
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
    statusText.textContent = "Drop the item into one of the zones.";
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
  } else {
    delta = -5;
    score += delta;
    wasCorrect = false;
  }

  totalDecisions += 1;
  const accuracy = totalDecisions === 0
    ? 0
    : Math.round((correctDecisions / totalDecisions) * 100);

  // Store result for drawing outline + pill on THIS item
  lastResult = { correct: wasCorrect, delta };

  // TOP BAR shows time + accuracy
  const timeText = `Time: ${timeTakenSeconds.toFixed(1)}s`;
  const accuracyText = `Accuracy: ${accuracy}%`;
  statusText.textContent = `${timeText}  •  ${accuracyText}`;

  scoreText.textContent = `Score: ${score}`;

  // Switch to feedback state: item locked, show pill/outline, wait for Next
  gameState = "feedback";
  nextButton.disabled = false;
}
function goToNextItem() {
  if (gameState !== "feedback") return;

  // Clear last result so pill/outline disappears on new item
  lastResult = null;

  // Spawn next item and reset timer
  currentItem = createRandomItem();
  startTime = performance.now();
  gameState = "answering";
  nextButton.disabled = true;

  // Reset time display (accuracy remains)
  statusText.textContent = `Time: 0.0s  •  Accuracy: ${
    totalDecisions === 0
      ? 0
      : Math.round((correctDecisions / totalDecisions) * 100)
  }%`;
}

// --- Initialise ---
function initGame() {
  score = 0;
  totalDecisions = 0;
  correctDecisions = 0;
  lastResult = null;
  gameState = "answering";
  levelText.textContent = "Level 1";

  currentItem = createRandomItem();
  startTime = performance.now(); // start timer for first item

  statusText.textContent = `Time: 0.0s  •  Accuracy: 0%`;
  scoreText.textContent = `Score: ${score}`;
  nextButton.disabled = true; // can't go next until you answer
}

canvas.addEventListener("mousedown", handlePointerDown);
canvas.addEventListener("mousemove", handlePointerMove);
canvas.addEventListener("mouseup", handlePointerUp);
canvas.addEventListener("mouseleave", handlePointerUp);

// Touch support
canvas.addEventListener("touchstart", handlePointerDown, { passive: false });
canvas.addEventListener("touchmove", handlePointerMove, { passive: false });
canvas.addEventListener("touchend", handlePointerUp, { passive: false });
nextButton.addEventListener("click", goToNextItem);

initGame();
render();
