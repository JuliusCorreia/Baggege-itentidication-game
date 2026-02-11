// items.js
// Heathrow-style training items with clear categories, hazard types, and levels.

/*
Categories:
- cabin
- hold-only
- not-allowed-dangerous
- not-allowed-offensive

Levels:
- 1: core, easier items
- 2: trickier / more advanced items
*/

const ITEMS = [
  // Cabin OK – Level 1
  { name: "Book", category: "cabin", hazardType: "None", level: 1 },
  { name: "Mobile phone", category: "cabin", hazardType: "Electrical", level: 1 },
  { name: "Tablet / iPad", category: "cabin", hazardType: "Electrical", level: 1 },
  { name: "Headphones", category: "cabin", hazardType: "Electrical", level: 1 },
  { name: "Toothpaste 75ml", category: "cabin", hazardType: "Toiletry (under 100ml)", level: 1 }, // [web:19]
  { name: "Disposable razor (cartridge type)", category: "cabin", hazardType: "Personal grooming", level: 1 }, // [web:18]

  // Cabin OK – Level 2 (slightly trickier)
  { name: "Safety matches (1 small box)", category: "cabin", hazardType: "Small flammable (on person)", level: 2 }, // [web:18]
  { name: "Deodorant spray 100ml", category: "cabin", hazardType: "Aerosol (under 100ml)", level: 2 }, // [web:19]

  // Hold only – Level 1 [web:18][web:28][web:29]
  { name: "Kitchen knife (20cm blade)", category: "hold-only", hazardType: "Sharp / weapon", level: 1 },
  { name: "Large scissors (10cm blade)", category: "hold-only", hazardType: "Sharp / tool", level: 1 },
  { name: "Baseball bat", category: "hold-only", hazardType: "Blunt weapon", level: 1 },
  { name: "Golf club", category: "hold-only", hazardType: "Blunt weapon", level: 1 },

  // Hold only – Level 2
  { name: "Box cutter / Stanley knife", category: "hold-only", hazardType: "Sharp / tool", level: 2 },
  { name: "Loose razor blades", category: "hold-only", hazardType: "Sharp / blade", level: 2 },
  { name: "Martial arts baton", category: "hold-only", hazardType: "Blunt weapon", level: 2 },
  { name: "Heavy hammer", category: "hold-only", hazardType: "Tool / blunt weapon", level: 2 },

  // Dangerous goods – Level 1 [web:18][web:21][web:23]
  { name: "Bleach (1 litre bottle)", category: "not-allowed-dangerous", hazardType: "Corrosive / chemical", level: 1 },
  { name: "Petrol / lighter fuel bottle", category: "not-allowed-dangerous", hazardType: "Flammable liquid", level: 1 },
  { name: "Fireworks pack", category: "not-allowed-dangerous", hazardType: "Explosive / pyrotechnic", level: 1 },

  // Dangerous goods – Level 2
  { name: "Household paint thinner (1 litre)", category: "not-allowed-dangerous", hazardType: "Flammable liquid", level: 2 },
  { name: "Weedkiller (concentrated)", category: "not-allowed-dangerous", hazardType: "Toxic / chemical", level: 2 },
  { name: "Industrial-strength drain cleaner", category: "not-allowed-dangerous", hazardType: "Corrosive / chemical", level: 2 },

  // Offensive / illegal-style weapons – Level 1 [web:18][web:20][web:29][web:31]
  { name: "Pepper spray / mace", category: "not-allowed-offensive", hazardType: "Incapacitating spray", level: 1 },
  { name: "Knuckle dusters", category: "not-allowed-offensive", hazardType: "Offensive weapon", level: 1 },

  // Offensive / illegal-style weapons – Level 2
  { name: "Throwing stars", category: "not-allowed-offensive", hazardType: "Sharp offensive weapon", level: 2 },
  { name: "Extendable metal baton", category: "not-allowed-offensive", hazardType: "Offensive weapon", level: 2 },
  { name: "Tear gas canister", category: "not-allowed-offensive", hazardType: "Incapacitating gas", level: 2 }
];
