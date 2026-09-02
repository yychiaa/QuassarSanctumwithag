/**
 * QUASSAR SANCTUM - Agent Setup Component
 * Configure Agent 01 call sign and review the 3-agent forensic team roster.
 */

import { soundEngine } from '../audio.js';
import { gameState } from '../state.js';

export class AgentSetup {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.container = null;
  }

  render(parentEl) {
    this.container = document.createElement('div');
    this.container.className = 'boot-container';
    this.container.innerHTML = `
      <div class="boot-terminal-box" style="max-width: 740px;">
        <div class="boot-header">
          <span>// INVESTIGATOR ROSTER INITIALIZATION //</span>
          <span style="color: var(--cyan-primary);">UNIT IDENTIFIER: QS-INVEST-UNIT-4</span>
        </div>

        <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 24px;">
          Define Lead Investigator callsign for Field Unit synchronization. This investigation operates as a three-agent forensic team under Bureau protocol.
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 28px;">
          <!-- Agent 01 (Player) -->
          <div style="background: #080d16; border: 1px solid var(--green-border); padding: 18px; border-left: 4px solid var(--green-glow);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 10px; font-weight: 700; color: var(--green-glow); letter-spacing: 0.1em;">AGENT 01 — LEAD FORENSIC INVESTIGATOR (YOU)</span>
              <span class="status-badge nominal">PRIMARY USER</span>
            </div>
            <div style="margin-top: 6px;">
              <label style="font-size: 9px; color: var(--text-dim); text-transform: uppercase; display: block; margin-bottom: 4px;">AGENT 01 CALLSIGN / NAME:</label>
              <input type="text" id="agent-name-input" value="" maxlength="24" placeholder="Enter your callsign / name…" autocomplete="off" spellcheck="false" />
            </div>
          </div>

          <!-- Agent 02 (Aditya) -->
          <div style="background: #080d16; border: 1px solid var(--border-subtle); padding: 14px 18px; border-left: 4px solid var(--cyan-primary); opacity: 0.9;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 10px; font-weight: 700; color: var(--cyan-primary); letter-spacing: 0.1em;">AGENT 02 — SYSTEMS ARCHITECTURE & STRUCTURAL FORENSICS</span>
              <span class="status-badge" style="background: var(--cyan-subtle); color: var(--cyan-primary);">REMOTE SYNC</span>
            </div>
            <div style="font-size: 14px; font-weight: 700; color: #fff; margin-top: 4px;">ADITYA</div>
            <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">Assigned to Perimeter Sub-Grid & Marine High-Voltage Ingress</div>
          </div>

          <!-- Agent 03 (Kaylani) -->
          <div style="background: #080d16; border: 1px solid var(--border-subtle); padding: 14px 18px; border-left: 4px solid var(--amber-glow); opacity: 0.9;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 10px; font-weight: 700; color: var(--amber-glow); letter-spacing: 0.1em;">AGENT 03 — XENOBIOLOGY & SPECTROGRAPHIC FORENSICS</span>
              <span class="status-badge" style="background: var(--amber-subtle); color: var(--amber-glow);">REMOTE SYNC</span>
            </div>
            <div style="font-size: 14px; font-weight: 700; color: #fff; margin-top: 4px;">KAYLANI</div>
            <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">Assigned to Ventilation Scrubbers, Bio-Acoustic Array & Atmospheric Filters</div>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 14px;">
          <button class="primary" id="btn-confirm-agent" style="padding: 12px 24px;">
            <span>CONFIRM ROSTER & DROP AT ISLAND BASTION</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;

    parentEl.appendChild(this.container);

    const input = document.getElementById('agent-name-input');
    input.focus();
    input.select();

    const submit = () => {
      const name = input.value.trim() || 'AGENT 01';
      gameState.setPlayerName(name);
      soundEngine.playDiscovery();
      this.close();
      if (this.onComplete) this.onComplete();
    };

    document.getElementById('btn-confirm-agent').addEventListener('click', submit);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submit();
    });
  }

  close() {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
