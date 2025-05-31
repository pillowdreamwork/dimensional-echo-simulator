import { Vector3, Quaternion } from 'three';
import { DimensionalLevel, DimensionalPlane } from './dimensional';
import { QuantumState, TimelineState } from './quantum';

export interface GlyphNodeConnection {
    targetId: string;
    strength: number;
    phaseAlignment: number;
    dimensionalResonance: number;
    quantumBridge: {
        entanglementStrength: number;
        coherenceLevel: number;
        phaseMatch: number;
    };
    timelineBranch?: {
        probability: number;
        stabilityFactor: number;
        convergencePoint: number;
        divergenceVector: Vector3;
    };
}

export interface DimensionalNodeProperties {
    level: DimensionalLevel;
    resonance: number;
    stability: number;
    harmonics: string[];
    entanglement: number;
    phaseAlignment: number;
    frequency: number;
    vibration: number;
    consciousness: number;
}

export interface GlyphMetadata {
    createdAt: number;
    lastModified: number;
    energySignature: string;
    dimensionalOrigin: DimensionalLevel;
    stabilityHistory: Array<{
        timestamp: number;
        stability: number;
        dimension: DimensionalLevel;
    }>;
}

export interface GlyphNode {
    id: string;
    position: Vector3;
    rotation: Quaternion;
    dimensionalCode: string;
    glyphPattern: string;
    selected: boolean;
    aethericResonance: number;
    dimensionalStability: number;
    timelineConvergence: number;
    connections: GlyphNodeConnection[];
    dimensionalProperties: DimensionalNodeProperties;
    quantumState: QuantumState;
    timelineState: TimelineState;
    metadata: GlyphMetadata;
    visualProperties: {
        scale: number;
        opacity: number;
        emissiveIntensity: number;
        color: string;
        pulseFrequency: number;
        rotationSpeed: number;
    };
}

export interface GlyphTransformation {
    sourceNode: GlyphNode;
    targetDimension: DimensionalLevel;
    transformationType: 'ascend' | 'descend' | 'shift' | 'merge' | 'split';
    energyCost: number;
    probability: number;
    requiredStability: number;
    effects: Array<{
        type: string;
        magnitude: number;
        duration: number;
    }>;
}

// Helper function to create a new GlyphNode with default values
export function createGlyphNode(
    id: string,
    position: Vector3,
    dimension: DimensionalLevel,
    dimensionalPlane: DimensionalPlane
): GlyphNode {
    return {
        id,
        position,
        rotation: new Quaternion(),
        dimensionalCode: `#QF-${id}`,
        glyphPattern: '',
        selected: false,
        aethericResonance: 1.0,
        dimensionalStability: dimensionalPlane.stabilityThreshold,
        timelineConvergence: 1.0,
        connections: [],
        dimensionalProperties: {
            level: dimension,
            resonance: 100,
            stability: 100,
            harmonics: [],
            entanglement: 100,
            phaseAlignment: 100,
            frequency: dimensionalPlane.baseFrequency,
            vibration: dimensionalPlane.baseFrequency,
            consciousness: dimensionalPlane.consciousness
        },
        quantumState: {
            superposition: 100,
            coherence: 100,
            entanglementStrength: 100,
            phase: 0,
            spin: 0
        },
        timelineState: {
            branchFactor: 1,
            stabilityIndex: 100,
            convergencePoint: 1,
            divergenceDegree: 0
        },
        metadata: {
            createdAt: Date.now(),
            lastModified: Date.now(),
            energySignature: `ES-${Math.random().toString(36).substr(2, 9)}`,
            dimensionalOrigin: dimension,
            stabilityHistory: []
        },
        visualProperties: {
            scale: 1,
            opacity: 1,
            emissiveIntensity: 1,
            color: dimensionalPlane.color,
            pulseFrequency: dimensionalPlane.baseFrequency / 1000,
            rotationSpeed: 0.01
        }
    };
}
