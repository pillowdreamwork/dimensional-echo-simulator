
/**
 * Core Quantum Mechanics Utility Functions
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
