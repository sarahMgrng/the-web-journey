# Roadmap – The Web Journey

Stand: 23.11.2026 (Abgabe Portfolio 1)

## ✅ v0.1 – Fundament (Oktober)

- [x] Git-Repository, ein Ordner pro Übung im Aufgaben-Repo
- [x] Kapitel-Template: eine Markdown-Datei pro Vorlesung, `kapitel.html?nr=X`
- [x] Startseite mit Hero und Scrollytelling-Demos (Fade-in, Sticky Section, Bewegen & Skalieren, Vergleich)
- [x] Erklärung jeder Technik mit Code-Beispiel
- [x] Responsive, Tastaturbedienung, `prefers-reduced-motion`
- [x] Vorlesungen 01–03 aus Skript + handschriftlichen Notizen, Herkunft gekennzeichnet (📘 ✏️ 🤖 ❓)
- [x] Übungen 12.10. (Aufgaben 1–3), 19.10. KopfüBar mit Ordnern, Bohnen zählen (4 Testfälle)

## ✅ v0.2 – Struktur & Automatisierung (Oktober)

- [x] Unterseiten Learnings, Übungen, Über das Portfolio, Sprungmarken im Kapitel
- [x] Ausführbare JS-Beispiele („▶ Ausführen“ + Ausgabe-Fenster)
- [x] Animation „Anfrage und Antwort“ (Browser → Server → Seite)
- [x] **n8n-Workflow „Vorlesungs-Rückblick“**: Mo 18:00 → GitHub-Issue mit Checkliste
- [x] **n8n-Workflow „Learnings eintragen“**: Formular → Ollama (Kontrollfragen) → eigener Branch → Review → Merge
- [x] Übung 26.10. Währungsrechner

## ✅ v1.0 – Abgabe (November)

- [x] Vorlesungen 04–07 aus allen Skripten zusammengefasst, JS-Beispiele mit Node und im Browser getestet
- [x] Design überarbeitet (Feedback 19.10.): fünf Farbschemata über CSS-Variablen, Standard „Hell“
- [x] Apple-Aufhänger: Laptop klappt beim Scrollen auf (Bildsequenz im `<canvas>`)
- [x] Portfolio-1/2-Umschalter, Seite „Über mich“
- [x] Offline-fähig: `marked` lokal, Start per Doppelklick über `js/inhalte.js`, `start.command` für localhost
- [x] Terminal auf jeder Seite, Bot **Atlas** (lokale Suche in allen Kapiteln), Entwickler-Ansicht **Jean**
- [x] Deck „KopfüBar an Bord“ für alle Übungen
- [x] Review aus Sicht des Prüfers: 21 Seiten über Server und per Doppelklick, Smartphone – keine toten Links
- [x] Hosting über Vercel: eigenes Abgabe-Projekt, geschützt durch Vercel Authentication, befristeter Leselink
- [x] Präsentation am 23.11.; Präsentationsstand gesichert im Branch `archiv/launch-2026-11-23`
- [x] `html-og.html`: dieselbe Basis als reines HTML ohne CSS/JS (Vergleich file:// · localhost · gehostet)
- [x] Launch-Review: 404 kurz vor der Präsentation offen dokumentiert (`launch-review.html`)
- [x] Leitfaden für die Abgabe (`abgabe.html`, `PROF_HANDBOOK.md`)
- [x] Abgabe-ZIP per Skript (`tools/abgabe-zip.sh`)

## 🧪 Nachtrag nach der Präsentation

- [x] Experiment Scroll-Daumenkino (`scroll-lab.html`) – ausdrücklich als Nachtrag gekennzeichnet

## 🔜 Offen / nächste Iteration

- [ ] Kapitelübersicht am Vorlesungsplan ausrichten + editierbare Akzentfarben (Branch `kapitel-nach-vorlesungsplan`, noch nicht übernommen)

- [ ] Eigene Learnings für V01, V02, V04–V07 über das n8n-Formular eintragen (V03 vorhanden)
- [ ] Abgabe V05: Klasse „Kontakte“ lösen und ins Aufgaben-Repo
- [ ] Vorlesungen selbst gegenlesen und von `demo` auf `fertig` setzen
- [ ] Datum von V07 ergänzen, Daten V05–V06 prüfen
- [ ] Offene Übungen: Kreative Überschriften, Pull Quotes (V06), Tabellenreihen, Akkordeon (V07), optionale HTML2-Übungen
- [ ] Demo 04: Einblenden bei jedem Hinscrollen neu abspielen
- [ ] Test in Safari und Firefox
- [ ] Atlas mit Ollama verbinden (Konfiguration in `js/atlas-config.js` vorbereitet)

## 💡 Später (Portfolio 2 und danach)

- „Reise einer Website“ als scrollgesteuerte Geschichte: Browser → DNS → Server → DOM, mit Code
- Übungs-Labor: Übungen mit Code + Terminal direkt auf der Seite ausführen
- Live-Bühnen: eine interaktive Demo pro Vorlesung
- Knowledge Map und Fortschrittsanzeige
- Portfolio 2 „Verteilte Systeme“ (SoSe 2027) im selben Gerüst
