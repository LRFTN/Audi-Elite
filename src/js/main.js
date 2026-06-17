import "../css/main.css";
import "swiper/css";
import "swiper/css/pagination";

import gsap from "gsap";
import Lenis from "lenis";

import { runLoader } from "./loader.js";
import { initNav } from "./nav.js";
import { initCookieBanner } from "./cookie.js";
import { initAccordions } from "./accordion.js";
import { initStats } from "./stats.js";
import { initCountdown } from "./countdown.js";
import { initContactForm } from "./contact.js";
import { initShop } from "./shop.js";
import { initCockpit } from "./cockpit.js";

function initSmoothScroll() {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

function playHeroIntro() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.to("#hero-logo", { opacity: 1, y: 0, duration: 0.8 })
    .to("#hero-title", { opacity: 1, y: 0, duration: 0.9 }, "-=0.5")
    .to("#hero-sub", { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
    .to("#hero-cta", { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");

  gsap.fromTo("#hero-logo", { y: 24 }, { y: 0, duration: 0.8 }, 0);
  gsap.fromTo("#hero-title", { y: 24 }, { y: 0, duration: 0.9 }, 0.3);
  gsap.fromTo("#hero-sub", { y: 16 }, { y: 0, duration: 0.7 }, 0.5);
  gsap.fromTo("#hero-cta", { y: 16 }, { y: 0, duration: 0.7 }, 0.6);

  gsap.to("#hero-glow", {
    scale: 1.15,
    opacity: 0.8,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to("#scroll-cue", { y: 10, repeat: -1, yoyo: true, duration: 1.2, ease: "sine.inOut" });
}

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initNav();
  initCookieBanner();
  initAccordions();
  initStats();
  initCountdown();
  initContactForm();
  initShop();
  initCockpit();

  runLoader(() => {
    playHeroIntro();
  });
});
