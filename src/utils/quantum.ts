/**
 * Quantum Mechanics Utility Functions
 */

// Define probability distributions for quantum states
export interface QuantumState {
  id: string;
  probability: number;
  description: string;
  effect: string;
}

// Generate uncertainty based on Heisenberg's Uncertainty Principle
export const calculateUncertainty = (
  precisionLevel: number,
  observationStrength: number
): number => {
  // Higher precision creates more uncertainty in complementary values
  const baseUncertainty = (1 / precisionLevel) * observationStrength;
  return Math.max(0, Math.min(1, baseUncertainty));
};

// Collapse a quantum state based on probabilities
export const collapseQuantumState = (
  states: QuantumState[],
  observerInfluence: number // 0-1 range, how much the observer affects outcome
): QuantumState => {
  // Normalize probabilities
  const totalProbability = states.reduce((sum, state) => sum + state.probability, 0);
  const normalizedStates = states.map(state => ({
    ...state,
    probability: state.probability / totalProbability
  }));
  
  // Apply observer influence (biases outcome toward higher probability states)
  const influencedStates = normalizedStates.map(state => ({
    ...state,
    probability: Math.pow(state.probability, 1 - observerInfluence)
  }));
  
  // Re-normalize after influence
  const totalInfluencedProbability = influencedStates.reduce(
    (sum, state) => sum + state.probability, 
    0
  );
  
  const finalStates = influencedStates.map(state => ({
    ...state,
    probability: state.probability / totalInfluencedProbability
  }));
  
  // Random selection based on probability distribution
  const randomValue = Math.random();
  let cumulativeProbability = 0;
  
  for (const state of finalStates) {
    cumulativeProbability += state.probability;
    if (randomValue <= cumulativeProbability) {
      return state;
    }
  }
  
  // Fallback to the highest probability state
  return finalStates.sort((a, b) => b.probability - a.probability)[0];
};

// Calculate superposition state vector
export const calculateSuperposition = (
  dimensions: number[],
  entanglementFactor: number
): number[] => {
  const result = [...dimensions];
  
  // Apply entanglement to create interdimensional connections
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length; j++) {
      if (i !== j) {
        result[i] += dimensions[j] * entanglementFactor * Math.random() * 0.1;
      }
    }
  }
  
  // Normalize vector
  const magnitude = Math.sqrt(
    result.reduce((sum, value) => sum + value * value, 0)
  );
  
  return result.map(value => value / magnitude);
};

// Map of dimensions to their properties
export const dimensionProperties = {
  1: { name: "Linear", description: "A world of pure linearity, only forward and backward movement" },
  2: { name: "Planar", description: "Flat reality with area and basic patterns" },
  3: { name: "Spatial", description: "Our familiar reality of space and volume" },
  4: { name: "Temporal", description: "Space-time continuum with observable time as a dimension" },
  5: { name: "Probability", description: "Realm of potential futures and quantum probabilities" },
  6: { name: "Consciousness", description: "Domain of pure thought and mental constructs" },
  7: { name: "Symbolic", description: "Reality formed through archetypal patterns and meaning" },
  8: { name: "Harmonic", description: "Universe of resonance frequencies and vibrational states" },
  9: { name: "Holographic", description: "Information encoded within fractal recursive structures" },
  10: { name: "Unified", description: "All forces and fields converge into one meta-pattern" },
  11: { name: "Transcendent", description: "Beyond conventional description, pure potentiality" }
};

// Generate glyphs for each dimension
export const dimensionGlyphs = {
  1: "—",
  2: "┼",
  3: "⬠",
  4: "⧫",
  5: "⎔",
  6: "⌬",
  7: "⍟",
  8: "⎈",
  9: "⏣",
  10: "⏧",
  11: "☉"
};

// Generate a dimensional effect based on dimension
export const generateDimensionalEffect = (dimension: number): string => {
  const effects = [
    "Reality warps slightly around you",
    "Time appears to slow momentarily",
    "Patterns emerge from random noise",
    "Echoes of possible futures flicker at the edge of vision",
    "Your thoughts seem to manifest as subtle energy",
    "Mathematical sequences appear in natural formations",
    "Symbolic connections between unrelated objects become apparent"
  ];
  
  // Return random effect, influenced by dimension number
  return effects[Math.floor((Math.random() + dimension/11) * effects.length) % effects.length];
};

// NEW: Analyze symbol pattern and determine effect
import { Symbol, Connection } from '../types/glyph';

interface PatternAnalysis {
  resonance: number;
  stability: number;
  description: string;
}

const PATTERN_DESCRIPTIONS = {
  triangle: "Triangular formation creates a stable energy flow",
  square: "Square pattern enhances dimensional stability",
  pentagram: "Pentagonic resonance amplifies reality manipulation",
  linear: "Linear connection provides direct energy transfer",
  scattered: "Scattered pattern suggests chaotic energy distribution"
};

export function analyzeSymbolPattern(
  symbols: Symbol[],
  connections: Connection[]
): PatternAnalysis {
  // Calculate pattern type based on symbol positions and connections
  const patternType = detectPatternType(symbols, connections);
  
  // Calculate resonance based on symbol types and their positions
  const resonance = calculateResonance(symbols, connections);
  
  // Calculate stability based on connection strengths and symbol positions
  const stability = calculateStability(symbols, connections);
  
  return {
    resonance,
    stability,
    description: PATTERN_DESCRIPTIONS[patternType] || "Unique pattern detected"
  };
}

function detectPatternType(
  symbols: Symbol[],
  connections: Connection[]
): keyof typeof PATTERN_DESCRIPTIONS {
  const connectedSymbols = symbols.filter(s => s.connected);
  
  if (connections.length === 0) return 'scattered';
  if (isTriangle(connectedSymbols, connections)) return 'triangle';
  if (isSquare(connectedSymbols, connections)) return 'square';
  if (isPentagram(connectedSymbols, connections)) return 'pentagram';
  if (isLinear(connectedSymbols, connections)) return 'linear';
  
  return 'scattered';
}

function calculateResonance(symbols: Symbol[], connections: Connection[]): number {
  if (connections.length === 0) return 0;
  
  // Calculate average connection power
  const avgPower = connections.reduce((sum, conn) => sum + conn.power, 0) / connections.length;
  
  // Factor in the number of connected symbols
  const connectedSymbols = symbols.filter(s => s.connected).length;
  const symbolFactor = Math.min(connectedSymbols / 5, 1); // Max benefit from 5 symbols
  
  return avgPower * symbolFactor * (0.7 + Math.random() * 0.3); // Add some randomness
}

function calculateStability(symbols: Symbol[], connections: Connection[]): number {
  if (connections.length === 0) return 0;
  
  // More connections generally mean more stability
  const connectionFactor = Math.min(connections.length / 4, 1); // Max benefit from 4 connections
  
  // Calculate pattern symmetry based on symbol positions
  const symmetryFactor = calculateSymmetry(symbols.filter(s => s.connected));
  
  return connectionFactor * symmetryFactor * (0.8 + Math.random() * 0.2); // Add some randomness
}

function calculateSymmetry(symbols: Symbol[]): number {
  if (symbols.length < 2) return 0;
  
  // Calculate center point
  const centerX = symbols.reduce((sum, s) => sum + s.x, 0) / symbols.length;
  const centerY = symbols.reduce((sum, s) => sum + s.y, 0) / symbols.length;
  
  // Calculate average distance from center
  const avgDistance = symbols.reduce((sum, s) => {
    const dx = s.x - centerX;
    const dy = s.y - centerY;
    return sum + Math.sqrt(dx * dx + dy * dy);
  }, 0) / symbols.length;
  
  // Calculate variance in distances (lower variance = more symmetrical)
  const variance = symbols.reduce((sum, s) => {
    const dx = s.x - centerX;
    const dy = s.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const diff = distance - avgDistance;
    return sum + diff * diff;
  }, 0) / symbols.length;
  
  // Convert variance to a 0-1 scale (lower variance = higher symmetry)
  return Math.max(0, 1 - Math.min(variance / 100, 1));
}

// Pattern detection helpers
function isTriangle(symbols: Symbol[], connections: Connection[]): boolean {
  return connections.length === 3 && symbols.filter(s => s.connected).length === 3;
}

function isSquare(symbols: Symbol[], connections: Connection[]): boolean {
  return connections.length === 4 && symbols.filter(s => s.connected).length === 4;
}

function isPentagram(symbols: Symbol[], connections: Connection[]): boolean {
  return connections.length === 5 && symbols.filter(s => s.connected).length === 5;
}

function isLinear(symbols: Symbol[], connections: Connection[]): boolean {
  // Check if all connections form a single line
  return connections.every(conn => {
    const connectedConns = connections.filter(c => 
      c !== conn && (c.source === conn.source || c.source === conn.target || 
                    c.target === conn.source || c.target === conn.target)
    );
    return connectedConns.length <= 2;
  });
}

// NEW: Process ritual with IURI system
export const processRitual = (glyph: string, intensity: number): {
  outcome: string;
  dimensionalShift: number;
  timelineEffect: string;
} => {
  const glyphValues = {
    "⏣": { power: 7, domain: "holographic", affinity: "time" },
    "⍟": { power: 5, domain: "symbolic", affinity: "consciousness" },
    "⌬": { power: 6, domain: "energetic", affinity: "structure" },
    "⎈": { power: 8, domain: "harmonic", affinity: "vibration" },
    "☉": { power: 10, domain: "transcendent", affinity: "unity" },
    "⧫": { power: 4, domain: "temporal", affinity: "space" }
  };
  
  // Default values for unknown glyphs
  const glyphInfo = glyphValues[glyph as keyof typeof glyphValues] || 
                    { power: 3, domain: "unknown", affinity: "chaos" };
  
  // Calculate outcome based on glyph properties and intensity
  const effectPower = (glyphInfo.power * intensity) / 100;
  const dimensionalShift = Math.min(Math.floor(effectPower / 3), 3);
  
  // Generate outcome descriptions
  const domainEffects = {
    "holographic": [
      "Information fields overlay your perception",
      "Reality encodes itself into fractal patterns",
      "Dimensional barriers become transparent"
    ],
    "symbolic": [
      "Archetypes emerge from the collective unconscious",
      "Meaning crystallizes into tangible form",
      "Symbolic language becomes temporarily comprehensible"
    ],
    "energetic": [
      "Energy flows become visible as geometric patterns",
      "Power concentrates into usable constructs",
      "Force fields form around intentional thought"
    ],
    "harmonic": [
      "Resonant frequencies align across dimensions",
      "Harmonic convergence creates stable pathways",
      "Vibrational patterns synchronize with consciousness"
    ],
    "transcendent": [
      "Ultimate reality briefly pierces the veil",
      "Transcendent awareness expands beyond normal limits",
      "Unity consciousness emerges temporarily"
    ],
    "temporal": [
      "Time flows become malleable and visible",
      "Past, present and future briefly coexist",
      "Temporal boundaries dissolve momentarily"
    ],
    "unknown": [
      "Chaotic energies swirl in unpredictable patterns",
      "Reality responds in unexpected ways",
      "Strange phenomena manifest briefly"
    ]
  };
  
  const timelineEffects = {
    "time": "Timeline branches become temporarily visible",
    "consciousness": "Alternative self-states become accessible",
    "structure": "Reality foundations stabilize into new configurations",
    "vibration": "Harmonic resonance creates stable multidimensional pathways",
    "unity": "All possibilities converge toward optimal outcomes",
    "space": "Spatial dimensions fold to connect distant realities",
    "chaos": "Unpredictable timeline fluctuations occur"
  };
  
  const domain = glyphInfo.domain as keyof typeof domainEffects;
  const domainEffectList = domainEffects[domain] || domainEffects.unknown;
  const outcome = domainEffectList[Math.floor(Math.random() * domainEffectList.length)];
  
  const affinity = glyphInfo.affinity as keyof typeof timelineEffects;
  const timelineEffect = timelineEffects[affinity] || timelineEffects.chaos;
  
  return {
    outcome,
    dimensionalShift,
    timelineEffect
  };
};

// NEW: Process mythic archetype interaction
export const interactWithMythicArchetype = (archetype: string): {
  response: string;
  insight: string;
  dimensionalAffinity: number;
} => {
  const archetypeData = {
    "Oracle": {
      responses: [
        "The patterns between dimensions reveal what has been hidden.",
        "Time is a circle that spirals upward through dimensions.",
        "What you seek is seeking you across the probability spectrum."
      ],
      insights: [
        "Look to the spaces between decisions for true knowledge.",
        "The past and future exist simultaneously in the fifth dimension.",
        "Observation collapses possibility into reality."
      ],
      dimensionalAffinity: 9
    },
    "Trickster": {
      responses: [
        "Reality is merely agreement among observers. I disagree.",
        "The rules you believe in are simply the ones you've noticed.",
        "Chaos is pattern viewed from too close a distance."
      ],
      insights: [
        "Break patterns to see what lies beneath them.",
        "The unexpected path often leads to unexpected possibilities.",
        "In contradiction lies truth."
      ],
      dimensionalAffinity: 5
    },
    "Guide": {
      responses: [
        "Follow the resonance that feels like home.",
        "Each dimension teaches what you need for the next.",
        "The path appears when you're ready to walk it."
      ],
      insights: [
        "Trust the journey more than the destination.",
        "The maps you seek are written in your own understanding.",
        "Navigation across dimensions requires both logic and intuition."
      ],
      dimensionalAffinity: 7
    },
    "Warrior": {
      responses: [
        "Courage creates its own reality tunnels.",
        "Stand firm at the nexus of possibility.",
        "Decision is the blade that cuts through uncertainty."
      ],
      insights: [
        "Decisive action collapses quantum states favorably.",
        "Protect your timeline from entropic forces.",
        "Strength comes from alignment with your higher-dimensional self."
      ],
      dimensionalAffinity: 3
    }
  };
  
  const defaultData = {
    responses: ["The archetype acknowledges your presence."],
    insights: ["Some insights remain veiled for now."],
    dimensionalAffinity: 1
  };
  
  const data = archetypeData[archetype as keyof typeof archetypeData] || defaultData;
  
  const responseIndex = Math.floor(Math.random() * data.responses.length);
  const insightIndex = Math.floor(Math.random() * data.insights.length);
  
  return {
    response: data.responses[responseIndex],
    insight: data.insights[insightIndex],
    dimensionalAffinity: data.dimensionalAffinity
  };
};

// NEW: Simulate timeline ripple effects
export const createTimelineRipple = (origin: string, intensity: number): {
  primaryEffect: string;
  secondaryEffects: string[];
  branchFactor: number;
} => {
  // Calculate branching factor based on intensity
  const branchFactor = Math.max(1, Math.min(7, Math.floor(intensity / 15)));
  
  // Generate primary effect description
  const primaryEffects = [
    "A new timeline branch forms from your decision",
    "Reality ripples outward from your choice point",
    "Alternate possibilities crystallize around your action",
    "A quantum decision tree splits into parallel realities",
    "Your choice creates a nexus point across dimensions"
  ];
  
  // Generate secondary effects
  const secondaryEffectPool = [
    "Echoes of alternate choices briefly manifest",
    "Quantum entanglement links similar timelines",
    "Memory fragments from variant selves surface",
    "Probability waves recalculate around new constants",
    "Timeline stability increases as branches propagate",
    "Causal chains reconfigure to accommodate changes",
    "Dimensional barriers thin near branch points",
    "Synchronicity increases around related events",
    "Temporal harmonics create resonance patterns"
  ];
  
  // Select effects based on intensity and branching
  const primaryEffect = primaryEffects[Math.floor(Math.random() * primaryEffects.length)];
  
  // Choose secondary effects based on branch factor
  const secondaryEffects: string[] = [];
  const usedIndices: number[] = [];
  
  for (let i = 0; i < branchFactor; i++) {
    let index;
    do {
      index = Math.floor(Math.random() * secondaryEffectPool.length);
    } while (usedIndices.includes(index));
    
    usedIndices.push(index);
    secondaryEffects.push(secondaryEffectPool[index]);
  }
  
  return {
    primaryEffect,
    secondaryEffects,
    branchFactor
  };
};
