/**
 * QUASSAR SANCTUM - Agent Synchronization & Confidential Letters Component
 * Manages 3-agent field comms feeds and player-exclusive encrypted letters.
 */

import { AGENT_TEAM, AGENT_COMMS } from '../data/agentComms.js';
import { soundEngine } from '../audio.js';
import { gameState } from '../state.js';

export class AgentSyncModal {
  constructor(onClose) {
    this.currentTab = 'transmissions'; // 'transmissions' | 'letters'
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

    // Mark all currently shown comms as read
    AGENT_COMMS.forEach(c => gameState.markCommAsRead(c.id));

    const displayedComms = AGENT_COMMS.filter(c => {
      if (this.currentTab === 'letters') return c.isConfidential;
      return !c.isConfidential;
    });

    this.container.innerHTML = `
      <div class="sync-window">
        <!-- Sync Header -->
        <div class="sync-header">
          <div class="sync-title-group">
            <div class="facility-logo-icon" style="background: var(--amber-glow); box-shadow: 0 0 10px var(--amber-glow);"></div>
            <div class="sync-title">AGENT SYNCHRONIZATION // FIELD TELEMETRY DECK</div>
            
            <div class="sync-tabs-row">
              <button class="sync-tab-btn ${this.currentTab === 'transmissions' ? 'active' : ''}" id="tab-btn-transmissions">
                <span>📻</span>
                <span>TEAM TRANSMISSIONS (ADITYA & KAYLANI)</span>
              </button>
              <button class="sync-tab-btn ${this.currentTab === 'letters' ? 'active' : ''}" id="tab-btn-letters">
                <span>✉</span>
                <span>CONFIDENTIAL LETTERS (AGENT 01 ONLY)</span>
              </button>
            </div>
          </div>

          <button class="inspection-close-btn" id="btn-close-sync">[ESC] CLOSE</button>
        </div>

        <!-- 2-Column Grid Layout -->
        <div class="sync-main-grid">
          <!-- Col 1: Agent Unit Status List -->
          <div class="agent-team-col">
            <div style="font-size: 10px; font-weight: 700; color: var(--text-dim); letter-spacing: 0.15em; text-transform: uppercase;">
              INVESTIGATION FIELD UNIT (3)
            </div>

            ${AGENT_TEAM.map(agent => {
              const name = agent.id === 'agent_01' ? state.playerName : agent.name;
              return `
                <div class="agent-card ${agent.id === 'agent_01' ? 'active' : ''}">
                  <div class="agent-card-header">
                    <span class="agent-id-tag">${agent.code}</span>
                    <span class="status-badge nominal">${agent.status.includes('IN SITE') ? 'IN SITE' : 'REMOTE'}</span>
                  </div>
                  <div class="agent-name">${name}</div>
                  <div class="agent-role">${agent.role}</div>
                  <div class="agent-telemetry-status">
                    <span class="telemetry-indicator active"></span>
                    <span>Bio-Telemetry Nominal // 72 BPM</span>
                  </div>
                </div>
              `;
            }).join('')}

            <div style="margin-top: auto; padding: 12px; background: #06090e; border: 1px dashed var(--border-subtle); font-size: 10px; color: var(--text-dim); line-height: 1.5;">
              <span style="color: var(--amber-glow); font-weight: 700;">CONFIDENTIALITY NOTICE:</span><br/>
              Agent 01 letters are encrypted with Bureau private keys and are NOT synced to Agent 02 or Agent 03.
            </div>
          </div>

          <!-- Col 2: Comms Feed -->
          <div class="sync-feed-col">
            ${displayedComms.map(comm => `
              <div class="sync-message-card ${comm.senderClass}">
                <div class="sync-msg-meta">
                  <span class="sync-msg-sender">${comm.sender}</span>
                  <span>${comm.timestamp}</span>
                </div>
                <div style="font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 8px;">${comm.subject}</div>
                <div class="sync-msg-body">${comm.body.replace(/\n/g, '<br/>')}</div>
                
                ${comm.archiveRef ? `
                  <div class="sync-msg-attachment">
                    <span>◈ ARCHIVE RECORD LINKED: [${comm.archiveRef}]</span>
                    <span style="font-size: 9px; color: var(--green-glow);">SYNCHRONIZED TO DATABASE</span>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Bind tab clicks
    document.getElementById('tab-btn-transmissions').addEventListener('click', () => {
      soundEngine.playClick();
      this.currentTab = 'transmissions';
      this.update();
    });

    document.getElementById('tab-btn-letters').addEventListener('click', () => {
      soundEngine.playClick();
      this.currentTab = 'letters';
      this.update();
    });

    // Bind close
    document.getElementById('btn-close-sync').addEventListener('click', () => {
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
