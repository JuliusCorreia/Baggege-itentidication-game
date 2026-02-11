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
- 3: expert / scenario items
*/

const ITEMS = [
  // =======================
  // LEVEL 1 – CABIN OK (basic)
  // =======================
  { name: "Book", category: "cabin", hazardType: "None", level: 1, icon: "📘" },
  { name: "Magazine", category: "cabin", hazardType: "None", level: 1, icon: "📰" },
  { name: "Mobile phone", category: "cabin", hazardType: "Electrical", level: 1, icon: "📱" },
  { name: "Tablet / iPad", category: "cabin", hazardType: "Electrical", level: 1, icon: "📱" },
  { name: "Headphones", category: "cabin", hazardType: "Electrical", level: 1, icon: "🎧" },
  { name: "E-reader / Kindle", category: "cabin", hazardType: "Electrical", level: 1, icon: "📚" },
  { name: "Jumper / hoodie", category: "cabin", hazardType: "Clothing", level: 1, icon: "👕" },
  { name: "Coat / jacket", category: "cabin", hazardType: "Clothing", level: 1, icon: "🧥" },
  { name: "Travel pillow", category: "cabin", hazardType: "Comfort item", level: 1, icon: "🛏️" },
  { name: "Pack of biscuits", category: "cabin", hazardType: "Food item", level: 1, icon: "🍪" },
  { name: "Sandwich / packed lunch", category: "cabin", hazardType: "Food item", level: 1, icon: "🥪" },
  { name: "Packet of crisps", category: "cabin", hazardType: "Food item", level: 1, icon: "🍟" },
  { name: "Soft toy", category: "cabin", hazardType: "None", level: 1, icon: "🧸" },

  // Level 1 – cabin liquids & toiletries (simple) [web:18][web:158][web:161]
  { name: "Toothpaste 75ml", category: "cabin", hazardType: "Toiletry (under 100ml)", level: 1, icon: "🧴" },
  { name: "Shampoo 90ml", category: "cabin", hazardType: "Toiletry (under 100ml)", level: 1, icon: "🧴" },
  { name: "Shower gel 100ml", category: "cabin", hazardType: "Toiletry (100ml max)", level: 1, icon: "🧼" },
  { name: "Small bottle of perfume 50ml", category: "cabin", hazardType: "Toiletry (under 100ml)", level: 1, icon: "🌸" },
  { name: "Contact lens solution 80ml", category: "cabin", hazardType: "Medical liquid (under 100ml)", level: 1, icon: "👁️" },

  // Level 1 – simple sports / harmless items [web:18]
  { name: "Tennis racquet", category: "cabin", hazardType: "Sports item – usually allowed", level: 1, icon: "🎾" },
  { name: "Snooker / pool cue", category: "cabin", hazardType: "Sports item – usually allowed", level: 1, icon: "🎱" },
  { name: "Football", category: "cabin", hazardType: "Soft sports item", level: 1, icon: "⚽" },
  { name: "Fishing rod", category: "cabin", hazardType: "Sports equipment – usually allowed", level: 1, icon: "🎣" },

  // Level 1 – simple “not allowed in cabin” liquids [web:18][web:158][web:161]
  { name: "Bottle of water 500ml (pre‑security)", category: "not-allowed-dangerous", hazardType: "Liquid over 100ml in cabin", level: 1, icon: "🥤" },
  { name: "Large soft drink 600ml", category: "not-allowed-dangerous", hazardType: "Liquid over 100ml in cabin", level: 1, icon: "🥤" },

  // =======================
  // LEVEL 1 – HOLD ONLY (obvious weapons/tools)
  // =======================
  { name: "Kitchen knife (20cm blade)", category: "hold-only", hazardType: "Sharp / weapon", level: 1, icon: "🔪" },
  { name: "Large scissors (10cm blade)", category: "hold-only", hazardType: "Sharp / tool", level: 1, icon: "✂️" },
  { name: "Chef’s knife", category: "hold-only", hazardType: "Sharp / weapon", level: 1, icon: "🔪" },
  { name: "Bread knife with serrated blade", category: "hold-only", hazardType: "Sharp / weapon", level: 1, icon: "🔪" },
  { name: "Baseball bat", category: "hold-only", hazardType: "Blunt weapon", level: 1, icon: "⚾" },
  { name: "Cricket bat", category: "hold-only", hazardType: "Blunt weapon", level: 1, icon: "🏏" },
  { name: "Golf club", category: "hold-only", hazardType: "Blunt weapon", level: 1, icon: "🏌️" },
  { name: "Claw hammer", category: "hold-only", hazardType: "Tool / blunt weapon", level: 1, icon: "🔨" },
  { name: "Small DIY toolkit (spanner, screwdriver)", category: "hold-only", hazardType: "Tools – not in cabin", level: 1, icon: "🧰" },
  { name: "Walking / hiking poles", category: "hold-only", hazardType: "Blunt item – not in cabin", level: 1, icon: "🚶" }, // [web:18]

  // =======================
  // LEVEL 1 – DANGEROUS GOODS (clear bans) [web:18][web:162]
  // =======================
  { name: "Bleach (1 litre bottle)", category: "not-allowed-dangerous", hazardType: "Corrosive / chemical", level: 1, icon: "🧴" },
  { name: "Petrol / lighter fuel bottle", category: "not-allowed-dangerous", hazardType: "Flammable liquid", level: 1, icon: "🛢️" },
  { name: "Fireworks pack", category: "not-allowed-dangerous", hazardType: "Explosive / pyrotechnic", level: 1, icon: "🎆" },
  { name: "Camping gas canister", category: "not-allowed-dangerous", hazardType: "Flammable gas", level: 1, icon: "🧯" },
  { name: "Non-safety matches (large box)", category: "not-allowed-dangerous", hazardType: "Flammable / ignition source", level: 1, icon: "🕯️" },
  { name: "Wet‑cell car battery", category: "not-allowed-dangerous", hazardType: "Corrosive battery", level: 1, icon: "🚗" },

  // =======================
  // LEVEL 1 – OFFENSIVE WEAPONS (obvious) [web:18][web:157]
  // =======================
  { name: "Pepper spray / mace", category: "not-allowed-offensive", hazardType: "Incapacitating spray", level: 1, icon: "🧪" },
  { name: "Knuckle dusters", category: "not-allowed-offensive", hazardType: "Offensive weapon", level: 1, icon: "🥊" },
  { name: "Catapult / slingshot", category: "not-allowed-offensive", hazardType: "Projectile weapon", level: 1, icon: "🏹" },
  { name: "Large hunting knife", category: "not-allowed-offensive", hazardType: "Prohibited blade", level: 1, icon: "🗡️" },

  // =================================================================
  // LEVEL 2 – CABIN OK (trickier decisions / more conditions)
  // =================================================================
  { name: "Safety matches (1 small box)", category: "cabin", hazardType: "Small flammable (on person)", level: 2, icon: "🧨" }, // [web:18]
  { name: "Disposable lighter (on person)", category: "cabin", hazardType: "Small lighter – limits apply", level: 2, icon: "⚠️" }, // [web:18]
  { name: "Deodorant spray 100ml", category: "cabin", hazardType: "Aerosol (under 100ml)", level: 2, icon: "🧴" },
  { name: "Hair spray 100ml", category: "cabin", hazardType: "Aerosol (under 100ml)", level: 2, icon: "💇" },
  { name: "Power bank 90Wh", category: "cabin", hazardType: "Lithium battery (cabin only)", level: 2, icon: "🔋" }, // [web:18]
  { name: "Bag of loose lithium-ion cells", category: "cabin", hazardType: "Spare lithium batteries (cabin only)", level: 2, icon: "📦" }, // [web:18]
  { name: "Laptop computer", category: "cabin", hazardType: "Electrical – must be screened separately", level: 2, icon: "💻" },
  { name: "DSLR camera with battery", category: "cabin", hazardType: "Electrical – battery powered", level: 2, icon: "📷" },
  { name: "E-cigarette / vape device", category: "cabin", hazardType: "Battery / vape – cabin only", level: 2, icon: "🚬" }, // [web:18]
  { name: "Insulin kit with needles", category: "cabin", hazardType: "Medical liquids and sharps", level: 2, icon: "💉" }, // [web:149]
  { name: "Portable oxygen concentrator (approved)", category: "cabin", hazardType: "Medical device – airline approval", level: 2, icon: "🫁" },
  { name: "CPAP machine", category: "cabin", hazardType: "Medical electrical device", level: 2, icon: "😴" },

  // =================================================================
  // LEVEL 2 – HOLD ONLY (more subtle tools / sports / edge cases)
  // =================================================================
  { name: "Box cutter / Stanley knife", category: "hold-only", hazardType: "Sharp / tool", level: 2, icon: "📦" },
  { name: "Loose razor blades", category: "hold-only", hazardType: "Sharp / blade", level: 2, icon: "🪒" },
  { name: "Martial arts baton", category: "hold-only", hazardType: "Blunt weapon", level: 2, icon: "🥋" },
  { name: "Heavy wrench", category: "hold-only", hazardType: "Tool / blunt weapon", level: 2, icon: "🔧" },
  { name: "Ice axe (climbing)", category: "hold-only", hazardType: "Sharp / tool", level: 2, icon: "🧗" },
  { name: "Cordless power drill", category: "hold-only", hazardType: "Power tool – not in cabin", level: 2, icon: "🛠️" },
  { name: "Sledgehammer", category: "hold-only", hazardType: "Heavy tool / weapon", level: 2, icon: "🔨" },
  { name: "Set of chisels", category: "hold-only", hazardType: "Sharp tools", level: 2, icon: "🪚" },
  { name: "Hockey stick", category: "hold-only", hazardType: "Blunt sports item", level: 2, icon: "🏒" },
  { name: "Bow and arrow set (sports)", category: "hold-only", hazardType: "Projectile sports weapon", level: 2, icon: "🏹" },

  // =================================================================
  // LEVEL 2 – DANGEROUS GOODS (more nuanced) [web:18][web:162]
  // =================================================================
  { name: "Household paint thinner (1 litre)", category: "not-allowed-dangerous", hazardType: "Flammable liquid", level: 2, icon: "🧴" },
  { name: "Weedkiller (concentrated)", category: "not-allowed-dangerous", hazardType: "Toxic / chemical", level: 2, icon: "🧪" },
  { name: "Industrial-strength drain cleaner", category: "not-allowed-dangerous", hazardType: "Corrosive / chemical", level: 2, icon: "🧴" },
  { name: "Large lithium battery 250Wh", category: "not-allowed-dangerous", hazardType: "High-energy battery", level: 2, icon: "🔋" },
  { name: "Self-contained oxygen cylinder", category: "not-allowed-dangerous", hazardType: "Compressed oxygen", level: 2, icon: "🩺" },
  { name: "Dry ice in large quantity", category: "not-allowed-dangerous", hazardType: "Asphyxiant / cold burn risk", level: 2, icon: "🧊" }, // Class 9 [web:162]
  { name: "Vehicle fuel system component with fuel residue", category: "not-allowed-dangerous", hazardType: "Component containing fuel vapour", level: 2, icon: "🚙" }, // [web:18]

  // =================================================================
  // LEVEL 2 – OFFENSIVE WEAPONS (trickier) [web:18][web:157][web:160]
  // =================================================================
  { name: "Throwing stars", category: "not-allowed-offensive", hazardType: "Sharp offensive weapon", level: 2, icon: "🌀" },
  { name: "Extendable metal baton", category: "not-allowed-offensive", hazardType: "Offensive weapon", level: 2, icon: "🪃" },
  { name: "Tear gas canister", category: "not-allowed-offensive", hazardType: "Incapacitating gas", level: 2, icon: "🧪" },
  { name: "Stun gun / taser", category: "not-allowed-offensive", hazardType: "Electrical weapon", level: 2, icon: "⚡" },
  { name: "Replica handgun", category: "not-allowed-offensive", hazardType: "Replica firearm", level: 2, icon: "🔫" },
  { name: "Crossbow (sporting)", category: "hold-only", hazardType: "Projectile weapon – not in cabin", level: 2, icon: "🏹" },

  // =================================================================
  // LEVEL 3 – HIGHER-RISK / SPECIALIST ITEMS
  // =================================================================

  // Level 3 – explosives & pyrotechnics [web:18][web:157]
  { name: "Box of consumer fireworks", category: "not-allowed-dangerous", hazardType: "Explosive / pyrotechnic", level: 3, icon: "🎆" },
  { name: "Signal flares", category: "not-allowed-dangerous", hazardType: "Pyrotechnic distress flares", level: 3, icon: "🚨" },
  { name: "Smoke grenades / smoke canisters", category: "not-allowed-dangerous", hazardType: "Smoke-generating devices", level: 3, icon: "💨" },
  { name: "Bag of gunpowder and fuses", category: "not-allowed-dangerous", hazardType: "Explosive powder", level: 3, icon: "🧨" },

  // Level 3 – cylinders / gases / fuel [web:18][web:155][web:162]
  { name: "Large industrial gas cylinder (non-empty)", category: "not-allowed-dangerous", hazardType: "Compressed gas cylinder", level: 3, icon: "🥽" },
  { name: "Diving cylinder with regulator attached", category: "hold-only", hazardType: "High-pressure cylinder – airline approval", level: 3, icon: "🤿" },
  { name: "Camping gas cartridge pack", category: "not-allowed-dangerous", hazardType: "Flammable gas", level: 3, icon: "🔥" },
  { name: "Blowtorch with gas cylinder attached", category: "not-allowed-dangerous", hazardType: "Flammable gas and ignition source", level: 3, icon: "🔥" },

  // Level 3 – corrosive / toxic / oxidising [web:18][web:159][web:162]
  { name: "Container of concentrated bleach (industrial)", category: "not-allowed-dangerous", hazardType: "Oxidiser / corrosive liquid", level: 3, icon: "🧪" },
  { name: "Bottle of strong acid (laboratory-grade)", category: "not-allowed-dangerous", hazardType: "Corrosive liquid", level: 3, icon: "⚗️" },
  { name: "Bottle labelled pesticide / insecticide", category: "not-allowed-dangerous", hazardType: "Toxic chemical", level: 3, icon: "☠️" },
  { name: "Industrial adhesive in large metal tin", category: "not-allowed-dangerous", hazardType: "Flammable / harmful liquid", level: 3, icon: "🧫" },
  { name: "Creosote / wood treatment can", category: "not-allowed-dangerous", hazardType: "Flammable / toxic", level: 3, icon: "🪵" },

  // Level 3 – mercury / magnets / radioactive [web:18][web:159][web:162]
  { name: "Instrument containing mercury", category: "not-allowed-dangerous", hazardType: "Corrosive / toxic mercury device", level: 3, icon: "🌡️" },
  { name: "Large laboratory magnet / magnetron", category: "not-allowed-dangerous", hazardType: "Strong magnetic device", level: 3, icon: "🧲" },
  { name: "Radioactive sample (labelled)", category: "not-allowed-dangerous", hazardType: "Radioactive material", level: 3, icon: "☢️" },
  { name: "Medical radiopharmaceutical vial", category: "not-allowed-dangerous", hazardType: "Radioactive medical material", level: 3, icon: "💊" },

  // Level 3 – complex offensive items [web:18][web:148][web:157]
  { name: "Combat knife with serrated blade", category: "not-allowed-offensive", hazardType: "Prohibited edged weapon", level: 3, icon: "🗡️" },
  { name: "Improvised stun device with exposed wires", category: "not-allowed-offensive", hazardType: "Improvised electrical weapon", level: 3, icon: "⚡" },
  { name: "Harpoon or spear gun in hard case", category: "hold-only", hazardType: "Projectile spear gun – not in cabin", level: 3, icon: "🎣" },
  { name: "Bag containing improvised explosive components", category: "not-allowed-dangerous", hazardType: "Improvised explosive", level: 3, icon: "💣" },
  { name: "Modified walking stick with concealed blade", category: "not-allowed-offensive", hazardType: "Concealed weapon", level: 3, icon: "🩼" },

  // Level 3 – firearms / replicas / advanced weapons [web:148][web:160]
  { name: "Hunting rifle (declared, unloaded)", category: "hold-only", hazardType: "Firearm – airline / police approval", level: 3, icon: "🎯" },
  { name: "Ammunition in original packaging", category: "hold-only", hazardType: "Small arms ammunition – strict limits", level: 3, icon: "🧳" },
  { name: "Replica assault rifle", category: "not-allowed-offensive", hazardType: "Replica firearm", level: 3, icon: "🔫" },
  { name: "Taser with cartridge", category: "not-allowed-offensive", hazardType: "Electro-shock weapon", level: 3, icon: "⚡" },

  // Level 3 – high-risk tools / machinery [web:155][web:162]
  { name: "Chainsaw with emptied fuel tank", category: "hold-only", hazardType: "Power tool – fuel drained, airline rules", level: 3, icon: "🪚" },
  { name: "Petrol strimmer with fuel smell", category: "not-allowed-dangerous", hazardType: "Item containing fuel / vapour", level: 3, icon: "⛽" },
  { name: "Industrial laser cutter", category: "not-allowed-dangerous", hazardType: "High-energy equipment", level: 3, icon: "🔦" },
  { name: "Large angle grinder", category: "hold-only", hazardType: "Cutting power tool", level: 3, icon: "🛠️" },
];
