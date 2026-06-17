import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createGauge } from "./gauge.js";

gsap.registerPlugin(ScrollTrigger);

const MODES = {
  comfort: { speed: 120, rpm: 2.5, label: "Comfort mode", accent: "#BB0A30" },
  dynamic: { speed: 220, rpm: 6.5, label: "Dynamic mode", accent: "#E3001B" },
  efficiency: { speed: 90, rpm: 1.8, label: "Efficiency mode", accent: "#BB0A30" },
};

const FEATURE_DEFAULT =
  "Selecteer een functie hierboven om meer te ontdekken over de technologie aan boord.";

export function initCockpit() {
  const speedGauge = createGauge({ min: 0, max: 260, majorStep: 20, unit: "KM/H" });
  const rpmGauge = createGauge({ min: 0, max: 8, majorStep: 1, unit: "X1000/MIN", redZoneFrom: 6.5, decimals: 1 });

  document.getElementById("gauge-speed").appendChild(speedGauge.el);
  document.getElementById("gauge-rpm").appendChild(rpmGauge.el);

  const screenModel = document.getElementById("screen-model");
  const screenMode = document.getElementById("screen-mode");
  const screenClock = document.getElementById("screen-clock");
  const featureDesc = document.getElementById("screen-feature-desc");
  const modeButtons = document.querySelectorAll(".mode-btn");
  const featureTiles = document.querySelectorAll(".feature-tile");

  let currentMode = "comfort";
  featureDesc.textContent = FEATURE_DEFAULT;

  function updateClock() {
    const now = new Date();
    screenClock.textContent = now.toLocaleTimeString("nl-BE", { hour: "2-digit", minute: "2-digit" });
  }
  updateClock();
  setInterval(updateClock, 30000);

  function applyMode(mode, animate = true) {
    currentMode = mode;
    const cfg = MODES[mode];
    modeButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.mode === mode));
    screenMode.textContent = cfg.label;
    speedGauge.setValue(cfg.speed, animate ? { gsap, duration: 1.4 } : {});
    rpmGauge.setValue(cfg.rpm, animate ? { gsap, duration: 1.4 } : {});
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyMode(btn.dataset.mode));
  });

  featureTiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const wasActive = tile.classList.contains("active");
      featureTiles.forEach((t) => t.classList.remove("active"));
      if (!wasActive) {
        tile.classList.add("active");
        gsap.fromTo(
          featureDesc,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.4, onStart: () => (featureDesc.textContent = tile.dataset.desc) }
        );
      } else {
        gsap.to(featureDesc, { opacity: 0, duration: 0.2, onComplete: () => (featureDesc.textContent = FEATURE_DEFAULT) });
        gsap.to(featureDesc, { opacity: 1, duration: 0.3, delay: 0.2 });
      }
    });
  });

  // Ignition sweep: needles sweep to max then settle on first scroll-into-view.
  ScrollTrigger.create({
    trigger: "#cockpit",
    start: "top 70%",
    once: true,
    onEnter: () => {
      const tl = gsap.timeline();
      tl.call(() => {
        speedGauge.setValue(speedGauge.max, { gsap, duration: 0.8, ease: "power1.inOut" });
        rpmGauge.setValue(rpmGauge.max, { gsap, duration: 0.8, ease: "power1.inOut" });
      })
        .call(
          () => {
            speedGauge.setValue(0, { gsap, duration: 0.6, ease: "power1.inOut" });
            rpmGauge.setValue(0, { gsap, duration: 0.6, ease: "power1.inOut" });
          },
          null,
          0.9
        )
        .call(() => applyMode(currentMode), null, 1.7);
    },
  });

  // Sync cockpit screen with car selected in the webshop.
  window.addEventListener("audielite:select-car", (e) => {
    screenModel.textContent = e.detail.name;
    gsap.fromTo(screenModel, { opacity: 0.3 }, { opacity: 1, duration: 0.5 });
  });
}
