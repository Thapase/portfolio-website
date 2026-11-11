/**
 * Portfolio Data Configuration for T.H.H. Thapase
 * Supply Chain & Strategy Consultant | Endurance Athlete | ESG Advocate
 * Centralized data object for easy updates without touching HTML markup.
 */

const portfolioData = {
  personal: {
    fullName: "Thummaginjala Hima Harsha Thapase",
    displayName: "T.H.H. Thapase",
    shortName: "Thapase",
    initials: "THH",
    title: "Supply Chain & Operations Strategist",
    currentRole: "Assistant Manager (Supply Chain Consultant)",
    company: "Genpact",
    location: "Bangalore, India",
    email: "thapase@gmail.com",
    phone: "+91 9566009174",
    bioMantra: "Bridging mathematical supply chain optimization, data-driven resilience, and the relentless endurance of a long-distance runner.",
    summary: "Senior supply chain and operations consultant with proven expertise orchestrating multi-million-dollar transformations for Fortune 500 energy technology, oil & gas, and aerospace leaders. Delivered upwards of ~$30M in annual savings, optimized order cycle times from 12 to 3 weeks across a $600M portfolio, and built predictive AI/ML models. Beyond enterprise operations, I am an endurance runner, explorer across 15+ Indian states, GMAT 760 achiever, and passionate advocate for girl-child education.",
    gmat: "760 (Top 1% Globally)",
    educationSummary: "IIM Sirmaur (MBA) | SRM University (B.Tech EEE - 88% Distinction)"
  },

  socials: {
    linkedin: "https://www.linkedin.com/in/t-h-h-thapase-strategy-consultant",
    twitter: "https://x.com/THHThapase",
    instagram: "https://www.instagram.com/thapase.thh",
    strava: "https://strava.app.link/czwhREDvY7b",
    github: "https://github.com/Thapase",
    topmate: "https://topmate.io/thapase_thh"
  },

  heroMetrics: [
    { value: "$30M+", label: "Annual Client Savings Delivered", icon: "fa-solid fa-chart-line" },
    { value: "75%", label: "Cycle Time Cut (12 to 3 Wks)", icon: "fa-solid fa-bolt" },
    { value: "760", label: "GMAT Score (99th Percentile)", icon: "fa-solid fa-award" },
    { value: "15+", label: "Indian States & UTs Explored", icon: "fa-solid fa-compass" }
  ],

  caseStudies: [
    {
      id: "cycle-time",
      title: "Cycle Time Optimization across $600M Portfolio",
      division: "Energy Tech • Chemical Solutions ($400M)",
      badge: "Best Project Award Q1-2024",
      highlight: "Cycle time reduced from 12 to 3 weeks",
      metrics: [
        { label: "Cycle Time", val: "12 → 3 Wks" },
        { label: "OTIF Improvement", val: "+20-30%" },
        { label: "Portfolio Handled", val: "$600M" },
        { label: "Revenue Multiple", val: "3X Genpact Extension" }
      ],
      description: "Conceptualized and spearheaded a groundbreaking cycle time optimization initiative for a $37B energy technology client in the North America region. Streamlined cross-functional parts planning, eliminated operational bottlenecks, and harmonized order fulfillment.",
      deliverables: [
        "Won Best Team Project (Q1-2024) for novel design and execution.",
        "Awarded prestigious Bronze Medal for outstanding client deliverables as a trusted thought partner.",
        "Delivered recurring ~$10M/annum savings by curbing revenue leakages and synchronizing end-to-end parts planning."
      ],
      tags: ["Cycle Time", "S&OP", "Parts Planning", "OTIF Optimization", "North America"]
    },
    {
      id: "pcp-procurement",
      title: "Predictive Product Cost Pacing (PCP) Model",
      division: "Wirelines Technology Division ($250M)",
      badge: "Global Deployment",
      highlight: "$10M/annum saved in procurement costs",
      metrics: [
        { label: "Annual Savings", val: "~$10M/yr" },
        { label: "Deployment Speed", val: "3 Months" },
        { label: "Team Led", val: "3-5 Members" },
        { label: "New Wins", val: "3 High-Profile Clients" }
      ],
      description: "Engineered a predictive Product Cost Pacing (PCP) procurement algorithm enabling the enterprise to strategically procure raw materials at market inflection points, counteracting price volatility and lead-time spikes.",
      deliverables: [
        "Spearheaded a 3–5 member cross-functional team to develop and deploy the model within 90 days.",
        "Achieved exceptional forecast accuracy, directly generating ~$10M/annum in procurement cost reductions.",
        "Solution recognized as proprietary enterprise IP, adopted globally and winning 3 new clients generating ~$3M/annum."
      ],
      tags: ["Machine Learning", "Predictive Analytics", "Cost Pacing", "Strategic Sourcing", "Python"]
    },
    {
      id: "circular-economy",
      title: "Circular Sourcing & ESG Sustainability Strategy",
      division: "Pump Systems Division ($1.2B)",
      badge: "ESG Leadership",
      highlight: "$2M/yr saved + Landfill waste reduction by 2030",
      metrics: [
        { label: "Direct Savings", val: "~$2M/yr" },
        { label: "Emissions Target", val: "Zero Waste by 2030" },
        { label: "Sourcing Cost", val: "-$500K Sourcing" },
        { label: "Scope", val: "North America & Global" }
      ],
      description: "Pioneered a circular economy framework accelerating the utilization of certified reclaimed parts versus virgin materials in high-stress oilfield pumping equipment, harmonizing operational cost reduction with corporate ESG imperatives.",
      deliverables: [
        "Cut annual operating expenditure by ~$2M in North America while significantly lowering carbon intensity and energy burn.",
        "Engineered global strategic sourcing frameworks saving an additional ~$500K in raw material vendor contracts.",
        "Authored executive thought leadership on sustainable manufacturing, helping clients align with Paris Climate accords."
      ],
      tags: ["ESG", "Circular Economy", "Sustainability", "Carbon Reduction", "Reclaimed Parts"]
    },
    {
      id: "powerbi-digitalization",
      title: "Enterprise Inventory Digitalization & Governance",
      division: "Global Operations ($1.2B Division)",
      badge: "Digital Transformation",
      highlight: "Real-time visibility over $100M+ quarterly inventory",
      metrics: [
        { label: "Quarterly Inventory", val: "$100M+" },
        { label: "Hours Saved", val: "5,000 Man-Hours" },
        { label: "Implementation", val: "Record 4 Months" },
        { label: "Expansion Pipeline", val: "$2M Revenue Pipeline" }
      ],
      description: "Overhauled the legacy inventory tracking architecture by constructing a robust Power BI enterprise analytics suite that unifies disparate global ERP silos into a single source of operational truth.",
      deliverables: [
        "Consolidated fragmented databases into a synchronized governance engine in just 4 months.",
        "Automated reporting workflows, unlocking 5,000 man-hours and capturing ~$50K/year in direct automation savings.",
        "Architecture designated for global multi-division replication, creating a ~$2M pipeline for Genpact."
      ],
      tags: ["Power BI", "Data Governance", "Inventory Optimization", "Process Automation", "ERP Integration"]
    },
    {
      id: "supplier-predictability",
      title: "ML Supplier Predictability & Risk Modeling",
      division: "Aerospace Parts Manufacturing ($10B)",
      badge: "Machine Learning",
      highlight: "$5M annual client savings + Risk mitigation",
      metrics: [
        { label: "Client Savings", val: "$5M p.a." },
        { label: "Extension Value", val: "$500K" },
        { label: "Core Team", val: "Selected in Core 10" },
        { label: "Target Scope", val: "Aerospace S&I" }
      ],
      description: "Handpicked for an elite 10-consultant taskforce to design an AI-powered Supplier Predictability Model for a $10B aerospace manufacturer, scoring vendor delivery variance, yield risk, and inventory buffering requirements.",
      deliverables: [
        "Constructed predictive algorithms to identify optimal supplier allocation, directly preventing assembly-line stockouts.",
        "Generated $5M/year in bottom-line savings and earned a $500K project extension from CxO stakeholders.",
        "Formulated resilient Sourcing & Inventory (S&I) risk mitigation playbooks."
      ],
      tags: ["Aerospace", "Supplier Risk", "Predictive Scoring", "Machine Learning", "Inventory Strategy"]
    }
  ],

  competencies: {
    supplyChain: [
      { name: "End-to-End SCM Planning", level: "Expert", desc: "Demand planning, supply balancing, order orchestration, and capacity alignment." },
      { name: "Cycle Time Optimization", level: "Expert", desc: "Bottleneck diagnosis, lean operations, and OTIF fulfillment enhancement." },
      { name: "Inventory Management & S&OP", level: "Expert", desc: "Safety stock sizing, multi-echelon buffering, and obsolescence control." },
      { name: "Strategic Sourcing & Vendor Risk", level: "Advanced", desc: "Total cost of ownership (TCO), supplier scoring, and contract negotiations." },
      { name: "Sustainable & Circular SCM", level: "Advanced", desc: "Reclaimed materials, carbon emission reduction, and ESG compliance." }
    ],
    technicalTools: [
      { name: "Power BI & DAX", level: "Advanced", icon: "fa-solid fa-chart-pie", desc: "Executive KPI dashboards, real-time inventory modeling." },
      { name: "Machine Learning & Python", level: "Proficient", icon: "fa-brands fa-python", desc: "Predictive pacing, regression, time-series forecasting." },
      { name: "SAP (ERP / SCM)", level: "Advanced", icon: "fa-solid fa-database", desc: "Materials management (MM), sales & distribution (SD), parts planning." },
      { name: "Advanced Excel & VBA", level: "Expert", icon: "fa-solid fa-file-excel", desc: "Financial modeling, scenario simulation, workflow automation." },
      { name: "SQL & Data Engineering", level: "Proficient", icon: "fa-solid fa-server", desc: "ETL pipelines, relational data harmonization." }
    ],
    certifications: [
      { name: "Six Sigma Green Belt", issuer: "KPMG", year: "Certified", icon: "fa-solid fa-medal", desc: "DMAIC framework, root-cause statistical analysis, process variance reduction." },
      { name: "Certified Business Analysis (CBAP)", issuer: "Henry Harvin", year: "Certified", icon: "fa-solid fa-certificate", desc: "Enterprise requirements engineering, stakeholder alignment, solution validation." },
      { name: "GMAT 760", issuer: "GMAC", year: "Top 1% Globally", icon: "fa-solid fa-trophy", desc: "Demonstrated analytical, critical reasoning, and quantitative problem-solving excellence." }
    ]
  },

  lifeJourney: [
    {
      period: "Aug 2021 – Present",
      role: "Assistant Manager (Supply Chain Consultant)",
      institution: "Genpact",
      location: "Bangalore, India",
      type: "professional",
      icon: "fa-solid fa-briefcase",
      summary: "Leading high-stakes supply chain consulting engagements across Energy Tech, Oil & Gas, and Aerospace sectors. Transformed operational cadence for Fortune 500 clients, generating >$30M in annual bottom-line impact.",
      achievements: [
        "Awarded Bronze Medal for outstanding client deliverables & recognized as trusted client thought partner.",
        "Won Best Team Project (Q1-2024) for cycle time reduction from 12 to 3 weeks.",
        "Drove firm-wide CSR drives in collaboration with Goonj and organized Fun Friday engagements."
      ]
    },
    {
      period: "2019 – 2021",
      role: "Master of Business Administration (MBA)",
      institution: "Indian Institute of Management (IIM) Sirmaur",
      location: "Sirmaur, Himachal Pradesh, India",
      type: "education",
      icon: "fa-solid fa-graduation-cap",
      summary: "Completed MBA with deep focus on Operations, Strategy, and Analytics. Scored a world-class 760 on the GMAT (Top 1% worldwide). Active in institute leadership and academic excellence.",
      achievements: [
        "GMAT 760 (99th percentile) reflecting top-tier quantitative and analytical faculties.",
        "Built the GTM strategy for Etherisc to insure smallholder crops and double farmer income via carbon credits.",
        "Led public relations and social media outreach for Athulya Vikas Foundation."
      ]
    },
    {
      period: "2015 – 2019",
      role: "B.Tech in Electrical & Electronics Engineering (EEE)",
      institution: "SRM University (SRMIST)",
      location: "Chennai, Tamil Nadu, India",
      type: "education",
      icon: "fa-solid fa-microchip",
      summary: "Graduated with 88% Aggregate (First Class with Distinction). Built rigorous foundational engineering skills, mathematical systems modeling, and organized department techno-management fests.",
      achievements: [
        "First Class with Distinction (88% aggregate).",
        "Key organizer for university techno-management events and cultural forums.",
        "Transitioned engineering problem-solving into large-scale industrial supply chain optimization."
      ]
    }
  ],

  athleticsAndHobbies: {
    strava: {
      title: "Endurance & Long-Distance Running",
      philosophy: "The discipline of the road mirrors the rigor of supply chain consulting: pacing, cadence, energy distribution, and pushing past fatigue when the final milestone approaches.",
      stats: [
        { label: "Mindset", value: "Relentless Cadence" },
        { label: "Focus", value: "Endurance & Grit" },
        { label: "Sport Link", value: "Strava Profile", link: "https://strava.app.link/czwhREDvY7b" }
      ]
    },
    travel: {
      title: "Explorer Across 15+ Indian States & UTs",
      philosophy: "Traversing diverse landscapes from Himalayan passes to coastal belts shapes adaptability, cultural empathy, and wide-angle perspective.",
      statesCount: "15+",
      statesList: [
        "Himachal Pradesh", "Jammu & Kashmir", "Uttarakhand", "Karnataka", "Tamil Nadu",
        "Kerala", "Maharashtra", "Goa", "Andhra Pradesh", "Telangana",
        "Rajasthan", "Delhi NCR", "Punjab", "Haryana", "Puducherry"
      ]
    },
    sports: [
      {
        name: "Cricket",
        icon: "fa-solid fa-baseball-bat-ball",
        desc: "Tactical positioning, team coordination, and performing under scoreboard pressure."
      },
      {
        name: "Badminton",
        icon: "fa-solid fa-feather-pointed",
        desc: "Lightning-fast reflexes, court coverage, anticipation, and dynamic agility."
      }
    ]
  },

  socialImpact: [
    {
      title: "Empowering 320+ Girls Through Education",
      cause: "Rural Government School Infrastructure",
      impactMetric: "Attendance rose to 85%",
      icon: "fa-solid fa-school",
      desc: "Spearheaded an annual fundraising campaign generating $6,000/year to overhaul sanitary facilities and classroom infrastructure in an all-girls government school. Dramatically curbed female student dropouts and unlocked educational dignity for 320 young women."
    },
    {
      title: "Disaster Relief with Goonj",
      cause: "Flood Victim Rehabilitation & Winter Warmth",
      impactMetric: "Thousands of Families Aided",
      icon: "fa-solid fa-hand-holding-heart",
      desc: "Partnered with national humanitarian NGO Goonj during corporate CSR drives at Genpact. Mobilized widespread employee clothing donation campaigns and logistics routing to deliver critical aid to disaster-affected communities."
    },
    {
      title: "Crop Insurance & Carbon Credits for Farmers",
      cause: "Parametric Climate Protection (Etherisc)",
      impactMetric: "2X Farmer Income Potential",
      icon: "fa-solid fa-seedling",
      desc: "Formulated the Go-To-Market strategy for Etherisc, bringing decentralized crop insurance to smallholder agriculturalists across developing regions. Integrated carbon credit monetization to create recurring secondary revenue for rural farmers."
    },
    {
      title: "Women & Child Empowerment Outreach",
      cause: "Athulya Vikas Foundation",
      impactMetric: "Expanded Digital Reach & Volunteer Drive",
      icon: "fa-solid fa-people-roof",
      desc: "Crafted and executed digital communication strategies for Athulya Vikas Foundation, accelerating volunteer recruitment and donor backing for child literacy programs and rural women's self-help collectives."
    }
  ],

  mentorship: {
    title: "1:1 Strategy, Consulting & GMAT Mentorship",
    platform: "Topmate.io",
    handle: "@thapase_thh",
    link: "https://topmate.io/thapase_thh",
    desc: "Helping aspiring strategists, engineers, and MBA applicants master consulting case interviews, supply chain career transitions, and GMAT preparation (scoring 760).",
    services: [
      "Consulting Case Interview Prep & Frameworks",
      "GMAT 760 Quantitative & Verbal Mastery Strategy",
      "Supply Chain & Operations Career Navigation",
      "Resume Architecture & Impact Storytelling"
    ]
  }
};

// Export to window
if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
}
