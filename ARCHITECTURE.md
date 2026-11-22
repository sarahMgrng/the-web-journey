# Architektur

## Grundidee: Inhalt, Darstellung und Verhalten trennen

| Schicht     | Wo?                          | Aufgabe                                    |
|-------------|------------------------------|--------------------------------------------|
| Inhalt      | `content/vorlesungen/*.md`   | Was steht da? (Texte, Code, Übungen)       |
| Struktur    | `*.html`                     | Welche Bereiche gibt es?                   |
| Darstellung | `css/*.css`                  | Wie sieht es aus? Wie bewegt es sich? Farben nur als Variablen |
| Verhalten   | `js/*.js`                    | Inhalte laden, auf Scrollen reagieren      |

Jeder Inhalt existiert **genau einmal**, nämlich in der Markdown-Datei. Cards, Kapitelseite und
Vor/Zurück-Navigation lesen alle dieselbe Datei.

## Ablauf beim Laden

**Startseite (`index.html`)**
1. `content.js` stellt Hilfsfunktionen bereit (`ladeVorlesung`, `ladeAlleVorlesungen` …).
2. `home.js` lädt alle sieben Markdown-Dateien gleichzeitig (`Promise.all`).
3. Aus den Metadaten (Titel, Beschreibung, Datum, Status) entsteht pro Vorlesung eine Card.

**Kapitelseite (`kapitel.html?nr=2`)**
1. `chapter.js` liest die Nummer aus der Adresse (`URLSearchParams`).
2. Lädt `content/vorlesungen/02.md`, trennt Metadaten und Inhalt.
3. Füllt den Kopfbereich mit den Metadaten und wandelt den Inhalt mit `marked` in HTML um.
4. Lädt die Titel der Nachbarvorlesungen für „Vorherige / Nächste“.
5. Gibt jeder Überschrift eine `id` (`alsAnker` in `content.js`) und baut daraus die Leiste „Auf dieser Seite“.
   Weil der Inhalt erst nach dem Laden da ist, springt `chapter.js` danach selbst zum Anker in der Adresse (`#meine-learnings`).

**Unterseiten (`learnings.html`, `uebungen.html`)**
1. Laden wie die Startseite alle Dateien (`ladeAlleVorlesungen`).
2. Schneiden mit `abschnitt(inhalt, "Meine Learnings")` bzw. `abschnitt(inhalt, "Übungen")` den passenden Teil heraus.
3. Verlinken zurück in die Kapitelseite, z. B. `kapitel.html?nr=3#meine-learnings`.

Sie haben also keinen eigenen Inhalt: Alles steht weiterhin genau einmal in der Markdown-Datei.

**Seiten ohne Markdown (`ueber.html`, `ueber-mich.html`, `verteilte-systeme.html`)**
Statischer Text direkt im HTML. `verteilte-systeme.html` ist die Startseite von Portfolio 2; der Umschalter oben (`.portfolio-wahl` in `style.css`) verbindet beide Portfolios.

**Über das Portfolio (`ueber.html`)**
Statischer Text direkt im HTML, weil er sich kaum ändert. `ueber.js` spielt die Animation „Wie diese Seite zu dir kommt“ ab:
Es setzt nur `data-weg` und `data-schritt` am `<figure>`, alle Zustände stehen in `seiten.css`, wie bei der Sticky Section der Startseite.

## Entscheidungen

**Markdown statt HTML oder JSON für Inhalte**
Markdown ist gut lesbar, lässt sich leicht aus aufbereiteten Vorlesungsnotizen übernehmen und
unterstützt Code-Blöcke. Die Metadaten stehen im Kopf der Datei (Frontmatter).

**Kein Build-Tool, Markdown wird im Browser umgewandelt**
Ein Build-Tool (z. B. Node.js-Skript) würde Node voraussetzen und vor jeder Änderung einen
Build-Schritt verlangen. Bei sieben kleinen Dateien bringt das keinen Vorteil. Nachteil der
gewählten Lösung: Ein lokaler Server ist nötig (`fetch()` funktioniert nicht über `file://`).

**Feste Dateinamen `01.md` … `07.md` statt Inhaltsverzeichnis**
Eine statische Website kann einen Ordner nicht auflisten. Statt einer zusätzlichen Liste, die man
pflegen müsste, gilt eine Namenskonvention: Die Nummer steht im Dateinamen. Die Anzahl steht
einmal in `js/content.js` (`ANZAHL_VORLESUNGEN`). Fehlt eine Datei, erscheint automatisch ein Platzhalter.

**Eigener Frontmatter-Parser statt Bibliothek**
Die Metadaten sind einfache `schluessel: wert`-Zeilen. Dafür reichen ~15 Zeilen eigener Code
(`zerlegeMarkdown` in `content.js`). Listen oder verschachtelte Werte werden bewusst nicht unterstützt.

**Ein Kapitel-Template mit URL-Parameter**
`kapitel.html?nr=3` statt sieben HTML-Dateien: Layoutänderungen wirken sofort auf alle Kapitel.

**Animationen: CSS bevorzugt, JavaScript nur wo nötig**
- *Einstieg (Hero)*: CSS `@keyframes` beim Laden.
- *Hero beim Wegscrollen & Demo 03*: CSS Scroll-driven Animations (`animation-timeline`).
  Mit `@supports` abgesichert: Browser ohne Unterstützung zeigen die statische Version.
- *Fade-in & Sticky Section*: Intersection Observer (JavaScript) setzt nur Klassen/Attribute,
  das Aussehen bestimmt weiterhin CSS.
- *Demo 00 (Apple-Technik)*: Ein `scroll`-Listener rechnet die Scrollposition in eine Bildnummer (0–119) um und
  zeichnet dieses Bild in ein `<canvas>`. `requestAnimationFrame` sorgt dafür, dass höchstens einmal pro
  Bildschirm-Aktualisierung gezeichnet wird; ist es dasselbe Bild wie vorher, passiert gar nichts.

**Farben als CSS-Variablen**
Alle Farben stehen als Variablen in `style.css` (`:root`) bzw. `farben.css`. Ein Farbschema ist nur eine weitere Regel für
`<html data-farbe="…">`. Standard ist „hell“; der Farbwähler (`farben.js`) ändert nur dieses eine Attribut.

**Bibliothek lokal statt CDN**
`marked` liegt unter `js/vendor/`, damit die Seite bei der Präsentation auch ohne Internet läuft.

**Start per Doppelklick**
Über `file://` blockiert der Browser `fetch()`. Darum gibt es zwei Wege:
- `js/inhalte.js` (erzeugt von `tools/inhalte-buendeln.py`) enthält eine Kopie aller Kapitel als `window.INHALTE` und wird
  per `<script>` eingebunden – das lädt der Browser auch über `file://`. `ladeText()` in `content.js` nimmt sie, wenn es
  keinen Server gibt. Quelle bleibt das Markdown; die Kopie wird nie von Hand bearbeitet.
- `start.command` (macOS): bündelt neu, startet `python3 -m http.server` und öffnet den Browser.
Online liegt die Seite bei Vercel, dort lädt `fetch()` direkt die Markdown-Dateien.

**Barrierearmut**
- Semantisches HTML (`header`, `main`, `nav`, `article`), Skip-Link, sichtbarer Fokusrahmen.
- `prefers-reduced-motion`: Alle Animationen werden abgeschaltet, Inhalte sind sofort sichtbar.
- Ohne JavaScript bleibt alles lesbar: Elemente werden nur versteckt, wenn die Klasse `.js` gesetzt ist.
- Aufklappbare Erklärungen und Lösungen nutzen `<details>` (per Tastatur bedienbar, ohne JS).

## Sicherheitshinweis

Markdown und Metadaten werden ungefiltert als HTML eingefügt (`innerHTML`). Das ist in Ordnung,
solange nur eigene Dateien geladen werden. Würden Inhalte später von Dritten kommen, müsste man
sie vorher bereinigen (z. B. mit DOMPurify).

Dasselbe gilt für die ausführbaren JS-Beispiele: `chapter.js` führt ```js-Blöcke per `new Function()`
aus. Unbedenklich, weil nur eigener Code aus `content/` läuft – fremde Inhalte dürften so nie ausgeführt werden.

**Learnings aus dem n8n-Formular** landen ebenfalls als Markdown in `content/` und werden als HTML eingefügt. Das Formular ist
mit Passwort geschützt, und der Workflow schreibt nur auf den Branch `learnings`. Erst nach meiner Durchsicht kommt der Text per
Merge auf die Seite. Diese Kontrolle ist der eigentliche Schutz – darum nie ungeprüft mergen.
