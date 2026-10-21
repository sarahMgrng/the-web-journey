# Content Guide

## Eine Vorlesung ergänzen – Beispiel Vorlesung 3

1. `content/vorlesungen/03.md` öffnen (enthält aktuell nur einen Platzhalter).
2. Den Inhalt von `content/_vorlage.md` hineinkopieren.
3. Metadaten oben ausfüllen und `status` auf `fertig` setzen.
4. Speichern – fertig. Card, Kapitelseite und Navigation aktualisieren sich automatisch.

Kein HTML und kein JavaScript muss angepasst werden.

## Aufbau einer Vorlesungsdatei

```markdown
---
titel: CSS-Grundlagen
beschreibung: Selektoren, Box-Modell und Layout mit Flexbox.
datum: 2026-10-20
status: fertig
---

## Überblick
## Lernziele
## Zusammenfassung
## Beispiele
## Übungen
## Meine Learnings          ← kommt nach der Vorlesung dazu (n8n-Formular)
## Offene Fragen & Lücken
```

### Metadaten (zwischen den `---`)

| Feld           | Pflicht? | Beschreibung                                        |
|----------------|----------|-----------------------------------------------------|
| `titel`        | ja       | Titel der Vorlesung                                 |
| `beschreibung` | nein     | Ein Satz – erscheint auf der Card und im Kapitelkopf |
| `datum`        | nein     | Format `JJJJ-MM-TT`, wird als „20. Oktober 2026“ angezeigt |
| `status`       | ja       | `fertig`, `demo` oder `platzhalter`                 |

**Status-Werte**
- `fertig` – geprüfter Inhalt, kein Etikett
- `demo` – Etikett „Entwurf“ + gelber Hinweis auf der Kapitelseite (zusammengefasst, aber noch nicht geprüft)
- `platzhalter` – gestrichelte Card, Kapitelseite zeigt „wird ergänzt“

Regeln: eine Angabe pro Zeile, Doppelpunkt nach dem Feldnamen, keine Listen.

### Inhalt (unter den Metadaten)

Die fünf `##`-Abschnitte sind das einheitliche Schema für alle Vorlesungen. Unterpunkte mit `###`.
Im ganzen Semester gibt es insgesamt 6 Übungen. Jede Übung steht in der Datei der Vorlesung, zu der sie gehört, und ist durchgehend nummeriert (z. B. `### Übung 3 – Titel` in `02.md`). Hat eine Vorlesung keine Übung, entfällt der Abschnitt `## Übungen`.

**Herkunft kennzeichnen:** Absätze beginnen mit 📘 Skript (Folie n) · ✏️ meine Notiz · 🤖 KI-Erklärung · ❓ offen.
KI-Erklärungen und offene Punkte stehen am besten als Zitat (`> 🤖 …`). Lücken und Fragen sammelt ein
zusätzlicher letzter Abschnitt `## Offene Fragen & Lücken` (optional). Vorbild: `03.md`.

**Meine Learnings (Reflexion):** Nach jeder Vorlesung beantworte ich fünf Leitfragen. Die Antworten stehen im Abschnitt
`## Meine Learnings`, direkt vor `## Offene Fragen & Lücken`.

1. Was kann ich in zwei Sätzen erklären?
2. Was hat mich überrascht?
3. Wo hänge ich noch? (wird zu ❓)
4. Wie hängt es mit der letzten Vorlesung zusammen?
5. Welchen Code kann ich jetzt schreiben?

Normalerweise schreibt das n8n-Formular den Abschnitt (Workflow „Learnings eintragen“, Branch `learnings`), von Hand geht es
genauso. Wichtig: Die Überschriften `## Meine Learnings`, `## Übungen` und `## Offene Fragen & Lücken` **genau so** schreiben.
Die Seiten [learnings.html](learnings.html) und [uebungen.html](uebungen.html) suchen danach, und der n8n-Workflow setzt die
Learnings vor `## Offene Fragen & Lücken` ein.

**Übungen auf der Übungsseite:** Jede `### `-Überschrift unter `## Übungen` erscheint automatisch auf `uebungen.html`.
Steht im Titel „Abgabe“, bekommt die Übung ein Etikett. Ein Link mit „live“ im Text auf `aufgaben/…` wird zum Button „▶ Live ansehen“.

**Sprungmarken:** Jede Überschrift bekommt automatisch eine Adresse zum Hineinspringen. Aus der Überschrift wird
klein geschrieben, Umlaute werden ersetzt, alles andere wird zu `-`:
`## Meine Learnings` → `kapitel.html?nr=3#meine-learnings`, `### Teil 1 – Prüfungsform` → `#teil-1-pruefungsform`.
Die großen Abschnitte (`##`) erscheinen oben in der Leiste „Auf dieser Seite“.

**Lösungen zum Aufklappen:**
```markdown
<details>
<summary>Lösung</summary>

Hier normales Markdown. Die Leerzeilen davor und danach sind wichtig!

</details>
```

**Code-Beispiele:** drei Backticks plus Sprache (`html`, `css`, `js`).
`js`-Blöcke bekommen automatisch einen Button „▶ Ausführen“. Alles, was der Code mit `console.log` ausgibt,
erscheint im Terminal-Fenster darunter. Darum jedes Beispiel mit mindestens einem `console.log` abschließen.

**Übungscode live einbinden:**
1. Den Aufgabenordner aus dem Aufgaben-Repo (`CODE_WP_Aufgaben/`) unverändert nach `aufgaben/` kopieren (ohne `.DS_Store`),
   z. B. `aufgaben/19.10_aufgabe1_bar/`.
2. Bei der Übung verlinken. Der Pfad gilt relativ zu `kapitel.html`:
   `**▶ [Live ansehen](aufgaben/19.10_aufgabe1_bar/bar.html)**`

Die Quelle bleibt das Aufgaben-Repo. Ändert sich dort etwas, die Kopie erneut übernehmen.

## Weitere Vorlesungen (mehr als 8)

1. In `js/content.js` den Wert `ANZAHL_VORLESUNGEN` erhöhen.
2. Datei `09.md` anlegen.

## Kapitelübersicht als Liste statt Raster

In `index.html` beim `<ol id="kapitel-liste">` die Klasse `kapitel-liste--raster`
durch `kapitel-liste--liste` ersetzen.

## Animationen anpassen

| Was?                          | Wo?                                                         |
|-------------------------------|-------------------------------------------------------------|
| Geschwindigkeit & Kurve aller Fade-ins | `--uebergang` in `css/style.css`                   |
| Fade-in: Abstand & Richtung   | `.js .reveal` in `css/home.css` (`translateY(40px)`)        |
| Fade-in: Staffelung           | `style="--verzoegerung: 2"` im HTML (× 120 ms)              |
| Neues Element einblenden      | Klasse `reveal` im HTML ergänzen – fertig                   |
| Sticky Section: Zustände      | `.browser[data-schritt="…"]` in `css/home.css`              |
| Sticky Section: Auslöselinie  | `rootMargin` in `js/home.js`                                |
| Demo 03: Bewegung             | `@keyframes wachsen` in `css/home.css`                      |
| Hero beim Wegscrollen         | `@keyframes hero-weg` und `animation-range` in `css/home.css` |
| Farben                        | Variablen in `:root` in `css/style.css`                     |

**Testen von „Bewegung reduzieren“:** In Chrome DevTools → ⋮ → More tools → Rendering →
„Emulate CSS media feature prefers-reduced-motion“ → `reduce`.
