// src/modules/weaversloom/aesthetic_sensory.types.ts

/**
 * Type alias for the unique identifier of a color palette (typically UUID).
 * Re-defined here for clarity, though in a real project this might be imported.
 */
export type PaletteUID = string; // Typically UUID

/**
 * Type alias for the unique identifier of a soundscape (typically UUID).
 * Re-defined here for clarity, though in a real project this might be imported.
 */
export type SoundscapeUID = string; // Typically UUID

/**
 * Interface for describing the richness of sensory experiences in a dimension.
 */
export interface SensoryRichness {
  olfactoryProfile?: string[] | string; // Keywords or a profile UID
  tactileQualities?: string[] | string; // Keywords or a profile UID
  thermicProfile?: 'Frozen' | 'Cool' | 'Temperate' | 'Warm' | 'Scorching' | 'Fluctuating' | string;
  aethericPressure?: 'Low_Expansive' | 'Neutral' | 'High_Constricting' | string;
  customSensory?: Record<string, string | string[]>; // For other non-standard senses
}

/**
 * Interface for defining the aesthetic and sensory profile of a dimension.
 */
export interface AestheticAndSensoryProfile {
  dominantColorPaletteUID?: PaletteUID;
  baseSoundscapeUID?: SoundscapeUID;
  visualStyleKeywords?: string[];
  sensoryRichness?: SensoryRichness;
  visualProfileUID?: string; // Optional link to a holistic pre-designed Visual Profile

  // Placeholders for more detailed interfaces to be defined later
  skyAndAtmosphere?: Record<string, any>;
  lightAndShadowProfile?: Record<string, any>;
  terrainAndStructureProfile?: Record<string, any>;
  floraAndFaunaVisuals?: Record<string, any>;
  visualEffectsProfile?: Record<string, any>;
}
