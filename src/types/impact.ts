export interface DimensionalImpact {
  id: string;
  timestamp: string;
  action: string;
  effects: Array<{
    dimension: string;
    intensity: number;
    description: string;
    type: 'TURBULENCE' | 'FREQUENCY_SHIFT' | 'ANOMALY' | 'STABILIZATION';
  }>;
  dimensionalCode: string;
  targetDimension: string; // Added missing property
  verificationStatus: 'PENDING' | 'VERIFIED' | 'UNVERIFIED';
}

export interface RealityImpactResult {
  stability: number;
  coherence: number;
  entanglement: number;
  timelineEffect?: string;
  dimensionalShift?: number;
}

export interface ImpactProcessOptions {
  quantumState: QuantumState;
  effects: DimensionalEffect[];
}

export interface RealityImpact {
  processImpact: (options: ImpactProcessOptions) => Promise<RealityImpactResult>;
  calculateStability: (state: QuantumState) => number;
}

export interface RealityFeedback {
  nodeType: 'HOSTILE' | 'ELEVATION' | 'RESTORATION' | 'UNKNOWN';
  source: 'DARKWEB' | 'SOCIAL' | 'SATELLITE' | 'LOCAL_NEWS';
  content: string;
  confidence: number;
  timestamp: string;
  keywords: string[];
}

export interface PersonalEffect {
  type: 'DREAMSCAPE' | 'NUMEROLOGY' | 'ARCHETYPE' | 'SYNCHRONICITY' | 'EMOTIONAL_SURGE';
  description: string;
  intensity: number;
  timestamp: string;
  relatedRitual?: string;
  frequency?: number;
}
