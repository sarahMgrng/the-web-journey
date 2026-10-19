# Architektur

## Grundidee: Inhalt, Darstellung und Verhalten trennen

| Schicht     | Wo?                          | Aufgabe                                    |
|-------------|------------------------------|--------------------------------------------|
| Inhalt      | `content/vorlesungen/*.md`   | Was steht da? (Texte, Code, Übungen)       |
| Struktur    | `index.html`, `kapitel.html` | Welche Bereiche gibt es?                   |
| Darstellung | `css/*.css`                  | Wie sieht es aus? Wie bewegt es sich?      |
| Verhalten   | `js/*.js`                    | Inhalte laden, auf Scrollen reagieren      |

Jeder Inhalt existiert **genau einmal**, nämlich in der Markdown-Datei. Cards, Kapitelseite und
Vor/Zurück-Navigation lesen alle dieselbe Datei.

## Ablauf beim Laden

**Startseite (`index.html`)**
1. `content.js` stellt Hilfsfunktionen bereit (`ladeVorlesung`, `ladeAlleVorlesungen` …).
2. `home.js` lädt alle acht Markdown-Dateien gleichzeitig (`Promise.all`).
3. Aus den Metadaten (Titel, Beschreibung, Datum, Status) entsteht pro Vorlesung eine Card.

**Kapitelseite (`kapitel.html?nr=2`)**
1. `chapter.js` liest die Nummer aus der Adresse (`URLSearchParams`).
2. Lädt `content/vorlesungen/02.md`, trennt Metadaten und Inhalt.
3. Füllt den Kopfbereich mit den Metadaten und wandelt den Inhalt mit `marked` in HTML um.
4. Lädt die Titel der Nachbarvorlesungen für „Vorherige / Nächste“.

## Entscheidungen

**Markdown statt HTML oder JSON für Inhalte**
Markdown ist gut lesbar, lässt sich leicht aus aufbereiteten Vorlesungsnotizen übernehmen und
unterstützt Code-Blöcke. Die Metadaten stehen im Kopf der Datei (Frontmatter).

**Kein Build-Tool, Markdown wird im Browser umgewandelt**
Ein Build-Tool (z. B. Node.js-Skript) würde Node voraussetzen und vor jeder Änderung einen
Build-Schritt verlangen. Bei acht kleinen Dateien bringt das keinen Vorteil. Nachteil der
gewählten Lösung: Ein lokaler Server ist nötig (`fetch()` funktioniert nicht über `file://`).

**Feste Dateinamen `01.md` … `08.md` statt Inhaltsverzeichnis**
Eine statische Website kann einen Ordner nicht auflisten. Statt einer zusätzlichen Liste, die man
pflegen müsste, gilt eine Namenskonvention: Die Nummer steht im Dateinamen. Die Anzahl steht
einmal in `js/content.js` (`ANZAHL_VORLESUNGEN`). Fehlt eine Datei, erscheint automatisch ein Platzhalter.

**Eigener Frontmatter-Parser statt Bibliothek**
Die Metadaten sind einfache `schluessel: wert`-Zeilen. Dafür reichen ~15 Zeilen eigener Code
(`zerlegeMarkdown` in `content.js`). Listen oder verschachtelte Werte werden bewusst nicht unterstützt.

**Ein Kapitel-Template mit URL-Parameter**
`kapitel.html?nr=3` statt acht HTML-Dateien: Layoutänderungen wirken sofort auf alle Kapitel.

**Animationen: CSS bevorzugt, JavaScript nur wo nötig**
- *Einstieg (Hero)*: CSS `@keyframes` beim Laden.
- *Hero beim Wegscrollen & Demo 03*: CSS Scroll-driven Animations (`animation-timeline`).
  Mit `@supports` abgesichert: Browser ohne Unterstützung zeigen die statische Version.
- *Fade-in & Sticky Section*: Intersection Observer (JavaScript) setzt nur Klassen/Attribute,
  das Aussehen bestimmt weiterhin CSS.

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
