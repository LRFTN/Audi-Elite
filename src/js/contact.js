export function initContactForm() {
  const form = document.getElementById("contact-form");
  const confirmMsg = document.getElementById("contact-confirm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    confirmMsg.classList.remove("hidden");
    form.reset();
    setTimeout(() => confirmMsg.classList.add("hidden"), 6000);
  });
}
