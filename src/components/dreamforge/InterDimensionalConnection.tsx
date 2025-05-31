import React, { useMemo } from 'react';
import { Vector3 } from 'three';
import { extend } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { GlyphNode } from '../../types/glyph';
import { DIMENSIONAL_PROPERTIES } from '../../types/dimensional';

interface InterDimensionalConnectionProps {
  source: GlyphNode;
  target: GlyphNode;
  connection: GlyphNode['connections'][0];
}

export const InterDimensionalConnection: React.FC<InterDimensionalConnectionProps> = ({
  source,
  target,
  connection
}) => {
  const points = useMemo(() => [
    new Vector3(source.position.x, source.position.y, source.position.z),
    new Vector3(target.position.x, target.position.y, target.position.z)
  ], [source.position, target.position]);

  const color = useMemo(() => {
    const dimensionColor = DIMENSIONAL_PROPERTIES[source.dimensionalProperties.level].color;
    const alpha = connection.dimensionalResonance / 100;
    return dimensionColor + Math.floor(alpha * 255).toString(16).padStart(2, '0');
  }, [source.dimensionalProperties.level, connection.dimensionalResonance]);

  const materialProps = useMemo(() => {
    const intensity = Math.min(1, (connection.strength * connection.phaseAlignment) / 10000);
    return {
      color,
      transparent: true,
      opacity: connection.strength / 100,
      linewidth: connection.phaseAlignment / 25,
      toneMapped: false,
      dashed: false,
    };
  }, [color, connection.strength, connection.phaseAlignment]);

  return (
    <Line
      points={points}
      {...materialProps}
    />
  );
};
