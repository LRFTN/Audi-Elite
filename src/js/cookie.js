export function initCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  const accept = document.getElementById("cookie-accept");
  const decline = document.getElementById("cookie-decline");
  const STORAGE_KEY = "audi-elite-cookie-consent";

  if (!localStorage.getItem(STORAGE_KEY)) {
    setTimeout(() => banner.classList.remove("translate-y-full"), 1200);
  }

  const dismiss = (value) => {
    localStorage.setItem(STORAGE_KEY, value);
    banner.classList.add("translate-y-full");
  };

  accept.addEventListener("click", () => dismiss("accepted"));
  decline.addEventListener("click", () => dismiss("declined"));
}
