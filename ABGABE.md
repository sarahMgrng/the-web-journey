# Abgabe – Checkliste für den 23.11.2026

> ⚠️ **Frist klären:** In der Nachricht vom 22.11. steht „per E-Mail morgen Abend um 0:00“.
> Die ältere Datei auf dem Branch `finale-abgabe` nennt **Präsentation 15:15** und **Abgabe 19:00**.
> Im Zweifel die frühere Zeit nehmen.

Arbeitszweig für alles Finale: **`design-hell-vercel`** (PR #13).

## Morgens – finale Sicherung (≈ 20 Min.)

- [ ] Mac-Ordner wieder verbinden: Abfrage in der Claude-App beantworten (Ordner wurde umbenannt/verschoben).
- [ ] Neuesten Stand holen: `git pull` auf `design-hell-vercel` (oder ZIP aus dem Chat entpacken).
- [ ] `start.command` doppelklicken → Website einmal durchklicken: Start, V01–V07, Übungen, An Bord, Terminal (`^`), Atlas.
- [ ] `index.html` per Doppelklick öffnen → läuft auch ohne Server.
- [ ] Learnings, die heute noch dazukommen: in `content/vorlesungen/0X.md` unter `## Meine Learnings`, danach `python3 tools/inhalte-buendeln.py`.
- [ ] ZIP bauen: `bash tools/abgabe-zip.sh` → `abgabe/the-web-journey_<datum>.zip`.

## GitHub aufräumen (Ziel: ein Hauptzweig)

Standardzweig heißt aktuell **`abgaben-3-semester`** (es gibt kein `main`). Stand 23.11., 05:40:

| Zweig | Stand | Vorschlag |
| --- | --- | --- |
| `design-hell-vercel` | **aktuell, 5 Commits voraus** | PR #13 mergen → wird der Hauptstand |
| `finale-abgabe` | Paralleler Entwurf (Reise-Demo, Countdown, 99_Archiv) | Tag `archiv/finale-abgabe`, Zweig löschen |
| `design` | Paralleler Entwurf „Schnittwerk“ (Marke, Atlas-Seite, Prüfungsfragen) | Tag `archiv/design-schnittwerk`, Zweig löschen – Prüfungsfragen sind in `PITCH.md` übernommen |
| `portfolio/ordnernavigation` | Ordnerbaum-Navigation (PR #12) | PR #12 schließen, Tag `archiv/ordnernavigation`, Zweig löschen |
| `ausbau-v1-v2-unterseiten` | schon enthalten | löschen |
| `learnings` | alt (20.10.), schon enthalten | löschen |

**Vor dem Löschen Archiv-Tags setzen** (einmal im Terminal im Projektordner – ich durfte von hier aus keine Tags anlegen):

```bash
git fetch origin
git tag archiv/finale-abgabe     origin/finale-abgabe
git tag archiv/design-schnittwerk origin/design
git tag archiv/ordnernavigation  origin/portfolio/ordnernavigation
git tag archiv/learnings         origin/learnings
git tag archiv/ausbau-v1-v2      origin/ausbau-v1-v2-unterseiten
git push origin --tags
```

Danach geht nichts verloren, auch wenn die Zweige gelöscht werden.
Optional: Standardzweig in GitHub → Settings → Branches in `main` umbenennen.

- [ ] Archiv-Tags gesetzt (Befehle oben)
- [ ] PR #13 mergen (GitHub → Pull requests → #13 → *Merge*)
- [ ] PR #12 schließen
- [ ] Alte Zweige löschen (Tags bleiben)
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
