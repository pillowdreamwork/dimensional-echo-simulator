
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { Vector3 } from 'three';
import { GlyphNode, GlyphConnection } from '../../types/glyph';

interface InterDimensionalConnectionProps {
  source: GlyphNode;
  target: GlyphNode;
  connection: GlyphConnection;
  isActive?: boolean;
}

export const InterDimensionalConnection: React.FC<InterDimensionalConnectionProps> = ({
  source,
  target,
  connection,
  isActive = true
}) => {
  const lineRef = useRef<any>(null);
  
  // Calculate connection properties
  const connectionProps = useMemo(() => {
    const phaseAlignment = connection.phaseAlignment || 90;
    const dimensionalResonance = connection.dimensionalResonance || 50;
    const strength = connection.strength || 0.5;
    
    return {
      phaseAlignment,
      dimensionalResonance,
      strength,
      opacity: isActive ? strength * 0.8 : 0.3,
      color: `hsl(${phaseAlignment * 2}, ${strength * 100}%, ${dimensionalResonance}%)`
    };
  }, [connection, isActive]);

  // Generate curve points between nodes
  const points = useMemo(() => {
    const start = source.position;
    const end = target.position;
    const distance = start.distanceTo(end);
    
    // Create a curved path with quantum fluctuation
    const midPoint = new Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5);
    
    // Add dimensional curvature based on resonance
    const curvature = connectionProps.dimensionalResonance / 100;
    midPoint.y += distance * curvature * 0.3;
    
    return [start, midPoint, end];
  }, [source.position, target.position, connectionProps.dimensionalResonance]);

  // Animate the connection
  useFrame((state) => {
    if (lineRef.current && lineRef.current.material) {
      const time = state.clock.getElapsedTime();
      const pulseFreq = 2 + (connectionProps.strength * 3);
      
      // Pulsing opacity effect
      const basePulse = Math.sin(time * pulseFreq) * 0.2 + 0.8;
      lineRef.current.material.opacity = connectionProps.opacity * basePulse;
      
      // Phase-aligned color shifting
      const hueShift = Math.sin(time + connectionProps.phaseAlignment / 180 * Math.PI) * 20;
      lineRef.current.material.color.setHSL(
        (connectionProps.phaseAlignment * 2 + hueShift) / 360,
        connectionProps.strength,
        connectionProps.dimensionalResonance / 100
      );
    }
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color={connectionProps.color}
      transparent
      opacity={connectionProps.opacity}
      linewidth={2}
      toneMapped={false}
      dashed={false}
      depthWrite={false}
      blending={2}
    />
  );
};
