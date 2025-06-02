import { Vector3 } from 'three';
import { DimensionalLevel } from './dimensional';
import { QuantumState } from './quantum';

export interface TimelineBranch {
  id: string;
  parentBranchId: string | null;
  activeBranches: string[];
  probability: number;
  stability: number;
  createdAt: number;
  mergePoints: Array<{
    targetBranchId: string;
    probability: number;
    timestamp: number;
  }>;
}

export interface TimelineState {
  activeBranches: string[];
  currentBranch: string;
  branchHistory: Array<{
    branchId: string;
    action: 'created' | 'merged' | 'deleted';
    timestamp: number;
    metadata: Record<string, any>;
  }>;
  mergePoints: Array<{
    sourceBranchId: string;
    targetBranchId: string;
    timestamp: number;
    probability: number;
    stability: number;
  }>;
  stability: number;
  probability: number;
}

export interface TimelineMergeResult {
  success: boolean;
  newBranchState: TimelineBranch;
  quantumStateChanges: Partial<QuantumState>;
  dimensionalEffects: Array<{
    type: string;
    magnitude: number;
    dimension: DimensionalLevel;
  }>;
}

export interface TimelineBranchingConfig {
  maxBranches: number;
  minStability: number;
  energyCost: number;
  divergenceProbability: number;
  dimensionalConstraints: {
    minDimension: DimensionalLevel;
    maxDimension: DimensionalLevel;
  };
}
