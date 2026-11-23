# Status – Stand 23.11.2026, 06:00

Kurze Übergabe: Wo stehen wir, was fehlt, wie geht es weiter.
Langfristige Planung: [ROADMAP.md](ROADMAP.md) · Abgabe heute: [ABGABE.md](ABGABE.md)

## Übergabe 23.11., 06:00 – Cursor + Vercel

- **Hauptstand entschieden:** `design-hell-vercel` → PR #13 → `abgaben-3-semester`. Ab jetzt nur dort weiterarbeiten.
  `finale-abgabe`, `design`, `portfolio/ordnernavigation` sind ältere Parallel-Entwürfe = nur Archiv (Details in ABGABE.md).
- **Cursor:** Projektordner in Cursor öffnen (`File → Open Folder`). Die Regeln für die KI in Cursor liegen in
  `.cursor/rules/projekt.mdc` (kein Framework, Herkunfts-Emojis, `inhalte-buendeln.py` nach Markdown-Änderungen, HTML nicht umbenennen).
  Vorschau: `start.command` oder `python3 -m http.server 5500`.
- **Vercel:** statische Seite, kein Build. `.vercelignore` hält interne Notizen (STATUS, ABGABE, PITCH, PROTOKOLL, ROADMAP, `.cursor/`) aus der Live-Seite heraus.
  Push auf `abgaben-3-semester` = Production, jeder andere Branch = Vorschau-Link.
- **Geprüft:** 15 HTML-Seiten ohne tote lokale Links, alle JS-Dateien syntaktisch ok, `js/inhalte.js` synchron mit den 7 Kapiteln.
- **Offen bei Sarah:** Vercel-Teamzugriff für Claude freigeben (oder selbst im Dashboard prüfen) · Archiv-Tags + Zweige löschen (Befehle in ABGABE.md) · Repos für den Prof freigeben · Frist klären (19:00 oder 0:00).

## Update 23.11.2026, 06:00 – Übergabe vor der Präsentation

- [x] Terminal + Atlas-Bot (V1, lokal) auf jeder Seite, Entwickler-Ansicht „Jean“, KopfüBar an Bord (Deck aller Übungen)
- [x] Pitch (`PITCH.md`), Abgabe-Checkliste mit Mail-Entwurf (`ABGABE.md`), Protokoll/Archiv (`PROTOKOLL.md`), `tools/abgabe-zip.sh`
- [x] Test: 21 Seiten über Server und per Doppelklick, Handy – keine Fehler
- [ ] **Vercel ist noch nicht live** (Autorisierung offen) – Rückfall: ZIP / `start.command`
- [ ] PR #13 mergen, PR #12 schließen, Zweige aufräumen (siehe `ABGABE.md`)
- [ ] Learnings V01, V02, V04–V07 · Abgabe V05 · Repos für den Prof sichtbar machen
- ⚠️ Frist unklar: 19:00 (Abgabeplan) oder 24:00 (Nachricht 22.11.)

## Update 22.11.2026 (vor der Präsentation am 23.11.)

**Erledigt:**
- [x] **Layout/Design überarbeitet** (Feedback PO 19.10.): Alle Farben als CSS-Variablen, fünf Farbschemata in `css/farben.css`. Gewählt: **„Hell“** – Hintergrund `#f5f5f7`, Apple-Blau `#0071e3`/`#0066cc`, Orange `#bf4800`, feines Raster, Verlauf im Titel, Terminal-Logo `>_`. Farbwähler unten rechts (Wahl wird im Browser gemerkt).
- [x] Weicher Übergang hinter der Sticky-Grafik auf schmalen Bildschirmen (vorher harte Kante)
- [x] **marked lokal** unter `js/vendor/marked.min.js` → Seite läuft offline bei der Präsentation
- [x] Favicon `>_` (vorher 404 im Log)
- [x] Währungsrechner (26.10.) nach `aufgaben/26.10_aufgabe1_waehrungsrechner/` kopiert
- [ ] **Hosting über Vercel** vorbereitet, Autorisierung durch Sarah noch offen
- ⚠️ Lokal hießen die Seiten zwischenzeitlich `1_index.html` usw. – dadurch waren alle Links kaputt. HTML-Dateien nicht umbenennen.

- [x] **Struktur Portfolio 1 / 2:** Umschalter oben mit schrägem Schnitt – links Portfolio 1 (Web-Programmierung, WiSe 26/27), rechts Portfolio 2 (Verteilte Systeme, SoSe 27, `verteilte-systeme.html`)
- [x] Neue Seite **Über mich** (`ueber-mich.html`): erster Pitch + Links zu GitHub-Profil, beiden Repos und der Website. ⚠️ Repos sind privat – für den Prof öffentlich machen oder einladen.
- [x] „Über das Projekt“ heißt jetzt **„Über das Portfolio“**, Navigation: Schwerpunkt · Vorlesungen · Übungen · Learnings · Portfolio · Über mich
- [x] „Reise“-Sprache entfernt („Sieben Vorlesungen. Alles an einem Ort.“)
- [x] **Vorlesungen 04–07** aus allen Skripten zusammengefasst (Quelle: gesammelte Skript-Ablage, 507 Folien per Texterkennung gelesen; Texte unter `Vika_Wp-alle Skripte/_text/` auf dem Mac). 08 entfällt (`ANZAHL_VORLESUNGEN = 7`).
  - 04 Strings, Formulare & CSS (26.10.) – Abgabe Währungsrechner verlinkt
  - 05 Objekte, JSON & Klassen – **Abgabe Kontakte-Klasse offen**
  - 06 DOM & jQuery – Übungen Kreative Überschriften, Pull Quotes offen
  - 07 Events & Browser-Steuerung (Skript WebProg-25!) – Übungen Tabellenreihen, Akkordeon offen
  - alle JS-Beispiele mit node und im Browser („▶ Ausführen“) getestet

**Review-Runde 22.11., 17:30 (Prüfung aus Sicht des Profs):**

| # | Befund | Erledigt |
|---|---|---|
| 1 | Learnings-Seite leer | ✅ Learning V3 vom Branch `portfolio/ordnernavigation` übernommen – **V1, V2, V4–V7 fehlen noch (selbst schreiben!)** |
| 2 | Apple-Aufhänger fehlt im Schwerpunkt | ✅ Demo 00: Laptop klappt beim Scrollen auf (120 Bilder im `<canvas>`, Quelle CSS-Tricks) |
| 3 | Entwurf-Hinweis „Skript und Notizen“ falsch für V4–7 | ✅ „Aus den Skripten zusammengefasst“ |
| 4 | Doppelklick auf index.html lädt keine Kapitel | ✅ `start.command` (Doppelklick → Server + Browser) |
| 5 | Handy: Menü abgeschnitten | ✅ Menü bricht zweizeilig um |
| 6 | Offene Übungen nicht erkennbar | ✅ Etikett „offen“ + Zählung auf der Übungsseite |
| 7 | V1: „Präsentation 10 Min“ ≠ Folie (5 + 10 Min) | ✅ korrigiert, als ❓ dokumentiert |
| 8 | ARCHITECTURE.md veraltet | ✅ aktualisiert |
| – | Technik-Check: 21 Seiten, alle Links und Sprungmarken | ✅ keine Fehler (einziger 404 = fehlendes Favicon in Übung 12.10 Aufgabe 1, bleibt original) |

**Offen (Iteration 2):**
- [ ] Daten von V5–V7 prüfen (aus Wochenrhythmus abgeleitet, V7 fehlt)
- [ ] Abgabe V5 (Kontakte-Klasse) lösen und ins Aufgaben-Repo
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
