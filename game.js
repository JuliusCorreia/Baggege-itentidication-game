// game.js
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const statusText = document.getElementById("status-text");
const scoreText = document.getElementById("score-text");
const levelText = document.getElementById("level-text");

statusText.textContent = `Loaded ${ITEMS.length} training items.`;
scoreText.textContent = "Score: 0";
levelText.textContent = "Level 1";

// Simple visual test: draw one placeholder item rect
ctx.fillStyle = "#1abc9c";
ctx.fillRect(50, 200, 120, 60);
ctx.fillStyle = "#ecf0f1";
ctx.font = "14px system-ui";
ctx.fillText("Item here", 60, 235);
