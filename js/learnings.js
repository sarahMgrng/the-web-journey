// ==========================================================
// learnings.js – füllt learnings.html
// Sammelt aus jeder Vorlesung den Abschnitt "## Meine Learnings".
// Der Abschnitt kommt aus dem n8n-Formular (siehe ueber.html)
// oder wird von Hand in die Markdown-Datei geschrieben.
// ==========================================================

const LEARNINGS_TITEL = "Meine Learnings";

// Fortschritt: eine Markierung pro Vorlesung (✓ = Learnings vorhanden)
function zeigeFortschritt(vorlesungen) {
  document.getElementById("fortschritt").innerHTML = vorlesungen
    .map(v => {
      const fertig = abschnitt(v.inhalt, LEARNINGS_TITEL) !== "";
      const text = fertig ? "Learnings eingetragen" : "noch offen";
      return `<li class="${fertig ? "ist-fertig" : ""}">
        <a href="kapitel.html?nr=${v.nr}" aria-label="Vorlesung ${v.nr}: ${text}">${zweistellig(v.nr)}</a>
      </li>`;
    })
    .join("");
}

function zeigeLearnings(vorlesungen) {
  const liste = document.getElementById("learnings-liste");
  const mitLearnings = vorlesungen.filter(v => abschnitt(v.inhalt, LEARNINGS_TITEL) !== "");

  if (mitLearnings.length === 0) {
    liste.innerHTML = `<p class="platzhalter-text">Noch keine Learnings eingetragen.
      Nach jeder Vorlesung kommen sie über das Rückblick-Formular hierher.</p>`;
    return;
  }

  liste.innerHTML = mitLearnings
    .map(v => `
      <article class="eintrag">
        <p class="eyebrow">${moodleName(v)} · Vorlesung ${zweistellig(v.nr)}</p>
        <h2><a href="kapitel.html?nr=${v.nr}#${alsAnker(LEARNINGS_TITEL)}">${v.titel}</a></h2>
        <div class="prose">${marked.parse(abschnitt(v.inhalt, LEARNINGS_TITEL))}</div>
      </article>`)
    .join("");
}

async function start() {
  try {
    const vorlesungen = await ladeAlleVorlesungen();
    zeigeFortschritt(vorlesungen);
    zeigeLearnings(vorlesungen);
  } catch (fehler) {
    console.error(fehler);
    document.getElementById("learnings-liste").innerHTML = `<p class="fehler-hinweis">${LADEFEHLER_TEXT}</p>`;
  }
}

start();
