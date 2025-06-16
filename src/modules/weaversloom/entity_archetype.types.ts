// src/modules/weaversloom/entity_archetype.types.ts

/**
 * Type alias for the unique identifier of a glyph (typically UUID).
 * Re-defined here for clarity, though in a real project this might be imported.
 */
export type GlyphUID = string;

/**
 * Type alias for the unique identifier of an entity archetype (typically UUID).
 */
export type ArchetypeUID = string;

/**
 * Interface for defining an energy pool within an entity's base properties.
 */
export interface EnergyPool {
  type: string; // e.g., 'ManaArcane', 'LifeForce'
  current: number;
  max: number;
  regenerationRate?: number;
}

/**
 * Interface for defining resistance or vulnerability to a specific type.
 */
export interface ResistanceVulnerability {
  type: string; // e.g., 'Damage_Fire', 'Effect_MindControl'
  value: number; // e.g., 0.5 for 50% resistance, 1.5 for 50% vulnerability
}

/**
 * Interface for defining the material composition of an entity.
 */
export interface MaterialComposition {
  primaryEssence: string; // e.g., 'Dreamstuff', 'PureEnergy', links to MaterialityProfile.baseState
  resistances?: ResistanceVulnerability[];
  vulnerabilities?: ResistanceVulnerability[];
}

/**
 * Interface for defining the base properties of an entity archetype.
 */
export interface BaseEntityProperties {
  health: { current: number; max: number; regenerationRate?: number };
  energyPools?: EnergyPool[];
  size?: number;
  density?: number;
  sentienceSignature?: string; // e.g., 'Reactive', 'Instinctual', 'PatternBasedAI'
  mobilityType?: string; // e.g., 'Static', 'Floating', 'Phasing'
  perceptionRadius?: number;
}

/**
 * Interface for defining an Entity Archetype.
 */
export interface EntityArchetype {
  archetypeUID: ArchetypeUID;
  archetypeName: string;
  description?: string;
  coreGlyphAffinities?: GlyphUID[];
  baseProperties: BaseEntityProperties;
  materialComposition: MaterialComposition;
  behavioralScripts: any; // Placeholder: Record<string, any>[] or string[] for script UIDs
  evolutionaryPaths: any; // Placeholder: Record<string, any>[] for path definitions
  visualAppearanceKeywords?: string[];
  soundProfileKeywords?: string[];
}
