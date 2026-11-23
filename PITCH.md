# Pitch – The Web Journey (Portfolio 1, Web-Programmierung)

5 Minuten Vorstellung + 10 Minuten Fragen · Sarah Gehring · DHBW Mannheim · 23.11.2026

**Vorher offen haben:** die Website (Vercel-Adresse oder `start.command`), Tab 2 `aufgaben/19.10_aufgabe1_bar/bar.html`, Tab 3 GitHub-Repo.
Rückfall: ZIP entpacken → `index.html` doppelklicken (läuft auch ohne Server).

---

## Sprechzettel (5:00)

| Zeit | Klick | Was ich sage |
| --- | --- | --- |
| 0:00–0:40 | **index.html**, Titel | „Mein Portfolio heißt *The Web Journey*. Es ist selbst eine Web-Anwendung: reines HTML, CSS und JavaScript, ohne Framework – genau das, was wir in der Vorlesung gelernt haben. Oben links schalte ich später auf Portfolio 2, Verteilte Systeme, um.“ |
| 0:40–1:40 | **Schwerpunkt** runterscrollen bis Apple-Demo | „Mein Schwerpunkt ist Scrollytelling. Fünf Demos, von einfach bis Apple: Einblenden mit IntersectionObserver, ein Bereich mit `position: sticky`, und am Ende 120 Einzelbilder, die per `requestAnimationFrame` passend zur Scrollposition auf ein `<canvas>` gezeichnet werden.“ |
| 1:40–2:40 | **Vorlesungen → 03** | „Jede Vorlesung ist eine Markdown-Datei. `kapitel.html` ist *eine* Vorlage: Das Skript liest `nr` aus der URL, lädt die Datei per `fetch` und wandelt sie mit marked in HTML um. Die Symbole zeigen, woher ein Absatz kommt: Skript, meine Notiz, KI-Erklärung, offene Frage.“ Code-Block „▶ Ausführen“ klicken. |
| 2:40–3:40 | **Übungen → An Bord** (bar.html) | „Alle Übungen liegen an Bord der KopfüBar – meiner Übung zu relativen Pfaden. Jede Übung ist eine Station, der Code ist unverändert. Ein Skript, `bord.js`, setzt allen dieselbe Kopfzeile auf.“ Station 04 → Elixire: „Von `getraenke/` komme ich mit `../` zurück zu `bilder/`.“ |
| 3:40–4:30 | Taste **^** → `help`, `curl -I index.html`, Tab **Atlas**: „Was ist JSON?“ | „Auf jeder Seite gibt es ein Terminal. `curl` zeigt die echte HTTP-Antwort vom Server. Atlas ist mein Bot zum Portfolio: Er sucht in den Kapiteln, antwortet kurz und verlinkt die Stelle. Version 1 läuft komplett im Browser; als Nächstes binde ich Ollama auf meinem Server an.“ |
| 4:30–5:00 | **Learnings** / **Über das Portfolio** | „Meine Learnings sammle ich pro Vorlesung. Alles liegt auf GitHub mit Roadmap und Issues. Danke – ich freue mich auf Ihre Fragen.“ |

**Wenn die Zeit knapp wird:** Atlas weglassen, nur `^` drücken und zeigen, dass es da ist.

---

## Sieben Prüfungsfragen (je eine pro Vorlesung)

Erst frei antworten, dann am Portfolio zeigen.

1. **V1 · Client/Server – Warum startest du das Portfolio über einen Server?**
   Der Browser lädt die Kapitel per `fetch` als Markdown nach. Über `file://` blockiert er diese Anfragen. Deshalb gibt es zusätzlich `js/inhalte.js`: eine Ersatzkopie, die per `<script>` geladen wird – so läuft es auch per Doppelklick. *Zeigen:* Terminal `curl -I index.html`.
2. **V2 · HTML – Was passiert bei einem Link und wann wird ein Bild geladen?**
   Der Klick auf `href` lädt die neue Seite. Beim Lesen ihres HTML findet der Browser `<img src>` und fordert das Bild separat an; `alt` beschreibt es für Screenreader. *Zeigen:* bar.html → Elixire.
3. **V3 · Relative Pfade – Warum steht vor `bilder/gruen.jpg` manchmal `../`?**
   Ein Pfad gilt vom Ordner der *aktuellen* Datei aus. `elixir.html` liegt in `getraenke/`, also erst `../` eine Ebene hoch, dann `bilder/`. *Zeigen:* Station 04.
4. **V4 · Formulare/Strings – Wie wird aus „100,4“ eine Zahl?**
   Das Feld liefert einen String. Komma durch Punkt ersetzen, `parseFloat`, mit Kurs 0,86 multiplizieren → 86,34 €. *Zeigen:* Bordkasse.
5. **V5 · Objekte – Unterschied JavaScript-Objekt und JSON?**
   Ein Objekt lebt im Speicher und kann Methoden haben. JSON ist nur Text für Daten. `JSON.stringify` macht Text daraus, `JSON.parse` wieder ein Objekt. *Zeigen:* Atlas „Was ist JSON?“.
6. **V6 · DOM – Wie entstehen sieben Kapitel aus einer Vorlage?**
   `kapitel.html?nr=3`: Skript liest `nr`, lädt `03.md`, marked macht HTML, das kommt ins DOM. `#anker` springt zum Abschnitt. *Zeigen:* Terminal `dom`.
7. **V7 · Events – Wie startet ein Klick eine Animation?**
   Ein `click`-Listener setzt `data-weg` / `data-schritt` am Element, das CSS reagiert auf diese Zustände. Beim Terminal: `keydown` auf `^`. *Zeigen:* „Über das Portfolio“ → Animation.

## Fragen, die kommen könnten – und meine ehrliche Antwort

- **„Was hast du selbst gemacht, was die KI?“** → Inhalte sind gekennzeichnet (📘 Skript · ✏️ ich · 🤖 KI · ❓ offen). Übungen sind meine Lösungen, unverändert. Struktur und Gestaltung habe ich mit KI entwickelt und geprüft; die Learnings schreibe ich selbst.
- **„Warum kein Framework?“** → Das Modul ist Grundlagen. Ich wollte zeigen, dass ich es ohne kann.
- **„Was ist noch offen?“** → Learnings für V1, V2, V4–V7, Abgabe V05 (Kontakte-Klasse), Ollama-Anbindung für Atlas. Steht in der Roadmap.
