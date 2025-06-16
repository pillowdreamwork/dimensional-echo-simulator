// src/modules/weaversloom/entity_instance.types.ts

/**
 * Type alias for the unique identifier of an entity archetype (typically UUID).
 * Re-defined here for clarity, though in a real project this might be imported.
 */
export type ArchetypeUID = string;

/**
 * Type alias for the unique identifier of an entity instance (typically UUID).
 */
export type EntityUID = string;

/**
 * Type alias for a Unix timestamp (number).
 * Re-defined here for clarity, though in a real project this might be imported.
 */
export type Timestamp = number;

/**
 * Interface for a simple 3D vector.
 */
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * Interface for a simple quaternion for orientation.
 */
export interface Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
}

/**
 * Interface for an active effect on an entity (e.g., status effects).
 */
export interface ActiveEffect {
  effectUID: string; // Links to a definition of the effect
  description?: string;
  duration?: number; // In simulation ticks or seconds
  sourceLawUID?: string; // UID of the InteractionLaw or dimensional property causing it
  customProperties?: Record<string, any>;
}

/**
 * Interface for the dynamic state of an entity instance.
 */
export interface CurrentEntityProperties {
  currentHealth: number;
  currentEnergyPools?: Record<string, { current: number; max: number }>; // Keyed by energy type string
  position: Vector3;
  orientation: Quaternion;
  velocity?: Vector3; // Optional
  currentBehaviorState?: string; // e.g., 'Idle', 'Attacking', 'Fleeing'
  activeEffects?: ActiveEffect[];
  customDynamicData?: Record<string, any>; // For any other fleeting state
}

/**
 * Interface for an Entity Instance within a dimension.
 */
export interface EntityInstance {
  entityUID: EntityUID;
  instanceName?: string; // Optional specific name
  archetypeUID: ArchetypeUID; // Links to the EntityArchetype
  currentProperties: CurrentEntityProperties;
  creationTimestamp: Timestamp;
  allegianceID?: string; // Optional faction/group ID
  customStaticData?: Record<string, any>; // For unique traits not part of archetype but also not fleeting
}
