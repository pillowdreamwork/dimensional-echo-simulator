
import { QuantumState } from '../types/quantum';
import { Connection } from '../types/glyph';

export const calculateQuantumResonance = (state: QuantumState): number => {
  return (state.coherence + state.entanglementStrength + state.superposition) / 3;
};

export const validateQuantumState = (state: QuantumState): boolean => {
  return state.coherence >= 0 && state.coherence <= 100 &&
         state.entanglementStrength >= 0 && state.entanglementStrength <= 100 &&
         state.superposition >= 0 && state.superposition <= 100;
};

export const optimizeQuantumField = (states: QuantumState[]): QuantumState[] => {
  return states.map(state => ({
    ...state,
    coherence: Math.min(100, state.coherence * 1.1),
    entanglementStrength: Math.min(100, state.entanglementStrength * 1.05)
  }));
};

export const calculateEntanglement = (
  state1: QuantumState, 
  state2: QuantumState
): number => {
  const resonanceDiff = Math.abs(state1.dimensionalResonance - state2.dimensionalResonance);
  const coherenceDiff = Math.abs(state1.coherence - state2.coherence);
  return Math.max(0, 100 - (resonanceDiff + coherenceDiff) / 2);
};

export const collapseWaveFunction = (
  state: QuantumState, 
  observationStrength: number
): QuantumState => {
  return {
    ...state,
    superposition: state.superposition * (1 - observationStrength),
    coherence: state.coherence * (1 - observationStrength * 0.5),
    probability: Math.min(1, state.probability + observationStrength * 0.3)
  };
};

export const evolveQuantumSystem = (
  states: QuantumState[], 
  connections: Connection[], 
  timeStep: number
): QuantumState[] => {
  return states.map((state, index) => {
    const connectedStates = connections
      .filter(conn => conn.source === index.toString() || conn.target === index.toString())
      .map(conn => {
        const otherIndex = conn.source === index.toString() ? 
          parseInt(conn.target) : parseInt(conn.source);
        return { state: states[otherIndex], strength: conn.strength };
      })
      .filter(item => item.state);

    let coherenceChange = 0;
    let entanglementChange = 0;

    connectedStates.forEach(({ state: connectedState, strength }) => {
      coherenceChange += (connectedState.coherence - state.coherence) * strength * timeStep * 0.01;
      entanglementChange += (connectedState.entanglementStrength - state.entanglementStrength) * strength * timeStep * 0.01;
    });

    return {
      ...state,
      coherence: Math.max(0, Math.min(100, state.coherence + coherenceChange)),
      entanglementStrength: Math.max(0, Math.min(100, state.entanglementStrength + entanglementChange)),
      phase: (state.phase + timeStep * 0.1) % (Math.PI * 2)
    };
  });
};
