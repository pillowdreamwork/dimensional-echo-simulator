
import { useState, useEffect } from 'react';
import { QuantumState } from '../types/quantum';

const defaultQuantumState: QuantumState = {
  stateVector: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  probability: 1,
  entanglementMap: new Map(),
  collapseHistory: [],
  state: 'stable',
  coherence: 100,
  entanglement: 0,
  entanglementStrength: 0,
  superposition: 0,
  phase: 0,
  dimensionalResonance: 0,
  aethericResonance: 0,
  dimensionalStability: 100,
  timelineConvergence: 0,
  dimensionalShift: 0,
  lastSymbolAnalysis: '',
  ritualParticipants: {},
  realityAnchors: {
    primary: '',
    secondary: [],
    strength: 0
  },
  quantumSignature: {
    hash: '',
    timestamp: Date.now(),
    validityPeriod: 3600
  },
  forgeMetadata: {
    version: '1.0',
    lastModified: Date.now(),
    stabilityIndex: 100,
    energyConsumption: 0
  }
};

interface UseQuantumStateProps {
  initialState?: QuantumState;
  onStateChange?: (state: QuantumState) => void;
}

export const useQuantumState = (props: UseQuantumStateProps = {}) => {
  const [quantumState, setQuantumState] = useState<QuantumState>(
    props.initialState || defaultQuantumState
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuantumState(prevState => {
        const newState = { ...prevState };
        
        newState.stateVector = prevState.stateVector.map(val => val + (Math.random() - 0.5) * 0.1);
        newState.probability = Math.max(0, Math.min(1, prevState.probability + (Math.random() - 0.5) * 0.02));
        newState.coherence = Math.max(0, Math.min(100, prevState.coherence + (Math.random() - 0.5) * 2));
        newState.entanglementStrength = Math.max(0, Math.min(100, prevState.entanglementStrength + (Math.random() - 0.5) * 1));
        
        props.onStateChange?.(newState);
        return newState;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, [props.onStateChange]);

  const updateQuantumState = (updates: Partial<QuantumState>) => {
    setQuantumState(prev => {
      const newState = { ...prev, ...updates };
      props.onStateChange?.(newState);
      return newState;
    });
  };

  const collapseQuantumState = (stabilityFactor: number) => {
    setQuantumState(prev => ({
      ...prev,
      coherence: Math.max(0, prev.coherence * stabilityFactor),
      superposition: Math.max(0, prev.superposition * 0.1),
      probability: stabilityFactor
    }));
  };

  const stabilizeQuantumState = (stabilityLevel: number) => {
    setQuantumState(prev => ({
      ...prev,
      dimensionalStability: stabilityLevel * 100,
      coherence: stabilityLevel * 100
    }));
  };

  return { 
    quantumState, 
    setQuantumState, 
    updateQuantumState,
    collapseQuantumState,
    stabilizeQuantumState
  };
};
