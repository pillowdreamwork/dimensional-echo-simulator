// src/modules/weaversloom/material_energy.types.ts

/**
 * Type alias for the unique identifier of a glyph (typically UUID).
 * Re-defined here for clarity, though in a real project this might be imported.
 */
export type GlyphUID = string;

/**
 * Interface for defining the materiality profile of a dimension.
 */
export interface MaterialityProfile {
  baseState: 'Solid' | 'Liquid' | 'Gaseous' | 'Plasma' | 'PureEnergy' | 'Dreamstuff' | 'Information' | string; // string for custom
  transmutability: number; // e.g., 0.0 to 1.0
  elementalSystem?: GlyphUID[]; // Links to Glyphs defining an elemental system
}

/**
 * Interface for defining an individual energy system within a dimension.
 */
export interface EnergySystem {
  type: string; // e.g., 'MagicArcane', 'Psionic', 'LifeForce', user-defined
  source: 'Ambient' | 'EntityGenerated' | 'UserChannelled' | string; // string for custom
  conversionEfficiency?: number;
  depletionRate?: number;
  synergiesWith?: GlyphUID[];
  customProperties?: Record<string, any>;
}

/**
 * Interface for defining the trigger conditions of an interaction law.
 * Simplified for now.
 */
export interface LawTrigger {
  conditionType: string; // e.g., 'GlyphActive', 'EntityNearby', 'EnergyThreshold'
  parameters: Record<string, any>; // e.g., { glyph: 'glyph_fire', radius: 5 }
}

/**
 * Interface for defining the effects of an interaction law.
 * Simplified for now.
 */
export interface LawEffect {
  effectType: string; // e.g., 'SpawnEntity', 'ModifyParameter', 'ApplyStatus'
  parameters: Record<string, any>; // e.g., { entityArchetype: 'sprite_fire', count: 3 }
}

/**
 * Interface for defining an interaction law within a dimension.
 */
export interface InteractionLaw {
  lawUID: string; // Unique ID for the law
  description?: string;
  trigger: LawTrigger;
  effect: LawEffect;
  probability?: number; // 0.0 to 1.0, defaults to 1.0
  isEnabled?: boolean; // Defaults to true
}
