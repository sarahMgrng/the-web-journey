// ==========================================================
// terminal.js – Entwickler-Terminal + Atlas (Portfolio-Bot) auf jeder Seite
//
// Öffnen: Taste ^ (oder `), Klick auf ">_" oben links – oder auf den blinkenden Cursor im Titel.
// Zwei Tabs:
//   Terminal – Befehle wie ls, open, cat, grep, curl, theme, jean, review (help zeigt alle)
//   Atlas    – beantwortet Fragen aus den Kapiteln (V1: lokal im Browser, ohne Server).
//              Optional mit Ollama: js/atlas-config.js setzt window.ATLAS = { endpoint, model }.
//
// Läuft auch per Doppelklick (file://): Die Kapitel kommen dann aus js/inhalte.js.
// ==========================================================

(function () {
  // Wo liegt das Projekt? terminal.js steckt in <projekt>/js/ – eine Ebene höher ist die Wurzel.
  const SKRIPT = document.currentScript;
  const WURZEL = new URL("..", SKRIPT.src).href;
  const pfad = (datei) => new URL(datei, WURZEL).href;

  // Seiten, die man mit "open" erreicht
  const SEITEN = {
    start: "index.html",
    vorlesungen: "index.html#kapitel",
    uebungen: "uebungen.html",
    learnings: "learnings.html",
    portfolio: "ueber.html",
    ich: "ueber-mich.html",
    bar: "aufgaben/19.10_aufgabe1_bar/bar.html",
    p2: "verteilte-systeme.html",
  };

  // Dateibaum für "ls" (der Teil, den man im Portfolio sieht)
  const BAUM = {
    "": ["index.html", "kapitel.html", "uebungen.html", "learnings.html", "ueber.html", "ueber-mich.html",
         "verteilte-systeme.html", "content/", "css/", "js/", "aufgaben/", "tools/", "start.command"],
    "content": ["vorlesungen/"],
    "content/vorlesungen": () => Object.keys(window.INHALTE || {}).filter(nr => Number(nr) <= 7).map(nr => nr + ".md"),
    "css": ["style.css", "home.css", "chapter.css", "seiten.css", "farben.css", "terminal.css"],
    "js": ["content.js", "home.js", "chapter.js", "farben.js", "terminal.js", "inhalte.js", "vendor/"],
    "aufgaben": ["bord.css", "bord.js", "12.10_Aufgabe1/", "12.10_Aufg2/", "12.10_Aufg3_Abschluss/",
                 "19.10_aufgabe1_bar/", "19.10_aufgabe2_bohnen-zaehlen/", "26.10_aufgabe1_waehrungsrechner/"],
  };

  // ---------- Kapitel laden (für cat, grep und Atlas) ----------
  let inhalteVersprechen = null;
  function ladeInhalte() {
    if (window.INHALTE) return Promise.resolve(window.INHALTE);
    if (!inhalteVersprechen) {
      inhalteVersprechen = new Promise((fertig, fehler) => {
        const s = document.createElement("script");
        s.src = pfad("js/inhalte.js");
        s.onload = () => fertig(window.INHALTE || {});
        s.onerror = () => fehler(new Error("js/inhalte.js nicht gefunden"));
        document.head.append(s);
      });
    }
    return inhalteVersprechen;
  }

  // Metadaten (titel, …) und Text einer Markdown-Datei trennen
  function zerlege(md) {
    const t = md.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!t) return { meta: {}, text: md };
    const meta = {};
    for (const z of t[1].split("\n")) {
      const i = z.indexOf(":");
      if (i > 0) meta[z.slice(0, i).trim()] = z.slice(i + 1).trim();
    }
    return { meta, text: t[2] };
  }

  // Wie content.js: "Teil 3 – JSON" → "teil-3-json" (so heißen die Sprungmarken im Kapitel)
  const anker = (s) => s.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  // Markdown grob zu Klartext (für Antworten und Suchtreffer)
  const klartext = (s) => s.replace(/```[\s\S]*?```/g, " ").replace(/<[^>]+>/g, " ").replace(/[📘✏️🤖❓▶]/gu, "")
    .replace(/\*\*|__|`|#+ |>\s?/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\|/g, " ")
    .replace(/[ \t]+/g, " ").replace(/\s*\n\s*/g, "\n").trim();

  // ---------- Oberfläche bauen ----------
  const box = document.createElement("section");
  box.className = "term";
  box.hidden = true;
  box.setAttribute("aria-label", "Entwickler-Terminal");
  box.innerHTML = `
    <div class="term__kopf">
      <div class="term__tabs" role="tablist">
        <button type="button" role="tab" class="term__tab" data-tab="shell" aria-selected="true">Terminal</button>
        <button type="button" role="tab" class="term__tab" data-tab="atlas" aria-selected="false">Atlas <small>Bot</small></button>
      </div>
      <span class="term__titel"></span>
      <button type="button" class="term__zu" aria-label="Terminal schließen">✕</button>
    </div>
    <div class="term__ausgabe" aria-live="polite"></div>
    <form class="term__zeile" autocomplete="off">
      <label class="term__prompt" for="term-eingabe"></label>
      <input id="term-eingabe" class="term__eingabe" spellcheck="false" autocapitalize="off">
    </form>`;
  document.body.append(box);

  const ausgabe = box.querySelector(".term__ausgabe");
  const eingabe = box.querySelector(".term__eingabe");
  const prompt = box.querySelector(".term__prompt");
  const titel = box.querySelector(".term__titel");
  const dateiname = decodeURIComponent(location.pathname.split("/").pop() || "index.html");
  let tab = "shell";
  const verlauf = [];
  let verlaufPos = 0;
  const begruesst = { shell: false, atlas: false };
  const protokoll = { shell: [], atlas: [] };   // Ausgaben je Tab, damit der Wechsel nichts löscht

  function zeile(text, art = "") {
    const p = document.createElement("p");
    p.className = "term__z" + (art ? " term__z--" + art : "");
    p.textContent = text;
    ausgabe.append(p);
    protokoll[tab].push(p);
    ausgabe.scrollTop = ausgabe.scrollHeight;
    return p;
  }
  function linkZeile(text, href, vorher = "") {
    const p = zeile(vorher);
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text;
    p.append(a);
    return p;
  }

  function zeigeTab(neu) {
    tab = neu;
    for (const t of box.querySelectorAll(".term__tab")) t.setAttribute("aria-selected", t.dataset.tab === neu);
    box.dataset.tab = neu;
    ausgabe.replaceChildren(...protokoll[neu]);
    prompt.textContent = neu === "shell" ? "sarah@web-journey:~$" : "du ›";
    titel.textContent = neu === "shell" ? dateiname : atlasModus();
    eingabe.placeholder = neu === "shell" ? "help eingeben …" : "Frag Atlas, z. B. „Was ist JSON?“";
    if (!begruesst[neu]) { begruesst[neu] = true; neu === "shell" ? begruessungShell() : begruessungAtlas(); }
    eingabe.focus();
  }

  function oeffnen(start = tab) {
    box.hidden = false;
    document.documentElement.classList.add("term-offen");
    zeigeTab(start);
  }
  function schliessen() {
    box.hidden = true;
    document.documentElement.classList.remove("term-offen");
  }
  window.oeffneTerminal = oeffnen;

  // ---------- Terminal-Befehle ----------
  function begruessungShell() {
    zeile("The Web Journey – Entwickler-Terminal. Eingabe „help“ zeigt alle Befehle.", "info");
    zeile("Tipp: ↑/↓ blättert durch frühere Befehle, Esc schließt.", "leise");
  }

  const BEFEHLE = {
    help: { kurz: "alle Befehle", run() {
      for (const [name, b] of Object.entries(BEFEHLE)) zeile(name.padEnd(9) + b.kurz);
    } },
    ls: { kurz: "Dateien auflisten (ls js)", run(arg) {
      const ordner = (arg || "").replace(/^\.?\/*|\/+$/g, "");
      const eintrag = BAUM[ordner];
      if (!eintrag) return zeile(`ls: ${arg}: Ordner nicht gefunden`, "fehler");
      const liste = typeof eintrag === "function" ? eintrag() : eintrag;
      zeile(liste.join("   "));
    } },
    open: { kurz: "Seite öffnen (open bar · open 5 · open uebungen)", run(arg) {
      if (!arg) return zeile("Ziele: " + Object.keys(SEITEN).join(", ") + ", 1–7", "leise");
      const nr = parseInt(arg, 10);
      const ziel = nr >= 1 && nr <= 7 ? `kapitel.html?nr=${nr}` : SEITEN[arg.toLowerCase()];
      if (!ziel) return zeile(`open: ${arg}: unbekanntes Ziel`, "fehler");
      zeile("→ " + ziel, "leise");
      location.href = pfad(ziel);
    } },
    cat: { kurz: "Überblick einer Vorlesung (cat 4)", async run(arg) {
      const nr = String(parseInt(arg, 10)).padStart(2, "0");
      const md = (await ladeInhalte())[nr];
      if (!md || Number(nr) > 7) return zeile("cat: Vorlesung 1–7 angeben, z. B. cat 4", "fehler");
      const { meta, text } = zerlege(md);
      zeile(`# V${nr} – ${meta.titel}`, "info");
      const ueberblick = (text.split(/^## /m).find(t => t.startsWith("Überblick")) || "").replace(/^Überblick\s*/, "");
      zeile(klartext(ueberblick).slice(0, 600) + " …");
      linkZeile("Kapitel öffnen", pfad(`kapitel.html?nr=${Number(nr)}`), "→ ");
    } },
    grep: { kurz: "in allen Kapiteln suchen (grep closure)", async run(arg) {
      if (!arg) return zeile("grep: Suchwort fehlt", "fehler");
      const alle = await ladeInhalte();
      let treffer = 0;
      for (const [nr, md] of Object.entries(alle)) {
        if (Number(nr) > 7) continue;
        for (const z of md.split("\n")) {
          if (z.toLowerCase().includes(arg.toLowerCase()) && treffer < 12) {
            treffer++;
            zeile(`V${nr}: ${klartext(z).slice(0, 110)}`);
          }
        }
      }
      zeile(treffer ? `${treffer} Treffer (max. 12 angezeigt)` : "keine Treffer", "leise");
    } },
    curl: { kurz: "Datei beim Server anfragen (curl -I index.html)", async run(arg) {
      const datei = (arg || "index.html").replace(/^-I\s*/, "") || "index.html";
      if (location.protocol === "file:") {
        zeile("curl: Über file:// gibt es keinen Server – genau deshalb gibt es js/inhalte.js.", "fehler");
        return zeile("Starte die Seite mit start.command, dann antwortet hier ein echter Server.", "leise");
      }
      try {
        const a = await fetch(pfad(datei), { method: "HEAD", cache: "no-store" });
        zeile(`HTTP/1.1 ${a.status} ${a.statusText || (a.ok ? "OK" : "")}`, a.ok ? "ok" : "fehler");
        for (const k of ["content-type", "content-length", "last-modified", "server"]) {
          if (a.headers.get(k)) zeile(`${k}: ${a.headers.get(k)}`);
        }
      } catch (e) { zeile("curl: " + e.message, "fehler"); }
    } },
    dom: { kurz: "Elemente dieser Seite zählen", run() {
      const alle = document.querySelectorAll("body *");
      const zaehler = {};
      for (const el of alle) zaehler[el.tagName.toLowerCase()] = (zaehler[el.tagName.toLowerCase()] || 0) + 1;
      zeile(`${alle.length} Elemente im DOM von ${dateiname}`, "info");
      zeile(Object.entries(zaehler).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([t, n]) => `<${t}> ${n}`).join("  "));
    } },
    theme: { kurz: "Farbschema (theme hell · nacht · terminal · tiefsee · papier)", run(arg) {
      const knopf = document.querySelector(`.farbwahl [data-wert="${arg}"]`);
      if (!knopf) return zeile("theme: hell, nacht, terminal, tiefsee oder papier", "fehler");
      knopf.click();
      zeile(`<html data-farbe="${arg}"> – alle Farben kommen aus CSS-Variablen.`, "ok");
    } },
    jean: { kurz: "Entwickler-Ansicht an/aus (jean on · jean off)", run(arg) {
      const an = arg ? arg === "on" : !document.documentElement.classList.contains("jean");
      document.documentElement.classList.toggle("jean", an);
      try { localStorage.setItem("jean", an ? "on" : "off"); } catch { /* egal */ }
      zeile(an ? "Jean ist an: Die Seite zeigt ihre HTML-Struktur." : "Jean ist aus.", "ok");
    } },
    js: { kurz: "JavaScript ausführen (js 2 ** 10)", run(arg) {
      try {
        const wert = Function(`"use strict"; return (${arg});`)();
        zeile(typeof wert === "object" ? JSON.stringify(wert) : String(wert), "ok");
      } catch (e) { zeile(e.name + ": " + e.message, "fehler"); }
    } },
    atlas: { kurz: "zu Atlas wechseln (oder: atlas Was ist JSON?)", run(arg) {
      zeigeTab("atlas");
      if (arg) frageAtlas(arg);
    } },
    review: { kurz: "Review der Website (V1)", run() {
      REVIEW.forEach(([art, text]) => zeile(text, art));
    } },
    whoami: { kurz: "wer hat das gebaut?", run() {
      zeile("Sarah Gehring · DHBW Mannheim · Portfolio 1 Web-Programmierung");
      linkZeile("github.com/sarahMgrng", "https://github.com/sarahMgrng", "→ ");
    } },
    date: { kurz: "Datum und Uhrzeit", run() { zeile(new Date().toLocaleString("de-DE")); } },
    clear: { kurz: "Ausgabe leeren", run() { protokoll[tab] = []; ausgabe.replaceChildren(); } },
    exit: { kurz: "Terminal schließen", run() { schliessen(); } },
  };

  // Review der Website, Stand V1 (von Claude geprüft, 23.11.2026)
  const REVIEW = [
    ["info", "Review V1 – The Web Journey (23.11.2026)"],
    ["ok", "✓ 21 Seiten, alle Links und Sprungmarken geprüft, keine Skriptfehler"],
    ["ok", "✓ Läuft über Server und per Doppelklick (file://), offline"],
    ["ok", "✓ 7 Vorlesungen, Herkunft je Absatz gekennzeichnet, Code ausführbar"],
    ["ok", "✓ Schwerpunkt Scrollytelling: 5 Demos inkl. Apple-Bildsequenz"],
    ["ok", "✓ Übungen an Bord der KopfüBar, Originale im Repo wp-aufgaben-3-semester"],
    ["fehler", "✗ Learnings erst für V03 – Reflexion zählt am meisten"],
    ["fehler", "✗ Abgabe V05 (Kontakte-Klasse) offen"],
    ["leise", "Atlas V1 antwortet aus den Kapiteln; Ollama-Anbindung folgt"],
  ];

  async function fuehreAus(eingabeText) {
    const [name, ...rest] = eingabeText.trim().split(/\s+/);
    const befehl = BEFEHLE[name.toLowerCase()];
    if (!befehl) return zeile(`${name}: Befehl nicht gefunden – „help“ zeigt alle`, "fehler");
    try { await befehl.run(rest.join(" ")); } catch (e) { zeile(e.message, "fehler"); }
  }

  // ---------- Atlas: Fragen an die Kapitel ----------
  const STOPP = new Set(("der die das und ist sind ein eine einen einem einer zu zum zur mit von im in den dem des auf für fuer " +
    "wie was wer warum wieso als auch oder nicht es sich bei aus an man kann ich du er sie wir ihr mir mich dir " +
    "noch nur so dann wenn ob bitte erklaer erklaere erklär erkläre mal genau gibt hat haben wird werden heisst heißt " +
    "meint bedeutet unterschied zwischen welche welcher welches vorlesung").split(" "));
  const woerter = (s) => s.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .split(/[^a-z0-9#=.]+/).map(w => w.replace(/^\.+|\.+$/g, "")).filter(w => w.length > 1 && !STOPP.has(w));

  let index = null;
  async function baueIndex() {
    if (index) return index;
    const alle = await ladeInhalte();
    const stuecke = [];
    for (const [nr, md] of Object.entries(alle)) {
      if (Number(nr) > 7) continue;
      const { meta, text } = zerlege(md);
      let haupt = "", unter = "";
      for (const block of text.split(/^(?=#{2,3} )/m)) {
        const kopf = block.match(/^(#{2,3}) (.+)/);
        if (kopf) { if (kopf[1] === "##") { haupt = kopf[2].trim(); unter = ""; } else unter = kopf[2].trim(); }
        const inhalt = klartext(block.replace(/^#{2,3} .+\n?/, ""));
        if (inhalt.length < 40) continue;
        const ueberschrift = unter || haupt;
        stuecke.push({ nr: Number(nr), kapitel: meta.titel, ueberschrift, anker: anker(ueberschrift),
          text: inhalt, w: woerter(inhalt), k: woerter(ueberschrift + " " + meta.titel) });
      }
    }
    // Wie selten ist ein Wort? Seltene Wörter zählen mehr (idf)
    const df = {};
    for (const s of stuecke) for (const w of new Set(s.w)) df[w] = (df[w] || 0) + 1;
    index = { stuecke, df, n: stuecke.length };
    return index;
  }

  function suche(frage, ix, anzahl = 3) {
    const q = woerter(frage);
    return ix.stuecke.map(s => {
      let punkte = 0;
      for (const w of q) {
        const idf = Math.log(1 + ix.n / (1 + (ix.df[w] || 0)));
        const tf = s.w.filter(x => x === w || (w.length > 4 && x.startsWith(w))).length;
        punkte += Math.min(tf, 4) * idf + (s.k.includes(w) ? 3 * idf : 0);
      }
      return { s, punkte: punkte / Math.sqrt(8 + s.w.length / 20) };
    }).filter(t => t.punkte > 0).sort((a, b) => b.punkte - a.punkte).slice(0, anzahl);
  }

  function atlasModus() {
    return window.ATLAS && window.ATLAS.endpoint ? `Ollama · ${window.ATLAS.model || "Modell"}` : "V1 · lokal aus den Kapiteln";
  }

  function begruessungAtlas() {
    zeile("Hallo, ich bin Atlas – der Bot zu diesem Portfolio.", "info");
    zeile("Ich antworte aus den sieben Kapiteln und sage dir, wo es steht. Frag z. B.:", "leise");
    for (const b of ["Was ist JSON?", "Worauf zeigt this?", "Warum braucht die Seite einen Server?", "Was ist eine Closure?"]) {
      const p = zeile("");
      const k = document.createElement("button");
      k.type = "button"; k.className = "term__vorschlag"; k.textContent = b;
      k.addEventListener("click", () => frageAtlas(b));
      p.append(k);
    }
  }

  // Eigene Antworten auf Fragen, die nicht in den Kapiteln stehen
  function eingebaut(frage) {
    const f = frage.toLowerCase();
    if (/server|doppelklick|file:|fetch/.test(f) && /warum|wieso|brauch/.test(f))
      return "Die Kapitel liegen als Markdown-Dateien vor und werden per fetch() vom Server geholt. Über file:// blockiert der Browser fetch() – dann springt die Ersatzkopie js/inhalte.js ein, die per <script> geladen wird.";
    if (/wer bist du|was bist du|atlas/.test(f))
      return "Ich bin Atlas, V1: Ich durchsuche die Kapitel dieses Portfolios im Browser (Wörter zählen, seltene Wörter zählen mehr) und zeige die passendsten Stellen. Mit Ollama auf Sarahs Server kann ich später frei formulieren.";
    if (/\bfetch\b/.test(f) && !/warum|wieso/.test(f))
      return "fetch(url) fragt eine Datei beim Server an und liefert ein Promise mit der Antwort; mit await antwort.text() oder antwort.json() liest man den Inhalt. So lädt kapitel.html die Markdown-Kapitel aus content/vorlesungen/ – im Terminal zeigt „curl -I index.html“ dieselbe Anfrage mit Statuscode.";
    if (/\bdom\b/.test(f) && /was|wie/.test(f))
      return "Das DOM (Document Object Model) ist die Baumstruktur, die der Browser aus dem HTML baut: jedes Tag wird ein Knoten mit Eltern und Kindern. JavaScript ändert die Seite über diesen Baum – document.querySelector() findet Elemente, jQuery macht das mit $(…) kürzer (V06). Im Terminal zeigt „dom“, welche Elemente diese Seite hat.";
    if (/review/.test(f)) return REVIEW.map(r => r[1]).join(" · ");
    if (/scrolly|scroll/.test(f))
      return "Scrollytelling heißt: Die Geschichte erzählt sich beim Scrollen. Auf der Startseite zeige ich das in fünf Demos – Einblenden mit IntersectionObserver, ein Bereich, der mit position: sticky stehen bleibt, CSS-Scroll-Timelines und als Höhepunkt die Apple-Technik: 120 Einzelbilder, die per requestAnimationFrame passend zur Scrollposition auf ein <canvas> gezeichnet werden.";
    if (/kopf(ü|ue)bar|an bord|schiff|wo (sind|finde).*(ü|ue)bung/.test(f))
      return "Alle Übungen liegen an Bord der KopfüBar: aufgaben/19.10_aufgabe1_bar/bar.html ist das Deck, jede Übung eine Station. Der Code der Übungen ist unverändert, bord.js setzt nur Kopfzeile, Schild und Terminal dazu. Im Terminal: open bar";
    return null;
  }

  async function frageAtlas(frage) {
    zeile("du › " + frage, "frage");
    const denkt = zeile("Atlas denkt …", "leise");
    try {
      const ix = await baueIndex();
      const treffer = suche(frage, ix);
      const fest = eingebaut(frage);

      // Mit Ollama (wenn eingerichtet): Treffer als Kontext mitschicken
      if (window.ATLAS && window.ATLAS.endpoint) {
        try {
          const antwort = await frageOllama(frage, treffer);
          denkt.remove();
          zeile("Atlas › " + antwort, "antwort");
          quellen(treffer);
          return;
        } catch (e) {
          zeile(`Ollama nicht erreichbar (${e.message}) – ich antworte lokal.`, "leise");
        }
      }

      denkt.remove();
      if (fest) { zeile("Atlas › " + fest, "antwort"); return; }
      if (!treffer.length) {
        zeile("Atlas › Dazu finde ich nichts in den Kapiteln. Versuch ein Fachwort, z. B. „Closure“, „DOM“ oder „Event“.", "antwort");
        return;
      }
      const best = treffer[0].s;
      zeile(`Atlas › Laut V${String(best.nr).padStart(2, "0")} (${kurzTitel(best.ueberschrift)}): ` + kuerze(best.text, frage), "antwort");
      quellen(treffer);
    } catch (e) {
      denkt.remove();
      zeile("Atlas: " + e.message, "fehler");
    }
  }

  // Der Satz mit den meisten Suchwörtern – plus der Satz davor und danach, damit es verständlich bleibt
  function kuerze(text, frage) {
    const q = woerter(frage);
    const saetze = text.split(/(?<=[.!?])\s+|\n+/).map(x => x.replace(/^(-|\d+\.)\s+/, "").trim())
      .filter(x => x.length > 25 && !/:$/.test(x) && !/^(\d+\.|-)\s*$/.test(x));
    if (!saetze.length) return text.slice(0, 400);
    const punkte = saetze.map(x => woerter(x).filter(w => q.some(y => w.startsWith(y.slice(0, 5)))).length);
    const best = punkte.indexOf(Math.max(...punkte));
    const von = Math.max(0, best - (best > 0 && punkte[best] > 0 ? 1 : 0));
    const ergebnis = saetze.slice(von, von + 3).join(" ");
    return ergebnis.length > 520 ? ergebnis.slice(0, 520) + " …" : ergebnis;
  }
  const kurzTitel = (t) => t.replace(/\s*\((vorl|Folie|HTML|JS)[^)]*\)/g, "").replace(/`/g, "");

  function quellen(treffer) {
    if (!treffer.length) return;
    const p = zeile("Quellen: ", "leise");
    treffer.forEach((t, i) => {
      const a = document.createElement("a");
      a.href = pfad(`kapitel.html?nr=${t.s.nr}#${t.s.anker}`);
      a.textContent = `V${String(t.s.nr).padStart(2, "0")} › ${kurzTitel(t.s.ueberschrift)}`;
      p.append(a);
      if (i < treffer.length - 1) p.append(" · ");
    });
  }

  async function frageOllama(frage, treffer) {
    const kontext = treffer.map(t => `[V${t.s.nr} – ${t.s.ueberschrift}] ${t.s.text.slice(0, 1200)}`).join("\n\n");
    const steuerung = new AbortController();
    const uhr = setTimeout(() => steuerung.abort(), 25000);
    const antwort = await fetch(window.ATLAS.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: steuerung.signal,
      body: JSON.stringify({
        model: window.ATLAS.model || "llama3.1",
        stream: false,
        messages: [
          { role: "system", content: "Du bist Atlas, der Bot zu Sarahs Portfolio im Modul Web-Programmierung. " +
            "Antworte auf Deutsch, kurz (höchstens 4 Sätze) und nur mit Wissen aus dem Kontext. " +
            "Wenn der Kontext die Frage nicht beantwortet, sag das.\n\nKontext:\n" + kontext },
          { role: "user", content: frage },
        ],
      }),
    });
    clearTimeout(uhr);
    if (!antwort.ok) throw new Error("HTTP " + antwort.status);
    const daten = await antwort.json();
    return (daten.message && daten.message.content) || daten.response || "(keine Antwort)";
  }

  // ---------- Eingabe, Tasten, Auslöser ----------
  box.querySelector(".term__zeile").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = eingabe.value.trim();
    eingabe.value = "";
    if (!text) return;
    verlauf.push(text);
    verlaufPos = verlauf.length;
    if (tab === "shell") { zeile(prompt.textContent + " " + text, "befehl"); fuehreAus(text); }
    else frageAtlas(text);
  });

  eingabe.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && verlaufPos > 0) { verlaufPos--; eingabe.value = verlauf[verlaufPos]; e.preventDefault(); }
    if (e.key === "ArrowDown") { verlaufPos = Math.min(verlauf.length, verlaufPos + 1); eingabe.value = verlauf[verlaufPos] || ""; e.preventDefault(); }
    if (e.key === "Tab" && tab === "shell") {   // Befehl vervollständigen
      const passend = Object.keys(BEFEHLE).filter(b => b.startsWith(eingabe.value));
      if (passend.length === 1) eingabe.value = passend[0] + " ";
      e.preventDefault();
    }
  });

  for (const t of box.querySelectorAll(".term__tab")) t.addEventListener("click", () => zeigeTab(t.dataset.tab));
  box.querySelector(".term__zu").addEventListener("click", schliessen);

  document.addEventListener("keydown", (e) => {
    const inFeld = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && document.activeElement !== eingabe;
    if ((e.key === "^" || e.key === "`" || e.key === "Dead" && e.code === "Backquote") && !inFeld) {
      e.preventDefault();
      box.hidden ? oeffnen() : schliessen();
    }
    if (e.key === "Escape" && !box.hidden) schliessen();
  });

  // Auslöser: ">_" im Logo (wird zu einem eigenen Knopf) und der Cursor im Titel der Startseite
  const logo = document.querySelector(".site-header__logo, .bord-logo");
  if (logo) {
    const knopf = document.createElement("button");
    knopf.type = "button";
    knopf.className = "term-ausloeser";
    knopf.textContent = ">_";
    knopf.setAttribute("aria-label", "Terminal öffnen");
    const marke = document.createElement("div");   // Knopf + Logo bleiben zusammen links
    marke.className = "term-marke";
    logo.before(marke);
    marke.append(knopf, logo);
    logo.classList.add("site-header__logo--ohne-zeichen");
    knopf.addEventListener("click", () => oeffnen());
  }
  for (const c of document.querySelectorAll(".hero__cursor, [data-terminal]")) {
    c.addEventListener("click", () => oeffnen());
  }

  // Entwickler-Ansicht „Jean“: standardmäßig an, Wahl wird gemerkt
  let jean = "on";
  try { jean = localStorage.getItem("jean") || "on"; } catch { /* egal */ }
  document.documentElement.classList.toggle("jean", jean === "on");

  // Kleine Überraschung für alle, die die Entwicklertools öffnen
  console.log("%c>_ Psst – diese Seite hat ein eigenes Terminal. Drück ^ oder klick auf den blinkenden Cursor.",
    "font: 600 13px ui-monospace, monospace; color: #bf4800");
})();
