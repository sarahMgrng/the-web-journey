const links = [...document.querySelectorAll('.chapters a')];
function selectChapter() {
 const active = links.find(a => a.hash === location.hash) || links[0];
 for (const link of links) {
  const selected = link === active;
  if (selected) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
  document.querySelector(link.hash).hidden = !selected;
 }

}
window.addEventListener('hashchange',selectChapter);selectChapter();

const byId = id => document.getElementById(id);
let progress = 0;
const packets = ["bereit","GET gruen.jpg →","← 200 · image/jpeg","Bild im Browser"];
byId("step").onclick = () => {
 progress = progress % 3 + 1;
 byId("packet").textContent = packets[progress];
 byId("log").textContent = "Simulation · Schritt " + progress + " von 3";
};
byId("cafe").oninput = event => { byId("menuTitle").textContent = event.target.value; };
byId("from").onchange = event => { byId("path").textContent = (event.target.selectedIndex ? "" : "../") + "bilder/gruen.jpg"; };
byId("usd").oninput = event => {
 const value = event.target.value.trim().replace(",", ".");
 const sum = Number(value) * 0.86;
 byId("eur").textContent = value && Number.isFinite(sum) ? sum.toLocaleString("de-DE",{style:"currency",currency:"EUR"}) : "Zahl eingeben";
};
const asset = { datei:"gruen.jpg", kapitel:3, beschreibung:"Grünes Elixier" };
byId("prop").onchange = event => { const v = asset[event.target.value]; byId("val").textContent = v + " · " + typeof v; };
byId("node").onclick = () => {
 const caption = byId("caption");
 if (caption) caption.remove();
 else {
  const el = document.createElement("p"); el.id = "caption"; el.textContent = "Datei: gruen.jpg"; byId("card").append(el);
 }
 byId("tree").textContent = caption ? "article\n└─ h3" : "article\n├─ h3\n└─ p";
 byId("node").textContent = caption ? "Bildunterschrift ergänzen" : "Bildunterschrift entfernen";
};
const recent = [];
for (const type of ["focus","keydown","click"]) {
 byId("eventBtn").addEventListener(type,event => {
 recent.push(event.type + " · " + (event.key || "button"));
 byId("events").textContent = recent.slice(-5).join("\n");
 });
}
