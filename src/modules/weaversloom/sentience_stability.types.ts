// src/modules/weaversloom/sentience_stability.types.ts

/**
 * Type alias for the base sentience level of a dimension.
 */
export type SentienceLevel =
  | 'DormantUnconscious'
  | 'PrimordialAwareness'
  | 'AnimalisticSentiency'
  | 'SapientPotential'
  | 'EnlightenedField'
  | 'VoidConsciousness'
  | string; // string for custom

/**
 * Type alias for the forms through which consciousness can express itself.
 */
export type ConsciousnessExpressionForm =
  | 'IndividualMinds'
  | 'HiveMind'
  | 'DistributedNetworkConsciousness'
  | 'GeomanticConsciousness'
  | 'SymbolicResonance'
  | string; // string for custom

/**
 * Interface for defining the sentience and consciousness potential of a dimension.
 */
export interface SentienceAndConsciousnessPotential {
  baseSentienceLevel: SentienceLevel;
  consciousnessExpressionForms: ConsciousnessExpressionForm[];
  memeticPermeability: number; // e.g., 0.0 to 1.0
  dreamLogicInfluence: number; // e.g., 0.0 to 1.0
}

/**
 * Type alias for the drivers of evolution within a dimension.
 */
export type EvolutionaryDriver =
  | 'Conflict'
  | 'Cooperation'
  | 'ResourceScarcity'
  | 'KnowledgeAccumulation'
  | 'HarmonicResonanceShifts'
  | 'UserIntervention'
  | string; // string for custom

/**
 * Interface for defining the stability and evolutionary factors of a dimension.
 */
export interface StabilityAndEvolutionaryFactors {
  baseStabilityFactor: number; // e.g., 0.0 to 1.0
  evolutionaryDrivers: EvolutionaryDriver[];
  anomalyPotential: number; // e.g., 0.0 to 1.0
}
