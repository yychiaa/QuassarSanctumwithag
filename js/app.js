/**
 * QUASSAR SANCTUM - Main Game Orchestrator Application
 * Presentation & Immersion Pass: Radio toast triggers, transit orchestration, room ambiances.
 */

import { gameState } from './state.js';
import { soundEngine } from './audio.js';
import { LOCATIONS } from './data/locations.js';
import { BootSequence } from './components/bootSequence.js';
import { MainMenu } from './components/mainMenu.js';
import { AgentSetup } from './components/agentSetup.js';
import { SceneRenderer } from './components/sceneRenderer.js';
import { InspectionModal } from './components/inspectionModal.js';
import { ArchiveView } from './components/archiveView.js';
import { AgentSyncModal } from './components/agentSyncModal.js';
import { EvidenceMatrixModal } from './components/evidenceMatrix.js';
import { NavigationDrawer } from './components/navigationDrawer.js';
import { EndingScreen } from './components/endingScreen.js';
import { FieldTerminal } from './components/fieldTerminal.js';

export class QuassarSanctumApp {
  constructor() {
    this.rootEl = document.getElementById('app-root');
    this.sceneRenderer = null;
    this.activeModal = null;
    this.tickerMessages = [
      '// TELEMETRY: Sub-oceanic array clock: 3012.10.28. Baseline noise: 3.2 micro-g.',
      '// ADVISORY: ARC sub-acoustic harmonic active. Inspect Dr. Corri\'s cleanroom in Level 02.',
      '// DIRECTIVE: Verify Dr. Corri\'s Protocol Epsilon seal on Project KHYRA in Sublevel -01.',
      '// STATUS: 17 Oct 3012 containment failure under active forensic investigation.'
    ];
    this.tickerIdx = 0;
  }

  init() {
    this.renderBaseHUD();
    this.bindGlobalEvents();

    // Subscribe to state updates
    gameState.subscribe((state, changeKey, payload) => {
      this.handleStateUpdate(state, changeKey, payload);
    });

    // Start with Cinematic Boot Sequence
    this.startBoot();

    // Start real-time ticker loop
    setInterval(() => this.updateTicker(), 6000);
  }

  renderBaseHUD() {
    this.rootEl.innerHTML = `
      <!-- Top Forensic Header -->
      <header class="hud-header" id="hud-header">
        <div class="hud-header-left">
          <div class="facility-brand" id="hud-brand" style="cursor: pointer;">
            <div class="facility-logo-icon"></div>
            <div>
              <div class="facility-title">QUASSAR SANCTUM</div>
              <div class="facility-sub">FORENSIC OBSERVATORY // EST. 3010.04.09</div>
            </div>
          </div>

          <div class="header-divider"></div>

          <div class="hud-location-tag">
            <span class="hud-label">CURRENT LOCATION</span>
            <span class="hud-value" id="hud-loc-val">ISLAND PERIMETER</span>
          </div>

          <div class="header-divider"></div>

          <div class="hud-location-tag">
            <span class="hud-label">LEAD INVESTIGATOR</span>
            <span class="hud-value" id="hud-agent-val" style="color: var(--green-glow);">AGENT 01</span>
          </div>
        </div>

        <div class="hud-header-center">
          <div class="telemetry-item">
            <span class="telemetry-indicator active" id="hud-sensor-indicator"></span>
            <span style="font-size: 10px; color: var(--text-dim);">SENSOR MATRIX:</span>
            <span id="hud-sensor-val" style="color: var(--green-glow); font-weight: 600;">ACTIVE</span>
          </div>

          <div class="telemetry-item">
            <span class="telemetry-indicator warning" id="hud-entropy-indicator"></span>
            <span style="font-size: 10px; color: var(--text-dim);">FACILITY ENTROPY:</span>
            <span id="hud-entropy-val" style="color: var(--amber-glow); font-weight: 600;">12% [DEGRADED]</span>
          </div>
        </div>

        <div class="hud-header-right">
          <button class="hud-btn" id="btn-hud-map">
            <span>☩</span>
            <span>MAP</span>
          </button>

          <button class="hud-btn" id="btn-hud-evidence">
            <span>◈</span>
            <span>EVIDENCE</span>
          </button>

          <button class="hud-btn" id="btn-hud-archive">
            <span>🗄</span>
            <span>ARCHIVE</span>
          </button>

          <button class="hud-btn active" id="btn-hud-sync">
            <span>📻</span>
            <span>AGENT SYNC</span>
            <span class="sync-badge-count" id="hud-sync-badge">2</span>
          </button>

          <button class="hud-btn" id="btn-hud-audio" title="Toggle Sound Synth">
            <span id="hud-audio-icon">🔊</span>
          </button>

          <button class="hud-btn" id="btn-hud-terminal" title="Open Field Terminal">
            <span>⎙</span>
            <span>TERMINAL</span>
          </button>
        </div>
      </header>

      <!-- Main Graphical Viewport Container -->
      <main id="viewport-container" style="flex: 1; position: relative; overflow: hidden; display: flex;"></main>

      <!-- Bottom HUD & Command Bar -->
      <footer class="hud-footer">
        <div class="hud-footer-left">
          <span class="terminal-prompt-prefix">QS-TELEMETRY &gt;</span>
          <span class="terminal-ticker-text" id="terminal-ticker">
            // TELEMETRY: Sub-oceanic array clock: 3012.10.28. Baseline noise: 3.2 micro-g.
          </span>
        </div>

        <div class="hud-footer-right">
          <span id="hud-containment-integrity">DR. CORRI CONTAINMENT SEAL: ACTIVE</span>
          <span style="color: var(--border-subtle);">|</span>
          <span id="hud-clock" class="blink">3012.10.28 03:42:19 UTC</span>
        </div>
      </footer>

      <!-- CRT Shaders & Vignette -->
      <div class="crt-overlay"></div>
      <div class="crt-vignette"></div>
    `;
  }

  bindGlobalEvents() {
    // Audio toggle
    document.getElementById('btn-hud-audio').addEventListener('click', () => {
      soundEngine.init();
      const isMuted = soundEngine.toggleMute();
      document.getElementById('hud-audio-icon').innerText = isMuted ? '🔇' : '🔊';
      soundEngine.playClick();
    });

    // Map button
    document.getElementById('btn-hud-map').addEventListener('click', () => {
      this.openNavigationDrawer();
    });

    // Evidence button
    document.getElementById('btn-hud-evidence').addEventListener('click', () => {
      this.openEvidenceMatrix();
    });

    // Archive button
    document.getElementById('btn-hud-archive').addEventListener('click', () => {
      this.openArchive();
    });

    // Agent Sync button
    document.getElementById('btn-hud-sync').addEventListener('click', () => {
      this.openAgentSync();
    });

    // Brand click returns to main menu
    document.getElementById('hud-brand').addEventListener('click', () => {
      soundEngine.playClick();
      this.openMainMenu();
    });

    // Terminal button — opens field terminal during investigation
    document.getElementById('btn-hud-terminal').addEventListener('click', () => {
      if (gameState.getState().gamePhase === 'investigation') {
        this.openFieldTerminal(false);
      }
    });
  }

  startBoot() {
    const boot = new BootSequence(() => {
      this.openMainMenu();
    });
    boot.render(this.rootEl);
  }

  openMainMenu() {
    const menu = new MainMenu(
      () => this.openAgentSetup(),
      () => this.openArchive()
    );
    menu.render(this.rootEl);
  }

  openAgentSetup() {
    const setup = new AgentSetup(() => {
      this.openFieldTerminal(true); // first boot = true
    });
    setup.render(this.rootEl);
  }

  openFieldTerminal(isFirstBoot = false) {
    if (this.activeModal) this.activeModal.close();
    const terminal = new FieldTerminal(
      isFirstBoot,
      (pendingAction) => {
        this.activeModal = null;
        // On first boot, always start the investigation scene first
        if (isFirstBoot) {
          this.startInvestigation();
        }
        // Then route any system action the player selected inside the terminal
        if (pendingAction === 'map') {
          this.openNavigationDrawer();
        } else if (pendingAction === 'archive') {
          this.openArchive();
        } else if (pendingAction === 'evidence') {
          this.openEvidenceMatrix();
        } else if (pendingAction === 'sync') {
          this.openAgentSync();
        }
        // No pending action: terminal just closes, investigation continues
      }
    );
    terminal.render(this.rootEl);
    if (!isFirstBoot) {
      this.activeModal = terminal;
    }
  }

  startInvestigation() {
    soundEngine.init();
    gameState.setGamePhase('investigation');

    const viewportContainer = document.getElementById('viewport-container');
    this.sceneRenderer = new SceneRenderer(
      (poi) => this.openInspectionModal(poi),
      (locationId) => this.navigateToLocation(locationId),
      () => this.openNavigationDrawer()
    );
    this.sceneRenderer.render(viewportContainer);

    this.updateHUD();
  }

  navigateToLocation(locationId) {
    gameState.setLocation(locationId);
    if (this.sceneRenderer) {
      this.sceneRenderer.update();
    }
    this.updateHUD();
  }

  openInspectionModal(poi) {
    if (this.activeModal) this.activeModal.close();
    this.activeModal = new InspectionModal(
      poi,
      () => { this.activeModal = null; },
      (actionType, payload) => {
        if (actionType === 'openArchive') {
          this.openArchive(payload);
        } else if (actionType === 'openClimax') {
          this.openEndingScreen();
        } else {
          if (this.sceneRenderer) this.sceneRenderer.update();
          this.updateHUD();
          this.checkRadioTrigger(payload);
        }
      }
    );
    this.activeModal.render(this.rootEl);
  }

  checkRadioTrigger(poi) {
    if (!poi || !poi.actionType) return;
    const action = poi.actionType;

    if (action === 'unlock_door') {
      this.showRadioToast('ADITYA [AGENT 02]', 'Airlock override registered. Sector A circulation is open.');
    } else if (action === 'reset_power') {
      this.showRadioToast('ADITYA [AGENT 02]', 'Breaker B-4 is responding. Your side should have cleanroom power now.');
    } else if (action === 'acquire_keycard') {
      this.showRadioToast('KAYLANI [AGENT 03]', 'Dr. Corri\'s Level 2 token acquired. Research Wing clearance verified.');
    } else if (action === 'analyze_spectrum') {
      this.showRadioToast('KAYLANI [AGENT 03]', 'Raman resonance matches the planthopper bio-matrix. Dr. Corri\'s sacrifice was intentional.');
    } else if (action === 'unlock_sublevel_gate') {
      this.showRadioToast('ADITYA [AGENT 02]', `Sublevel gates unlatched. ${gameState.getState().playerName.toUpperCase()}, watch your footing—the basalt is fractured down there.`);
    } else if (action === 'recover_corri_seal') {
      this.showRadioToast('KAYLANI [AGENT 03]', `Dr. Corri's seal authenticated. ${gameState.getState().playerName.toUpperCase()}, enact the final operational resolution.`);
    }
  }

  showRadioToast(sender, message) {
    soundEngine.playRadioChirp();

    const oldToast = document.querySelector('.comms-toast-alert');
    if (oldToast && oldToast.parentNode) oldToast.parentNode.removeChild(oldToast);

    const toast = document.createElement('div');
    toast.className = 'comms-toast-alert';
    toast.innerHTML = `
      <div class="comms-toast-sender">
        <span>📻 INCOMING FIELD TRANSMISSION // ${sender}</span>
        <span style="font-size: 9px; color: var(--green-glow);">AUDIO SYNC</span>
      </div>
      <div class="comms-toast-body">${message}</div>
    `;

    this.rootEl.appendChild(toast);

    setTimeout(() => {
      if (toast && toast.parentNode) {
        toast.style.transition = 'opacity 0.4s ease';
        toast.style.opacity = '0';
        setTimeout(() => {
          if (toast && toast.parentNode) toast.parentNode.removeChild(toast);
        }, 450);
      }
    }, 4500);
  }

  openArchive(initialArchiveId = null) {
    if (this.activeModal) this.activeModal.close();
    this.activeModal = new ArchiveView(
      initialArchiveId,
      () => { this.activeModal = null; }
    );
    this.activeModal.render(this.rootEl);
  }

  openAgentSync() {
    if (this.activeModal) this.activeModal.close();
    this.activeModal = new AgentSyncModal(
      () => { 
        this.activeModal = null;
        this.updateHUD();
      }
    );
    this.activeModal.render(this.rootEl);
  }

  openEvidenceMatrix() {
    if (this.activeModal) this.activeModal.close();
    this.activeModal = new EvidenceMatrixModal(
      () => { this.activeModal = null; }
    );
    this.activeModal.render(this.rootEl);
  }

  openNavigationDrawer() {
    if (this.activeModal) this.activeModal.close();
    this.activeModal = new NavigationDrawer(
      (locId) => this.navigateToLocation(locId),
      () => { this.activeModal = null; }
    );
    this.activeModal.render(this.rootEl);
  }

  openEndingScreen() {
    if (this.activeModal) this.activeModal.close();
    this.activeModal = new EndingScreen(
      () => {
        // Restart investigation from beginning
        this.activeModal = null;
        this.openMainMenu();
      },
      () => {
        // Open Archive from ending screen
        this.openArchive();
      }
    );
    this.activeModal.render(this.rootEl);
  }

  updateHUD() {
    const state = gameState.getState();
    const loc = LOCATIONS[state.currentLocationId] || LOCATIONS.island_exterior;

    const locEl = document.getElementById('hud-loc-val');
    if (locEl) locEl.innerText = loc.name;

    const agentEl = document.getElementById('hud-agent-val');
    if (agentEl) agentEl.innerText = `AGENT 01 // ${state.playerName.toUpperCase()}`;

    const entropyEl = document.getElementById('hud-entropy-val');
    if (entropyEl) entropyEl.innerText = `${state.facilityEntropyIndex}% [${state.facilityEntropyIndex > 30 ? 'ENTROPIC' : 'DEGRADED'}]`;

    const badgeEl = document.getElementById('hud-sync-badge');
    if (badgeEl) {
      badgeEl.innerText = state.unreadCommsCount;
      badgeEl.style.display = state.unreadCommsCount > 0 ? 'inline-block' : 'none';
    }
  }

  handleStateUpdate(state, changeKey, payload) {
    this.updateHUD();
    if (changeKey === 'location' && this.sceneRenderer) {
      this.sceneRenderer.update();
    }
  }

  updateTicker() {
    const tickerEl = document.getElementById('terminal-ticker');
    if (!tickerEl) return;
    this.tickerIdx = (this.tickerIdx + 1) % this.tickerMessages.length;
    tickerEl.innerText = this.tickerMessages[this.tickerIdx];
  }
}

// Global bootstrap on DOM loaded
window.addEventListener('DOMContentLoaded', () => {
  window.quassarApp = new QuassarSanctumApp();
  window.quassarApp.init();
});
