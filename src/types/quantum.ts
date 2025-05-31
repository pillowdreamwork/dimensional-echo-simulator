// Core quantum mechanics types
export interface QuantumState {
  superposition: number;       // 0-100: Degree of quantum superposition
  coherence: number;          // 0-100: Quantum coherence level
  entanglementStrength: number; // 0-100: Strength of quantum entanglement
  phase: number;             // 0-360: Quantum phase in degrees
  spin: -1 | 0 | 1;         // Quantum spin state
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
  branchFactor: number;      // Number of active timeline branches
  stabilityIndex: number;    // 0-100: Timeline stability
  convergencePoint: number;  // 0-1: Probability of timeline convergence
  divergenceDegree: number; // 0-100: Degree of timeline separation
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

// Update existing QuantumState interface to include more properties
export interface QuantumState {
    state: string;
    probability: number;
    coherence: number;
    entanglement: number;
    superposition: number;
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
