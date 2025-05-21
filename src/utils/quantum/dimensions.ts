
/**
 * Dimensional Properties and Utilities
 */

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
