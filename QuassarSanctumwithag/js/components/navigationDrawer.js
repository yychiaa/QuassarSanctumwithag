/**
 * QUASSAR SANCTUM - Tactical Facility Map & Navigation Drawer
 * Interactive multi-level schematic with instant fast-travel node selection.
 */

import { LOCATIONS } from '../data/locations.js';
import { soundEngine } from '../audio.js';
import { gameState } from '../state.js';

export class NavigationDrawer {
  constructor(onSelectLocation, onClose) {
    this.onSelectLocation = onSelectLocation;
    this.onClose = onClose;
    this.container = null;
  }

  render(parentEl) {
    this.container = document.createElement('div');
    this.container.className = 'sync-modal-backdrop';
    parentEl.appendChild(this.container);

    this.update();
  }

  update() {
    if (!this.container) return;
    const state = gameState.getState();
    const currentLocId = state.currentLocationId;
    const allLocations = Object.values(LOCATIONS);

    this.container.innerHTML = `
      <div class="sync-window" style="max-width: 980px; height: 82vh; border-color: var(--cyan-border);">
        <!-- Header -->
        <div class="sync-header">
          <div class="sync-title-group">
            <div class="facility-logo-icon" style="background: var(--cyan-primary); box-shadow: 0 0 10px var(--cyan-primary);"></div>
            <div class="sync-title">TACTICAL FACILITY SCHEMATIC // 7 SECTOR NODES</div>
          </div>
          <button class="inspection-close-btn" id="btn-close-map">[ESC] CLOSE</button>
        </div>

        <!-- Main Content -->
        <div style="flex: 1; padding: 28px 36px; overflow-y: auto; display: flex; flex-direction: column; gap: 18px; background: #06090e;">
          <div style="font-size: 11px; color: var(--text-dim); line-height: 1.6;">
            Select any unlocked sector node to fast-dispatch Lead Investigator ${state.playerName.toUpperCase()}. Sectors with active containment locks require prerequisite forensic tokens.
          </div>

          <!-- Sector Grid -->
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
            ${allLocations.map(loc => {
              const isCurrent = loc.id === currentLocId;
              const isDiscovered = state.discoveredLocations.includes(loc.id);
              let isLocked = false;
              let lockReason = '';

              if (loc.id === 'facility_hub' && !state.unlockedDoors['hub_main_airlock']) {
                isLocked = true;
                lockReason = 'Requires Airlock Forensic Override';
              } else if (loc.id === 'research_lab' && !state.unlockedDoors['hub_research_wing']) {
                isLocked = true;
                lockReason = 'Requires Breaker B-4 + Dr. Corri\'s Keycard';
              } else if (loc.id === 'sublevel_interior' && !state.unlockedDoors['sublevel_gate_unlocked']) {
                isLocked = true;
                lockReason = 'Requires Dr. Corri\'s Sublevel Token';
              } else if (loc.id === 'experiment_chamber' && !state.unlockedDoors['sublevel_gate_unlocked']) {
                isLocked = true;
                lockReason = 'Requires Sublevel Access Clearance';
              }

              return `
                <div class="agent-card ${isCurrent ? 'active' : ''}" data-loc-id="${loc.id}" data-locked="${isLocked}" style="cursor: pointer; position: relative;">
                  <div class="agent-card-header">
                    <span class="agent-id-tag" style="color: ${isCurrent ? 'var(--green-glow)' : 'var(--cyan-primary)'};">${loc.code}</span>
                    <span class="status-badge ${isCurrent ? 'nominal' : (isLocked ? 'restricted' : 'nominal')}">
                      ${isCurrent ? 'CURRENT POSITION' : (isLocked ? 'LOCKED' : 'ACCESSIBLE')}
                    </span>
                  </div>
                  <div class="agent-name" style="font-size: 13px; margin-top: 6px;">${loc.name}</div>
                  <div class="agent-role" style="color: var(--text-muted); margin-top: 2px;">${loc.level}</div>
                  
                  <div style="margin-top: 10px; font-size: 10px; color: var(--text-dim);">
                    ${isLocked ? `<span style="color: var(--amber-glow);">🔒 ${lockReason}</span>` : `<span style="color: var(--cyan-primary);">✔ ${loc.pois.length} Forensic Hotspots Active</span>`}
                  </div>

                  ${isCurrent ? `
                    <div style="position: absolute; right: 14px; bottom: 14px; font-size: 14px; color: var(--green-glow);">● ACTIVE</div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    // Bind cards
    this.container.querySelectorAll('.agent-card').forEach(card => {
      card.addEventListener('click', () => {
        const locId = card.getAttribute('data-loc-id');
        const locked = card.getAttribute('data-locked') === 'true';

        if (locked) {
          soundEngine.playWarning();
          alert('ACCESS RESTRICTED: Complete the prerequisite forensic steps before entering this sector.');
          return;
        }

        soundEngine.playDiscovery();
        this.close();
        if (this.onSelectLocation) this.onSelectLocation(locId);
      });
    });

    // Close
    document.getElementById('btn-close-map').addEventListener('click', () => {
      soundEngine.playClick();
      this.close();
    });

    // ESC
    this.escHandler = (e) => {
      if (e.key === 'Escape') {
        soundEngine.playClick();
        this.close();
      }
    };
    window.addEventListener('keydown', this.escHandler);
  }

  close() {
    window.removeEventListener('keydown', this.escHandler);
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    if (this.onClose) this.onClose();
  }
}
