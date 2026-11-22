#!/bin/bash
# The Web Journey – Portfolio starten (macOS: Doppelklick)
# Startet einen lokalen Webserver im Projektordner und öffnet die Seite im Browser.
# Warum? Die Kapitel werden per fetch() geladen – das klappt nur über http://, nicht über file://.

cd "$(dirname "$0")" || exit 1
PORT=5500
echo "The Web Journey läuft auf http://localhost:$PORT  (Fenster schließen = Server beenden)"
( sleep 1 && open "http://localhost:$PORT" ) &
python3 -m http.server "$PORT"
