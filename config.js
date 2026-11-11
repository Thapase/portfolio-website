/**
 * F1 Singapore Marina Bay Grand Prix — 3D Telemetry Configuration
 * Driver: T.H.H. Thapase (THH) — Supply Chain & Strategy Consultant | Endurance Athlete
 * 10 Starting Grid Positions with Bespoke F1 Constructor Liveries & Telemetry Dossiers
 */

const f1PortfolioData = {
  driver: {
    fullName: "Thummaginjala Hima Harsha Thapase",
    displayName: "T.H.H. Thapase",
    racingName: "THAPASE [THH]",
    number: "76",
    team: "THH Strategy Racing",
    role: "Supply Chain & Operations Strategist",
    currentPost: "Assistant Manager (Supply Chain Consultant) • Genpact",
    location: "Bangalore, India",
    superlicence: "FIA Tier-1 Certified (IIM Sirmaur MBA • GMAT 760 • Six Sigma Green Belt)",
    email: "thapase@gmail.com",
    phone: "+91 9566009174",
    bio: "Optimizing enterprise supply chains at 300+ km/h. Blending cycle time compression, predictive ML telemetry, circular sustainability, and the relentless endurance of a long-distance runner."
  },

  circuit: {
    name: "Marina Bay Street Circuit",
    location: "Singapore",
    session: "NIGHT RACE • 3D GRID LAUNCH",
    length: "4.940 km",
    turns: "19 Turns",
    drsZones: "3 DRS Zones",
    lapRecord: "1:35.867"
  },

  socials: {
    linkedin: "https://www.linkedin.com/in/t-h-h-thapase-strategy-consultant",
    twitter: "https://x.com/THHThapase",
    instagram: "https://www.instagram.com/thapase.thh",
    strava: "https://strava.app.link/czwhREDvY7b",
    github: "https://github.com/Thapase",
    topmate: "https://topmate.io/thapase_thh"
  },

  // 10 Staggered Starting Grid Cars (P1 to P10)
  gridCars: [
    {
      pos: "P1",
      number: "01",
      gridRow: 1,
      gridSide: "left", // Left lane, Pole Position
      gridZ: -12,
      category: "Professional Experience",
      title: "Supply Chain Consulting & Operations Leadership",
      teamName: "Scuderia Genpact Strategy",
      liveryColor: 0xE10600, // Scuderia Crimson Red
      liveryHex: "#E10600",
      secondaryColor: 0x111111,
      compound: "Soft (Red C5)",
      telemetryStats: [
        { label: "Annual Client Savings", val: "$30M+", icon: "fa-solid fa-chart-line" },
        { label: "Cycle Time Cut", val: "12 → 3 Wks", icon: "fa-solid fa-gauge-high" },
        { label: "OTIF Improvement", val: "+20-30%", icon: "fa-solid fa-boxes-packing" },
        { label: "Honors", val: "Bronze Medal", icon: "fa-solid fa-medal" }
      ],
      badge: "POLE POSITION • Q1-2024 BEST PROJECT",
      subtitle: "Fortune 500 Energy Tech & Oil & Gas Engagements ($37B Enterprise)",
      dossier: `
        <p class="mb-3 text-slate-200">Spearheaded 5+ high-stakes operational engagements across 3+ divisions for a <strong>$37B energy technology giant</strong>. Optimized end-to-end supply chain design, harmonizing parts planning with execution to save upwards of <strong>~$30M/annum</strong> and securing >$10M revenue extension for Genpact.</p>
        <div class="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs mb-3 text-red-200">
          <strong>Key Circuit Victory (Q1-2024):</strong> Led a landmark cycle time optimization project across North America for a $600M portfolio, cutting lead times from 12 weeks to just 3 weeks. Awarded the <strong>Genpact Bronze Medal</strong> for outstanding client deliverables.
        </div>
        <ul class="space-y-1.5 text-xs text-slate-300">
          <li><i class="fa-solid fa-check text-red-500 mr-2"></i>Curtailed parts revenue leakages by ~$10M/year through cross-functional CXO alignment.</li>
          <li><i class="fa-solid fa-check text-red-500 mr-2"></i>Engineered lean S&OP governance mechanisms deployed across global multi-division manufacturing sites.</li>
        </ul>
      `,
      tags: ["Cycle Time Optimization", "S&OP", "Parts Planning", "Bronze Medal", "CXO Advisory"]
    },
    {
      pos: "P2",
      number: "76",
      gridRow: 1,
      gridSide: "right", // Right lane
      gridZ: -6,
      category: "Academic Excellence",
      title: "IIM Sirmaur MBA & GMAT 760 (Top 1% Globally)",
      teamName: "IIM Sirmaur High-Performance Racing",
      liveryColor: 0xF59E0B, // High-Velocity Amber Gold
      liveryHex: "#F59E0B",
      secondaryColor: 0x0B1325,
      compound: "Medium (Yellow C3)",
      telemetryStats: [
        { label: "GMAT Worldwide Score", val: "760", icon: "fa-solid fa-trophy" },
        { label: "Global Percentile", val: "99th %ile", icon: "fa-solid fa-brain" },
        { label: "Degree", val: "MBA", icon: "fa-solid fa-graduation-cap" },
        { label: "Specialization", val: "Operations & Strategy", icon: "fa-solid fa-compass" }
      ],
      badge: "FRONT ROW • TOP 1% WORLDWIDE",
      subtitle: "Indian Institute of Management (IIM) Sirmaur • 2019–2021",
      dossier: `
        <p class="mb-3 text-slate-200">Earned Master of Business Administration (MBA) from the prestigious <strong>Indian Institute of Management (IIM) Sirmaur</strong>. Achieved a world-class <strong>GMAT score of 760</strong>, demonstrating exceptional quantitative, critical analytical, and mathematical reasoning faculties.</p>
        <div class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs mb-3 text-amber-200">
          <strong>Academic & Strategic Impact:</strong> Formulated the go-to-market architecture for Etherisc decentralized crop insurance and organized institute-wide managerial symposiums.
        </div>
        <ul class="space-y-1.5 text-xs text-slate-300">
          <li><i class="fa-solid fa-check text-amber-500 mr-2"></i>Advanced operations research, statistical modeling, and international corporate strategy.</li>
          <li><i class="fa-solid fa-check text-amber-500 mr-2"></i>Active institute thought partner in business analytics and supply network design.</li>
        </ul>
      `,
      tags: ["IIM Sirmaur", "GMAT 760", "Top 1% Globally", "Operations Management", "Decision Science"]
    },
    {
      pos: "P3",
      number: "24",
      gridRow: 2,
      gridSide: "left",
      gridZ: 2,
      category: "Predictive Analytics",
      title: "Predictive AI & Product Cost Pacing (PCP)",
      teamName: "Petronas Digital Intelligence",
      liveryColor: 0x00D2BE, // Mercedes/Petronas Electric Cyan
      liveryHex: "#00D2BE",
      secondaryColor: 0x000000,
      compound: "Soft (Red C5)",
      telemetryStats: [
        { label: "Procurement Savings", val: "$10M/yr", icon: "fa-solid fa-bolt" },
        { label: "Deployment Speed", val: "3 Months", icon: "fa-solid fa-stopwatch" },
        { label: "New Pipeline Won", val: "$3M/yr", icon: "fa-solid fa-handshake" },
        { label: "Core Stack", val: "Python • Power BI", icon: "fa-brands fa-python" }
      ],
      badge: "ROW 2 • PROPRIETARY IP DEPLOYMENT",
      subtitle: "Wirelines Technology Division ($250M Business Unit)",
      dossier: `
        <p class="mb-3 text-slate-200">Conceived and architected a proprietary <strong>Product Cost Pacing (PCP)</strong> predictive model for a $250M wirelines division. Enabled procurement leaders to time raw material acquisitions ahead of global commodity market volatility.</p>
        <div class="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs mb-3 text-teal-200">
          <strong>Global Scalability:</strong> Led a 3–5 member cross-functional taskforce to deploy the algorithm in 90 days. The model saved <strong>$10M/annum</strong>, was adopted globally, and became Genpact IP that won 3 enterprise clients.
        </div>
        <ul class="space-y-1.5 text-xs text-slate-300">
          <li><i class="fa-solid fa-check text-teal-400 mr-2"></i>Engineered real-time supplier cost index trackers with Python & Power BI DAX.</li>
          <li><i class="fa-solid fa-check text-teal-400 mr-2"></i>Eliminated procurement lead-time friction and inventory deadweight.</li>
        </ul>
      `,
      tags: ["Predictive Analytics", "Product Cost Pacing", "Machine Learning", "Strategic Sourcing", "Python"]
    },
    {
      pos: "P4",
      number: "30",
      gridRow: 2,
      gridSide: "right",
      gridZ: 8,
      category: "ESG & Sustainability",
      title: "Circular Sourcing & ESG Decarbonization",
      teamName: "Aston British Racing Green ESG",
      liveryColor: 0x00594F, // Aston Martin Emerald Green
      liveryHex: "#00594F",
      secondaryColor: 0xCEDC00,
      compound: "Hard (White C1)",
      telemetryStats: [
        { label: "Sustainability Savings", val: "$2M/yr", icon: "fa-solid fa-leaf" },
        { label: "Landfill Mission", val: "Zero by 2030", icon: "fa-solid fa-recycle" },
        { label: "Vendor Sourcing Saved", val: "$500K", icon: "fa-solid fa-sack-dollar" },
        { label: "Scope", val: "North America & Global", icon: "fa-solid fa-globe" }
      ],
      badge: "ROW 2 • SUSTAINABLE OPERATIONS CHAMPION",
      subtitle: "Artificial Lift / Pump Systems Division ($1.2B Enterprise)",
      dossier: `
        <p class="mb-3 text-slate-200">Championed industrial sustainability by architecting a circular economy framework for high-stress oilfield equipment. Accelerated the adoption of certified reclaimed components versus new virgin materials, cutting costs by <strong>$2M/annum</strong> across North America.</p>
        <div class="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs mb-3 text-emerald-200">
          <strong>Environmental Stewardship:</strong> Directly propelled the enterprise mission to reduce manufacturing waste to landfill by 2030, cutting carbon intensity and energy burn across manufacturing hubs.
        </div>
        <ul class="space-y-1.5 text-xs text-slate-300">
          <li><i class="fa-solid fa-check text-emerald-400 mr-2"></i>Authored executive thought leadership on ESG-aligned supply chain management.</li>
          <li><i class="fa-solid fa-check text-emerald-400 mr-2"></i>Sourced raw materials from verified vendors globally, saving an extra $500K.</li>
        </ul>
      `,
      tags: ["Circular Economy", "ESG", "Carbon Reduction", "Reclaimed Parts", "Sustainable SCM"]
    },
    {
      pos: "P5",
      number: "88",
      gridRow: 3,
      gridSide: "left",
      gridZ: 16,
      category: "Engineering Foundation",
      title: "SRM University B.Tech Electrical & Electronics",
      teamName: "Williams Royal Heritage Engineering",
      liveryColor: 0x00A0DE, // Williams Electric Blue
      liveryHex: "#00A0DE",
      secondaryColor: 0x041E42,
      compound: "Medium (Yellow C3)",
      telemetryStats: [
        { label: "Graduation Aggregate", val: "88%", icon: "fa-solid fa-percentage" },
        { label: "Distinction", val: "First Class Distinction", icon: "fa-solid fa-award" },
        { label: "Discipline", val: "EEE", icon: "fa-solid fa-microchip" },
        { label: "Campus Leadership", val: "Techno Fest Lead", icon: "fa-solid fa-flag-checkered" }
      ],
      badge: "ROW 3 • 88% FIRST CLASS WITH DISTINCTION",
      subtitle: "SRM Institute of Science and Technology (SRMIST) • 2015–2019",
      dossier: `
        <p class="mb-3 text-slate-200">Completed Bachelor of Technology in <strong>Electrical & Electronics Engineering (EEE)</strong> with an outstanding <strong>88% aggregate</strong>, graduating with First Class with Distinction.</p>
        <div class="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs mb-3 text-blue-200">
          <strong>Analytical Foundation:</strong> Built deep competencies in circuit dynamics, systems engineering, differential equations, and control systems that now power industrial supply chain optimization algorithms.
        </div>
        <ul class="space-y-1.5 text-xs text-slate-300">
          <li><i class="fa-solid fa-check text-blue-400 mr-2"></i>Key organizer for university-wide techno-management fests and technical symposiums.</li>
          <li><i class="fa-solid fa-check text-blue-400 mr-2"></i>Organized robotics and energy management student forums.</li>
        </ul>
      `,
      tags: ["SRMIST", "Electrical & Electronics", "88% Distinction", "Systems Engineering", "Operations Rigor"]
    },
    {
      pos: "P6",
      number: "42",
      gridRow: 3,
      gridSide: "right",
      gridZ: 22,
      category: "Endurance & Athletics",
      title: "Strava Long-Distance Running & High Cadence",
      teamName: "McLaren Papaya Velocity Athletics",
      liveryColor: 0xFF8000, // McLaren Papaya Orange
      liveryHex: "#FF8000",
      secondaryColor: 0x111111,
      compound: "Soft (Red C5)",
      telemetryStats: [
        { label: "Discipline", val: "Long-Distance", icon: "fa-solid fa-person-running" },
        { label: "Pacing Cadence", val: "High & Steady", icon: "fa-solid fa-heart-pulse" },
        { label: "Profile", val: "Strava Verified", icon: "fa-brands fa-strava" },
        { label: "Mindset", val: "Relentless Grit", icon: "fa-solid fa-fire" }
      ],
      badge: "ROW 3 • STRAVA ENDURANCE ATHLETE",
      subtitle: "Endurance Road Racing • Mental Tenacity • Cadence Management",
      dossier: `
        <p class="mb-3 text-slate-200">Long-distance road runner on <strong>Strava</strong>. The grueling discipline of the road mirrors the high-stakes world of enterprise supply chain consulting: understanding pacing, managing lactic threshold, respecting the course, and digging deep when the final kilometer approaches.</p>
        <div class="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs mb-3 text-orange-200">
          <strong>The Endurance Philosophy:</strong> "Patience on the ascent, velocity on the straightaway, and zero excuses when the rain hits the pavement."
        </div>
        <div class="mt-3">
          <a href="https://strava.app.link/czwhREDvY7b" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-[#fc4c02] text-white hover:bg-orange-600 transition-colors">
            <i class="fa-brands fa-strava"></i> Check Out Thapase THH on Strava &rarr;
          </a>
        </div>
      `,
      tags: ["Strava Athlete", "Long-Distance Running", "Cadence Control", "Mental Tenacity", "Endurance Mindset"]
    },
    {
      pos: "P7",
      number: "15",
      gridRow: 4,
      gridSide: "left",
      gridZ: 30,
      category: "Wanderlust & Culture",
      title: "Explorer Across 15+ Indian States & UTs",
      teamName: "Sahara Desert & Alpine Expedition",
      liveryColor: 0xD97706, // Desert Saffron / Amber
      liveryHex: "#D97706",
      secondaryColor: 0x451A03,
      compound: "Medium (Yellow C3)",
      telemetryStats: [
        { label: "States & UTs Traversed", val: "15+", icon: "fa-solid fa-map-location-dot" },
        { label: "Terrain", val: "Himalayas to Coast", icon: "fa-solid fa-mountain" },
        { label: "Cultural Agility", val: "High Immersion", icon: "fa-solid fa-compass" },
        { label: "Perspectives", val: "Pan-India", icon: "fa-solid fa-route" }
      ],
      badge: "ROW 4 • 15+ STATES & TERRITORIES TRAVERSED",
      subtitle: "Himalayan Passes • Coastal Ghats • Desert Frontiers • Cultural Agility",
      dossier: `
        <p class="mb-3 text-slate-200">Avid explorer having backpacked and road-tripped across <strong>15+ States and Union Territories in India</strong>. Navigating diverse terrains from the high altitudes of Himachal and Kashmir to the coastal backwaters of Kerala and the salt plains of the West builds profound adaptability and wide-angle perspective.</p>
        <div class="p-3.5 rounded-xl bg-amber-600/10 border border-amber-600/20 text-xs mb-3 text-amber-200">
          <strong>Territories Explored:</strong> Himachal Pradesh, Jammu & Kashmir, Uttarakhand, Karnataka, Tamil Nadu, Kerala, Maharashtra, Goa, Andhra Pradesh, Telangana, Rajasthan, Delhi NCR, Punjab, Haryana, and Puducherry.
        </div>
        <p class="text-xs text-slate-300">Every journey deepens situational awareness and adaptability—vital superpowers when managing volatile global supply routes.</p>
      `,
      tags: ["Travel Explorer", "15+ States", "Cultural Agility", "Adaptability", "Pan-India Perspective"]
    },
    {
      pos: "P8",
      number: "320",
      gridRow: 4,
      gridSide: "right",
      gridZ: 36,
      category: "Social Impact",
      title: "Girl-Child Education & Disaster Humanitarian Relief",
      teamName: "Alpine BWT Humanitarian Pink",
      liveryColor: 0xEC4899, // Alpine Vibrant Rose Pink
      liveryHex: "#EC4899",
      secondaryColor: 0x1E293B,
      compound: "Hard (White C1)",
      telemetryStats: [
        { label: "Attendance Jump", val: "85%", icon: "fa-solid fa-chart-line" },
        { label: "Young Girls Impacted", val: "320", icon: "fa-solid fa-child-dress" },
        { label: "Govt School Raised", val: "$6K/yr", icon: "fa-solid fa-hand-holding-dollar" },
        { label: "Disaster Relief", val: "Goonj Partner", icon: "fa-solid fa-heart" }
      ],
      badge: "ROW 4 • EDUCATION & FLOOD REHABILITATION",
      subtitle: "Rural School Sanitation • Goonj CSR Drives • Athulya Vikas Foundation",
      dossier: `
        <p class="mb-3 text-slate-200">Spearheaded an ongoing fundraising campaign generating <strong>$6,000/year</strong> to construct bathrooms and upgrade infrastructure for an all-girls rural government school. Prevented high dropout rates, boosted attendance to <strong>85%</strong>, and transformed prospects for <strong>320 young women</strong>.</p>
        <div class="p-3.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-xs mb-3 text-pink-200">
          <strong>Humanitarian Response:</strong> Collaborated with <strong>Goonj</strong> during corporate CSR initiatives at Genpact, mobilizing critical winter warmth and flood victim relief for thousands of displaced families.
        </div>
        <ul class="space-y-1.5 text-xs text-slate-300">
          <li><i class="fa-solid fa-check text-pink-400 mr-2"></i>Formulated digital media donor campaigns for Athulya Vikas Foundation.</li>
          <li><i class="fa-solid fa-check text-pink-400 mr-2"></i>Built Etherisc GTM strategy to double farmer income via carbon credits and parametric insurance.</li>
        </ul>
      `,
      tags: ["Girl-Child Education", "Social Impact", "Goonj CSR", "Rural Sanitation", "Farmer Crop Insurance"]
    },
    {
      pos: "P9",
      number: "10",
      gridRow: 5,
      gridSide: "left",
      gridZ: 44,
      category: "Mentorship",
      title: "1:1 Strategy, Consulting & GMAT Mentorship",
      teamName: "Kick Sauber Neon Velocity",
      liveryColor: 0x22C55E, // Sauber Neon Green
      liveryHex: "#22C55E",
      secondaryColor: 0x000000,
      compound: "Soft (Red C5)",
      telemetryStats: [
        { label: "Platform", val: "Topmate.io", icon: "fa-solid fa-laptop" },
        { label: "Handle", val: "@thapase_thh", icon: "fa-solid fa-at" },
        { label: "Sessions", val: "1:1 Mentoring", icon: "fa-solid fa-comments" },
        { label: "Focus", val: "Consulting & GMAT", icon: "fa-solid fa-bullseye" }
      ],
      badge: "ROW 5 • VERIFIED TOPMATE MENTOR",
      subtitle: "Helping Next-Gen Leaders Break into Tier-1 Consulting & B-Schools",
      dossier: `
        <p class="mb-3 text-slate-200">Active 1:1 mentor on <strong>Topmate</strong> (\`@thapase_thh\`). Guiding engineering students, prospective MBA applicants, and career switchers into management consulting, supply chain analytics, and top-tier B-school admissions.</p>
        <div class="p-3.5 rounded-xl bg-green-500/10 border border-green-500/20 text-xs mb-3 text-green-200">
          <strong>Mentorship Focus:</strong> Consulting case frameworks, market sizing, GMAT 760 quantitative/verbal pacing strategy, and resume impact quantification.
        </div>
        <div class="mt-3">
          <a href="https://topmate.io/thapase_thh" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-green-500 text-black hover:bg-green-400 transition-colors">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Book 1:1 Session on Topmate &rarr;
          </a>
        </div>
      `,
      tags: ["Topmate Mentor", "Consulting Case Prep", "GMAT 760 Strategy", "Resume Drafting", "1:1 Guidance"]
    },
    {
      pos: "P10",
      number: "07",
      gridRow: 5,
      gridSide: "right",
      gridZ: 50,
      category: "Agility & Reflexes",
      title: "Tactical Sports: Cricket & Badminton Agility",
      teamName: "Red Bull Racing Dynamics",
      liveryColor: 0x1E40AF, // Red Bull Deep Racing Navy
      liveryHex: "#1E40AF",
      secondaryColor: 0xE10600,
      compound: "Soft (Red C5)",
      telemetryStats: [
        { label: "Primary Sports", val: "Cricket & Badminton", icon: "fa-solid fa-baseball-bat-ball" },
        { label: "Core Attribute", val: "Sub-Second Reflexes", icon: "fa-solid fa-bolt" },
        { label: "Strategy Synergy", val: "Court Awareness", icon: "fa-solid fa-eye" },
        { label: "Teamwork", val: "High Coordination", icon: "fa-solid fa-users" }
      ],
      badge: "ROW 5 • TACTICAL AGILITY & TEAM PLAY",
      subtitle: "Court Coverage • Anticipation • Competitive Sportsmanship",
      dossier: `
        <p class="mb-3 text-slate-200">Passionate cricket and badminton player. Fast court sports cultivate split-second tactical reflexes, peripheral vision, anticipation, and seamless team communication under scoreboard pressure.</p>
        <div class="p-3.5 rounded-xl bg-blue-600/10 border border-blue-600/20 text-xs mb-3 text-blue-200">
          <strong>Tactical Synergies:</strong> In badminton, reading your opponent's body angle before the smash mirrors anticipating supplier bottlenecks; in cricket, managing run-chase run rates is the exact discipline of supply chain cadence.
        </div>
        <ul class="space-y-1.5 text-xs text-slate-300">
          <li><i class="fa-solid fa-check text-blue-400 mr-2"></i>Lightning-fast reaction times and spatial awareness.</li>
          <li><i class="fa-solid fa-check text-blue-400 mr-2"></i>Competitive sportsmanship and team pressure management.</li>
        </ul>
      `,
      tags: ["Cricket", "Badminton", "Split-Second Reflexes", "Team Tactics", "Court Coverage"]
    }
  ]
};

if (typeof window !== "undefined") {
  window.f1PortfolioData = f1PortfolioData;
}
