#!/usr/bin/env bash
# Baut die Abgabe-ZIP: Kapitel bündeln (für Doppelklick), dann alles ohne .git packen.
# Aufruf im Projektordner: bash tools/abgabe-zip.sh
set -euo pipefail
cd "$(dirname "$0")/.."
python3 tools/inhalte-buendeln.py
mkdir -p abgabe
ziel="abgabe/the-web-journey_$(date +%Y-%m-%d).zip"
rm -f "$ziel"
zip -qr "$ziel" . -x ".git/*" "abgabe/*" "*.DS_Store" "node_modules/*"
echo "fertig: $ziel ($(du -h "$ziel" | cut -f1))"
