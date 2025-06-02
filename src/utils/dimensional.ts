import { DimensionalLevel, DIMENSIONAL_PLANES, calculateHarmonicResonance } from '../types/dimensional';

/**
 * Calculate the stability threshold required for a given dimensional level
 */
export function getDimensionalStabilityThreshold(level: DimensionalLevel): number {
  const plane = DIMENSIONAL_PLANES.find(p => p.level === level);
  return plane ? plane.stabilityThreshold : 0.95; // Default to highest stability requirement
}

/**
 * Calculate the convergence factor between two dimensional states
 */
export function calculateConvergenceFactor(
  currentDimension: DimensionalLevel,
  targetDimension: DimensionalLevel,
  stabilityFactor: number
): number {
  const resonance = calculateHarmonicResonance(currentDimension, targetDimension);
  const stabilityThreshold = getDimensionalStabilityThreshold(currentDimension);
  
  // Penalize convergence if stability is below threshold
  const stabilityPenalty = stabilityFactor >= stabilityThreshold ? 1 : 
    Math.max(0.1, stabilityFactor / stabilityThreshold);

  return (resonance / 100) * stabilityPenalty;
}

/**
 * Get the recommended next dimension based on current stability and consciousness
 */
export function getRecommendedDimension(
  currentDimension: DimensionalLevel,
  stabilityFactor: number,
  consciousness: number
): DimensionalLevel {
  const currentPlane = DIMENSIONAL_PLANES.find(p => p.level === currentDimension);
  if (!currentPlane) return 1 as DimensionalLevel;

  // If stability is too low, recommend going down a level
  if (stabilityFactor < currentPlane.stabilityThreshold * 0.8) {
    return Math.max(1, currentDimension - 1) as DimensionalLevel;
  }

  // If consciousness is high enough and stability is good, recommend going up
  if (consciousness >= currentPlane.consciousness * 1.2 && 
      stabilityFactor >= currentPlane.stabilityThreshold) {
    return Math.min(12, currentDimension + 1) as DimensionalLevel;
  }

  // Otherwise stay at current level
  return currentDimension;
}

/**
 * Calculate the relative stability of a dimension compared to its required threshold
 */
export function calculateRelativeStability(
  dimension: DimensionalLevel,
  stabilityFactor: number
): number {
  const threshold = getDimensionalStabilityThreshold(dimension);
  return stabilityFactor / threshold;
}

/**
 * Format a dimensional frequency for display
 */
export function formatFrequency(frequency: number): string {
  return `${frequency.toFixed(0)} Hz`;
}

/**
 * Get active harmonics for a given dimension
 */
export function getActiveHarmonics(dimension: DimensionalLevel): string {
  const plane = DIMENSIONAL_PLANES.find(p => p.level === dimension);
  if (!plane) return '';
  
  return plane.harmonicSeries.map(formatFrequency).join(', ');
}
