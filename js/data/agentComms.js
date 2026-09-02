/**
 * QUASSAR SANCTUM - Agent Synchronization & Confidential Letters Dataset
 * Canon-aligned: 3010-3012 Timeline, Dr. Corri, ACF 01, HAL, ARC, KHYRA.
 */

export const AGENT_TEAM = [
  {
    id: 'agent_01',
    code: 'AGENT 01',
    name: 'K. VANCE', // dynamic from state
    role: 'Lead Forensic Investigator',
    status: 'ACTIVE // IN SITE',
    avatarColor: 'var(--green-glow)'
  },
  {
    id: 'agent_02',
    code: 'AGENT 02',
    name: 'ADITYA',
    role: 'Systems Architecture & Physical Forensics',
    status: 'ACTIVE // PERIMETER SUB-GRID',
    avatarColor: 'var(--cyan-primary)'
  },
  {
    id: 'agent_03',
    code: 'AGENT 03',
    name: 'KAYLANI',
    role: 'Xenobiology & Spectrographic Forensics',
    status: 'ACTIVE // VENTILATION & INTAKE',
    avatarColor: 'var(--amber-glow)'
  }
];

export const AGENT_COMMS = [
  {
    id: 'COMM-01',
    type: 'transmission',
    sender: 'ADITYA [AGENT 02]',
    senderClass: 'aditya',
    timestamp: '3012.10.28 — 03:45:10 UTC',
    subject: 'Sub-Sea Conduit Acoustic Rupture Analysis',
    body: `Vance, I examined the severed sub-sea fiber umbilical at the eastern seawall. The fracture matches the 17 October 3012 timestamp. The glass fibers were shattered from an ultra-fast internal acoustic standing wave.

The resonance matches the subterranean ARC matrix activated on 16 May 3012. Dr. Corri's power shunt on Oct 17 saved the surface grid, but whatever is sealed in Sublevel -1 is still vibrating. Watch the telemetry as you enter the Hub.`,
    archiveRef: 'AGD-01'
  },
  {
    id: 'COMM-02',
    type: 'transmission',
    sender: 'KAYLANI [AGENT 03]',
    senderClass: 'kaylani',
    timestamp: '3012.10.28 — 03:48:22 UTC',
    subject: 'Intake Filter Residue // Chitin-Silicate Polymers',
    body: `I pulled the primary air intake filters on the southern face. They're clogged with microscopic shed chitin scales.

Raman spectroscopy matches planthopper (Issidae) morphology cross-linked with ACF-01 silicate tetrahedra. Dr. Corri's cleanroom notes in Sector B should hold the initial growth equations. If KHYRA's venom profile is recorded in the XP Chamber, we need to extract that telemetry before sealing the facility.`,
    archiveRef: 'AGD-02'
  },
  {
    id: 'COMM-03',
    type: 'letter', // PLAYER-ONLY CONFIDENTIAL LETTER
    sender: 'CONFIDENTIAL // INBOX (AGENT 01 ONLY)',
    senderClass: 'letter',
    timestamp: 'PRIOR TO DISPATCH // 3012.10.28 — 02:15:00 UTC',
    subject: 'DIRECTIVE #3012-QS: Dr. Corri Containment Verification',
    body: `Vance,

This directive is for your terminal eyes only. Do not sync this memo to Agent Aditya or Agent Kaylani.

On 17 October 3012, Dr. Corri enacted emergency Protocol Epsilon-KHYRA and remained inside the XP Experiment Chamber to seal the hydraulic blast doors from within, dying of KHYRA venom.

Your primary mission is to verify the seal, recover Dr. Corri's death certificate and research tokens, and make the final operational decision:

ROUTE X (PROTOCOL ALPHA): Permanent acoustic dampening and complete sub-oceanic quarantine.
ROUTE Y (PROTOCOL OMEGA): Extraction of Dr. Corri's uncorrupted ACF-01 research & venom neutralization data for Bureau archives.

Trust your forensic deduction.

— Bureau Director`,
    isConfidential: true
  }
];
