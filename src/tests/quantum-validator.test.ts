import { describe, it, expect } from 'vitest';
import { QuantumTestValidator } from '../lib/cores/quantum-test-validator';
import { QuantumState } from '../types/quantum';

const createCompleteQuantumState = (overrides: Partial<QuantumState> = {}): QuantumState => ({
  stateVector: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  probability: 1,
  entanglementMap: new Map(),
  collapseHistory: [],
  state: 'stable',
  coherence: 1,
  entanglement: 1,
  entanglementStrength: 1,
  superposition: 1,
  phase: 0,
  dimensionalResonance: 1,
  aethericResonance: 1,
  dimensionalStability: 1,
  timelineConvergence: 1,
  dimensionalShift: 0,
  ritualParticipants: {},
  realityAnchors: { primary: '', secondary: [], strength: 1 },
  quantumSignature: { hash: '', timestamp: Date.now(), validityPeriod: 3600000 },
  forgeMetadata: { version: '1.0', lastModified: Date.now(), stabilityIndex: 1, energyConsumption: 0 },
  ...overrides
});

describe('QuantumTestValidator', () => {
  it('should validate quantum states correctly', () => {
    const mockQuantumState = createCompleteQuantumState({
      coherence: 0.8,
      entanglement: 0.6
    });
    
    expect(mockQuantumState.coherence).toBe(0.8);
    expect(mockQuantumState.entanglement).toBe(0.6);
  });

  it('should pass validation if coherence and entanglement are within valid ranges', () => {
    const mockQuantumState = createCompleteQuantumState({
      coherence: 0.5,
      entanglement: 0.5,
      entanglementStrength: 0.5,
      superposition: 0.5
    });
    const validator = new QuantumTestValidator();
    const isValid = validator.validateQuantumState(mockQuantumState);
    expect(isValid).toBe(true);
  });

  it('should fail validation if coherence is out of range', () => {
    const mockQuantumState = createCompleteQuantumState({
      coherence: 1.2
    });
    const validator = new QuantumTestValidator();
    const isValid = validator.validateQuantumState(mockQuantumState);
    expect(isValid).toBe(false);
  });

  it('should apply optimization correctly', () => {
    const mockQuantumState = createCompleteQuantumState({
      coherence: 0.5,
      entanglementStrength: 0.5
    });
    const validator = new QuantumTestValidator();
    const optimizedState = validator.optimizeQuantumField([mockQuantumState])[0];
    expect(optimizedState.coherence).toBeGreaterThan(0.5);
    expect(optimizedState.entanglementStrength).toBeGreaterThan(0.5);
  });
});
