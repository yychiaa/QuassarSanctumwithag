/**
 * QUASSAR SANCTUM - 12-Category Forensic Archive Database
 * Fully canon-compliant: Built 9 April 3010, ACF 01 (3012), ARC (16 May 3012), 
 * KHYRA Containment Failure (17 Oct 3012), Dr. Corri's sacrifice.
 */

export const ARCHIVE_CATEGORIES = [
  { id: 'FACILITY', name: 'FACILITY ARCHITECTURE', code: 'CAT-01' },
  { id: 'LAYOUT', name: 'SECTOR LAYOUT & MAPS', code: 'CAT-02' },
  { id: 'TIMELINE', name: 'CHRONOLOGY & TELEMETRY', code: 'CAT-03' },
  { id: 'PERSONNEL', name: 'RESEARCH ROSTER & LOGS', code: 'CAT-04' },
  { id: 'SCIENCE', name: 'EXPERIMENTAL METHODOLOGY', code: 'CAT-05' },
  { id: 'ACF 01', name: 'SPECIMEN ACF-01', code: 'CAT-06' },
  { id: 'HALIONITE', name: 'HALIONITE (HAL) SYNTHESIS', code: 'CAT-07' },
  { id: 'ARC', name: 'ACOUSTIC RESONANCE CHAMBER', code: 'CAT-08' },
  { id: 'KHYRA', name: 'PROJECT KHYRA & MORPHOLOGY', code: 'CAT-09' },
  { id: 'INCIDENT', name: 'CONTAINMENT BREACH (17 OCT 3012)', code: 'CAT-10' },
  { id: 'EVIDENCE', name: 'FORENSIC EVIDENCE MATRIX', code: 'CAT-11' },
  { id: 'AGENT DISCOVERIES', name: 'AGENT FIELD TELEMETRY', code: 'CAT-12' }
];

export const ARCHIVE_ENTRIES = {
  // CAT-01: FACILITY
  'FAC-01': {
    id: 'FAC-01',
    categoryId: 'FACILITY',
    title: 'QUASSAR OBSERVATORY FOUNDATION (3010)',
    refCode: 'ARCH-FAC-001',
    content: `The Quassar Deep-Matrix Observatory was completed on 9 April 3010. Engineered atop an isolated artificial concrete bastion in oceanic Sector 4, the facility was designed for extreme-isolation physics, sub-matrix telemetry, and vacuum crystal synthesis.

Facility Structure:
- Level 00: Surface Bastion, Seawall, Meteorological & Seismic Arrays.
- Level 01: Central Logistics Hub, Personnel Quarters, Telemetry & Dispatch.
- Level 02: Advanced Cleanroom Labs, Laser Diffraction & Spectrometry.
- Level -01: Subterranean Basalt Void, ARC Chamber, and XP Experiment Chamber.`,
    footnote: 'Ref: Quassar Foundation Charter, 9 April 3010.'
  },
  'FAC-02': {
    id: 'FAC-02',
    categoryId: 'FACILITY',
    title: 'CENTRAL LOGISTICS HUB TELEMETRY',
    refCode: 'ARCH-FAC-002',
    content: `The Central Hub acts as the primary circulation nexus of the observatory. 

At 04:12:18 UTC on 17 October 3012, all surface auxiliary power was diverted into the Sublevel -1 containment matrix under an emergency manual command initiated by Dr. Corri to seal Containment Zone S-14.`,
    footnote: 'System Log: QS-NET-HUB-01 // Power Divert 3012.10.17.'
  },
  'FAC-03': {
    id: 'FAC-03',
    categoryId: 'FACILITY',
    title: 'SUB-SEA OPTICAL UMBILICAL SEVERANCE',
    refCode: 'ARCH-FAC-003',
    content: `Forensic analysis of the severed 64-core cryogenic data cable at the Island Perimeter.
The fracture occurred at 04:12:09 UTC on 17 October 3012. Microscopic glass ionization indicates the severance was caused by a sudden high-energy acoustic standing wave discharged from the subterranean ARC matrix.`,
    footnote: 'Forensic Specimen EVD-001.'
  },

  // CAT-02: LAYOUT
  'LAY-01': {
    id: 'LAY-01',
    categoryId: 'LAYOUT',
    title: 'FACILITY SECTOR TOPOLOGY',
    refCode: 'ARCH-LAY-001',
    content: `Radial corridor topology:
- Sector A: Staff Quarters & Acoustic Monitoring.
- Sector B: Advanced Research Cleanroom & ACF 01 Spectrometry.
- Sector C: Sublevel Freight Access & Blast Gate S-14.
- Sector S-14: XP Experiment Chamber & ARC Resonance Basalt Void.`,
    footnote: 'Blueprint Rev. 3010-B.'
  },

  // CAT-03: TIMELINE
  'TIM-01': {
    id: 'TIM-01',
    categoryId: 'TIMELINE',
    title: 'CHRONOLOGY OF QUASSAR SANCTUM',
    refCode: 'ARCH-TIM-001',
    content: `CHRONOLOGICAL RECORD:
- 09 April 3010 — Quassar Observatory construction completed on artificial concrete island.
- Early 3012 — Discovery of ACF 01 (Anomalous Celestial Fragment 01).
- 16 May 3012 — Acoustic Resonance Chamber (ARC) activated in subterranean basalt void.
- June–Sept 3012 — Halionite (HAL) synthesis and Project KHYRA biological engineering trials.
- 17 October 3012 — Major containment failure of KHYRA. Dr. Corri manually seals Level -01 but dies of KHYRA venom. Facility enters permanent quarantine.
- Post-Incident 3012 — Field Unit (Agents {AGENT_01}, Aditya, Kaylani) deploys to conduct forensic investigation.`,
    footnote: 'Compiled by Agent 01 Reconstruction Matrix.'
  },

  // CAT-04: PERSONNEL
  'PER-01': {
    id: 'PER-01',
    categoryId: 'PERSONNEL',
    title: 'INVESTIGATION UNIT ROSTER (3012)',
    refCode: 'ARCH-PER-001',
    content: `BUREAU FIELD INVESTIGATION UNIT:
- AGENT 01: {AGENT_01} — Lead Forensic Investigator.
- AGENT 02: ADITYA — Systems Architecture & Physical Forensics.
- AGENT 03: KAYLANI — Xenobiology & Spectrographic Diagnostics.

Mandate: Enter Quassar Observatory, verify Dr. Corri's containment seal, reconstruct the timeline, and determine final protocol resolution.`,
    footnote: 'Bureau Authorization Directive #3012-QS.'
  },
  'PER-02': {
    id: 'PER-02',
    categoryId: 'PERSONNEL',
    title: 'DR. CORRI — PRINCIPAL INVESTIGATOR',
    refCode: 'ARCH-PER-002',
    content: `Dr. Corri, Principal Investigator for ACF 01, Halionite synthesis, and Project KHYRA.
A pioneer in bio-silicate integration, Dr. Corri oversaw the activation of the ARC on 16 May 3012. During the catastrophic containment failure on 17 October 3012, Dr. Corri refused evacuation, entered the XP Experiment Chamber, and manually engaged Protocol Epsilon-KHYRA, sealing the breach from within before dying from KHYRA venom.`,
    footnote: 'Personnel Dossier #QS-CORRI-01 // Deceased 17 Oct 3012.'
  },
  'PER-03': {
    id: 'PER-03',
    categoryId: 'PERSONNEL',
    title: 'DR. CORRI\'S FINAL LOGS (17 OCT 3012)',
    refCode: 'ARCH-PER-003',
    content: `"The venom acts faster than nerve conduction. KHYRA is not an aberration; it is a bio-mineral resonance that learned to grow teeth and chitin from our own laser pulses. I am locking the primary blast gates from the gantry console. No one else goes down. Seal the island."`,
    footnote: 'Recovered from Experiment Chamber Console (Evidence EVD-007).'
  },

  // CAT-05: SCIENCE
  'SCI-01': {
    id: 'SCI-01',
    categoryId: 'SCIENCE',
    title: 'SYNTHETIC SILICATE LASER TRAPPING',
    refCode: 'ARCH-SCI-001',
    content: `Experimental methodology using continuous wave laser traps to suspend synthetic mineral lattice structures in ultra-high vacuum. Developed by Dr. Corri in 3012 to measure phonon-lattice interactions in ACF 01 without environmental dampening.`,
    footnote: 'Lab Protocol #LP-3012-CORRI.'
  },
  'SCI-02': {
    id: 'SCI-02',
    categoryId: 'SCIENCE',
    title: 'SUB-ACOUSTIC HYDROPHONE TELEMETRY',
    refCode: 'ARCH-SCI-002',
    content: `Hydrophone telemetry records continuous 0.04 Hz sub-harmonic vibration paired with 14.8 kHz stridulation bursts. Originates from the subterranean ARC matrix where KHYRA's chitinous structures resonate against the basalt floor.`,
    footnote: 'Marine Telemetry Report #MTR-3012.'
  },

  // CAT-06: ACF 01
  'ACF-01': {
    id: 'ACF-01',
    categoryId: 'ACF 01',
    title: 'SPECIMEN ACF-01 (DISCOVERED 3012)',
    refCode: 'ARCH-ACF-001',
    content: `Anomalous Celestial Fragment 01 (ACF 01) is a synthetic/anomalous crystalline specimen discovered in early 3012. 
Exhibits autonomous piezoelectric oscillation and geometric organic filament growth when energized by coherent optical beams. Led directly to Halionite research and the KHYRA biological engineering project.`,
    footnote: 'Evidence EVD-003 // Raman Index.'
  },

  // CAT-07: HALIONITE
  'HAL-01': {
    id: 'HAL-01',
    categoryId: 'HALIONITE',
    title: 'HALIONITE (HAL) RESEARCH & "THE FIRST CRACK"',
    refCode: 'ARCH-HAL-001',
    content: `Halionite (HAL) was synthesized through research derived from ACF 01.
"The First Crack" represents the initial recorded anomaly in Containment Cell #3 in Level 02: a 34.2°/hr phase shift where the mineral broke calibrated equilibrium and began emitting autonomous harmonic pulses.`,
    footnote: 'Lab Anomaly Log #HAL-CELL-03.'
  },

  // CAT-08: ARC
  'ARC-01': {
    id: 'ARC-01',
    categoryId: 'ARC',
    title: 'ACOUSTIC RESONANCE CHAMBER (ARC)',
    refCode: 'ARCH-ARC-001',
    content: `Activated on 16 May 3012, the ARC was constructed inside the subterranean ocean-floor basalt void beneath Quassar Observatory. Designed to isolate and amplify deep acoustic frequencies emitted by Halionite matrices.`,
    footnote: 'ARC Activation Record, 16 May 3012.'
  },

  // CAT-09: KHYRA
  'KHY-01': {
    id: 'KHY-01',
    categoryId: 'KHYRA',
    title: 'PROJECT KHYRA & PLANTHOPPER MOTIF',
    refCode: 'ARCH-KHY-001',
    content: `Project KHYRA was a biological engineering project initiated in mid-3012 under Dr. Corri. 
The organism's morphology is built upon the biomechanics of fulgoromorph insects (planthoppers): micro-gear intermeshing legs, ultra-hard chitinous carapaces, and acoustic stridulation organs capable of shattering synthetic crystal matrices. Produces highly lethal neuro-toxic venom.`,
    footnote: 'Xenobiological Profile #KHY-3012.'
  },
  'KHY-02': {
    id: 'KHY-02',
    categoryId: 'KHYRA',
    title: 'PROTOCOL EPSILON-KHYRA CONTAINMENT',
    refCode: 'ARCH-KHY-002',
    content: `The emergency containment protocol enacted by Dr. Corri on 17 October 3012. Directs all facility power to seal the subterranean tungsten blast gates, lock the elevator shafts, and sever external telemetry to contain KHYRA within the basalt void.`,
    footnote: 'Containment Directive #ECD-3012-EPSILON.'
  },

  // CAT-10: INCIDENT
  'INC-01': {
    id: 'INC-01',
    categoryId: 'INCIDENT',
    title: 'THE 17 OCTOBER 3012 CONTAINMENT FAILURE',
    refCode: 'ARCH-INC-001',
    content: `At 04:12 UTC on 17 October 3012, KHYRA broke primary vacuum isolation in the XP Experiment Chamber.
Dr. Corri entered the chamber gantry, manually tripped the hydraulic interlocks, and sealed the subterranean doors from within. Dr. Corri was envenomated during the action and died at the console, successfully preventing KHYRA from reaching the surface corridors.`,
    footnote: 'Incident Forensic Dossier #INC-3012-10-17.'
  },

  // CAT-11: EVIDENCE
  'EVD-ARCH-01': {
    id: 'EVD-ARCH-01',
    categoryId: 'EVIDENCE',
    title: 'FORENSIC EVIDENCE SAMPLING LOG',
    refCode: 'ARCH-EVD-001',
    content: `Catalog of verified forensic samples:
- EVD-000: Bureau Directive #3012-QS
- EVD-001: Severed Cryo-Data Umbilical
- EVD-002: Blackout Log (17 Oct 3012)
- EVD-003: ACF-01 Spectrometry Report
- EVD-004: Dr. Corri's Terminal Notes
- EVD-005: Sublevel Blast Door Chitin Resin
- EVD-006: Sublevel Bio-Silicate Scale Traces
- EVD-007: Dr. Corri's Death Certificate & Seal Record`,
    footnote: 'Evidence Matrix Record.'
  },

  // CAT-12: AGENT DISCOVERIES
  'AGD-01': {
    id: 'AGD-01',
    categoryId: 'AGENT DISCOVERIES',
    title: 'ADITYA — STRUCTURAL STABILITY TELEMETRY',
    refCode: 'ARCH-AGD-001',
    content: `"Aditya: The 3010 concrete foundation piles are intact. However, the subterranean basalt cavern has experienced structural entropy. The blast door held on 17 Oct 3012, but the seals are encrusted with bio-silicate chitin."`,
    footnote: 'Agent 02 Field Feed.'
  },
  'AGD-02': {
    id: 'AGD-02',
    categoryId: 'AGENT DISCOVERIES',
    title: 'KAYLANI — KHYRA BIO-SPECTRAL CONFIRMATION',
    refCode: 'ARCH-AGD-002',
    content: `"Kaylani: Raman spectra from the Sublevel confirm Dr. Corri's notes. KHYRA synthesizes chitin without DNA replication, using ACF-01 phonon resonance. Dr. Corri's sacrifice prevented a catastrophic oceanic biological breach."`,
    footnote: 'Agent 03 Field Feed.'
  }
};
