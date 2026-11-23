# SMG · Webprog · The Web Journey – Leitfaden zur Abgabe

**Abgabe:** Portfolio 1 – Web-Programmierung, DHBW Mannheim  
**Präsentation:** 23. November 2026, 15:15 Uhr  
**Einstieg:** `abgabe.html` (geführte Übersicht), `index.html` (die eigentliche Website)  
**Technische Nachträge:** `launch-review.html` und `scroll-lab.html`, nach der Präsentation ergänzt.  
**Code-Sicherung:** `archiv/launch-2026-11-23` (unveränderte Präsentationsbasis), `abgabe/prof-2026-11-23` (Abgabeversion).

## 1 – OHNE Server: Datei per Doppelklick

1. ZIP vollständig entpacken – nicht nur `index.html` aus der ZIP herausziehen.
2. Im entpackten Ordner die Datei **`html-og.html`** öffnen: HTML ohne eigenes CSS und ohne JavaScript. Mit Standarddarstellung des Browsers, nativen Links, Tabellen und `details`.
3. Zurück zum Ordner; **`index.html`** per Doppelklick öffnen. Diese Datei enthält die volle Website mit CSS und JavaScript und liest bei `file://` die offline gebündelten Vorlesungsdaten aus `js/inhalte.js`.
4. Unter „Über das Portfolio“ die gewählte Architektur ansehen und im [Launch-Review](launch-review.html) den 404-Vorfall nachvollziehen.

**Wichtig:** Nicht `index.html` mit „nur HTML“ gleichsetzen. HTML, CSS und JavaScript laufen auch direkt aus Dateien. Nur bestimmte Browser-APIs – insbesondere lokale `fetch()`-Anfragen – sind über `file://` eingeschränkt.

## 2 – MIT lokalem Server: Terminal auf dem Mac

Terminal öffnen und **in den entpackten Projektordner wechseln**. Praktisch: `cd ` (mit Leerzeichen) eingeben und den Ordner aus dem Finder ins Terminal ziehen. Return drücken.

Dann:

```bash
python3 tools/inhalte-buendeln.py
python3 -m http.server 5500
```

Im Browser `http://localhost:5500` öffnen. Jetzt holt `js/content.js` die Vorlesungs-Markdown-Dateien mit `fetch()` über HTTP. **Das bleibt komplett auf dem Mac; Vercel ist nicht beteiligt.**

Zum Beenden im Terminal `Ctrl+C` drücken. Alternative auf dem Mac: `bash start.command` direkt im Projektordner ausführen.

## 3 – LIVE im Internet: Vercel

Ein optionaler, befristeter Leselink führt zur gehosteten Abgabeversion. Vercel liefert die Dateien aus dem GitHub-Branch `abgabe/prof-2026-11-23` über HTTPS. Die URL funktioniert auch auf dem Smartphone und ohne den Mac.

Der Freigabelink ist **kein Admin-Account und keine E-Mail-Identitätsprüfung**. Das GitHub-Repository ist privat: Einsicht in den Quellcode benötigt eigene Berechtigungen.

## 4 – Inhaltliche Führung

1. `html-og.html`: Ursprung – HTML-Struktur und der DOM-Baum.
2. `index.html`: Schwerpunkt Scrollytelling, Animationen, sticky section und Canvas-Sequenz.
3. `index.html#kapitel`: sieben Vorlesungen, aus Markdown-Dokumenten erzeugt.
4. `uebungen.html`: Übersicht der Übungen (einschließlich Boot-/Bar-Seite).
5. `ueber.html`: Architektur, Datenweg und Reflexion.
6. `launch-review.html`: Statusgrafik zu HTTP 404 → Diagnose → überprüftem Online-Status; Fehlerursache bleibt ausdrücklich ungesichert.
7. `scroll-lab.html`: **nachträgliches Experiment** „Daumenkino“ – Scrollposition steuert Frames, Werkzeugkasten mit Änderungsmöglichkeiten.

## 5 – Was wurde bei der Präsentation nicht vollständig gezeigt?

Eine funktionierende Kernfassung wurde vorgeführt, aber der stärkere rechte Design-Werkzeugkasten und Teile der Nachtiteration waren noch nicht vollständig präsentiert. Das Scroll-Daumenkino wurde anschließend als Experiment ergänzt. Der 404 ist ein beobachteter Fehler von kurz vor Präsentationsbeginn; seine genaue Ursache lässt sich ohne damalige Browser-/Server-Logs nicht abschließend bestimmen.

## 6 – Für die Erstellung der ZIP auf dem Mac

Aus dem vollständigen Repository im Terminal:

```bash
git switch abgabe/prof-2026-11-23
git pull --ff-only
bash tools/abgabe-zip.sh
```

Ergebnis: `abgabe/the-web-journey_YYYY-MM-DD.zip` – mit den Website- und Dokumentationsdateien, aber **ohne** `.git`, Editor-Einstellungen oder Umgebungsgeheimnisse.

Alternativ: In GitHub den Branch `abgabe/prof-2026-11-23` wählen → **Code → Download ZIP**. Diese Variante ist ein vollständiger GitHub-Quellcode-Download; die Skript-ZIP ist die bereinigte Abgabe.

## 7 – Fehlercheck

- **404 Not Found:** Datei oder Pfad nicht gefunden. Quelle und URL prüfen.
- **Leere Kapitel bei `file://`:** `js/inhalte.js` muss vorhanden und nach Inhaltsänderungen neu erzeugt worden sein.
- **Port schon vergeben:** anderen Port wählen, z. B. `python3 -m http.server 5501` und `http://localhost:5501` öffnen.
- **Nach dem Start kein Bild:** Browser-Konsole prüfen; nicht jede Browser-Laufzeit behandelt lokale Datei-URLs gleich.
- **Unterschiedliche Stände:** Der alte lokale Ordner aktualisiert sich nicht durch GitHub-Merge oder Vercel-Deployment. Vor der Abgabe synchronisieren.
