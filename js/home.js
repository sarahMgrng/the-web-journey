// ==========================================================
// home.js – Verhalten der Startseite
// 1. Fade-in beim Scrollen         (Demo 01 und 04)
// 2. Sticky Section                (Demo 02)
// 3. Kapitel-Cards erzeugen        (aus den Markdown-Dateien)
// Demo 03 (Bewegen & Skalieren) ist reines CSS → siehe home.css
// ==========================================================


// ---------- 1. Fade-in beim Scrollen ----------
// Der Intersection Observer meldet, wenn ein Element in den sichtbaren
// Bereich kommt. Dann bekommt es die Klasse "is-visible" – den Rest macht CSS.

const revealBeobachter = new IntersectionObserver(
  function (eintraege) {
    for (const eintrag of eintraege) {
      if (eintrag.isIntersecting) {
        eintrag.target.classList.add("is-visible");
        revealBeobachter.unobserve(eintrag.target);   // nur einmal einblenden
      }
    }
  },
  // Erst auslösen, wenn das Element 10 % über dem unteren Rand ist
  { rootMargin: "0px 0px -10% 0px" }
);

// Alle Elemente mit der Klasse "reveal" innerhalb von "bereich" beobachten
function beobachteReveals(bereich) {
  for (const element of bereich.querySelectorAll(".reveal")) {
    revealBeobachter.observe(element);
  }
}

beobachteReveals(document);


// ---------- 2. Sticky Section ----------
// Die Grafik steht still (CSS: position: sticky). Hier merken wir uns,
// welcher Textschritt gerade die Bildschirmmitte erreicht, und geben
// seine Nummer an die Grafik weiter. Wie die Grafik dann aussieht, regelt CSS.

const browserGrafik = document.querySelector(".browser");
const storySchritte = document.querySelectorAll(".story__schritt");

const schrittBeobachter = new IntersectionObserver(
  function (eintraege) {
    for (const eintrag of eintraege) {
      if (eintrag.isIntersecting) {
        // data-schritt="3" am Text → data-schritt="3" an der Grafik
        browserGrafik.dataset.schritt = eintrag.target.dataset.schritt;

        // Nur der aktuelle Schritt ist hervorgehoben
        for (const schritt of storySchritte) {
          schritt.classList.toggle("is-active", schritt === eintrag.target);
        }
      }
    }
  },
  // Trick: Der beobachtete Bereich wird zu einer waagerechten Linie verkleinert.
  // Am Desktop liegt sie in der Bildschirmmitte (oben und unten je 50 % abgeschnitten).
  // Am Smartphone verdeckt die Grafik die obere Hälfte – dort liegt die Linie bei 75 %.
  { rootMargin: istSchmalerBildschirm() ? "-75% 0px -25% 0px" : "-50% 0px -50% 0px" }
);

// Gleiche Grenze wie in home.css (@media (max-width: 800px))
function istSchmalerBildschirm() {
  return window.matchMedia("(max-width: 800px)").matches;
}

for (const schritt of storySchritte) {
  schrittBeobachter.observe(schritt);
}


// ---------- 3. Kapitel-Cards ----------

// Erzeugt das HTML für EINE Card
function erzeugeCard(vorlesung, index) {
  const istPlatzhalter = vorlesung.status === "platzhalter";
  const zusatzKlasse = istPlatzhalter ? " kapitel-card--platzhalter" : "";

  // Template-Literal (Backticks): ${…} setzt Werte direkt in den Text ein
  return `
    <li class="reveal" style="--verzoegerung: ${index % 4}">
      <a class="kapitel-card${zusatzKlasse}" href="kapitel.html?nr=${vorlesung.nr}">
        <div class="kapitel-card__kopf">
          <span class="kapitel-card__nr" aria-hidden="true">${zweistellig(vorlesung.nr)}</span>
          ${statusBadge(vorlesung.status)}
        </div>
        <h3 class="kapitel-card__titel">
          <span class="visually-hidden">Vorlesung ${vorlesung.nr}: </span>${vorlesung.titel}
        </h3>
        ${vorlesung.beschreibung ? `<p class="kapitel-card__beschreibung">${vorlesung.beschreibung}</p>` : ""}
        ${vorlesung.datum ? `<p class="kapitel-card__datum">${formatiereDatum(vorlesung.datum)}</p>` : ""}
      </a>
    </li>`;
}

async function zeigeKapitelUebersicht() {
  const liste = document.getElementById("kapitel-liste");

  try {
    const vorlesungen = await ladeAlleVorlesungen();
    // Aus jeder Vorlesung eine Card machen und alle zusammenfügen
    liste.innerHTML = vorlesungen.map(erzeugeCard).join("");
    beobachteReveals(liste);   // die neuen Cards sollen auch einblenden
  } catch (fehler) {
    console.error(fehler);
    liste.innerHTML = `<li class="fehler-hinweis">${LADEFEHLER_TEXT}</li>`;
  }
}

zeigeKapitelUebersicht();
