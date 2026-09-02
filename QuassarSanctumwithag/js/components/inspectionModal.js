/**
 * QUASSAR SANCTUM - Forensic Inspection Modal Component
 * Forensic examination window with telemetry, macro imagery, interactive spectrogram, and archive commits.
 */

import { soundEngine } from '../audio.js';
import { gameState } from '../state.js';
import { EVIDENCE_ITEMS } from '../data/evidence.js';

export class InspectionModal {
  constructor(poi, onClose, onStateChange) {
    this.poi = poi;
    this.onClose = onClose;
    this.onStateChange = onStateChange;
    this.container = null;
    this.spectrogramInterval = null;
  }

  render(parentEl) {
    this.container = document.createElement('div');
    this.container.className = 'inspection-modal-backdrop';

    const state = gameState.getState();
    const isFirstTime = gameState.inspectPoi(this.poi.id);
    if (this.poi.evidenceId) {
      gameState.discoverEvidence(this.poi.evidenceId);
    }
    if (this.poi.archiveId) {
      gameState.unlockArchiveEntry(this.poi.archiveId);
    }

    const telemetryKeys = this.poi.telemetry ? Object.keys(this.poi.telemetry) : [];
    const macroImg = this.poi.macroImage || 'assets/images/island_exterior.jpg';

    this.container.innerHTML = `
      <div class="inspection-window">
        <!-- Inspection Header -->
        <div class="inspection-header">
          <div class="inspection-title-group">
            <span class="inspection-mode-badge">FORENSIC INSPECTION HUD</span>
            <span class="inspection-object-id">${this.poi.title}</span>
            <span class="status-badge ${this.poi.status === 'NOMINAL' ? 'nominal' : (this.poi.status === 'DEGRADED' ? 'degraded' : 'restricted')}">${this.poi.status}</span>
          </div>
          <button class="inspection-close-btn" id="btn-close-inspection">[ESC] CLOSE</button>
        </div>

        <!-- Inspection Body -->
        <div class="inspection-body">
          <!-- Left Visual & Telemetry Column -->
          <div class="inspection-visual-col">
            <div class="inspection-image-viewport">
              <img class="inspection-macro-img" src="${macroImg}" alt="${this.poi.title}" />
              <div class="inspection-image-grid-overlay"></div>
              <div class="inspection-image-reticle-cross" style="top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
            </div>

            <div class="inspection-visual-telemetry">
              <div class="inspection-section-header">TELEMETRIC READOUT</div>
              ${telemetryKeys.map(k => `
                <div class="telemetry-row">
                  <span class="telemetry-label">${k}</span>
                  <span class="telemetry-val">${this.poi.telemetry[k]}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Right Forensic Report Column -->
          <div class="inspection-content-col">
            <div>
              <div class="inspection-section-header">PHYSICAL & OPTICAL OBSERVATION</div>
              <p class="inspection-observation-text">${this.poi.observation}</p>
            </div>

            <div>
              <div class="inspection-section-header">SYSTEM & TELEMETRY LOGS</div>
              <div class="inspection-sysdata-box">
                ${(this.poi.systemData || []).map(log => `
                  <div class="sysdata-entry">› ${log}</div>
                `).join('')}
              </div>
            </div>

            <!-- Interactive Action Box (if applicable) -->
            ${this.poi.actionType ? `
              <div class="inspection-action-box">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 10px; font-weight: 700; color: var(--green-glow);">INTERACTIVE FORENSIC PROTOCOL</span>
                  <span style="font-size: 9px; color: var(--text-dim);">PROTOCOL ID: #PRT-${this.poi.id.toUpperCase()}</span>
                </div>
                
                ${this.poi.actionType === 'analyze_spectrum' ? `
                  <canvas id="spectrogram-canvas" class="spectrum-canvas"></canvas>
                ` : ''}

                <button class="primary" id="btn-poi-action" style="width: 100%; justify-content: center; padding: 10px;">
                  <span>⚡</span>
                  <span>${this.poi.actionLabel || 'EXECUTE PROTOCOL'}</span>
                </button>
                <div id="poi-action-feedback" style="font-size: 11px; color: var(--green-glow); display: none;"></div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Inspection Footer Action Bar -->
        <div class="inspection-footer">
          <div class="inspection-discovery-badge">
            <span class="discovery-icon">◈</span>
            <span>${this.poi.evidenceId ? `EVIDENCE LOGGED: [${this.poi.evidenceId}]` : 'FORENSIC TELEMETRY RECORDED'}</span>
          </div>

          <div class="inspection-btn-group">
            <button class="primary" id="btn-commit-archive">
              <span>🗄</span>
              <span>VIEW IN ARCHIVE</span>
            </button>
            <button id="btn-close-inspection-bot">
              <span>RETURN TO EXPLORATION</span>
            </button>
          </div>
        </div>
      </div>
    `;

    parentEl.appendChild(this.container);

    // Setup close buttons
    const close = () => {
      soundEngine.playClick();
      this.close();
    };
    document.getElementById('btn-close-inspection').addEventListener('click', close);
    document.getElementById('btn-close-inspection-bot').addEventListener('click', close);

    // Setup Archive view button
    document.getElementById('btn-commit-archive').addEventListener('click', () => {
      soundEngine.playDiscovery();
      this.close();
      if (this.onStateChange) this.onStateChange('openArchive', this.poi.archiveId);
    });

    // Setup Interactive POI Action
    if (this.poi.actionType) {
      const actionBtn = document.getElementById('btn-poi-action');
      const feedbackEl = document.getElementById('poi-action-feedback');

      if (this.poi.actionType === 'analyze_spectrum') {
        this.startSpectrogram();
      }

      actionBtn.addEventListener('click', () => {
        soundEngine.playDiscovery();
        this.executePoiAction(feedbackEl, actionBtn);
      });
    }

    // Keyboard ESC to close
    this.escHandler = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', this.escHandler);
  }

  startSpectrogram() {
    const canvas = document.getElementById('spectrogram-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let offset = 0;

    const draw = () => {
      if (!this.container || !canvas) return;
      ctx.fillStyle = '#020406';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#00ff9d';
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x++) {
        const freq1 = Math.sin((x + offset) * 0.05) * 15;
        const freq2 = Math.sin((x * 2 - offset) * 0.08) * 8;
        const noise = (Math.random() - 0.5) * 4;
        const y = canvas.height / 2 + freq1 + freq2 + noise;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw anomaly peak in amber
      ctx.strokeStyle = '#f59e0b';
      ctx.beginPath();
      const peakX = (canvas.width * 0.65 + Math.sin(offset * 0.03) * 10) % canvas.width;
      ctx.moveTo(peakX - 10, canvas.height / 2);
      ctx.lineTo(peakX, 8);
      ctx.lineTo(peakX + 10, canvas.height / 2);
      ctx.stroke();

      offset += 2;
      this.spectrogramInterval = requestAnimationFrame(draw);
    };

    draw();
  }

  executePoiAction(feedbackEl, actionBtn) {
    const action = this.poi.actionType;
    feedbackEl.style.display = 'block';

    if (action === 'unlock_door') {
      gameState.unlockDoor(this.poi.unlockTarget);
      feedbackEl.innerHTML = '✔ OVERRIDE APPLIED: Airlock bulkheads unlocked. Central Hub is now accessible!';
      actionBtn.classList.add('disabled');
      actionBtn.innerText = 'OVERRIDE VERIFIED [DOOR OPEN]';
    } else if (action === 'reset_power') {
      gameState.unlockDoor('hub_power_restored');
      feedbackEl.innerHTML = '✔ BREAKER B-4 RESET: 480V auxiliary circuit energized to Research Wing!';
      actionBtn.classList.add('disabled');
      actionBtn.innerText = 'POWER MATRIX ONLINE';
    } else if (action === 'acquire_keycard') {
      gameState.addItemToInventory({ id: 'item_lab_keycard', name: 'Dr. Corri\'s Research Lab Keycard' });
      feedbackEl.innerHTML = '✔ ITEM ADDED TO INVENTORY: [Dr. Corri\'s Level 2 Research Lab Keycard].';
      actionBtn.classList.add('disabled');
      actionBtn.innerText = 'KEYCARD IN POSSESSION';
    } else if (action === 'unlock_research') {
      const state = gameState.getState();
      const hasPower = state.unlockedDoors['hub_power_restored'];
      const hasKeycard = gameState.hasItem('item_lab_keycard');

      if (!hasPower && !hasKeycard) {
        soundEngine.playWarning();
        feedbackEl.style.color = 'var(--red-primary)';
        feedbackEl.innerHTML = '✖ ACCESS DENIED: Substation Breaker B-4 is tripped AND Dr. Corri\'s Level 2 Keycard is missing!';
      } else if (!hasPower) {
        soundEngine.playWarning();
        feedbackEl.style.color = 'var(--amber-glow)';
        feedbackEl.innerHTML = '✖ ACCESS DENIED: No electrical current. Reset Breaker B-4 at Auxiliary Power Relay!';
      } else if (!hasKeycard) {
        soundEngine.playWarning();
        feedbackEl.style.color = 'var(--amber-glow)';
        feedbackEl.innerHTML = '✖ ACCESS DENIED: Optical biometric scan required. Retrieve Dr. Corri\'s Keycard from Staff Quarters!';
      } else {
        gameState.unlockDoor('hub_research_wing');
        feedbackEl.style.color = 'var(--green-glow)';
        feedbackEl.innerHTML = '✔ CLEARANCE VERIFIED: Research Wing bulkhead unsealed. Enter Level 02 Cleanrooms!';
        actionBtn.classList.add('disabled');
        actionBtn.innerText = 'RESEARCH LAB BULKHEAD OPEN';
      }
    } else if (action === 'analyze_spectrum') {
      feedbackEl.innerHTML = '✔ SPECTRAL RESULT: Resonance verified. Bio-silicate chitin lattice identified in specimen!';
      actionBtn.innerText = 'RAMAN SPECTRA LOGGED';
    } else if (action === 'record_crack') {
      gameState.increaseEntropy(10);
      feedbackEl.innerHTML = '✔ ANOMALY COMMITTED: Incident trajectory updated. The First Crack registered across all agent feeds!';
      actionBtn.innerText = 'ANOMALY LOG RECORDED';
    } else if (action === 'unlock_sublevel_gate') {
      gameState.unlockDoor('sublevel_gate_unlocked');
      feedbackEl.innerHTML = '✔ DR. CORRI TOKEN ACCEPTED: Sublevel blast door unlatched! Sublevel Logistics Corridor is accessible.';
      actionBtn.classList.add('disabled');
      actionBtn.innerText = 'SUBLEVEL BLAST DOOR UNLATCHED';
    } else if (action === 'sample_scale') {
      gameState.discoverEvidence('EVD-006');
      feedbackEl.innerHTML = '✔ SPECIMEN RETRIEVED: [EVD-006: Sublevel Bio-Silicate Scale Traces] added to Evidence Matrix.';
      actionBtn.classList.add('disabled');
      actionBtn.innerText = 'SCALE SAMPLE ACQUIRED';
    } else if (action === 'recover_corri_seal') {
      gameState.discoverEvidence('EVD-007');
      gameState.unlockArchiveEntry('PER-03');
      feedbackEl.innerHTML = '✔ RECORD AUTHENTICATED: [EVD-007: Dr. Corri\'s Death Certificate & Seal Record] retrieved.';
      actionBtn.classList.add('disabled');
      actionBtn.innerText = 'DR. CORRI\'S RECORD LOGGED';
    } else if (action === 'climax_decision') {
      this.close();
      if (this.onStateChange) this.onStateChange('openClimax');
      return;
    } else {
      feedbackEl.innerHTML = '✔ PROTOCOL EXECUTED SUCCESSFULLY.';
    }

    if (this.onStateChange) this.onStateChange('poiActionExecuted', this.poi);
  }

  close() {
    if (this.spectrogramInterval) {
      cancelAnimationFrame(this.spectrogramInterval);
    }
    window.removeEventListener('keydown', this.escHandler);
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    if (this.onClose) this.onClose();
  }
}
