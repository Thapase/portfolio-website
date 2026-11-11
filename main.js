/**
 * F1 Singapore Marina Bay Grand Prix — Main Application Logic
 * Telemetry HUD, Staggered Grid Engine, Dynamic F1 Car SVG Renderer & Car Launch Telemetry
 */

document.addEventListener("DOMContentLoaded", () => {
  initThemeEngine();
  renderTimingTowerLegend();
  renderStartingGrid();
  initTelemetryModal();
  initSuperlicenceModal();
  initPitRadioForm();
  initTrackAudio();
});

/* ==========================================================================
   1. Day / Night Race Theme Switcher
   ========================================================================== */
function initThemeEngine() {
  const themeToggle = document.getElementById("f1-theme-toggle");
  const storedTheme = localStorage.getItem("f1_race_theme") || "night";
  
  applyRaceTheme(storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isNight = document.documentElement.classList.contains("dark") || !document.documentElement.classList.contains("light");
      const nextTheme = isNight ? "light" : "night";
      applyRaceTheme(nextTheme);
    });
  }
}

function applyRaceTheme(theme) {
  const label = document.getElementById("f1-theme-label");
  const icon = document.getElementById("f1-theme-icon");

  if (theme === "light") {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    localStorage.setItem("f1_race_theme", "light");
    if (label) label.textContent = "DAY QUALI";
    if (icon) icon.className = "fa-solid fa-sun text-amber-500";
  } else {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    localStorage.setItem("f1_race_theme", "night");
    if (label) label.textContent = "NIGHT RACE";
    if (icon) icon.className = "fa-solid fa-moon text-teal-400";
  }
}

/* ==========================================================================
   2. F1 Car SVG Generator
   Produces an aerodynamic top-down single-seater F1 car with authentic livery
   ========================================================================== */
function generateF1CarSVG(car) {
  const primary = car.liveryColor;
  const secondary = car.secondaryColor || "#111111";
  const num = car.number;
  
  // Tire compound accent ring (Soft: Red, Medium: Yellow, Hard: White)
  let tireRing = "#E10600";
  if (car.compound.includes("Medium")) tireRing = "#F59E0B";
  if (car.compound.includes("Hard")) tireRing = "#FFFFFF";

  return `
    <svg class="f1-car-svg w-36 h-72 md:w-44 md:h-88 mx-auto" viewBox="0 0 160 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-${car.pos}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${primary}" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="${primary}" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="bodyGrad-${car.pos}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${secondary}"/>
          <stop offset="35%" stop-color="${primary}"/>
          <stop offset="65%" stop-color="${primary}"/>
          <stop offset="100%" stop-color="${secondary}"/>
        </linearGradient>
      </defs>

      <!-- Ground Effect Undertray Glow -->
      <ellipse cx="80" cy="180" rx="65" ry="110" fill="url(#glow-${car.pos})" />

      <!-- Rear Wing (DRS Assembly) -->
      <g id="rear-wing">
        <!-- Main Plane -->
        <rect x="25" y="275" width="110" height="18" rx="3" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
        <rect x="30" y="278" width="100" height="7" rx="1.5" fill="${primary}"/>
        <!-- Endplates -->
        <rect x="20" y="260" width="8" height="42" rx="2" fill="#27272a"/>
        <rect x="132" y="260" width="8" height="42" rx="2" fill="#27272a"/>
        <!-- Rear Rain Light LED -->
        <rect x="75" y="295" width="10" height="5" rx="1" fill="#ef4444" class="f1-pulse"/>
      </g>

      <!-- Rear Wheels & Suspension -->
      <g id="rear-wheels">
        <!-- Left Wheel -->
        <rect x="2" y="222" width="26" height="50" rx="6" fill="#18181b" stroke="#27272a" stroke-width="2"/>
        <circle cx="15" cy="247" r="14" fill="none" stroke="${tireRing}" stroke-width="2.5"/>
        <circle cx="15" cy="247" r="6" fill="#27272a"/>
        <!-- Right Wheel -->
        <rect x="132" y="222" width="26" height="50" rx="6" fill="#18181b" stroke="#27272a" stroke-width="2"/>
        <circle cx="145" cy="247" r="14" fill="none" stroke="${tireRing}" stroke-width="2.5"/>
        <circle cx="145" cy="247" r="6" fill="#27272a"/>
        <!-- Suspension Wishbones -->
        <line x1="28" y1="238" x2="60" y2="242" stroke="#52525b" stroke-width="3"/>
        <line x1="28" y1="256" x2="60" y2="250" stroke="#52525b" stroke-width="3"/>
        <line x1="132" y1="238" x2="100" y2="242" stroke="#52525b" stroke-width="3"/>
        <line x1="132" y1="256" x2="100" y2="250" stroke="#52525b" stroke-width="3"/>
      </g>

      <!-- Main Chassis & Sidepods -->
      <g id="chassis">
        <!-- Underbody Floor Edge -->
        <path d="M 40 140 L 32 235 L 128 235 L 120 140 Z" fill="#09090b" stroke="#27272a" stroke-width="1.5"/>
        <!-- Sidepods (Sculpted Air Inlets) -->
        <path d="M 45 130 Q 32 155 35 220 L 60 225 L 60 130 Z" fill="url(#bodyGrad-${car.pos})"/>
        <path d="M 115 130 Q 128 155 125 220 L 100 225 L 100 130 Z" fill="url(#bodyGrad-${car.pos})"/>
        <!-- Engine Cover & Central Spine -->
        <path d="M 60 110 L 100 110 L 96 245 L 64 245 Z" fill="url(#bodyGrad-${car.pos})"/>
        <!-- Shark Fin Aerodynamic Fin -->
        <polygon points="78,160 82,160 81,250 79,250" fill="#27272a"/>
        <rect x="79" y="165" width="2" height="75" fill="${primary}"/>
      </g>

      <!-- Cockpit & Halo Safety Ring -->
      <g id="cockpit">
        <!-- Cockpit Opening -->
        <ellipse cx="80" cy="142" rx="14" ry="24" fill="#09090b" stroke="#27272a" stroke-width="2"/>
        <!-- Driver Helmet -->
        <circle cx="80" cy="144" r="8.5" fill="#f8fafc"/>
        <path d="M 75 140 Q 80 136 85 140 L 84 144 Q 80 142 76 144 Z" fill="#0284c7"/>
        <!-- Halo Titanium Structure -->
        <path d="M 70 156 Q 80 120 90 156 Q 80 125 70 156 Z" fill="#27272a" stroke="#52525b" stroke-width="1.5"/>
        <rect x="78.5" y="126" width="3" height="26" fill="#3f3f46"/>
      </g>

      <!-- Front Nosecone & Race Number -->
      <g id="nosecone">
        <path d="M 64 110 L 96 110 L 86 35 L 74 35 Z" fill="url(#bodyGrad-${car.pos})" stroke="#27272a" stroke-width="1"/>
        <!-- Front Nose Tip -->
        <rect x="73" y="28" width="14" height="10" rx="3" fill="#18181b"/>
        <!-- Driver Race Number Badge -->
        <circle cx="80" cy="72" r="11" fill="#09090b" stroke="${primary}" stroke-width="1.5"/>
        <text x="80" y="76" font-family="Chakra Petch, sans-serif" font-weight="800" font-size="11" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${num}</text>
      </g>

      <!-- Front Wheels & Suspension -->
      <g id="front-wheels">
        <!-- Left Front Wheel -->
        <rect x="8" y="45" width="24" height="46" rx="5" fill="#18181b" stroke="#27272a" stroke-width="2"/>
        <circle cx="20" cy="68" r="12" fill="none" stroke="${tireRing}" stroke-width="2.5"/>
        <circle cx="20" cy="68" r="5" fill="#27272a"/>
        <!-- Right Front Wheel -->
        <rect x="128" y="45" width="24" height="46" rx="5" fill="#18181b" stroke="#27272a" stroke-width="2"/>
        <circle cx="140" cy="68" r="12" fill="none" stroke="${tireRing}" stroke-width="2.5"/>
        <circle cx="140" cy="68" r="5" fill="#27272a"/>
        <!-- Front Suspension Wishbones -->
        <line x1="32" y1="60" x2="70" y2="70" stroke="#52525b" stroke-width="2.5"/>
        <line x1="32" y1="76" x2="68" y2="85" stroke="#52525b" stroke-width="2.5"/>
        <line x1="128" y1="60" x2="90" y2="70" stroke="#52525b" stroke-width="2.5"/>
        <line x1="128" y1="76" x2="92" y2="85" stroke="#52525b" stroke-width="2.5"/>
      </g>

      <!-- Front Aerodynamic Wing -->
      <g id="front-wing">
        <path d="M 12 18 L 148 18 Q 80 34 12 18 Z" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
        <path d="M 18 20 L 142 20 Q 80 30 18 20 Z" fill="${primary}"/>
        <!-- Endplates -->
        <rect x="8" y="10" width="6" height="24" rx="1.5" fill="#27272a"/>
        <rect x="146" y="10" width="6" height="24" rx="1.5" fill="#27272a"/>
      </g>
    </svg>
  `;
}

/* ==========================================================================
   3. Render F1 Timing Tower Legend (Top Bar / Broadcast Graphic)
   ========================================================================== */
function renderTimingTowerLegend() {
  const container = document.getElementById("f1-timing-tower-items");
  if (!container || !window.f1PortfolioData) return;

  const cars = window.f1PortfolioData.gridCars;
  container.innerHTML = cars
    .map(
      (car, idx) => `
    <div class="timing-item flex items-center gap-2.5 px-3 py-2 rounded-lg bg-black/40 border border-white/5 hover:border-white/20 transition-all shrink-0" 
         data-pos="${car.pos}" data-index="${idx}" onclick="handleLegendClick('${car.pos}')" title="Click to view ${car.title}">
      <span class="font-f1 font-extrabold text-xs text-white px-1.5 py-0.5 rounded" style="background-color: ${car.liveryColor}">
        ${car.pos}
      </span>
      <div class="flex flex-col text-left">
        <div class="flex items-center gap-1.5">
          <span class="font-f1 font-bold text-xs text-slate-100 uppercase tracking-wider">${car.category}</span>
          <span class="text-[10px] text-slate-400 font-mono">#${car.number}</span>
        </div>
        <span class="text-[11px] text-slate-400 truncate max-w-[130px] md:max-w-[160px]">${car.title}</span>
      </div>
    </div>
  `
    )
    .join("");
}

/* ==========================================================================
   4. Render Singapore Marina Bay Starting Grid (10 Staggered Cars)
   ========================================================================== */
function renderStartingGrid() {
  const gridContainer = document.getElementById("f1-starting-grid-container");
  if (!gridContainer || !window.f1PortfolioData) return;

  const cars = window.f1PortfolioData.gridCars;

  // Staggered formation:
  // Odd positions on Left (P1, P3, P5, P7, P9)
  // Even positions on Right (P2, P4, P6, P8, P10), staggered slightly downward
  let html = "";

  for (let row = 0; row < 5; row++) {
    const leftCar = cars[row * 2]; // P1, P3, P5, P7, P9
    const rightCar = cars[row * 2 + 1]; // P2, P4, P6, P8, P10

    html += `
      <!-- Grid Row ${row + 1} -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 mb-16 relative">
        
        <!-- Left Lane: ${leftCar.pos} -->
        <div class="grid-slot p-6 md:p-8 rounded-3xl relative overflow-hidden" 
             id="slot-${leftCar.pos}" 
             style="--car-glow: ${leftCar.glowColor}" 
             onclick="launchCarAndOpenTelemetry('${leftCar.pos}')">
          
          <!-- Track Grid Markings -->
          <div class="flex items-center justify-between border-b border-dashed border-white/20 pb-3 mb-6">
            <div class="flex items-center gap-3">
              <span class="font-f1 font-black text-3xl md:text-4xl text-white f1-slant px-3 py-1 rounded-md" style="background-color: ${leftCar.liveryColor}">
                ${leftCar.pos}
              </span>
              <div>
                <span class="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">${leftCar.category}</span>
                <h3 class="font-f1 font-bold text-lg md:text-xl text-white leading-tight">${leftCar.title}</h3>
              </div>
            </div>
            <div class="text-right hidden sm:block">
              <span class="text-[10px] font-mono text-slate-400 block">${leftCar.teamName}</span>
              <span class="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-white mt-0.5">
                ${leftCar.compound}
              </span>
            </div>
          </div>

          <!-- The F1 Car Entity -->
          <div class="f1-car-wrapper py-2" id="car-wrapper-${leftCar.pos}">
            ${generateF1CarSVG(leftCar)}
            <div class="launch-smoke"></div>
          </div>

          <!-- Bottom Telemetry Teaser & Launch Prompt -->
          <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span class="text-slate-400 font-mono text-[11px] truncate max-w-[200px]">
              <i class="fa-solid fa-gauge-high mr-1 text-teal-400"></i> ${leftCar.telemetryStats[0].label}: <strong class="text-white">${leftCar.telemetryStats[0].val}</strong>
            </span>
            <span class="px-3 py-1 rounded-full text-[11px] font-f1 font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all">
              <span>LAUNCH CAR</span>
              <i class="fa-solid fa-arrow-up text-[10px]"></i>
            </span>
          </div>
        </div>

        <!-- Right Lane: ${rightCar.pos} (Staggered) -->
        <div class="grid-slot p-6 md:p-8 rounded-3xl relative overflow-hidden md:translate-y-8" 
             id="slot-${rightCar.pos}" 
             style="--car-glow: ${rightCar.glowColor}" 
             onclick="launchCarAndOpenTelemetry('${rightCar.pos}')">
          
          <!-- Track Grid Markings -->
          <div class="flex items-center justify-between border-b border-dashed border-white/20 pb-3 mb-6">
            <div class="flex items-center gap-3">
              <span class="font-f1 font-black text-3xl md:text-4xl text-white f1-slant px-3 py-1 rounded-md" style="background-color: ${rightCar.liveryColor}">
                ${rightCar.pos}
              </span>
              <div>
                <span class="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">${rightCar.category}</span>
                <h3 class="font-f1 font-bold text-lg md:text-xl text-white leading-tight">${rightCar.title}</h3>
              </div>
            </div>
            <div class="text-right hidden sm:block">
              <span class="text-[10px] font-mono text-slate-400 block">${rightCar.teamName}</span>
              <span class="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-white mt-0.5">
                ${rightCar.compound}
              </span>
            </div>
          </div>

          <!-- The F1 Car Entity -->
          <div class="f1-car-wrapper py-2" id="car-wrapper-${rightCar.pos}">
            ${generateF1CarSVG(rightCar)}
            <div class="launch-smoke"></div>
          </div>

          <!-- Bottom Telemetry Teaser & Launch Prompt -->
          <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span class="text-slate-400 font-mono text-[11px] truncate max-w-[200px]">
              <i class="fa-solid fa-gauge-high mr-1 text-teal-400"></i> ${rightCar.telemetryStats[0].label}: <strong class="text-white">${rightCar.telemetryStats[0].val}</strong>
            </span>
            <span class="px-3 py-1 rounded-full text-[11px] font-f1 font-bold bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all">
              <span>LAUNCH CAR</span>
              <i class="fa-solid fa-arrow-up text-[10px]"></i>
            </span>
          </div>
        </div>

      </div>
    `;
  }

  gridContainer.innerHTML = html;
}

/* ==========================================================================
   5. Interactive Car Launch & Pit-Wall Telemetry Modal
   ========================================================================== */
let currentActivePos = null;

function launchCarAndOpenTelemetry(pos) {
  currentActivePos = pos;
  const car = window.f1PortfolioData.gridCars.find(c => c.pos === pos);
  if (!car) return;

  // Reset all other slots
  document.querySelectorAll(".grid-slot").forEach(slot => slot.classList.remove("launched"));
  document.querySelectorAll(".timing-item").forEach(item => item.classList.remove("active"));

  // Launch the clicked car forward!
  const slot = document.getElementById(`slot-${pos}`);
  if (slot) {
    slot.classList.add("launched");
  }

  // Highlight in timing tower
  const timingItem = document.querySelector(`.timing-item[data-pos="${pos}"]`);
  if (timingItem) {
    timingItem.classList.add("active");
  }

  // Populate & open telemetry modal after slight launch lead time
  setTimeout(() => {
    populateAndShowTelemetryModal(car);
  }, 220);
}

function handleLegendClick(pos) {
  // Scroll to car on grid
  const slot = document.getElementById(`slot-${pos}`);
  if (slot) {
    slot.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  launchCarAndOpenTelemetry(pos);
}

function populateAndShowTelemetryModal(car) {
  const modal = document.getElementById("telemetry-modal");
  const card = document.getElementById("telemetry-modal-card");
  if (!modal || !card) return;

  // Set custom accent glow
  card.style.setProperty("--modal-accent-glow", car.glowColor);

  // Position & Header
  document.getElementById("modal-pos-badge").textContent = car.pos;
  document.getElementById("modal-pos-badge").style.backgroundColor = car.liveryColor;
  document.getElementById("modal-race-number").textContent = `#${car.number}`;
  document.getElementById("modal-category-badge").textContent = car.category;
  document.getElementById("modal-title").textContent = car.title;
  document.getElementById("modal-team-name").textContent = `${car.teamName} • ${car.compound}`;
  document.getElementById("modal-badge").textContent = car.badge;

  // Telemetry Gauges / Metrics
  const statsContainer = document.getElementById("modal-telemetry-stats");
  statsContainer.innerHTML = car.telemetryStats
    .map(
      s => `
    <div class="p-3.5 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
      <div class="flex items-center justify-between text-slate-400 text-xs mb-1">
        <span>${s.label}</span>
        <i class="${s.icon} text-teal-400"></i>
      </div>
      <div class="font-f1 font-black text-xl md:text-2xl text-white">${s.val}</div>
    </div>
  `
    )
    .join("");

  // Detailed Dossier Narrative
  document.getElementById("modal-dossier-content").innerHTML = car.dossier;

  // Tags
  const tagsContainer = document.getElementById("modal-tags-container");
  tagsContainer.innerHTML = car.tags
    .map(
      t => `
    <span class="px-2.5 py-1 rounded text-[11px] font-mono font-medium bg-white/5 border border-white/10 text-slate-300">
      #${t}
    </span>
  `
    )
    .join("");

  // Update Next / Prev buttons
  const cars = window.f1PortfolioData.gridCars;
  const currentIndex = cars.findIndex(c => c.pos === car.pos);
  const prevCar = cars[(currentIndex - 1 + cars.length) % cars.length];
  const nextCar = cars[(currentIndex + 1) % cars.length];

  const prevBtn = document.getElementById("modal-prev-btn");
  const nextBtn = document.getElementById("modal-next-btn");

  if (prevBtn) {
    prevBtn.onclick = () => launchCarAndOpenTelemetry(prevCar.pos);
    prevBtn.innerHTML = `<i class="fa-solid fa-chevron-left mr-1"></i> ${prevCar.pos} (${prevCar.number})`;
  }
  if (nextBtn) {
    nextBtn.onclick = () => launchCarAndOpenTelemetry(nextCar.pos);
    nextBtn.innerHTML = `${nextCar.pos} (${nextCar.number}) <i class="fa-solid fa-chevron-right ml-1"></i>`;
  }

  // Open modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeTelemetryModal() {
  const modal = document.getElementById("telemetry-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Smoothly return launched car
  if (currentActivePos) {
    const slot = document.getElementById(`slot-${currentActivePos}`);
    if (slot) slot.classList.remove("launched");
  }
}

function initTelemetryModal() {
  const modal = document.getElementById("telemetry-modal");
  const closeBtn = document.getElementById("telemetry-close-btn");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeTelemetryModal);
  }

  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) {
        closeTelemetryModal();
      }
    });
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeTelemetryModal();
      closeSuperlicenceModal();
    }
  });
}

// Expose globally
window.launchCarAndOpenTelemetry = launchCarAndOpenTelemetry;
window.handleLegendClick = handleLegendClick;
window.closeTelemetryModal = closeTelemetryModal;

/* ==========================================================================
   6. FIA Superlicence & Driver CV Modal
   ========================================================================== */
function openSuperlicenceModal() {
  const modal = document.getElementById("superlicence-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }
}

function closeSuperlicenceModal() {
  const modal = document.getElementById("superlicence-modal");
  if (modal) {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

function initSuperlicenceModal() {
  const openBtns = document.querySelectorAll(".open-superlicence-btn");
  const closeBtns = document.querySelectorAll(".close-superlicence-btn");
  const modal = document.getElementById("superlicence-modal");
  const printBtn = document.getElementById("print-superlicence-btn");

  openBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      openSuperlicenceModal();
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener("click", closeSuperlicenceModal);
  });

  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) closeSuperlicenceModal();
    });
  }

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

window.openSuperlicenceModal = openSuperlicenceModal;
window.closeSuperlicenceModal = closeSuperlicenceModal;

/* ==========================================================================
   7. Pit-to-Car Radio Communications (Contact Form)
   ========================================================================== */
function initPitRadioForm() {
  const form = document.getElementById("pit-radio-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const callsign = form.querySelector("#radio-callsign").value.trim();
    const freq = form.querySelector("#radio-frequency").value.trim();
    const msg = form.querySelector("#radio-transmission").value.trim();

    if (!callsign || !freq || !msg) {
      showRadioNotification("RADIO SILENCE: Please fill all radio telemetry fields.", "error");
      return;
    }

    showRadioNotification(`RADIO CHECK OK: Message transmitted from ${callsign}. Driver THH acknowledged on telemetry.`, "success");
    form.reset();
  });
}

function showRadioNotification(message, type = "success") {
  const toast = document.getElementById("f1-toast");
  const msgEl = document.getElementById("f1-toast-message");
  const icon = document.getElementById("f1-toast-icon");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  icon.className = type === "success" ? "fa-solid fa-tower-broadcast text-teal-400" : "fa-solid fa-triangle-exclamation text-rose-500";
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4500);
}

/* ==========================================================================
   8. Track Ambient & SFX
   ========================================================================== */
function initTrackAudio() {
  const audioBtn = document.getElementById("f1-radio-audio-toggle");
  if (!audioBtn) return;

  let isPlaying = false;
  audioBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      audioBtn.classList.add("text-teal-400");
      showRadioNotification("PIT WALL AUDIO: Telemetry Radio Frequencies Active (433.92 MHz)", "success");
    } else {
      audioBtn.classList.remove("text-teal-400");
      showRadioNotification("PIT WALL AUDIO: Radio Muted", "success");
    }
  });
}
