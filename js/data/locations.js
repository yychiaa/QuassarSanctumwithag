/**
 * QUASSAR SANCTUM - Location Definitions & Interactive POIs
 * Fully canon-compliant: Built 9 April 3010, ACF 01 (3012), ARC (16 May 3012), 
 * KHYRA Containment Failure (17 Oct 3012), Dr. Corri's sacrifice.
 */

export const LOCATIONS = {
  island_exterior: {
    id: 'island_exterior',
    code: 'SEC-00 // EXT-01',
    name: 'ISLAND PERIMETER & QUASSAR DOME',
    level: 'LEVEL 00 — SURFACE BASTION',
    bgImage: 'assets/images/island_exterior.jpg',
    description: 'Harsh concrete bastion in the sub-arctic ocean. Completed 9 April 3010, the monolithic Quassar Observatory dome towers over turbulent waters. Heavy umbilical power conduits lie severed along the wet seawall from the 17 October 3012 incident.',
    systemStatus: 'NOMINAL (COLD)',
    entropyDelta: 0,
    pois: [
      {
        id: 'poi_isl_umbilical',
        title: 'SEVERED CRYO-DATA UMBILICAL',
        subtitle: 'Sub-Sea Fiber Conduit #07 // Ruptured 17 Oct 3012',
        x: 48,
        y: 72,
        status: 'DEGRADED',
        isAnomaly: true,
        macroImage: 'assets/images/severed_cable.jpg',
        telemetry: {
          'SPECIMEN': 'Multicore Glass Fiber / Cryo-Armor',
          'CONTINUITY': '0.00% [SEVERED 17 OCT 3012]',
          'SPECTRAL TRANSMISSION': 'ZERO SIGNAL',
          'CORE DAMAGE': 'Acoustic Shock Shearing @ 45°',
          'RESIDUAL PHOSPHOR': 'ARC Sub-Harmonic Emission'
        },
        observation: 'The heavy cryogenic fiber-optic data umbilical connecting Quassar Observatory to the mainland array was cleanly sheared on 17 October 3012. Internal glass cores exhibit faint phosphorescent ionization from the subterranean ARC matrix discharge.',
        systemData: [
          'LOG 3012.10.17 04:12:09 — Optical sync loss on Lines 01 through 64.',
          'DIAGNOSTIC: Acoustic resonance wave shattered glass cores synchronously.',
          'EVIDENCE RECORD CREATED: EVD-001 (Severed Cryo-Data Umbilical).'
        ],
        evidenceId: 'EVD-001',
        archiveId: 'FAC-03',
        actionType: 'analyze_spectrum',
        actionLabel: 'ANALYZE RESIDUAL EMISSION'
      },
      {
        id: 'poi_isl_dome',
        title: 'OBSERVATORY OPTICAL DOME',
        subtitle: 'Built 9 April 3010 // Deep-Matrix Spectral Array',
        x: 65,
        y: 26,
        status: 'STANDBY',
        isAnomaly: false,
        macroImage: 'assets/images/island_exterior.jpg',
        telemetry: {
          'DOME APERTURE': 'Sealed [Hydraulic Interlock]',
          'OPTICAL ARRAY': 'Inertial Gyro Locked',
          'FOUNDATION DATE': '09 April 3010',
          'ATMOSPHERIC SHIELD': 'Active'
        },
        observation: 'The geometric reinforced dome housing the primary multi-frequency optical telescope constructed in 3010. Its heavy aperture shutters are locked in standby mode.',
        systemData: [
          'Primary optical collectors are configured for deep-matrix scintillation measurement.',
          'Telemetry routed to Central Research Wing (Level 02).'
        ],
        archiveId: 'FAC-01'
      },
      {
        id: 'poi_isl_sensor',
        title: 'PERIMETER SEISMIC / ACOUSTIC ARRAY',
        subtitle: 'Geophone Sensor Mast Alpha',
        x: 41,
        y: 40,
        status: 'ONLINE',
        isAnomaly: false,
        macroImage: 'assets/images/island_exterior.jpg',
        telemetry: {
          'SENSOR TYPE': 'Tri-Axial Broadband Geophone',
          'SAMPLING FREQ': '10,000 Hz',
          'BASELINE NOISE': '3.2 micro-g (Wave action)',
          'SUB-ACOUSTIC PULSE': 'ARC Subterranean Resonance'
        },
        observation: 'Marine-grade seismic sensor bolted to the 3010 concrete bastion. Detects continuous oceanic wave impact paired with an ultra-low frequency pulse originating from the subterranean ARC basalt void.',
        systemData: [
          'HARMONIC DISCOVERY: Sub-acoustic pulse matches ARC chamber activation of 16 May 3012.'
        ],
        archiveId: 'SCI-02'
      },
      {
        id: 'poi_isl_airlock',
        title: 'PRIMARY SECURITY AIRLOCK PORTAL',
        subtitle: 'Sector A Main Ingress Bulkhead',
        x: 83,
        y: 52,
        status: 'RESTRICTED',
        isAnomaly: false,
        macroImage: 'assets/images/facility_hub.jpg',
        telemetry: {
          'LOCK MECHANISM': 'Dual Heavy Deadbolt / Hydraulic',
          'CARD READER': 'Forensic Override Enabled',
          'CHAMBER PRESSURE': '1.013 bar [STABLE]'
        },
        observation: 'Heavy pressure-sealed titanium entrance portal leading into the Central Logistics Hub. The electronic lock is pulsing with forensic standby current.',
        systemData: [
          'ACCESS GRANTED via Investigator Master Keycard Protocol.'
        ],
        actionType: 'unlock_door',
        actionLabel: 'ENGAGE FORENSIC OVERRIDE & ENTER HUB',
        unlockTarget: 'hub_main_airlock'
      }
    ],
    destinations: [
      { id: 'facility_hub', label: 'ENTER CENTRAL HUB', doorLock: 'hub_main_airlock' }
    ]
  },

  facility_hub: {
    id: 'facility_hub',
    code: 'SEC-01 // HUB-MAIN',
    name: 'CENTRAL LOGISTICS & RECEPTION HUB',
    level: 'LEVEL 01 — RECEPTION & CIRCULATION',
    bgImage: 'assets/images/facility_hub.jpg',
    description: 'Monolithic concrete circulation atrium. Directional signs hang above steel corridors. Central diagnostic pillar hums on emergency current maintained since the 17 October 3012 incident.',
    systemStatus: 'DEGRADED',
    entropyDelta: 5,
    pois: [
      {
        id: 'poi_hub_terminal',
        title: 'CENTRAL DIAGNOSTIC PILLAR',
        subtitle: 'Logistics Telemetry Terminal 01',
        x: 51,
        y: 64,
        status: 'ACTIVE',
        isAnomaly: false,
        macroImage: 'assets/images/facility_hub.jpg',
        telemetry: {
          'HOST': 'QS-NET-HUB-01',
          'OS': 'QUASSAR-KERNEL v4.19-RT',
          'BLACKOUT TIMESTAMP': '3012.10.17 04:12:18 UTC',
          'DIRECTIVE': 'Dr. Corri Manual Emergency Shunt'
        },
        observation: 'Central diagnostic terminal operational on battery reserves. Logs reveal Dr. Corri deliberately diverted auxiliary power down to Sublevel -1 to seal Containment Zone S-14 on 17 October 3012.',
        systemData: [
          'BLACKOUT LOG 3012.10.17 04:12:18 — Power diverted to Sublevel Containment by Dr. Corri.',
          'FACILITY MAP UPDATED: Staff Quarters (Open), Research Wing (Power Tripped), Sublevel Gate (Interlocked).'
        ],
        evidenceId: 'EVD-002',
        archiveId: 'FAC-02'
      },
      {
        id: 'poi_hub_power_relay',
        title: 'AUXILIARY POWER DISTRIBUTION RELAY',
        subtitle: 'Substation Circuit Breaker Panel B-4',
        x: 48,
        y: 38,
        status: 'DEGRADED',
        isAnomaly: true,
        macroImage: 'assets/images/facility_hub.jpg',
        telemetry: {
          'VOLTAGE': '480V / 3-PHASE',
          'BREAKER B-4 (RESEARCH WING)': 'TRIPPED [OFFLINE]',
          'BREAKER S-1 (SUBLEVEL)': 'FORCED LOCK BY DR. CORRI',
          'THERMAL STATUS': '58°C [ELEVATED]'
        },
        observation: 'High-voltage breaker matrix. Circuit Breaker B-4 tripped during the 17 October 3012 power surge, cutting power to the Research Lab optical scanner.',
        systemData: [
          'ACTION REQUIRED: Reset breaker B-4 to re-energize Research Wing ingress door.'
        ],
        actionType: 'reset_power',
        actionLabel: 'RESET BREAKER B-4 (RESTORE LAB POWER)'
      },
      {
        id: 'poi_hub_research_door',
        title: 'RESEARCH WING BULKHEAD',
        subtitle: 'Sector B — Cleanroom & Optical Laboratory',
        x: 88,
        y: 58,
        status: 'LOCKED',
        isAnomaly: false,
        macroImage: 'assets/images/research_lab.jpg',
        telemetry: {
          'SECTOR': 'B-RESEARCH',
          'POWER FEED': 'Breaker B-4 Dependent',
          'CLEARANCE REQUIRED': 'Dr. Corri Level 2 Keycard'
        },
        observation: 'Heavy pneumatic sliding door with optical biometric scanner. Requires power restoration from Relay B-4 and Dr. Corri\'s Level 2 Keycard from Staff Quarters.',
        systemData: [
          'STATUS: Powered via Breaker B-4. Access requires Dr. Corri\'s Keycard.'
        ],
        actionType: 'unlock_research',
        actionLabel: 'ENGAGE OPTICAL PASSKEY & UNLOCK LAB',
        unlockTarget: 'hub_research_wing'
      },
      {
        id: 'poi_hub_signage',
        title: 'DIRECTIONAL OVERHEAD SIGNPOST',
        subtitle: 'Facility Sector Routing Index',
        x: 55,
        y: 20,
        status: 'NOMINAL',
        isAnomaly: false,
        macroImage: 'assets/images/facility_hub.jpg',
        telemetry: {
          'SECTOR A': 'Staff Quarters & Logistics',
          'SECTOR B': 'Research Wing & Cleanrooms (Sub-Level 3)',
          'SECTOR C': 'Sublevel Freight & XP Containment'
        },
        observation: 'Overhead illuminated directional matrix showing routes to all primary facility sectors.',
        systemData: [
          'FACILITY LAYOUT RECORD UPDATED IN ARCHIVE.'
        ],
        archiveId: 'LAY-01'
      }
    ],
    destinations: [
      { id: 'island_exterior', label: 'RETURN TO ISLAND PERIMETER' },
      { id: 'staff_wing', label: 'ENTER STAFF QUARTERS & TELEMETRY' },
      { id: 'research_lab', label: 'ENTER ADVANCED RESEARCH LAB', doorLock: 'hub_research_wing' },
      { id: 'sublevel_gateway', label: 'CONTAINMENT GATE (SUBLEVEL -01)' }
    ]
  },

  staff_wing: {
    id: 'staff_wing',
    code: 'SEC-02 // STF-WING',
    name: 'STAFF QUARTERS & TELEMETRY OFFICE',
    level: 'LEVEL 01 — PERSONNEL & COMMS',
    bgImage: 'assets/images/staff_wing.jpg',
    description: 'Quiet, deserted personnel office with acoustic monitoring stations, acoustic foam baffles, lockers, and green phosphorescent terminals used by Dr. Corri\'s research team in 3012.',
    systemStatus: 'ONLINE',
    entropyDelta: 5,
    pois: [
      {
        id: 'poi_stf_datapad',
        title: 'DR. CORRI\'S PERSONAL TERMINAL',
        subtitle: 'Principal Investigator Datastation // 3012',
        x: 12,
        y: 62,
        status: 'ACTIVE',
        isAnomaly: false,
        macroImage: 'assets/images/staff_wing.jpg',
        telemetry: {
          'USER': 'Dr. Corri (Principal Investigator)',
          'LOGS RECOVERED': '08 Entries (May–Oct 3012)',
          'KHYRA NOTES': 'Bio-Silicate Integration'
        },
        observation: 'Personal datastation left powered on. Dr. Corri\'s field notes document the activation of the ARC on 16 May 3012 and the realization that KHYRA was utilizing ACF 01 phonon vibrations to synthesize insectoid chitin.',
        systemData: [
          '"16 May 3012: The ARC chamber activated today. The resonance from ACF-01 is communicating with the organic tissues of KHYRA. It is behaving like an insectoid exoskeleton under acoustic excitation."',
          'DISCOVERY RECORDED: ARCHIVE ENTRY PER-02 & EVD-004.'
        ],
        evidenceId: 'EVD-004',
        archiveId: 'PER-02',
        actionType: 'decrypt_logs',
        actionLabel: 'DECRYPT DR. CORRI\'S RESEARCH LOGS'
      },
      {
        id: 'poi_stf_locker',
        title: 'DR. CORRI\'S SECURITY LOCKER #04',
        subtitle: 'Level 2 Optical Keycard Storage',
        x: 44,
        y: 42,
        status: 'SECURE',
        isAnomaly: false,
        macroImage: 'assets/images/staff_wing.jpg',
        telemetry: {
          'LOCKER ID': 'QS-SEC-LK-04 [DR. CORRI]',
          'CONTENTS': 'Optical Keycard [LEVEL 2 RESEARCH CLEARANCE]',
          'STATE': 'Unlatched'
        },
        observation: 'Metal equipment locker containing cleanroom garments, optical calibration tools, and Dr. Corri\'s Level 2 Research Wing Security Card.',
        systemData: [
          'ITEM ACQUIRED: [Dr. Corri\'s Research Lab Keycard].',
          'Research Lab entrance in Central Hub can now be accessed.'
        ],
        actionType: 'acquire_keycard',
        actionLabel: 'TAKE DR. CORRI\'S KEYCARD'
      },
      {
        id: 'poi_stf_acoustic',
        title: 'ACOUSTIC MONITORING DESK',
        subtitle: 'Deep Sensor Hydrophone Log Desk',
        x: 91,
        y: 60,
        status: 'ONLINE',
        isAnomaly: true,
        macroImage: 'assets/images/staff_wing.jpg',
        telemetry: {
          'CHANNEL 1': 'Oceanic Ambient (48 dB)',
          'CHANNEL 2': 'Sublevel Stridulation (14.8 kHz Peak)',
          'KHYRA SIGNATURE': 'Fulgoromorph Wing Friction / Chitin Resonance'
        },
        observation: 'Hydrophone recording deck monitoring the seabed beneath the observatory. The visualizer displays rhythmic mechanical stridulation pulsing up through the 3010 foundation piles.',
        systemData: [
          'KHYRA MOTIF REGISTERED: Planthopper bio-frequency pattern confirmed.'
        ],
        archiveId: 'KHY-01'
      }
    ],
    destinations: [
      { id: 'facility_hub', label: 'RETURN TO CENTRAL HUB' }
    ]
  },

  research_lab: {
    id: 'research_lab',
    code: 'SEC-03 // LAB-ACF',
    name: 'ADVANCED RESEARCH LAB & SPECTROMETRY',
    level: 'LEVEL 02 — SCIENTIFIC CORE',
    bgImage: 'assets/images/research_lab.jpg',
    description: 'Pristine scientific cleanroom of Quassar Observatory. Slate surfaces, green telemetry monitors, laser diffraction apparatus, and the central ACF-01 crystal containment chamber. Clinical precision reigns, but one corner monitor flickers with an amber anomaly warning.',
    systemStatus: 'FORENSIC NOMINAL // ANOMALY DETECTED',
    entropyDelta: 15,
    pois: [
      {
        id: 'poi_lab_crystal_chamber',
        title: 'ACF-01 CRYSTAL CONTAINMENT CHAMBER',
        subtitle: 'Discovered 3012 // Laser Trap Matrix',
        x: 56,
        y: 45,
        status: 'DEGRADED',
        isAnomaly: true,
        macroImage: 'assets/images/crystal_containment.jpg',
        telemetry: {
          'SAMPLE ID': 'ACF-01 [DISCOVERED 3012]',
          'VACUUM PRESSURE': '2.1 x 10^-8 Torr',
          'LASER POWER': '1.2W / 532nm [ACTIVE]',
          'TRAP STABILITY': '99.7% [STABLE]',
          'ORGANIC FILAMENT': 'POSITIVE [CHITIN LATTICE DETECTED]',
          'RAMAN PEAK': '510 cm^-1 (Reference A)'
        },
        observation: 'The synthetic crystal ACF-01 discovered in 3012 floats suspended in a quad-beam green laser vacuum chamber. High-resolution forensic optics reveal a micro-filament of organic chitinous structure interwoven within the geometric quartz-silicate lattice.',
        systemData: [
          'SPECTRAL ANALYSIS COMPLETE: Specimen exhibits self-induced piezoelectric resonance at 14.8 THz.',
          'EVIDENCE LOGGED: EVD-003 (ACF-01 Crystalline Specimen Analysis).'
        ],
        evidenceId: 'EVD-003',
        archiveId: 'ACF-01',
        actionType: 'analyze_spectrum',
        actionLabel: 'EXECUTE RAMAN SPECTROSCOPIC SCAN'
      },
      {
        id: 'poi_lab_monitors',
        title: 'PRIMARY TELEMETRY CONSOLE',
        subtitle: 'Halionite (HAL) Synthesis Array // 3012',
        x: 10,
        y: 48,
        status: 'NOMINAL',
        isAnomaly: false,
        macroImage: 'assets/images/research_lab.jpg',
        telemetry: {
          'SPECTROMETER 01': 'NOMINAL (532 nm)',
          'SPECTROMETER 02': 'NOMINAL (633 nm)',
          'CRYOGENIC LOOP': '-268.9°C (Liquid Helium)',
          'CALIBRATION DRIFT': '< 0.001 ppm'
        },
        observation: 'High-precision forensic laboratory telemetry. The graphs are rigidly geometric, illustrating the scientific discipline maintained by Dr. Corri\'s team prior to the October 3012 breach.',
        systemData: [
          'SCIENCE ARCHIVE UPDATED: Halionite (HAL) synthesis data.'
        ],
        archiveId: 'SCI-01'
      },
      {
        id: 'poi_lab_amber_monitor',
        title: 'ANOMALY DETECTOR TERMINAL',
        subtitle: '"THE FIRST CRACK" — Containment Cell 3',
        x: 91,
        y: 44,
        status: 'DEGRADED',
        isAnomaly: true,
        macroImage: 'assets/images/research_lab.jpg',
        telemetry: {
          'STATUS': 'WARNING: ANOMALY DETECTED',
          'PHASE DRIFT': '34.2° / hr',
          'SYSTEM LOG': 'CELL-03 SENSOR MATRIX DRIFT',
          'INCIDENT VECTOR': 'Originated in Sublevel ARC Chamber'
        },
        observation: 'While all other monitors display cold green nominal statuses, this single display flashes amber. The containment frequency undergoes an unassisted harmonic shift, breaking the clinical equilibrium.',
        systemData: [
          'CRITICAL FORENSIC INSIGHT: The anomaly originated in the deep Sublevel ARC before propagating into the Research Lab.'
        ],
        archiveId: 'HAL-01',
        actionType: 'record_crack',
        actionLabel: 'LOG THE FIRST CRACK (ANOMALY RECORD)'
      }
    ],
    destinations: [
      { id: 'facility_hub', label: 'RETURN TO CENTRAL HUB' },
      { id: 'sublevel_gateway', label: 'PROCEED TO SUBLEVEL CONTAINMENT GATE' }
    ]
  },

  sublevel_gateway: {
    id: 'sublevel_gateway',
    code: 'SEC-04 // SUB-GATE',
    name: 'SUBLEVEL FREIGHT & CONTAINMENT BLAST GATE',
    level: 'LEVEL -01 // SUBTERRANEAN VOID',
    bgImage: 'assets/images/sublevel_gateway.jpg',
    description: 'Heavy reinforced tungsten blast doors locked with hydraulic deadbolts. Amber warning strobes flash across hazard stripes. Dark organic crystalline resin creeps out from the door seams, marking the threshold of Dr. Corri\'s 17 October 3012 containment seal.',
    systemStatus: 'CONTAINMENT ACTIVE // PROTOCOL EPSILON ENGAGED',
    entropyDelta: 25,
    pois: [
      {
        id: 'poi_sub_blast_door',
        title: 'TUNGSTEN CONTAINMENT BLAST DOORS',
        subtitle: 'Sealed by Dr. Corri on 17 Oct 3012',
        x: 55,
        y: 48,
        status: 'LOCKED',
        isAnomaly: true,
        macroImage: 'assets/images/sublevel_gateway.jpg',
        telemetry: {
          'CONTAINMENT PROTOCOL': 'EPSILON-KHYRA',
          'SEALED BY': 'Dr. Corri (Manual Override 3012.10.17)',
          'HYDRAULIC DEADBOLTS': 'Active (Engaged from within)',
          'INTERNAL PRESSURE': '+0.42 bar (Basalt Cavern)'
        },
        observation: 'Massive blast doors sealing off the subterranean void. The perimeter frame is encrusted with sharp, dark crystalline growths resembling insectoid chitin.',
        systemData: [
          'SYSTEM INTERLOCK: Can be unlatched using Dr. Corri\'s master authorization token.',
          'EVIDENCE LOGGED: EVD-005 (Sublevel Blast Door Chitin Resin).'
        ],
        evidenceId: 'EVD-005',
        archiveId: 'INC-01',
        actionType: 'unlock_sublevel_gate',
        actionLabel: 'ENGAGE DR. CORRI\'S TOKEN & UNLATCH GATE',
        unlockTarget: 'sublevel_gate_unlocked'
      },
      {
        id: 'poi_sub_terminal',
        title: 'SUBLEVEL INTERLOCK TERMINAL',
        subtitle: 'Emergency Containment Station',
        x: 25,
        y: 48,
        status: 'RESTRICTED',
        isAnomaly: true,
        macroImage: 'assets/images/sublevel_gateway.jpg',
        telemetry: {
          'CONTAINMENT STATUS': 'LOCKDOWN IN EFFECT',
          'TIMESTAMP': '3012.10.17 04:12:18 UTC',
          'KHYRA PROTOCOL': 'EPSILON ENGAGED BY DR. CORRI'
        },
        observation: 'The emergency security station for Level -01. The interface confirms that Dr. Corri entered the lower complex and locked the blast doors from the inside to prevent surface breach.',
        systemData: [
          'ARCHIVE SYNC: Protocol Epsilon-KHYRA details recorded.'
        ],
        archiveId: 'KHY-02'
      }
    ],
    destinations: [
      { id: 'facility_hub', label: 'RETURN TO CENTRAL HUB' },
      { id: 'research_lab', label: 'RETURN TO RESEARCH LAB' },
      { id: 'sublevel_interior', label: 'ENTER SUBLEVEL LOGISTICS CORRIDOR', doorLock: 'sublevel_gate_unlocked' }
    ]
  },

  sublevel_interior: {
    id: 'sublevel_interior',
    code: 'SEC-05 // SUB-CORRIDOR',
    name: 'SUBLEVEL LOGISTICS CORRIDOR',
    level: 'LEVEL -01 // STRUCTURAL ENTROPY PHASE 3',
    bgImage: 'assets/images/sublevel_interior.jpg',
    description: 'Deep subterranean logistics corridor leading into the basalt bedrock. Fractured ceiling beams, hanging cable trays, and amber hazard lamps. Dark geometric chitinous formations erupt from the cracked concrete walls.',
    systemStatus: 'PHASE 3 ENTROPY // STRUCTURAL DEGRADATION',
    entropyDelta: 35,
    pois: [
      {
        id: 'poi_sub_corridor_entropy',
        title: 'FRACTURED STRUCTURAL BEAMS & RESIN VEINS',
        subtitle: 'Phase 3 Asymmetrical Degradation',
        x: 32,
        y: 38,
        status: 'UNSTABLE',
        isAnomaly: true,
        macroImage: 'assets/images/sublevel_interior.jpg',
        telemetry: {
          'STRUCTURAL INTEGRITY': '42.1% [CRITICAL ENTROPY]',
          'CHITIN ENLARGEMENT': 'Bio-Silicate Mineralization',
          'ACOUSTIC LOAD': 'Standing 0.04 Hz Sub-Harmonic',
          'SECTOR': 'Sublevel Logistics Corridor S-14'
        },
        observation: 'Concrete load-bearing walls shattered by internal acoustic strain and mineral-organic growth. Dark chitinous resin veins branch through the fractures like petrified insect wings.',
        systemData: [
          'OBSERVATION: KHYRA\'s biological growth has physically colonized the subterranean structural reinforcement.'
        ],
        archiveId: 'KHY-01'
      },
      {
        id: 'poi_sub_intake_filter',
        title: 'SUBLEVEL VENTILATION INTAKE DUCT',
        subtitle: 'Bio-Silicate Scale Accumulation',
        x: 78,
        y: 48,
        status: 'DEGRADED',
        isAnomaly: true,
        macroImage: 'assets/images/sublevel_interior.jpg',
        telemetry: {
          'FILTER MATRIX': 'Shed Bio-Silicate Carapace Scales',
          'MICRO-GEAR TEETH': 'Positive (Issidae Morphology)',
          'SAMPLE RETRIEVAL': 'EVD-006'
        },
        observation: 'Ventilation intake clogged with iridescent, microscopic bio-silicate scale powder shed by KHYRA during the October 3012 containment failure.',
        systemData: [
          'EVIDENCE CATALOGED: EVD-006 (Sublevel Bio-Silicate Scale Traces).'
        ],
        evidenceId: 'EVD-006',
        archiveId: 'KHY-01',
        actionType: 'sample_scale',
        actionLabel: 'COLLECT CARAPACE SCALE SAMPLE'
      },
      {
        id: 'poi_sub_xp_door',
        title: 'XP EXPERIMENT CHAMBER HEAVY ACCESS ARCH',
        subtitle: 'Portal to Dr. Corri\'s Observation Gantry',
        x: 50,
        y: 65,
        status: 'RESTRICTED',
        isAnomaly: false,
        macroImage: 'assets/images/experiment_chamber.jpg',
        telemetry: {
          'SECTOR': 'XP EXPERIMENT CHAMBER & ARC VOID',
          'INTERIOR ATMOSPHERE': 'Anomalous Ionization',
          'DR. CORRI CONSOLE': 'Active on Emergency Shunt'
        },
        observation: 'The final circular hydraulic bulkhead opening directly into the massive subterranean basalt cavern housing the KHYRA containment sphere and Dr. Corri\'s terminal.',
        systemData: [
          'INGRESS VERIFIED: Access to XP Experiment Chamber granted.'
        ]
      }
    ],
    destinations: [
      { id: 'sublevel_gateway', label: 'RETURN TO SUBLEVEL BLAST GATE' },
      { id: 'experiment_chamber', label: 'ENTER XP EXPERIMENT CHAMBER & ARC' }
    ]
  },

  experiment_chamber: {
    id: 'experiment_chamber',
    code: 'SEC-06 // XP-CHAMBER',
    name: 'XP EXPERIMENT CHAMBER & ARC MATRIX',
    level: 'LEVEL -01 // BASALT MATRIX CORE',
    bgImage: 'assets/images/experiment_chamber.jpg',
    description: 'Massive subterranean cavern carved directly into oceanic basalt bedrock. In the center floats the glowing green-amber KHYRA containment matrix sphere. Steel gantry walkways lead to Dr. Corri\'s emergency override console where the final operational protocol must be enacted.',
    systemStatus: 'CRITICAL EQUILIBRIUM // DECISION POINT',
    entropyDelta: 50,
    pois: [
      {
        id: 'poi_xp_khyra_core',
        title: 'KHYRA BIO-SILICATE CONTAINMENT SPHERE',
        subtitle: 'ACF 01 / HAL Resonant Core // Sealed 17 Oct 3012',
        x: 52,
        y: 38,
        status: 'DEGRADED',
        isAnomaly: true,
        macroImage: 'assets/images/experiment_chamber.jpg',
        telemetry: {
          'SPECIMEN': 'Project KHYRA Core Entity',
          'CONTAINMENT STATE': 'Sealed by Dr. Corri\'s Override',
          'RESONANCE': 'ARC 16 May 3012 Baseline Matrix',
          'BIO-SILICATE HARMONICS': 'Stable within 0.04 Hz Envelope',
          'VENOM TOXICITY': 'Neuro-Necrotic (Lethal)'
        },
        observation: 'The heart of Quassar Observatory. Suspended in the center of the basalt cavern, the spherical containment matrix pulses with green and amber refractive light, holding KHYRA in stasis since Dr. Corri\'s sacrifice on 17 October 3012.',
        systemData: [
          'CORE ANALYSIS COMPLETE: KHYRA remains sealed, but the acoustic resonance will eventually degrade the basalt anchors unless a final operational protocol is enacted.'
        ],
        archiveId: 'ARC-01'
      },
      {
        id: 'poi_xp_corri_terminal',
        title: 'DR. CORRI\'S FINAL OVERRIDE CONSOLE',
        subtitle: 'Gantry Security Station // Deceased 17 Oct 3012',
        x: 68,
        y: 52,
        status: 'ACTIVE',
        isAnomaly: false,
        macroImage: 'assets/images/experiment_chamber.jpg',
        telemetry: {
          'STATION USER': 'Dr. Corri [DECEASED 3012.10.17]',
          'CAUSE OF DEATH': 'KHYRA Venom Envenomation',
          'ACTION LOG': 'Protocol Epsilon-KHYRA Engaged 04:12:18 UTC',
          'RECOVERED DATA': 'EVD-007 (Death Certificate & Seal Record)'
        },
        observation: 'The control desk where Dr. Corri made the ultimate sacrifice to seal KHYRA. The terminal contains Dr. Corri\'s final recorded audio transcript, death certificate, and the cryptographic keys for the final facility resolution.',
        systemData: [
          'DR. CORRI RECORD RECOVERED: "I have locked the gates. Seal the island. Trust the telemetry."',
          'EVIDENCE LOGGED: EVD-007 (Dr. Corri\'s Death Certificate & Seal Record).'
        ],
        evidenceId: 'EVD-007',
        archiveId: 'PER-03',
        actionType: 'recover_corri_seal',
        actionLabel: 'AUTHENTICATE DR. CORRI\'S FINAL RECORD'
      },
      {
        id: 'poi_xp_decision_terminal',
        title: 'FACILITY RESOLUTION TERMINAL',
        subtitle: 'FINAL INVESTIGATION DECISION // ROUTE X vs ROUTE Y',
        x: 82,
        y: 45,
        status: 'RESTRICTED',
        isAnomaly: true,
        macroImage: 'assets/images/experiment_chamber.jpg',
        telemetry: {
          'AUTHORIZED INVESTIGATOR': 'AGENT 01 // {AGENT_01}',
          'ROUTE X': 'PROTOCOL ALPHA (Total Oceanic Quarantine & Purge)',
          'ROUTE Y': 'PROTOCOL OMEGA (Scientific Extraction & Memorial Archive)',
          'RESOLUTION STATE': 'Awaiting Agent 01 Protocol Choice'
        },
        observation: 'The central command interface on the gantry. With all forensic evidence gathered and Dr. Corri\'s sacrifice authenticated, Lead Investigator Agent 01 must now select the final operational resolution for Quassar Sanctum.',
        systemData: [
          'CRITICAL ACTION: Enact Route X or Route Y to complete the investigation.'
        ],
        actionType: 'climax_decision',
        actionLabel: 'ENACT FINAL INVESTIGATION PROTOCOL (ROUTE X / Y)'
      }
    ],
    destinations: [
      { id: 'sublevel_interior', label: 'RETURN TO SUBLEVEL CORRIDOR' }
    ]
  }
};
