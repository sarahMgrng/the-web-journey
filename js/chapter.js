// ==========================================================
// chapter.js – füllt das Kapitel-Template (kapitel.html)
// 1. Nummer aus der Adresse lesen   (kapitel.html?nr=2 → 2)
// 2. Schnellnavigation 01–07
// 3. Vorlesung anzeigen (+ Sprungmarken zu den Abschnitten)
// 4. Vorherige / nächste Vorlesung
// ==========================================================

const artikel = document.getElementById("kapitel");


// ---------- 1. Nummer aus der Adresse ----------
const parameter = new URLSearchParams(window.location.search);
const aktuelleNr = Number(parameter.get("nr"));

function istGueltigeNr(nr) {
  return Number.isInteger(nr) && nr >= 1 && nr <= ANZAHL_VORLESUNGEN;
}


// ---------- 2. Schnellnavigation 01–07 ----------
function zeigeSprungNavigation() {
  let html = "";
  for (let nr = 1; nr <= ANZAHL_VORLESUNGEN; nr++) {
    // aria-current sagt Screenreadern (und CSS): Das ist die aktuelle Seite
    const aktuell = nr === aktuelleNr ? ' aria-current="page"' : "";
    html += `<li><a href="kapitel.html?nr=${nr}"${aktuell} aria-label="Vorlesung ${nr}">${zweistellig(nr)}</a></li>`;
  }
  document.getElementById("sprung-liste").innerHTML = html;
}


// ---------- 3. Vorlesung anzeigen ----------
function zeigeVorlesung(vorlesung) {
  document.title = `${vorlesung.titel} · The Web Journey`;

  // Kopfbereich: Nummer, Titel, Datum, Status, Kurzbeschreibung
  let html = `
    <header class="kapitel-kopf">
      <p class="eyebrow">Vorlesung ${zweistellig(vorlesung.nr)}</p>
      <h1>${vorlesung.titel}</h1>
      <div class="kapitel-kopf__meta">
        ${vorlesung.datum ? `<span>${formatiereDatum(vorlesung.datum)}</span>` : ""}
        ${statusBadge(vorlesung.status)}
      </div>
      ${vorlesung.beschreibung ? `<p class="kapitel-kopf__lead">${vorlesung.beschreibung}</p>` : ""}
    </header>`;

  if (vorlesung.status === "demo") {
    html += `<p class="demo-banner"><strong>Entwurf:</strong> Aus den Skripten zusammengefasst,
             aber noch nicht abschließend von mir geprüft. Offene Punkte stehen unten unter „Offene Fragen & Lücken“.</p>`;
  }

  if (vorlesung.status === "platzhalter") {
    html += `<p class="platzhalter-text">Diese Vorlesung wird im Laufe des Semesters ergänzt.</p>`;
  } else if (window.marked) {
    // marked.parse wandelt den Markdown-Text in HTML um
    html += `<div class="prose">${marked.parse(vorlesung.inhalt)}</div>`;
  } else {
    html += `<p class="fehler-hinweis">Die Markdown-Bibliothek konnte nicht geladen werden (keine Internetverbindung?).</p>`;
  }

  artikel.innerHTML = html;
  markiereHandnotizen(artikel);
  setzeSprungmarken();
  macheCodeAusfuehrbar();
}


// ---------- 3. Handnotizen ----------
// Absätze, die mit ✏️ beginnen, sind meine eigenen Notizen von den Folien.
// Sie erscheinen in Handschrift – so wie Herr Noll seine Folien von Hand kommentiert.
function markiereHandnotizen(bereich) {
  for (const absatz of bereich.querySelectorAll(".prose p, .prose li")) {
    if (absatz.textContent.trim().startsWith("✏️")) absatz.classList.add("handnotiz");
  }
}


// ---------- 3a. Sprungmarken: Leiste „Auf dieser Seite“ ----------
// Jede Überschrift bekommt eine id (aus "Meine Learnings" wird "meine-learnings").
// So kann man direkt hineinspringen: kapitel.html?nr=3#meine-learnings
function setzeSprungmarken() {
  const prose = artikel.querySelector(".prose");
  if (!prose) return;

  const vergeben = new Set();   // falls zwei Überschriften gleich heißen: "-2" anhängen
  for (const ueberschrift of prose.querySelectorAll("h2, h3")) {
    let id = alsAnker(ueberschrift.textContent);
    while (vergeben.has(id)) id += "-2";
    vergeben.add(id);
    ueberschrift.id = id;
  }

  // Leiste nur aus den großen Abschnitten (h2) bauen
  const abschnitte = [...prose.querySelectorAll("h2")];
  if (abschnitte.length < 2) return;

  const leiste = document.createElement("nav");
  leiste.className = "abschnitt-leiste";
  leiste.setAttribute("aria-label", "Auf dieser Seite");
  leiste.innerHTML = abschnitte
    .map(h2 => `<a href="#${h2.id}">${maskiere(h2.textContent)}</a>`)
    .join("");
  prose.before(leiste);
}

// Der Inhalt kommt erst nach dem Laden dazu. Darum springt der Browser bei
// kapitel.html?nr=3#meine-learnings nicht von selbst – das holen wir am Ende von start() nach.
// "instant": ohne weiches Scrollen, sonst bricht der Browser den Sprung beim Nachladen ab.
function springeZumAnker() {
  if (!location.hash) return;
  document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: "instant" });
}


// ---------- 3b. JavaScript-Beispiele ausführbar machen ----------
// Unter jeden ```js-Block kommt ein Button „▶ Ausführen“ und ein Terminal-Fenster.
// Der Code ist bearbeitbar – man kann also direkt ausprobieren, was passiert.
function macheCodeAusfuehrbar() {
  for (const code of artikel.querySelectorAll(".prose pre > code.language-js")) {
    const block = code.parentElement;
    // "plaintext-only": Enter erzeugt einen echten Zeilenumbruch statt HTML (<div>, <br>).
    // Ältere Browser kennen den Wert nicht → dann normales "true".
    try {
      code.contentEditable = "plaintext-only";
    } catch {
      code.contentEditable = "true";
    }
    code.spellcheck = false;

    const leiste = document.createElement("div");
    leiste.className = "code-leiste";
    leiste.innerHTML = `<button type="button" class="code-knopf">▶ Ausführen</button>`;

    const terminal = document.createElement("pre");
    terminal.className = "code-terminal";
    terminal.hidden = true;
    terminal.setAttribute("aria-live", "polite");   // Screenreader lesen die Ausgabe vor

    block.after(leiste, terminal);
    leiste.querySelector("button").addEventListener("click", () => {
      terminal.hidden = false;
      // plaintext-only liefert echte "\n" im textContent; beim Ersatzmodus wandelt erst innerText <br>/<div> in "\n" um
      const quelltext = code.contentEditable === "plaintext-only" ? code.textContent : code.innerText;
      terminal.textContent = fuehreAus(quelltext);
    });
  }
}

// Führt den Code aus und gibt alles zurück, was er mit console.log ausgibt.
function fuehreAus(quelltext) {
  const zeilen = [];
  const originalLog = console.log;
  // console.log kurz "umleiten": Funktionen sind Werte, also können wir sie austauschen
  console.log = (...werte) => zeilen.push("> " + werte.map(w => formatiereWert(w)).join(" "));

  try {
    new Function(quelltext)();   // Code als eigene Funktion ausführen (nur eigene Inhalte, siehe ARCHITECTURE.md)
  } catch (fehler) {
    zeilen.push(`✖ ${fehler.name}: ${fehler.message}`);
  } finally {
    console.log = originalLog;   // immer zurücksetzen – auch nach einem Fehler
  }

  return zeilen.length ? zeilen.join("\n") : "(keine Ausgabe – probier mal console.log(…))";
}

// Werte ähnlich wie in der Browser-Konsole anzeigen: [8, 9, 12] · {name: "Peter", hasCar: true}
function formatiereWert(wert, verschachtelt = false) {
  if (typeof wert === "string") return verschachtelt ? `"${wert}"` : wert;
  if (Array.isArray(wert)) return "[" + wert.map(w => formatiereWert(w, true)).join(", ") + "]";
  if (wert && typeof wert === "object") {
    return "{" + Object.entries(wert).map(([k, w]) => `${k}: ${formatiereWert(w, true)}`).join(", ") + "}";
  }
  return String(wert);
}


// ---------- 4. Vorherige / nächste Vorlesung ----------
async function zeigeBlaettern() {
  let html = "";

  if (aktuelleNr > 1) {
    const vorherige = await ladeVorlesung(aktuelleNr - 1);
    html += `
      <a href="kapitel.html?nr=${vorherige.nr}">
        <span>← Vorlesung ${zweistellig(vorherige.nr)}</span>
        <strong>${vorherige.titel}</strong>
      </a>`;
  }

  if (aktuelleNr < ANZAHL_VORLESUNGEN) {
    const naechste = await ladeVorlesung(aktuelleNr + 1);
    html += `
      <a class="blaettern__weiter" href="kapitel.html?nr=${naechste.nr}">
        <span>Vorlesung ${zweistellig(naechste.nr)} →</span>
        <strong>${naechste.titel}</strong>
      </a>`;
  }

  document.getElementById("blaettern").innerHTML = html;
}


// ---------- Start ----------
async function start() {
  if (!istGueltigeNr(aktuelleNr)) {
    artikel.innerHTML = `<p class="fehler-hinweis">Diese Vorlesung gibt es nicht.
      <a href="index.html#kapitel">Zur Kapitelübersicht</a></p>`;
    return;
  }

  zeigeSprungNavigation();

  try {
    const vorlesung = await ladeVorlesung(aktuelleNr);
    zeigeVorlesung(vorlesung);
    await zeigeBlaettern();
    springeZumAnker();
  } catch (fehler) {
    console.error(fehler);
    artikel.innerHTML = `<p class="fehler-hinweis">${LADEFEHLER_TEXT}</p>`;
  }
}

start();
