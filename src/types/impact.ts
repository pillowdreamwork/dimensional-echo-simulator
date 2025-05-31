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
