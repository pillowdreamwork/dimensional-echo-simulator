
export interface DimensionalImpact {
  id: string;
  timestamp: string;
  action: string;
  effects: Array<{
    dimension: string;
    intensity: number;
    description: string;
  }>;
  dimensionalCode: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'UNVERIFIED';
}

export interface RealityFeedback {
  id: string;
  timestamp: string;
  source: string;
  message: string;
  confidence: number;
  type: 'SYNCHRONICITY' | 'DREAMSCAPE' | 'NUMEROLOGY' | 'ARCHETYPE' | 'EMOTIONAL_SURGE' | 'ELEVATION';
}

export interface PersonalEffect {
  id: string;
  timestamp: string;
  type: 'SYNCHRONICITY' | 'DREAMSCAPE' | 'NUMEROLOGY' | 'ARCHETYPE' | 'EMOTIONAL_SURGE' | 'ELEVATION';
  description: string;
  intensity: number;
  manifestation: string; // Added missing property
  duration: number;
  verified: boolean;
}
