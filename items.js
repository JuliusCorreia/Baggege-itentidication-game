// items.js
// Heathrow-style training items with clear categories, hazard types, levels, and icons.

/*
Categories:
- cabin
- hold-only
- not-allowed-dangerous
- not-allowed-offensive

Levels:
- 1: core, easier items
- 2: trickier / more advanced items
- 3: expert / scenario items (placeholder for future)
*/

const ITEMS = [
  // ===== LEVEL 1 – CABIN OK (basic) =====
  { name: "Book", category: "cabin", hazardType: "None", level: 1, icon: "📘" },
  { name: "Mobile phone", category: "cabin", hazardType: "Electrical", level: 1, icon: "📱" },
  { name: "Tablet / iPad", category: "cabin", hazardType: "Electrical", level: 1, icon: "📱" },
  { name: "Headphones", category: "cabin", hazardType: "Electrical", level: 1, icon: "🎧" },
  { name: "Jumper / hoodie", category: "cabin", hazardType: "Clothing", level: 1, icon: "👕" },
  { name: "Toothpaste 75ml", category: "cabin", hazardType: "Toiletry (under 100ml)", level: 1, icon: "🧴" }, // [web:19]
  { name: "Shampoo 90ml", category: "cabin", hazardType: "Toiletry (under 100ml)", level: 1, icon: "🧴" }, // [web:19]
  { name: "Disposable razor (cartridge type)", category: "cabin", hazardType: "Personal grooming", level: 1, icon: "🪒" }, // [web:18]
  { name: "Pack of biscuits", category: "cabin", hazardType: "Food item", level: 1, icon: "🍪" },

  // ===== LEVEL 1 – HOLD ONLY (obvious weapons/tools) ===== [web:18][web:28][web:29]
  { name: "Kitchen knife (20cm blade)", category: "hold-only", hazardType: "Sharp / weapon", level: 1, icon: "🔪" },
  { name: "Large scissors (10cm blade)", category: "hold-only", hazardType: "Sharp / tool", level: 1, icon: "✂️" },
  { name: "Chef’s knife", category: "hold-only", hazardType: "Sharp / weapon", level: 1, icon: "🔪" },
  { name: "Baseball bat", category: "hold-only", hazardType: "Blunt weapon", level: 1, icon: "🏏" },
  { name: "Golf club", category: "hold-only", hazardType: "Blunt weapon", level: 1, icon: "🏌️" },
  { name: "Claw hammer", category: "hold-only", hazardType: "Tool / blunt weapon", level: 1, icon: "🔨" },

  // ===== LEVEL 1 – DANGEROUS GOODS (clear bans) ===== [web:18][web:21][web:23]
  { name: "Bleach (1 litre bottle)", category: "not-allowed-dangerous", hazardType: "Corrosive / chemical", level: 1, icon: "🧴" },
  { name: "Petrol / lighter fuel bottle", category: "not-allowed-dangerous", hazardType: "Flammable liquid", level: 1, icon: "🛢" },
  { name: "Fireworks pack", category: "not-allowed-dangerous", hazardType: "Explosive / pyrotechnic", level: 1, icon: "🎆" },
  { name: "Camping gas canister", category: "not-allowed-dangerous", hazardType: "Flammable gas", level: 1, icon: "🧯" },

  // ===== LEVEL 1 – OFFENSIVE WEAPONS (obvious) ===== [web:18][web:20][web:29][web:31]
  { name: "Pepper spray / mace", category: "not-allowed-offensive", hazardType: "Incapacitating spray", level: 1, icon: "🧪" },
  { name: "Knuckle dusters", category: "not-allowed-offensive", hazardType: "Offensive weapon", level: 1, icon: "🧤" },

  // ===== LEVEL 2 – CABIN OK (trickier) =====
  { name: "Safety matches (1 small box)", category: "cabin", hazardType: "Small flammable (on person)", level: 2, icon: "🧨" }, // [web:18]
  { name: "Deodorant spray 100ml", category: "cabin", hazardType: "Aerosol (under 100ml)", level: 2, icon: "🧴" }, // [web:19]
  { name: "Power bank 90Wh", category: "cabin", hazardType: "Lithium battery (cabin only)", level: 2, icon: "🔋" }, // [web:19][web:20]
  { name: "Laptop computer", category: "cabin", hazardType: "Electrical", level: 2, icon: "💻" },

  // ===== LEVEL 2 – HOLD ONLY (more subtle) =====
  { name: "Box cutter / Stanley knife", category: "hold-only", hazardType: "Sharp / tool", level: 2, icon: "📦" },
  { name: "Loose razor blades", category: "hold-only", hazardType: "Sharp / blade", level: 2, icon: "🪒" },
  { name: "Martial arts baton", category: "hold-only", hazardType: "Blunt weapon", level: 2, icon: "🥋" },
  { name: "Heavy wrench", category: "hold-only", hazardType: "Tool / blunt weapon", level: 2, icon: "🔧" },
  { name: "Ice axe (climbing)", category: "hold-only", hazardType: "Sharp / tool", level: 2, icon: "🧗" },

  // ===== LEVEL 2 – DANGEROUS GOODS (more nuanced) =====
  { name: "Household paint thinner (1 litre)", category: "not-allowed-dangerous", hazardType: "Flammable liquid", level: 2, icon: "🧴" },
  { name: "Weedkiller (concentrated)", category: "not-allowed-dangerous", hazardType: "Toxic / chemical", level: 2, icon: "🧪" },
  { name: "Industrial-strength drain cleaner", category: "not-allowed-dangerous", hazardType: "Corrosive / chemical", level: 2, icon: "🧴" },
  { name: "Large lithium battery 250Wh", category: "not-allowed-dangerous", hazardType: "High-energy battery", level: 2, icon: "🔋" },

  // ===== LEVEL 2 – OFFENSIVE WEAPONS (trickier) =====
  { name: "Throwing stars", category: "not-allowed-offensive", hazardType: "Sharp offensive weapon", level: 2, icon: "🌀" },
  { name: "Extendable metal baton", category: "not-allowed-offensive", hazardType: "Offensive weapon", level: 2, icon: "🪃" },
  { name: "Tear gas canister", category: "not-allowed-offensive", hazardType: "Incapacitating gas", level: 2, icon: "🧪" },
  { name: "Stun gun / taser", category: "not-allowed-offensive", hazardType: "Electrical weapon", level: 2, icon: "⚡" },

  // ===== LEVEL 3 – PLACEHOLDER (for future expansion) =====
  { name: "Radioactive sample (labelled)", category: "not-allowed-dangerous", hazardType: "Radioactive", level: 3, icon: "☢" },
  { name: "Industrial laser cutter", category: "not-allowed-dangerous", hazardType: "High-energy equipment", level: 3, icon: "🔦" },
  { name: "Improvised explosive device", category: "not-allowed-dangerous", hazardType: "Improvised explosive", level: 3, icon: "💣" },
  { name: "Prohibited combat knife", category: "not-allowed-offensive", hazardType: "Prohibited weapon", level: 3, icon: "🗡" }
];
