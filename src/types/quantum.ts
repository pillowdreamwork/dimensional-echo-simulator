import { RitualQuantumState } from './ritual';

// Core quantum mechanics types
export interface BaseQuantumState {
  state: string;
  probability: number;
  coherence: number;       // 0-1: Quantum state coherence level
  entanglement: number;    // 0-1: Degree of quantum entanglement
  superposition: number;   // 0-1: Superposition state magnitude
  phase: number;           // 0-2π: Quantum phase angle
  dimensionalResonance: number; // 0-1: Resonance with current dimension
  aethericResonance: number;
  dimensionalStability: number;
  timelineConvergence: number;
  stateVector: number[];
  entanglementMap: Map<string, number>;
  collapseHistory: string[];
}

export interface QuantumState extends BaseQuantumState {
  // Ritual state
  activeRitualId?: string;
  lastEvolvedRitualId?: string;
  dimensionalShift: number;
  ritualParticipants: {
    [ritualId: string]: {
      [participantId: string]: {
        lastActive: number;
        connected: boolean;
      };
    };
  };

  // Reality anchors
  realityAnchors: {
    primary: string;
    secondary: string[];
    strength: number;
  };
  quantumSignature: {
    hash: string;
    timestamp: number;
    validityPeriod: number;
  };
  forgeMetadata: {
    version: string;
    lastModified: number;
    stabilityIndex: number;
    energyConsumption: number;
  };
}

export type ExtendedQuantumState = QuantumState & RitualQuantumState;

export const createInitialQuantumState = (): QuantumState => ({
  state: 'coherent',
  probability: 1,
  coherence: 1,
  entanglement: 0,
  superposition: 0,
  phase: 0,
  dimensionalResonance: 1,
  aethericResonance: 1,
  dimensionalStability: 1,
  timelineConvergence: 1,
  stateVector: [],
  entanglementMap: new Map(),
  collapseHistory: [],
  dimensionalShift: 0,
  ritualParticipants: {},
  realityAnchors: {
    primary: '',
    secondary: [],
    strength: 1
  },
  quantumSignature: {
    hash: '',
    timestamp: Date.now(),
    validityPeriod: 3600000 // 1 hour
  },
  forgeMetadata: {
    version: '1.0.0',
    lastModified: Date.now(),
    stabilityIndex: 1,
    energyConsumption: 0
  }
});

export interface DimensionalProperties {
  level: number;              // 1-12: Current dimension level
  resonance: number;         // 0-100: Resonance with target dimension
  stability: number;         // 0-100: Stability of dimensional state
  harmonics: string[];       // Active dimensional harmonics
  entanglement: number;      // 0-100: Quantum entanglement degree
  phaseAlignment: number;    // 0-100: Phase alignment with dimension
}

export interface TimelineState {
  probability: number;
  stability: number;
  convergence: number;
  branchingFactor: number;
  currentTimestamp: number;
}

export type DimensionalEffect = {
  description: string;
  intensity: number;
  dimensionChange?: number;
  timelineImpact?: number;
  resonanceShift?: number;
  stabilityChange?: number;
};

export type SymbolAnalysis = {
  effect: string;
  dimensionalEffect?: string;
  potentialShift?: number;
};

export type RitualResult = {
  outcome: string;
  dimensionalShift: number;
  timelineEffect: string;
  energyImpact: number;
};

export type ArchetypeInteraction = {
  response: string;
  insight: string;
  dimensionalAffinity: number;
};

export type TimelineRipple = {
  primaryEffect: string;
  secondaryEffects: string[];
  branchFactor: number;
  stabilityImpact: number;
};

export interface DreamSymbol {
    id: string;
    pattern: string;
    resonance: number;
    metadata: {
        origin: string;
        timestamp: number;
        quantumSignature: string;
    };
}

export interface CompilationResult {
    symbolId: string;
    quantumState: {
        coherence: number;
        entanglement: number;
        superposition: number;
    };
    resonance: number;
    timestamp: number;
}

export interface ResonancePattern {
    frequency: number;
    amplitude: number;
    phase: number;
    harmonics: number[];
}

export interface AethericForgeConfig {
  resonanceThreshold: number;    // Minimum resonance required for forge operations
  stabilityMinimum: number;     // Minimum stability required
  coherenceTarget: number;      // Target coherence level
  harmonicAlignment: number;    // Required harmonic alignment
  quantumFieldStrength: number; // Base quantum field strength
  dimensionalTolerance: number; // Maximum dimensional variation allowed
}

export type QuantumOperationResult = {
  success: boolean;
  quantumState: QuantumState;
  dimensionalState: DimensionalProperties;
  timelineState: TimelineState;
  effects: DimensionalEffect[];
  energyCost: number;
  stabilityImpact: number;
};
