/**
 * Main Application Logic for T.H.H. Thapase Portfolio
 * Theme Engine, Canvas Network, Dynamic Data Binding, Modals & Micro-interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  initThemeEngine();
  initLogisticsCanvas();
  renderPortfolioContent();
  initNavigation();
  initContactForm();
  initResumeModal();
  initScrollEffects();
});

/* ==========================================================================
   1. Day / Dark Mode Theme Engine
   ========================================================================== */
function initThemeEngine() {
  const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
  const storedTheme = localStorage.getItem("thp_theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  // Set initial theme
  const initialTheme = storedTheme ? storedTheme : (prefersDark ? "dark" : "dark"); // default to sleek dark
  applyTheme(initialTheme);

  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.contains("dark");
      const nextTheme = isDark ? "light" : "dark";
      applyTheme(nextTheme);
    });
  });

  // Listen to OS system preference changes if user hasn't explicitly set preference
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("thp_theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
    localStorage.setItem("thp_theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");
    localStorage.setItem("thp_theme", "light");
  }

  // Update toggle ball icons if any
  document.querySelectorAll(".theme-toggle-ball i").forEach(icon => {
    icon.className = theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
  });
}

/* ==========================================================================
   2. Interactive Supply Chain Network Canvas Animation
   ========================================================================== */
function initLogisticsCanvas() {
  const canvas = document.getElementById("network-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener("resize", () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
    initNodes();
  });

  const nodeCount = Math.min(Math.floor((width * height) / 22000), 45);
  let nodes = [];
  const mouse = { x: -1000, y: -1000, radius: 140 };

  canvas.parentElement.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.parentElement.addEventListener("mouseleave", () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  function initNodes() {
    nodes = [];
    const types = ["plant", "hub", "port", "retail"];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 2,
        type: types[Math.floor(Math.random() * types.length)],
        pulse: Math.random() * Math.PI
      });
    }
  }

  initNodes();

  let packets = [];
  function spawnPacket() {
    if (nodes.length < 2 || packets.length > 8) return;
    const a = nodes[Math.floor(Math.random() * nodes.length)];
    let b = nodes[Math.floor(Math.random() * nodes.length)];
    if (a !== b) {
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 180) {
        packets.push({ from: a, to: b, progress: 0, speed: 0.015 });
      }
    }
  }

  setInterval(spawnPacket, 600);

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.classList.contains("dark");
    const nodeColor = isDark ? "rgba(16, 185, 129, 0.75)" : "rgba(5, 150, 105, 0.65)";
    const hubColor = isDark ? "rgba(249, 115, 22, 0.85)" : "rgba(234, 88, 12, 0.75)";
    const lineColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.05)";
    const activeLineColor = isDark ? "rgba(16, 185, 129, 0.25)" : "rgba(5, 150, 105, 0.2)";

    // Update and draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      // Mouse influence
      const mDist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
      if (mDist < mouse.radius) {
        const angle = Math.atan2(n.y - mouse.y, n.x - mouse.x);
        const force = (mouse.radius - mDist) / mouse.radius;
        n.x += Math.cos(angle) * force * 1.5;
        n.y += Math.sin(angle) * force * 1.5;
      }

      n.pulse += 0.03;
      const currentRadius = n.radius + Math.sin(n.pulse) * 0.8;

      ctx.beginPath();
      ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = n.type === "hub" ? hubColor : nodeColor;
      ctx.fill();

      // Connect nearby nodes (logistics corridors)
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = dist < 70 ? activeLineColor : lineColor;
          ctx.lineWidth = dist < 70 ? 1.2 : 0.75;
          ctx.stroke();
        }
      }
    }

    // Update and draw moving transit packets
    for (let k = packets.length - 1; k >= 0; k--) {
      const p = packets[k];
      p.progress += p.speed;
      if (p.progress >= 1) {
        packets.splice(k, 1);
        continue;
      }
      const curX = p.from.x + (p.to.x - p.from.x) * p.progress;
      const curY = p.from.y + (p.to.y - p.from.y) * p.progress;

      ctx.beginPath();
      ctx.arc(curX, curY, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? "#f97316" : "#ea580c";
      ctx.shadowColor = isDark ? "#f97316" : "#ea580c";
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. Render Dynamic Portfolio Content from config.js
   ========================================================================== */
function renderPortfolioContent() {
  if (typeof portfolioData === "undefined") {
    console.error("portfolioData not loaded!");
    return;
  }
  const data = portfolioData;

  // Render Hero Metrics
  const heroMetricsContainer = document.getElementById("hero-metrics-container");
  if (heroMetricsContainer) {
    heroMetricsContainer.innerHTML = data.heroMetrics
      .map(
        m => `
      <div class="glass-panel p-5 rounded-2xl flex flex-col justify-center items-center text-center">
        <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3 text-lg">
          <i class="${m.icon}"></i>
        </div>
        <div class="text-3xl md:text-4xl font-extrabold font-heading text-gradient-emerald">${m.value}</div>
        <div class="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">${m.label}</div>
      </div>
    `
      )
      .join("");
  }

  // Render Case Studies
  renderCaseStudies(data.caseStudies);

  // Setup Case Study Filter Buttons
  const filterBtns = document.querySelectorAll(".case-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");
      if (category === "all") {
        renderCaseStudies(data.caseStudies);
      } else {
        const filtered = data.caseStudies.filter(cs =>
          cs.tags.some(t => t.toLowerCase().includes(category.toLowerCase())) ||
          cs.badge.toLowerCase().includes(category.toLowerCase()) ||
          cs.division.toLowerCase().includes(category.toLowerCase())
        );
        renderCaseStudies(filtered);
      }
    });
  });

  // Render Competencies
  renderCompetencies(data.competencies);

  // Render Life Journey Timeline
  const timelineContainer = document.getElementById("timeline-items-container");
  if (timelineContainer) {
    timelineContainer.innerHTML = data.lifeJourney
      .map((item, idx) => {
        const isEven = idx % 2 === 0;
        return `
        <div class="timeline-item relative mb-12 md:mb-16 flex flex-col md:flex-row items-center w-full">
          <!-- Timeline Node Marker -->
          <div class="timeline-dot top-1 left-2 md:left-1/2 md:-translate-x-1/2 z-10"></div>
          
          <!-- Content Box -->
          <div class="w-full pl-10 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto md:text-left'}">
            <div class="glass-panel p-6 rounded-2xl relative">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-2">
                <i class="${item.icon}"></i> ${item.period}
              </span>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-1">${item.role}</h3>
              <div class="text-sm font-semibold text-amber-500 dark:text-amber-400">${item.institution} • ${item.location}</div>
              <p class="text-sm text-slate-600 dark:text-slate-300 mt-2">${item.summary}</p>
              
              <ul class="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-400 ${isEven ? 'md:text-right' : 'md:text-left'}">
                ${item.achievements.map(ach => `
                  <li class="flex items-start gap-2 ${isEven ? 'md:flex-row-reverse' : ''}">
                    <i class="fa-solid fa-circle-check text-emerald-500 mt-0.5 text-[11px] shrink-0"></i>
                    <span>${ach}</span>
                  </li>
                `).join("")}
              </ul>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }

  // Render Athletics, Strava & Travel
  renderAthleticsAndTravel(data.athleticsAndHobbies);

  // Render Social Impact
  const impactContainer = document.getElementById("social-impact-container");
  if (impactContainer) {
    impactContainer.innerHTML = data.socialImpact
      .map(
        imp => `
      <div class="glass-panel p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-500 flex items-center justify-center text-xl mb-4">
            <i class="${imp.icon}"></i>
          </div>
          <span class="text-xs font-bold uppercase tracking-wider text-amber-500">${imp.cause}</span>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">${imp.title}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">${imp.desc}</p>
        </div>
        <div class="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span class="text-xs text-slate-500 dark:text-slate-400">Outcome Impact:</span>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-500">
            <i class="fa-solid fa-check"></i> ${imp.impactMetric}
          </span>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Render Topmate Mentorship Card
  const mentorshipContainer = document.getElementById("mentorship-card-container");
  if (mentorshipContainer && data.mentorship) {
    mentorshipContainer.innerHTML = `
      <div class="glass-panel p-8 rounded-3xl relative overflow-hidden border-emerald-500/30">
        <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-emerald-500/10 to-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div class="lg:col-span-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 mb-3">
              <i class="fa-solid fa-comments"></i> 1:1 Mentorship & Knowledge Sharing
            </div>
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white font-heading">${data.mentorship.title}</h3>
            <p class="text-slate-600 dark:text-slate-300 mt-2 text-sm leading-relaxed">${data.mentorship.desc}</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              ${data.mentorship.services.map(s => `
                <div class="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                  <i class="fa-solid fa-arrow-right text-emerald-500 text-[10px]"></i>
                  <span>${s}</span>
                </div>
              `).join("")}
            </div>
          </div>
          <div class="flex flex-col items-start lg:items-end justify-center">
            <a href="${data.mentorship.link}" target="_blank" rel="noopener noreferrer" 
               class="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5">
              <span>Book Session on Topmate</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
            <span class="text-xs text-slate-500 dark:text-slate-400 mt-2">Verified Topmate Profile: ${data.mentorship.handle}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Populate dynamic social links
  updateSocialLinks(data.socials);
}

function renderCaseStudies(caseStudies) {
  const container = document.getElementById("case-studies-container");
  if (!container) return;

  container.innerHTML = caseStudies
    .map(
      cs => `
    <div class="glass-panel p-6 md:p-8 rounded-2xl flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-3 mb-3">
          <span class="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            ${cs.division}
          </span>
          <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center gap-1.5 shrink-0">
            <i class="fa-solid fa-star text-[10px]"></i> ${cs.badge}
          </span>
        </div>

        <h3 class="text-xl font-bold font-heading text-slate-900 dark:text-white mt-1">${cs.title}</h3>
        <p class="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1 mb-3">
          <i class="fa-solid fa-arrow-trend-up mr-1"></i> ${cs.highlight}
        </p>
        <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
          ${cs.description}
        </p>

        <!-- Metric Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800 mb-5">
          ${cs.metrics
            .map(
              m => `
            <div class="text-center">
              <div class="text-base font-extrabold font-heading text-slate-900 dark:text-white">${m.val}</div>
              <div class="text-[11px] text-slate-500 dark:text-slate-400 font-medium">${m.label}</div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Key Outcomes -->
        <div class="space-y-2 mb-5">
          ${cs.deliverables
            .map(
              d => `
            <div class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <i class="fa-solid fa-check text-emerald-500 mt-0.5 shrink-0"></i>
              <span>${d}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <!-- Tags -->
      <div class="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap gap-1.5">
        ${cs.tags
          .map(
            t => `
          <span class="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10">
            #${t}
          </span>
        `
          )
          .join("")}
      </div>
    </div>
  `
    )
    .join("");
}

function renderCompetencies(comp) {
  // Supply Chain Competencies
  const scmContainer = document.getElementById("scm-competencies-container");
  if (scmContainer) {
    scmContainer.innerHTML = comp.supplyChain
      .map(
        c => `
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-500/40 transition-colors">
        <div class="flex items-center justify-between mb-1">
          <span class="font-bold text-sm text-slate-900 dark:text-white">${c.name}</span>
          <span class="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-semibold">${c.level}</span>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400">${c.desc}</p>
      </div>
    `
      )
      .join("");
  }

  // Technical & Data Tools
  const toolsContainer = document.getElementById("tools-competencies-container");
  if (toolsContainer) {
    toolsContainer.innerHTML = comp.technicalTools
      .map(
        t => `
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-500/40 transition-colors flex items-start gap-3">
        <div class="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 text-base">
          <i class="${t.icon}"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="font-bold text-sm text-slate-900 dark:text-white">${t.name}</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">${t.level}</span>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${t.desc}</p>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Certifications
  const certContainer = document.getElementById("certifications-container");
  if (certContainer) {
    certContainer.innerHTML = comp.certifications
      .map(
        cert => `
      <div class="glass-panel p-5 rounded-2xl flex items-start gap-4">
        <div class="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 text-lg">
          <i class="${cert.icon}"></i>
        </div>
        <div>
          <span class="text-[11px] font-bold text-amber-500 uppercase tracking-wider">${cert.issuer} • ${cert.year}</span>
          <h4 class="font-bold text-base text-slate-900 dark:text-white mt-0.5">${cert.name}</h4>
          <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">${cert.desc}</p>
        </div>
      </div>
    `
      )
      .join("");
  }
}

function renderAthleticsAndTravel(hobbies) {
  // Strava & Athletics
  const stravaContainer = document.getElementById("strava-section-container");
  if (stravaContainer && hobbies.strava) {
    stravaContainer.innerHTML = `
      <div class="glass-panel p-8 rounded-3xl relative overflow-hidden">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-orange-500/15 text-orange-500 flex items-center justify-center text-2xl">
              <i class="fa-brands fa-strava"></i>
            </div>
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-orange-500">Endurance & Athletics</span>
              <h3 class="text-2xl font-bold font-heading text-slate-900 dark:text-white">${hobbies.strava.title}</h3>
            </div>
          </div>
          <a href="${hobbies.strava.stats[2].link}" target="_blank" rel="noopener noreferrer" 
             class="px-5 py-2.5 rounded-xl font-bold text-xs bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/25 flex items-center gap-2 transition-all">
            <span>View on Strava</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>
        
        <p class="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed italic border-l-2 border-orange-500 pl-4 py-1 mb-6">
          "${hobbies.strava.philosophy}"
        </p>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800">
            <div class="text-xs text-slate-500 dark:text-slate-400">Core Attribute</div>
            <div class="text-lg font-bold text-slate-900 dark:text-white mt-0.5">High Pacing Cadence</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800">
            <div class="text-xs text-slate-500 dark:text-slate-400">Strategy Synergy</div>
            <div class="text-lg font-bold text-slate-900 dark:text-white mt-0.5">Long-Run Stamina</div>
          </div>
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800 col-span-2 md:col-span-1">
            <div class="text-xs text-slate-500 dark:text-slate-400">Mindset</div>
            <div class="text-lg font-bold text-slate-900 dark:text-white mt-0.5">Resilience & Focus</div>
          </div>
        </div>
      </div>
    `;
  }

  // Sports & Travel Explorer
  const travelContainer = document.getElementById("travel-section-container");
  if (travelContainer && hobbies.travel) {
    travelContainer.innerHTML = `
      <div class="glass-panel p-8 rounded-3xl">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-xl">
            <i class="fa-solid fa-map-location-dot"></i>
          </div>
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-500">Exploration & Perspective</span>
            <h3 class="text-xl font-bold font-heading text-slate-900 dark:text-white">${hobbies.travel.title}</h3>
          </div>
        </div>

        <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
          ${hobbies.travel.philosophy}
        </p>

        <div class="mb-6">
          <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2.5">States & Union Territories Traversed:</div>
          <div class="flex flex-wrap gap-2">
            ${hobbies.travel.statesList
              .map(
                s => `
              <span class="state-pill px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 cursor-default">
                <i class="fa-solid fa-location-dot text-emerald-500 text-[10px] mr-1"></i>${s}
              </span>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Sports: Cricket & Badminton -->
        <div class="pt-5 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${hobbies.sports
            .map(
              sp => `
            <div class="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800">
              <div class="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 text-base">
                <i class="${sp.icon}"></i>
              </div>
              <div>
                <div class="font-bold text-sm text-slate-900 dark:text-white">${sp.name}</div>
                <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${sp.desc}</div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }
}

function updateSocialLinks(socials) {
  // LinkedIn
  document.querySelectorAll(".link-linkedin").forEach(el => (el.href = socials.linkedin));
  // Twitter / X
  document.querySelectorAll(".link-twitter").forEach(el => (el.href = socials.twitter));
  // Instagram
  document.querySelectorAll(".link-instagram").forEach(el => (el.href = socials.instagram));
  // Strava
  document.querySelectorAll(".link-strava").forEach(el => (el.href = socials.strava));
  // GitHub
  document.querySelectorAll(".link-github").forEach(el => (el.href = socials.github));
  // Topmate
  document.querySelectorAll(".link-topmate").forEach(el => (el.href = socials.topmate));
}

/* ==========================================================================
   4. Navigation & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.contains("translate-x-0");
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    mobileLinks.forEach(l => {
      l.addEventListener("click", () => {
        closeDrawer();
      });
    });
  }

  function openDrawer() {
    mobileDrawer.classList.remove("translate-x-full");
    mobileDrawer.classList.add("translate-x-0");
    menuBtn.innerHTML = '<i class="fa-solid fa-xmark text-lg"></i>';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove("translate-x-0");
    mobileDrawer.classList.add("translate-x-full");
    menuBtn.innerHTML = '<i class="fa-solid fa-bars text-lg"></i>';
  }
}

/* ==========================================================================
   5. Interactive Contact Form & Toast
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("portfolio-contact-form");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = form.querySelector("#contact-name").value.trim();
    const email = form.querySelector("#contact-email").value.trim();
    const subject = form.querySelector("#contact-subject").value.trim();
    const message = form.querySelector("#contact-message").value.trim();

    if (!name || !email || !message) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please provide a valid email address.", "error");
      return;
    }

    // Success response
    showToast(`Thank you, ${name}! Your message has been received. I will be in touch shortly.`, "success");
    form.reset();

    // Prepare mailto link option
    const mailtoLink = `mailto:thapase@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
    const directEmailBtn = document.getElementById("direct-email-link");
    if (directEmailBtn) {
      directEmailBtn.href = mailtoLink;
    }
  });
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-message");
  const toastIcon = document.getElementById("toast-icon");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  if (type === "success") {
    toastIcon.className = "fa-solid fa-circle-check text-emerald-500 text-lg";
  } else {
    toastIcon.className = "fa-solid fa-circle-exclamation text-rose-500 text-lg";
  }

  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4500);
}

/* ==========================================================================
   6. Resume Modal & Print
   ========================================================================== */
function openResumeModal() {
  const modal = document.getElementById("resume-modal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }
}

function closeResumeModal() {
  const modal = document.getElementById("resume-modal");
  if (modal) {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

// Expose globally to window as well
window.openResumeModal = openResumeModal;
window.closeResumeModal = closeResumeModal;

function initResumeModal() {
  const openBtns = document.querySelectorAll(".open-resume-btn");
  const closeBtns = document.querySelectorAll(".close-resume-btn");
  const modal = document.getElementById("resume-modal");
  const printBtn = document.getElementById("print-resume-btn");

  openBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      openResumeModal();
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      closeResumeModal();
    });
  });

  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) {
        closeResumeModal();
      }
    });
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeResumeModal();
    }
  });

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

/* ==========================================================================
   7. Scroll Effects & Back to Top
   ========================================================================== */
function initScrollEffects() {
  const backToTopBtn = document.getElementById("back-to-top");
  const nav = document.getElementById("main-nav");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Show / Hide Back to top button
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.remove("opacity-0", "pointer-events-none");
        backToTopBtn.classList.add("opacity-100", "pointer-events-auto");
      } else {
        backToTopBtn.classList.add("opacity-0", "pointer-events-none");
        backToTopBtn.classList.remove("opacity-100", "pointer-events-auto");
      }
    }

    // Sticky nav shadow refinement
    if (nav) {
      if (scrollY > 30) {
        nav.classList.add("shadow-md");
      } else {
        nav.classList.remove("shadow-md");
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}
