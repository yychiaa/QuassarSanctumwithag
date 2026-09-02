/**
 * QUASSAR SANCTUM - Archive Database Component
 * Full 12-category forensic knowledge base browser with interactive relational cross-linking.
 */

import { ARCHIVE_CATEGORIES, ARCHIVE_ENTRIES } from '../data/archive.js';
import { soundEngine } from '../audio.js';
import { gameState } from '../state.js';

export class ArchiveView {
  constructor(initialArchiveId = null, onClose) {
    this.selectedArchiveId = initialArchiveId || 'FAC-01';
    this.selectedCategoryId = 'FACILITY';
    this.searchQuery = '';
    this.onClose = onClose;
    this.container = null;

    // Find category for initial entry
    if (initialArchiveId && ARCHIVE_ENTRIES[initialArchiveId]) {
      this.selectedCategoryId = ARCHIVE_ENTRIES[initialArchiveId].categoryId;
    }
  }

  render(parentEl) {
    this.container = document.createElement('div');
    this.container.className = 'archive-modal-backdrop';
    parentEl.appendChild(this.container);

    this.update();
  }

  // Resolve {AGENT_01} sentinel to the current player name
  resolvePlayer(text) {
    const name = gameState.getState().playerName || 'AGENT 01';
    return text.replace(/\{AGENT_01\}/g, name.toUpperCase());
  }

  update() {
    if (!this.container) return;
    const state = gameState.getState();
    const unlockedIds = state.unlockedArchiveIds;
    const totalEntries = Object.keys(ARCHIVE_ENTRIES).length;
    const unlockedCount = unlockedIds.size;
    const progressPercent = Math.round((unlockedCount / totalEntries) * 100);

    // Filter entries by selected category & search
    const categoryEntries = Object.values(ARCHIVE_ENTRIES).filter(e => {
      const matchCat = e.categoryId === this.selectedCategoryId;
      const matchSearch = !this.searchQuery || 
        e.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        e.content.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    const activeEntry = ARCHIVE_ENTRIES[this.selectedArchiveId];
    const isEntryUnlocked = activeEntry && unlockedIds.has(activeEntry.id);

    // Calculate relational links for the active entry
    const relatedLinks = this.getRelatedLinks(activeEntry);

    this.container.innerHTML = `
      <div class="archive-window">
        <!-- Archive Header -->
        <div class="archive-header">
          <div class="archive-title-wrap">
            <div class="facility-logo-icon"></div>
            <div class="archive-title">QUASSAR OBSERVATORY // ARCHIVE DATABASE</div>
            <div class="archive-stats-tag">
              RECONSTRUCTION: ${unlockedCount}/${totalEntries} RECORDS UNLOCKED (${progressPercent}%)
            </div>
          </div>
          <button class="inspection-close-btn" id="btn-close-archive">[ESC] CLOSE</button>
        </div>

        <!-- Archive 3-Column Layout -->
        <div class="archive-main-layout">
          <!-- Col 1: Categories -->
          <div class="archive-cat-col">
            <div class="archive-cat-header">ARCHIVE CATEGORIES (12)</div>
            <div class="archive-cat-list">
              ${ARCHIVE_CATEGORIES.map(cat => {
                const catAllEntries = Object.values(ARCHIVE_ENTRIES).filter(e => e.categoryId === cat.id);
                const catUnlocked = catAllEntries.filter(e => unlockedIds.has(e.id)).length;
                const isActive = cat.id === this.selectedCategoryId;
                return `
                  <div class="archive-cat-item ${isActive ? 'active' : ''}" data-cat-id="${cat.id}">
                    <div>
                      <div style="font-size: 9px; color: var(--text-dim);">${cat.code}</div>
                      <div>${cat.name}</div>
                    </div>
                    <div class="archive-cat-count">${catUnlocked}/${catAllEntries.length}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Col 2: Entry List in Category -->
          <div class="archive-entry-col">
            <div class="archive-entry-search-box">
              <input type="text" class="archive-search-input" id="archive-search-input" placeholder="Search records..." value="${this.searchQuery}" />
            </div>
            <div class="archive-entry-list">
              ${categoryEntries.length === 0 ? `
                <div style="padding: 24px; color: var(--text-dim); font-size: 11px; text-align: center;">NO MATCHING RECORDS</div>
              ` : categoryEntries.map(entry => {
                const isUnlocked = unlockedIds.has(entry.id);
                const isSelected = entry.id === this.selectedArchiveId;
                return `
                  <div class="archive-entry-item ${isSelected ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}" data-entry-id="${entry.id}">
                    <div class="archive-entry-id">${entry.refCode} ${isUnlocked ? '● VERIFIED' : '○ UNDISCOVERED'}</div>
                    <div class="archive-entry-title">${isUnlocked ? entry.title : '[REDACTED // UNDISCOVERED]'}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Col 3: Detail Record Reader with Cross-Linking -->
          <div class="archive-detail-col">
            ${activeEntry ? (isEntryUnlocked ? `
              <div class="archive-record-header">
                <div class="archive-record-id-badge">${activeEntry.refCode} // ${activeEntry.categoryId}</div>
                <div class="archive-record-title">${activeEntry.title}</div>
                <div class="archive-record-meta-bar">
                  <span>CLEARANCE: LEVEL 4 FORENSIC</span>
                  <span>RECORD STATE: AUTHENTICATED</span>
                  <span>CHRONO: 3010–3012</span>
                </div>
              </div>

              <div class="archive-record-body">${this.resolvePlayer(activeEntry.content)}</div>

              <!-- Relational Investigation Cross-Links -->
              ${relatedLinks.length > 0 ? `
                <div style="margin-top: 24px; background: #06090e; border: 1px solid var(--border-strong); padding: 14px 18px;">
                  <div style="font-size: 9px; font-weight: 700; color: var(--cyan-primary); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px;">
                    RELATIONAL FORENSIC CROSS-REFERENCES:
                  </div>
                  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${relatedLinks.map(rel => {
                      const relUnlocked = unlockedIds.has(rel.id);
                      return `
                        <button class="quick-nav-btn ${!relUnlocked ? 'locked' : ''}" data-jump-id="${rel.id}" style="font-size: 10px; padding: 4px 10px;">
                          <span>◈</span>
                          <span>${relUnlocked ? rel.title : `[LOCKED: ${rel.refCode}]`}</span>
                        </button>
                      `;
                    }).join('')}
                  </div>
                </div>
              ` : ''}

              <div class="archive-record-footnote">${this.resolvePlayer(activeEntry.footnote)}</div>
            ` : `
              <div class="archive-detail-empty">
                <div style="font-size: 32px; color: var(--text-dim); margin-bottom: 12px;">🔒</div>
                <div style="font-size: 14px; font-weight: 700; color: var(--text-muted); letter-spacing: 0.1em;">RECORD NOT YET DISCOVERED</div>
                <div style="font-size: 11px; color: var(--text-dim); margin-top: 8px; max-width: 400px; line-height: 1.6;">
                  This forensic archive record has not yet been unlocked. Explore the facility and inspect points of interest to reconstruct this entry.
                </div>
              </div>
            `) : `
              <div class="archive-detail-empty">SELECT AN ARCHIVE RECORD TO INSPECT TELEMETRY</div>
            `}
          </div>
        </div>
      </div>
    `;

    // Bind category click
    this.container.querySelectorAll('.archive-cat-item').forEach(el => {
      el.addEventListener('click', () => {
        soundEngine.playClick();
        this.selectedCategoryId = el.getAttribute('data-cat-id');
        const firstEntryInCat = Object.values(ARCHIVE_ENTRIES).find(e => e.categoryId === this.selectedCategoryId);
        if (firstEntryInCat) this.selectedArchiveId = firstEntryInCat.id;
        this.update();
      });
    });

    // Bind entry click
    this.container.querySelectorAll('.archive-entry-item').forEach(el => {
      el.addEventListener('click', () => {
        soundEngine.playClick();
        this.selectedArchiveId = el.getAttribute('data-entry-id');
        this.update();
      });
    });

    // Bind Relational Cross-Link jump buttons
    this.container.querySelectorAll('button[data-jump-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const jumpId = btn.getAttribute('data-jump-id');
        const targetEntry = ARCHIVE_ENTRIES[jumpId];
        if (targetEntry) {
          soundEngine.playDiscovery();
          this.selectedCategoryId = targetEntry.categoryId;
          this.selectedArchiveId = targetEntry.id;
          this.update();
        }
      });
    });

    // Bind search input
    const searchInput = document.getElementById('archive-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.update();
      });
    }

    // Bind Close
    const closeBtn = document.getElementById('btn-close-archive');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        soundEngine.playClick();
        this.close();
      });
    }

    // Keyboard ESC
    this.escHandler = (e) => {
      if (e.key === 'Escape') {
        soundEngine.playClick();
        this.close();
      }
    };
    window.addEventListener('keydown', this.escHandler);
  }

  getRelatedLinks(entry) {
    if (!entry) return [];
    const relationMap = {
      'FAC-01': ['FAC-02', 'TIM-01', 'PER-01'],
      'FAC-02': ['FAC-03', 'LAY-01', 'PER-02'],
      'FAC-03': ['SCI-02', 'ARC-01', 'INC-01'],
      'LAY-01': ['FAC-01', 'PER-02', 'ARC-01'],
      'TIM-01': ['FAC-01', 'ARC-01', 'KHY-02', 'INC-01'],
      'PER-01': ['PER-02', 'TIM-01', 'AGD-01', 'AGD-02'],
      'PER-02': ['PER-03', 'ACF-01', 'HAL-01', 'KHY-01', 'INC-01'],
      'PER-03': ['PER-02', 'KHY-02', 'INC-01', 'ARC-01'],
      'SCI-01': ['ACF-01', 'HAL-01', 'PER-02'],
      'SCI-02': ['ARC-01', 'KHY-01', 'FAC-03'],
      'ACF-01': ['SCI-01', 'HAL-01', 'KHY-01', 'PER-02'],
      'HAL-01': ['ACF-01', 'SCI-01', 'ARC-01', 'INC-01'],
      'ARC-01': ['TIM-01', 'SCI-02', 'HAL-01', 'KHY-02'],
      'KHY-01': ['ACF-01', 'PER-02', 'KHY-02', 'INC-01'],
      'KHY-02': ['INC-01', 'PER-03', 'ARC-01', 'TIM-01'],
      'INC-01': ['PER-02', 'PER-03', 'KHY-02', 'TIM-01'],
      'EVD-ARCH-01': ['FAC-03', 'ACF-01', 'PER-03', 'INC-01'],
      'AGD-01': ['FAC-01', 'ARC-01', 'INC-01'],
      'AGD-02': ['KHY-01', 'ACF-01', 'PER-02']
    };

    const relatedIds = relationMap[entry.id] || [];
    return relatedIds.map(id => ARCHIVE_ENTRIES[id]).filter(Boolean);
  }

  close() {
    window.removeEventListener('keydown', this.escHandler);
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    if (this.onClose) this.onClose();
  }
}
