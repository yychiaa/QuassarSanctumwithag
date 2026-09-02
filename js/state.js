/**
 * QUASSAR SANCTUM - Reactive Game State Manager
 */

export class GameStateManager {
  constructor() {
    this.listeners = new Set();
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      // Player & Session
      playerName: 'K. VANCE',
      gamePhase: 'boot', // 'boot' | 'menu' | 'setup' | 'investigation'
      
      // Navigation & World
      currentLocationId: 'island_exterior',
      discoveredLocations: ['island_exterior'],
      unlockedDoors: {
        'hub_main_airlock': false,
        'hub_research_wing': false,
        'hub_staff_wing': true,
        'hub_sublevel_gate': false
      },
      
      // Exploration & Inspection
      inspectedPois: new Set(),
      
      // Evidence & Archive
      discoveredEvidence: new Set(['EVD-000']), // Initial briefing
      unlockedArchiveIds: new Set([
        'FAC-01', 'FAC-02', 
        'LAY-01', 
        'PER-01', 'PER-02', 'PER-03',
        'SCI-01'
      ]),
      
      // Inventory / Key Items
      inventory: [],
      
      // Agent Synchronization
      readCommsIds: new Set(['COMM-01']),
      unreadCommsCount: 2,
      
      // Facility System Parameters (Phase 1 -> Phase 2 -> Phase 3)
      facilityEntropyIndex: 12, // 0 - 100%
      sublevelContainmentIntegrity: 78.4,
      systemClock: '3012.10.28 03:42:19 UTC'
    };
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(changeKey, payload) {
    for (const listener of this.listeners) {
      try {
        listener(this.state, changeKey, payload);
      } catch (err) {
        console.error('State listener error:', err);
      }
    }
  }

  setPlayerName(name) {
    this.state.playerName = name.trim() || 'K. VANCE';
    this.notify('playerName', this.state.playerName);
  }

  setGamePhase(phase) {
    this.state.gamePhase = phase;
    this.notify('gamePhase', phase);
  }

  setLocation(locationId) {
    if (!this.state.discoveredLocations.includes(locationId)) {
      this.state.discoveredLocations.push(locationId);
    }
    this.state.currentLocationId = locationId;
    this.notify('location', locationId);
  }

  inspectPoi(poiId) {
    const isFirstTime = !this.state.inspectedPois.has(poiId);
    this.state.inspectedPois.add(poiId);
    if (isFirstTime) {
      this.notify('poiInspected', poiId);
    }
    return isFirstTime;
  }

  discoverEvidence(evidenceId) {
    const isNew = !this.state.discoveredEvidence.has(evidenceId);
    if (isNew) {
      this.state.discoveredEvidence.add(evidenceId);
      this.notify('evidenceDiscovered', evidenceId);
    }
    return isNew;
  }

  unlockArchiveEntry(archiveId) {
    const isNew = !this.state.unlockedArchiveIds.has(archiveId);
    if (isNew) {
      this.state.unlockedArchiveIds.add(archiveId);
      this.notify('archiveUnlocked', archiveId);
    }
    return isNew;
  }

  addItemToInventory(item) {
    if (!this.state.inventory.find(i => i.id === item.id)) {
      this.state.inventory.push(item);
      this.notify('inventory', item);
    }
  }

  hasItem(itemId) {
    return this.state.inventory.some(i => i.id === itemId);
  }

  unlockDoor(doorId) {
    this.state.unlockedDoors[doorId] = true;
    this.notify('doorUnlocked', doorId);
  }

  markCommAsRead(commId) {
    if (!this.state.readCommsIds.has(commId)) {
      this.state.readCommsIds.add(commId);
      this.state.unreadCommsCount = Math.max(0, this.state.unreadCommsCount - 1);
      this.notify('commsRead', commId);
    }
  }

  increaseEntropy(amount) {
    this.state.facilityEntropyIndex = Math.min(100, this.state.facilityEntropyIndex + amount);
    this.notify('entropy', this.state.facilityEntropyIndex);
  }
}

export const gameState = new GameStateManager();
