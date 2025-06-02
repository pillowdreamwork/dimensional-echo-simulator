
import React, { useMemo, useRef } from 'react';
import { Vector3, MeshStandardMaterial } from 'three';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { DIMENSIONAL_PROPERTIES } from '../../types/glyph';
import { GlyphNode } from '../../types/glyph';

interface GlyphNodeMeshProps {
  node: GlyphNode;
  onClick?: () => void;
  isActive?: boolean;
  isSelected?: boolean;
  quantumIntensity?: number;
}

export const GlyphNodeMesh: React.FC<GlyphNodeMeshProps> = ({ 
  node, 
  onClick, 
  isActive = false,
  isSelected = false,
  quantumIntensity = 1
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);
  
  // Calculate node appearance based on quantum state
  const nodeProperties = useMemo(() => {
    const dimProps = DIMENSIONAL_PROPERTIES[node.dimensionalProperties.level];
    const quantumState = node.quantumState;
    const superpositionScale = 1 + ((quantumState?.superposition || 50) / 200);
    const coherenceEmission = (quantumState?.coherence || 50) / 100;
    const entanglementPulse = (quantumState?.entanglementStrength || 50) / 100;
    
    return {
      scale: superpositionScale * quantumIntensity,
      emission: coherenceEmission,
      pulse: entanglementPulse,
      color: isActive ? dimProps.color : dimProps.color.replace('1)', '0.6)'),
      glow: isSelected ? 2 : 1
    };
  }, [node, isActive, isSelected, quantumIntensity]);

  useFrame((state, delta) => {
    if (meshRef.current && materialRef.current) {
      // Quantum animation effects
      const time = state.clock.getElapsedTime();
      const pulseFreq = 2 + (nodeProperties.pulse * 3);
      const pulseMagnitude = 0.2 + (nodeProperties.pulse * 0.3);
      
      // Scale pulsing based on quantum state
      meshRef.current.scale.setScalar(
        nodeProperties.scale * (1 + Math.sin(time * pulseFreq) * pulseMagnitude)
      );

      // Material effects
      materialRef.current.emissiveIntensity = 
        nodeProperties.emission * (1 + Math.sin(time * 2) * 0.2);
    }
  });

  return (
    <group position={node.position}>
      <mesh 
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => {
          if (meshRef.current) {
            meshRef.current.scale.multiplyScalar(1.1);
          }
        }}
        onPointerOut={() => {
          if (meshRef.current) {
            meshRef.current.scale.setScalar(nodeProperties.scale);
          }
        }}
      >
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color={nodeProperties.color}
          emissive={nodeProperties.color}
          emissiveIntensity={nodeProperties.emission}
          metalness={0.5}
          roughness={0.2}
          opacity={0.8}
          transparent
        />
      </mesh>
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.3}
        color={nodeProperties.color}
        anchorX="center"
        anchorY="middle"
      >
        {node.glyphPattern || node.symbol}
      </Text>
    </group>
  );
};
