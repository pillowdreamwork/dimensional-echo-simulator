import { RitualQuantumState } from './ritual';

// Core quantum mechanics types
export interface QuantumState {
  // Base state properties
  state: 'coherent' | 'decoherent' | 'entangled' | 'stable' | 'unstable';
  probability: number;
  coherence: number;       // 0-1: Quantum state coherence level
  entanglement: number;    // 0-1: Degree of quantum entanglement
  superposition: number;   // 0-1: Superposition state magnitude
  phase: number;          // 0-2π: Quantum phase angle
  
  // Dimensional properties
  dimensionalResonance: number;  // 0-1: Resonance with current dimension
  dimensionalStability: number;  // 0-1: Overall stability
  dimensionalShift: number;      // Current shift amount
  aethericResonance: number;     // 0-1: Resonance with aetheric plane
  timelineConvergence: number;   // 0-1: Timeline stability factor
  
  // State probabilities (must sum to 1)
  alpha: number;   // Reality Prime probability
  beta: number;    // Dreamfield probability
  gamma: number;   // Symbolic Realm probability
  delta: number;   // Echo Space probability
  
  // Metadata
  isCollapsed: boolean;
  isTransitioning: boolean;
  collapseTimestamp: number;
  
  // Stability metrics
  stabilityFactor: number;       // Overall stability factor
  entanglementStrength: number;  // Strength of quantum connections
  lastEvolvedRitualId?: string;  // ID of last evolved ritual
  activeRitualId?: string;       // Currently active ritual ID
  
  // Reality anchors
  realityAnchors: {
    primary: string;
    secondary: string[];
    strength: number;           // 0-1: Anchor strength
  };

  // Quantum signature for validation
  quantumSignature: {
    hash: string;
    timestamp: number;
    validityPeriod: number;    // Duration in milliseconds
  };

  // Forge metadata
  forgeMetadata: {
    version: string;
    lastModified: number;
    stabilityIndex: number;    // 0-1: Forge stability
    energyConsumption: number; // Energy used in operations
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
  aethericResonance: 1,
  timelineConvergence: 1,
  
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
  
  // Reality anchors
  realityAnchors: {
    primary: '',
    secondary: [],
    strength: 1
  },
  
  // Quantum signature
  quantumSignature: {
    hash: '',
    timestamp: Date.now(),
    validityPeriod: 3600000 // 1 hour
  },
  
  // Forge metadata
  forgeMetadata: {
    version: '1.0',
    lastModified: Date.now(),
    stabilityIndex: 1,
    energyConsumption: 0
  }
});
