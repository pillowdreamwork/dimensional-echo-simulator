
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

export interface DreamSymbol {
  id: string;
  symbol: string;
  meaning: string;
  energy: number;
  connections: string[];
  resonance?: number;
  pattern?: string;
  metadata?: {
    origin: string;
    timestamp: number;
    quantumSignature: string;
  };
}

export interface CompilationResult {
  success: boolean;
  output: string;
  errors: string[];
  warnings: string[];
  quantumState?: QuantumState;
}

export interface ValidationResult {
  valid: boolean;
  score: number;
  issues: string[];
  errors: Array<{
    code: string;
    message: string;
    severity: 'error' | 'warning';
    field: string;
  }>;
  warnings: Array<{
    code: string;
    message: string;
    field: string;
    threshold: number;
    actualValue: number;
  }>;
  metrics: {
    coherenceScore: number;
    stabilityScore: number;
    integrityScore: number;
    overallHealth: number;
  };
  results: Array<{
    name: string;
    success: boolean;
    duration: number;
    metrics: {
      stability: number;
      performance: number;
    };
    error?: Error;
  }>;
}

export interface ConnectionState {
  status: 'connected' | 'connecting' | 'disconnected' | 'error';
  lastConnected?: Date;
  reconnectAttempts?: number;
  latency?: number;
  error?: string;
}
