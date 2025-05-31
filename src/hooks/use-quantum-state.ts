import { useState, useCallback } from 'react';
import { QuantumState as CoreQuantumState } from '../types/quantum';

export interface QuantumState extends CoreQuantumState {}

const DEFAULT_QUANTUM_STATE: QuantumState = {
  state: 'stable',
  probability: 1,
  coherence: 1,
  entanglement: 1,
  superposition: 1,
  phase: 0,
  dimensionalResonance: 1,
  aethericResonance: 1,
  dimensionalStability: 1,
  timelineConvergence: 1,
  realityAnchors: {
    primary: '',
    secondary: [],
    strength: 1
  },
  quantumSignature: {
    hash: '',
    timestamp: Date.now(),
    validityPeriod: 1000 * 60 * 60
  },
  forgeMetadata: {
    version: '1.0',
    lastModified: Date.now(),
    stabilityIndex: 1,
    energyConsumption: 0
  }
};

interface UseQuantumStateProps {
  initialState?: Partial<QuantumState>;
  initialDimension?: number;
  onStateChange?: (state: QuantumState) => void;
}

export function useQuantumState({
  initialState,
  initialDimension = 3,
  onStateChange
}: UseQuantumStateProps = {}) {
  const [quantumState, setQuantumState] = useState<QuantumState>({
    ...DEFAULT_QUANTUM_STATE,
    ...initialState
  });
  const [currentDimension, setCurrentDimension] = useState(initialDimension);

  const updateQuantumState = useCallback((updates: Partial<QuantumState>) => {
    setQuantumState(prev => {
      const newState = {
        ...prev,
        ...updates
      };
      onStateChange?.(newState);
      return newState;
    });
  }, [onStateChange]);

  const collapseQuantumState = useCallback((collapseStrength = 0.5) => {
    updateQuantumState({
      superposition: 0,
      coherence: Math.max(0, quantumState.coherence * collapseStrength),
      entanglement: Math.max(0, quantumState.entanglement * (collapseStrength + 0.2))
    });
  }, [quantumState, updateQuantumState]);

  const stabilizeQuantumState = useCallback((stabilityFactor = 0.8) => {
    const currentCoherence = quantumState.coherence;
    const currentEntanglement = quantumState.entanglement;
    
    // Calculate stability metrics
    const coherenceStability = Math.min(100, currentCoherence * (1 + stabilityFactor));
    const entanglementStability = Math.min(100, currentEntanglement * stabilityFactor);
    
    updateQuantumState({
      coherence: coherenceStability,
      entanglement: entanglementStability,
      superposition: Math.max(0, quantumState.superposition * stabilityFactor)
    });
  }, [quantumState, updateQuantumState]);

  const calculateResonance = useCallback((targetDimension: number): number => {
    const baseFactor = quantumState.coherence / 100;
    const entanglementFactor = quantumState.entanglement / 100;
    const dimensionalDifference = Math.abs(targetDimension - currentDimension);
    
    return Math.max(0, Math.min(100,
      (baseFactor * 50 + entanglementFactor * 50) * 
      Math.exp(-dimensionalDifference * 0.2)
    ));
  }, [quantumState, currentDimension]);

  const shiftDimension = useCallback(async (targetDimension: number) => {
    if (targetDimension === currentDimension) return;

    const resonance = calculateResonance(targetDimension);
    const stabilityImpact = Math.abs(targetDimension - currentDimension) * 0.1;
    
    // Apply dimensional shift effects
    updateQuantumState({
      coherence: Math.max(0, quantumState.coherence - stabilityImpact * 10),
      entanglement: Math.max(0, quantumState.entanglement - stabilityImpact * 5),
      superposition: Math.max(0, quantumState.superposition - stabilityImpact * 15)
    });

    // Trigger stabilization if resonance is high enough
    if (resonance > 75) {
      setTimeout(() => stabilizeQuantumState(resonance / 100), 1000);
    }

    setCurrentDimension(targetDimension);
  }, [quantumState, currentDimension, calculateResonance, stabilizeQuantumState, updateQuantumState]);

  return {
    quantumState,
    updateQuantumState,
    currentDimension,
    setCurrentDimension,
    collapseQuantumState,
    stabilizeQuantumState,
    calculateResonance,
    shiftDimension
  };
}
