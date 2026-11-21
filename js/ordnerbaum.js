// Die Skriptadresse bleibt auf allen Ordnerebenen relativ zum Portfolio auflösbar.
(() => {
  const root = new URL("../", document.currentScript.src);
  const linkURL = path => new URL(path, root).href;
  const bar = "aufgaben/19.10_aufgabe1_bar/";
  const key = "portfolio-tree:" + root.pathname;
  let state = {};
  try { state = JSON.parse(sessionStorage.getItem(key)) || {}; } catch {}
  const nav = document.createElement("nav");
  nav.className = "ordnerbaum";
  nav.setAttribute("aria-label", "Portfolio-Ordner");
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.textContent = "Portfolio-Ordner";
  toggle.setAttribute("aria-controls", "portfolio-ordner");
  toggle.setAttribute("aria-expanded", "false");
  nav.append(toggle);
  const tree = document.createElement("div");
  tree.id = "portfolio-ordner";
  nav.append(tree);
  toggle.onclick = () => toggle.setAttribute("aria-expanded",
    String(toggle.getAttribute("aria-expanded") !== "true"));

  function link(parent, label, path) {
    const a = document.createElement("a");
    a.href = linkURL(path);
    a.textContent = label;
    parent.append(a);
    return a;
  }

  function folder(parent, label, id) {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = label;
    details.append(summary);
    details.dataset.folder = id;
    details.open = state[id] ?? false;
    parent.append(details);
    return details;
  }

  function markCurrent() {
    const here = new URL(location.href);
    if (here.pathname.endsWith("/")) here.pathname += "index.html";
    const links = [...tree.querySelectorAll("a")];
    const current = links.find(a => a.href === here.href) ||
      links.find(a => a.href === here.origin + here.pathname + here.search);
    for (const a of links) a.removeAttribute("aria-current");
    if (!current) return;
    current.setAttribute("aria-current", "page");
    for (let d = current.closest("details"); d; d = d.parentElement.closest("details")) d.open = true;
  }

  async function init() {
    link(tree, "index.html", "index.html");
    link(tree, "Scrollytelling", "index.html#scrollytelling");
    const chapters = folder(tree, "Vorlesungen", "chapters");
    chapters.open = state.chapters ?? true;
    link(tree, "Meine Learnings", "learnings.html");
    link(tree, "Übungen", "uebungen.html");
    link(tree, "Über das Projekt", "ueber.html");
    document.body.prepend(nav);
    document.documentElement.classList.add("mit-ordnerbaum");
    try {
      for (const v of await ladeAlleVorlesungen()) {
        const path = "kapitel.html?nr=" + v.nr;
        const chapter = folder(chapters, zweistellig(v.nr) + " · " + v.titel, "chapter-" + v.nr);
        link(chapter, "Kapitel öffnen", path);
        for (const match of v.inhalt.matchAll(/\[([^\]]+)\]\((aufgaben\/[^)]+\.html)\)/g)) {
          const [, title, file] = match;
          if (file === bar + "bar.html") {
            const exercise = folder(chapter, "KopfüBar", "bar");
            link(exercise, "bar.html", file);
            link(exercise, "getraenke/elixir.html", bar + "getraenke/elixir.html");
            link(exercise, "info/wegbeschreibung.html", bar + "info/wegbeschreibung.html");
          } else {
            link(chapter, title.replace(/ live ansehen$/i, ""), file);
          }
        }
        if (v.inhalt.includes("## Meine Learnings")) link(chapter, "Meine Learnings", path + "#meine-learnings");
      }
    } catch {
      link(chapters, "Kapitelübersicht", "index.html#kapitel");
    }
    markCurrent();
    nav.scrollTop = Number(state.scroll) || 0;
    window.addEventListener("hashchange", markCurrent);
    window.addEventListener("pagehide", () => {
      for (const d of tree.querySelectorAll("details")) state[d.dataset.folder] = d.open;
      state.scroll = nav.scrollTop;
      try { sessionStorage.setItem(key, JSON.stringify(state)); } catch {}
    });
  }
  init();
})();
