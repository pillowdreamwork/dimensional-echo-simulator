
export interface QuantumState {
  stateVector: number[];
  probability: number;
  entanglementMap: Map<string, number>;
  collapseHistory: string[];
  state: string;
  coherence: number;
  entanglement: number;
  entanglementStrength: number; // Added missing property
  superposition: number;
  phase: number;
  dimensionalResonance: number;
  aethericResonance: number;
  dimensionalStability: number;
  timelineConvergence: number;
  activeRitualId?: string;
  lastEvolvedRitualId?: string;
  lastGeneratedArchetype?: string; // Added for ArchetypeCustomizer
  lastEvolvedArchetype?: string; // Added for ArchetypeCustomizer
  lastSymbolAnalysis?: string; // Added for DreamSymbolWorkbench
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
  insight: string; // Added missing property
  effect: string; // Added missing property
  resonance: number;
  dimensional_links: string[];
}

export interface PerformanceMetrics {
  now: number; // Added missing property
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
