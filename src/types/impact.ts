
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

export interface RealityFeedback {
  id: string;
  timestamp: string;
  source: string;
  message: string;
  confidence: number;
  type: 'SYNCHRONICITY' | 'DREAMSCAPE' | 'NUMEROLOGY' | 'ARCHETYPE' | 'EMOTIONAL_SURGE' | 'ELEVATION';
  nodeType: 'HOSTILE' | 'ELEVATION' | 'RESTORATION' | 'UNKNOWN'; // Added missing property
  content: string; // Added missing property
  keywords: string[]; // Added missing property
}

export interface PersonalEffect {
  id: string;
  timestamp: string;
  type: 'SYNCHRONICITY' | 'DREAMSCAPE' | 'NUMEROLOGY' | 'ARCHETYPE' | 'EMOTIONAL_SURGE' | 'ELEVATION';
  description: string;
  intensity: number;
  manifestation: string;
  duration: number;
  verified: boolean;
  frequency?: number; // Added missing optional property
}
