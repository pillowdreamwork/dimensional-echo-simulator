
import { Vector3, Quaternion } from 'three';

export type DimensionalLevel = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface DimensionalNodeProperties {
  level: DimensionalLevel;
  resonance: number;
  stability: number;
  harmonics: string[];
  entanglement: number;
  phaseAlignment: number;
  frequency?: number;
  vibration?: number;
  consciousness?: number;
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
    createdAt?: number;
    lastModified?: number;
    energySignature?: string;
    dimensionalOrigin?: DimensionalLevel;
    stabilityHistory?: number[];
  };
  // Additional properties for WeaveNode compatibility
  dimensionalCode?: string;
  glyphPattern?: string;
  selected?: boolean;
  aethericResonance?: number;
  dimensionalStability?: number;
  timelineConvergence?: number;
  quantumState?: any;
  timelineState?: {
    probability: number;
    stability: number;
    convergence: number;
    branchingFactor: number;
    currentTimestamp: number;
  };
  visualProperties?: {
    scale: number;
    opacity: number;
    emissiveIntensity: number;
    color: string;
    pulseFrequency: number;
    rotationSpeed: number;
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
  phaseAlignment?: number;
  dimensionalResonance?: number;
  quantumBridge?: {
    entanglementStrength: number;
    coherenceLevel: number;
    phaseMatch: number;
  };
}

// Export aliases for compatibility
export type GlyphNodeConnection = GlyphConnection;
export type Connection = GlyphConnection;

// Symbol interface for SymbolConnectionSystem
export interface Symbol {
  id: string;
  glyph: string;
  name: string;
  x: number;
  y: number;
  connected: boolean;
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
  color: string;
}> = {
  3: {
    name: "Physical Realm",
    description: "Base dimensional reality",
    maxConnections: 3,
    baseResonance: 100,
    stabilityFactor: 1.0,
    color: "#ff6b6b"
  },
  4: {
    name: "Temporal Flow",
    description: "Time-aware consciousness",
    maxConnections: 4,
    baseResonance: 120,
    stabilityFactor: 0.9,
    color: "#4ecdc4"
  },
  5: {
    name: "Astral Plane",
    description: "Emotional and psychic dimensions",
    maxConnections: 5,
    baseResonance: 150,
    stabilityFactor: 0.8,
    color: "#45b7d1"
  },
  6: {
    name: "Mental Plane",
    description: "Pure thought and ideation",
    maxConnections: 6,
    baseResonance: 180,
    stabilityFactor: 0.7,
    color: "#f7b731"
  },
  7: {
    name: "Causal Plane",
    description: "Karmic and causal relationships",
    maxConnections: 7,
    baseResonance: 220,
    stabilityFactor: 0.6,
    color: "#a55eea"
  },
  8: {
    name: "Buddhic Plane",
    description: "Intuitive wisdom and unity",
    maxConnections: 8,
    baseResonance: 270,
    stabilityFactor: 0.5,
    color: "#26de81"
  },
  9: {
    name: "Atmic Plane",
    description: "Spiritual will and purpose",
    maxConnections: 9,
    baseResonance: 330,
    stabilityFactor: 0.4,
    color: "#fd79a8"
  },
  10: {
    name: "Monadic Plane",
    description: "Divine essence and source",
    maxConnections: 10,
    baseResonance: 400,
    stabilityFactor: 0.3,
    color: "#fdcb6e"
  },
  11: {
    name: "Logoic Plane",
    description: "Cosmic consciousness",
    maxConnections: 11,
    baseResonance: 480,
    stabilityFactor: 0.2,
    color: "#6c5ce7"
  },
  12: {
    name: "Source Unity",
    description: "Absolute oneness",
    maxConnections: 12,
    baseResonance: 580,
    stabilityFactor: 0.1,
    color: "#ffffff"
  }
};
