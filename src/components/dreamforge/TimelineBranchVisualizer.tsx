import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Vector3, MathUtils } from 'three';
import { QuantumTesseractEngine, TesseractNode } from '../../lib/cores/quantum-tesseract';

interface TimelineBranchProps {
  engine: QuantumTesseractEngine;
}

interface BranchNode {
  id: string;
  position: Vector3;
  connections: string[];
  stability: number;
  energyLevel: number;
  children: BranchNode[];
}

const BranchConnection: React.FC<{
  start: Vector3;
  end: Vector3;
  stability: number;
}> = ({ start, end, stability }) => {
  const color = useMemo(() => {
    const hue = MathUtils.lerp(0, 120, stability);
    return `hsl(${hue}, 70%, 50%)`;
  }, [stability]);

  return (
    <line>
      <bufferGeometry attach="geometry">
        <float32BufferAttribute 
          attach="attributes-position"
          args={[new Float32Array([
            start.x, start.y, start.z,
            end.x, end.y, end.z
          ]), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial attach="material" color={color} linewidth={2} />
    </line>
  );
};

const BranchNodeMesh: React.FC<{
  node: BranchNode;
  onSelect: (nodeId: string) => void;
}> = ({ node, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const color = useMemo(() => {
    const hue = MathUtils.lerp(0, 120, node.stability);
    return `hsl(${hue}, 70%, 50%)`;
  }, [node.stability]);

  const scale = useMemo(() => {
    return MathUtils.lerp(0.5, 1.5, node.energyLevel);
  }, [node.energyLevel]);

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        scale={[scale, scale, scale]}
        onClick={() => onSelect(node.id)}
      >
        <octahedronGeometry args={[1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.5}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {node.id.slice(0, 8)}
      </Text>
    </group>
  );
};

const TimelineBranchVis: React.FC<{
  nodes: BranchNode[];
  onNodeSelect: (nodeId: string) => void;
}> = ({ nodes, onNodeSelect }) => {
  const renderBranches = (node: BranchNode) => {
    return (
      <group key={node.id}>
        <BranchNodeMesh node={node} onSelect={onNodeSelect} />
        {node.children.map(child => (
          <React.Fragment key={child.id}>
            <BranchConnection
              start={node.position}
              end={child.position}
              stability={Math.min(node.stability, child.stability)}
            />
            {renderBranches(child)}
          </React.Fragment>
        ))}
      </group>
    );
  };

  return (
    <group>
      {nodes.map(node => renderBranches(node))}
    </group>
  );
};

export const TimelineBranchVisualizer: React.FC<TimelineBranchProps> = ({
  engine
}) => {
  const [nodes, setNodes] = useState<BranchNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to reality anchors and build branch hierarchy
    const subscription = engine.observeRealityAnchors().subscribe(anchors => {
      const rootNodes = buildBranchHierarchy(Array.from(anchors.entries()));
      setNodes(rootNodes);
    });

    return () => subscription.unsubscribe();
  }, [engine]);

  const buildBranchHierarchy = (
    anchors: [string, Vector3][]
  ): BranchNode[] => {
    // Convert flat list of anchors into a tree structure
    const nodeMap = new Map<string, BranchNode>();
    const rootNodes: BranchNode[] = [];

    // First pass: Create all nodes
    anchors.forEach(([id, position]) => {
      const node = engine.getNode(id);
      if (node) {
        nodeMap.set(id, {
          id,
          position,
          connections: node.connections,
          stability: node.timelineStability,
          energyLevel: node.energyLevel,
          children: []
        });
      }
    });

    // Second pass: Build connections
    nodeMap.forEach(node => {
      let hasParent = false;
      node.connections.forEach(connId => {
        const connNode = nodeMap.get(connId);
        if (connNode && node.position.y > connNode.position.y) {
          connNode.children.push(node);
          hasParent = true;
        }
      });
      if (!hasParent) {
        rootNodes.push(node);
      }
    });

    return rootNodes;
  };

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNode(nodeId);
  };

  return (
    <div className="w-full h-[600px] relative">
      <Canvas
        camera={{ position: [20, 20, 20], fov: 75 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <OrbitControls />
        
        <TimelineBranchVis
          nodes={nodes}
          onNodeSelect={handleNodeSelect}
        />

        {/* Grid helper */}
        <gridHelper args={[100, 100]} />
      </Canvas>

      {selectedNode && (
        <div className="absolute top-4 right-4 bg-black/80 text-white p-4 rounded">
          <h3 className="text-lg font-bold">Selected Node: {selectedNode}</h3>
          <div className="space-y-2">
            <p>Stability: {nodeMap.get(selectedNode)?.stability.toFixed(2)}</p>
            <p>Energy Level: {nodeMap.get(selectedNode)?.energyLevel.toFixed(2)}</p>
            <p>Connections: {nodeMap.get(selectedNode)?.connections.length}</p>
          </div>
        </div>
      )}
    </div>
  );
};
