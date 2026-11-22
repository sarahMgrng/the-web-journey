# The Web Journey

Interaktive Lernwebsite für das Modul **Webprogrammierung** (DHBW).
Sie fasst sieben aufeinander aufbauende Vorlesungen zusammen (Portfolio 1). Portfolio 2 (Verteilte Systeme, SoSe 2027) hat oben rechts schon seinen Platz.
Technischer Schwerpunkt ist **Scrollytelling**: Die Startseite erklärt die Technik und führt sie gleichzeitig vor.

**Stand (22.11.):** Vorlesung 1–7 aus den Skripten zusammengefasst (Status `demo`, bis ich sie geprüft habe).
Dazu die Unterseiten Learnings, Übungen, Über das Portfolio, Über mich und die Startseite von Portfolio 2.

## Technik

- HTML5, CSS3, Vanilla JavaScript – kein Framework, kein Build-Schritt
- Inhalte als Markdown-Dateien in `content/vorlesungen/`
- Einzige externe Bibliothek: [marked](https://marked.js.org/) (wandelt Markdown in HTML um), liegt lokal unter `js/vendor/` – die Seite läuft auch ohne Internet
- Farben nur über CSS-Variablen: Standard ist das helle Schema „Hell“ (Apple-Blau & Orange), vier weitere Schemata in `css/farben.css`, umschaltbar über den Farbwähler unten rechts

## Starten

Die Seite lädt ihre Inhalte per `fetch()`. Browser erlauben das nur über einen (lokalen) Server,
**nicht** beim Öffnen per Doppelklick.

**Variante 0 – Doppelklick (macOS)**
`start.command` doppelklicken. Ein Terminal startet den Server und öffnet http://localhost:5500. Beim ersten Mal
ggf. Rechtsklick → „Öffnen“ (Gatekeeper). Fenster schließen = Server aus.

**Variante A – VS Code (empfohlen)**
1. Erweiterung **Live Server** installieren (Ritwick Dey).
2. Ordner `the-web-journey` in VS Code öffnen.
3. Rechtsklick auf `index.html` → **Open with Live Server**.

**Variante B – Terminal**
```bash
cd the-web-journey
python3 -m http.server 5500
```
Dann im Browser `http://localhost:5500` öffnen.

## Online: Vercel

Die Seite ist eine reine statische Website (kein Build-Schritt). Vercel ist mit diesem Repo verbunden:
Jeder Push auf `abgaben-3-semester` wird automatisch als Produktionsversion veröffentlicht,
jeder andere Branch bekommt eine eigene Vorschau-Adresse.

Einstellungen bei Vercel: Framework „Other“, kein Build Command, Output Directory = Projektordner (Standard).

## Ordnerstruktur

```
the-web-journey/
├── index.html            Startseite (Portfolio 1): Hero, 4 Scrollytelling-Demos, Vorlesungen
├── kapitel.html          EIN Template für alle Vorlesungen (kapitel.html?nr=2)
├── learnings.html        Sammelt „Meine Learnings“ aus allen Vorlesungen
├── uebungen.html         Sammelt alle Übungen mit Links zu Lösung und Live-Version
├── ueber.html            Über das Portfolio + Animation „Anfrage und Antwort“
├── ueber-mich.html       Über mich: Pitch und Links (GitHub, Repos, Website)
├── verteilte-systeme.html  Portfolio 2 (SoSe 2027), erreichbar über den Umschalter oben rechts
├── css/
│   ├── style.css         Gemeinsame Basis: Farben, Schrift, Header, Footer
│   ├── home.css          Nur Startseite: Hero, Demos, Cards
│   ├── chapter.css       Kapitelseite: Kopf, Markdown-Text, Sprungmarken, Blättern
│   ├── seiten.css        Unterseiten: Einträge, Fortschritt, Animation
│   └── farben.css        Fünf Farbschemata (Standard: „hell“) + Farbwähler
├── js/
│   ├── content.js        Lädt & zerlegt die Markdown-Dateien (von allen Seiten genutzt)
│   ├── home.js           Startseite: Fade-in, Sticky Section, Cards erzeugen
│   ├── chapter.js        Kapitelseite: Template füllen, Sprungmarken, Navigation
│   ├── learnings.js      Learnings-Seite
│   ├── uebungen.js       Übungs-Seite
│   ├── ueber.js          Animation auf der Über-Seite
│   ├── farben.js         Farbwähler unten rechts
│   └── vendor/marked.min.js  Markdown → HTML (lokal, offline)
├── content/
│   ├── _vorlage.md       Kopiervorlage für neue Vorlesungen
│   └── vorlesungen/
│       └── 01.md … 07.md Eine Datei pro Vorlesung
├── aufgaben/            Lauffähige Kopien meiner Übungen (Quelle: Repo wp-aufgaben-3-semester)
│   └── TT.MM_aufgabeN_name/
└── *.md                  Dokumentation (siehe unten)
```

## Dokumentation

- [ARCHITECTURE.md](ARCHITECTURE.md) – Aufbau und technische Entscheidungen
- [CONTENT_GUIDE.md](CONTENT_GUIDE.md) – Vorlesungen ergänzen, Animationen anpassen
- [ROADMAP.md](ROADMAP.md) – Stand, offene Aufgaben, spätere Erweiterungen
