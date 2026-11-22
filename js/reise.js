// Demo 05 – Centerpiece „Die Reise einer Website“ (Platzhalter)
// Gleiche Technik wie Demo 02: Ein Textschritt erreicht die Bildschirmmitte →
// seine Nummer wandert als data-station an die Grafik. Was dann leuchtet, legt reise.css fest.
// Zusätzlich schreibt JavaScript die passende Adresse in die Adresszeile der Grafik.

const reiseGrafik = document.querySelector(".reise");
const reiseAdresse = document.querySelector(".reise__adresse");
const reiseSchritte = document.querySelectorAll(".reise__schritt");

if (reiseGrafik && reiseSchritte.length > 0) {
  const reiseBeobachter = new IntersectionObserver(
    (eintraege) => {
      for (const eintrag of eintraege) {
        if (!eintrag.isIntersecting) continue;
        const schritt = eintrag.target;
        reiseGrafik.dataset.station = schritt.dataset.station;
        reiseAdresse.textContent = schritt.dataset.adresse;
        for (const s of reiseSchritte) {
          s.classList.toggle("is-active", s === schritt);
        }
      }
    },
    // nur ein schmaler Streifen in der Bildschirmmitte zählt
    { rootMargin: "-45% 0px -45% 0px" }
  );

  for (const schritt of reiseSchritte) {
    reiseBeobachter.observe(schritt);
  }
}
