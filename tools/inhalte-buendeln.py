#!/usr/bin/env python3
"""Packt alle Kapitel (content/vorlesungen/*.md) in eine JavaScript-Datei: js/inhalte.js

Warum? Per Doppelklick geöffnet (file://) darf die Seite die Markdown-Dateien nicht per fetch() laden.
Eine Datei, die mit <script src="js/inhalte.js"> eingebunden ist, lädt der Browser aber immer.
content.js nimmt die Inhalte von hier, wenn fetch() nicht geht.

Aufruf im Projektordner:  python3 tools/inhalte-buendeln.py
(start.command macht das bei jedem Start automatisch.)
"""
import json
from pathlib import Path

ordner = Path(__file__).resolve().parent.parent
inhalte = {}
for datei in sorted((ordner / "content" / "vorlesungen").glob("[0-9][0-9].md")):
    inhalte[datei.stem] = datei.read_text(encoding="utf-8")

ziel = ordner / "js" / "inhalte.js"
ziel.write_text(
    "// AUTOMATISCH ERZEUGT von tools/inhalte-buendeln.py – nicht von Hand bearbeiten.\n"
    "// Kopie aller Kapitel für den Start per Doppelklick (file://). Quelle bleibt content/vorlesungen/*.md\n"
    "window.INHALTE = " + json.dumps(inhalte, ensure_ascii=False, indent=1) + ";\n",
    encoding="utf-8",
)
print(f"js/inhalte.js: {len(inhalte)} Kapitel gebündelt")
