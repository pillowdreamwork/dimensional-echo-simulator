import { useState, useCallback } from 'react';
import { GlyphNode } from '../types/glyph';

interface UseQuantumStateProps {
  initialState?: GlyphNode['quantumState'];
  onStateChange?: (state: GlyphNode['quantumState']) => void;
}

export function useQuantumState({
  initialState = {
    superposition: 100,
    coherence: 100,
    entanglementStrength: 100
  },
  onStateChange
}: UseQuantumStateProps = {}) {
  const [quantumState, setQuantumState] = useState(initialState);

  const updateQuantumState = useCallback((updates: Partial<GlyphNode['quantumState']>) => {
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
      entanglementStrength: Math.max(0, quantumState.entanglementStrength * (collapseStrength + 0.2))
    });
  }, [quantumState, updateQuantumState]);

  const entangleWith = useCallback((targetState: GlyphNode['quantumState'], strength = 0.5) => {
    const entanglementFactor = Math.min(1, (quantumState.entanglementStrength + targetState.entanglementStrength) / 150);
    const coherenceFactor = Math.min(1, (quantumState.coherence + targetState.coherence) / 150);
    
    updateQuantumState({
      superposition: Math.max(quantumState.superposition, targetState.superposition) * strength,
      coherence: Math.min(quantumState.coherence, targetState.coherence) * (1 + coherenceFactor),
      entanglementStrength: Math.max(
        quantumState.entanglementStrength,
        targetState.entanglementStrength
      ) * entanglementFactor
    });
  }, [quantumState, updateQuantumState]);

  return {
    quantumState,
    updateQuantumState,
    collapseQuantumState,
    entangleWith
  };
}
