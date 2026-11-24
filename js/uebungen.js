// ==========================================================
// uebungen.js – füllt uebungen.html
// Sucht in jeder Vorlesung im Abschnitt "## Übungen" alle "### "-Überschriften.
// Pro Übung: Titel, Link zur Stelle in der Vorlesung, Link zur Live-Version.
// ==========================================================

// "Übung – `<noscript>` ausprobieren" → "Übung – <noscript> ausprobieren"
// (Markdown in reinen Text umwandeln – genauso entsteht auch die id auf der Kapitelseite)
function alsText(markdown) {
  const div = document.createElement("div");
  div.innerHTML = marked.parseInline(markdown);
  return div.textContent;
}

// Zerlegt den Übungs-Abschnitt in einzelne Übungen
function findeUebungen(vorlesung) {
  const teile = abschnitt(vorlesung.inhalt, "Übungen").split(/^### /m).slice(1);   // [0] ist der Text vor der ersten Übung

  return teile.map(teil => {
    const [kopfzeile, ...rest] = teil.split("\n");
    const titel = alsText(kopfzeile.trim());
    const text = rest.join("\n");

    // Live-Link aus der Übung, z. B. **▶ [KopfüBar live ansehen](aufgaben/19.10_aufgabe1_bar/bar.html)**
    const live = text.match(/\[[^\]]*live[^\]]*\]\((aufgaben\/[^)]+)\)/i);

    return {
      vorlesung: vorlesung,
      titel: titel.replace(/^Übung\s*\d*\s*[–-]\s*/, ""),   // "Übung – " vorne weglassen, steht ja schon drüber
      anker: alsAnker(titel),
      live: live ? live[1] : "",
      abgabe: /abgabe/i.test(titel),
      offen: /noch nicht bearbeitet/i.test(text),   // Hinweis „❓ Noch nicht bearbeitet“ in der Übung
    };
  });
}

function zeigeUebungen(vorlesungen) {
  const uebungen = vorlesungen.flatMap(findeUebungen);
  const liste = document.getElementById("uebungen-liste");

  if (uebungen.length === 0) {
    liste.innerHTML = `<p class="platzhalter-text">Noch keine Übungen eingetragen.</p>`;
    return;
  }

  liste.innerHTML = `
    <p class="zusammenfassung">${uebungen.length} Übungen aus ${new Set(uebungen.map(u => u.vorlesung.nr)).size} Vorlesungen,
      davon ${uebungen.filter(u => u.live).length} zum Ausprobieren und ${uebungen.filter(u => u.offen).length} noch offen.</p>
    <ol class="uebungs-liste">
      ${uebungen.map(u => `
        <li class="eintrag eintrag--kompakt">
          <p class="eyebrow">Vorlesung ${zweistellig(u.vorlesung.nr)} · ${maskiere(u.vorlesung.titel)}</p>
          <h2>${maskiere(u.titel)} ${u.abgabe ? '<span class="badge">Abgabe</span>' : ""} ${u.offen ? '<span class="badge badge--platzhalter">offen</span>' : ""}</h2>
          <p class="eintrag__links">
            <a href="kapitel.html?nr=${u.vorlesung.nr}#${u.anker}">Aufgabe &amp; Lösung</a>
            ${u.live ? `<a href="${u.live}">▶ Live ansehen</a>` : ""}
          </p>
        </li>`).join("")}
    </ol>`;
}

async function start() {
  try {
    zeigeUebungen(await ladeAlleVorlesungen());
  } catch (fehler) {
    console.error(fehler);
    document.getElementById("uebungen-liste").innerHTML = `<p class="fehler-hinweis">${LADEFEHLER_TEXT}</p>`;
  }
}

start();
