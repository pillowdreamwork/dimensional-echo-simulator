import React, { useEffect, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Vector3 } from 'three';
import { KarmaReflectionSystem, KarmaEvent, ReflectionLog } from '../../lib/cores/karma-reflection';
import { QuantumTesseractEngine } from '../../lib/cores/quantum-tesseract';

interface KarmaVisualizerProps {
  karmaSystem: KarmaReflectionSystem;
  logId: string;
}

const KarmaMatrix: React.FC<{
  matrix: number[][];
  position: Vector3;
}> = ({ matrix, position }) => {
  const cellSize = 0.5;
  const gap = 0.1;

  return (
    <group position={position}>
      {matrix.map((row, i) =>
        row.map((value, j) => {
          const color = value > 0 ? 
            `hsl(${120 + value * 60}, 70%, 50%)` :
            `hsl(${360 + value * 60}, 70%, 50%)`;
          
          return (
            <mesh
              key={`${i}-${j}`}
              position={[
                i * (cellSize + gap),
                j * (cellSize + gap),
                0
              ]}
            >
              <boxGeometry args={[cellSize, cellSize, 0.1]} />
              <meshStandardMaterial 
                color={color}
                opacity={Math.abs(value)}
                transparent
                metalness={0.5}
                roughness={0.2}
              />
            </mesh>
          );
        })
      )}
    </group>
  );
};

const ResonanceDisplay: React.FC<{
  patterns: string[];
  position: Vector3;
}> = ({ patterns, position }) => {
  return (
    <group position={position}>
      {patterns.map((pattern, i) => (
        <Text
          key={i}
          position={[i * 1.5, 0, 0]}
          fontSize={0.5}
          color="#ffffff"
        >
          {pattern}
        </Text>
      ))}
    </group>
  );
};

const StabilityIndicator: React.FC<{
  indicators: {
    temporal: number;
    spatial: number;
    harmonic: number;
  };
  position: Vector3;
}> = ({ indicators, position }) => {
  const barWidth = 2;
  const barHeight = 0.2;
  const gap = 0.4;

  return (
    <group position={position}>
      {Object.entries(indicators).map(([key, value], i) => (
        <group key={key} position={[0, i * (barHeight + gap), 0]}>
          <mesh position={[barWidth * value / 2, 0, 0]}>
            <boxGeometry args={[barWidth * value, barHeight, 0.1]} />
            <meshStandardMaterial 
              color={`hsl(${value * 120}, 70%, 50%)`}
              metalness={0.3}
              roughness={0.4}
            />
          </mesh>
          <Text
            position={[-1.5, 0, 0]}
            fontSize={0.2}
            color="#ffffff"
            anchorX="right"
          >
            {key}:
          </Text>
        </group>
      ))}
    </group>
  );
};

export const KarmaVisualizer: React.FC<KarmaVisualizerProps> = ({
  karmaSystem,
  logId
}) => {
  const [visualData, setVisualData] = useState<ReturnType<
    typeof KarmaReflectionSystem.prototype.getHarmonyVisualizationData
  > | null>(null);

  useEffect(() => {
    try {
      const data = karmaSystem.getHarmonyVisualizationData(logId);
      setVisualData(data);
    } catch (error) {
      console.error('Failed to get karma visualization data:', error);
    }
  }, [karmaSystem, logId]);

  if (!visualData) return null;

  return (
    <div className="karma-visualizer">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 75 }}
        style={{ width: '100%', height: '600px' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />

        <KarmaMatrix
          matrix={visualData.matrix}
          position={new Vector3(-2, -2, 0)}
        />
        
        <ResonanceDisplay
          patterns={visualData.resonancePatterns}
          position={new Vector3(-2, 2, 0)}
        />
        
        <StabilityIndicator
          indicators={visualData.stabilityIndicators}
          position={new Vector3(2, 0, 0)}
        />
      </Canvas>

      <style jsx>{`
        .karma-visualizer {
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};
