# Geschichte – The Web Journey

Wie das Portfolio entstanden ist: Versionen, Abgabe und was danach kam. Neueste Einträge oben.
Jede Änderung läuft als Pull Request mit Review und Merge durch Sarah (Human in the Loop).

---

## Versuch 2 · Iteration 2 – gestartet 24.11.2026, 00:10

- 00:20 Papino: SMG verlinkt, Portfolio erklärt, Atlas in die Seitenleiste (`17b8e68`)

Branch `v2/iteration-2` · Pull Request als Entwurf · **wartet auf Änderungen von Papino**

Geplant (Issues):
- #27 GIF-Daumenkino per Scroll/Maus – Bild von Noll zur GIF-Analogie nötig
- #28 Werkzeugkasten: KI-Inhaltsvarianten
- #29 Alle Buttons mit Humor (Stil SMG Consulting)
- #30 Learnings-Rahmen, pro Vorlesung umschaltbar
- #31 Übungen strukturieren + direkt ausführen
- #32 Vorlesungen gegen Skripte prüfen
- #33 Lokalen Ordner aufräumen
- #34 Anfahrt, SMG-Link im Impressum, Humor-Check, Ladezeit

---

## Nach der Abgabe · 24.11.2026, 00:00–00:10 – PR #35

- `bugs.html` – **SMG Bug Findings**: 8 echte Bugs als Messenger-Chat, Analogie zur Motte im Harvard Mark II (1947)
- `<h2 id>`-Etikett statt Markdown-„##“, weniger Abstand zwischen Abschnitten
- Vorlesungen in Moodle-Struktur: „V1 05.10.“ … „V7 16.11.“ auf Karten, Kapitelkopf und Learnings; Datum V7 ergänzt
- Enthält die letzte Runde vom Abgabeabend (`b2d9189`), die beim Merge von #25 noch fehlte

## Abgabe · 23.11.2026, 24:00 – PR #25

- **E-Mail an Prof. Noll** mit ZIP, Vercel-Share-Link und GitHub (`tree/abgabe-final`)
- PR #25 um 23:42 gemergt (Stand `5ddd139`)
- ⚠️ Beim Merge wurde `abgabe-final` automatisch gelöscht → Link aus der Mail tot, letzter Commit fehlte.
  Branch um 00:00 mit `b2d9189` wiederhergestellt. Seitdem: **Branches nach dem Merge nicht löschen.**
- Inhalt von #25: aufgeräumtes Repo, README (Human in the Loop, n8n, KI), Roadmap, Werkzeugkasten auf jeder Seite,
  Standard Weiß/Orange, 404-Seite, Handnotizen, Animationen in beide Richtungen, „Wege zu meinem Portfolio“
- Spätere Runde (`b2d9189`): Impressum mit KI-Hinweis, alle Vorlesungen *fertig*, KopfüBar „Zurück an Deck“, Karte für leere Kabinen
- Tests: Runde 1 automatisch 58/58 (file:// + localhost) · Runde 2 manuell (Kimi) · Sicherheits-Scan aller Branches

## Präsentation · 23.11.2026, 15:15

- 6 Minuten: Portfolio (1 Min.) + Schwerpunkt Scrollytelling (5 Min.), danach Fragen
- 404 kurz vor Beginn → lokaler Fallback über `start.command` → dokumentiert im Launch-Review (#24)
- Präsentationsstand eingefroren: `archiv/launch-2026-11-23`

## v1.0 · 22.–23.11.2026 – PR #13

- Vorlesungen 04–07 aus allen Skripten, Design „Hell“, Portfolio-1/2-Umschalter, Über mich
- Offline per Doppelklick (`js/inhalte.js`), `start.command`
- Terminal + Atlas-Bot + Entwickler-Ansicht „Jean“, Deck „KopfüBar an Bord“

## v0.2 · Oktober 2026

- Unterseiten Learnings, Übungen, Über das Portfolio · ausführbare JS-Beispiele
- n8n: „Vorlesungs-Rückblick“ (Mo 18:00 → Issue) und „Learnings eintragen“ (Formular → Ollama → Branch → Review)

## v0.1 · Oktober 2026

- Repository, Kapitel-Template aus Markdown, Startseite mit Scrollytelling-Demos
- Vorlesungen 01–03, Übungen 12.10. und 19.10.

---

## Branches

| Branch | Zweck |
|---|---|
| `abgaben-3-semester` | Hauptzweig |
| `abgabe-final` | Abgabestand aus der Mail – **nicht löschen** |
| `v2/smg-bug-findings` | PR #35 |
| `v2/iteration-2` | Versuch 2 (Entwurf) |
| `abgabe/prof-2026-11-23` | Vercel-Projekt `the-web-journey-prof` |
| `archiv/launch-2026-11-23` | Präsentationsstand |
| `finale-abgabe` | alter Entwurf (01:08) |

Neues Repo oder weiterer Strang? → vorher **Bastien** Bescheid geben.
