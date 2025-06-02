import { useState, useCallback, useEffect } from 'react';
import type { DimensionalProperties, DimensionalEffect } from '../types/dimensional';

const CONSTRAINTS = {
  DIMENSION: {
    MIN_LEVEL: 1,
    MAX_LEVEL: 12
  },
  RESONANCE: {
    MIN: 0,
    MAX: 100
  },
  STABILITY: {
    MIN: 0,
    MAX: 100
  },
  PHASE: {
    MIN: 0,
    MAX: 100,
    ALIGNMENT_THRESHOLD: 85
  },
  ENTANGLEMENT: {
    DECAY_RATE: 0.05,
    MAX: 100
  },
  ENERGY: {
    MIN: 0,
    MAX: 100
  }
} as const;

interface DimensionalConstraints {
  maxLevel: number;
  minResonance: number;
  maxResonance: number;
  minStability: number;
  maxStability: number;
  requiredHarmonics: string[];
  minPhaseAlignment?: number;
  maxEntanglement?: number;
  minEnergy?: number;
  maxEnergy?: number;
}

interface StabilityCheck {
  isStable: boolean;
  warnings: string[];
  suggestedActions: string[];
}

interface UseDimensionalPropertiesResult {
  properties: DimensionalProperties;
  stabilityStatus: StabilityCheck;
  updateProperties: (updates: Partial<DimensionalProperties>) => void;
  resetProperties: () => void;
  checkStability: () => StabilityCheck;
}

const DEFAULT_CONSTRAINTS: DimensionalConstraints = {
  maxLevel: CONSTRAINTS.DIMENSION.MAX_LEVEL,
  minResonance: CONSTRAINTS.RESONANCE.MIN,
  maxResonance: CONSTRAINTS.RESONANCE.MAX,
  minStability: CONSTRAINTS.STABILITY.MIN,
  maxStability: CONSTRAINTS.STABILITY.MAX,
  requiredHarmonics: ['alpha', 'beta', 'gamma'],
  minPhaseAlignment: 60,
  maxEntanglement: CONSTRAINTS.ENTANGLEMENT.MAX,
  minEnergy: CONSTRAINTS.ENERGY.MIN,
  maxEnergy: CONSTRAINTS.ENERGY.MAX
};

const DEFAULT_PROPERTIES: DimensionalProperties = {
  level: 1,
  resonance: 100,
  stability: 100,
  harmonics: ['alpha', 'beta', 'gamma'],
  entanglement: 0,
  phaseAlignment: 100,
  timelineFactor: 1,
  energy: 100,
  anchors: {
    points: [],
    strength: 1
  }
};

export function useDimensionalProperties(
  initialProperties: Partial<DimensionalProperties> = {},
  constraints: Partial<DimensionalConstraints> = {}
): UseDimensionalPropertiesResult {
  const configConstraints = { ...DEFAULT_CONSTRAINTS, ...constraints };
  
  const [properties, setProperties] = useState<DimensionalProperties>(() => ({
    ...DEFAULT_PROPERTIES,
    ...initialProperties
  }));

  const [stabilityStatus, setStabilityStatus] = useState<StabilityCheck>({
    isStable: true,
    warnings: [],
    suggestedActions: []
  });

  const checkStability = useCallback(() => {
    const warnings: string[] = [];
    const suggestedActions: string[] = [];

    if (!properties.harmonics.some(h => configConstraints.requiredHarmonics.includes(h))) {
      warnings.push('Missing required harmonics');
      suggestedActions.push('Add required harmonics to stabilize');
    }

    if (properties.phaseAlignment < (configConstraints.minPhaseAlignment ?? 60)) {
      warnings.push('Low phase alignment');
      suggestedActions.push('Increase phase alignment');
    }

    if (properties.entanglement > (configConstraints.maxEntanglement ?? 100)) {
      warnings.push('High entanglement');
      suggestedActions.push('Reduce entanglement');
    }

    if (properties.timelineFactor < 0.5) {
      warnings.push('Timeline instability');
      suggestedActions.push('Stabilize timeline');
    }

    if (properties.energy < (configConstraints.minEnergy ?? 20)) {
      warnings.push('Low energy');
      suggestedActions.push('Increase energy levels');
    }

    if (properties.anchors.strength < 0.5) {
      warnings.push('Weak anchoring');
      suggestedActions.push('Strengthen anchors');
    }

    const status = { isStable: warnings.length === 0, warnings, suggestedActions };
    setStabilityStatus(status);
    return status;
  }, [properties, configConstraints]);

  const updateProperties = useCallback((updates: Partial<DimensionalProperties>) => {
    setProperties(current => ({
      ...current,
      ...updates,
      level: updates.level !== undefined 
        ? Math.min(Math.max(CONSTRAINTS.DIMENSION.MIN_LEVEL, updates.level), configConstraints.maxLevel)
        : current.level,
      resonance: updates.resonance !== undefined
        ? Math.min(Math.max(configConstraints.minResonance, updates.resonance), configConstraints.maxResonance)
        : current.resonance,
      stability: updates.stability !== undefined
        ? Math.min(Math.max(configConstraints.minStability, updates.stability), configConstraints.maxStability)
        : current.stability,
      harmonics: updates.harmonics
        ? [...new Set([...configConstraints.requiredHarmonics, ...updates.harmonics])]
        : current.harmonics,
      entanglement: updates.entanglement !== undefined
        ? Math.min(Math.max(0, updates.entanglement), configConstraints.maxEntanglement ?? CONSTRAINTS.ENTANGLEMENT.MAX)
        : current.entanglement,
      phaseAlignment: updates.phaseAlignment !== undefined
        ? Math.min(Math.max(CONSTRAINTS.PHASE.MIN, updates.phaseAlignment), CONSTRAINTS.PHASE.MAX)
        : current.phaseAlignment,
      timelineFactor: updates.timelineFactor !== undefined
        ? Math.min(Math.max(0, updates.timelineFactor), 1)
        : current.timelineFactor,
      energy: updates.energy !== undefined
        ? Math.min(Math.max(configConstraints.minEnergy ?? CONSTRAINTS.ENERGY.MIN, updates.energy),
            configConstraints.maxEnergy ?? CONSTRAINTS.ENERGY.MAX)
        : current.energy,
      anchors: updates.anchors
        ? {
            points: updates.anchors.points ?? current.anchors.points,
            strength: Math.min(Math.max(0, updates.anchors.strength ?? current.anchors.strength), 1)
          }
        : current.anchors
    }));
  }, [configConstraints]);

  const resetProperties = useCallback(() => {
    setProperties(DEFAULT_PROPERTIES);
  }, []);

  useEffect(() => {
    checkStability();
  }, [properties, checkStability]);

  return {
    properties,
    stabilityStatus,
    updateProperties,
    resetProperties,
    checkStability
  };
}