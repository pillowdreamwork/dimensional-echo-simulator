
import { Vector3, Quaternion } from 'three';
import { QuantumState, TimelineState } from './quantum';

export type DimensionalLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface DimensionalNodeProperties {
  level: DimensionalLevel;
  resonance: number;
  stability: number;
  harmonics: string[];
  entanglement: number;
  phaseAlignment: number;
  frequency: number;
  vibration: number;
  consciousness: number;
}

export interface GlyphNodeMetadata {
  creator: string;
  purpose: string;
  tags: string[];
  createdAt: number;
  lastModified: number;
  energySignature: string;
  dimensionalOrigin: DimensionalLevel;
  stabilityHistory: number[];
}

export interface GlyphConnection {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  targetId: string;
  source?: string;
  target?: string;
  power?: number;
  strength: number;
  type: 'quantum' | 'dimensional' | 'temporal' | 'aetheric';
  phaseAlignment: number;
  dimensionalResonance: number;
  quantumBridge: {
    entanglementStrength: number;
    coherenceLevel: number;
    phaseMatch: number;
  };
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
  metadata: GlyphNodeMetadata;
  dimensionalCode: string;
  glyphPattern: string;
  selected: boolean;
  aethericResonance: number;
  dimensionalStability: number;
  timelineConvergence: number;
  quantumState: QuantumState;
  timelineState: TimelineState;
  visualProperties: {
    scale: number;
    opacity: number;
    emissiveIntensity: number;
    color: string;
    pulseFrequency: number;
    rotationSpeed: number;
  };
}

export interface Symbol {
  id: string;
  glyph: string;
  name: string;
  x: number;
  y: number;
  connected: boolean;
}

export interface Connection {
  id: string;
  source: string;
  target: string;
  power: number;
  strength: number;
}

export const DIMENSIONAL_PROPERTIES: Record<DimensionalLevel, {
  name: string;
  color: string;
  resonance: number;
  stability: number;
  harmonics: string[];
  entanglement: number;
  phaseAlignment: number;
  frequency: number;
  vibration: number;
  consciousness: number;
}> = {
  1: { name: '1D - Linear', color: 'rgba(255, 0, 0, 1)', resonance: 10, stability: 90, harmonics: ['base'], entanglement: 5, phaseAlignment: 0, frequency: 100, vibration: 100, consciousness: 0.1 },
  2: { name: '2D - Planar', color: 'rgba(255, 128, 0, 1)', resonance: 20, stability: 85, harmonics: ['base', 'harmonic'], entanglement: 15, phaseAlignment: 15, frequency: 200, vibration: 200, consciousness: 0.2 },
  3: { name: '3D - Spatial', color: 'rgba(255, 255, 0, 1)', resonance: 30, stability: 80, harmonics: ['base', 'harmonic', 'overtone'], entanglement: 25, phaseAlignment: 30, frequency: 300, vibration: 300, consciousness: 0.3 },
  4: { name: '4D - Temporal', color: 'rgba(128, 255, 0, 1)', resonance: 40, stability: 75, harmonics: ['base', 'harmonic', 'overtone', 'temporal'], entanglement: 35, phaseAlignment: 45, frequency: 400, vibration: 400, consciousness: 0.4 },
  5: { name: '5D - Probability', color: 'rgba(0, 255, 0, 1)', resonance: 50, stability: 70, harmonics: ['base', 'harmonic', 'overtone', 'temporal', 'quantum'], entanglement: 45, phaseAlignment: 60, frequency: 500, vibration: 500, consciousness: 0.5 },
  6: { name: '6D - Consciousness', color: 'rgba(0, 255, 128, 1)', resonance: 60, stability: 65, harmonics: ['base', 'harmonic', 'overtone', 'temporal', 'quantum', 'consciousness'], entanglement: 55, phaseAlignment: 75, frequency: 600, vibration: 600, consciousness: 0.6 },
  7: { name: '7D - Information', color: 'rgba(0, 255, 255, 1)', resonance: 70, stability: 60, harmonics: ['base', 'harmonic', 'overtone', 'temporal', 'quantum', 'consciousness', 'information'], entanglement: 65, phaseAlignment: 90, frequency: 700, vibration: 700, consciousness: 0.7 },
  8: { name: '8D - Archetypal', color: 'rgba(0, 128, 255, 1)', resonance: 80, stability: 55, harmonics: ['base', 'harmonic', 'overtone', 'temporal', 'quantum', 'consciousness', 'information', 'archetypal'], entanglement: 75, phaseAlignment: 105, frequency: 800, vibration: 800, consciousness: 0.8 },
  9: { name: '9D - Universal', color: 'rgba(0, 0, 255, 1)', resonance: 90, stability: 50, harmonics: ['base', 'harmonic', 'overtone', 'temporal', 'quantum', 'consciousness', 'information', 'archetypal', 'universal'], entanglement: 85, phaseAlignment: 120, frequency: 900, vibration: 900, consciousness: 0.9 },
  10: { name: '10D - Cosmic', color: 'rgba(128, 0, 255, 1)', resonance: 95, stability: 45, harmonics: ['base', 'harmonic', 'overtone', 'temporal', 'quantum', 'consciousness', 'information', 'archetypal', 'universal', 'cosmic'], entanglement: 95, phaseAlignment: 135, frequency: 1000, vibration: 1000, consciousness: 1.0 },
  11: { name: '11D - Source', color: 'rgba(255, 0, 255, 1)', resonance: 100, stability: 40, harmonics: ['base', 'harmonic', 'overtone', 'temporal', 'quantum', 'consciousness', 'information', 'archetypal', 'universal', 'cosmic', 'source'], entanglement: 100, phaseAlignment: 150, frequency: 1100, vibration: 1100, consciousness: 1.1 }
};
