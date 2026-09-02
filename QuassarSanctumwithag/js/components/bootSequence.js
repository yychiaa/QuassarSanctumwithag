/**
 * QUASSAR SANCTUM - Cinematic Opening Boot Sequence
 * Restrained scientific equipment powering on: CRT glow, slow silhouette reveal, audio fade-in.
 */

import { soundEngine } from '../audio.js';

export class BootSequence {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.container = null;
    this.currentStep = 0;
    this.logs = [
      { tag: 'SYS_INIT', text: 'Quassar Diagnostic Bios v4.19 initializing (Quassar Observatory 3010)...', type: 'time' },
      { tag: 'HARDWARE', text: 'Sub-oceanic bus array verified: 128/128 channels online.', type: 'success' },
      { tag: 'CHRONO', text: 'Facility clock calibrated: POST-INCIDENT RECONSTRUCTION (3012).', type: 'time' },
      { tag: 'NET_LINK', text: 'Connecting to Quassar Observatory Sector 4 oceanic array...', type: 'time' },
      { tag: 'OPTICAL', text: 'Sub-sea fiber umbilical #07: SEVERED [17 OCT 3012 DISCHARGE].', type: 'warn' },
      { tag: 'CONTAINMENT', text: 'Sublevel -01 telemetry: DR. CORRI PROTOCOL EPSILON SEAL VERIFIED.', type: 'warn' },
      { tag: 'AGENT_SYNC', text: 'Synchronizing Field Unit: AGENT 01, AGENT 02 (Aditya), AGENT 03 (Kaylani)...', type: 'success' },
      { tag: 'READY', text: 'Forensic terminal ready. Establishing investigator session.', type: 'success' }
    ];
  }

  render(parentEl) {
    this.container = document.createElement('div');
    this.container.className = 'boot-container';
    this.container.innerHTML = `
      <div class="boot-cinematic-bg" id="boot-bg"></div>

      <div class="boot-terminal-box" id="boot-box" style="opacity: 0; transform: translateY(12px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);">
        <div class="boot-header">
          <span>// QUASSAR OBSERVATORY (EST. 3010) — SYSTEM INITIALIZATION //</span>
          <span class="blink">● DIAGNOSTIC_ACTIVE</span>
        </div>
        <div class="boot-log-container" id="boot-log-stream"></div>
        <div class="boot-progress-bar-wrap">
          <div class="boot-progress-bar" id="boot-progress-bar"></div>
        </div>
        <div style="margin-top: 16px; display: flex; justify-content: space-between; font-size: 11px; color: var(--text-dim);">
          <span>SECURITY HANDSHAKE: ACTIVE</span>
          <button id="btn-skip-boot" style="padding: 4px 10px; font-size: 10px;">[SKIP / INITIALIZE NOW]</button>
        </div>
      </div>
    `;

    parentEl.appendChild(this.container);

    // Fade in observatory background silhouette slowly
    setTimeout(() => {
      const bg = document.getElementById('boot-bg');
      if (bg) bg.style.opacity = '0.35';
      const box = document.getElementById('boot-box');
      if (box) {
        box.style.opacity = '1';
        box.style.transform = 'translateY(0)';
      }
      soundEngine.init();
    }, 400);

    document.getElementById('btn-skip-boot').addEventListener('click', () => {
      soundEngine.playClick();
      this.finish();
    });

    setTimeout(() => this.runLogStream(), 800);
  }

  runLogStream() {
    const logStreamEl = document.getElementById('boot-log-stream');
    const progressBarEl = document.getElementById('boot-progress-bar');
    
    if (this.currentStep < this.logs.length) {
      const log = this.logs[this.currentStep];
      const line = document.createElement('div');
      line.className = 'boot-line';
      
      const now = `3012.10.28 ` + new Date().toISOString().substring(11, 19);
      line.innerHTML = `
        <span class="time">[${now}]</span>
        <span class="tag">[${log.tag}]</span>
        <span class="${log.type}">${log.text}</span>
      `;
      logStreamEl.appendChild(line);
      logStreamEl.scrollTop = logStreamEl.scrollHeight;

      soundEngine.playScan();

      const progress = ((this.currentStep + 1) / this.logs.length) * 100;
      if (progressBarEl) progressBarEl.style.width = `${progress}%`;

      this.currentStep++;
      const delay = Math.floor(Math.random() * 220) + 180;
      this.timeoutId = setTimeout(() => this.runLogStream(), delay);
    } else {
      setTimeout(() => this.finish(), 600);
    }
  }

  finish() {
    clearTimeout(this.timeoutId);
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    soundEngine.playDiscovery();
    if (this.onComplete) this.onComplete();
  }
}
