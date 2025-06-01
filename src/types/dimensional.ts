import { Vector3 } from 'three';
import { QuantumState, TimelineState } from './quantum';

// Type and interface augmentations for dimensional-echo-simulator

export interface SymbolConnection {
  effect: string;
  power: number;
  dimensionalEffect?: string;
}

export interface GlyphNode {
    id: string;
    position: Vector3;
    dimensionalCode: string;
    glyphPattern: string;
    selected: boolean;
    aethericResonance: number;
    dimensionalStability: number;
    timelineConvergence: number;
    connections: Array<{
        targetId: string;
        strength: number;
        phaseAlignment: number;
        dimensionalResonance: number;
        timelineBranch?: {
            probability: number;
            stabilityFactor: number;
            convergencePoint: number;
        };
    }>;
    dimensionalProperties: {
        level: number;
        resonance: number;
        stability: number;
        harmonics: string[];
        entanglement: number;
        phaseAlignment: number;
    };
    quantumState: {
        superposition: number;
        coherence: number;
        entanglementStrength: number;
    };
}

export interface DimensionalProperties {
  level: number;              // 1-12: Current dimension level
  resonance: number;         // 0-100: Resonance with target dimension
  stability: number;         // 0-100: Stability of dimensional state
  harmonics: string[];       // Active dimensional harmonics
  entanglement: number;      // 0-100: Quantum entanglement degree
  phaseAlignment: number;    // 0-100: Phase alignment with dimension
}

export interface DimensionalPlane {
  id: string;
  name: string;
  description: string;
  level: number;
  rules: string[];
  consciousness: number;     // Consciousness level required
  harmonicSeries: number[]; // Resonant frequencies
  color: string;           // Visual representation
  stabilityThreshold: number;
}

export interface DimensionalShift {
  from: number;
  to: number;
  resonanceChange: number;
  stabilityImpact: number;
}

export interface DimensionalEffect {
  description: string;
  intensity: number;
  dimensionChange?: number;
  timelineImpact?: number;
  resonanceShift?: number;
  stabilityChange?: number;
}

export type DimensionalLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const DIMENSIONAL_PLANES: DimensionalPlane[] = [
  {
    id: "1",
    name: "Physical",
    description: "Base material reality",
    level: 1,
    rules: ["Conservation of Energy", "Causality"],
    consciousness: 0.1,
    harmonicSeries: [126, 252, 378],
    color: "#FF0000",
    stabilityThreshold: 0.95
  },
  {
    id: "3",
    name: "Temporal",
    description: "Time-based phenomena",
    level: 3,
    rules: ["Temporal Coherence", "Entropy"],
    consciousness: 0.3,
    harmonicSeries: [378, 756, 1134],
    color: "#FF7F00",
    stabilityThreshold: 0.85
  },
  {
    id: "6",
    name: "Quantum",
    description: "Quantum superposition space",
    level: 6,
    rules: ["Quantum Entanglement", "Wave Function"],
    consciousness: 0.5,
    harmonicSeries: [756, 1512, 2268],
    color: "#4B0082",
    stabilityThreshold: 0.65
  },
  {
    id: "12",
    name: "Transcendent",
    description: "Pure consciousness realm",
    level: 12,
    rules: ["Unity", "Non-duality"],
    consciousness: 0.9,
    harmonicSeries: [1512, 3024, 4536],
    color: "#8F00FF",
    stabilityThreshold: 0.45
  }
];


// Function to calculate harmonic resonance between dimensions
export function calculateHarmonicResonance(
  source: DimensionalLevel,
  target: DimensionalLevel
): number {
  const sourcePlane = DIMENSIONAL_PROPERTIES[source];
  const targetPlane = DIMENSIONAL_PROPERTIES[target];
  
  // Calculate resonance based on harmonic series overlap
  const harmonicOverlap = sourcePlane.harmonicSeries.filter(h => 
    targetPlane.harmonicSeries.some(th => Math.abs(h - th) < 1)
  ).length;
  
  // Calculate base resonance
  const baseResonance = (harmonicOverlap / sourcePlane.harmonicSeries.length) * 100;
  
  // Apply consciousness factor
  const consciousnessFactor = (sourcePlane.consciousness + targetPlane.consciousness) / 2;
  
  return Math.min(100, baseResonance * consciousnessFactor * 1.5);
}
