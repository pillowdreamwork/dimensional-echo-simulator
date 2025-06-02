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
  resonance: number;         // 0-1: Resonance with target dimension
  stability: number;         // 0-1: Stability of dimensional state
  harmonics: string[];       // Active dimensional harmonics
  entanglement: number;      // 0-1: Cross-dimensional entanglement
  phaseAlignment: number;    // 0-1: Phase alignment with dimension
  timelineFactor: number;    // 0-1: Timeline coherence factor
  energy: number;           // Current energy level
  anchors: {                // Dimensional anchors
    points: string[];      // Anchor point identifiers
    strength: number;      // 0-1: Combined anchor strength
  };
}

export interface DimensionalPlane {
  id: string;
  name: string;
  description: string;
  level: DimensionalLevel;
  rules: string[];           // Governing principles
  consciousness: number;     // Required consciousness level (0-1)
  harmonicSeries: number[]; // Resonant frequencies
  color: string;           // Visual representation
  stabilityThreshold: number; // Minimum stability required (0-1)
}

export interface DimensionalShift {
  from: DimensionalLevel;
  to: DimensionalLevel;
  resonanceChange: number;  // Change in dimensional resonance
  stabilityImpact: number; // Impact on system stability
  energyCost: number;     // Energy required for shift
  timelineEffect: string; // Description of timeline impact
}

export interface DimensionalEffect {
  description: string;
  intensity: number;       // 0-1: Effect intensity
  dimensionChange?: number; // Change in dimensional level
  timelineImpact?: number; // Impact on timeline (0-1)
  resonanceShift?: number; // Change in resonance
  stabilityChange?: number; // Change in stability
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
    id: "2",
    name: "Etheric",
    description: "Vital energy patterns",
    level: 2,
    rules: ["Energy Flow", "Vitality"],
    consciousness: 0.2,
    harmonicSeries: [252, 504, 756],
    color: "#FF3D00",
    stabilityThreshold: 0.9
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
    id: "4",
    name: "Astral",
    description: "Emotional and dream realms",
    level: 4,
    rules: ["Emotional Resonance", "Dream Logic"],
    consciousness: 0.4,
    harmonicSeries: [504, 1008, 1512],
    color: "#FFEB3B",
    stabilityThreshold: 0.8
  },
  {
    id: "5",
    name: "Mental",
    description: "Thought patterns and mental constructs",
    level: 5,
    rules: ["Thought Forms", "Mental Coherence"],
    consciousness: 0.45,
    harmonicSeries: [630, 1260, 1890],
    color: "#76FF03",
    stabilityThreshold: 0.75
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
    id: "7",
    name: "Causal",
    description: "Cause and effect patterns",
    level: 7,
    rules: ["Causality Webs", "Karmic Patterns"],
    consciousness: 0.6,
    harmonicSeries: [882, 1764, 2646],
    color: "#1E88E5",
    stabilityThreshold: 0.6
  },
  {
    id: "8",
    name: "Archetypal",
    description: "Universal symbols and patterns",
    level: 8,
    rules: ["Symbol Resonance", "Pattern Recognition"],
    consciousness: 0.7,
    harmonicSeries: [1008, 2016, 3024],
    color: "#3949AB",
    stabilityThreshold: 0.55
  },
  {
    id: "9",
    name: "Universal",
    description: "Cosmic laws and principles",
    level: 9,
    rules: ["Universal Law", "Cosmic Order"],
    consciousness: 0.75,
    harmonicSeries: [1134, 2268, 3402],
    color: "#6A1B9A",
    stabilityThreshold: 0.5
  },
  {
    id: "10",
    name: "Divine",
    description: "Divine patterns and frequencies",
    level: 10,
    rules: ["Divine Order", "Sacred Geometry"],
    consciousness: 0.8,
    harmonicSeries: [1260, 2520, 3780],
    color: "#880E4F",
    stabilityThreshold: 0.45
  },
  {
    id: "11",
    name: "Infinite",
    description: "Infinite possibilities and potentials",
    level: 11,
    rules: ["Infinite Potential", "Quantum Probability"],
    consciousness: 0.85,
    harmonicSeries: [1386, 2772, 4158],
    color: "#B71C1C",
    stabilityThreshold: 0.4
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
    stabilityThreshold: 0.35
  }
];

// Function to calculate harmonic resonance between dimensions
export function calculateHarmonicResonance(
  source: DimensionalLevel,
  target: DimensionalLevel
): number {
  const sourcePlane = DIMENSIONAL_PLANES.find(p => p.level === source);
  const targetPlane = DIMENSIONAL_PLANES.find(p => p.level === target);
  
  if (!sourcePlane || !targetPlane) {
    return 0;
  }

  // Calculate resonance based on harmonic series overlap
  const harmonicOverlap = sourcePlane.harmonicSeries.filter(h => 
    targetPlane.harmonicSeries.some(th => Math.abs(h - th) < 1)
  ).length;
  
  // Calculate base resonance
  const baseResonance = (harmonicOverlap / sourcePlane.harmonicSeries.length) * 100;
  
  // Apply consciousness factor
  const consciousnessFactor = (sourcePlane.consciousness + targetPlane.consciousness) / 2;
  
  // Apply dimensional distance penalty
  const dimensionalDistance = Math.abs(source - target);
  const distancePenalty = Math.max(0, 1 - (dimensionalDistance * 0.1));
  
  return Math.min(100, baseResonance * consciousnessFactor * distancePenalty * 1.5);
}
