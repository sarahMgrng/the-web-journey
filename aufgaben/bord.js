// ==========================================================
// bord.js – macht jede Übungsseite zu einer Station der „KopfüBar an Bord“
//
// 1. Kopfzeile mit Bordnavigation einsetzen
// 2. Stationsschild (welche Vorlesung, welche Übung) einsetzen
// 3. den Inhalt der Übung in eine „Kabine“ (<main class="kabine">) packen
// 4. Fußzeile + Terminal/Atlas aus dem Portfolio einbinden
// Der Code der Übung selbst bleibt unverändert.
// ==========================================================

(function () {
  const BORD = new URL(".", document.currentScript.src).href;     // …/aufgaben/
  const WURZEL = new URL("..", BORD).href;                          // Projektordner
  const zu = (datei) => new URL(datei, BORD).href;

  // Ordnername → Station (Reihenfolge = Reihenfolge der Vorlesungen)
  const STATIONEN = {
    "12.10_Aufgabe1": { nr: 1, name: "Getränkekarte", uebung: "Sternback-Kaffee mit CSS", v: "V02 · HTML1" },
    "12.10_Aufg2": { nr: 2, name: "Alterskontrolle", uebung: "Eingabe mit prompt und alert", v: "V02 · JS2" },
    "12.10_Aufg3_Abschluss": { nr: 3, name: "Sternenhimmel an Deck", uebung: "Sternchen-Dreieck", v: "V02 · Abgabe" },
    "19.10_aufgabe1_bar": { nr: 4, name: "Die Bar", uebung: "KopfüBar mit Ordnern und relativen Pfaden", v: "V03 · HTML2" },
    "19.10_aufgabe2_bohnen-zaehlen": { nr: 5, name: "Bohnenlager", uebung: "Bohnen zählen", v: "V03 · Abgabe" },
    "26.10_aufgabe1_waehrungsrechner": { nr: 6, name: "Bordkasse", uebung: "Währungsumrechner $ ↔ €", v: "V04 · Abgabe" },
  };

  const teile = location.pathname.split("/").map(decodeURIComponent);
  const ordner = Object.keys(STATIONEN).find((o) => teile.includes(o));
  const station = STATIONEN[ordner];
  const istDeck = document.body.dataset.bord === "deck";

  // ---------- 1. Kopfzeile ----------
  const kopf = document.createElement("header");
  kopf.className = "bord-kopf";
  kopf.innerHTML = `
    <a class="bord-logo" href="${zu("19.10_aufgabe1_bar/bar.html")}">⚓ KopfüBar <span>an Bord</span></a>
    <nav class="bord-nav" aria-label="Bordnavigation">
      <a href="${zu("19.10_aufgabe1_bar/bar.html")}#stationen">Alle Stationen</a>
      <a href="${zu("19.10_aufgabe1_bar/getraenke/elixir.html")}">Elixiere</a>
      <a href="${zu("19.10_aufgabe1_bar/info/wegbeschreibung.html")}">Anfahrt &amp; Rechtliches</a>
      <a href="${new URL("uebungen.html", WURZEL).href}">Übungen im Portfolio</a>
      <a href="${new URL("index.html", WURZEL).href}">↩ Portfolio</a>
    </nav>`;
  for (const a of kopf.querySelectorAll("a")) {
    if (a.href.split("#")[0] === location.href.split("#")[0] && !a.hash) a.setAttribute("aria-current", "page");
  }

  if (!istDeck) {
    // ---------- 2. Eigene CSS-Regeln für <body> gelten jetzt für die Kabine ----------
    // (z. B. Sternback: Hintergrund, Rand, Abstände – sonst würde die ganze Seite braun)
    for (const tag of document.querySelectorAll("head style")) {
      for (const regel of tag.sheet ? tag.sheet.cssRules : []) {
        if (regel.selectorText === "body") regel.selectorText = "main.kabine";
      }
    }

    // ---------- 3. Inhalt in die Kabine packen ----------
    const kabine = document.createElement("main");
    kabine.className = "kabine";
    kabine.append(...document.body.childNodes);
    document.body.append(kabine);

    if (station) {
      const unterseite = /getraenke|info/.test(location.pathname);
      const schild = document.createElement("div");
      schild.className = "bord-schild";
      schild.innerHTML = `<p>Station ${station.nr} · ${station.v}</p>
        <h2>${station.name}${unterseite ? " – " + document.title.replace(/Kopf.Bar[- ]*/, "") : ""}</h2>
        <small>${station.uebung}</small>`;
      kabine.before(schild);
    }

    // ---------- 3b. Leere Kabine? (Übungen, die nur mit prompt/alert arbeiten) ----------
    // alert() blockiert, bis man klickt – danach hat die Seite nichts zu rendern.
    // Damit die Kabine nicht leer bleibt, zeigt sie den Code und einen Knopf für die nächste Runde.
    const sichtbar = [...kabine.childNodes].some((n) => n.nodeType === 3 ? n.textContent.trim() : n.tagName !== "SCRIPT");
    if (!sichtbar) {
      const code = [...kabine.querySelectorAll("script:not([src])")].map((s) => s.textContent.trim()).join("\n\n");
      const karte = document.createElement("section");
      karte.className = "bord-leer";
      karte.innerHTML = `<p><code>alert()</code> hat geliefert – und danach gibt es im DOM nichts mehr zu rendern.
        Kein Bug, nur ein sehr minimalistisches Frontend.</p>
        <pre><code></code></pre>
        <button type="button">Nochmal ausführen</button>`;
      karte.querySelector("pre code").textContent = code;
      karte.querySelector("button").addEventListener("click", () => location.reload());
      kabine.append(karte);
    }

    // ---------- Zurück-Knopf ----------
    const zurueck = document.createElement("a");
    zurueck.className = "bord-zurueck";
    zurueck.href = zu("19.10_aufgabe1_bar/bar.html") + "#stationen";
    zurueck.textContent = "← Zurück an Deck";
    zurueck.addEventListener("click", (e) => {
      // Nur zurückblättern, wenn die vorige Seite zu diesem Portfolio gehört – sonst fester Link an Deck
      let eigen = false;
      try { eigen = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch (_) {}
      if (history.length > 1 && eigen) { e.preventDefault(); history.back(); }
    });
    kabine.before(zurueck);

    // ---------- 4. Fußzeile ----------
    const fuss = document.createElement("footer");
    fuss.className = "bord-fuss";
    fuss.innerHTML = `Der Code dieser Station ist meine Lösung aus der Vorlesung – unverändert, nur in den Bord-Rahmen gesetzt.
      Original: <a href="https://github.com/sarahMgrng/wp-aufgaben-3-semester">wp-aufgaben-3-semester</a> ·
      <a href="${new URL("ueber-mich.html#datenschutz", WURZEL).href}">Impressum &amp; Datenschutz</a> ·
      <a href="https://hallo.smg-consulting.org/">SMG Consulting</a> ·
      Terminal: Taste <kbd>^</kbd>`;
    document.body.append(fuss);
  }
  document.body.prepend(kopf);

  // ---------- Terminal + Atlas aus dem Portfolio ----------
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = new URL("css/terminal.css", WURZEL).href;
  document.head.append(css);
  for (const datei of ["js/atlas-config.js", "js/terminal.js"]) {
    const s = document.createElement("script");
    s.src = new URL(datei, WURZEL).href;
    s.async = false;   // Reihenfolge einhalten: erst Konfiguration, dann Terminal
    document.body.append(s);
  }
})();
