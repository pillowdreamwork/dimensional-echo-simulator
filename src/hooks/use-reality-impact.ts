import { useState, useCallback } from 'react';
import type { 
  RealityImpact,
  RealityImpactResult,
  ImpactProcessOptions
} from '../types/impact';
import type { QuantumState } from '../types/quantum';

interface UseRealityImpactResult extends RealityImpact {
  isLoading: boolean;
  error: Error | null;
}

export function useRealityImpact(): UseRealityImpactResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const processImpact = useCallback(async (options: ImpactProcessOptions): Promise<RealityImpactResult> => {
    setIsLoading(true);
    try {
      const { quantumState, effects } = options;
      const stabilityChange = effects.reduce((sum, effect) => 
        sum + (effect.stabilityChange || 0), 0);
      
      // Process dimensional effects
      const result: RealityImpactResult = {
        stability: Math.max(0, Math.min(1, quantumState.dimensionalStability + stabilityChange)),
        coherence: Math.max(0, Math.min(1, quantumState.coherence - 0.1)),
        entanglement: Math.max(0, Math.min(1, quantumState.entanglementStrength + 0.05))
      };

      // Add dimensional shifts if present
      const dimensionChange = effects.reduce((sum, effect) => 
        sum + (effect.dimensionChange || 0), 0);
      if (dimensionChange !== 0) {
        result.dimensionalShift = dimensionChange;
      }

      return result;
    } catch (e) {
      const error = e instanceof Error ? e : new Error('Failed to process impact');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const calculateStability = useCallback((state: QuantumState): number => {
    const baseStability = state.dimensionalStability;
    const coherenceFactor = state.coherence * 0.3;
    const entanglementPenalty = state.entanglementStrength * 0.2;
    
    return Math.max(0, Math.min(1, baseStability + coherenceFactor - entanglementPenalty));
  }, []);

  return {
    processImpact,
    calculateStability,
    isLoading,
    error
  };
}
