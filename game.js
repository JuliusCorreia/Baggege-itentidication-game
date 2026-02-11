// game.js

// Canvas setup
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const statusText = document.getElementById("status-text");
const scoreText = document.getElementById("score-text");
const levelText = document.getElementById("level-text");

let score = 0;
let currentItem = null;
let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

// --- Zones (we'll keep them simple rectangles for now) ---
const zones = [
  {
    id: "cabin",
    label: "Cabin OK",
    x: 40,
    y: 360,
    width: 180,
    height: 100,
    color: "#2ecc71"
  },
  {
    id: "hold-only",
    label: "Hold only",
    x: 260,
    y: 360,
    width: 180,
    height: 100,
    color: "#f1c40f"
  },
  {
    id: "not-allowed-dangerous",
    label: "Dangerous goods",
    x: 480,
    y: 360,
    width: 180,
    height: 100,
    color: "#e74c3c"
  },
  {
    id: "not-allowed-offensive",
    label: "Offensive weapon",
    x: 700,
    y: 360,
    width: 180,
    height: 100,
    color: "#8e44ad"
  }
];

// --- Simple item representation for now ---
function createRandomItem() {
  const itemData = ITEMS[Math.floor(Math.random() * ITEMS.length)];

  const width = 280;
  const height = 80;
  const startX = (canvas.width - width) / 2;
  const startY = 180;

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
    ctx.fillStyle = zone.color;
    ctx.globalAlpha = 0.16;
    ctx.fillRect(zone.x, zone.y, zone.width, zone.height);

    ctx.globalAlpha = 1;
    ctx.strokeStyle = zone.color;
    ctx.lineWidth = 2;
    ctx.strokeRect(zone.x, zone.y, zone.width, zone.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "14px system-ui";
    ctx.fillText(zone.label, zone.x + 10, zone.y + 24);
  });
}

function drawItem(item) {
  if (!item) return;

  ctx.fillStyle = item.color;
  ctx.beginPath();
  const r = 16;
  const x = item.x;
  const y = item.y;
  const w = item.width;
  const h = item.height;
  // rounded rectangle
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
  ctx.fill();

  ctx.fillStyle = "#ecf0f1";
  ctx.font = "16px system-ui";
  wrapText(item.name, x + 14, y + 24, w - 28, 20);
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
  if (!currentItem) return;
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
  const correctCategory = currentItem.category;
  const droppedCategory = zone.id;

  if (correctCategory === droppedCategory) {
    score += 10;
    statusText.textContent = `✅ Correct: ${currentItem.name} belongs in "${zone.label}".`;
  } else {
    score -= 5;
    statusText.textContent = `❌ Wrong: ${currentItem.name} is not "${zone.label}".`;
  }
  scoreText.textContent = `Score: ${score}`;

  // Load next item
  currentItem = createRandomItem();
}

// --- Initialise ---
function initGame() {
  score = 0;
  levelText.textContent = "Level 1";
  currentItem = createRandomItem();
  statusText.textContent = `Drag the item into the correct zone.`;
  scoreText.textContent = `Score: ${score}`;
}

canvas.addEventListener("mousedown", handlePointerDown);
canvas.addEventListener("mousemove", handlePointerMove);
canvas.addEventListener("mouseup", handlePointerUp);
canvas.addEventListener("mouseleave", handlePointerUp);

// Touch support
canvas.addEventListener("touchstart", handlePointerDown, { passive: false });
canvas.addEventListener("touchmove", handlePointerMove, { passive: false });
canvas.addEventListener("touchend", handlePointerUp, { passive: false });

initGame();
render();
