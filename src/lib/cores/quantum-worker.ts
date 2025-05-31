import { QuantumState } from '../../types/quantum';

const ctx: Worker = self as any;

ctx.onmessage = async (e: MessageEvent) => {
  const { type, payload } = e.data;
  
  switch (type) {
    case 'PROCESS_QUANTUM_STATES':
      const results = await processStates(payload);
      ctx.postMessage({ type: 'COMPLETED', payload: results });
      break;
      
    case 'CALCULATE_ENTANGLEMENT':
      const entanglement = calculateEntanglement(payload);
      ctx.postMessage({ type: 'ENTANGLEMENT_CALCULATED', payload: entanglement });
      break;
      
    case 'EVOLVE_QUANTUM_STATE':
      const evolvedState = evolveQuantumState(payload);
      ctx.postMessage({ type: 'STATE_EVOLVED', payload: evolvedState });
      break;
  }
};

async function processStates(states: QuantumState[]): Promise<QuantumState[]> {
  return states.map(state => ({
    ...state,
    coherence: calculateCoherence(state),
    entanglement: calculateEntanglement(state),
    superposition: calculateSuperposition(state),
    phase: evolvePhase(state.phase),
    dimensionalResonance: calculateResonance(state)
  }));
}

function calculateCoherence(state: QuantumState): number {
  const baseFactor = 0.98;
  const phaseFactor = Math.sin(state.phase) * 0.02;
  const entanglementInfluence = state.entanglement * 0.01;
  
  return Math.min(
    Math.max(
      state.coherence * baseFactor + phaseFactor + entanglementInfluence,
      0
    ),
    1
  );
}

function calculateEntanglement(state: QuantumState): number {
  const growthFactor = 1.01;
  const coherenceInfluence = state.coherence * 0.005;
  const phaseAlignment = Math.cos(state.phase) * 0.01;
  
  return Math.min(
    state.entanglement * growthFactor + coherenceInfluence + phaseAlignment,
    1
  );
}

function calculateSuperposition(state: QuantumState): number {
  const phaseFactor = Math.cos(state.phase);
  const coherenceInfluence = state.coherence * 0.1;
  const entanglementDamping = 1 - state.entanglement * 0.1;
  
  return Math.min(
    Math.max(
      state.superposition * phaseFactor * entanglementDamping + coherenceInfluence,
      0
    ),
    1
  );
}

function evolvePhase(phase: number): number {
  const phaseIncrement = 0.01;
  return (phase + phaseIncrement) % (Math.PI * 2);
}

function calculateResonance(state: QuantumState): number {
  const baseFactor = 1 + state.coherence * 0.1;
  const entanglementBoost = state.entanglement * 0.05;
  const superpositionInfluence = state.superposition * 0.05;
  const phaseAlignment = Math.cos(state.phase) * 0.02;
  
  return Math.min(
    Math.max(
      state.dimensionalResonance * baseFactor + entanglementBoost + 
      superpositionInfluence + phaseAlignment,
      0
    ),
    1
  );
}

function evolveQuantumState(state: QuantumState): QuantumState {
  return {
    ...state,
    coherence: calculateCoherence(state),
    entanglement: calculateEntanglement(state),
    superposition: calculateSuperposition(state),
    phase: evolvePhase(state.phase),
    dimensionalResonance: calculateResonance(state)
  };
}
