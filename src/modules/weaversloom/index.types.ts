// src/modules/weaversloom/index.types.ts

// Core Identity
export * from './core_identity.types';
import { CoreIdentityAndBlueprint } from './core_identity.types';

// Spatio-Temporal Fabric & Physics
export * from './space_time_physics.types';
import { SpatioTemporalFabric } from './space_time_physics.types';

// Materiality & Energy Systems & Laws
export * from './material_energy.types';
import { MaterialityProfile, EnergySystem, InteractionLaw, GlyphUID } from './material_energy.types'; // Assuming GlyphUID might be used broadly

// Sentience & Stability
export * from './sentience_stability.types';
import { SentienceAndConsciousnessPotential, StabilityAndEvolutionaryFactors } from './sentience_stability.types';

// Aesthetic & Sensory Profile
export * from './aesthetic_sensory.types';
import { AestheticAndSensoryProfile } from './aesthetic_sensory.types';

// Entity Archetypes (specifically ArchetypeUID for seeding)
// Re-exporting all from entity_archetype for general use, though only ArchetypeUID is strictly needed here.
export * from './entity_archetype.types';
import { ArchetypeUID } from './entity_archetype.types';

// Entity Instances (re-exporting for completeness, not directly in DimensionBlueprint)
export * from './entity_instance.types';


/**
 * Represents a simplified structure for defining initial entity seeding.
 * Links an ArchetypeUID to a count for initial placement.
 */
export interface EntityArchetypeUIDWithCount {
  archetypeUID: ArchetypeUID;
  count: number;
  // Could add initial placement instructions or zone IDs later
}

/**
 * The comprehensive DimensionBlueprint interface.
 * This aggregates all defined aspects of a dimension into a single object.
 * It serves as the central data model for a dimension's design and state.
 */
export interface DimensionBlueprint {
  // Core Identity - from core_identity.types.ts
  identity: CoreIdentityAndBlueprint;

  // Spatio-Temporal Fabric - from space_time_physics.types.ts
  fabric: SpatioTemporalFabric;

  // Materiality Profile - from material_energy.types.ts
  materiality: MaterialityProfile;

  // Energy Systems - from material_energy.types.ts
  // Assuming a dimension can have multiple distinct energy systems
  energySystems: EnergySystem[];

  // Laws of Interaction - from material_energy.types.ts
  interactionLaws: InteractionLaw[];

  // Sentience & Consciousness Potential - from sentience_stability.types.ts
  sentience: SentienceAndConsciousnessPotential;

  // Stability & Evolutionary Factors - from stability_stability.types.ts (corrected filename)
  stability: StabilityAndEvolutionaryFactors;

  // Aesthetic & Sensory Profile - from aesthetic_sensory.types.ts
  aesthetics: AestheticAndSensoryProfile;

  // Initial Entity Seedings - defined locally using ArchetypeUID from entity_archetype.types.ts
  initialEntitySeedings?: EntityArchetypeUIDWithCount[];

  // Versioning and Metadata (can be expanded)
  version: number; // Blueprint specification version
  metadata?: Record<string, any>; // For any other custom data or notes
}

// Note: The structure of DimensionBlueprint (e.g., 'identity', 'fabric' as top-level keys)
// is a design choice. Adjust as needed based on how these blueprints will be managed and accessed.
// The 'GlyphUID' type is also re-exported from material_energy.types.ts due to its common usage.
