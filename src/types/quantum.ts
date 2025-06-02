
export interface TimelineState {
  probability: number;
  stability: number;
  convergence: number;
  branchingFactor: number;
  currentTimestamp: number;
}

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

export interface DimensionalProperties {
  id: string;
  name: string;
  stability: number;
  energy: number;
  resonance: number;
}

export interface QuantumError {
  id: string;
  type: string;
  message: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  timestamp: number;
  context?: any;
}
