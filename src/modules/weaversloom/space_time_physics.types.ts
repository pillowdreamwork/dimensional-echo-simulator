// src/modules/weaversloom/space_time_physics.types.ts

/**
 * Interface for defining the spatial geometry of a dimension.
 */
export interface SpatialGeometry {
  type: 'Euclidean' | 'Hyperbolic' | 'Spherical' | 'AbstractGraph' | 'Unmanifest' | string; // string for custom types
  dimensionality: number | 'Fractal' | string; // string for custom descriptions
  allowsLooping?: boolean;
}

/**
 * Interface for defining the temporal flow characteristics of a dimension.
 */
export interface TemporalFlow {
  rate: 'Static' | 'Slow' | 'Normal' | 'Accelerated' | 'Erratic' | 'UserDriven' | string; // string for custom
  isCyclical?: boolean;
  paradoxTolerance?: 'none' | 'low' | 'medium' | 'high' | string; // string for custom
}

/**
 * Interface for defining the fundamental aetheric constants of a dimension.
 */
export interface AethericConstants {
  cohesionFactor: number; // e.g., 0.0 to 1.0+
  luminaFlux: number; // e.g., speed of light/energy propagation, 1.0 is 'normal'
  manaDensity: number; // e.g., background energy field, 0.0 to 1.0+
  entropyRate: number; // e.g., tendency towards order/disorder, 0.0 to 1.0+
}

/**
 * Interface for the Spatio-Temporal Fabric, combining spatial, temporal, and aetheric properties.
 */
export interface SpatioTemporalFabric {
  spatialGeometry: SpatialGeometry;
  temporalFlow: TemporalFlow;
  aethericConstants: AethericConstants;
}
