
/**
 * Symbol Analysis and Pattern Recognition
 */

// Analyze symbol pattern and determine effect
export const analyzeSymbolPattern = (pattern: string): {effect: string, power: number} => {
  let power = 0;
  let effectType = "";
  
  // Calculate power based on symbol count and types
  power = pattern.length * 10; // Base power from number of symbols
  
  // Special symbols have more power
  if (pattern.includes("⊛")) power += 25;
  if (pattern.includes("⊕")) power += 30;
  if (pattern.includes("☉")) power += 40;
  if (pattern.includes("⏧")) power += 35;
  
  // Calculate effect type based on pattern composition
  if (pattern.includes("—") || pattern.includes("┼")) {
    effectType = "structural";
  } else if (pattern.includes("⬠") || pattern.includes("⧫")) {
    effectType = "spatial";
  } else if (pattern.includes("⎔") || pattern.includes("⌬")) {
    effectType = "probabilistic";
  } else if (pattern.includes("⍟") || pattern.includes("⎈")) {
    effectType = "vibrational";
  } else if (pattern.includes("⏣")) {
    effectType = "holographic";
  } else {
    effectType = "unknown";
  }
  
  // Generate specific effect based on type
  const effects = {
    structural: [
      "Reality foundations stabilize around you",
      "Dimensional grid patterns become visible",
      "Spacetime rigidity increases temporarily"
    ],
    spatial: [
      "Space folds briefly between dimensions",
      "Volumetric awareness expands in your consciousness",
      "Spatial boundaries become permeable"
    ],
    probabilistic: [
      "Future pathways branch visibly before you",
      "Probability waves collapse into new patterns",
      "Quantum uncertainty temporarily decreases"
    ],
    vibrational: [
      "Resonant frequencies harmonize across dimensions",
      "Vibrational patterns sync with your consciousness",
      "Energy flows become visible as geometric patterns"
    ],
    holographic: [
      "Information fields overlay your perception",
      "Fractal patterns reveal deeper reality structures",
      "Holographic encoding of reality becomes apparent"
    ],
    unknown: [
      "Strange effects ripple through reality",
      "Unexplained phenomena manifest briefly",
      "Reality responds in unpredictable ways"
    ]
  };
  
  const typeEffects = effects[effectType as keyof typeof effects] || effects.unknown;
  const effect = typeEffects[Math.floor(Math.random() * typeEffects.length)];
  
  return { effect, power };
};
