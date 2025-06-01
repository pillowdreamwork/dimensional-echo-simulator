import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import { Vector3, Quaternion } from 'three';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import {
    InfinityIcon,
    Maximize2Icon,
    MinimizeIcon,
    Plus,
    SaveIcon,
    Wand2Icon,
    Square // Use Square instead of Cube
} from 'lucide-react';
import { QuantumTesseractEngine, TesseractNode } from '@/lib/cores/quantum-tesseract';
import { cn } from '@/lib/utils';
import { TimelineBranchVisualizer } from './dreamforge/TimelineBranchVisualizer';
import { InterDimensionalConnection } from './dreamforge/InterDimensionalConnection';
import { GlyphNodeMesh } from './dreamforge/GlyphNodeMesh';
import { QuantumState, DimensionalProperties } from '@/types/quantum';
import { GlyphNode, GlyphNodeConnection } from '@/types/glyph';
import { ClubIcon } from "lucide-react";

interface WeaveNode extends Omit<GlyphNode, 'connections'> {
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

interface TimelineBranchState {
  id: string;
  probability: number;
  stability: number;
  nodes: WeaveNode[];
  active: boolean;
}

interface TesseractWeaveEditorProps {
  quantumState: QuantumState;
  dimensionalProperties: DimensionalProperties;
  onStateChange: (state: QuantumState) => void;
  onDimensionalShift: (props: DimensionalProperties) => void;
  className?: string;
}

export function TesseractWeaveEditor({
  quantumState,
  dimensionalProperties,
  onStateChange,
  onDimensionalShift,
  className
}: TesseractWeaveEditorProps) {
  const [nodes, setNodes] = useState<WeaveNode[]>([]);
  const [timelineBranches, setTimelineBranches] = useState<TimelineBranchState[]>([]);
  const [activeTimeline, setActiveTimeline] = useState<string | null>(null);
  const [branchingInProgress, setBranchingInProgress] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<QuantumTesseractEngine>(new QuantumTesseractEngine());

  useEffect(() => {
    // Initialize main timeline
    if (timelineBranches.length === 0) {
      setTimelineBranches([{
        id: 'main',
        probability: 1,
        stability: 1,
        nodes: nodes,
        active: true
      }]);
      setActiveTimeline('main');
    }
  }, [nodes, timelineBranches.length]);

  const handleTimelineBranch = async (sourceNode: WeaveNode) => {
    setBranchingInProgress(true);
    try {
      const branchId = `branch-${Date.now()}`;
      const branchProbability = quantumState.superposition / 100;
      const branchStability = dimensionalProperties.stability / 100;
      
      // Create new timeline branch
      const newBranch: TimelineBranchState = {
        id: branchId,
        probability: branchProbability,
        stability: branchStability,
        nodes: nodes.map(node => ({
          ...node,
          timelineStability: node.timelineStability * branchStability
        })),
        active: false
      };

      setTimelineBranches(prev => [...prev, newBranch]);
      
      // Update quantum state
      onStateChange({
        ...quantumState,
        superposition: Math.max(0, quantumState.superposition - 20),
        coherence: Math.min(100, quantumState.coherence + 10)
      });

    } catch (error) {
      console.error('Timeline branching failed:', error);
    } finally {
      setBranchingInProgress(false);
    }
  };

  const handleBranchSelect = (branchId: string) => {
    setTimelineBranches(prev => prev.map(branch => ({
      ...branch,
      active: branch.id === branchId
    })));
    setActiveTimeline(branchId);
  };

  const handleBranchMerge = async (sourceBranchId: string, targetBranchId: string) => {
    setBranchingInProgress(true);
    try {
      const sourceBranch = timelineBranches.find(b => b.id === sourceBranchId);
      const targetBranch = timelineBranches.find(b => b.id === targetBranchId);
      
      if (!sourceBranch || !targetBranch) return;

      // Calculate merge probability
      const mergeProbability = (sourceBranch.probability + targetBranch.probability) / 2;
      const mergeStability = Math.min(sourceBranch.stability, targetBranch.stability);

      // Merge nodes
      const mergedNodes = mergeTimelineNodes(sourceBranch.nodes, targetBranch.nodes);

      setTimelineBranches(prev => prev.map(branch => 
        branch.id === targetBranchId ? {
          ...branch,
          probability: mergeProbability,
          stability: mergeStability,
          nodes: mergedNodes
        } : branch
      ).filter(branch => branch.id !== sourceBranchId));

      setActiveTimeline(targetBranchId);

      // Update quantum state post-merge
      onStateChange({
        ...quantumState,
        coherence: Math.max(0, quantumState.coherence - 10),
      });

    } catch (error) {
      console.error('Timeline merge failed:', error);
    } finally {
      setBranchingInProgress(false);
    }
  };

  const mergeTimelineNodes = (sourceNodes: WeaveNode[], targetNodes: WeaveNode[]): WeaveNode[] => {
    return targetNodes.map(targetNode => {
      const sourceNode = sourceNodes.find(n => n.id === targetNode.id);
      if (!sourceNode) return targetNode;

      // Merge connections
      const mergedConnections = [...targetNode.connections];
      sourceNode.connections.forEach(sourceConn => {
        const existingConn = mergedConnections.find(tc => tc.targetId === sourceConn.targetId);
        if (existingConn) {
          existingConn.strength = (existingConn.strength + sourceConn.strength) / 2;
          existingConn.resonance = (existingConn.resonance + sourceConn.resonance) / 2;
        } else {
          mergedConnections.push(sourceConn);
        }
      });

      return {
        ...targetNode,
        energyLevel: (targetNode.energyLevel + sourceNode.energyLevel) / 2,
        timelineStability: Math.min(targetNode.timelineStability, sourceNode.timelineStability),
        connections: mergedConnections,
        aethericResonance: (targetNode.aethericResonance + sourceNode.aethericResonance) / 2
      };
    });
  };

  // Conversion function for WeaveNode to GlyphNode
  function convertWeaveNodeToGlyphNode(node: WeaveNode): GlyphNode {
    return {
      id: node.id,
      position: node.position,
      rotation: node.rotation,
      dimensionalCode: node.dimensionalCode || '',
      glyphPattern: node.glyphPattern || '',
      selected: false,
      aethericResonance: node.aethericResonance || 1,
      dimensionalStability: node.timelineStability || 1,
      timelineConvergence: 1,
      connections: node.connections.map((conn) => ({
        targetId: conn.targetId,
        strength: conn.strength,
        phaseAlignment: 0,
        dimensionalResonance: 0,
        quantumBridge: {
          entanglementStrength: 0,
          coherenceLevel: 0,
          phaseMatch: 0,
        },
      })),
      dimensionalProperties: {
        level: 1,
        resonance: 100,
        stability: 100,
        harmonics: [],
        entanglement: 100,
        phaseAlignment: 100,
        frequency: 432,
        vibration: 432,
        consciousness: 0.1,
      },
      quantumState: {
        state: 'stable',
        probability: 1,
        coherence: 1,
        entanglement: 1,
        entanglementStrength: 1, // Added missing property
        superposition: 1,
        phase: 0,
        dimensionalResonance: 1,
        aethericResonance: 1,
        dimensionalStability: 1,
        timelineConvergence: 1,
        stateVector: [],
        entanglementMap: new Map(),
        collapseHistory: [],
        dimensionalShift: 0,
        ritualParticipants: {},
        realityAnchors: { primary: '', secondary: [], strength: 1 },
        quantumSignature: { hash: '', timestamp: Date.now(), validityPeriod: 3600000 },
        forgeMetadata: { version: '1.0', lastModified: Date.now(), stabilityIndex: 1, energyConsumption: 0 },
      },
      timelineState: {
        probability: 1,
        stability: 1,
        convergence: 1,
        branchingFactor: 1,
        currentTimestamp: Date.now(),
      },
      metadata: {
        createdAt: Date.now(),
        lastModified: Date.now(),
        energySignature: '',
        dimensionalOrigin: 1,
        stabilityHistory: [],
      },
      visualProperties: {
        scale: 1,
        opacity: 1,
        emissiveIntensity: 1,
        color: '#fff',
        pulseFrequency: 0.5,
        rotationSpeed: 0.01,
      },
    };
  }

  // Render the 3D visualization
  return (
    <Card className={cn("w-full overflow-hidden", className)}>
        <CardHeader>
            <CardTitle className="flex justify-between items-center">
                <span>Tesseract Weave Editor</span>
                <div className="flex items-center space-x-2">
                    {timelineBranches.map(branch => (
                        <Badge
                            key={branch.id}
                            variant={branch.active ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => handleBranchSelect(branch.id)}
                        >
                            {branch.id === 'main' ? 'Main Timeline' : `Branch ${branch.id.split('-')[1]}`}
                        </Badge>
                    ))}
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="p-0 relative h-[600px]">
            <div ref={containerRef} className="w-full h-full">
                <Canvas>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    {nodes.map((node) => (
                        <React.Fragment key={node.id}>
                            <GlyphNodeMesh
                                node={convertWeaveNodeToGlyphNode(node)}
                                isActive={activeTimeline === 'main'}
                            />
                            {node.connections.map((conn) => {
                              const target = nodes.find(n => n.id === conn.targetId);
                              if (!target) return null;
                              return (
                                <InterDimensionalConnection
                                  key={`${node.id}-${conn.targetId}`}
                                  source={convertWeaveNodeToGlyphNode(node)}
                                  target={convertWeaveNodeToGlyphNode(target)}
                                  connection={convertWeaveNodeToGlyphNode(node).connections.find(c => c.targetId === conn.targetId) as GlyphNodeConnection}
                                />
                              );
                            })}
                        </React.Fragment>
                    ))}
                    <OrbitControls />
                </Canvas>
            </div>
        </CardContent>
    </Card>
  );
}
