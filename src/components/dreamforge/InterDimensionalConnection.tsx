import React, { useMemo, useRef } from 'react';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { GlyphNode } from '../../types/glyph';
import { DIMENSIONAL_PROPERTIES } from '../../types/dimensional';

const BATCH_SIZE = 1000; // Process connections in batches
const UPDATE_INTERVAL = 16; // ~60fps update rate

interface ConnectionProps {
  source: GlyphNode;
  target: GlyphNode;
  connection: GlyphNode['connections'][0];
  batchIndex?: number;
}

export const InterDimensionalConnection: React.FC<ConnectionProps> = React.memo(({
  source,
  target,
  connection,
  batchIndex = 0
}) => {
  const lineRef = useRef<any>();
  const lastUpdateRef = useRef(0);

  const points = useMemo(() => {
    const start = new Vector3(source.position.x, source.position.y, source.position.z);
    const end = new Vector3(target.position.x, target.position.y, target.position.z);
    const midPoint = new Vector3().lerpVectors(start, end, 0.5);
    
    // Add curve control point for better visual effect
    const control = midPoint.clone().add(
      new Vector3(
        Math.sin(connection.phaseAlignment * Math.PI) * 0.5,
        Math.cos(connection.dimensionalResonance * Math.PI) * 0.5,
        Math.sin(connection.strength * Math.PI) * 0.5
      )
    );

    // Create smooth curve points for efficient rendering
    const curvePoints = [];
    const segments = Math.max(2, Math.floor(connection.strength / 20));
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const point = new Vector3().lerpVectors(
        start.clone().lerp(control, t),
        control.clone().lerp(end, t),
        t
      );
      curvePoints.push(point);
    }
    
    return curvePoints;
  }, [source.position, target.position, connection.strength, connection.phaseAlignment, connection.dimensionalResonance]);

  const color = useMemo(() => {
    const dimensionColor = DIMENSIONAL_PROPERTIES[source.dimensionalProperties.level].color;
    const alpha = connection.dimensionalResonance / 100;
    return dimensionColor + Math.floor(alpha * 255).toString(16).padStart(2, '0');
  }, [source.dimensionalProperties.level, connection.dimensionalResonance]);

  const materialProps = useMemo(() => ({
    color,
    transparent: true,
    opacity: connection.strength / 100,
    linewidth: Math.max(0.5, connection.phaseAlignment / 25),
    toneMapped: false,
    dashed: false,
    depthWrite: false,
    vertexColors: true,
    blending: 2,
  }), [color, connection.strength, connection.phaseAlignment]);

  useFrame((state) => {
    if (!lineRef.current) return;
    
    const now = state.clock.getElapsedTime() * 1000;
    if (now - lastUpdateRef.current < UPDATE_INTERVAL) return;
    
    if (state.camera.position.distanceTo(points[0]) < 50) {
      const batchDelay = (batchIndex % BATCH_SIZE) * 0.1;
      setTimeout(() => {
        if (lineRef.current) {
          lineRef.current.geometry.verticesNeedUpdate = true;
          lineRef.current.material.needsUpdate = true;
        }
      }, batchDelay);
    }
    
    lastUpdateRef.current = now;
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      {...materialProps}
    />
  );
});
