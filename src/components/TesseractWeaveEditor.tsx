
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3, Quaternion } from 'three';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { GlyphNodeMesh } from './dreamforge/GlyphNodeMesh';
import { InterDimensionalConnection } from './dreamforge/InterDimensionalConnection';
import { QuantumState, DimensionalProperties } from '@/types/quantum';
import { GlyphNode, GlyphConnection, DimensionalLevel } from '@/types/glyph';

interface TesseractWeaveEditorProps {
  quantumState: QuantumState;
  dimensionalProperties: DimensionalProperties;
  onStateChange: (state: QuantumState) => void;
  onDimensionalShift: (props: DimensionalProperties) => void;
  className?: string;
}

interface WeaveNode {
  id: string;
  position: Vector3;
  rotation: Quaternion;
  scale: Vector3;
  symbol: string;
  energyLevel: number;
  timelineStability: number;
  connections: Array<{
    targetId: string;
    strength: number;
    resonance: number;
  }>;
  dimensionalCode: string;
  glyphPattern: string;
  aethericResonance: number;
}

export function TesseractWeaveEditor({
  quantumState,
  dimensionalProperties,
  onStateChange,
  onDimensionalShift,
  className
}: TesseractWeaveEditorProps) {
  const [nodes, setNodes] = useState<WeaveNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize default nodes
  useEffect(() => {
    if (nodes.length === 0) {
      const defaultNodes: WeaveNode[] = [
        {
          id: 'node-1',
          position: new Vector3(0, 0, 0),
          rotation: new Quaternion(),
          scale: new Vector3(1, 1, 1),
          symbol: '◯',
          energyLevel: 1,
          timelineStability: 1,
          connections: [{ targetId: 'node-2', strength: 0.8, resonance: 0.7 }],
          dimensionalCode: 'D1',
          glyphPattern: '◯△',
          aethericResonance: 1
        },
        {
          id: 'node-2',
          position: new Vector3(2, 1, 0),
          rotation: new Quaternion(),
          scale: new Vector3(1, 1, 1),
          symbol: '△',
          energyLevel: 0.8,
          timelineStability: 0.9,
          connections: [{ targetId: 'node-1', strength: 0.8, resonance: 0.7 }],
          dimensionalCode: 'D2',
          glyphPattern: '△□',
          aethericResonance: 0.9
        }
      ];
      setNodes(defaultNodes);
    }
  }, [nodes.length]);

  const convertWeaveNodeToGlyphNode = (node: WeaveNode): GlyphNode => {
    return {
      id: node.id,
      position: node.position,
      rotation: node.rotation,
      scale: node.scale,
      symbol: node.symbol,
      energy: node.energyLevel,
      connections: node.connections.map(conn => conn.targetId),
      dimensionalProperties: {
        level: 3 as DimensionalLevel,
        resonance: node.aethericResonance * 100,
        stability: node.timelineStability * 100,
        harmonics: ['base', 'harmonic'],
        entanglement: 50,
        phaseAlignment: 90,
        frequency: 432,
        vibration: 432,
        consciousness: 0.5,
      },
      timestamp: Date.now(),
      isActive: selectedNode === node.id,
      metadata: {
        creator: 'system',
        purpose: 'weave-node',
        tags: ['quantum', 'tesseract'],
        createdAt: Date.now(),
        lastModified: Date.now(),
        energySignature: node.dimensionalCode,
        dimensionalOrigin: 3 as DimensionalLevel,
        stabilityHistory: [node.timelineStability],
      },
      dimensionalCode: node.dimensionalCode,
      glyphPattern: node.glyphPattern,
      selected: selectedNode === node.id,
      aethericResonance: node.aethericResonance,
      dimensionalStability: node.timelineStability,
      timelineConvergence: 1,
      quantumState: {
        ...quantumState,
        coherence: node.energyLevel,
        entanglement: node.aethericResonance,
        dimensionalStability: node.timelineStability,
      },
      timelineState: {
        probability: node.timelineStability,
        stability: node.timelineStability,
        convergence: 1,
        branchingFactor: 1,
        currentTimestamp: Date.now(),
      },
      visualProperties: {
        scale: 1,
        opacity: 0.8 + node.energyLevel * 0.2,
        emissiveIntensity: node.energyLevel,
        color: selectedNode === node.id ? '#FFD700' : '#4299E1',
        pulseFrequency: 2,
        rotationSpeed: 0.01,
      },
    };
  };

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  const addNode = () => {
    const newNode: WeaveNode = {
      id: `node-${nodes.length + 1}`,
      position: new Vector3(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      ),
      rotation: new Quaternion(),
      scale: new Vector3(1, 1, 1),
      symbol: ['◯', '△', '□', '◊'][Math.floor(Math.random() * 4)],
      energyLevel: Math.random(),
      timelineStability: 0.5 + Math.random() * 0.5,
      connections: [],
      dimensionalCode: `D${nodes.length + 1}`,
      glyphPattern: '◯',
      aethericResonance: Math.random()
    };
    
    setNodes(prev => [...prev, newNode]);
  };

  return (
    <Card className={cn("w-full overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Tesseract Weave Editor</span>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              {nodes.length} Nodes
            </Badge>
            <Button size="sm" onClick={addNode}>
              Add Node
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 relative h-[600px]">
        <div ref={containerRef} className="w-full h-full">
          <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            {nodes.map((node) => (
              <React.Fragment key={node.id}>
                <GlyphNodeMesh
                  node={convertWeaveNodeToGlyphNode(node)}
                  isActive={selectedNode === node.id}
                  onSelect={handleNodeSelect}
                />
                {node.connections.map((conn) => {
                  const target = nodes.find(n => n.id === conn.targetId);
                  if (!target) return null;
                  
                  const connection: GlyphConnection = {
                    id: `${node.id}-${conn.targetId}`,
                    sourceNodeId: node.id,
                    targetNodeId: conn.targetId,
                    targetId: conn.targetId,
                    strength: conn.strength,
                    type: 'quantum' as const,
                    phaseAlignment: 90,
                    dimensionalResonance: conn.resonance,
                    quantumBridge: {
                      entanglementStrength: conn.strength,
                      coherenceLevel: 0.8,
                      phaseMatch: 0.9
                    }
                  };
                  
                  return (
                    <InterDimensionalConnection
                      key={`${node.id}-${conn.targetId}`}
                      source={convertWeaveNodeToGlyphNode(node)}
                      target={convertWeaveNodeToGlyphNode(target)}
                      connection={connection}
                    />
                  );
                })}
              </React.Fragment>
            ))}
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          </Canvas>
        </div>
      </CardContent>
    </Card>
  );
}

export default TesseractWeaveEditor;
