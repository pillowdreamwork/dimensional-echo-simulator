import type { QuantumState } from './quantum';
import type { DimensionalEffect } from './dimensional';

export interface DimensionalImpact {
  id: string;
  timestamp: string;
  action: string;
  effects: Array<{
    dimension: string;
    intensity: number;      // 0-1: Effect intensity
    description: string;
    type: 'TURBULENCE' | 'FREQUENCY_SHIFT' | 'ANOMALY' | 'STABILIZATION';
    duration?: number;     // Duration in milliseconds
    range?: number;       // Effect range (dimensional units)
  }>;
  dimensionalCode: string;
  targetDimension: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'UNVERIFIED';
  energySignature?: string;
  stabilityMetrics?: {
    localStability: number;    // 0-1: Local stability
    globalStability: number;   // 0-1: Global stability
    timelineStability: number; // 0-1: Timeline stability
  };
}

export interface RealityImpactResult {
  stability: number;       // 0-1: Overall stability
  coherence: number;      // 0-1: Quantum coherence
  entanglement: number;   // 0-1: Entanglement level
  timelineEffect?: string;
  dimensionalShift?: number;
  energyConsumption: number;
  resonancePatterns: string[];
}

export interface ImpactProcessOptions {
  quantumState: QuantumState;
  effects: DimensionalEffect[];
  processingMode?: 'STANDARD' | 'HIGH_PRECISION' | 'ENERGY_EFFICIENT';
  stabilityThreshold?: number;
  maxTimelineDeviation?: number;
}

export interface RealityImpact {
  processImpact: (options: ImpactProcessOptions) => Promise<RealityImpactResult>;
  calculateStability: (state: QuantumState) => number;
  predictTimelineEffects: (impact: DimensionalImpact) => Promise<string[]>;
  optimizeEnergyFlow: (currentState: QuantumState) => Promise<number>;
}

export interface RealityFeedback {
  nodeType: 'HOSTILE' | 'ELEVATION' | 'RESTORATION' | 'UNKNOWN';
  source: 'DARKWEB' | 'SOCIAL' | 'SATELLITE' | 'LOCAL_NEWS';
  content: string;
  confidence: number;
  timestamp: string;
  keywords: string[];
  verificationLevel?: number;
  impactRadius?: number;
}

export interface PersonalEffect {
  type: 'DREAMSCAPE' | 'NUMEROLOGY' | 'ARCHETYPE' | 'SYNCHRONICITY' | 'EMOTIONAL_SURGE';
  description: string;
  intensity: number;      // 0-1: Effect intensity
  timestamp: string;
  relatedRitual?: string;
  frequency?: number;     // Hz if applicable
  duration?: number;      // Duration in milliseconds
  consciousness: number;  // Required consciousness level
}
