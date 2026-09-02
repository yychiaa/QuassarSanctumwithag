/**
 * QUASSAR SANCTUM - Main Menu Component
 * Diegetic Main Menu interface with 3010-3012 canon context.
 */

import { soundEngine } from '../audio.js';
import { gameState } from '../state.js';

export class MainMenu {
  constructor(onStart, onOpenArchive) {
    this.onStart = onStart;
    this.onOpenArchive = onOpenArchive;
    this.container = null;
  }

  render(parentEl) {
    this.container = document.createElement('div');
    this.container.className = 'menu-container';
    this.container.innerHTML = `
      <div class="menu-brand-header">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
          <div class="facility-logo-icon" style="width: 20px; height: 20px;"></div>
          <span style="font-size: 11px; letter-spacing: 0.2em; color: var(--green-glow);">QUASSAR OBSERVATORY (EST. 3010) // SECTOR 4</span>
        </div>
        <div class="menu-title">QUASSAR SANCTUM</div>
        <div class="menu-subtitle">// FORENSIC INVESTIGATION TERMINAL — INCIDENT 3012.10.17 //</div>
      </div>

      <div class="menu-content-grid">
        <div class="menu-nav-list">
          <button class="menu-btn primary" id="menu-btn-start">
            <span class="menu-idx">[01]</span>
            <span>BEGIN INVESTIGATION</span>
          </button>
          <button class="menu-btn" id="menu-btn-archive">
            <span class="menu-idx">[02]</span>
            <span>FACILITY ARCHIVE DATABASE</span>
          </button>
          <button class="menu-btn" id="menu-btn-diagnostics">
            <span class="menu-idx">[03]</span>
            <span>SYSTEM DIAGNOSTICS & TELEMETRY</span>
          </button>
          <button class="menu-btn" id="menu-btn-audio">
            <span class="menu-idx">[04]</span>
            <span id="menu-audio-text">SYNTHESIZER SOUND: ON</span>
          </button>
        </div>

        <div class="menu-info-panel">
          <div>
            <div class="menu-info-header">FORENSIC CASE FILE // 3012-QS-088</div>
            <div class="menu-info-body">
              <p style="margin-bottom: 14px;">
                On <strong>17 October 3012</strong>, the Quassar Deep-Matrix Observatory (founded 3010) ceased external communications following an acoustic resonance rupture and deliberate subterranean power shunt by Principal Investigator <strong>Dr. Corri</strong>.
              </p>
              <p style="margin-bottom: 14px;">
                A three-agent forensic unit (Lead Agent 01, Aditya, Kaylani) has deployed to the island perimeter. Your mandate is to enter the facility, inspect degraded equipment, analyze Specimen <strong>ACF 01</strong>, and verify Dr. Corri\'s containment seal on Project <strong>KHYRA</strong>.
              </p>
              <p style="color: var(--amber-glow); font-size: 11px;">
                DIRECTIVE: Maintain forensic objectivity. Reconstruct the evidence to enact the final resolution protocol.
              </p>
            </div>
          </div>

          <div class="menu-info-stats">
            <div class="menu-stat-box">
              <div class="menu-stat-label">FACILITY FOUNDATION</div>
              <div class="menu-stat-val">3010.04.09</div>
            </div>
            <div class="menu-stat-box">
              <div class="menu-stat-label">INCIDENT DATE</div>
              <div class="menu-stat-val" style="color: var(--amber-glow);">3012.10.17</div>
            </div>
            <div class="menu-stat-box">
              <div class="menu-stat-label">INVESTIGATION UNIT</div>
              <div class="menu-stat-val" style="color: var(--cyan-primary);">3 AGENTS</div>
            </div>
          </div>
        </div>
      </div>
    `;

    parentEl.appendChild(this.container);

    document.getElementById('menu-btn-start').addEventListener('click', () => {
      soundEngine.playDiscovery();
      this.close();
      if (this.onStart) this.onStart();
    });

    document.getElementById('menu-btn-archive').addEventListener('click', () => {
      soundEngine.playClick();
      if (this.onOpenArchive) this.onOpenArchive();
    });

    document.getElementById('menu-btn-diagnostics').addEventListener('click', () => {
      soundEngine.playScan();
      alert('SYSTEM DIAGNOSTIC REPORT (3012):\n\n- Sub-Sea Umbilical: SEVERED 17 OCT 3012\n- Level 01 Hub: EMERGENCY CURRENT\n- Level 02 Research Lab: ACF-01 ANOMALY RECORDED\n- Level -01 Sublevel Gate: DR. CORRI PROTOCOL EPSILON ENGAGED\n\nProceed to Investigator Roster setup.');
    });

    const audioBtn = document.getElementById('menu-btn-audio');
    const audioText = document.getElementById('menu-audio-text');
    audioBtn.addEventListener('click', () => {
      soundEngine.init();
      const muted = soundEngine.toggleMute();
      audioText.innerText = `SYNTHESIZER SOUND: ${muted ? 'MUTED' : 'ON'}`;
      soundEngine.playClick();
    });
  }

  close() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
