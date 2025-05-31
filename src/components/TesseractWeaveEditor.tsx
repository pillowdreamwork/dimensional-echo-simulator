import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import { Vector3, Quaternion } from 'three';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
    Cube,
    InfinityIcon,
    Maximize2Icon,
    MinimizeIcon,
    Plus,
    SaveIcon,
    Wand2Icon
} from 'lucide-react';
import { QuantumTesseractEngine, TesseractNode } from '@/lib/cores/quantum-tesseract';
import { cn } from '@/lib/utils';
import { TimelineBranchVisualizer } from './dreamforge/TimelineBranchVisualizer';
import { InterDimensionalConnection } from './dreamforge/InterDimensionalConnection';
import { GlyphNode } from '../types/glyph';
import { DIMENSIONAL_PROPERTIES } from '../types/dimensional';
import { GlyphNodeMesh } from './dreamforge/GlyphNodeMesh';

interface TesseractWeaveEditorProps {
    className?: string;
    onNodeCreate?: (node: TesseractNode) => void;
    onWeaveComplete?: (nodes: TesseractNode[]) => void;
}

export function TesseractWeaveEditor({
    className,
    onNodeCreate,
    onWeaveComplete
}: TesseractWeaveEditorProps) {
    const [nodes, setNodes] = useState<GlyphNode[]>([]);
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [weaving, setWeaving] = useState(false);
    const [intensity, setIntensity] = useState(50);
    const [resonanceMode, setResonanceMode] = useState<'harmonic' | 'balanced' | 'chaotic'>('balanced');
    const stabilityThreshold = 0.7;

    const handleNodeInteraction = async (nodeId: string) => {
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return;

        setSelectedNode(nodeId);
        if (engine.current) {
            try {
                // Update the node's quantum state
                const updatedNode = await engine.current.updateNodeQuantumState(node);
                const updatedNodes = nodes.map(n => 
                    n.id === nodeId ? updatedNode : n
                );
                setNodes(updatedNodes);

                // Update weaving state if needed
                if (updatedNode.dimensionalProperties.stability < stabilityThreshold) {
                    setWeaving(true);
                }
            } catch (error) {
                console.error('Failed to update node quantum state:', error);
            }
        }
    };

    const handleDimensionalShift = (targetLevel: DimensionalLevel) => {
        if (!engine.current) return;

        const currentNode = selectedNode ? nodes.find(n => n.id === selectedNode) : null;
        if (!currentNode) return;

        try {
            const updatedNode = engine.current.shiftDimension(currentNode, targetLevel);
            const updatedNodes = nodes.map(n => 
                n.id === updatedNode.id ? updatedNode : n
            );
            
            setNodes(updatedNodes);
            
            // Update connections based on new dimensional level
            if (onWeaveComplete) {
                onWeaveComplete(updatedNodes);
            }
        } catch (error) {
            console.error('Dimensional shift failed:', error);
        }
    };

    const handleResonanceChange = (value: number) => {
        if (!selectedNode) return;
        
        const updatedNodes = nodes.map(node => {
            if (node.id === selectedNode) {
                return {
                    ...node,
                    dimensionalProperties: {
                        ...node.dimensionalProperties,
                        resonance: value,
                        stability: Math.min(
                            node.dimensionalProperties.stability,
                            value * stabilityThreshold
                        )
                    }
                };
            }
            return node;
        });
        
        setNodes(updatedNodes);
        setResonanceMode(value > 0.8 ? 'harmonic' : value > 0.5 ? 'balanced' : 'chaotic');
    };

    // Render the 3D visualization
    return (
        <Card className={cn("w-full overflow-hidden", className)}>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Tesseract Weave Editor</span>
                    <div className="flex items-center space-x-2">
                        {selectedNode && (
                            <div className="flex space-x-2">
                                {Object.keys(DIMENSIONAL_PROPERTIES).map((level) => (
                                    <Button
                                        key={level}
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDimensionalShift(parseInt(level) as DimensionalLevel)}
                                        disabled={weaving}
                                    >
                                        D{level}
                                    </Button>
                                ))}
                            </div>
                        )}
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
                                    node={node}
                                    isActive={selectedNode === node.id}
                                    onInteraction={() => handleNodeInteraction(node.id)}
                                />
                                {node.connections.map((conn) => (
                                    <InterDimensionalConnection
                                        key={`${node.id}-${conn.targetId}`}
                                        connection={conn}
                                        startNode={node}
                                        endNode={nodes.find(n => n.id === conn.targetId)}
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                        <OrbitControls />
                    </Canvas>
                </div>
            </CardContent>
            {renderControls()}
        </Card>
    );
}
