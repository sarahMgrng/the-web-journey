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
- `demo` – Etikett „Demo-Inhalt“ + gelber Hinweis auf der Kapitelseite
- `platzhalter` – gestrichelte Card, Kapitelseite zeigt „wird ergänzt“

Regeln: eine Angabe pro Zeile, Doppelpunkt nach dem Feldnamen, keine Listen.

### Inhalt (unter den Metadaten)

Die fünf `##`-Abschnitte sind das einheitliche Schema für alle Vorlesungen. Unterpunkte mit `###`.
Im ganzen Semester gibt es insgesamt 6 Übungen. Jede Übung steht in der Datei der Vorlesung, zu der sie gehört, und ist durchgehend nummeriert (z. B. `### Übung 3 – Titel` in `02.md`). Hat eine Vorlesung keine Übung, entfällt der Abschnitt `## Übungen`.

**Lösungen zum Aufklappen:**
```markdown
<details>
<summary>Lösung</summary>

Hier normales Markdown. Die Leerzeilen davor und danach sind wichtig!

</details>
```

**Code-Beispiele:** drei Backticks plus Sprache (`html`, `css`, `js`).

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
