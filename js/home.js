// ==========================================================
// home.js – Verhalten der Startseite
// 1. Fade-in beim Scrollen         (Demo 01 und 04)
// 2. Sticky Section                (Demo 02)
// 3. Kapitel-Cards erzeugen        (aus den Markdown-Dateien)
// Demo 03 (Bewegen & Skalieren) ist reines CSS → siehe home.css
// ==========================================================


// ---------- 1. Fade-in beim Scrollen ----------
// Der Intersection Observer meldet, wenn ein Element in den sichtbaren
// Bereich kommt. Dann bekommt es die Klasse "is-visible" – den Rest macht CSS.

const revealBeobachter = new IntersectionObserver(
  function (eintraege) {
    for (const eintrag of eintraege) {
      if (eintrag.isIntersecting) {
        eintrag.target.classList.add("is-visible");
        revealBeobachter.unobserve(eintrag.target);   // nur einmal einblenden
      }
    }
  },
  // Erst auslösen, wenn das Element 10 % über dem unteren Rand ist
  { rootMargin: "0px 0px -10% 0px" }
);

// Alle Elemente mit der Klasse "reveal" innerhalb von "bereich" beobachten
function beobachteReveals(bereich) {
  for (const element of bereich.querySelectorAll(".reveal")) {
    revealBeobachter.observe(element);
  }
}

beobachteReveals(document);


// ---------- 2. Sticky Section ----------
// Die Grafik steht still (CSS: position: sticky). Hier merken wir uns,
// welcher Textschritt gerade die Bildschirmmitte erreicht, und geben
// seine Nummer an die Grafik weiter. Wie die Grafik dann aussieht, regelt CSS.

const browserGrafik = document.querySelector(".browser");
const storySchritte = document.querySelectorAll(".story__schritt");

const schrittBeobachter = new IntersectionObserver(
  function (eintraege) {
    for (const eintrag of eintraege) {
      if (eintrag.isIntersecting) {
        // data-schritt="3" am Text → data-schritt="3" an der Grafik
        browserGrafik.dataset.schritt = eintrag.target.dataset.schritt;

        // Nur der aktuelle Schritt ist hervorgehoben
        for (const schritt of storySchritte) {
          schritt.classList.toggle("is-active", schritt === eintrag.target);
        }
      }
    }
  },
  // Trick: Der beobachtete Bereich wird zu einer waagerechten Linie verkleinert.
  // Am Desktop liegt sie in der Bildschirmmitte (oben und unten je 50 % abgeschnitten).
  // Am Smartphone verdeckt die Grafik die obere Hälfte – dort liegt die Linie bei 75 %.
  { rootMargin: istSchmalerBildschirm() ? "-75% 0px -25% 0px" : "-50% 0px -50% 0px" }
);

// Gleiche Grenze wie in home.css (@media (max-width: 800px))
function istSchmalerBildschirm() {
  return window.matchMedia("(max-width: 800px)").matches;
}

for (const schritt of storySchritte) {
  schrittBeobachter.observe(schritt);
}


// ---------- 3. Kapitel-Cards ----------

// Erzeugt das HTML für EINE Card
function erzeugeCard(vorlesung, index) {
  const istPlatzhalter = vorlesung.status === "platzhalter";
  const zusatzKlasse = istPlatzhalter ? " kapitel-card--platzhalter" : "";

  // Template-Literal (Backticks): ${…} setzt Werte direkt in den Text ein
  return `
    <li class="reveal" style="--verzoegerung: ${index % 4}">
      <a class="kapitel-card${zusatzKlasse}" href="kapitel.html?nr=${vorlesung.nr}">
        <div class="kapitel-card__kopf">
          <span class="kapitel-card__nr" aria-hidden="true">${zweistellig(vorlesung.nr)}</span>
          ${statusBadge(vorlesung.status)}
        </div>
        <h3 class="kapitel-card__titel">
          <span class="visually-hidden">Vorlesung ${vorlesung.nr}: </span>${vorlesung.titel}
        </h3>
        ${vorlesung.beschreibung ? `<p class="kapitel-card__beschreibung">${vorlesung.beschreibung}</p>` : ""}
        ${vorlesung.datum ? `<p class="kapitel-card__datum">${formatiereDatum(vorlesung.datum)}</p>` : ""}
      </a>
    </li>`;
}

async function zeigeKapitelUebersicht() {
  const liste = document.getElementById("kapitel-liste");

  try {
    const vorlesungen = await ladeAlleVorlesungen();
    // Aus jeder Vorlesung eine Card machen und alle zusammenfügen
    liste.innerHTML = vorlesungen.map(erzeugeCard).join("");
    beobachteReveals(liste);   // die neuen Cards sollen auch einblenden
  } catch (fehler) {
    console.error(fehler);
    liste.innerHTML = `<li class="fehler-hinweis">${LADEFEHLER_TEXT}</li>`;
  }
}

zeigeKapitelUebersicht();


// ---------- 4. Demo 00 – Apple-Technik: Bildsequenz im Canvas ----------
// Apple lädt für solche Effekte eine Folge von Fotos vor und zeigt je nach Scrollposition
// eines davon im <canvas>. Wir zeichnen die 120 Bilder selbst: ein Laptop, der aufklappt.

const appleBuehne = document.querySelector(".apple__buehne");
const appleCanvas = document.getElementById("apple-canvas");
const FRAMES = 120;

if (appleBuehne && appleCanvas) {
  const ctx = appleCanvas.getContext("2d");
  const anzeigeFrame = document.getElementById("apple-frame");
  const anzeigeAnteil = document.getElementById("apple-anteil");
  let letzterFrame = -1;
  let wartet = false;

  // Farben aus den CSS-Variablen lesen – so passt die Zeichnung zu jedem Farbschema
  function farbe(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  // Zeichnet Bild Nummer "frame" (0 … 119)
  function zeichneFrame(frame) {
    const t = frame / (FRAMES - 1);                    // 0 = zu, 1 = offen
    const winkel = (t * 105) * Math.PI / 180;          // Deckel: 0° bis 105°
    const W = appleCanvas.width, H = appleCanvas.height;
    ctx.clearRect(0, 0, W, H);

    // Schatten unter dem Gerät
    ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
    ctx.beginPath();
    ctx.ellipse(480, 528, 340, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Unterteil: Trapez (vorne breiter = Perspektive) + Kante
    const metall = ctx.createLinearGradient(0, 455, 0, 515);
    metall.addColorStop(0, "#e4e6ea");
    metall.addColorStop(1, "#b9bdc5");
    ctx.fillStyle = metall;
    ctx.beginPath();
    ctx.moveTo(215, 455); ctx.lineTo(745, 455); ctx.lineTo(790, 500); ctx.lineTo(170, 500);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#9da2ab";
    ctx.fillRect(170, 500, 620, 12);

    // Tastaturfeld
    ctx.fillStyle = "rgba(30, 30, 35, 0.18)";
    ctx.beginPath();
    ctx.moveTo(250, 462); ctx.lineTo(710, 462); ctx.lineTo(735, 482); ctx.lineTo(225, 482);
    ctx.closePath();
    ctx.fill();

    // Deckel: dreht sich um die Scharnierkante (y = 455)
    const L = 330;
    const dy = -L * Math.sin(winkel) * 0.95 + L * Math.cos(winkel) * 0.13;   // Höhe nach Perspektive
    const breiter = 1 + 0.05 * Math.sin(winkel);
    const oben = 455 + dy;
    const links = 480 - 265 * breiter, rechts = 480 + 265 * breiter;

    const zeigtBildschirm = t > 0.18;   // anfangs sieht man den Deckel von außen, danach den Bildschirm
    ctx.beginPath();
    ctx.moveTo(215, 455); ctx.lineTo(745, 455); ctx.lineTo(rechts, oben); ctx.lineTo(links, oben);
    ctx.closePath();
    ctx.fillStyle = zeigtBildschirm ? "#1d1d1f" : metall;
    ctx.fill();

    if (zeigtBildschirm) {
      // Bildschirmfläche mit Rand
      const rand = 14;
      const helligkeit = Math.min(1, (t - 0.18) / 0.5);   // geht langsam an
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(215 + rand, 455 - rand * Math.sign(-dy));
      ctx.lineTo(745 - rand, 455 - rand * Math.sign(-dy));
      ctx.lineTo(rechts - rand, oben + rand);
      ctx.lineTo(links + rand, oben + rand);
      ctx.closePath();
      ctx.clip();
      const bild = ctx.createLinearGradient(links, oben, rechts, 455);
      bild.addColorStop(0, farbe("--farbe-akzent-fuellung") || "#0071e3");
      bild.addColorStop(1, farbe("--farbe-zweit") || "#bf4800");
      ctx.globalAlpha = helligkeit;
      ctx.fillStyle = bild;
      ctx.fillRect(0, 0, W, H);

      // Text erscheint erst, wenn der Deckel fast offen ist
      if (t > 0.7) {
        ctx.globalAlpha = Math.min(1, (t - 0.7) / 0.2);
        ctx.fillStyle = "#ffffff";
        ctx.font = "700 46px ui-monospace, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.fillText(">_ Hallo, Web!", 480, (oben + 455) / 2 + 16);
      }
      ctx.restore();
    }
  }

  // Scrollposition → Anteil (0 … 1) → Bildnummer
  function aktualisiere() {
    wartet = false;
    const rect = appleBuehne.getBoundingClientRect();
    const weg = rect.height - window.innerHeight;
    const anteil = Math.min(1, Math.max(0, -rect.top / weg));
    const frame = Math.min(FRAMES - 1, Math.floor(anteil * FRAMES));

    anzeigeAnteil.textContent = anteil.toFixed(2);
    if (frame === letzterFrame) return;   // gleiches Bild? Nichts tun.
    letzterFrame = frame;
    anzeigeFrame.textContent = frame;
    zeichneFrame(frame);
  }

  // requestAnimationFrame: höchstens einmal pro Bildschirm-Aktualisierung zeichnen
  window.addEventListener("scroll", () => {
    if (!wartet) {
      wartet = true;
      requestAnimationFrame(aktualisiere);
    }
  }, { passive: true });

  // Beim Wechsel des Farbschemas neu zeichnen
  document.addEventListener("click", e => {
    if (e.target.closest(".farbwahl")) {
      letzterFrame = -1;
      requestAnimationFrame(aktualisiere);
    }
  });

  aktualisiere();
}
