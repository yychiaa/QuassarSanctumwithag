/**
 * QUASSAR SANCTUM - Evidence Matrix Modal Component
 * Forensic evidence catalog tracking collected samples, notes, and analysis.
 */

import { EVIDENCE_ITEMS } from '../data/evidence.js';
import { soundEngine } from '../audio.js';
import { gameState } from '../state.js';

export class EvidenceMatrixModal {
  constructor(onClose) {
    this.onClose = onClose;
    this.container = null;
    this.selectedEvidenceId = 'EVD-000';
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
    const discoveredSet = state.discoveredEvidence;
    const allEvidence = Object.values(EVIDENCE_ITEMS);
    const activeEvd = EVIDENCE_ITEMS[this.selectedEvidenceId];
    const isDiscovered = activeEvd && discoveredSet.has(activeEvd.id);

    this.container.innerHTML = `
      <div class="sync-window" style="border-color: var(--green-border); max-width: 1100px; height: 82vh;">
        <!-- Header -->
        <div class="sync-header">
          <div class="sync-title-group">
            <div class="facility-logo-icon"></div>
            <div class="sync-title">FORENSIC EVIDENCE MATRIX // SPECIMEN CATALOG</div>
            <span class="archive-stats-tag" style="background: var(--green-subtle); color: var(--green-glow); border-color: var(--green-border);">
              ${discoveredSet.size} / ${allEvidence.length} SPECIMENS ACQUIRED
            </span>
          </div>
          <button class="inspection-close-btn" id="btn-close-evidence">[ESC] CLOSE</button>
        </div>

        <!-- Layout -->
        <div class="sync-main-grid">
          <!-- Col 1: Evidence List -->
          <div class="agent-team-col" style="overflow-y: auto;">
            <div style="font-size: 10px; font-weight: 700; color: var(--text-dim); letter-spacing: 0.15em; text-transform: uppercase;">
              RETRIEVED SPECIMENS (${discoveredSet.size}/${allEvidence.length})
            </div>

            ${allEvidence.map(evd => {
              const found = discoveredSet.has(evd.id);
              const isSelected = evd.id === this.selectedEvidenceId;
              return `
                <div class="agent-card ${isSelected ? 'active' : ''}" data-evd-id="${evd.id}" style="cursor: pointer; ${!found ? 'opacity: 0.45;' : ''}">
                  <div class="agent-card-header">
                    <span class="agent-id-tag" style="color: ${found ? 'var(--green-glow)' : 'var(--text-dim)'};">${evd.id}</span>
                    <span class="status-badge ${found ? 'nominal' : 'offline'}">${found ? evd.category : 'UNDISCOVERED'}</span>
                  </div>
                  <div class="agent-name" style="font-size: 12px; margin-top: 4px;">${found ? evd.title : '[REDACTED SPECIMEN]'}</div>
                  <div class="agent-role">${found ? evd.locationFound : 'LOCATION UNVERIFIED'}</div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Col 2: Evidence Dossier -->
          <div class="sync-feed-col">
            ${activeEvd ? (isDiscovered ? `
              <div class="archive-record-header" style="border-bottom: 1px solid var(--border-strong); padding-bottom: 16px; margin-bottom: 20px;">
                <div style="font-size: 10px; color: var(--green-glow); letter-spacing: 0.15em; font-weight: 700;">SPECIMEN DOSSIER // ${activeEvd.id}</div>
                <div style="font-size: 22px; font-weight: 700; color: #fff; margin-top: 4px;">${activeEvd.title}</div>
                <div style="display: flex; gap: 20px; font-size: 11px; color: var(--text-dim); margin-top: 10px;">
                  <span>CATEGORY: <strong style="color: var(--cyan-primary);">${activeEvd.category}</strong></span>
                  <span>INGEST POINT: <strong style="color: var(--text-main);">${activeEvd.locationFound}</strong></span>
                  <span>STATUS: <strong style="color: var(--green-glow);">AUTHENTICATED</strong></span>
                </div>
              </div>

              <div style="font-size: 13px; line-height: 1.8; color: var(--text-main); margin-bottom: 24px;">
                <div style="font-size: 10px; font-weight: 700; color: var(--cyan-primary); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">SPECIMEN ABSTRACT:</div>
                <p>${activeEvd.summary}</p>
              </div>

              <div style="background: #06090f; border: 1px solid var(--green-border); border-left: 4px solid var(--green-glow); padding: 18px; font-size: 12px; line-height: 1.7; color: var(--text-muted);">
                <div style="font-size: 10px; font-weight: 700; color: var(--green-glow); letter-spacing: 0.1em; margin-bottom: 6px;">FORENSIC INVESTIGATOR NOTES:</div>
                ${activeEvd.forensicNotes}
              </div>
            ` : `
              <div class="archive-detail-empty">
                <div style="font-size: 32px; color: var(--text-dim); margin-bottom: 12px;">🔒</div>
                <div style="font-size: 14px; font-weight: 700; color: var(--text-muted);">SPECIMEN NOT YET RETRIEVED</div>
                <div style="font-size: 11px; color: var(--text-dim); margin-top: 8px;">Explore facility locations and inspect points of interest to acquire physical samples.</div>
              </div>
            `) : `
              <div class="archive-detail-empty">SELECT EVIDENCE ITEM TO VIEW FORENSIC SPECIFICATIONS</div>
            `}
          </div>
        </div>
      </div>
    `;

    // Bind card clicks
    this.container.querySelectorAll('.agent-card').forEach(card => {
      card.addEventListener('click', () => {
        soundEngine.playClick();
        this.selectedEvidenceId = card.getAttribute('data-evd-id');
        this.update();
      });
    });

    // Bind close
    document.getElementById('btn-close-evidence').addEventListener('click', () => {
      soundEngine.playClick();
      this.close();
    });

    // ESC handler
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
