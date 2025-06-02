import { useState, useCallback } from 'react';
import { getEngineModules } from '../lib/engine';
import type { DimensionalImpact, RealityFeedback, PersonalEffect } from '../types/impact';

interface QuantumState {
  dimensionalStability: number;
  coherence: number;
  entanglementStrength: number;
}

interface ImpactResult {
  success: boolean;
  stability: number;
  coherence: number;
  entanglement: number;
  dimensionalShift?: number;
}

interface UseRealityImpactResult {
  isLoading: boolean;
  error: Error | null;
  processImpact: (impact: DimensionalImpact) => Promise<ImpactResult>;
  calculateStability: (state: QuantumState) => number;
  clearError: () => void;
}

export function useRealityImpact(): UseRealityImpactResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const processImpact = useCallback(async (impact: DimensionalImpact): Promise<ImpactResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const modules = await getEngineModules();
      
      if (!modules.echoSimulator || !modules.dreamServer) {
        throw new Error('Required engine modules are not available');
      }

      const result = await modules.echoSimulator.processQuantumEffect({
        impact,
        timestamp: Date.now(),
        containment: modules.dreamServer.getContainmentLevel()
      });

      // Validate and normalize results
      const stability = Math.max(0, Math.min(1, result.stability));
      const coherence = Math.max(0, Math.min(1, result.coherence));
      const entanglement = Math.max(0, Math.min(1, result.entanglement));

      return {
        success: true,
        stability,
        coherence,
        entanglement,
        ...(result.dimensionalShift && { dimensionalShift: result.dimensionalShift })
      };

    } catch (e) {
      const thrownError = e instanceof Error ? e : new Error('Failed to process impact');
      setError(thrownError);
      return {
        success: false,
        stability: 0,
        coherence: 0,
        entanglement: 0
      };
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
    isLoading,
    error,
    processImpact,
    calculateStability,
    clearError
  };
}
