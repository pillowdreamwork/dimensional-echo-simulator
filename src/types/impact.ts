import type { QuantumState, DimensionalEffect } from './quantum';

export interface DimensionalImpact {
  id: string;
  timestamp: string;
  action: string;
  targetDimension: string;
  category: 'EMOTIONAL_GRID' | 'TIMELINE_SHIFT' | 'PORTAL_ACTIVATION' | 'RITUAL_EFFECT';
  dimensionalCode: string;
  effects: {
    type: 'TURBULENCE' | 'FREQUENCY_SHIFT' | 'ANOMALY' | 'SYNCHRONICITY';
    description: string;
    location?: string;
    intensity: number;
    verified: boolean;
    source?: string;
  }[];
  verificationStatus: 'VERIFIED' | 'PENDING' | 'UNVERIFIED';
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
  id: string;
  description: string;
  intensity: number;
  timestamp: number;
  verified: boolean;
}

export interface PersonalEffect {
  id: string;
  userId: string;
  description: string;
  intensity: number;
  duration: number;
  timestamp: number;
}
