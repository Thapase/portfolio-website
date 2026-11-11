/**
 * F1 Singapore Marina Bay Grand Prix — Three.js 3D WebGL Engine & Grid Launch Experience
 * Driver: T.H.H. Thapase (THH) — Supply Chain & Strategy Consultant | Endurance Athlete
 * Interactive 3D Circuit, 10 Moving Procedural F1 Cars, Orbit Camera & Side Telemetry Pit Wall
 */

// Global 3D Engine Variables
let scene, camera, renderer, controls;
let cars3D = []; // Array of 3D car objects
let smokeParticles = [];
let raycaster, mouse;
let isLaunching = false;
let activeCarData = null;
let activeCarMesh = null;
let cameraTarget = new THREE.Vector3(0, 0, 10);
let cameraMode = "orbit"; // "orbit" or "chase"
let chaseOffset = new THREE.Vector3(0, 4, 10);

document.addEventListener("DOMContentLoaded", () => {
  init3DScene();
  buildMarinaBayCircuit();
  buildStartingGridCars();
  renderTimingTowerLegend();
  initInteractions();
  initSuperlicenceModal();
  animate3D();
});

/* ==========================================================================
   1. Initialize Three.js Scene, Camera, Renderer & Lights
   ========================================================================== */
function init3DScene() {
  const container = document.getElementById("webgl-container");
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Scene with Singapore Night Fog
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x06080F);
  scene.fog = new THREE.FogExp2(0x06080F, 0.008);

  // Perspective Camera
  camera = new THREE.PerspectiveCamera(52, width / height, 0.5, 1000);
  camera.position.set(0, 14, 42); // Elevated start grid vantage

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.appendChild(renderer.domElement);

  // OrbitControls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 - 0.04; // Don't go underground
  controls.minDistance = 6;
  controls.maxDistance = 140;
  controls.target.copy(cameraTarget);

  // Raycaster & Mouse
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Singapore Marina Bay Track Lighting
  const ambientLight = new THREE.AmbientLight(0x2A3548, 1.2);
  scene.add(ambientLight);

  // Main Overhead Pit Straight Floodlight
  const mainFloodlight = new THREE.DirectionalLight(0xEAF0FF, 2.4);
  mainFloodlight.position.set(20, 45, 10);
  mainFloodlight.castShadow = true;
  mainFloodlight.shadow.mapSize.width = 2048;
  mainFloodlight.shadow.mapSize.height = 2048;
  mainFloodlight.shadow.bias = -0.0005;
  scene.add(mainFloodlight);

  // Ambient Cyan/Blue Street Glow of Marina Bay
  const bayGlowLight = new THREE.DirectionalLight(0x00D2BE, 0.8);
  bayGlowLight.position.set(-30, 25, -20);
  scene.add(bayGlowLight);

  // Resize Listener
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/* ==========================================================================
   2. Build Singapore Marina Bay Street Circuit 3D Environment
   ========================================================================== */
function buildMarinaBayCircuit() {
  const trackGroup = new THREE.Group();

  // 1. Asphalt Road Surface (Pit Straight: 22m wide, 240m long)
  const roadGeo = new THREE.PlaneGeometry(24, 260);
  const roadMat = new THREE.MeshStandardMaterial({
    color: 0x141820,
    roughness: 0.85,
    metalness: 0.15
  });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0, 10);
  road.receiveShadow = true;
  trackGroup.add(road);

  // 2. Marina Bay Water Surface (to the left of track)
  const waterGeo = new THREE.PlaneGeometry(350, 400);
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x051329,
    roughness: 0.2,
    metalness: 0.85
  });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.set(-190, -0.2, 20);
  trackGroup.add(water);

  // 3. Red & White Curbs Lining Track Edges
  buildSingaporeCurbs(trackGroup);

  // 4. Checkered Start / Finish Line
  const startLineGeo = new THREE.PlaneGeometry(24, 2.5);
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  const size = 16;
  for (let x = 0; x < canvas.width; x += size) {
    for (let y = 0; y < canvas.height; y += size) {
      ctx.fillStyle = ((x / size + y / size) % 2 === 0) ? "#FFFFFF" : "#111111";
      ctx.fillRect(x, y, size, size);
    }
  }
  const checkeredTexture = new THREE.CanvasTexture(canvas);
  const startLineMat = new THREE.MeshBasicMaterial({ map: checkeredTexture });
  const startLine = new THREE.Mesh(startLineGeo, startLineMat);
  startLine.rotation.x = -Math.PI / 2;
  startLine.position.set(0, 0.02, -18);
  trackGroup.add(startLine);

  // 5. Overhead Starting Lights Gantry Bridge
  buildGantryBridge(trackGroup);

  // 6. Trackside Floodlight Pylons with Cones
  for (let z = -80; z <= 120; z += 35) {
    buildFloodlightPylon(trackGroup, 13.5, z);
    buildFloodlightPylon(trackGroup, -13.5, z);
  }

  // 7. Singapore Night Skyline Silhouettes in Background
  buildSingaporeSkyline(trackGroup);

  scene.add(trackGroup);
}

// Build Alternating Red & White Street Curbs
function buildSingaporeCurbs(group) {
  const curbLength = 260;
  const blockLength = 3;
  const curbGeo = new THREE.BoxGeometry(0.8, 0.15, blockLength);
  const redMat = new THREE.MeshStandardMaterial({ color: 0xE10600, roughness: 0.5 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.5 });

  for (let z = -120; z < 140; z += blockLength) {
    const isRed = Math.floor(z / blockLength) % 2 === 0;
    const mat = isRed ? redMat : whiteMat;

    // Left Curb
    const curbL = new THREE.Mesh(curbGeo, mat);
    curbL.position.set(-12.2, 0.06, z);
    curbL.receiveShadow = true;
    group.add(curbL);

    // Right Curb
    const curbR = new THREE.Mesh(curbGeo, mat);
    curbR.position.set(12.2, 0.06, z);
    curbR.receiveShadow = true;
    group.add(curbR);
  }
}

// Build F1 Starting Lights Gantry
let gantryLights = [];
function buildGantryBridge(group) {
  const gantryGroup = new THREE.Group();
  gantryGroup.position.set(0, 0, -22);

  // Left & Right Support Pillars
  const pillarGeo = new THREE.BoxGeometry(0.6, 9, 0.6);
  const pillarMat = new THREE.MeshStandardMaterial({ color: 0x27272A, metalness: 0.8 });
  const pillarL = new THREE.Mesh(pillarGeo, pillarMat);
  pillarL.position.set(-13, 4.5, 0);
  const pillarR = new THREE.Mesh(pillarGeo, pillarMat);
  pillarR.position.set(13, 4.5, 0);
  gantryGroup.add(pillarL, pillarR);

  // Horizontal Crossbeam
  const beamGeo = new THREE.BoxGeometry(26.6, 1.2, 1.2);
  const beam = new THREE.Mesh(beamGeo, pillarMat);
  beam.position.set(0, 8.5, 0);
  gantryGroup.add(beam);

  // 5 Red Starting Lights Panel
  const panelGeo = new THREE.BoxGeometry(8, 1.6, 0.4);
  const panelMat = new THREE.MeshBasicMaterial({ color: 0x09090B });
  const panel = new THREE.Mesh(panelGeo, panelMat);
  panel.position.set(0, 7.6, 0.6);
  gantryGroup.add(panel);

  gantryLights = [];
  const lightGeo = new THREE.CircleGeometry(0.35, 16);
  for (let i = 0; i < 5; i++) {
    const lightMat = new THREE.MeshBasicMaterial({ color: 0x3F3F46 });
    const light = new THREE.Mesh(lightGeo, lightMat);
    light.position.set(-2.8 + i * 1.4, 7.6, 0.82);
    gantryGroup.add(light);
    gantryLights.push(light);
  }

  group.add(gantryGroup);
}

// Floodlight Tower Pylon
function buildFloodlightPylon(group, x, z) {
  const pylon = new THREE.Group();
  pylon.position.set(x, 0, z);

  const poleGeo = new THREE.CylinderGeometry(0.2, 0.35, 14, 8);
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7 });
  const pole = new THREE.Mesh(poleGeo, poleMat);
  pole.position.y = 7;
  pylon.add(pole);

  // Lamp Head
  const lampGeo = new THREE.BoxGeometry(1.6, 0.6, 1);
  const lampMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  const lamp = new THREE.Mesh(lampGeo, lampMat);
  lamp.position.set(0, 13.8, 0);
  lamp.rotation.z = x > 0 ? 0.3 : -0.3;
  pylon.add(lamp);

  // Pointlight to illuminate track
  const light = new THREE.PointLight(0xFFFFFF, 0.9, 32, 1.6);
  light.position.set(0, 13, 0);
  pylon.add(light);

  group.add(pylon);
}

// Singapore Skyline Buildings (Distant Night Towers)
function buildSingaporeSkyline(group) {
  const buildings = [
    { x: 35, z: -50, w: 12, h: 55, d: 14, color: 0x0F172A },
    { x: 45, z: 10, w: 16, h: 72, d: 18, color: 0x1E293B },
    { x: 38, z: 70, w: 14, h: 48, d: 14, color: 0x0F172A },
    { x: 50, z: -90, w: 15, h: 64, d: 15, color: 0x1E293B },
    { x: -55, z: -100, w: 20, h: 80, d: 20, color: 0x0F172A },
    { x: -65, z: 60, w: 22, h: 58, d: 18, color: 0x1E293B }
  ];

  buildings.forEach(b => {
    const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
    const mat = new THREE.MeshStandardMaterial({
      color: b.color,
      roughness: 0.6,
      metalness: 0.4
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(b.x, b.h / 2, b.z);
    group.add(mesh);
  });
}

/* ==========================================================================
   3. Build 10 Procedural 3D F1 Cars (Starting Grid P1 to P10)
   ========================================================================== */
function buildStartingGridCars() {
  if (!window.f1PortfolioData) return;
  const cars = window.f1PortfolioData.gridCars;
  cars3D = [];

  cars.forEach((carData, index) => {
    const carGroup = createF1CarMesh(carData);
    
    // Position on Staggered Starting Grid
    const posX = carData.gridSide === "left" ? -3.8 : 3.8;
    const posZ = carData.gridZ;
    carGroup.position.set(posX, 0.45, posZ);
    carGroup.rotation.y = Math.PI; // Facing forward down the pit straight towards Turn 1

    // Store custom metadata
    carGroup.userData = {
      carData: carData,
      initialPos: new THREE.Vector3(posX, 0.45, posZ),
      initialRot: Math.PI,
      isLaunched: false,
      speed: 0,
      targetSpeed: 0,
      wheels: carGroup.userData.wheels
    };

    // Paint White Starting Box on Track
    createGridSlotMarking(posX, posZ, carData.pos);

    scene.add(carGroup);
    cars3D.push(carGroup);
  });
}

// Painted Starting Box Markings on Asphalt
function createGridSlotMarking(x, z, posText) {
  const boxGeo = new THREE.PlaneGeometry(3.6, 5.8);
  const edges = new THREE.EdgesGeometry(boxGeo);
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xFFFFFF, linewidth: 2 }));
  line.rotation.x = -Math.PI / 2;
  line.position.set(x, 0.025, z);
  scene.add(line);
}

// Procedural 3D F1 Single-Seater Mesh Generator
function createF1CarMesh(carData) {
  const car = new THREE.Group();

  // Materials
  const liveryMat = new THREE.MeshStandardMaterial({
    color: carData.liveryColor,
    roughness: 0.35,
    metalness: 0.65
  });

  const carbonMat = new THREE.MeshStandardMaterial({
    color: 0x18181B,
    roughness: 0.7,
    metalness: 0.5
  });

  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x09090B,
    roughness: 0.95
  });

  // 1. Sleek Nosecone & Monocoque
  const noseGeo = new THREE.ConeGeometry(0.45, 2.2, 8);
  const nose = new THREE.Mesh(noseGeo, liveryMat);
  nose.rotation.x = -Math.PI / 2;
  nose.position.set(0, 0.25, 1.8);
  nose.castShadow = true;
  car.add(nose);

  // 2. Main Central Body Chassis
  const bodyGeo = new THREE.BoxGeometry(0.9, 0.45, 2.6);
  const body = new THREE.Mesh(bodyGeo, liveryMat);
  body.position.set(0, 0.3, 0);
  body.castShadow = true;
  car.add(body);

  // 3. Sculpted Aerodynamic Sidepods (Left & Right)
  const sidepodGeo = new THREE.BoxGeometry(0.55, 0.38, 1.8);
  const sidepodL = new THREE.Mesh(sidepodGeo, liveryMat);
  sidepodL.position.set(-0.7, 0.28, -0.1);
  sidepodL.castShadow = true;

  const sidepodR = new THREE.Mesh(sidepodGeo, liveryMat);
  sidepodR.position.set(0.7, 0.28, -0.1);
  sidepodR.castShadow = true;
  car.add(sidepodL, sidepodR);

  // 4. Cockpit & Driver Helmet
  const cockpitGeo = new THREE.BoxGeometry(0.5, 0.2, 0.8);
  const cockpit = new THREE.Mesh(cockpitGeo, carbonMat);
  cockpit.position.set(0, 0.48, 0.3);
  car.add(cockpit);

  const helmetGeo = new THREE.SphereGeometry(0.18, 16, 16);
  const helmetMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.2 });
  const helmet = new THREE.Mesh(helmetGeo, helmetMat);
  helmet.position.set(0, 0.6, 0.25);
  car.add(helmet);

  // 5. Halo Safety Ring
  const haloGeo = new THREE.TorusGeometry(0.24, 0.04, 8, 16, Math.PI);
  const halo = new THREE.Mesh(haloGeo, carbonMat);
  halo.rotation.x = -Math.PI / 2;
  halo.position.set(0, 0.68, 0.32);
  car.add(halo);

  // 6. Front Aerodynamic Wing & Endplates
  const frontWingGeo = new THREE.BoxGeometry(2.3, 0.06, 0.6);
  const frontWing = new THREE.Mesh(frontWingGeo, carbonMat);
  frontWing.position.set(0, 0.12, 2.7);
  frontWing.castShadow = true;
  car.add(frontWing);

  // 7. Rear Aerodynamic Wing & DRS Plane
  const rearWingGeo = new THREE.BoxGeometry(2.1, 0.5, 0.4);
  const rearWing = new THREE.Mesh(rearWingGeo, liveryMat);
  rearWing.position.set(0, 0.9, -1.9);
  rearWing.castShadow = true;
  car.add(rearWing);

  // Rear Red Rain LED Light
  const rainLightGeo = new THREE.SphereGeometry(0.08, 8, 8);
  const rainLightMat = new THREE.MeshBasicMaterial({ color: 0xEF4444 });
  const rainLight = new THREE.Mesh(rainLightGeo, rainLightMat);
  rainLight.position.set(0, 0.35, -2.15);
  car.add(rainLight);

  // 8. Rotating Wheels (Front & Rear)
  const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.38, 16);
  const wheels = [];

  const wheelPositions = [
    { x: -1.2, y: 0.42, z: 1.8 },  // Front Left
    { x: 1.2, y: 0.42, z: 1.8 },   // Front Right
    { x: -1.25, y: 0.44, z: -1.5 }, // Rear Left
    { x: 1.25, y: 0.44, z: -1.5 }  // Rear Right
  ];

  wheelPositions.forEach(p => {
    const wheel = new THREE.Mesh(wheelGeo, tireMat);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(p.x, p.y, p.z);
    wheel.castShadow = true;
    car.add(wheel);
    wheels.push(wheel);
  });

  car.userData.wheels = wheels;

  // 9. Floating 3D Position Badge Billboard (e.g. "P1")
  const badgeCanvas = document.createElement("canvas");
  badgeCanvas.width = 128;
  badgeCanvas.height = 128;
  const bCtx = badgeCanvas.getContext("2d");
  bCtx.fillStyle = carData.liveryHex;
  bCtx.beginPath();
  bCtx.arc(64, 64, 56, 0, Math.PI * 2);
  bCtx.fill();
  bCtx.fillStyle = "#FFFFFF";
  bCtx.font = "bold 52px Chakra Petch, sans-serif";
  bCtx.textAlign = "center";
  bCtx.textBaseline = "middle";
  bCtx.fillText(carData.pos, 64, 66);

  const badgeTex = new THREE.CanvasTexture(badgeCanvas);
  const badgeSpriteMat = new THREE.SpriteMaterial({ map: badgeTex, depthTest: false });
  const badgeSprite = new THREE.Sprite(badgeSpriteMat);
  badgeSprite.scale.set(1.4, 1.4, 1.4);
  badgeSprite.position.set(0, 2.2, 0);
  car.add(badgeSprite);

  return car;
}

/* ==========================================================================
   4. Interactive Raycasting & Car Launch Telemetry
   ========================================================================== */
function initInteractions() {
  const container = document.getElementById("webgl-container");

  // Track Mouse Movement for Hover Raycasting
  window.addEventListener("mousemove", onMouseMove);

  // Click Raycasting on 3D Cars
  window.addEventListener("click", onSceneClick);

  // View Controls
  document.getElementById("btn-view-grid").addEventListener("click", resetCameraToGrid);
  document.getElementById("btn-view-chase").addEventListener("click", toggleChaseCam);
  document.getElementById("btn-reset-grid").addEventListener("click", resetAllCarsToGrid);
}

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Check hover over 3D cars
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(cars3D, true);

  if (intersects.length > 0) {
    document.body.style.cursor = "pointer";
  } else {
    document.body.style.cursor = "default";
  }
}

function onSceneClick(event) {
  // Ignore clicks on UI HUD or Modals
  if (event.target.closest("#f1-header") || event.target.closest("#telemetry-side-hud") || event.target.closest("#superlicence-modal")) {
    return;
  }

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(cars3D, true);

  if (intersects.length > 0) {
    // Find top-level car group
    let obj = intersects[0].object;
    while (obj.parent && !obj.userData.carData) {
      obj = obj.parent;
    }
    if (obj.userData && obj.userData.carData) {
      launchSelectedCar(obj.userData.carData.pos);
    }
  }
}

// Launch Sequence: Lights Out & Car Throttles Forward
function launchSelectedCar(pos) {
  const carGroup = cars3D.find(c => c.userData.carData.pos === pos);
  if (!carGroup) return;

  const carData = carGroup.userData.carData;
  activeCarData = carData;
  activeCarMesh = carGroup;

  // 1. Starting Lights Sequence (5 Red Lights on Gantry)
  runStartLightsSequence(() => {
    // 2. Launch Car Forward!
    carGroup.userData.isLaunched = true;
    carGroup.userData.targetSpeed = 0.95; // High velocity towards Turn 1

    // Switch camera to smooth Chase Tracking
    cameraMode = "chase";

    // 3. Open Frosted Glass Side Telemetry Pit-Wall HUD
    openSideTelemetryHUD(carData);

    // Update Top Timing Tower
    document.querySelectorAll(".timing-item").forEach(item => item.classList.remove("active"));
    const activeItem = document.querySelector(`.timing-item[data-pos="${pos}"]`);
    if (activeItem) activeItem.classList.add("active");
  });
}

function runStartLightsSequence(callback) {
  // Gantry UI & 3D Lights
  const uiLights = document.querySelectorAll(".gantry-light");
  uiLights.forEach(l => (l.className = "gantry-light"));

  let step = 0;
  const lightInterval = setInterval(() => {
    if (step < 5) {
      if (uiLights[step]) uiLights[step].className = "gantry-light lit-red";
      if (gantryLights[step]) gantryLights[step].material.color.setHex(0xEF4444);
      step++;
    } else {
      clearInterval(lightInterval);
      // Random hold time then LIGHTS OUT!
      setTimeout(() => {
        uiLights.forEach(l => (l.className = "gantry-light lit-green"));
        gantryLights.forEach(l => l.material.color.setHex(0x22C55E));
        setTimeout(() => {
          uiLights.forEach(l => (l.className = "gantry-light"));
          gantryLights.forEach(l => l.material.color.setHex(0x3F3F46));
        }, 1200);

        if (callback) callback();
      }, 700);
    }
  }, 250);
}

// Reset All Cars Back to Grid
function resetAllCarsToGrid() {
  cars3D.forEach(car => {
    car.position.copy(car.userData.initialPos);
    car.userData.isLaunched = false;
    car.userData.speed = 0;
    car.userData.targetSpeed = 0;
  });

  closeSideTelemetryHUD();
  resetCameraToGrid();
}

function resetCameraToGrid() {
  cameraMode = "orbit";
  controls.enabled = true;
  camera.position.set(0, 14, 42);
  controls.target.set(0, 0, 10);
}

function toggleChaseCam() {
  if (activeCarMesh) {
    cameraMode = cameraMode === "chase" ? "orbit" : "chase";
    if (cameraMode === "orbit") {
      controls.enabled = true;
    }
  }
}

/* ==========================================================================
   5. Side Telemetry Pit-Wall HUD Logic (Populated & Frosted Glass)
   ========================================================================== */
function openSideTelemetryHUD(car) {
  const hud = document.getElementById("telemetry-side-hud");
  if (!hud) return;

  hud.style.setProperty("--hud-accent-glow", `${car.liveryHex}66`);

  // Header Data
  const posBadge = document.getElementById("hud-pos-badge");
  posBadge.textContent = car.pos;
  posBadge.style.backgroundColor = car.liveryHex;

  document.getElementById("hud-race-number").textContent = `#${car.number}`;
  document.getElementById("hud-category-badge").textContent = car.category;
  document.getElementById("hud-title").textContent = car.title;
  document.getElementById("hud-team-name").textContent = `${car.teamName} • ${car.compound}`;
  document.getElementById("hud-badge").textContent = car.badge;

  // 4 Telemetry Metrics
  const statsContainer = document.getElementById("hud-telemetry-stats");
  statsContainer.innerHTML = car.telemetryStats
    .map(
      s => `
    <div class="p-3 rounded-xl bg-black/50 border border-white/10 flex flex-col justify-between">
      <div class="flex items-center justify-between text-slate-400 text-xs mb-1">
        <span class="truncate">${s.label}</span>
        <i class="${s.icon} text-teal-400"></i>
      </div>
      <div class="font-f1 font-black text-xl text-white">${s.val}</div>
    </div>
  `
    )
    .join("");

  // Detailed Dossier
  document.getElementById("hud-dossier-content").innerHTML = car.dossier;

  // Tags
  const tagsContainer = document.getElementById("hud-tags-container");
  tagsContainer.innerHTML = car.tags
    .map(
      t => `
    <span class="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white/5 border border-white/10 text-slate-300">
      #${t}
    </span>
  `
    )
    .join("");

  // Prev / Next Navigation
  const cars = window.f1PortfolioData.gridCars;
  const currentIndex = cars.findIndex(c => c.pos === car.pos);
  const prevCar = cars[(currentIndex - 1 + cars.length) % cars.length];
  const nextCar = cars[(currentIndex + 1) % cars.length];

  const prevBtn = document.getElementById("hud-prev-btn");
  const nextBtn = document.getElementById("hud-next-btn");

  if (prevBtn) {
    prevBtn.onclick = () => launchSelectedCar(prevCar.pos);
    prevBtn.innerHTML = `<i class="fa-solid fa-chevron-left mr-1"></i> ${prevCar.pos}`;
  }
  if (nextBtn) {
    nextBtn.onclick = () => launchSelectedCar(nextCar.pos);
    nextBtn.innerHTML = `${nextCar.pos} <i class="fa-solid fa-chevron-right ml-1"></i>`;
  }

  // Display HUD
  hud.classList.remove("hidden");
  hud.classList.add("slide-in");
}

function closeSideTelemetryHUD() {
  const hud = document.getElementById("telemetry-side-hud");
  if (hud) {
    hud.classList.add("hidden");
    hud.classList.remove("slide-in");
  }
  cameraMode = "orbit";
  controls.enabled = true;
}

window.closeSideTelemetryHUD = closeSideTelemetryHUD;
window.launchSelectedCar = launchSelectedCar;

/* ==========================================================================
   6. Top Broadcast Timing Tower Legend
   ========================================================================== */
function renderTimingTowerLegend() {
  const container = document.getElementById("f1-timing-tower-items");
  if (!container || !window.f1PortfolioData) return;

  const cars = window.f1PortfolioData.gridCars;
  container.innerHTML = cars
    .map(
      car => `
    <div class="timing-item flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 hover:border-white/30 shrink-0" 
         data-pos="${car.pos}" onclick="launchSelectedCar('${car.pos}')" title="Click to launch ${car.pos} - ${car.title}">
      <span class="font-f1 font-black text-xs text-white px-1.5 py-0.5 rounded" style="background-color: ${car.liveryHex}">
        ${car.pos}
      </span>
      <div class="flex items-center gap-1.5 text-xs font-mono">
        <span class="font-bold text-slate-100">${car.category}</span>
        <span class="text-slate-400">#${car.number}</span>
      </div>
    </div>
  `
    )
    .join("");
}

/* ==========================================================================
   7. FIA Superlicence & Driver CV Modal
   ========================================================================== */
function initSuperlicenceModal() {
  const openBtns = document.querySelectorAll(".open-superlicence-btn");
  const closeBtns = document.querySelectorAll(".close-superlicence-btn");
  const modal = document.getElementById("superlicence-modal");
  const printBtn = document.getElementById("print-superlicence-btn");

  openBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (modal) modal.classList.remove("hidden");
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (modal) modal.classList.add("hidden");
    });
  });

  if (modal) {
    modal.addEventListener("click", e => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }

  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }
}

/* ==========================================================================
   8. Animation Loop (60 FPS WebGL Rendering & Physics)
   ========================================================================== */
function animate3D() {
  requestAnimationFrame(animate3D);

  // Update Cars Acceleration & Movement
  cars3D.forEach(car => {
    if (car.userData.isLaunched) {
      // Accelerate forward along Singapore pit straight
      car.userData.speed += (car.userData.targetSpeed - car.userData.speed) * 0.08;
      car.position.z -= car.userData.speed; // Moving towards negative Z (Turn 1)

      // Spin Wheels
      car.userData.wheels.forEach(w => {
        w.rotation.x += car.userData.speed * 0.8;
      });

      // Spawn Tire Smoke
      if (Math.random() < 0.4 && car.userData.speed > 0.2) {
        spawnTireSmoke(car.position.x, car.position.y + 0.2, car.position.z + 1.8);
      }
    }
  });

  // Update Tire Smoke Particles
  updateSmokeParticles();

  // Camera Controller
  if (cameraMode === "chase" && activeCarMesh) {
    controls.enabled = false;
    const targetPos = activeCarMesh.position.clone();
    
    // Smooth camera chase following
    const desiredCamPos = targetPos.clone().add(new THREE.Vector3(0, 3.8, 12));
    camera.position.lerp(desiredCamPos, 0.08);
    controls.target.lerp(targetPos, 0.1);
    camera.lookAt(targetPos);
  } else {
    controls.update();
  }

  renderer.render(scene, camera);
}

// Particle System for Tire Smoke
function spawnTireSmoke(x, y, z) {
  if (smokeParticles.length > 40) return;
  const geo = new THREE.SphereGeometry(0.25 + Math.random() * 0.25, 8, 8);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xE2E8F0,
    transparent: true,
    opacity: 0.5
  });
  const smoke = new THREE.Mesh(geo, mat);
  smoke.position.set(x + (Math.random() - 0.5) * 0.6, y, z);
  scene.add(smoke);
  smokeParticles.push({ mesh: smoke, life: 1 });
}

function updateSmokeParticles() {
  for (let i = smokeParticles.length - 1; i >= 0; i--) {
    const p = smokeParticles[i];
    p.life -= 0.035;
    p.mesh.scale.multiplyScalar(1.04);
    p.mesh.material.opacity = p.life * 0.5;
    p.mesh.position.y += 0.02;

    if (p.life <= 0) {
      scene.remove(p.mesh);
      smokeParticles.splice(i, 1);
    }
  }
}
