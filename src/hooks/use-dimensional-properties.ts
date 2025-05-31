import { useState, useCallback } from 'react';
import { GlyphNode } from '../types/glyph';
import { DimensionalLevel, DIMENSIONAL_PROPERTIES } from '../types/dimensional';

interface UseDimensionalPropertiesProps {
  initialLevel?: DimensionalLevel;
  onPropertyChange?: (properties: GlyphNode['dimensionalProperties']) => void;
}

const calculateHarmonics = (dimension: number): string[] => {
  const baseHarmonics = [
    "Quantum Resonance",
    "Timeline Stability",
    "Consciousness Wave",
    "Reality Matrix",
    "Divine Light",
    "Unity Field",
    "Spirit Lattice",
    "Akashic Current",
    "Cosmic Flow",
    "Ethereal Web",
    "Source Connection",
    "Infinite Loop"
  ];
  
  return baseHarmonics
    .slice(0, dimension)
    .map(h => `${h}-${dimension}D`);
};

export function useDimensionalProperties({
  initialLevel = 3,
  onPropertyChange
}: UseDimensionalPropertiesProps = {}) {
  const [properties, setProperties] = useState<GlyphNode['dimensionalProperties']>({
    level: initialLevel,
    resonance: 100,
    stability: 100,
    harmonics: calculateHarmonics(initialLevel),
    entanglement: 100,
    phaseAlignment: 100
  });

  const updateProperties = useCallback((updates: Partial<GlyphNode['dimensionalProperties']>) => {
    setProperties(prev => {
      const newProps = {
        ...prev,
        ...updates
      };
      onPropertyChange?.(newProps);
      return newProps;
    });
  }, [onPropertyChange]);

  const shiftDimension = useCallback((targetLevel: DimensionalLevel) => {
    if (targetLevel === properties.level) return;

    const distance = Math.abs(targetLevel - properties.level);
    const stabilityLoss = distance * 5;
    const resonanceLoss = distance * 10;
    const phaseLoss = distance * 8;
    const entanglementLoss = distance * 3;

    updateProperties({
      level: targetLevel,
      stability: Math.max(0, properties.stability - stabilityLoss),
      resonance: Math.max(0, properties.resonance - resonanceLoss),
      harmonics: calculateHarmonics(targetLevel),
      phaseAlignment: Math.max(0, properties.phaseAlignment - phaseLoss),
      entanglement: Math.max(0, properties.entanglement - entanglementLoss)
    });
  }, [properties, updateProperties]);

  return {
    properties,
    updateProperties,
    shiftDimension,
    dimensionalInfo: DIMENSIONAL_PROPERTIES[properties.level]
  };
}
