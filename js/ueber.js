// ==========================================================
// ueber.js – Animation „Wie diese Seite zu dir kommt“ (ueber.html)
// Spielt Schritt für Schritt ab, was bei fetch("content/vorlesungen/03.md") passiert:
//   Weg "server": über http://localhost  → Anfrage, Datei gefunden, Antwort 200, Card erscheint
//   Weg "datei":  per Doppelklick file:// → der Browser blockiert, es kommt nie eine Anfrage an
// JavaScript setzt nur data-weg und data-schritt – wie es aussieht, steht in seiten.css.
// ==========================================================

const buehne = document.getElementById("anfrage");
const log = document.getElementById("anfrage-log");
const erklaerung = document.getElementById("anfrage-text");
const adresse = document.getElementById("anfrage-adresse");

const SCHRITT_DAUER = 1400;   // Millisekunden pro Schritt

// Pro Weg: was bei jedem Schritt erklärt und ins Log geschrieben wird
const ABLAUF = {
  server: {
    adresse: "localhost:8000",
    schritte: [
      { text: "① Der Browser schickt eine HTTP-Anfrage: „Ich brauche content/vorlesungen/03.md.“" },
      { text: "② Der Server sucht die Datei in seinem Ordner – und findet sie." },
      { text: "③ Antwort: Statuscode 200 (gefunden) und der Text der Datei.",
        log: () => `::1 - - [${uhrzeit()}] "GET /content/vorlesungen/03.md HTTP/1.1" 200 -` },
      { text: "④ JavaScript zerlegt das Markdown und baut daraus die Card. Fertig!" },
    ],
  },
  datei: {
    adresse: "file:///…/index.html",
    schritte: [
      { text: "① Der Browser will dieselbe Datei mit fetch() holen …" },
      { text: "② … aber über file:// gibt es keinen Server, der antworten könnte. Der Browser blockiert die Anfrage.",
        log: () => 'Fetch API cannot load file:///…/content/vorlesungen/03.md. URL scheme "file" is not supported.' },
      { text: "③ Ohne Antwort keine Inhalte: Genau diese Fehlermeldung siehst du dann auf der Seite." },
    ],
  },
};

// Zeit im Format des Python-Servers: 21/Oct/2026 14:02:11
function uhrzeit() {
  const jetzt = new Date();
  const monat = jetzt.toLocaleString("en-US", { month: "short" });
  const zeit = jetzt.toLocaleTimeString("de-DE");
  return `${String(jetzt.getDate()).padStart(2, "0")}/${monat}/${jetzt.getFullYear()} ${zeit}`;
}

let zeitgeber = null;   // damit ein neuer Durchlauf den alten abbrechen kann

function spieleAb(weg) {
  clearTimeout(zeitgeber);
  const ablauf = ABLAUF[weg];

  buehne.dataset.weg = weg;
  buehne.dataset.schritt = "0";
  adresse.textContent = ablauf.adresse;
  log.textContent = weg === "server" ? "$ python3 -m http.server 8000\nServing HTTP on :: port 8000 …" : "Konsole (F12)";
  erklaerung.textContent = "";

  for (const knopf of document.querySelectorAll(".anfrage__knopf")) {
    knopf.setAttribute("aria-pressed", knopf.dataset.weg === weg);
  }

  // Schritt für Schritt: jeder Schritt startet den nächsten mit Verzögerung
  function schritt(nr) {
    if (nr > ablauf.schritte.length) return;
    const aktuell = ablauf.schritte[nr - 1];
    buehne.dataset.schritt = nr;
    erklaerung.textContent = aktuell.text;
    if (aktuell.log) log.textContent += "\n" + aktuell.log();
    zeitgeber = setTimeout(() => schritt(nr + 1), SCHRITT_DAUER);
  }

  zeitgeber = setTimeout(() => schritt(1), 300);
}

for (const knopf of document.querySelectorAll(".anfrage__knopf")) {
  knopf.addEventListener("click", () => spieleAb(knopf.dataset.weg));
}

document.getElementById("anfrage-nochmal").addEventListener("click", () => spieleAb(buehne.dataset.weg));

// Startet einmal von selbst, sobald die Animation zur Hälfte sichtbar ist
const beobachter = new IntersectionObserver(eintraege => {
  if (eintraege[0].isIntersecting) {
    spieleAb("server");
    beobachter.disconnect();
  }
}, { threshold: 0.5 });

beobachter.observe(buehne);
