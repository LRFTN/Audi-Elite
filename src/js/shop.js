import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { products, promoProduct, colorOptions, wheelOptions, formatPrice } from "./products.js";

const allProducts = [...products, promoProduct];

let activeSwiper = null;

function renderCard(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="bg-audi-black/40 p-6">
        <img src="${product.image}" alt="${product.name}" class="w-full h-auto" />
      </div>
      <div class="p-6">
        <h3 class="text-lg font-bold mb-3">${product.name}</h3>
        <div class="flex flex-wrap gap-2 mb-4">
          <span class="spec-chip">${product.fuel}</span>
          <span class="spec-chip">${product.transmission}</span>
          <span class="spec-chip">${product.power}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xl font-extrabold text-audi-red-bright">${formatPrice(product.price)}</span>
          <button class="view-btn px-5 py-2.5 text-xs uppercase tracking-widest border border-audi-red-bright/50 rounded-full hover:bg-audi-red-bright transition" data-id="${product.id}">
            Bekijk
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderGrid(list) {
  const grid = document.getElementById("product-grid");
  grid.innerHTML = list.map(renderCard).join("");
  grid.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => openQuickView(btn.dataset.id));
  });
}

function applyFiltersAndSort() {
  const fuel = document.getElementById("filter-fuel").value;
  const sort = document.getElementById("sort-price").value;

  let list = [...products];
  if (fuel !== "all") list = list.filter((p) => p.fuel === fuel);
  if (sort === "asc") list.sort((a, b) => a.price - b.price);
  if (sort === "desc") list.sort((a, b) => b.price - a.price);

  renderGrid(list);
}

function buildModalContent(product) {
  return `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
      <div>
        <div class="swiper modal-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide"><img src="${product.image}" alt="${product.name}" class="w-full" /></div>
            <div class="swiper-slide"><img src="${product.image}" alt="${product.name} - interieur" class="w-full" /></div>
            <div class="swiper-slide"><img src="${product.image}" alt="${product.name} - profiel" class="w-full" /></div>
          </div>
          <div class="swiper-pagination mt-3"></div>
        </div>

        <h4 class="text-xs uppercase tracking-widest text-audi-red-bright mt-8 mb-3">Technische fiche</h4>
        <table class="w-full text-sm">
          ${Object.entries(product.specs)
            .map(
              ([k, v]) =>
                `<tr class="border-b border-white/5"><td class="py-2 text-audi-muted">${k}</td><td class="py-2 text-right font-medium">${v}</td></tr>`
            )
            .join("")}
        </table>
      </div>

      <div>
        <h3 class="text-2xl font-extrabold mb-1">${product.name}</h3>
        <p class="text-3xl font-extrabold text-audi-red-bright mb-6" id="config-total-price">${formatPrice(product.price)}</p>

        <h4 class="text-xs uppercase tracking-widest text-audi-muted mb-3">Kleur</h4>
        <div class="flex gap-3 mb-6" id="color-swatches">
          ${colorOptions
            .map(
              (c, i) =>
                `<span class="config-swatch ${i === 0 ? "active" : ""}" style="background:${c.hex}" data-surcharge="${c.surcharge}" data-name="${c.name}" title="${c.name}"></span>`
            )
            .join("")}
        </div>

        <h4 class="text-xs uppercase tracking-widest text-audi-muted mb-3">Velgen</h4>
        <div class="flex flex-wrap gap-2 mb-8" id="wheel-options">
          ${wheelOptions
            .map(
              (w, i) =>
                `<span class="wheel-option ${i === 0 ? "active" : ""}" data-surcharge="${w.surcharge}">${w.name}</span>`
            )
            .join("")}
        </div>

        <h4 class="text-xs uppercase tracking-widest text-audi-red-bright mb-3">Vraag een offerte</h4>
        <form id="quote-form" class="space-y-3">
          <input required type="text" placeholder="Naam" class="form-input" />
          <input required type="email" placeholder="E-mailadres" class="form-input" />
          <input type="tel" placeholder="Telefoonnummer" class="form-input" />
          <button type="submit" class="w-full px-6 py-3.5 bg-audi-red-bright rounded-full text-xs uppercase tracking-widest font-semibold shadow-red-glow hover:scale-[1.02] transition-all">
            Verstuur aanvraag
          </button>
          <p class="quote-confirm hidden text-sm text-audi-red-bright pt-1">✓ Bedankt! Uw offerteaanvraag voor de ${product.name} werd verzonden.</p>
        </form>
      </div>
    </div>
  `;
}

function wireConfigurator(product) {
  const priceEl = document.getElementById("config-total-price");
  const swatches = document.querySelectorAll("#color-swatches .config-swatch");
  const wheels = document.querySelectorAll("#wheel-options .wheel-option");

  function recompute() {
    const colorSurcharge = parseFloat(document.querySelector("#color-swatches .config-swatch.active")?.dataset.surcharge || 0);
    const wheelSurcharge = parseFloat(document.querySelector("#wheel-options .wheel-option.active")?.dataset.surcharge || 0);
    priceEl.textContent = formatPrice(product.price + colorSurcharge + wheelSurcharge);
  }

  swatches.forEach((s) => {
    s.addEventListener("click", () => {
      swatches.forEach((x) => x.classList.remove("active"));
      s.classList.add("active");
      recompute();
    });
  });

  wheels.forEach((w) => {
    w.addEventListener("click", () => {
      wheels.forEach((x) => x.classList.remove("active"));
      w.classList.add("active");
      recompute();
    });
  });

  document.getElementById("quote-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const confirmMsg = document.querySelector(".quote-confirm");
    confirmMsg.classList.remove("hidden");
    e.target.reset();
  });
}

function openQuickView(id) {
  const product = allProducts.find((p) => p.id === id);
  if (!product) return;

  const overlay = document.getElementById("modal-overlay");
  const panel = document.getElementById("modal-panel");
  const content = document.getElementById("modal-content");

  content.innerHTML = buildModalContent(product);
  wireConfigurator(product);

  if (activeSwiper) activeSwiper.destroy(true, true);
  activeSwiper = new Swiper(".modal-swiper", {
    modules: [Navigation, Pagination],
    pagination: { el: ".swiper-pagination", clickable: true },
    loop: true,
  });

  overlay.classList.remove("pointer-events-none");
  overlay.classList.add("opacity-100");
  panel.classList.remove("scale-95", "opacity-0");
  panel.classList.add("scale-100", "opacity-100");
  document.body.style.overflow = "hidden";

  window.dispatchEvent(new CustomEvent("audielite:select-car", { detail: { name: product.name } }));
}

function closeQuickView() {
  const overlay = document.getElementById("modal-overlay");
  const panel = document.getElementById("modal-panel");

  overlay.classList.add("pointer-events-none");
  overlay.classList.remove("opacity-100");
  panel.classList.add("scale-95", "opacity-0");
  panel.classList.remove("scale-100", "opacity-100");
  document.body.style.overflow = "";
}

export function initShop() {
  renderGrid(products);

  document.getElementById("filter-fuel").addEventListener("change", applyFiltersAndSort);
  document.getElementById("sort-price").addEventListener("change", applyFiltersAndSort);

  document.getElementById("modal-close").addEventListener("click", closeQuickView);
  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target.id === "modal-overlay") closeQuickView();
  });

  document.querySelectorAll("[data-open-quote]").forEach((btn) => {
    btn.addEventListener("click", () => openQuickView("a1"));
  });
}
