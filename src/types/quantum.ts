// Core quantum mechanics types
export interface QuantumState {
  // Core quantum state
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
