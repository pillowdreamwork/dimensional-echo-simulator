import React, { useMemo } from 'react';
import { Vector3 } from 'three';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { DIMENSIONAL_PROPERTIES } from '../../types/dimensional';
import { GlyphNode } from '../../types/glyph';

interface GlyphNodeMeshProps {
  node: GlyphNode;
  onClick: () => void;
}

export const GlyphNodeMesh: React.FC<GlyphNodeMeshProps> = ({ node, onClick }) => {
  // Calculate node appearance based on quantum state
  const nodeProperties = useMemo(() => {
    const dimProps = DIMENSIONAL_PROPERTIES[node.dimensionalProperties.level];
    const superpositionScale = 1 + (node.quantumState.superposition / 200);
    const coherenceEmission = node.quantumState.coherence / 100;
    
    return {
      scale: superpositionScale,
      color: node.selected ? '#ffffff' : dimProps.color,
      emissive: dimProps.color,
      emissiveIntensity: coherenceEmission,
      roughness: 1 - (node.quantumState.entanglementStrength / 100),
      metalness: node.dimensionalProperties.resonance / 100
    };
  }, [node]);

  // Quantum state animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pulseFrequency = 0.5 + (node.quantumState.coherence / 100);
    const pulseMagnitude = 0.1 * (node.quantumState.superposition / 100);
    
    // Apply quantum pulse effect
    state.scene.getObjectByName(node.id)?.scale.setScalar(
      nodeProperties.scale * (1 + Math.sin(t * pulseFrequency) * pulseMagnitude)
    );
  });

  return (
    <group
      position={[node.position.x, node.position.y, node.position.z]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      name={node.id}
    >
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial
          {...nodeProperties}
        />
      </mesh>
      
      {/* Quantum state visualization ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.02, 16, 32]} />
        <meshPhongMaterial
          color={nodeProperties.emissive}
          opacity={node.quantumState.coherence / 100}
          transparent
          emissive={nodeProperties.emissive}
          emissiveIntensity={node.quantumState.entanglementStrength / 100}
        />
      </mesh>

      <Text
        position={[0, 0.4, 0]}
        fontSize={0.15}
        color={nodeProperties.color}
        anchorX="center"
        anchorY="middle"
      >
        {node.glyphPattern || DIMENSIONAL_PROPERTIES[node.dimensionalProperties.level].name}
      </Text>
    </group>
  );
};