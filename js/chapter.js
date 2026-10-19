// ==========================================================
// chapter.js – füllt das Kapitel-Template (kapitel.html)
// 1. Nummer aus der Adresse lesen   (kapitel.html?nr=2 → 2)
// 2. Schnellnavigation 01–08
// 3. Vorlesung anzeigen
// 4. Vorherige / nächste Vorlesung
// ==========================================================

const artikel = document.getElementById("kapitel");


// ---------- 1. Nummer aus der Adresse ----------
const parameter = new URLSearchParams(window.location.search);
const aktuelleNr = Number(parameter.get("nr"));

function istGueltigeNr(nr) {
  return Number.isInteger(nr) && nr >= 1 && nr <= ANZAHL_VORLESUNGEN;
}


// ---------- 2. Schnellnavigation 01–08 ----------
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
    html += `<p class="demo-banner"><strong>Demo-Inhalt:</strong> Dieser Text zeigt nur den Aufbau einer Kapitelseite.
             Er ist noch keine geprüfte Vorlesungszusammenfassung.</p>`;
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
  } catch (fehler) {
    console.error(fehler);
    artikel.innerHTML = `<p class="fehler-hinweis">${LADEFEHLER_TEXT}</p>`;
  }
}

start();
