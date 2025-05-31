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
    const [intensity, setIntensity] = useState(50);
    const [weaving, setWeaving] = useState(false);
    const [resonanceMode, setResonanceMode] = useState<'harmonic' | 'chaotic' | 'balanced'>('balanced');
    const [stabilityThreshold, setStabilityThreshold] = useState(0.75);
    const [convergenceRate, setConvergenceRate] = useState(0.5);
    const [currentDimension, setCurrentDimension] = useState(3);
    const [phaseAlignment, setPhaseAlignment] = useState(100);
    const [quantumCoherence, setQuantumCoherence] = useState(100);
    const [dimensionalHarmonics, setDimensionalHarmonics] = useState<string[]>([]);
    const [showTimeline, setShowTimeline] = useState(false);
    const [collapseStatus, setCollapseStatus] = useState<'idle' | 'collapsing' | 'collapsed'>('idle');
    const engine = useRef(new QuantumTesseractEngine());
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize with a central node with Aetheric properties
        const centralNode: GlyphNode = {
            id: 'central',
            position: new Vector3(0, 0, 0),
            dimensionalCode: '#QF-K042B/Node-Central',
            glyphPattern: '',
            selected: false,
            aethericResonance: 1.0,
            dimensionalStability: 1.0,
            timelineConvergence: 1.0,
            dimensionalProperties: {
                level: 3,
                resonance: 100,
                stability: 100,
                harmonics: [],
                entanglement: 100,
                phaseAlignment: 100
            },
            quantumState: {
                superposition: 100,
                coherence: 100,
                entanglementStrength: 100
            },
            connections: []
        };

        setNodes([centralNode]);
        onNodeCreate?.(convertToTesseractNode(centralNode));
    }, []);

    const calculateAethericProperties = (baseNode: GlyphNode): Pick<GlyphNode, 'aethericResonance' | 'dimensionalStability' | 'timelineConvergence'> => {
        const resonanceFactor = resonanceMode === 'harmonic' ? 1.2 : 
                              resonanceMode === 'chaotic' ? 0.8 : 1.0;
        
        return {
          aethericResonance: Math.min(1, baseNode.aethericResonance * resonanceFactor),
          dimensionalStability: Math.min(1, baseNode.dimensionalStability * stabilityThreshold),
          timelineConvergence: Math.min(1, baseNode.timelineConvergence * convergenceRate)
        };
    };

    const calculateDimensionalHarmonics = (dimension: number): string[] => {
        const baseHarmonics = [
            "Quantum Resonance",
            "Timeline Stability",
            "Consciousness Wave",
            "Reality Matrix",
            "Divine Light",
            "Unity Field",
            "Spirit Lattice",
            "Akashic Current",
            "Cosmic Flow",
            "Ethereal Web",
            "Source Connection",
            "Infinite Loop"
        ];
        
        return baseHarmonics
            .slice(0, dimension)
            .map(h => `${h}-${dimension}D`);
    };

    useEffect(() => {
        setDimensionalHarmonics(calculateDimensionalHarmonics(currentDimension));
    }, [currentDimension]);

    const createConnection = (sourceId: string, targetId: string) => {
        const baseStrength = 70 + Math.random() * 30;
        const basePhaseAlignment = 80 + Math.random() * 20;
        const baseDimensionalResonance = 60 + Math.random() * 40;

        return {
            targetId,
            strength: baseStrength,
            phaseAlignment: basePhaseAlignment,
            dimensionalResonance: baseDimensionalResonance,
            timelineBranch: {
                probability: Math.random(),
                stabilityFactor: 0.7 + Math.random() * 0.3,
                convergencePoint: Math.random()
            }
        };
    };

    const handleAddNode = () => {
        const baseProperties = {
            aethericResonance: 0.7 + Math.random() * 0.3,
            dimensionalStability: 0.6 + Math.random() * 0.4,
            timelineConvergence: 0.5 + Math.random() * 0.5
        };

        // Create connections to existing nodes based on dimensional compatibility
        const newConnections = nodes
            .filter(n => Math.abs(n.dimensionalProperties.level - currentDimension) <= 2)
            .map(n => createConnection(n.id, `node-${nodes.length + 1}`));

        const newNode: GlyphNode = {
            id: `node-${nodes.length + 1}`,
            position: new Vector3(
                Math.random() * 4 - 2,
                Math.random() * 4 - 2,
                Math.random() * 4 - 2
            ),
            dimensionalCode: `#QF-K042B/Node-${nodes.length + 1}`,
            glyphPattern: engine.current.getVisualizationData('central').pattern,
            selected: false,
            connections: newConnections,
            dimensionalProperties: {
                level: currentDimension,
                resonance: 100,
                stability: 100,
                harmonics: calculateDimensionalHarmonics(currentDimension),
                entanglement: 100,
                phaseAlignment: 100
            },
            quantumState: {
                superposition: 100,
                coherence: 100,
                entanglementStrength: 100
            },
            ...calculateAethericProperties(baseProperties as GlyphNode)
        };

        // Update existing nodes with reciprocal connections
        setNodes(prev => prev.map(node => ({
            ...node,
            connections: [
                ...node.connections,
                ...(Math.abs(node.dimensionalProperties.level - currentDimension) <= 2
                    ? [createConnection(node.id, newNode.id)]
                    : [])
            ]
        })));

        setNodes(prev => [...prev, newNode]);
        onNodeCreate?.(convertToTesseractNode(newNode));
    };

    const handleNodeClick = (id: string) => {
        setSelectedNode(id);
        setNodes(prev => prev.map(node => ({
            ...node,
            selected: node.id === id
        })));
    };

    const convertToTesseractNode = (node: GlyphNode): TesseractNode => {
        return {
            id: node.id,
            position: node.position,
            rotation: new Quaternion(),
            dimensionalCode: node.dimensionalCode,
            energyLevel: intensity / 100,
            connections: nodes
                .filter(n => n.id !== node.id)
                .map(n => n.id),
            glyphPattern: node.glyphPattern,
            timelineStability: 1.0
        };
    };

    const handleWeave = async () => {
        setWeaving(true);
        try {
            // Update connection strengths based on quantum states
            setNodes(prev => prev.map(node => ({
                ...node,
                connections: node.connections.map(conn => {
                    const target = prev.find(n => n.id === conn.targetId);
                    if (!target) return conn;

                    const dimensionalDiff = Math.abs(node.dimensionalProperties.level - target.dimensionalProperties.level);
                    const resonanceFactor = (node.dimensionalProperties.resonance + target.dimensionalProperties.resonance) / 200;
                    const entanglementFactor = (node.quantumState.entanglementStrength + target.quantumState.entanglementStrength) / 200;

                    return {
                        ...conn,
                        strength: Math.max(0, conn.strength * resonanceFactor * (1 - dimensionalDiff * 0.1)),
                        phaseAlignment: Math.max(0, conn.phaseAlignment * entanglementFactor),
                        dimensionalResonance: Math.max(0, conn.dimensionalResonance * (1 - dimensionalDiff * 0.15))
                    };
                })
            })));

            const tesseractNodes = nodes.map(convertToTesseractNode);
            onWeaveComplete?.(tesseractNodes);
        } finally {
            setWeaving(false);
        }
    };

    const handleDimensionalShift = (targetDimension: number) => {
        if (targetDimension === currentDimension) return;

        // Calculate transition parameters
        const distance = Math.abs(targetDimension - currentDimension);
        const stability = nodes.reduce((acc, node) => acc + node.dimensionalStability, 0) / nodes.length;
        const coherence = nodes.reduce((acc, node) => acc + node.quantumState.coherence, 0) / nodes.length;

        // Update nodes with new dimensional properties
        setNodes(prev => prev.map(node => ({
            ...node,
            dimensionalProperties: {
                ...node.dimensionalProperties,
                level: targetDimension,
                resonance: Math.max(0, 100 - (distance * 10)),
                stability: Math.max(0, stability - (distance * 5)),
                harmonics: calculateDimensionalHarmonics(targetDimension),
                phaseAlignment: Math.max(0, phaseAlignment - (distance * 8)),
                entanglement: Math.max(0, node.dimensionalProperties.entanglement - (distance * 3))
            },
            quantumState: {
                ...node.quantumState,
                coherence: Math.max(0, coherence - (distance * 7)),
                superposition: Math.min(100, node.quantumState.superposition + (distance * 15)),
                entanglementStrength: Math.max(0, node.quantumState.entanglementStrength - (distance * 5))
            }
        )));

        setCurrentDimension(targetDimension);
    };

    const handleQuantumCollapse = async () => {
        if (collapseStatus !== 'idle') return;
        setCollapseStatus('collapsing');

        try {
            // Calculate collapse parameters for each node
            const collapsedNodes = nodes.map(node => ({
                ...node,
                quantumState: {
                    ...node.quantumState,
                    superposition: 0,
                    coherence: Math.max(0, node.quantumState.coherence * 0.5),
                    entanglementStrength: Math.max(0, node.quantumState.entanglementStrength * 0.7)
                },
                dimensionalProperties: {
                    ...node.dimensionalProperties,
                    stability: Math.min(100, node.dimensionalProperties.stability * 1.2),
                    phaseAlignment: Math.max(0, node.dimensionalProperties.phaseAlignment * 0.8)
                }
            }));

            // Apply quantum collapse
            setNodes(collapsedNodes);
            setCollapseStatus('collapsed');

            // Notify any listeners
            onWeaveComplete?.(collapsedNodes.map(convertToTesseractNode));
        } catch (error) {
            console.error('Error during quantum collapse:', error);
            setCollapseStatus('idle');
        }
    };

    const handleQuantumStateUpdate = (nodeId: string, updates: Partial<GlyphNode['quantumState']>) => {
        setNodes(prev => prev.map(node => 
            node.id === nodeId
                ? {
                    ...node,
                    quantumState: {
                        ...node.quantumState,
                        ...updates
                    }
                }
                : node
        ));
    };

    const calculateQuantumInfluence = (source: GlyphNode, target: GlyphNode): number => {
        const dimensionalDifference = Math.abs(
            source.dimensionalProperties.level - target.dimensionalProperties.level
        );
        const entanglementFactor = (
            source.quantumState.entanglementStrength + target.quantumState.entanglementStrength
        ) / 200;
        const coherenceFactor = (
            source.quantumState.coherence + target.quantumState.coherence
        ) / 200;
        
        return Math.max(0, (1 - dimensionalDifference * 0.2) * entanglementFactor * coherenceFactor);
    };

    // Add UI controls for Aetheric Forge parameters
    const renderForgeControls = () => (
        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Resonance Mode</span>
            <div className="flex gap-2">
              {(['harmonic', 'balanced', 'chaotic'] as const).map(mode => (
                <Button
                  key={mode}
                  size="sm"
                  variant={resonanceMode === mode ? 'default' : 'outline'}
                  onClick={() => setResonanceMode(mode)}
                  className={cn(
                    'capitalize',
                    resonanceMode === mode && 'bg-quantum-purple'
                  )}
                >
                  {mode}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Stability Threshold</span>
              <span>{(stabilityThreshold * 100).toFixed(0)}%</span>
            </div>
            <Slider
              value={[stabilityThreshold * 100]}
              onValueChange={([value]) => setStabilityThreshold(value / 100)}
              min={1}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Convergence Rate</span>
              <span>{(convergenceRate * 100).toFixed(0)}%</span>
            </div>
            <Slider
              value={[convergenceRate * 100]}
              onValueChange={([value]) => setConvergenceRate(value / 100)}
              min={1}
              max={100}
              step={1}
            />
          </div>
        </div>
      );

    // Add dimensional controls
    const renderDimensionalControls = () => (
        <div className="space-y-4 mt-4 p-3 rounded-lg bg-quantum-dark/30">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Current Dimension</span>
            <div className="flex gap-2">
              {Object.entries(DIMENSIONAL_PROPERTIES).map(([dim, props]) => (
                <Button
                  key={dim}
                  size="sm"
                  variant={currentDimension === parseInt(dim) ? 'default' : 'outline'}
                  onClick={() => handleDimensionalShift(parseInt(dim))}
                  className={cn(
                    'w-8 h-8 p-0',
                    currentDimension === parseInt(dim) && 'ring-2 ring-offset-2'
                  )}
                  style={{
                    backgroundColor: currentDimension === parseInt(dim) ? props.color + '40' : 'transparent',
                    borderColor: props.color
                  }}
                >
                  {dim}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Phase Alignment</span>
              <span>{phaseAlignment}%</span>
            </div>
            <Slider
              value={[phaseAlignment]}
              onValueChange={([value]) => setPhaseAlignment(value)}
              min={0}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Quantum Coherence</span>
              <span>{quantumCoherence}%</span>
            </div>
            <Slider
              value={[quantumCoherence]}
              onValueChange={([value]) => setQuantumCoherence(value)}
              min={0}
              max={100}
              step={1}
            />
          </div>

          <div className="flex flex-wrap gap-1">
            {dimensionalHarmonics.map((harmonic, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-quantum-purple/10 text-quantum-purple"
              >
                {harmonic}
              </Badge>
            ))}
          </div>
        </div>
      );

    return (
        <Card className={cn(
          "tesseract-weave-editor bg-quantum-dark/90 backdrop-blur-md",
          className
        )}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center text-lg">
                <CubeFace className="mr-2 text-quantum-blue" size={20} />
                Tesseract Weave Editor
              </CardTitle>
              <Badge
                variant="outline"
                className="bg-quantum-purple/20 text-quantum-purple"
              >
                {nodes.length} Nodes Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddNode}
                  className="flex-1"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Node
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWeave}
                  disabled={weaving || nodes.length < 2}
                  className={cn(
                    "flex-1",
                    weaving && "animate-pulse"
                  )}
                >
                  {weaving ? (
                    <InfinityIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2Icon className="mr-2 h-4 w-4" />
                  )}
                  {weaving ? "Weaving..." : "Weave Reality"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTimeline(!showTimeline)}
                  className="flex-1"
                >
                  {showTimeline ? "Hide Timeline" : "Show Timeline"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleQuantumCollapse}
                  disabled={collapseStatus !== 'idle' || nodes.length === 0}
                  className={cn(
                    "flex-1",
                    collapseStatus === 'collapsing' && "animate-pulse"
                  )}
                >
                  {collapseStatus === 'collapsing' ? (
                    <InfinityIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2Icon className="mr-2 h-4 w-4" />
                  )}
                  {collapseStatus === 'collapsing' ? "Collapsing..." : "Collapse Wave"}
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <MinimizeIcon className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={[intensity]}
                  onValueChange={([value]) => setIntensity(value)}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <Maximize2Icon className="h-4 w-4 text-muted-foreground" />
              </div>

              {renderDimensionalControls()}
              {renderForgeControls()}

              {showTimeline && (
                <div className="h-[400px] w-full border border-quantum-dark/20 rounded-lg overflow-hidden">
                  <TimelineBranchVisualizer engine={engine.current} />
                </div>
              )}

              <div
                ref={containerRef}
                className="h-[400px] w-full border border-quantum-dark/20 rounded-lg overflow-hidden"
              >
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <OrbitControls />
                  
                  {nodes.map((node) => (
                    <GlyphNodeMesh
                      key={node.id}
                      node={node}
                      onClick={() => handleNodeClick(node.id)}
                    />
                  ))}

                  {/* Connection lines between nodes */}
                  {nodes.map((source) => 
                    source.selected && nodes
                      .filter((target) => target.id !== source.id)
                      .map((target) => (
                        <line key={`${source.id}-${target.id}`}>
                          <bufferGeometry attach="geometry" />
                          <lineBasicMaterial
                            attach="material"
                            color={DIMENSIONAL_PROPERTIES[source.dimensionalProperties.level as keyof typeof DIMENSIONAL_PROPERTIES].color}
                            opacity={0.5}
                            transparent
                          />
                        </line>
                      ))
                  )}

                  {/* Inter-dimensional connections */}
                  {nodes.map((source) => 
                    source.connections.map((conn) => {
                      const target = nodes.find(n => n.id === conn.targetId);
                      if (target) {
                        return (
                          <InterDimensionalConnection
                            key={`${source.id}-${target.id}`}
                            source={source}
                            target={target}
                            connection={conn}
                          />
                        );
                      }
                      return null;
                    })
                  )}
                </Canvas>
              </div>

              {selectedNode && (
                <div className="p-3 rounded-lg bg-quantum-dark/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Selected Node</span>
                    <Badge variant="outline" className="text-xs">
                      {nodes.find(n => n.id === selectedNode)?.dimensionalCode}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Dimensional Properties</div>
                      <div className="text-xs">
                        Level: {nodes.find(n => n.id === selectedNode)?.dimensionalProperties.level}D
                      </div>
                      <div className="text-xs">
                        Resonance: {nodes.find(n => n.id === selectedNode)?.dimensionalProperties.resonance.toFixed(1)}%
                      </div>
                      <div className="text-xs">
                        Stability: {nodes.find(n => n.id === selectedNode)?.dimensionalProperties.stability.toFixed(1)}%
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">Quantum State</div>
                      <div className="text-xs">
                        Coherence: {nodes.find(n => n.id === selectedNode)?.quantumState.coherence.toFixed(1)}%
                      </div>
                      <div className="text-xs">
                        Superposition: {nodes.find(n => n.id === selectedNode)?.quantumState.superposition.toFixed(1)}%
                      </div>
                      <div className="text-xs">
                        Entanglement: {nodes.find(n => n.id === selectedNode)?.quantumState.entanglementStrength.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      );
}
