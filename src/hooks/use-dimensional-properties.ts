import { useState, useCallback } from 'react';
import type { DimensionalProperties } from '../types/dimensional';

export function useDimensionalProperties() {
  const [properties, setProperties] = useState<DimensionalProperties>({
    level: 1,
    resonance: 100,
    stability: 100,
    // Initialize harmonics as an empty array; update later if harmonic signatures are expected
    harmonics: [],
    entanglement: 0,
    phaseAlignment: 100
  });

  const updateProperties = useCallback((updates: Partial<DimensionalProperties>) => {
    setProperties(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const shiftDimension = useCallback((targetLevel: number) => {
    setProperties(prev => ({
      ...prev,
      level: targetLevel,
      resonance: Math.max(0, prev.resonance - 10),
      stability: Math.max(0, prev.stability - 20),
    }));
  }, []);

  return {
    dimensionalProperties: properties,
    updateDimensionalProperties: updateProperties,
    shiftDimension
  };
}
