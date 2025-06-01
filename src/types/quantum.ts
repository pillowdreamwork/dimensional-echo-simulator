import { RitualQuantumState } from './ritual';

// Core quantum mechanics types
export interface QuantumState {
  // Base state properties
  state: string;
  probability: number;
  coherence: number;       // 0-1: Quantum state coherence level
  entanglement: number;    // 0-1: Degree of quantum entanglement
  superposition: number;   // 0-1: Superposition state magnitude
  phase: number;          // 0-2π: Quantum phase angle
  
  // Dimensional properties
  dimensionalResonance: number;  // 0-1: Resonance with current dimension
  dimensionalStability: number;  // 0-1: Overall stability
  dimensionalShift: number;      // Current shift amount
  
  // State probabilities
  alpha: number;   // Reality Prime probability
  beta: number;    // Dreamfield probability
  gamma: number;   // Symbolic Realm probability
  delta: number;   // Echo Space probability
  
  // Metadata
  isCollapsed: boolean;
  collapseTimestamp: number;
  
  // Stability metrics
  stabilityFactor: number;
  entanglementStrength: number;
  aethericResonance: number;
  timelineConvergence: number;
}

export type QuantumStateUpdate = Partial<QuantumState>;

export interface QuantumMetrics {
  coherence: number;
  entanglement: number;
  stability: number;
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

// Factory function for creating initial quantum state
export const createInitialQuantumState = (): QuantumState => ({
  // Base state properties
  state: 'coherent',
  probability: 1,
  coherence: 1,
  entanglement: 0,
  superposition: 0,
  phase: 0,
  
  // Dimensional properties
  dimensionalResonance: 1,
  dimensionalStability: 1,
  dimensionalShift: 0,
  
  // State probabilities
  alpha: 0.25,
  beta: 0.25,
  gamma: 0.25,
  delta: 0.25,
  
  // Metadata
  isCollapsed: false,
  collapseTimestamp: Date.now(),
  
  // Stability metrics
  stabilityFactor: 1,
  entanglementStrength: 0,
  aethericResonance: 1,
  timelineConvergence: 1
});
