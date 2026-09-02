/**
 * QUASSAR SANCTUM - Scene Viewport, Dynamic Particles & Node Transit Component
 * Renders high-resolution environmental scenes, live particle layers, and transit cycles.
 */

import { LOCATIONS } from '../data/locations.js';
import { soundEngine } from '../audio.js';
import { gameState } from '../state.js';

export class SceneRenderer {
  constructor(onInspectPoi, onNavigate, onOpenMap) {
    this.onInspectPoi = onInspectPoi;
    this.onNavigate = onNavigate;
    this.onOpenMap = onOpenMap;
    this.container = null;
    this.particleAnimId = null;
    this.particles = [];
  }

  render(parentEl) {
    this.container = document.createElement('div');
    this.container.className = 'viewport-main';
    parentEl.appendChild(this.container);

    this.update();
  }

  update() {
    if (!this.container) return;
    const state = gameState.getState();
    const location = LOCATIONS[state.currentLocationId] || LOCATIONS.island_exterior;

    // Update procedural sound ambience for the current room
    soundEngine.setRoomAmbience(location.id);

    this.container.innerHTML = `
      <div class="scene-canvas-container" id="scene-canvas-box">
        <img class="scene-bg-image" id="scene-bg-img" src="${location.bgImage}" alt="${location.name}" />
        <canvas class="scene-particle-canvas" id="particle-canvas"></canvas>
        <div class="scene-overlay-gradient"></div>

        <!-- Location Header Card -->
        <div class="scene-location-title-card">
          <div class="scene-loc-code">${location.code} // ${location.level}</div>
          <div class="scene-loc-name">${location.name}</div>
          <div class="scene-loc-desc">${location.description}</div>
          <div style="margin-top: 8px; display: flex; align-items: center; gap: 8px;">
            <span class="hud-label">STATUS:</span>
            <span class="status-badge ${location.systemStatus.includes('NOMINAL') ? 'nominal' : (location.systemStatus.includes('DEGRADED') || location.systemStatus.includes('ENTROPY') ? 'degraded' : 'restricted')}">
              ${location.systemStatus}
            </span>
          </div>
        </div>

        <!-- Interactive Hotspot POIs -->
        <div id="poi-layer">
          ${location.pois.map(poi => {
            const isInspected = state.inspectedPois.has(poi.id);
            return `
              <div class="poi-hotspot ${isInspected ? 'inspected' : ''} ${poi.isAnomaly ? 'anomaly' : ''}" 
                   id="${poi.id}" 
                   style="left: ${poi.x}%; top: ${poi.y}%;">
                <div class="poi-reticle"></div>
                
                <!-- Hover Preview Tooltip -->
                <div class="poi-tooltip">
                  <div class="poi-tooltip-tag">${isInspected ? '● INSPECTED // ARCHIVE SYNC' : '○ UNINSPECTED OBJECT'}</div>
                  <div class="poi-tooltip-title">${poi.title}</div>
                  <div class="poi-tooltip-sub">${poi.subtitle}</div>
                  <div class="poi-tooltip-action">
                    <span>[CLICK TO FORENSICALLY INSPECT]</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Viewport Bottom Quick-Travel Navigation Strip -->
        <div class="viewport-nav-strip">
          ${location.destinations.map(dest => {
            const destLoc = LOCATIONS[dest.id];
            const isLocked = dest.doorLock && !state.unlockedDoors[dest.doorLock];
            return `
              <button class="quick-nav-btn ${isLocked ? 'locked' : ''}" data-dest-id="${dest.id}" data-lock="${dest.doorLock || ''}">
                <span>${isLocked ? '🔒' : '➔'}</span>
                <span>${dest.label || destLoc.name}</span>
                ${isLocked ? '<span style="color: var(--red-primary); font-size: 9px;">[LOCKED]</span>' : ''}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Floating Tactical Map Trigger Button -->
        <button class="nav-toggle-fab" id="btn-open-tactical-map">
          <span>☩</span>
          <span>TACTICAL FACILITY MAP</span>
        </button>
      </div>
    `;

    // Start Environmental Particles for current room
    this.initParticles(location.id);

    // Bind POI click listeners with target focus zoom effect
    location.pois.forEach(poi => {
      const el = document.getElementById(poi.id);
      if (el) {
        el.addEventListener('click', () => {
          soundEngine.playFocusLock();
          
          // Subtle zoom towards the POI before opening
          const bgImg = document.getElementById('scene-bg-img');
          if (bgImg) {
            bgImg.style.transform = `scale(1.05)`;
          }

          setTimeout(() => {
            if (bgImg) bgImg.style.transform = 'scale(1)';
            if (this.onInspectPoi) this.onInspectPoi(poi);
          }, 180);
        });

        el.addEventListener('mouseenter', () => {
          soundEngine.playClick();
        });
      }
    });

    // Bind Quick Navigation buttons with seamless pressure door cycling transit
    const navBtns = this.container.querySelectorAll('.quick-nav-btn');
    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const destId = btn.getAttribute('data-dest-id');
        const lockKey = btn.getAttribute('data-lock');
        
        if (lockKey && !state.unlockedDoors[lockKey]) {
          soundEngine.playWarning();
          if (lockKey === 'hub_main_airlock') {
            alert('ACCESS RESTRICTED: Sector A Primary Airlock is sealed. Inspect the Airlock Portal to engage forensic override.');
          } else if (lockKey === 'hub_research_wing') {
            alert('ACCESS RESTRICTED: Research Wing requires restoring auxiliary power at Breaker Relay B-4 and obtaining Dr. Corri\'s Keycard from Staff Quarters.');
          } else if (lockKey === 'sublevel_gate_unlocked') {
            alert('ACCESS RESTRICTED: Sublevel blast doors are sealed by Dr. Corri\'s Protocol Epsilon. Inspect the blast door to unlatch the hydraulic deadbolts.');
          }
          return;
        }

        this.triggerTransit(destId);
      });
    });

    // Bind Tactical Map button
    const mapBtn = document.getElementById('btn-open-tactical-map');
    if (mapBtn) {
      mapBtn.addEventListener('click', () => {
        soundEngine.playClick();
        if (this.onOpenMap) this.onOpenMap();
      });
    }
  }

  triggerTransit(destId) {
    const destLoc = LOCATIONS[destId] || LOCATIONS.island_exterior;
    soundEngine.playDoorCycle();

    const transitEl = document.createElement('div');
    transitEl.className = 'transit-overlay';
    transitEl.innerHTML = `
      <div class="transit-box">
        <div class="transit-header">// ACCESS CLEARANCE VERIFIED //</div>
        <div class="transit-target-name">TRANSIT TO: ${destLoc.name}</div>
        <div class="transit-status-line">CYCLING BULKHEAD PRESSURE SEALS...</div>
      </div>
    `;

    this.container.appendChild(transitEl);

    setTimeout(() => {
      if (this.onNavigate) this.onNavigate(destId);
    }, 450);

    setTimeout(() => {
      if (transitEl && transitEl.parentNode) {
        transitEl.parentNode.removeChild(transitEl);
      }
    }, 1250);
  }

  initParticles(locationId) {
    if (this.particleAnimId) {
      cancelAnimationFrame(this.particleAnimId);
    }

    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = this.container.clientWidth || window.innerWidth;
    canvas.height = this.container.clientHeight || window.innerHeight;

    this.particles = [];
    const count = locationId === 'island_exterior' ? 45 : (locationId.includes('sublevel') || locationId.includes('experiment') ? 35 : 20);

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: locationId === 'island_exterior' ? -2 - Math.random() * 2 : (Math.random() - 0.5) * 0.4,
        vy: locationId === 'island_exterior' ? 4 + Math.random() * 3 : -0.2 - Math.random() * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        color: locationId === 'island_exterior' ? '#94a3b8' : (locationId.includes('sublevel') || locationId.includes('experiment') ? '#fbbf24' : '#00ff9d')
      });
    }

    let frame = 0;
    const loop = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Island: Draw distant flashing radio beacon light on dome mast
      if (locationId === 'island_exterior') {
        const beaconX = canvas.width * 0.77;
        const beaconY = canvas.height * 0.26;
        const flash = Math.sin(frame * 0.08) > 0.6;
        if (flash) {
          ctx.beginPath();
          ctx.arc(beaconX, beaconY, 6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#ef4444';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Research Lab: Draw moving subtle laser scan line
      if (locationId === 'research_lab') {
        const scanY = (frame * 1.5) % canvas.height;
        ctx.strokeStyle = 'rgba(0, 255, 157, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(canvas.width, scanY);
        ctx.stroke();
      }

      // Render drifting particles
      this.particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      frame++;
      this.particleAnimId = requestAnimationFrame(loop);
    };

    loop();
  }
}
