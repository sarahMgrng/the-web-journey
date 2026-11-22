# Status – Stand 22.11.2026

Kurze Übergabe: Wo stehen wir, was fehlt, wie geht es weiter.
Langfristige Planung: [ROADMAP.md](ROADMAP.md).

## Update 22.11.2026 (vor der Präsentation am 23.11.)

**Erledigt:**
- [x] **Layout/Design überarbeitet** (Feedback PO 19.10.): Alle Farben als CSS-Variablen, fünf Farbschemata in `css/farben.css`. Gewählt: **„Hell“** – Hintergrund `#f5f5f7`, Apple-Blau `#0071e3`/`#0066cc`, Orange `#bf4800`, feines Raster, Verlauf im Titel, Terminal-Logo `>_`. Farbwähler unten rechts (Wahl wird im Browser gemerkt).
- [x] Weicher Übergang hinter der Sticky-Grafik auf schmalen Bildschirmen (vorher harte Kante)
- [x] **marked lokal** unter `js/vendor/marked.min.js` → Seite läuft offline bei der Präsentation
- [x] Favicon `>_` (vorher 404 im Log)
- [x] Währungsrechner (26.10.) nach `aufgaben/26.10_aufgabe1_waehrungsrechner/` kopiert
- [x] **Hosting über Vercel**, verbunden mit diesem Repo (Push = neue Version)
- ⚠️ Lokal hießen die Seiten zwischenzeitlich `1_index.html` usw. – dadurch waren alle Links kaputt. HTML-Dateien nicht umbenennen.

**Offen (Iteration 2):**
- [ ] Alle weiteren Skripte + Übungen laden, Vorlesungen 04–08 füllen (04 = Währungsrechner verlinken)
- [ ] V1–V3 prüfen und auf `status: fertig` setzen
- [ ] Learnings + n8n-Automation (macht Sarah)
- [ ] Startseite: Apple-Aufhänger + scrollgesteuerte „Reise einer Website“ (Browser → DNS → Server → DOM) mit Code
- [ ] Übungs-Labor: Übungen mit Code + Terminal direkt auf der Seite ausführen
- [ ] Branch `portfolio/ordnernavigation` (Ordnerbaum, 21.11.) prüfen und ins neue Design übernehmen

## Was wir haben

**Zwei getrennte Repos** auf GitHub (privat), jeweils im Branch `abgaben-3-semester`:

| Repo | Lokaler Ordner | Inhalt |
|---|---|---|
| `the-web-journey` | `Portfolio_the-web-journey/` | Portfolio-Website (Lerntagebuch) |
| `wp-aufgaben-3-semester` | `CODE_WP_Aufgaben/` | Programmieraufgaben, ein Ordner pro Aufgabe |

Beide Ordner liegen unter `~/Desktop/Web-Prog_3S/`, die Skripte (PDF) unter `~/Desktop/Web-Prog_3S/Skripte/`.

**Vorlesungen im Portfolio:**

| Nr | Datum | Thema | Stand |
|---|---|---|---|
| 01 | 05.10. | Einführung – Webanwendungen & Skriptsprachen | **zusammengefasst** aus Skript V1 + GoodNotes-Notizen, Status `demo` (Etikett „Entwurf“) |
| 02 | 12.10. | HTML-Grundlagen & JavaScript-Basics | **zusammengefasst** aus Skript HTML1 + JS2 + Notizen, 3 Übungen mit Code-Check, Status `demo` |
| 03 | 19.10. | JavaScript-Funktionen & Links | **zusammengefasst** aus beiden Skripten, Status `demo`, bis die Lücken geschlossen sind |
| 04–08 | – | – | Platzhalter |

**Aufgaben im Aufgaben-Repo:** 12.10. Aufgaben 1–3, 19.10. Bar, 19.10. Bohnen zählen.
Alle fünf Aufgaben sind zusätzlich als lauffähige Kopie unter `aufgaben/` im Portfolio und aus Vorlesung 02 bzw. 03 verlinkt („▶ live ansehen“).

**Neue Seiten (21.10.):** `learnings.html`, `uebungen.html`, `ueber.html` (mit Animation „Anfrage und Antwort“), Sprungmarken-Leiste in jedem Kapitel. Branch `ausbau-v1-v2-unterseiten`, noch nicht gemergt.

## Vorlesung 3 – was gesichert ist

Alles in [content/vorlesungen/03.md](content/vorlesungen/03.md), nach Herkunft gekennzeichnet:

- 📘 **Skript:**
  - `Skripte/WebProg-26-vorl3.pdf` (JS-Funktionen, 35 Folien) und `Skripte/WebProg-26-vorl-HTML2.pdf` (Links/Pfade, 55 Folien), beide komplett gelesen
  - Inhalte: Funktionsarten, Pfeilfunktionen, Parameter/Argumente, `arguments`, Rest, Spread, Copy by Reference, reine Funktionen, Higher-Order-Functions, `<a>`, Attribute, Ordner, relative Pfade
- ✏️ **Meine Notizen:** drei Fotos (Rest Parameters, `multiplier`, Bohnen zählen) und die Lösung „Bohnen zählen“ aus dem ChatGPT-Gespräch
- 🤖 **KI-Erklärungen:** Rest vs. Spread, Closure, Lesen relativer Pfade, Erklärung von Bohnen zählen Zeile für Zeile, alternative Lösungen

## Übungen

| Übung | Code | Stand |
|---|---|---|
| KopfüBar mit Ordnern (HTML2, S. 9–13, 24, 31, 48) | `CODE_WP_Aufgaben/19.10_aufgabe1_bar/` | ✅ bearbeitet und getestet. Korrigiert: `getränke/` → `getraenke/`, Bildpfade → `../bilder/…`, Rücklinks → `../bar.html`, doppelte Altdateien mit `.. /bilder` (Leerzeichen) und `bar/bar.html` entfernt. **Bilddateien vollständig** (`getraenke.gif`, `gruen/hellblau/blau/rot.jpg`), es fehlt keine. Tippfehler im Linktext („Elixire“) im Aufgaben-Repo behoben (`9241ba6`), Kopie in `aufgaben/` ist aktuell. |
| Bohnen zählen (vorl3, Folie 35, **Abgabe**) | `CODE_WP_Aufgaben/19.10_aufgabe2_bohnen-zaehlen/` | ✅ **bearbeitet**, mit 4 Testfällen getestet (`BBC`→2, `Bohnen & Bananen`→2, `bbb`→0, `kakkerlak`/k→4). ⏳ **Nicht eingereicht.** Einreichung (vorzeigen oder Bildschirmaufnahme per Mail) erst nach Bestätigung durch Sarah, keine feste Frist. |

**HTML2-Übungen ohne Bearbeitung:** Rückverlinkung/`href`-Tabelle (S. 24–25), Pfad-Übung + Kopfnuss (S. 38, 44), Relativität `musik/` (S. 51–52), Kreuzworträtsel (S. 53–55).

## Was noch fehlt

### Neu am 20.10.
- [x] Seite lokal nur über Server testen: `python3 -m http.server 8000` → http://localhost:8000 (per Doppelklick lädt fetch() nichts)
- [x] Veröffentlichung geklärt: Vercel statt GitHub Pages (Repo bleibt privat)
- [x] Neuer fester Abschnitt `## Meine Learnings` (✏️) nach jeder Vorlesung, 5 Leitfragen → in CONTENT_GUIDE aufgenommen
- [x] n8n: Workflow „Vorlesungs-Rückblick“ (Mo 18:00 → Issue) und „Learnings eintragen“ (Formular → Ollama → Branch `learnings`) laufen
- [ ] Learnings für V1–V3 über das Formular eintragen (Production-URL, Workflow ist veröffentlicht)
- [x] Struktur gebaut: Sprungmarken im Kapitel + Unterseiten learnings.html / uebungen.html / ueber.html → **prüfen und mergen**
- [x] Erste Animation: Request-Ablauf Browser → Server → Card (auf ueber.html, beide Wege: localhost und file://)
- [x] Tippfehler „Elixire“ behoben (Aufgaben-Repo 9241ba6)
- [x] Kopie `aufgaben/19.10_aufgabe1_bar/` geprüft: schon aktuell. Aufgaben vom 12.10. neu nach `aufgaben/` kopiert

**Abweichung (PO-Wunsch 20.10.):** Unterseiten und Server-Animation sind neue Infrastruktur, bewusst entgegen „keine neuen Demos“.

### Seit 19.10.
- [x] **Layout überarbeiten** (Feedback PO 19.10.): Farbschema „Hell“ gewählt (22.11.)
- [ ] Vorlesung 03 auf `status: fertig` setzen (Demo-Hinweis entfernen)
- [ ] **Notizen des Kommilitonen** zum 19.10. besorgen und in `03.md` als ✏️ einarbeiten
- [x] **GoodNotes-Export** liegt vor: `Skripte/Web-Programming.pdf` (196 S.: Skripte V1 + V2 mit handschriftlichen Notizen; zum 19.10. nichts enthalten)
- [ ] Klären, welche Folien am 19.10. tatsächlich besprochen wurden (siehe „Offene Fragen“ in `03.md`)
- [ ] Optionale HTML2-Übungen: Baustelle, Pfad-Übung, Relativität, Kreuzworträtsel
- [ ] Übungsnummerierung festlegen: Zählen die 12.10.-Aufgaben mit?
- [ ] Danach `03.md` auf `status: fertig` setzen
- [x] Vorlesungen 01 und 02 mit echtem Inhalt gefüllt (21.10.) → selbst durchlesen, offene ❓ prüfen, dann `status: fertig`
- [ ] Sprint auf GitHub anlegen (Meilenstein + Issues im Repo `the-web-journey`)

## Vorlesung 1 und 2 – was gesichert ist (21.10.)

Quelle: `Skripte/Web-Programming.pdf` (GoodNotes-Export), alle 196 Seiten gelesen, Handschrift als ✏️ übernommen.

- **01.md:** Prüfungsform (Folien + meine Notizen S. 2), Web-Anwendungen, drei Architekturen, Skriptsprache vs. Programmiersprache (Notizen S. 3), erste JavaScript-Beispiele, Übung `<noscript>`
- **02.md:** HTML-Teil (Webserver/Browser, Tags, Elemente, Sternback, CSS) + JS-Teil (innerHTML, externe Dateien, `use strict`, `console`, Variablen, Typen, Operatoren, Schleifen, Arrays, Objekte); Übungen Sternback, prompt/alert, Sternchen-Dreieck (Abgabe) mit 🤖-Code-Check
- **Zwei Fehler im Skript gefunden und als 🤖 markiert:** `prompt` liefert bei Abbrechen `null` (nicht `false`), `person[lastName]` braucht Anführungszeichen
- **Unsicher gelesene Handschrift** (HTML1 Folie 36, Notiz neben `let`) ist als ❓ markiert

## PM-Abnahme (Übergabe Pappaccina, 19.10.)

| Erwartet | Stand | Wo |
|---|---|---|
| Konsolidierte Doku Vorlesung 3 | ✅ beide Skripte vollständig, Herkunft gekennzeichnet (📘 ✏️ 🤖 ❓) | `content/vorlesungen/03.md` |
| Geprüfte, ausführbare Lösung „Bohnen zählen“ | ✅ 4 Testfälle, im Browser geprüft; **bearbeitet, nicht eingereicht** | Aufgaben-Repo + `aufgaben/` + ▶ in Kapitel 03 |
| Stand der HTML-Übungen | ✅ KopfüBar korrigiert und getestet, offene Übungen gelistet | Abschnitt „Übungen“ oben |
| Folgeprompts Vorlesung 1 und 2 | ✅ mit Seitenangaben im GoodNotes-Export | Abschnitt „Wie es weitergeht“ |
| Statusbericht | ✅ diese Datei | – |

**Abweichung von der Übergabe (auf Wunsch der PO):** Statt „kein Demo-Bau“ haben wir die
JS-Beispiele auf der Kapitelseite **ausführbar** gemacht: „▶ Ausführen“ + Terminal-Fenster,
der Code ist bearbeitbar. Kein Framework, nur ca. 50 Zeilen in `js/chapter.js` und Stil in `css/chapter.css`.
