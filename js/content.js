// ==========================================================
// content.js – lädt die Vorlesungsinhalte aus den Markdown-Dateien
// Wird von BEIDEN Seiten genutzt (Startseite und Kapitelseite).
//
// Jede Vorlesung ist eine Datei: content/vorlesungen/01.md … 07.md
// Oben stehen Metadaten (zwischen ---), darunter der Inhalt in Markdown.
// ==========================================================

const ANZAHL_VORLESUNGEN = 7;
const CONTENT_ORDNER = "content/vorlesungen/";

// Texte für die Status-Etiketten. "fertig" bekommt kein Etikett.
const STATUS_TEXTE = {
  demo: "Entwurf",
  platzhalter: "Platzhalter",
};

// Macht aus 1 → "01" (für Dateinamen und Anzeige)
function zweistellig(nr) {
  return String(nr).padStart(2, "0");
}

// Zerlegt den Text einer Markdown-Datei in Metadaten und Inhalt.
// Aus
//   ---
//   titel: HTML-Grundlagen
//   ---
//   ## Überblick …
// wird { meta: { titel: "HTML-Grundlagen" }, inhalt: "## Überblick …" }
function zerlegeMarkdown(text) {
  text = text.replace(/\r\n/g, "\n");   // Windows-Zeilenumbrüche vereinheitlichen

  // Regulärer Ausdruck: Teil 1 = alles zwischen den beiden "---", Teil 2 = der Rest
  const teile = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!teile) {
    return { meta: {}, inhalt: text };
  }

  const meta = {};
  for (const zeile of teile[1].split("\n")) {
    const position = zeile.indexOf(":");
    if (position === -1) continue;   // Zeilen ohne Doppelpunkt überspringen

    const schluessel = zeile.slice(0, position).trim();
    const wert = zeile.slice(position + 1).trim().replace(/^["']|["']$/g, "");   // Anführungszeichen entfernen
    meta[schluessel] = wert;
  }

  return { meta: meta, inhalt: teile[2] };
}

// Lädt EINE Vorlesung und gibt ein Objekt mit allen Angaben zurück.
// async/await: Das Laden dauert einen Moment – "await" wartet auf das Ergebnis,
// ohne die Seite zu blockieren.
// Holt den Text einer Markdown-Datei.
// Normalfall (über einen Server, z. B. Vercel oder localhost): fetch() fragt die Datei beim Server an.
// Per Doppelklick (file://) gibt es keinen Server – dann nehmen wir die Ersatzkopie aus js/inhalte.js,
// die tools/inhalte-buendeln.py erzeugt und die jede Seite mit <script> einbindet.
// Rückgabe: der Text, oder null, wenn es die Vorlesung (noch) nicht gibt.
async function ladeText(nr) {
  const name = zweistellig(nr);
  const ersatz = window.INHALTE ? window.INHALTE[name] ?? null : null;

  if (location.protocol === "file:") {
    if (!window.INHALTE) throw new Error("js/inhalte.js fehlt");
    return ersatz;
  }

  try {
    const antwort = await fetch(CONTENT_ORDNER + name + ".md");
    if (antwort.ok) return await antwort.text();
    if (antwort.status === 404) return null;   // Datei gibt es nicht → Platzhalter
  } catch (fehler) {
    // Netzwerk weg? Dann unten die Ersatzkopie versuchen.
  }
  if (window.INHALTE) return ersatz;
  throw new Error("Inhalte nicht erreichbar");
}

async function ladeVorlesung(nr) {
  const text = await ladeText(nr);

  // Datei fehlt → Platzhalter statt Fehler, damit die Seite weiter funktioniert
  if (text === null) {
    return { nr: nr, titel: "Vorlesung folgt", datum: "", beschreibung: "", status: "platzhalter", inhalt: "" };
  }

  const { meta, inhalt } = zerlegeMarkdown(text);

  return {
    nr: nr,
    titel: meta.titel || "Vorlesung folgt",
    datum: meta.datum || "",
    beschreibung: meta.beschreibung || "",
    status: meta.status || "platzhalter",
    inhalt: inhalt,
  };
}

// Lädt alle Vorlesungen gleichzeitig.
// Promise.all wartet, bis ALLE Dateien da sind, und behält die Reihenfolge bei.
async function ladeAlleVorlesungen() {
  const ladevorgaenge = [];
  for (let nr = 1; nr <= ANZAHL_VORLESUNGEN; nr++) {
    ladevorgaenge.push(ladeVorlesung(nr));
  }
  return Promise.all(ladevorgaenge);
}

// "2026-10-06" → "6. Oktober 2026"
function formatiereDatum(isoDatum) {
  if (!isoDatum) return "";
  const datum = new Date(isoDatum + "T00:00:00");
  if (isNaN(datum)) return isoDatum;   // unbekanntes Format? Dann einfach so anzeigen
  return datum.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
}

// Gibt das HTML für ein Status-Etikett zurück (oder nichts bei "fertig")
function statusBadge(status) {
  if (!STATUS_TEXTE[status]) return "";
  return `<span class="badge badge--${status}">${STATUS_TEXTE[status]}</span>`;
}

// Hinweis, falls die Dateien gar nicht geladen werden konnten.
// Kommt nur noch vor, wenn weder fetch() noch die Ersatzkopie js/inhalte.js funktioniert.
const LADEFEHLER_TEXT =
  "Die Inhalte konnten nicht geladen werden. Am einfachsten: im Projektordner <code>start.command</code> doppelklicken. " +
  "Oder im Terminal <code>python3 -m http.server 5500</code> starten und " +
  "<a href=\"http://localhost:5500\">http://localhost:5500</a> öffnen. " +
  "Per Doppelklick auf index.html braucht die Seite die Datei <code>js/inhalte.js</code> " +
  "(neu erzeugen mit <code>python3 tools/inhalte-buendeln.py</code>).";

// Macht Text sicher für innerHTML: Aus "<noscript>" wird "&lt;noscript&gt;".
// Sonst würde der Browser den Text als echtes HTML-Tag lesen.
function maskiere(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// "Meine Learnings" → "meine-learnings"
// Daraus werden Sprungmarken, z. B. kapitel.html?nr=3#meine-learnings
function alsAnker(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")   // alles andere (Leerzeichen, Emojis, Klammern …) wird zu "-"
    .replace(/^-+|-+$/g, "");      // "-" am Anfang und Ende entfernen
}

// Schneidet einen "## Titel"-Abschnitt aus dem Markdown heraus (ohne die Überschrift selbst).
// Er endet bei der nächsten "## "-Überschrift oder am Dateiende.
// Gibt "" zurück, wenn es den Abschnitt nicht gibt.
function abschnitt(inhalt, titel) {
  const zeilen = inhalt.replace(/\r\n/g, "\n").split("\n");
  const start = zeilen.findIndex(zeile => zeile.trim() === "## " + titel);
  if (start === -1) return "";

  let ende = zeilen.findIndex((zeile, i) => i > start && zeile.startsWith("## "));
  if (ende === -1) ende = zeilen.length;

  return zeilen.slice(start + 1, ende).join("\n").trim();
}
