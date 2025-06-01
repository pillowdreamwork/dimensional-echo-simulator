export interface QuantumState {
  stateVector: number[];
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
  aethericResonance: number;
  dimensionalStability: number;
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
