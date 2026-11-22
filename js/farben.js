// ==========================================================
// farben.js – Farbwähler unten rechts
// Setzt <html data-farbe="…">. Alle Farben stehen als CSS-Variablen in
// style.css und farben.css – ein einziges Attribut färbt die ganze Seite um.
// Standard ist "hell" (steht als data-farbe im <html>-Tag jeder Seite).
// Die Wahl wird im Browser gemerkt (localStorage).
// ==========================================================

const FARBEN = [
  { wert: "hell",     name: "Hell – Apple-Blau & Orange (Standard)" },
  { wert: "nacht",    name: "Nacht – Violett & Türkis" },
  { wert: "terminal", name: "Terminal – Graphit & Grün" },
  { wert: "tiefsee",  name: "Tiefsee – Petrol & Koralle" },
  { wert: "papier",   name: "Papier – Creme & Koralle" },
];

function setzeFarbe(wert) {
  if (wert === "nacht") {
    delete document.documentElement.dataset.farbe;   // Standard: Werte aus style.css
  } else {
    document.documentElement.dataset.farbe = wert;
  }
  try { localStorage.setItem("farbe", wert); } catch { /* z. B. privater Modus */ }

  for (const knopf of document.querySelectorAll(".farbwahl button")) {
    knopf.setAttribute("aria-pressed", knopf.dataset.wert === wert);
  }
}

function baueFarbwahl() {
  const leiste = document.createElement("div");
  leiste.className = "farbwahl";
  leiste.setAttribute("role", "group");
  leiste.setAttribute("aria-label", "Farbschema wählen");
  leiste.innerHTML = "<span>Farbe</span>" + FARBEN
    .map(f => `<button type="button" data-wert="${f.wert}" title="${f.name}" aria-label="${f.name}"></button>`)
    .join("");
  document.body.append(leiste);

  for (const knopf of leiste.querySelectorAll("button")) {
    knopf.addEventListener("click", () => setzeFarbe(knopf.dataset.wert));
  }
  setzeFarbe(document.documentElement.dataset.farbe || "nacht");
}

baueFarbwahl();
