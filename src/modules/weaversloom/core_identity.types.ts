// src/modules/weaversloom/core_identity.types.ts

/**
 * Type alias for the name of a dimension.
 */
export type DimensionName = string;

/**
 * Type alias for the unique identifier of a dimension (typically UUID).
 */
export type DimensionUID = string;

/**
 * Type alias for the unique identifier of a user (typically UUID).
 */
export type UserUID = string;

/**
 * Type alias for a Unix timestamp (number).
 */
export type Timestamp = number;

/**
 * Type alias for the unique identifier of a glyph (typically UUID).
 */
export type GlyphUID = string;

/**
 * Interface or type for representing dimensional frequency.
 */
export interface DimensionalFrequency {
  base: number;
  overtones?: number[];
  waveform?: string;
}

/**
 * Interface for the Core Identity & Metaphysical Blueprint.
 */
export interface CoreIdentityAndBlueprint {
  dimensionName: DimensionName;
  dimensionUID: DimensionUID;
  creatorUID: UserUID;
  creationTimestamp: Timestamp;
  description: string; // Multiline allowed
  coreConceptGlyphs: GlyphUID[];
  dimensionalFrequency: DimensionalFrequency;
}
