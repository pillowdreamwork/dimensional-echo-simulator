import { KarmaEvent } from '../lib/cores/karma-reflection';

export interface Participant {
  id: string;
  name: string;
  role: 'INITIATOR' | 'SUPPORTER' | 'OBSERVER' | 'ANCHOR';
  contributionLevel: number;  // 0-1: Participant's contribution
  lastActive: Date;
  connected: boolean;
  consciousness: number;     // 0-1: Consciousness level
  dimensionalAccess: number[]; // Accessible dimensions
  energySignature?: string;
}

export interface GroupRitual {
  id: string;
  name: string;
  description: string;
  participants: Participant[];
  resonanceScore: number;     // 0-1: Current resonance
  stabilityFactor: number;    // 0-1: Ritual stability
  createdAt: Date;
  lastEvolved: Date;
  status: 'PREPARING' | 'ACTIVE' | 'COMPLETED' | 'FAILED';
  type: 'DIMENSIONAL' | 'TEMPORAL' | 'SYMBOLIC' | 'UNIFIED';
  requiredParticipants: number;
  maxParticipants: number;
  dimensionalImpact: {
    local: number;          // Local reality impact
    global: number;         // Global reality impact
    temporal: number;       // Timeline impact 
  };
  energyRequirements: {
    baseline: number;
    perParticipant: number;
    stabilization: number;
  };
  symbolPatterns: string[];
}

export interface RitualKarmaEvent extends KarmaEvent {
  // KarmaEvent required fields
  id: string;
  timestamp: number;
  intensity: number;
  sourceNode: string;
  targetNode: string;
  karmaType: 'positive' | 'negative' | 'neutral';
  resonancePattern: string[];
  dimensionalImpact: {
    local: number;
    global: number;
    temporal: number;
  };
  metadata: {
    catalystGlyph: string;
    harmonicFrequency: number;
    stabilityIndex: number;
  };
  
  // RitualKarmaEvent specific fields
  type: 'ritual_created' | 'ritual_contribution' | 'ritual_evolved';
  payload: {
    ritualId: string;
    participantId: string;
    action: 'JOIN' | 'LEAVE' | 'CONTRIBUTE' | 'EVOLVE';
    resonanceChange: number;
    dimensionalEffect?: string;
  };
}

export interface RealTimeSyncState {
  connection: {
    status: 'connected' | 'disconnected' | 'reconnecting';
    lastSync: number;
    syncInterval: number;
  };
  participants: {
    [id: string]: {
      lastActive: number;
      connected: boolean;
      syncStatus: 'SYNCED' | 'PENDING' | 'OUT_OF_SYNC';
    };
  };
  lastKarmaEvent?: RitualKarmaEvent;
  lastDimensionalShift?: {
    magnitude: number;
    targetId: string;
    timestamp: number;
  };
}

export interface RitualQuantumState {
  ritualParticipants: RealTimeSyncState['participants'];
  dimensionalShift: number;
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
  stabilityMetrics: {
    groupCoherence: number;    // 0-1: Group coherence
    energyAlignment: number;   // 0-1: Energy alignment
    temporalStability: number; // 0-1: Timeline stability
  };
}
