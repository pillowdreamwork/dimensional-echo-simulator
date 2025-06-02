import { Vector3, Quaternion } from 'three';
import { DimensionalProperties, QuantumState } from './quantum';
import { GlyphNode, GlyphNodeConnection } from './glyph';

export interface WeaveNode extends Omit<GlyphNode, 'connections'> {
  position: Vector3;
  rotation: Quaternion;
  energyLevel: number;
  timelineStability: number;
  connections: Array<{
    targetId: string;
    strength: number;
    resonance: number;
  }>;
}

export interface TimelineBranchState {
  id: string;
  probability: number;
  stability: number;
  nodes: WeaveNode[];
  active: boolean;
}

export interface TesseractWeaveEditorProps {
  quantumState: QuantumState;
  dimensionalProperties: DimensionalProperties;
  onStateChange: (state: QuantumState) => void;
  onDimensionalShift: (props: DimensionalProperties) => void;
  className?: string;
}

export interface TesseractNode {
  id: string;
  position: Vector3;
  rotation: Quaternion;
  dimensionalCode: string;
  energyLevel: number;
  connections: string[];
  glyphPattern: string;
  timelineStability: number;
  realityAnchor?: {
    coordinates: Vector3;
    strength: number;
    resonance: string[];
  };
}
