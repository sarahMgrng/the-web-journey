# Status – Stand 19.10.2026

Kurze Übergabe: Wo stehen wir, was fehlt, wie geht es weiter.
Langfristige Planung: [ROADMAP.md](ROADMAP.md).

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
| 01 | 05.10. | Wie das Web funktioniert | Demo-Inhalt, muss ersetzt werden |
| 02 | 12.10. | Das HTML-Grundgerüst | Demo-Inhalt, muss ersetzt werden |
| 03 | 19.10. | JavaScript-Funktionen & Links | **zusammengefasst** aus beiden Skripten, Status `demo`, bis die Lücken geschlossen sind |
| 04–08 | – | – | Platzhalter |

**Aufgaben im Aufgaben-Repo:** 12.10. Aufgaben 1–3, 19.10. Bar, 19.10. Bohnen zählen.
Die Aufgaben vom 19.10. sind zusätzlich als lauffähige Kopie unter `aufgaben/` im Portfolio und aus Vorlesung 03 verlinkt („▶ live ansehen“).

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
| KopfüBar mit Ordnern (HTML2, S. 9–13, 24, 31, 48) | `CODE_WP_Aufgaben/19.10_aufgabe1_bar/` | ✅ bearbeitet und getestet. Korrigiert: `getränke/` → `getraenke/`, Bildpfade → `../bilder/…`, Rücklinks → `../bar.html`, doppelte Altdateien mit `.. /bilder` (Leerzeichen) und `bar/bar.html` entfernt. **Bilddateien vollständig** (`getraenke.gif`, `gruen/hellblau/blau/rot.jpg`), es fehlt keine. Linktext „Elexiere“ ist ein Tippfehler im Original und noch offen. |
| Bohnen zählen (vorl3, Folie 35, **Abgabe**) | `CODE_WP_Aufgaben/19.10_aufgabe2_bohnen-zaehlen/` | ✅ **bearbeitet**, mit 4 Testfällen getestet (`BBC`→2, `Bohnen & Bananen`→2, `bbb`→0, `kakkerlak`/k→4). ⏳ **Nicht eingereicht.** Einreichung (vorzeigen oder Bildschirmaufnahme per Mail) erst nach Bestätigung durch Sarah, keine feste Frist. |

**HTML2-Übungen ohne Bearbeitung:** Rückverlinkung/`href`-Tabelle (S. 24–25), Pfad-Übung + Kopfnuss (S. 38, 44), Relativität `musik/` (S. 51–52), Kreuzworträtsel (S. 53–55).

## Was noch fehlt

- [ ] **Notizen des Kommilitonen** zum 19.10. besorgen und in `03.md` als ✏️ einarbeiten
- [x] **GoodNotes-Export** liegt vor: `Skripte/Web-Programming.pdf` (196 S.: Skripte V1 + V2 mit handschriftlichen Notizen; zum 19.10. nichts enthalten)
- [ ] Klären, welche Folien am 19.10. tatsächlich besprochen wurden (siehe „Offene Fragen“ in `03.md`)
- [ ] Optionale HTML2-Übungen: Baustelle, Pfad-Übung, Relativität, Kreuzworträtsel
- [ ] Übungsnummerierung festlegen: Zählen die 12.10.-Aufgaben mit?
- [ ] Danach `03.md` auf `status: fertig` setzen
- [ ] Vorlesungen 01 und 02 mit echtem Inhalt füllen (siehe Prompts unten)
- [ ] Sprint auf GitHub anlegen (Meilenstein + Issues im Repo `the-web-journey`)

## Wie es mit Vorlesung 1 und 2 weitergeht

**Arbeitsweise wie bei Vorlesung 3:**
- das Skript vollständig lesen
- Inhalte nach Herkunft kennzeichnen (📘 ✏️ 🤖 ❓)
- die bestehende Datei befüllen, keine neue Struktur
- Lücken offen markieren statt sie zu erfinden

Quelle für beide: `~/Desktop/Web-Prog_3S/Skripte/Web-Programming.pdf` (GoodNotes-Export = Skript + meine handschriftlichen Notizen):

| Seiten | Inhalt |
|---|---|
| 1–3 | eigene Notizen (Prüfungsform Portfolio, Skriptsprachen) |
| 4–53 | Vorlesung 1 „Einführung“ (05.10.) |
| 54–137 | Vorlesung 1ex „Einführung in HTML“ (12.10.) |
| 138–196 | Vorlesung 2-1 „JavaScript Grundlagen“ (12.10.) |

### Prompt für Vorlesung 1

```text
Wir arbeiten Vorlesung 1 (05.10.2026) von Web-Programmierung auf.
Projekt: ~/Desktop/Web-Prog_3S/Portfolio_the-web-journey
Ziel-Datei: content/vorlesungen/01.md (enthält aktuell Demo-Inhalt → komplett ersetzen).

Quellen:
- Skript + meine GoodNotes-Anmerkungen: ~/Desktop/Web-Prog_3S/Skripte/Web-Programming.pdf,
  Seiten 1–53 (S. 1–3 = eigene Notizen zur Prüfungsform, S. 4–53 = Vorlesung 1 "Einführung", 05.10.)
  Handschrift gilt als ✏️, gedruckter Folientext als 📘.

Bitte:
1. Lies STATUS.md, CONTENT_GUIDE.md und content/vorlesungen/03.md als Vorbild für Aufbau und Kennzeichnung.
2. Lies das Skript vollständig (auch Bild-Folien) und notiere die Themen mit Foliennummer.
3. Schreibe 01.md nach dem Schema des CONTENT_GUIDE (Überblick, Lernziele, Zusammenfassung,
   Beispiele, Übungen, Offene Fragen & Lücken). Trenne strikt:
   📘 Skript (mit Folie) · ✏️ meine Notiz · 🤖 KI-Erklärung · ❓ offen.
4. Übungen aus dem Skript mit <details>-Lösung aufnehmen. Gibt es Code dazu im Aufgaben-Repo, verweise darauf.
5. Titel, Beschreibung und Datum in den Metadaten anpassen. Status bleibt "demo", bis ich den Inhalt geprüft habe.
6. Aktualisiere danach STATUS.md (Tabelle Vorlesungen + "Was noch fehlt").
Keine neue Infrastruktur, keine neuen Demos. Erkläre schwierige Stellen so, dass ich sie wirklich verstehe.
```

### Prompt für Vorlesung 2

```text
Wir arbeiten Vorlesung 2 (12.10.2026) von Web-Programmierung auf.
Projekt: ~/Desktop/Web-Prog_3S/Portfolio_the-web-journey
Ziel-Datei: content/vorlesungen/02.md (enthält aktuell Demo-Inhalt → komplett ersetzen).

Quellen:
- Skript + meine GoodNotes-Anmerkungen: ~/Desktop/Web-Prog_3S/Skripte/Web-Programming.pdf,
  Seiten 54–137 (Vorlesung 1ex "Einführung in HTML") und 138–196 (Vorlesung 2-1 "JavaScript Grundlagen"), beide am 12.10.
  Handschrift gilt als ✏️, gedruckter Folientext als 📘.
- Meine Aufgaben vom 12.10. im Aufgaben-Repo CODE_WP_Aufgaben:
  12.10_Aufgabe1 (Sternback-Kaffee, HTML+CSS), 12.10_Aufg2 (prompt/alert), 12.10_Aufg3_Abschluss (Sternchen-Dreieck)

Bitte:
1. Lies STATUS.md, CONTENT_GUIDE.md und content/vorlesungen/03.md als Vorbild für Aufbau und Kennzeichnung.
2. Lies das Skript vollständig (auch Bild-Folien) und notiere die Themen mit Foliennummer.
3. Schreibe 02.md nach dem Schema des CONTENT_GUIDE. Trenne strikt:
   📘 Skript (mit Folie) · ✏️ meine Notiz · 🤖 KI-Erklärung · ❓ offen.
4. Nimm die drei Aufgaben vom 12.10. als Übungen auf: Aufgabenstellung laut Skript, meine Lösung als
   Code-Ausschnitt in <details>, dazu eine 🤖-Erklärung, warum der Code funktioniert. Prüfe meinen Code auf Fehler.
5. Titel, Beschreibung und Datum in den Metadaten anpassen. Status bleibt "demo", bis ich den Inhalt geprüft habe.
6. Kläre mit mir die Übungsnummerierung über das Semester und aktualisiere danach STATUS.md.
Keine neue Infrastruktur, keine neuen Demos. Erkläre schwierige Stellen so, dass ich sie wirklich verstehe.
```

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
