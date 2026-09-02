/**
 * QUASSAR SANCTUM - QS-FIELD-TERM-01 Diegetic Investigation Terminal
 * A compact forensic field computer carried by Agent 01.
 * Appears between Agent Setup and Island Perimeter exploration.
 * Reusable: can be reopened from the HUD TERMINAL button during investigation.
 *
 * Design: Phosphor-green monochrome CRT interface with boot diagnostics,
 * system status panels, and command-style prompts.
 * Two phases: 'boot' -> 'systems'
 */

import { soundEngine } from '../audio.js';
import { gameState } from '../state.js';

export class FieldTerminal {
  constructor(isFirstBoot, onExit) {
    this.isFirstBoot = isFirstBoot; // true = first time after setup; false = reopened via HUD
    this.onExit = onExit;           // called with (pendingAction | null) on close
    this.container = null;
    this.phase = 'boot';            // 'boot' | 'systems'
    this.bootStep = 0;
    this.bootTimer = null;
    this.escHandler = null;
    this._pendingAction = null;
  }

  render(parentEl) {
    this.container = document.createElement('div');
    this.container.className = 'boot-container field-terminal-backdrop';
    parentEl.appendChild(this.container);
    this._renderBootPhase();
  }

  // ─── Utility: sanitize text for HTML injection ──────────────────────────────
  _safe(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ─── PHASE 1: BOOT SEQUENCE ─────────────────────────────────────────────────
  _renderBootPhase() {
    const state = gameState.getState();
    const agentName = this._safe((state.playerName || 'AGENT 01').toUpperCase().substring(0, 24));

    this.container.innerHTML = `
      <div class="ft-scanlines"></div>

      <div class="boot-terminal-box ft-terminal-box" id="ft-box"
           style="opacity:0; transform:scale(0.97); transition: all 0.6s cubic-bezier(0.16,1,0.3,1); max-width:820px;">

        <div class="boot-header ft-header">
          <div>
            <span style="color:var(--text-dim); font-size:10px;">QS-FIELD-TERM-01 &nbsp;&#9658;&nbsp;</span>
            <span style="color:var(--green-glow); font-weight:700; letter-spacing:0.12em;">FORENSIC FIELD TERMINAL</span>
          </div>
          <span class="blink" style="font-size:10px; color:var(--green-dim);">&#9632; PWR_ON</span>
        </div>

        <div class="boot-log-container ft-log" id="ft-log-stream" style="min-height:280px; max-height:280px;"></div>

        <div class="boot-progress-bar-wrap" style="margin-top:16px;">
          <div class="boot-progress-bar" id="ft-progress-bar"></div>
        </div>

        <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:center; font-size:10px; color:var(--text-dim);">
          <span id="ft-status-label">INITIALIZING SECURE BOOT...</span>
          <button id="btn-ft-skip" style="padding:4px 10px; font-size:10px;">[SKIP BOOT]</button>
        </div>
      </div>
    `;

    requestAnimationFrame(() => {
      const box = document.getElementById('ft-box');
      if (box) { box.style.opacity = '1'; box.style.transform = 'scale(1)'; }
    });

    // Build boot log sequence
    this.bootLogs = [
      { tag: 'HW_INIT',    text: 'QS-FIELD-TERM-01 power rail stable. Capacitor bank charged.',       type: 'success' },
      { tag: 'OS_LOAD',    text: 'Field OS v2.11 (Quassar Bureau Forensics Edition) loading...',      type: 'time'    },
      { tag: 'OS_LOAD',    text: 'Field OS v2.11 READY.',                                             type: 'success' },
      { tag: 'CRYPT',      text: 'Bureau encryption layer: AUTHENTICATED. Session token verified.',   type: 'success' },
      { tag: 'AGENT_BIND', text: `Binding session identity: AGENT 01 // ${agentName}`,               type: 'success' },
      { tag: 'AGENT_BIND', text: 'Identity record registered. Active session confirmed.',             type: 'success' },
      { tag: 'NET_SCAN',   text: 'Scanning for Quassar Observatory facility telemetry...',           type: 'time'    },
      { tag: 'FACILITY',   text: 'FACILITY LINK: QS-OBSERVATORY / SECTOR-00 // PARTIAL SIGNAL',      type: 'warn'    },
      { tag: 'ENTROPY',    text: `FACILITY ENTROPY INDEX: ${state.facilityEntropyIndex}% [DEGRADED]`, type: 'warn'   },
      { tag: 'CLOCK',      text: `SYSTEM CLOCK SYNCED: ${state.systemClock}`,                        type: 'time'    },
      { tag: 'EVIDENCE',   text: `EVIDENCE MATRIX: ${state.discoveredEvidence.size} specimen(s) in record.`, type: 'time' },
      { tag: 'ARCHIVE',    text: `ARCHIVE DB: ${state.unlockedArchiveIds.size} record(s) pre-loaded from Bureau dossier.`, type: 'success' },
      { tag: 'COMMS',      text: `AGENT SYNC: ${state.unreadCommsCount} unread field transmission(s) queued.`, type: 'warn' },
      { tag: 'SEAL',       text: 'CONTAINMENT: DR. CORRI PROTOCOL EPSILON -- SEAL STATUS UNVERIFIED.', type: 'warn'  },
      { tag: 'READY',      text: 'Field terminal ready. Proceed to facility systems interface.',       type: 'success' },
    ];

    this.bootStep = 0;

    document.getElementById('btn-ft-skip').addEventListener('click', () => {
      soundEngine.playClick();
      this._finishBoot();
    });

    this.escHandler = (e) => {
      if (e.key === 'Escape' && this.phase === 'systems') this._exitTerminal();
    };
    window.addEventListener('keydown', this.escHandler);

    setTimeout(() => this._runBootStep(), 400);
  }

  _runBootStep() {
    if (this.phase !== 'boot') return;
    const logEl = document.getElementById('ft-log-stream');
    const progressEl = document.getElementById('ft-progress-bar');
    if (!logEl) return;

    if (this.bootStep < this.bootLogs.length) {
      const log = this.bootLogs[this.bootStep];
      const now = '3012.10.28 ' + new Date().toISOString().substring(11, 19);
      const line = document.createElement('div');
      line.className = 'boot-line';
      line.innerHTML = `
        <span class="time">[${now}]</span>
        <span class="tag">[${log.tag}]</span>
        <span class="${log.type}">${log.text}</span>
      `;
      logEl.appendChild(line);
      logEl.scrollTop = logEl.scrollHeight;
      soundEngine.playScan();

      const pct = ((this.bootStep + 1) / this.bootLogs.length) * 100;
      if (progressEl) progressEl.style.width = `${pct}%`;

      const statusEl = document.getElementById('ft-status-label');
      const truncated = log.text.length > 52 ? log.text.substring(0, 52) + '...' : log.text;
      if (statusEl) statusEl.innerText = `[${log.tag}] ${truncated}`;

      this.bootStep++;
      const delay = 130 + Math.floor(Math.random() * 160);
      this.bootTimer = setTimeout(() => this._runBootStep(), delay);
    } else {
      this.bootTimer = setTimeout(() => this._finishBoot(), 600);
    }
  }

  _finishBoot() {
    clearTimeout(this.bootTimer);
    this.phase = 'systems';
    this._renderSystemsPhase();
  }

  // ─── PHASE 2: FIELD SYSTEMS INTERFACE ───────────────────────────────────────
  _renderSystemsPhase() {
    const state = gameState.getState();
    const agentName = this._safe((state.playerName || 'AGENT 01').toUpperCase().substring(0, 24));
    const evidenceCount = state.discoveredEvidence.size;
    const archiveCount = state.unlockedArchiveIds.size;
    const unreadComms = state.unreadCommsCount;
    const entropy = state.facilityEntropyIndex;
    const entropyLabel = entropy > 30 ? 'ENTROPIC' : 'DEGRADED';

    const systems = [
      {
        key: 'FACILITY STATUS',
        icon: '&#9830;',
        desc: `Entropy index: ${entropy}% [${entropyLabel}] &nbsp;|&nbsp; Containment seal: UNVERIFIED &nbsp;|&nbsp; Incident date: 17 Oct 3012`,
        statusText: 'NOMINAL (COLD)',
        statusClass: 'success',
        action: null
      },
      {
        key: 'LOCAL MAP',
        icon: '&#9769;',
        desc: 'Quassar Observatory — 5 sectors accessible. Current position: ISLAND PERIMETER (SEC-00).',
        statusText: 'AVAILABLE',
        statusClass: 'success',
        action: 'map'
      },
      {
        key: 'ARCHIVE DATABASE',
        icon: '&#128452;',
        desc: `${archiveCount} record(s) pre-loaded from Bureau dossier. Additional records unlock through field inspection.`,
        statusText: `${archiveCount} RECORDS`,
        statusClass: 'success',
        action: 'archive'
      },
      {
        key: 'EVIDENCE MATRIX',
        icon: '&#9672;',
        desc: `${evidenceCount} specimen(s) in record. Inspect physical objects to acquire field evidence.`,
        statusText: evidenceCount > 1 ? `${evidenceCount} SPECIMENS` : 'BRIEFING ONLY',
        statusClass: evidenceCount > 1 ? 'success' : 'warn',
        action: 'evidence'
      },
      {
        key: 'AGENT SYNC',
        icon: '&#128251;',
        desc: `${unreadComms} unread transmission(s) from ADITYA [AGENT 02] and KAYLANI [AGENT 03].`,
        statusText: unreadComms > 0 ? `${unreadComms} UNREAD` : 'ALL READ',
        statusClass: unreadComms > 0 ? 'warn' : 'success',
        action: 'sync'
      },
      {
        key: 'SYSTEM LOG',
        icon: '&#9658;',
        desc: 'Encrypted incident log for CASE #3012-QS-088. Entries populate as investigation advances.',
        statusText: 'ACTIVE',
        statusClass: 'success',
        action: null
      },
    ];

    if (!this.container) return;
    this.container.innerHTML = `
      <div class="ft-scanlines"></div>

      <div class="boot-terminal-box ft-terminal-box ft-systems-box" id="ft-systems-panel"
           style="opacity:0; transform:scale(0.97); transition: all 0.45s ease; max-width:900px;">

        <!-- Header -->
        <div class="boot-header ft-header">
          <div>
            <span style="color:var(--text-dim); font-size:10px;">QS-FIELD-TERM-01 &nbsp;&#9658;&nbsp;</span>
            <span style="color:var(--green-glow); font-weight:700; letter-spacing:0.12em;">FIELD SYSTEMS // AGENT 01 // ${agentName}</span>
          </div>
          <span style="font-size:10px; color:var(--green-glow);">&#9632; ONLINE</span>
        </div>

        <!-- Identity Banner -->
        <div class="ft-identity-banner">
          <div class="ft-id-row">
            <span class="ft-id-label">OPERATOR:</span>
            <span class="ft-id-val">${agentName}</span>
            <span class="ft-id-sep">|</span>
            <span class="ft-id-label">DESIGNATION:</span>
            <span class="ft-id-val" style="color:var(--green-glow);">AGENT 01 -- LEAD FORENSIC INVESTIGATOR</span>
          </div>
          <div class="ft-id-row">
            <span class="ft-id-label">CASE FILE:</span>
            <span class="ft-id-val">#3012-QS-088 // QUASSAR OBSERVATORY INCIDENT</span>
            <span class="ft-id-sep">|</span>
            <span class="ft-id-label">CLOCK:</span>
            <span class="ft-id-val">${this._safe(state.systemClock)}</span>
          </div>
        </div>

        <!-- Field Systems Grid -->
        <div class="ft-systems-grid">
          ${systems.map((sys, idx) => `
            <div class="ft-system-entry ${sys.action ? 'ft-clickable' : ''}" id="ft-sys-${idx}" data-action="${sys.action || ''}">
              <div class="ft-sys-header">
                <span class="ft-sys-icon">${sys.icon}</span>
                <span class="ft-sys-key">${sys.key}</span>
                <span class="ft-sys-badge ft-status-${sys.statusClass}">${sys.statusText}</span>
              </div>
              <div class="ft-sys-desc">${sys.desc}</div>
              ${sys.action ? '<div class="ft-sys-hint">[ SELECT TO OPEN ]</div>' : ''}
            </div>
          `).join('')}
        </div>

        ${this.isFirstBoot ? `
          <div class="ft-briefing-box">
            <span style="color:var(--green-glow); font-weight:700;">// FIELD BRIEFING //</span>
            &nbsp;Quassar Observatory entered complete telemetry blackout after the 17 October 3012 containment failure.
            You are on site at the Island Perimeter. Conduct a visual survey of the environment, then use forensic
            inspection to log physical evidence. This terminal updates as your investigation progresses.
          </div>
        ` : ''}

        <!-- Exit Controls -->
        <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:16px;">
          ${!this.isFirstBoot ? `<button id="btn-ft-close" style="padding:10px 18px; font-size:11px;">[ESC] CLOSE TERMINAL</button>` : ''}
          <button class="primary" id="btn-ft-exit" style="padding:10px 24px;">
            <span>${this.isFirstBoot ? '&#9658;' : '&#8617;'}</span>
            <span>${this.isFirstBoot ? 'BEGIN FIELD INVESTIGATION' : 'RETURN TO INVESTIGATION'}</span>
          </button>
        </div>
      </div>
    `;

    requestAnimationFrame(() => {
      const panel = document.getElementById('ft-systems-panel');
      if (panel) { panel.style.opacity = '1'; panel.style.transform = 'scale(1)'; }
    });

    soundEngine.playDiscovery();

    // Bind system entry clicks
    systems.forEach((sys, idx) => {
      if (!sys.action) return;
      const el = document.getElementById(`ft-sys-${idx}`);
      if (el) {
        el.addEventListener('click', () => {
          soundEngine.playClick();
          this._pendingAction = sys.action;
          this._exitTerminal();
        });
      }
    });

    document.getElementById('btn-ft-exit').addEventListener('click', () => {
      soundEngine.playDiscovery();
      this._exitTerminal();
    });

    const closeBtn = document.getElementById('btn-ft-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        soundEngine.playClick();
        this._exitTerminal();
      });
    }
  }

  // ─── Exit ────────────────────────────────────────────────────────────────────
  _exitTerminal() {
    window.removeEventListener('keydown', this.escHandler);
    clearTimeout(this.bootTimer);
    if (this.container && this.container.parentNode) {
      this.container.style.opacity = '0';
      this.container.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        if (this.container && this.container.parentNode) {
          this.container.parentNode.removeChild(this.container);
        }
        if (this.onExit) this.onExit(this._pendingAction);
      }, 320);
    } else {
      if (this.onExit) this.onExit(this._pendingAction);
    }
  }

  close() {
    this._exitTerminal();
  }
}
