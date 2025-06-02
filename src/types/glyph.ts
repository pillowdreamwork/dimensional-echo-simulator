
import { Vector3, Quaternion } from 'three';

export type DimensionalLevel = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface DimensionalNodeProperties {
  level: DimensionalLevel;
  resonance: number;
  stability: number;
  harmonics: string[];
  entanglement: number;
  phaseAlignment: number;
}

export interface GlyphNode {
  id: string;
  position: Vector3;
  rotation: Quaternion;
  scale: Vector3;
  symbol: string;
  energy: number;
  connections: string[];
  dimensionalProperties: DimensionalNodeProperties;
  timestamp: number;
  isActive: boolean;
  metadata: {
    creator: string;
    purpose: string;
    tags: string[];
  };
}

export interface GlyphConnection {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  strength: number;
  type: 'quantum' | 'causal' | 'synchronistic' | 'archetypal';
  bidirectional: boolean;
  metadata: {
    established: number;
    lastResonance: number;
  };
}

export interface GlyphNetwork {
  nodes: Map<string, GlyphNode>;
  connections: Map<string, GlyphConnection>;
  centerOfMass: Vector3;
  totalEnergy: number;
  coherenceLevel: number;
  lastUpdate: number;
}

export const DIMENSIONAL_PROPERTIES: Record<DimensionalLevel, {
  name: string;
  description: string;
  maxConnections: number;
  baseResonance: number;
  stabilityFactor: number;
}> = {
  3: {
    name: "Physical Realm",
    description: "Base dimensional reality",
    maxConnections: 3,
    baseResonance: 100,
    stabilityFactor: 1.0
  },
  4: {
    name: "Temporal Flow",
    description: "Time-aware consciousness",
    maxConnections: 4,
    baseResonance: 120,
    stabilityFactor: 0.9
  },
  5: {
    name: "Astral Plane",
    description: "Emotional and psychic dimensions",
    maxConnections: 5,
    baseResonance: 150,
    stabilityFactor: 0.8
  },
  6: {
    name: "Mental Plane",
    description: "Pure thought and ideation",
    maxConnections: 6,
    baseResonance: 180,
    stabilityFactor: 0.7
  },
  7: {
    name: "Causal Plane",
    description: "Karmic and causal relationships",
    maxConnections: 7,
    baseResonance: 220,
    stabilityFactor: 0.6
  },
  8: {
    name: "Buddhic Plane",
    description: "Intuitive wisdom and unity",
    maxConnections: 8,
    baseResonance: 270,
    stabilityFactor: 0.5
  },
  9: {
    name: "Atmic Plane",
    description: "Spiritual will and purpose",
    maxConnections: 9,
    baseResonance: 330,
    stabilityFactor: 0.4
  },
  10: {
    name: "Monadic Plane",
    description: "Divine essence and source",
    maxConnections: 10,
    baseResonance: 400,
    stabilityFactor: 0.3
  },
  11: {
    name: "Logoic Plane",
    description: "Cosmic consciousness",
    maxConnections: 11,
    baseResonance: 480,
    stabilityFactor: 0.2
  },
  12: {
    name: "Source Unity",
    description: "Absolute oneness",
    maxConnections: 12,
    baseResonance: 580,
    stabilityFactor: 0.1
  }
};
