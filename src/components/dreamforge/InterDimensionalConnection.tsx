
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { Color, Vector3 } from 'three';
import { GlyphNode, GlyphConnection } from '../../types/glyph';

interface InterDimensionalConnectionProps {
  source: GlyphNode;
  target: GlyphNode;
  connection: GlyphConnection;
}

export const InterDimensionalConnection: React.FC<InterDimensionalConnectionProps> = ({
  source,
  target,
  connection
}) => {
  const lineRef = useRef<any>(null);

  const points = [
    new Vector3(source.position.x, source.position.y, source.position.z),
    new Vector3(target.position.x, target.position.y, target.position.z)
  ];

  const getConnectionColor = () => {
    switch (connection.type) {
      case 'quantum': return '#4299E1';
      case 'dimensional': return '#9F7AEA';
      case 'temporal': return '#F6AD55';
      case 'aetheric': return '#48BB78';
      default: return '#E2E8F0';
    }
  };

  useFrame((state) => {
    if (lineRef.current && lineRef.current.material) {
      const intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      lineRef.current.material.opacity = intensity * connection.strength;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color={getConnectionColor()}
      lineWidth={Math.max(1, connection.strength * 5)}
      transparent={true}
      opacity={connection.strength}
    />
  );
};
