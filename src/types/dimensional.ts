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

export type DimensionalLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface DimensionalPlane {
  name: string;
  color: string;
  baseFrequency: number;
  harmonicSeries: number[];
  stabilityThreshold: number;
  consciousness: number;
}

export const DIMENSIONAL_PROPERTIES: Record<DimensionalLevel, DimensionalPlane> = {
  1: { 
    name: "Linear", 
    color: "#FF0000",
    baseFrequency: 432,
    harmonicSeries: [432, 864, 1296],
    stabilityThreshold: 0.95,
    consciousness: 0.1
  },
  2: { 
    name: "Planar", 
    color: "#FF7F00",
    baseFrequency: 528,
    harmonicSeries: [528, 1056, 1584],
    stabilityThreshold: 0.9,
    consciousness: 0.2
  },
  3: { 
    name: "Spatial", 
    color: "#FFFF00",
    baseFrequency: 639,
    harmonicSeries: [639, 1278, 1917],
    stabilityThreshold: 0.85,
    consciousness: 0.3
  },
  4: { 
    name: "Temporal", 
    color: "#00FF00",
    baseFrequency: 741,
    harmonicSeries: [741, 1482, 2223],
    stabilityThreshold: 0.8,
    consciousness: 0.4
  },
  5: { 
    name: "Probability", 
    color: "#0000FF",
    baseFrequency: 852,
    harmonicSeries: [852, 1704, 2556],
    stabilityThreshold: 0.75,
    consciousness: 0.5
  },
  6: { 
    name: "Consciousness", 
    color: "#4B0082",
    baseFrequency: 963,
    harmonicSeries: [963, 1926, 2889],
    stabilityThreshold: 0.7,
    consciousness: 0.6
  },
  7: { 
    name: "Symbolic", 
    color: "#8F00FF",
    baseFrequency: 1074,
    harmonicSeries: [1074, 2148, 3222],
    stabilityThreshold: 0.65,
    consciousness: 0.7
  },
  8: { 
    name: "Harmonic", 
    color: "#FF1493",
    baseFrequency: 1185,
    harmonicSeries: [1185, 2370, 3555],
    stabilityThreshold: 0.6,
    consciousness: 0.8
  },
  9: { 
    name: "Holographic", 
    color: "#00FFFF",
    baseFrequency: 1296,
    harmonicSeries: [1296, 2592, 3888],
    stabilityThreshold: 0.55,
    consciousness: 0.85
  },
  10: { 
    name: "Unified", 
    color: "#FFD700",
    baseFrequency: 1407,
    harmonicSeries: [1407, 2814, 4221],
    stabilityThreshold: 0.5,
    consciousness: 0.9
  },
  11: { 
    name: "Transcendent", 
    color: "#FF00FF",
    baseFrequency: 1518,
    harmonicSeries: [1518, 3036, 4554],
    stabilityThreshold: 0.45,
    consciousness: 0.95
  },
  12: { 
    name: "Divine", 
    color: "#FFFFFF",
    baseFrequency: 1629,
    harmonicSeries: [1629, 3258, 4887],
    stabilityThreshold: 0.4,
    consciousness: 1.0
  }
} as const;

export interface DimensionalShift {
  source: DimensionalLevel;
  target: DimensionalLevel;
  intensity: number;
  resonance: number;
  stability: number;
  harmonics: string[];
  quantumState: QuantumState;
  timelineState: TimelineState;
}

export interface DimensionalAnchor {
  position: Vector3;
  level: DimensionalLevel;
  strength: number;
  resonance: number;
  harmonics: string[];
  stabilityField: number;
}

export interface DimensionalGate {
  sourceAnchor: DimensionalAnchor;
  targetAnchor: DimensionalAnchor;
  stability: number;
  phaseAlignment: number;
  energyFlow: number;
  active: boolean;
}

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
