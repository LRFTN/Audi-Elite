import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initStats() {
  document.querySelectorAll(".stat-count").forEach((el) => {
    const target = parseFloat(el.dataset.target);
    const decimal = parseInt(el.dataset.decimal || "0", 10);
    const suffix = el.dataset.suffix || "";

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = counter.val.toFixed(decimal) + suffix;
          },
        });
      },
    });
  });
}
