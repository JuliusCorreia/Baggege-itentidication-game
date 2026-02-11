// items.js
// Heathrow-style training items with clear categories and hazard types.

/*
Categories:
- cabin
- hold-only
- not-allowed-dangerous
- not-allowed-offensive
*/

const ITEMS = [
  // Cabin OK (normal items or within limits)
  { name: "Book", category: "cabin", hazardType: "None" },
  { name: "Mobile phone", category: "cabin", hazardType: "Electrical" },
  { name: "Tablet / iPad", category: "cabin", hazardType: "Electrical" },
  { name: "Headphones", category: "cabin", hazardType: "Electrical" },
  { name: "Toothpaste 75ml", category: "cabin", hazardType: "Toiletry (under 100ml)" }, // [web:19]
  { name: "Disposable razor (cartridge type)", category: "cabin", hazardType: "Personal grooming" }, // [web:18]
  { name: "Safety matches (1 small box)", category: "cabin", hazardType: "Small flammable (on person)" }, // [web:18]
  { name: "Deodorant spray 100ml", category: "cabin", hazardType: "Aerosol (under 100ml)" }, // [web:19]

  // Hold only – security risk items [web:18][web:28][web:29]
  { name: "Kitchen knife (20cm blade)", category: "hold-only", hazardType: "Sharp / weapon" },
  { name: "Large scissors (10cm blade)", category: "hold-only", hazardType: "Sharp / tool" },
  { name: "Box cutter / Stanley knife", category: "hold-only", hazardType: "Sharp / tool" },
  { name: "Loose razor blades", category: "hold-only", hazardType: "Sharp / blade" },
  { name: "Baseball bat", category: "hold-only", hazardType: "Blunt weapon" },
  { name: "Golf club", category: "hold-only", hazardType: "Blunt weapon" },
  { name: "Martial arts baton", category: "hold-only", hazardType: "Blunt weapon" },
  { name: "Heavy hammer", category: "hold-only", hazardType: "Tool / blunt weapon" },

  // Dangerous goods – not allowed anywhere [web:18][web:21][web:23]
  { name: "Bleach (1 litre bottle)", category: "not-allowed-dangerous", hazardType: "Corrosive / chemical" },
  { name: "Household paint thinner (1 litre)", category: "not-allowed-dangerous", hazardType: "Flammable liquid" },
  { name: "Petrol / lighter fuel bottle", category: "not-allowed-dangerous", hazardType: "Flammable liquid" },
  { name: "Fireworks pack", category: "not-allowed-dangerous", hazardType: "Explosive / pyrotechnic" },
  { name: "Weedkiller (concentrated)", category: "not-allowed-dangerous", hazardType: "Toxic / chemical" },
  { name: "Industrial-strength drain cleaner", category: "not-allowed-dangerous", hazardType: "Corrosive / chemical" },

  // Offensive / illegal-style weapons – not allowed anywhere [web:18][web:20][web:29][web:31]
  { name: "Pepper spray / mace", category: "not-allowed-offensive", hazardType: "Incapacitating spray" },
  { name: "Knuckle dusters", category: "not-allowed-offensive", hazardType: "Offensive weapon" },
  { name: "Throwing stars", category: "not-allowed-offensive", hazardType: "Sharp offensive weapon" },
  { name: "Extendable metal baton", category: "not-allowed-offensive", hazardType: "Offensive weapon" },
  { name: "Tear gas canister", category: "not-allowed-offensive", hazardType: "Incapacitating gas" }
];
