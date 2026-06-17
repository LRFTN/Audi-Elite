// Generic circular automotive gauge renderer (speedometer / tachometer style).
const CX = 110;
const CY = 110;
const START_ANGLE = -130; // degrees, 0 = 12 o'clock, clockwise positive
const END_ANGLE = 130;

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", r, r, 0, largeArcFlag, 0, end.x, end.y].join(" ");
}

function valueToAngle(value, min, max) {
  const clamped = Math.min(max, Math.max(min, value));
  return START_ANGLE + ((clamped - min) / (max - min)) * (END_ANGLE - START_ANGLE);
}

export function createGauge({ min, max, majorStep, unit, redZoneFrom, decimals = 0 }) {
  const wrapper = document.createElement("div");
  wrapper.className = "relative w-[230px] h-[230px] md:w-[260px] md:h-[260px]";

  const ticks = [];
  for (let v = min; v <= max; v += majorStep) {
    const angle = valueToAngle(v, min, max);
    const outer = polarToCartesian(CX, CY, 96, angle);
    const inner = polarToCartesian(CX, CY, 84, angle);
    const labelPos = polarToCartesian(CX, CY, 70, angle);
    ticks.push(`<line x1="${inner.x.toFixed(2)}" y1="${inner.y.toFixed(2)}" x2="${outer.x.toFixed(2)}" y2="${outer.y.toFixed(2)}" stroke="#9A9AA2" stroke-width="2"/>`);
    ticks.push(`<text x="${labelPos.x.toFixed(2)}" y="${labelPos.y.toFixed(2)}" fill="#9A9AA2" font-size="9" font-family="Manrope, sans-serif" text-anchor="middle" dominant-baseline="middle">${v}</text>`);
  }

  // minor ticks
  const minorTicks = [];
  const minorStep = majorStep / 4;
  for (let v = min; v <= max; v += minorStep) {
    if (v % majorStep === 0) continue;
    const angle = valueToAngle(v, min, max);
    const outer = polarToCartesian(CX, CY, 96, angle);
    const inner = polarToCartesian(CX, CY, 90, angle);
    minorTicks.push(`<line x1="${inner.x.toFixed(2)}" y1="${inner.y.toFixed(2)}" x2="${outer.x.toFixed(2)}" y2="${outer.y.toFixed(2)}" stroke="#5a5a64" stroke-width="1"/>`);
  }

  const trackArc = describeArc(CX, CY, 100, START_ANGLE, END_ANGLE);
  const redArc = redZoneFrom != null ? describeArc(CX, CY, 100, valueToAngle(redZoneFrom, min, max), END_ANGLE) : "";

  wrapper.innerHTML = `
    <svg viewBox="0 0 220 220" class="w-full h-full">
      <circle cx="${CX}" cy="${CY}" r="106" fill="#15151a" />
      <path d="${trackArc}" fill="none" stroke="#2c2c33" stroke-width="6" stroke-linecap="round" />
      ${redArc ? `<path d="${redArc}" fill="none" stroke="#E3001B" stroke-width="6" stroke-linecap="round" opacity="0.85" />` : ""}
      ${ticks.join("")}
      ${minorTicks.join("")}
      <line class="gauge-needle" x1="${CX}" y1="${CY}" x2="${CX}" y2="${CY - 78}" stroke="#E3001B" stroke-width="3.5" stroke-linecap="round" transform="rotate(${START_ANGLE} ${CX} ${CY})" />
      <circle cx="${CX}" cy="${CY}" r="8" fill="#0E0E11" stroke="#E3001B" stroke-width="2" />
      <text class="gauge-value" x="${CX}" y="${CY + 42}" fill="#FFFFFF" font-size="22" font-weight="800" font-family="Manrope, sans-serif" text-anchor="middle">0</text>
      <text x="${CX}" y="${CY + 58}" fill="#9A9AA2" font-size="9" letter-spacing="2" font-family="Manrope, sans-serif" text-anchor="middle">${unit}</text>
    </svg>
  `;

  const needle = wrapper.querySelector(".gauge-needle");
  const valueText = wrapper.querySelector(".gauge-value");
  const state = { value: min, angle: START_ANGLE };

  function render() {
    needle.setAttribute("transform", `rotate(${state.angle.toFixed(2)} ${CX} ${CY})`);
    valueText.textContent = state.value.toFixed(decimals);
  }
  render();

  function setValue(target, { gsap, duration = 1.2, ease = "power2.out", onComplete } = {}) {
    const targetAngle = valueToAngle(target, min, max);
    if (gsap) {
      gsap.to(state, {
        value: target,
        angle: targetAngle,
        duration,
        ease,
        onUpdate: render,
        onComplete,
      });
    } else {
      state.value = target;
      state.angle = targetAngle;
      render();
    }
  }

  return { el: wrapper, setValue, min, max };
}
