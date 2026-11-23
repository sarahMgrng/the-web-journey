#!/usr/bin/env bash
# SMG · Webprog · The Web Journey | Bereinigte Professoren-Abgabe
# Im Projektordner aufrufen: bash tools/abgabe-zip.sh
set -euo pipefail
cd "$(dirname "$0")/.."
python3 tools/inhalte-buendeln.py
mkdir -p abgabe
datei="abgabe/the-web-journey_$(date +%Y-%m-%d).zip"
rm -f "$datei"

# Explizite Positivliste: keine Tokens, lokalen Einstellungen oder Git-Interna.
dateien=(
  index.html kapitel.html learnings.html uebungen.html
  ueber.html ueber-mich.html verteilte-systeme.html
  abgabe.html launch-review.html scroll-lab.html html-og.html
  README.md ARCHITECTURE.md CONTENT_GUIDE.md PROF_HANDBOOK.md
  css js content aufgaben
  start.command tools/inhalte-buendeln.py
)
for eintrag in "${dateien[@]}"; do
  if [[ ! -e "$eintrag" ]]; then
    echo "FEHLER: erforderlicher Eintrag fehlt: $eintrag" >&2
    exit 1
  fi
done

zip -qr "$datei" "${dateien[@]}" -x "*.DS_Store" "*/.DS_Store"
echo "Abgabe vorbereitet: $datei"
du -h "$datei"
