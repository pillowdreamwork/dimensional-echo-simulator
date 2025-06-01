import { KarmaEvent } from '../lib/cores/karma-reflection';

export interface Participant {
  id: string;
  name: string;
  role: string;
  contribution: string;
  connected: boolean;
  lastActive: Date;
}

export interface GroupRitual {
  id: string;
  name: string;
  participants: Participant[];
  state: 'preparing' | 'active' | 'complete';
  resonanceScore: number;
  startTime?: Date;
  completionTime?: Date;
  dimensionalImpact?: number;
}

export interface RitualKarmaEvent extends KarmaEvent {
  id: string;
  type: 'ritual_created' | 'ritual_evolved' | 'ritual_contribution';
  intensity: number;
  sourceNode: string;
  targetNode: string;
  payload: {
    ritualId: string;
    name?: string;
    participantCount?: number;
    contribution?: string;
    participantId?: string;
    dimensionalImpact?: number;
  };
  metadata: {
    catalystGlyph: string;
    harmonicFrequency: number;
    stabilityIndex: number;
    resonanceScore?: number;
    participantCount?: number;
    ritualState?: string;
  };
}

export interface RealTimeSyncState {
  isConnected: boolean;
  participants: Array<{
    id: string;
    name: string;
    role: string;
    dimensionalResonance: number;
  }>;
  lastSyncTimestamp: number;
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
}
