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
  const werkzeuge = document.createElement("details");
  werkzeuge.innerHTML = '<summary>Werkzeuge</summary><button type="button">Farben zurücksetzen</button>';
  const farbvariablen = [
    ["Akzent", "--farbe-akzent-fuellung"],
    ["Zweitfarbe", "--farbe-zweit"],
  ];
  const stil = document.documentElement.style;
  for (const [name, variable] of farbvariablen) {
    const label = document.createElement("label");
    label.textContent = name + " ";
    const input = document.createElement("input");
    input.type = "color";
    const aktualisiere = () => {
      const farbe = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
      if (/^#[0-9a-f]{6}$/i.test(farbe)) input.value = farbe;
    };
    input.addEventListener("input", () => stil.setProperty(variable, input.value));
    werkzeuge.querySelector("button").addEventListener("click", () => {
      stil.removeProperty(variable);
      aktualisiere();
    });
    leiste.addEventListener("click", aktualisiere);
    label.append(input);
    werkzeuge.append(label);
    aktualisiere();
  }
  leiste.append(werkzeuge);
  setzeFarbe(document.documentElement.dataset.farbe || "hell"); // Rückfall = Standard „hell“, wie im <html>-Tag
}

baueFarbwahl();
