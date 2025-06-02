export interface QuantumState {
  stateVector: number[];
import { RitualQuantumState } from './ritual';

// Core quantum mechanics types
export interface QuantumState {
  // Base state properties
  state: string;
  probability: number;
  entanglementMap: Map<string, number>;
  collapseHistory: string[];
  state: string;
  coherence: number;
  entanglement: number;
  entanglementStrength: number;
  superposition: number;
  phase: number;
  dimensionalResonance: number;
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
  activeRitualId?: string;
  lastEvolvedRitualId?: string;
  lastGeneratedArchetype?: string;
  lastEvolvedArchetype?: string;
  lastSymbolAnalysis?: string;
  dimensionalShift: number;
  ritualParticipants: {
    [ritualId: string]: {
      [participantId: string]: {
        lastActive: number;
        connected: boolean;
      };
    };
  };
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

export interface Symbol {
  id: string;
  symbol: string;
  meaning: string;
  energy: number;
  connections: string[];
}

export interface PatternAnalysis {
  pattern: string;
  significance: number;
  interpretation: string;
  insight: string;
  effect: string;
  resonance: number;
  dimensional_links: string[];
}

export interface PerformanceMetrics {
  now: number;
  timestamp: number;
  cpuUsage: number;
  memoryUsage: number;
  networkLatency: number;
  errorRate: number;
  throughput: number;
}

export interface StabilityMetrics {
  temporal: number;
  spatial: number;
  energetic: number;
  coherence: number;
}
}

export type QuantumStateUpdate = Partial<QuantumState>;

export interface QuantumMetrics {
  coherence: number;
  entanglement: number;
  stability: number;
}

export interface DimensionalProperties {
  id: string;
  name: string;
  stability: number;
  energy: number;
  resonance: number;
}

export interface TesseractWeaveEditorProps {
  quantumState: QuantumState;
  dimensionalProperties: DimensionalProperties;
  onStateChange: (state: QuantumState) => void;
  onDimensionalShift: (properties: DimensionalProperties) => void;
}

export interface KarmaVisualizerProps {
  karmaSystem: any;
  logId: string;
}

export interface PerformanceMonitorProps {
  engine: any;
}

export interface TimelineBranchProps {
  engine: any;
}

export interface ErrorMonitorProps {
  errorHandler: any;
}

// Add missing interface for DreamSymbol
export interface DreamSymbol {
  id: string;
  symbol: string;
  meaning: string;
  energy: number;
  connections: string[];
}

// Add missing interface for CompilationResult
export interface CompilationResult {
  success: boolean;
  output: string;
  errors: string[];
  warnings: string[];
}

// Add missing interface for ValidationResult
export interface ValidationResult {
  valid: boolean;
  score: number;
  issues: string[];
  results: Array<{
    test: string;
    passed: boolean;
    message: string;
  }>;
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
