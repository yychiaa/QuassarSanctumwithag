/**
 * QUASSAR SANCTUM - Multi-Layered Procedural Audio Engine
 * Real-time synthesis of location ambiances, mechanical relays, radio chirps, and diagnostic audio.
 */

export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.initialized = false;
    
    // Ambient layers
    this.currentRoom = 'island_exterior';
    this.masterGain = null;
    this.roomNodes = {};
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.12, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.initialized = true;
      this.setRoomAmbience(this.currentRoom);
    } catch (e) {
      console.warn('Web Audio API not supported or user blocked audio.', e);
    }
  }

  ensureContext() {
    if (!this.initialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.12, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  setRoomAmbience(roomId) {
    this.currentRoom = roomId;
    if (!this.ctx || !this.initialized) return;

    // Clean up previous room nodes with smooth crossfade
    const oldNodes = this.roomNodes;
    this.roomNodes = {};

    if (oldNodes.gain) {
      oldNodes.gain.gain.setValueAtTime(oldNodes.gain.gain.value, this.ctx.currentTime);
      oldNodes.gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
      setTimeout(() => {
        try {
          if (oldNodes.oscillators) oldNodes.oscillators.forEach(o => o.stop());
        } catch (e) {}
      }, 1300);
    }

    // Build new room-specific procedural ambient layers
    try {
      const roomGain = this.ctx.createGain();
      roomGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      roomGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 1.5);
      roomGain.connect(this.masterGain);

      const oscillators = [];

      if (roomId === 'island_exterior') {
        // Wind & Oceanic Sub-Bass + Distant metallic groan
        const windOsc = this.ctx.createOscillator();
        windOsc.type = 'sine';
        windOsc.frequency.setValueAtTime(55, this.ctx.currentTime);

        const windFilter = this.ctx.createBiquadFilter();
        windFilter.type = 'lowpass';
        windFilter.frequency.setValueAtTime(180, this.ctx.currentTime);

        windOsc.connect(windFilter);
        windFilter.connect(roomGain);
        windOsc.start();
        oscillators.push(windOsc);

      } else if (roomId === 'facility_hub') {
        // Low 60Hz electrical hum + fluorescent ventilation
        const humOsc = this.ctx.createOscillator();
        humOsc.type = 'triangle';
        humOsc.frequency.setValueAtTime(60, this.ctx.currentTime);

        const humGain = this.ctx.createGain();
        humGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        humOsc.connect(humGain);
        humGain.connect(roomGain);
        humOsc.start();
        oscillators.push(humOsc);

      } else if (roomId === 'staff_wing') {
        // Gentle acoustic CRT pitch + quiet sub-bass
        const crtOsc = this.ctx.createOscillator();
        crtOsc.type = 'sine';
        crtOsc.frequency.setValueAtTime(120, this.ctx.currentTime);

        crtOsc.connect(roomGain);
        crtOsc.start();
        oscillators.push(crtOsc);

      } else if (roomId === 'research_lab') {
        // Pristine laser cleanroom: 440Hz harmonic resonance + subtle sweep
        const labOsc = this.ctx.createOscillator();
        labOsc.type = 'sine';
        labOsc.frequency.setValueAtTime(88, this.ctx.currentTime);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(440, this.ctx.currentTime);
        filter.Q.setValueAtTime(2, this.ctx.currentTime);

        labOsc.connect(filter);
        filter.connect(roomGain);
        labOsc.start();
        oscillators.push(labOsc);

      } else if (roomId.includes('sublevel') || roomId.includes('experiment')) {
        // Deep basalt 42Hz vibration + pulsing 0.04 Hz sub-harmonic
        const subOsc = this.ctx.createOscillator();
        subOsc.type = 'sawtooth';
        subOsc.frequency.setValueAtTime(42, this.ctx.currentTime);

        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.04, this.ctx.currentTime);
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(4, this.ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(subOsc.frequency);

        const subFilter = this.ctx.createBiquadFilter();
        subFilter.type = 'lowpass';
        subFilter.frequency.setValueAtTime(120, this.ctx.currentTime);

        subOsc.connect(subFilter);
        subFilter.connect(roomGain);
        subOsc.start();
        lfo.start();
        oscillators.push(subOsc, lfo);
      }

      this.roomNodes = { gain: roomGain, oscillators };
    } catch (err) {
      console.warn('Could not build room ambience:', err);
    }
  }

  playClick() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.018);

      gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.018);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.022);
    } catch (e) {}
  }

  playScan() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(2200, this.ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.17);
    } catch (e) {}
  }

  playFocusLock() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1420, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {}
  }

  playRadioChirp() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    try {
      // 2-tone radio transmission handshake
      const freqs = [1800, 2400];
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.025, this.ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.05 + 0.045);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.05);
        osc.stop(this.ctx.currentTime + idx * 0.05 + 0.05);
      });
    } catch (e) {}
  }

  playDoorCycle() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    try {
      // Low hydraulic hiss & heavy pneumatic thud
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.65);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.7);
    } catch (e) {}
  }

  playDiscovery() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    try {
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.06 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.85);
      });
    } catch (e) {}
  }

  playWarning() {
    if (this.isMuted || !this.ctx) return;
    this.ensureContext();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.setValueAtTime(330, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.32);
    } catch (e) {}
  }
}

export const soundEngine = new SoundEngine();
