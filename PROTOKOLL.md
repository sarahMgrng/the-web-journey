# Protokoll & Orga – The Web Journey

Arbeitsprotokoll für Portfolio 1 (Web-Programmierung, WiSe 2026/27). Neueste Einträge oben.

## Entscheidungen (gelten bis auf Widerruf)

| Thema | Entscheidung |
| --- | --- |
| Technik | Reines HTML/CSS/JS, kein Framework, kein Build-Schritt |
| Inhalte | Eine Markdown-Datei pro Vorlesung (`content/vorlesungen/0X.md`), Vorlage `kapitel.html?nr=X` |
| Herkunft | Jeder Absatz gekennzeichnet: 📘 Skript · ✏️ eigene Notiz/Lösung · 🤖 KI-Erklärung · ❓ offen |
| Design | Theme „hell“ (Apple-Blau + Orange) als Standard, 4 weitere Themes wählbar |
| Schwerpunkt | Scrollytelling, Höhepunkt Apple-Bildsequenz |
| Übungen | Code bleibt unverändert; Rahmen „KopfüBar an Bord“ über `aufgaben/bord.js` |
| Offline | Läuft per Doppelklick – `js/inhalte.js` ist die Ersatzkopie der Kapitel |
| Bot | Atlas V1 lokal im Browser; Ollama erst mit Server-Adresse + Freigabe |
| Hosting | Nur nach ausdrücklicher Freigabe (Vercel, Team „pappuccino“) |
| Portfolio 2 | „Verteilte Systeme“, SoSe 2027 – Platzhalter, Umschalter oben |

## Protokoll

### 23.11.2026, 03:00–05:40 – Terminal, Atlas, Jean, An Bord
- Terminal auf allen Seiten (auch Übungen), Öffnen per `^`, `>_` oder Titel-Cursor.
- Atlas-Bot als zweiter Tab, sucht in den Kapiteln, verlinkt die Stelle; `js/atlas-config.js` für Ollama vorbereitet.
- Entwickler-Ansicht „Jean“: Tags an Überschriften, `<body>`-Rahmen; `jean on/off`.
- `bar.html` → Deck aller Übungen mit Pitch, Schiff und 9 Stationen.
- Review V1 im Terminal (`review`). Test: 21 Seiten, http + file://, Handy – keine Fehler.
- `PITCH.md`, `ABGABE.md`, `PROTOKOLL.md`, `tools/abgabe-zip.sh` angelegt; Archiv-Tags für parallele Zweige vorbereitet (Befehle in `ABGABE.md`, setzt Sarah).

### 22.–23.11.2026 – Inhalte, Design, Offline
- Vorlesungen 04–07 aus allen Skripten (OCR) geschrieben, jQuery-Details gegen den Skripttext geprüft.
- Farbschema „hell“, Portfolio-1/2-Umschalter, Seiten „Über mich“ und „Über das Portfolio“.
- Start per Doppelklick (`file://`) und `start.command`.
- Review-Runde, Briefing-Doc, Dashboard, Plan „Live-Bühnen“ (Issues #14–#20).

### Oktober 2026 – Grundgerüst
- Repo, Kapitelvorlage, Vorlesungen 01–03, KopfüBar-Übung, erste Learnings (V03).

## Offene Punkte (Owner)

| Punkt | Wer | Issue |
| --- | --- | --- |
| Learnings V01, V02, V04–V07 | Sarah | #21 |
| Abgabe V05 Kontakte-Klasse | Sarah | #22 |
| Abgabe-Mail + ZIP | Sarah | #23 |
| PR #13 mergen, Zweige aufräumen | Sarah (Klick) | – |
| Repos öffentlich / Prof einladen | Sarah | – |
| Atlas ↔ Ollama | Sarah (Adresse) → Claude | – |
| Live-Bühnen V01–V07 | optional | #14–#20 |

## Archiv

Parallele Entwürfe werden als Git-Tags gesichert (Befehle in `ABGABE.md`) (`git checkout archiv/<name>` holt sie zurück):

- `archiv/finale-abgabe` – Reise-Demo, Countdown-Tool, Abgabeplan, 99_Archiv
- `archiv/design-schnittwerk` – Marke „Schnittwerk“, interaktiver Atlas, Rundgang mit Prüfungsfragen
- `archiv/ordnernavigation` – Ordnerbaum-Navigation (PR #12)
- `archiv/learnings`, `archiv/ausbau-v1-v2` – frühe Stände
