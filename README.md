# The Web Journey

Interaktive Lernwebsite für das Modul **Webprogrammierung** (DHBW).
Sie fasst acht aufeinander aufbauende Vorlesungen zusammen.
Technischer Schwerpunkt ist **Scrollytelling**: Die Startseite erklärt die Technik und führt sie gleichzeitig vor.

**Stand:** MVP v0.1, technisches Fundament. Vorlesung 1 und 2 enthalten Demo-Inhalte, Vorlesung 3–8 sind Platzhalter.

## Technik

- HTML5, CSS3, Vanilla JavaScript – kein Framework, kein Build-Schritt
- Inhalte als Markdown-Dateien in `content/vorlesungen/`
- Einzige externe Bibliothek: [marked](https://marked.js.org/) (wandelt Markdown in HTML um, wird per CDN geladen)

## Starten

Die Seite lädt ihre Inhalte per `fetch()`. Browser erlauben das nur über einen (lokalen) Server,
**nicht** beim Öffnen per Doppelklick.

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

Für die Kapitelseiten wird eine Internetverbindung benötigt (marked kommt vom CDN).

## Ordnerstruktur

```
the-web-journey/
├── index.html            Startseite: Hero, 4 Scrollytelling-Demos, Kapitelübersicht
├── kapitel.html          EIN Template für alle Vorlesungen (kapitel.html?nr=2)
├── css/
│   ├── style.css         Gemeinsame Basis: Farben, Schrift, Header, Footer
│   ├── home.css          Nur Startseite: Hero, Demos, Cards
│   └── chapter.css       Nur Kapitelseite: Kopf, Markdown-Text, Blättern
├── js/
│   ├── content.js        Lädt & zerlegt die Markdown-Dateien (von beiden Seiten genutzt)
│   ├── home.js           Startseite: Fade-in, Sticky Section, Cards erzeugen
│   └── chapter.js        Kapitelseite: Template mit Inhalt füllen, Navigation
├── content/
│   ├── _vorlage.md       Kopiervorlage für neue Vorlesungen
│   └── vorlesungen/
│       └── 01.md … 08.md Eine Datei pro Vorlesung
├── aufgaben/            Lauffähige Kopien meiner Übungen (Quelle: Repo wp-aufgaben-3-semester)
│   └── TT.MM_aufgabeN_name/
└── *.md                  Dokumentation (siehe unten)
```

## Dokumentation

- [ARCHITECTURE.md](ARCHITECTURE.md) – Aufbau und technische Entscheidungen
- [CONTENT_GUIDE.md](CONTENT_GUIDE.md) – Vorlesungen ergänzen, Animationen anpassen
- [ROADMAP.md](ROADMAP.md) – Stand, offene Aufgaben, spätere Erweiterungen
