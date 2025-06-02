import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DimensionalProperties, DimensionalLevel } from "@/types/dimensional";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatNumber(
  number: number,
  options: { decimals?: number; prefix?: string; suffix?: string } = {}
): string {
  const { decimals = 2, prefix = "", suffix = "" } = options;
  const formatted = number.toFixed(decimals);
  return `${prefix}${formatted}${suffix}`;
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Dimensional Simulation Utilities
export function calculateDimensionalResonance(
  source: DimensionalProperties,
  target: DimensionalProperties
): number {
  const levelDiff = Math.abs(source.level - target.level);
  const harmonicOverlap = source.harmonics.filter((h) => target.harmonics.includes(h))
    .length;
  const stabilityFactor = Math.min(source.stability, target.stability);
  const timelineCoherence = Math.min(source.timelineFactor, target.timelineFactor);

  return Math.max(
    0,
    Math.min(
      1,
      (1 - levelDiff / 12) * 0.4 +
        (harmonicOverlap /
          Math.max(source.harmonics.length, target.harmonics.length)) *
          0.3 +
        stabilityFactor * 0.2 +
        timelineCoherence * 0.1
    )
  );
}

export function formatDimensionalCoordinates(properties: DimensionalProperties): string {
  const stabilityHex = Math.floor(properties.stability * 255).toString(16).padStart(2, "0");
  const phaseHex = Math.floor(properties.phaseAlignment * 255).toString(16).padStart(2, "0");
  const energyHex = Math.floor(properties.energy * 255).toString(16).padStart(2, "0");
  return `DIM-${properties.level.toString().padStart(2, "0")}-${stabilityHex}${phaseHex}${energyHex}`;
}

export function getDimensionalState(properties: DimensionalProperties): {
  status: "stable" | "unstable" | "critical";
  description: string;
  color: string;
} {
  const { stability, resonance, phaseAlignment, timelineFactor, energy, anchors } = properties;
  const anchorStrength = anchors.strength;

  const overallStability =
    stability * 0.3 +
    resonance * 0.2 +
    phaseAlignment * 0.2 +
    timelineFactor * 0.15 +
    energy * 0.1 +
    anchorStrength * 0.05;

  if (overallStability >= 0.8) {
    return {
      status: "stable",
      description: "Dimensional matrix is stable",
      color: "emerald",
    };
  } else if (overallStability >= 0.5) {
    return {
      status: "unstable",
      description: "Minor dimensional fluctuations detected",
      color: "amber",
    };
  } else {
    return {
      status: "critical",
      description: "Severe dimensional instability",
      color: "red",
    };
  }
}

export function interpolateDimensionalValues(
  start: DimensionalProperties,
  end: DimensionalProperties,
  progress: number
): DimensionalProperties {
  const interpolate = (a: number, b: number) =>
    a + (b - a) * Math.min(1, Math.max(0, progress));

  return {
    level: Math.round(interpolate(start.level, end.level)) as DimensionalLevel,
    resonance: interpolate(start.resonance, end.resonance),
    stability: interpolate(start.stability, end.stability),
    harmonics: progress >= 0.5 ? end.harmonics : start.harmonics,
    entanglement: interpolate(start.entanglement, end.entanglement),
    phaseAlignment: interpolate(start.phaseAlignment, end.phaseAlignment),
    timelineFactor: interpolate(start.timelineFactor, end.timelineFactor),
    energy: interpolate(start.energy, end.energy),
    anchors: {
      points: progress >= 0.5 ? end.anchors.points : start.anchors.points,
      strength: interpolate(start.anchors.strength, end.anchors.strength),
    },
  };
}

export function validateDimensionalTransition(
  from: DimensionalProperties,
  to: DimensionalProperties
): {
  canTransition: boolean;
  energyRequired: number;
  warnings: string[];
} {
  const warnings: string[] = [];
  const levelDiff = Math.abs(from.level - to.level);
  const energyRequired = levelDiff * 0.2 + (1 - from.stability) * 0.3;

  if (from.energy < energyRequired) {
    warnings.push(`Insufficient energy for transition (${energyRequired.toFixed(2)} required)`);
  }

  if (from.stability < 0.5) {
    warnings.push("Low stability may cause transition instability");
  }

  if (from.timelineFactor < 0.4) {
    warnings.push("Timeline coherence too low for safe transition");
  }

  if (from.anchors.strength < 0.3) {
    warnings.push("Weak dimensional anchoring detected");
  }

  return {
    canTransition: warnings.length === 0,
    energyRequired,
    warnings,
  };
}
