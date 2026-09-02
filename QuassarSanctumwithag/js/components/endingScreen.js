/**
 * QUASSAR SANCTUM - Climax Decision & Ending Resolution Component
 * Handles Route X / Route Y choice and presents the comprehensive investigation debriefing.
 */

import { soundEngine } from '../audio.js';
import { gameState } from '../state.js';
import { ARCHIVE_ENTRIES } from '../data/archive.js';
import { EVIDENCE_ITEMS } from '../data/evidence.js';

export class EndingScreen {
  constructor(onRestart, onOpenArchive) {
    this.onRestart = onRestart;
    this.onOpenArchive = onOpenArchive;
    this.container = null;
    this.chosenRoute = null; // 'X' | 'Y'
    this.phase = 'choice'; // 'choice' | 'summary'
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
    const totalArchive = Object.keys(ARCHIVE_ENTRIES).length;
    const unlockedArchive = state.unlockedArchiveIds.size;
    const totalEvidence = Object.keys(EVIDENCE_ITEMS).length;
    const discoveredEvidence = state.discoveredEvidence.size;

    if (this.phase === 'choice') {
      this.container.innerHTML = `
        <div class="sync-window" style="max-width: 960px; height: auto; max-height: 85vh; border-color: var(--amber-border);">
          <!-- Header -->
          <div class="sync-header">
            <div class="sync-title-group">
              <div class="facility-logo-icon" style="background: var(--amber-glow); box-shadow: 0 0 12px var(--amber-glow);"></div>
              <div class="sync-title">CLIMAX RESOLUTION // FINAL INVESTIGATOR PROTOCOL</div>
            </div>
            <span class="status-badge" style="background: var(--amber-subtle); color: var(--amber-glow);">CRITICAL ACTION</span>
          </div>

          <!-- Choice Body -->
          <div style="padding: 32px 40px; display: flex; flex-direction: column; gap: 24px; background: #06090e; overflow-y: auto;">
            <div style="font-size: 13px; line-height: 1.8; color: var(--text-main);">
              <p style="margin-bottom: 12px;">
                You stand at the gantry console of the XP Experiment Chamber. Dr. Corri\'s sacrifice on 17 October 3012 has held KHYRA in stasis, but the sub-harmonic resonance requires an immediate operational protocol to conclude the investigation.
              </p>
              <p style="color: var(--text-muted); font-size: 11px;">
                As Lead Investigator Agent 01, choose the final resolution for Quassar Observatory:
              </p>
            </div>

            <!-- Route Cards Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <!-- Route X -->
              <div class="agent-card" id="card-route-x" style="cursor: pointer; border-color: var(--cyan-border); padding: 20px; transition: all 0.2s ease;">
                <div class="agent-card-header">
                  <span class="agent-id-tag" style="color: var(--cyan-primary);">ROUTE X // PROTOCOL ALPHA</span>
                  <span class="status-badge" style="background: var(--cyan-subtle); color: var(--cyan-primary);">QUARANTINE</span>
                </div>
                <div class="agent-name" style="font-size: 15px; margin-top: 8px; color: #fff;">TOTAL SUB-OCEANIC QUARANTINE</div>
                <div style="font-size: 11px; line-height: 1.7; color: var(--text-muted); margin-top: 10px;">
                  Permanently seal the subterranean basalt void. Engage sub-harmonic resonance dampeners to freeze bio-silicate propagation and transmit the final incident dossier to Bureau Command.
                </div>
                <button class="primary" id="btn-select-route-x" style="width: 100%; justify-content: center; margin-top: 16px;">
                  ENACT PROTOCOL ALPHA (ROUTE X)
                </button>
              </div>

              <!-- Route Y -->
              <div class="agent-card" id="card-route-y" style="cursor: pointer; border-color: var(--green-border); padding: 20px; transition: all 0.2s ease;">
                <div class="agent-card-header">
                  <span class="agent-id-tag" style="color: var(--green-glow);">ROUTE Y // PROTOCOL OMEGA</span>
                  <span class="status-badge nominal">EXTRACTION</span>
                </div>
                <div class="agent-name" style="font-size: 15px; margin-top: 8px; color: #fff;">ARCHIVAL EXTRACTION & MEMORIAL</div>
                <div style="font-size: 11px; line-height: 1.7; color: var(--text-muted); margin-top: 10px;">
                  Extract Dr. Corri\'s uncorrupted ACF-01 crystalline telemetry and KHYRA venom neutralization formulas into the Bureau Archive, securing scientific preservation while maintaining physical quarantine.
                </div>
                <button class="primary" id="btn-select-route-y" style="width: 100%; justify-content: center; margin-top: 16px; border-color: var(--green-glow); color: var(--green-glow);">
                  ENACT PROTOCOL OMEGA (ROUTE Y)
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      document.getElementById('btn-select-route-x').addEventListener('click', () => {
        soundEngine.playDiscovery();
        this.chosenRoute = 'X';
        this.phase = 'summary';
        this.update();
      });

      document.getElementById('btn-select-route-y').addEventListener('click', () => {
        soundEngine.playDiscovery();
        this.chosenRoute = 'Y';
        this.phase = 'summary';
        this.update();
      });
    } else {
      // Phase: Investigation Debriefing Summary
      const isRouteX = this.chosenRoute === 'X';
      this.container.innerHTML = `
        <div class="sync-window" style="max-width: 1000px; height: auto; max-height: 88vh; border-color: ${isRouteX ? 'var(--cyan-border)' : 'var(--green-border)'};">
          <!-- Header -->
          <div class="sync-header">
            <div class="sync-title-group">
              <div class="facility-logo-icon" style="background: ${isRouteX ? 'var(--cyan-primary)' : 'var(--green-glow)'}; box-shadow: 0 0 12px ${isRouteX ? 'var(--cyan-primary)' : 'var(--green-glow)'};"></div>
              <div class="sync-title">INVESTIGATION CONCLUDED // FORENSIC CASE FILE #3012-QS-088</div>
            </div>
            <span class="status-badge nominal">CASE CLOSED</span>
          </div>

          <!-- Summary Body -->
          <div style="padding: 32px 40px; display: flex; flex-direction: column; gap: 24px; background: #06090e; overflow-y: auto;">
            <div class="archive-record-header" style="border-bottom: 1px solid var(--border-strong); padding-bottom: 16px;">
              <div style="font-size: 10px; color: ${isRouteX ? 'var(--cyan-primary)' : 'var(--green-glow)'}; letter-spacing: 0.15em; font-weight: 700;">
                FINAL RESOLUTION: ${isRouteX ? 'ROUTE X — PROTOCOL ALPHA (QUARANTINE)' : 'ROUTE Y — PROTOCOL OMEGA (PRESERVATION)'}
              </div>
              <div style="font-size: 24px; font-weight: 700; color: #fff; margin-top: 4px;">
                ${isRouteX ? 'TOTAL SUB-OCEANIC QUARANTINE SECURED' : 'ARCHIVAL PRESERVATION & SCIENTIFIC MEMORIAL'}
              </div>
              <div style="font-size: 12px; color: var(--text-dim); margin-top: 6px;">
                INVESTIGATION EXECUTED BY LEAD AGENT 01: <strong>${state.playerName.toUpperCase()}</strong> (WITH AGENTS ADITYA & KAYLANI)
              </div>
            </div>

            <!-- Epilogue Narrative -->
            <div style="font-size: 13px; line-height: 1.8; color: var(--text-main); background: #080d16; border: 1px solid var(--border-subtle); padding: 20px; border-left: 4px solid ${isRouteX ? 'var(--cyan-primary)' : 'var(--green-glow)'};">
              ${isRouteX ? `
                <p style="margin-bottom: 10px;">
                  The subterranean acoustic dampeners engage with a deep, reverberating pulse through the basalt bedrock. The 0.04 Hz sub-harmonic vibrations fall silent. Specimen ACF-01 and the biological matrices of KHYRA are permanently frozen in cold stasis within the subterranean void.
                </p>
                <p>
                  Dr. Corri\'s sacrifice on 17 October 3012 is commemorated in the final Bureau dossier. Quassar Observatory remains an unyielding concrete monument on the stormy sea, its secrets safely sealed beneath the ocean floor.
                </p>
              ` : `
                <p style="margin-bottom: 10px;">
                  The high-density telemetry transfer completes with a crisp optical chime. Dr. Corri\'s uncorrupted Raman spectroscopy records for ACF-01, Halionite synthesis data, and KHYRA venom neutralization profiles are securely uploaded into the Bureau\'s central vault.
                </p>
                <p>
                  While the physical facility remains sealed under strict quarantine, Dr. Corri\'s scientific breakthroughs survive to illuminate future generations of physicists and xenobiologists.
                </p>
              `}
            </div>

            <!-- Investigation Statistics Grid -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
              <div class="menu-stat-box">
                <div class="menu-stat-label">EVIDENCE RECOVERED</div>
                <div class="menu-stat-val" style="color: var(--green-glow);">${discoveredEvidence} / ${totalEvidence}</div>
              </div>
              <div class="menu-stat-box">
                <div class="menu-stat-label">ARCHIVE RECONSTRUCTED</div>
                <div class="menu-stat-val" style="color: var(--cyan-primary);">${unlockedArchive} / ${totalArchive}</div>
              </div>
              <div class="menu-stat-box">
                <div class="menu-stat-label">FACILITY FOUNDATION</div>
                <div class="menu-stat-val">3010.04.09</div>
              </div>
              <div class="menu-stat-box">
                <div class="menu-stat-label">INCIDENT DATE</div>
                <div class="menu-stat-val" style="color: var(--amber-glow);">3012.10.17</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; justify-content: flex-end; gap: 14px; margin-top: 8px;">
              <button class="primary" id="btn-end-archive">
                <span>🗄</span>
                <span>RE-EXAMINE COMPLETE ARCHIVE DATABASE</span>
              </button>
              <button id="btn-end-menu">
                <span>↺</span>
                <span>RETURN TO MAIN MENU</span>
              </button>
            </div>
          </div>
        </div>
      `;

      document.getElementById('btn-end-archive').addEventListener('click', () => {
        soundEngine.playClick();
        if (this.onOpenArchive) this.onOpenArchive();
      });

      document.getElementById('btn-end-menu').addEventListener('click', () => {
        soundEngine.playDiscovery();
        this.close();
        if (this.onRestart) this.onRestart();
      });
    }
  }

  close() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
