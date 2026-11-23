// ==========================================================
// farben.js – gemeinsamer Werkzeugkasten am rechten Seitenrand
// Terminal, Atlas, Jean (HTML-Ansicht), Seitenindex und Farbschemata.
// Farben setzen nur <html data-farbe="…">; alles andere steht als CSS-Variable
// in style.css und farben.css. Standard ist "weiss" (Weiß & Orange).
// ==========================================================

const FARBEN = [
  { wert: "weiss",    name: "Weiß & Orange (Standard)" },
  { wert: "hell",     name: "Hell – Apple-Blau & Orange" },
  { wert: "papier",   name: "Papier – Creme & Koralle" },
  { wert: "nacht",    name: "Nacht – Violett & Türkis" },
  { wert: "terminal", name: "Terminal – Graphit & Grün" },
  { wert: "tiefsee",  name: "Tiefsee – Petrol & Koralle" },
];

const WERKZEUGE = [
  { id: "terminal", zeichen: ">_",  name: "Terminal öffnen (Taste ^)" },
  { id: "jean",     zeichen: "&lt;/&gt;", name: "Jean – HTML-Tags ein/aus" },
  { id: "index",    zeichen: "#",   name: "Index dieser Seite (alle <h2>)" },
  { id: "oben",     zeichen: "↑",   name: "Nach oben" },
];

function setzeFarbe(wert) {
  if (wert === "nacht") {
    delete document.documentElement.dataset.farbe;   // „nacht“ = Werte aus style.css
  } else {
    document.documentElement.dataset.farbe = wert;
  }
  try { localStorage.setItem("farbe", wert); } catch { /* z. B. privater Modus */ }
  for (const knopf of document.querySelectorAll(".farbwahl [data-wert]")) {
    knopf.setAttribute("aria-pressed", knopf.dataset.wert === wert);
  }
}

// Terminal gibt es nicht auf jeder Seite – dann wird js/terminal.js nachgeladen.
function mitTerminal(tab) {
  if (window.oeffneTerminal) return window.oeffneTerminal(tab);
  const pfad = (document.querySelector('script[src$="farben.js"]')?.getAttribute("src") || "js/farben.js")
    .replace("farben.js", "terminal.js");
  if (!document.querySelector('link[href$="terminal.css"]')) {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = pfad.replace("js/terminal.js", "css/terminal.css").replace("terminal.js", "../css/terminal.css");
    document.head.append(css);
  }
  const s = document.createElement("script");
  s.src = pfad;
  s.onload = () => window.oeffneTerminal && window.oeffneTerminal(tab);
  document.body.append(s);
}

function zeigeIndex(knopf) {
  let liste = document.querySelector(".werkzeug-index");
  if (liste) { liste.remove(); knopf.setAttribute("aria-expanded", "false"); return; }
  const titel = [...document.querySelectorAll("main h2, h2")].filter((h, i, a) => a.indexOf(h) === i);
  liste = document.createElement("nav");
  liste.className = "werkzeug-index";
  liste.setAttribute("aria-label", "Index dieser Seite");
  const zeilen = titel.map((h, i) => {
    if (!h.id) h.id = "abschnitt-" + (i + 1);
    const text = h.textContent.replace(/\s+/g, " ").trim().slice(0, 60);
    return `<a href="#${h.id}"><code>&lt;h2 id="${h.id}"&gt;</code><span>${text}</span></a>`;
  });
  liste.innerHTML = `<p><code>&lt;nav&gt;</code> Index dieser Seite</p>` +
    (zeilen.join("") || "<p>Auf dieser Seite gibt es keine &lt;h2&gt; – ehrlich gesagt ein bisschen leer hier.</p>");
  liste.addEventListener("click", (e) => {
    if (!e.target.closest("a")) return;
    liste.remove();
    knopf.setAttribute("aria-expanded", "false");
  });
  document.body.append(liste);
  knopf.setAttribute("aria-expanded", "true");
}

function werkzeug(id, knopf) {
  if (id === "terminal") return mitTerminal("shell");
  if (id === "atlas") return mitTerminal("atlas");
  if (id === "oben") return window.scrollTo({ top: 0, behavior: "smooth" });
  if (id === "index") return zeigeIndex(knopf);
  if (id === "jean") {
    const an = !document.documentElement.classList.contains("jean");
    document.documentElement.classList.toggle("jean", an);
    try { localStorage.setItem("jean", an ? "on" : "off"); } catch { /* egal */ }
    knopf.setAttribute("aria-pressed", an);
  }
}

function baueWerkzeugkasten() {
  const leiste = document.createElement("div");
  leiste.className = "farbwahl werkzeugkasten";
  leiste.setAttribute("role", "group");
  leiste.setAttribute("aria-label", "Werkzeugkasten");
  leiste.innerHTML =
    `<button type="button" class="werkzeug werkzeugkasten__atlas" data-tool="atlas" title="Fragen zum Portfolio stellen">Atlas</button>` +
    `<button type="button" class="werkzeug werkzeugkasten__schalter" aria-label="Werkzeuge und Farben" aria-expanded="false" aria-controls="werkzeugkasten-inhalt">+</button>` +
    `<div class="werkzeugkasten__inhalt" id="werkzeugkasten-inhalt"><div class="werkzeugkasten__tools">` +
      WERKZEUGE.map(w => `<button type="button" class="werkzeug" data-tool="${w.id}" title="${w.name}" aria-label="${w.name}">${w.zeichen}</button>`).join("") +
    `</div><span class="werkzeugkasten__trenner" aria-hidden="true"></span>` +
    `<div class="werkzeugkasten__farben" role="group" aria-label="Farbschema">` +
      FARBEN.map(f => `<button type="button" data-wert="${f.wert}" title="${f.name}" aria-label="${f.name}"></button>`).join("") +
    `</div></div>`;
  document.body.append(leiste);

  const schalter = leiste.querySelector(".werkzeugkasten__schalter");
  schalter.addEventListener("click", () => {
    const offen = schalter.getAttribute("aria-expanded") === "true";
    schalter.setAttribute("aria-expanded", String(!offen));
    schalter.textContent = offen ? "+" : "−";
  });

  for (const knopf of leiste.querySelectorAll("[data-wert]")) {
    knopf.addEventListener("click", () => setzeFarbe(knopf.dataset.wert));
  }
  for (const knopf of leiste.querySelectorAll("[data-tool]")) {
    knopf.addEventListener("click", () => werkzeug(knopf.dataset.tool, knopf));
  }
  const jeanKnopf = leiste.querySelector('[data-tool="jean"]');
  const jeanStatus = () => jeanKnopf.setAttribute("aria-pressed", document.documentElement.classList.contains("jean"));
  jeanStatus();
  window.addEventListener("load", jeanStatus);   // terminal.js setzt „jean“ erst nach diesem Skript
  let gespeichert = null;
  try { gespeichert = localStorage.getItem("farbe"); } catch { /* egal */ }
  setzeFarbe(gespeichert || document.documentElement.dataset.farbe || "weiss");
}

baueWerkzeugkasten();
