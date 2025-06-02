
import { useState, useCallback } from 'react';
import { GlyphNode, DimensionalNodeProperties } from '../types/glyph';
import { DimensionalLevel, DIMENSIONAL_PROPERTIES } from '../types/glyph';

interface UseDimensionalPropertiesProps {
  initialLevel?: DimensionalLevel;
  onPropertyChange?: (properties: DimensionalNodeProperties) => void;
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
  const dimProps = DIMENSIONAL_PROPERTIES[initialLevel];
  
  const [properties, setProperties] = useState<DimensionalNodeProperties>({
    level: initialLevel,
    resonance: dimProps.resonance,
    stability: dimProps.stability,
    harmonics: dimProps.harmonics,
    entanglement: dimProps.entanglement,
    phaseAlignment: dimProps.phaseAlignment,
    frequency: dimProps.frequency,
    vibration: dimProps.vibration,
    consciousness: dimProps.consciousness
  });

  const updateProperties = useCallback((updates: Partial<DimensionalNodeProperties>) => {
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
    const targetProps = DIMENSIONAL_PROPERTIES[targetLevel];

    updateProperties({
      level: targetLevel,
      stability: Math.max(0, properties.stability - stabilityLoss),
      resonance: Math.max(0, properties.resonance - resonanceLoss),
      harmonics: targetProps.harmonics,
      phaseAlignment: Math.max(0, properties.phaseAlignment - phaseLoss),
      entanglement: Math.max(0, properties.entanglement - entanglementLoss),
      frequency: targetProps.frequency,
      vibration: targetProps.vibration,
      consciousness: targetProps.consciousness
    });
  }, [properties, updateProperties]);

  return {
    properties,
    updateProperties,
    shiftDimension,
    dimensionalInfo: DIMENSIONAL_PROPERTIES[properties.level]
  };
}
