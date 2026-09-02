/**
 * QUASSAR SANCTUM - Forensic Evidence Dataset
 * Canon-aligned: 3010-3012 Timeline, Dr. Corri, ACF 01, HAL, ARC, KHYRA.
 */

export const EVIDENCE_ITEMS = {
  'EVD-000': {
    id: 'EVD-000',
    title: 'BUREAU INVESTIGATION DIRECTIVE #3012-QS',
    category: 'PROTOCOL',
    locationFound: 'INVESTIGATOR CONSOLE (PRE-DROP)',
    discovered: true,
    summary: 'Forensic mandate authorizing Agent 01 (Vance), Agent 02 (Aditya), and Agent 03 (Kaylani) to investigate the sudden telemetry blackout of Quassar Observatory following the 17 October 3012 containment event.',
    forensicNotes: 'Objective: Reconstruct facility state, verify Dr. Corri\'s containment measures, and determine whether Specimen ACF-01 and Project KHYRA remain contained.'
  },
  'EVD-001': {
    id: 'EVD-001',
    title: 'SEVERED CRYO-DATA UMBILICAL SPECIMEN',
    category: 'INFRASTRUCTURE',
    locationFound: 'ISLAND PERIMETER (LEVEL 00)',
    discovered: false,
    summary: '64-core oceanic cryogenic data cable severed at 45° angle at 04:12:09 UTC, 17 Oct 3012.',
    forensicNotes: 'Internal glass cores display residual high-frequency ionization. The fracture was caused by an internal acoustic resonance surge originating from the subterranean ARC matrix.'
  },
  'EVD-002': {
    id: 'EVD-002',
    title: 'FACILITY BLACKOUT TELEMETRY LOG',
    category: 'SYSTEM DATA',
    locationFound: 'CENTRAL HUB TERMINAL (LEVEL 01)',
    discovered: false,
    summary: 'Log documenting deliberate auxiliary power diversion from surface sectors directly into Sublevel -1 at 04:12:18 UTC, 17 Oct 3012.',
    forensicNotes: 'Power was manually drawn down by Dr. Corri to energize the emergency hydraulic blast locks of Containment Zone S-14.'
  },
  'EVD-003': {
    id: 'EVD-003',
    title: 'ACF-01 CRYSTALLINE SPECTROMETRY REPORT',
    category: 'SCIENTIFIC SAMPLE',
    locationFound: 'RESEARCH LAB (LEVEL 02)',
    discovered: false,
    summary: 'Raman spectroscopy data from crystal ACF-01 discovered in 3012, showing autonomous organic-silicate lattice formation.',
    forensicNotes: 'The synthetic crystal developed micro-chitinous filaments matching fulgoromorph (planthopper) vibrational resonance mechanics.'
  },
  'EVD-004': {
    id: 'EVD-004',
    title: 'DR. CORRI\'S FINAL RESEARCH TERMINAL LOG',
    category: 'PERSONNEL LOGS',
    locationFound: 'STAFF QUARTERS (LEVEL 01)',
    discovered: false,
    summary: 'Personal reflections from Principal Investigator Dr. Corri regarding KHYRA\'s biological engineering escalation.',
    forensicNotes: '"16 May 3012: The ARC chamber activated today. The resonance from ACF-01 is not static. It is communicating with the organic tissue of KHYRA."'
  },
  'EVD-005': {
    id: 'EVD-005',
    title: 'SUBLEVEL BLAST DOOR CHITIN RESIN',
    category: 'BIO-PHYSICAL',
    locationFound: 'SUBLEVEL BLAST GATE (LEVEL -01)',
    discovered: false,
    summary: 'Dark crystalline resin encrusting the hydraulic seams of the Level -01 tungsten blast door.',
    forensicNotes: 'Hybrid material composed of biological insectoid chitin cross-linked with silicate tetrahedra (Mohs hardness 8.5).'
  },
  'EVD-006': {
    id: 'EVD-006',
    title: 'SUBLEVEL BIO-SILICATE SCALE TRACES',
    category: 'XENOBIOLOGY',
    locationFound: 'SUBLEVEL LOGISTICS CORRIDOR (LEVEL -01)',
    discovered: false,
    summary: 'Microscopic shed chitinous scales recovered from the ventilation ducts of the Sublevel corridor.',
    forensicNotes: 'Structure displays micro-gear tooth intermeshing identical to planthopper nymphs, scaled to macro-biological dimensions.'
  },
  'EVD-007': {
    id: 'EVD-007',
    title: 'DR. CORRI\'S DEATH CERTIFICATE & SEAL RECORD',
    category: 'INCIDENT LOGS',
    locationFound: 'XP EXPERIMENT CHAMBER (LEVEL -01)',
    discovered: false,
    summary: 'Medical telemetry transcript recording Dr. Corri\'s final containment override and fatal KHYRA venom exposure on 17 October 3012.',
    forensicNotes: 'Dr. Corri successfully engaged Protocol Epsilon-KHYRA to seal the chamber from within before succumbing to neuro-toxic venom.'
  }
};
