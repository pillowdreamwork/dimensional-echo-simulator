
/**
 * Timeline Simulation and Ripple Effects
 */

// Simulate timeline ripple effects
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
