import gsap from "gsap";

export function runLoader(onComplete) {
  const loader = document.getElementById("loader");
  const logo = document.getElementById("loader-logo");
  const fill = document.getElementById("loader-bar-fill");

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          loader.style.display = "none";
          onComplete();
        },
      });
    },
  });

  tl.to(logo, { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }, 0)
    .fromTo(logo, { scale: 0.85 }, { scale: 1, duration: 0.7, ease: "power2.out" }, 0)
    .to(fill, { width: "100%", duration: 1.4, ease: "power1.inOut" }, 0.1)
    .to({}, { duration: 0.3 });
}
