// items.js
// Heathrow-style training items with clear categories.

/*
Categories:
- cabin
- hold-only
- not-allowed-dangerous
- not-allowed-offensive
*/

const ITEMS = [
  // Cabin OK (normal items or within limits)
  { name: "Book", category: "cabin" },
  { name: "Mobile phone", category: "cabin" },
  { name: "Tablet / iPad", category: "cabin" },
  { name: "Headphones", category: "cabin" },
  { name: "Toothpaste 75ml", category: "cabin" }, // under 100ml [web:19]
  { name: "Disposable razor (cartridge type)", category: "cabin" }, // allowed [web:18]
  { name: "Safety matches (1 small box)", category: "cabin" }, // on person [web:18]
  { name: "Deodorant spray 100ml", category: "cabin" }, // within liquid limit [web:19]

  // Hold only – security risk items [web:18][web:28][web:29]
  { name: "Kitchen knife (20cm blade)", category: "hold-only" },
  { name: "Large scissors (10cm blade)", category: "hold-only" },
  { name: "Box cutter / Stanley knife", category: "hold-only" },
  { name: "Loose razor blades", category: "hold-only" },
  { name: "Baseball bat", category: "hold-only" },
  { name: "Golf club", category: "hold-only" },
  { name: "Martial arts baton", category: "hold-only" },
  { name: "Heavy hammer", category: "hold-only" },

  // Dangerous goods – not allowed anywhere [web:18][web:21][web:23]
  { name: "Bleach (1 litre bottle)", category: "not-allowed-dangerous" },
  { name: "Household paint thinner (1 litre)", category: "not-allowed-dangerous" },
  { name: "Petrol / lighter fuel bottle", category: "not-allowed-dangerous" },
  { name: "Fireworks pack", category: "not-allowed-dangerous" },
  { name: "Weedkiller (concentrated)", category: "not-allowed-dangerous" },
  { name: "Industrial-strength drain cleaner", category: "not-allowed-dangerous" },

  // Offensive / illegal-style weapons – not allowed anywhere [web:18][web:20][web:29][web:31]
  { name: "Pepper spray / mace", category: "not-allowed-offensive" },
  { name: "Knuckle dusters", category: "not-allowed-offensive" },
  { name: "Throwing stars", category: "not-allowed-offensive" },
  { name: "Extendable metal baton", category: "not-allowed-offensive" },
  { name: "Tear gas canister", category: "not-allowed-offensive" }
];
