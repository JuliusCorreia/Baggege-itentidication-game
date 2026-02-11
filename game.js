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

  const niceZoneLabel = zone.label;
  let message;

  if (correctCategory === droppedCategory) {
    score += 10;
    message = `Correct ✔  ${currentItem.name} belongs in "${niceZoneLabel}".`;
  } else {
    score -= 5;
    const correctZone = zones.find(z => z.id === correctCategory);
    const correctLabel = correctZone ? correctZone.label : correctCategory;
    message = `Wrong ✖  ${currentItem.name} should be "${correctLabel}", not "${niceZoneLabel}".`;
  }

  statusText.textContent = message;
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
