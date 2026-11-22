#!/usr/bin/env python3
"""Abgabe-Countdown: Erinnerungen, die häufiger werden, je weniger vorangeht.

Liest ABGABE.md (Checkboxen, Fristen, "happy: NN") und den Git-Stand und zeigt
eine macOS-Mitteilung. Danach wartet das Skript bis zur nächsten Erinnerung.

Regeln:
- Abstand = Zeit bis zur nächsten Frist / (offene Punkte bis dahin + 1), zwischen 5 und 60 Minuten
- Seit der letzten Erinnerung nichts abgehakt → Abstand × 0,7 (häufiger)
- Etwas abgehakt → Abstand × 1,3 (ruhiger)
- Feste Wecker vor der Präsentation: 60, 30, 15 und 5 Minuten vor 15:15
- Stumm während der Präsentation (15:12–15:45), Nachtruhe bis 07:30, Schluss um 19:00 oder sobald "happy: 92" (oder mehr) in ABGABE.md steht

Aufruf im Projektordner:
  python3 tools/countdown.py              läuft, bis Schluss ist (Terminal offen lassen)
  python3 tools/countdown.py --einmal     zeigt nur den aktuellen Stand, ohne Mitteilung
  python3 tools/countdown.py --einmal --jetzt 14:50   Stand zu einer anderen Uhrzeit testen
"""
import argparse
import datetime as dt
import re
import subprocess
import time
from pathlib import Path

ORDNER = Path(__file__).resolve().parent.parent
PLAN = ORDNER / "ABGABE.md"
PRAESENTATION = "15:15"
SCHLUSS = "19:00"
NACHTRUHE_BIS = "07:30"
ZIEL_HAPPY = 92


def uhrzeit(text, heute):
    h, m = map(int, text.split(":"))
    return heute.replace(hour=h, minute=m, second=0, microsecond=0)


def plan_lesen(heute):
    """Gibt (Abschnitte, happy) zurück. Abschnitt = (Frist, erledigt, offen)."""
    abschnitte, frist, erledigt, offen = [], None, 0, 0
    happy = 0
    for zeile in PLAN.read_text(encoding="utf-8").splitlines():
        treffer = re.search(r"<!--\s*frist\s+(\d{1,2}:\d{2})\s*-->", zeile)
        if zeile.startswith("## ") and treffer:
            if frist:
                abschnitte.append((frist, erledigt, offen))
            frist, erledigt, offen = uhrzeit(treffer.group(1), heute), 0, 0
        elif re.match(r"\s*- \[[xX]\]", zeile):
            erledigt += 1
        elif re.match(r"\s*- \[ \]", zeile):
            offen += 1
        elif m := re.match(r"happy:\s*(\d+)", zeile):
            happy = int(m.group(1))
    if frist:
        abschnitte.append((frist, erledigt, offen))
    return abschnitte, happy


def git_stand():
    try:
        letzter = subprocess.run(["git", "log", "-1", "--format=%cr"], cwd=ORDNER,
                                 capture_output=True, text=True).stdout.strip()
        heute = subprocess.run(["git", "log", "--since=midnight", "--oneline"], cwd=ORDNER,
                               capture_output=True, text=True).stdout.strip().splitlines()
        return f"letzter Commit {letzter}, heute {len(heute)}"
    except OSError:
        return "Git nicht erreichbar"


def lage(jetzt, letzte_erledigt):
    """Berechnet Nachricht, Abstand (Minuten), Dringlichkeit und ob Schluss ist."""
    heute = jetzt.replace(hour=0, minute=0, second=0, microsecond=0)
    abschnitte, happy = plan_lesen(heute)
    erledigt = sum(a[1] for a in abschnitte)
    gesamt = erledigt + sum(a[2] for a in abschnitte)
    prozent = round(100 * erledigt / gesamt) if gesamt else 100
    schluss = uhrzeit(SCHLUSS, heute)

    if happy >= ZIEL_HAPPY or prozent >= ZIEL_HAPPY:
        return f"🎉 {max(happy, prozent)} % – Ziel erreicht. Timer beendet.", None, False, erledigt, True
    if jetzt >= schluss:
        return f"19:00 – Abgabe. Stand {prozent} %.", None, True, erledigt, True

    # nächste Frist mit offenen Punkten (überfällige zuerst)
    naechste = next(((f, o) for f, e, o in abschnitte if o > 0), (schluss, 0))
    frist, offen_bis_frist = naechste
    rest = (frist - jetzt).total_seconds() / 60
    if rest <= 0:
        abstand, text_frist = 5, f"⚠️ Frist {frist:%H:%M} überschritten – {offen_bis_frist} Punkte offen"
    else:
        abstand = rest / (offen_bis_frist + 1)
        text_frist = f"Frist {frist:%H:%M} in {int(rest // 60)} h {int(rest % 60)} min – {offen_bis_frist} offen"

    if letzte_erledigt is not None:
        abstand *= 1.3 if erledigt > letzte_erledigt else 0.7
    abstand = max(5, min(60, abstand))

    # feste Wecker vor der Präsentation
    praes = uhrzeit(PRAESENTATION, heute)
    for vorher in (60, 30, 15, 5):
        wecker = praes - dt.timedelta(minutes=vorher)
        bis_wecker = (wecker - jetzt).total_seconds() / 60
        if 0 < bis_wecker < abstand:
            abstand = bis_wecker

    # Ruhe während der Präsentation (Bildschirm wird geteilt!): 15:12 bis 15:45
    stumm_ab, stumm_bis = praes - dt.timedelta(minutes=3), praes + dt.timedelta(minutes=30)
    if stumm_ab <= jetzt < stumm_bis:
        return "Präsentation läuft – stumm bis 15:45.", (stumm_bis - jetzt).total_seconds() / 60, False, erledigt, False
    if jetzt < stumm_ab < jetzt + dt.timedelta(minutes=abstand):
        abstand = (stumm_ab - jetzt).total_seconds() / 60

    # Nachtruhe
    ruhe_ende = uhrzeit(NACHTRUHE_BIS, heute)
    if jetzt + dt.timedelta(minutes=abstand) < ruhe_ende:
        abstand = (ruhe_ende - jetzt).total_seconds() / 60

    dringend = rest < 30 or (0 < (praes - jetzt).total_seconds() / 60 <= 15)
    text = f"{prozent} % erledigt · {text_frist} · {git_stand()} · nächste Erinnerung in {round(abstand)} min"
    return text, abstand, dringend, erledigt, False


def mitteilen(text, dringend):
    ton = ' sound name "Glass"' if dringend else ""
    titel = "Abgabe – jetzt dranbleiben!" if dringend else "Abgabe-Countdown"
    skript = f'display notification "{text}" with title "{titel}"{ton}'
    subprocess.run(["osascript", "-e", skript], check=False)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--einmal", action="store_true", help="nur Stand anzeigen, keine Mitteilung")
    parser.add_argument("--jetzt", help="Uhrzeit simulieren, z. B. 14:50 (nur mit --einmal)")
    args = parser.parse_args()

    letzte_erledigt = None
    while True:
        jetzt = dt.datetime.now()
        if args.jetzt:
            jetzt = uhrzeit(args.jetzt, jetzt)
        text, abstand, dringend, erledigt, fertig = lage(jetzt, letzte_erledigt)
        print(f"[{jetzt:%H:%M}] {text}", flush=True)
        if args.einmal:
            return
        if not text.startswith("Präsentation läuft"):
            mitteilen(text, dringend)
        if fertig:
            return
        letzte_erledigt = erledigt
        time.sleep(abstand * 60)


if __name__ == "__main__":
    main()
