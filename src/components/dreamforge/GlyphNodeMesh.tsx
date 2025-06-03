
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Color, MeshStandardMaterial } from 'three';
import { GlyphNode } from '../../types/glyph';

interface GlyphNodeMeshProps {
  node: GlyphNode;
  isActive?: boolean;
  onSelect?: (nodeId: string) => void;
}

export const GlyphNodeMesh: React.FC<GlyphNodeMeshProps> = ({
  node,
  isActive = false,
  onSelect
}) => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);

  useEffect(() => {
    if (materialRef.current) {
      const baseColor = new Color(node.visualProperties.color);
      materialRef.current.color = baseColor;
      materialRef.current.emissive = baseColor.clone().multiplyScalar(0.2);
      materialRef.current.emissiveIntensity = node.visualProperties.emissiveIntensity;
      materialRef.current.opacity = node.visualProperties.opacity;
      materialRef.current.transparent = node.visualProperties.opacity < 1;
    }
  }, [node.visualProperties]);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation animation
      meshRef.current.rotation.y += node.visualProperties.rotationSpeed;
      
      // Pulse effect when active
      if (isActive) {
        const pulseScale = 1 + Math.sin(state.clock.elapsedTime * node.visualProperties.pulseFrequency) * 0.1;
        meshRef.current.scale.setScalar(pulseScale * node.visualProperties.scale);
      } else {
        meshRef.current.scale.setScalar(node.visualProperties.scale);
      }
    }
  });

  const handleClick = () => {
    if (onSelect) {
      onSelect(node.id);
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={[node.position.x, node.position.y, node.position.z]}
      onClick={handleClick}
    >
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial
        ref={materialRef}
        color={node.visualProperties.color}
        emissive={node.visualProperties.color}
        emissiveIntensity={0.2}
        transparent={true}
        opacity={node.visualProperties.opacity}
      />
    </mesh>
  );
};
