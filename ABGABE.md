# Abgabe – Checkliste für den 23.11.2026

> ⚠️ **Frist klären:** In der Nachricht vom 22.11. steht „per E-Mail morgen Abend um 0:00“.
> Die ältere Datei auf dem Branch `finale-abgabe` nennt **Präsentation 15:15** und **Abgabe 19:00**.
> Im Zweifel die frühere Zeit nehmen.

**Entschieden 23.11., 06:00:** `design-hell-vercel` ist der Hauptstand und wird über PR #13 in
`abgaben-3-semester` gemergt. Ab dann gilt: **nur noch auf `abgaben-3-semester` arbeiten** (Push = Vercel live).
Bearbeiten in Cursor: Ordner öffnen, die Projektregeln liegen in `.cursor/rules/projekt.mdc`.

## Morgens – finale Sicherung (≈ 20 Min.)

- [ ] Mac-Ordner wieder verbinden: Abfrage in der Claude-App beantworten (Ordner wurde umbenannt/verschoben).
- [ ] Neuesten Stand holen: `git checkout abgaben-3-semester && git pull`.
- [ ] `start.command` doppelklicken → Website einmal durchklicken: Start, V01–V07, Übungen, An Bord, Terminal (`^`), Atlas.
- [ ] `index.html` per Doppelklick öffnen → läuft auch ohne Server.
- [ ] Learnings, die heute noch dazukommen: in `content/vorlesungen/0X.md` unter `## Meine Learnings`, danach `python3 tools/inhalte-buendeln.py`.
- [ ] ZIP bauen: `bash tools/abgabe-zip.sh` → `abgabe/the-web-journey_<datum>.zip`.

## GitHub aufräumen (Ziel: ein Hauptzweig)

Standardzweig bleibt **`abgaben-3-semester`** (Vercel-Production hängt daran – vor der Abgabe nicht umbenennen).
Geprüft 23.11., 06:00 (alle Zweige gegeneinander verglichen):

| Zweig | Stand | Entscheidung |
| --- | --- | --- |
| `abgaben-3-semester` | Hauptzweig, bis zum Merge Stand 21.10. | **bleibt Hauptzweig**, bekommt PR #13 |
| `design-hell-vercel` | neuester Stand (05:42), PR #13 konfliktfrei, 15 Seiten ohne tote Links | **→ mergen**, danach löschen |
| `finale-abgabe` | Paralleler Entwurf 01:08 (Reise-Demo als Platzhalter, Countdown, 99_Archiv) – älter, kein Terminal/Atlas | nur Archiv |
| `design` | Paralleler Entwurf „Schnittwerk“ (Marke, Atlas-Seite, Prüfungsfragen) | nur Archiv – Prüfungsfragen stehen in `PITCH.md` |
| `portfolio/ordnernavigation` | Ordnerbaum-Navigation (PR #12) | PR #12 schließen, nur Archiv |
| `ausbau-v1-v2-unterseiten` | vollständig in `abgaben-3-semester` enthalten | löschen |
| `learnings` | alt (20.10.), vollständig enthalten | löschen – **aber** n8n-Workflow „Learnings eintragen“ schreibt in diesen Branch! Erst Workflow auf `abgaben-3-semester` umstellen |

**Vor dem Löschen Archiv-Tags setzen.** Claude kann aus der Cloud keine Tags anlegen (Proxy blockt es) – deshalb ist noch **kein Zweig gelöscht**. Einmal im Terminal im Projektordner:

```bash
git fetch origin
git tag archiv/finale-abgabe     origin/finale-abgabe
git tag archiv/design-schnittwerk origin/design
git tag archiv/ordnernavigation  origin/portfolio/ordnernavigation
git tag archiv/learnings         origin/learnings
git tag archiv/ausbau-v1-v2      origin/ausbau-v1-v2-unterseiten
git push origin --tags

# danach (erst wenn die Tags auf GitHub sichtbar sind):
git push origin --delete finale-abgabe design portfolio/ordnernavigation ausbau-v1-v2-unterseiten design-hell-vercel
# learnings erst löschen, wenn n8n auf abgaben-3-semester umgestellt ist
```

Danach geht nichts verloren (`git checkout archiv/<name>` holt jeden Entwurf zurück).
Nach der Abgabe optional: Standardzweig in `main` umbenennen (dann auch bei Vercel → Settings → Git den Production Branch anpassen).

- [ ] PR #13 mergen (GitHub → Pull requests → #13 → *Merge*)
- [ ] Archiv-Tags gesetzt (Befehle oben)
- [ ] PR #12 schließen
- [ ] Alte Zweige löschen (Tags bleiben)
- [ ] Vercel: Production Branch = `abgaben-3-semester`, Deployment Protection für Production aus (sonst sieht der Prof eine Vercel-Anmeldung) – Link im privaten Fenster testen
- [ ] Repos für den Prof sichtbar: öffentlich stellen **oder** Prof als Collaborator einladen (`the-web-journey`, `wp-aufgaben-3-semester`)
- [ ] Optional: Vercel-Deployment (braucht deine Bestätigung des Autorisierungslinks)

## Abgabe-Mail (Entwurf)

**Betreff:** Abgabe Portfolio 1 Web-Programmierung – Sarah Gehring

> Sehr geehrter Herr / Sehr geehrte Frau [Name],
>
> anbei meine Abgabe für Portfolio 1 im Modul Web-Programmierung.
>
> - **Ordner (ZIP):** im Anhang – `index.html` lässt sich direkt per Doppelklick öffnen, mit `start.command` (macOS) läuft die Seite über einen lokalen Server.
> - **Website:** [Vercel-Adresse, falls gehostet]
> - **GitHub Portfolio:** https://github.com/sarahMgrng/the-web-journey
> - **GitHub Übungen (Originale):** https://github.com/sarahMgrng/wp-aufgaben-3-semester
>
> Inhalte sind nach Herkunft gekennzeichnet (Skript, eigene Notiz, KI-Erklärung, offene Frage).
>
> Viele Grüße
> Sarah Gehring

- [ ] Anhang: ZIP · Links geprüft (im privaten Fenster öffnen!) · abgeschickt
