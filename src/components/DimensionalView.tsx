import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useQuantumState, QuantumState } from "@/hooks/use-quantum-state";
import { PerspectiveCamera, Environment, OrbitControls, MeshTransmissionMaterial, useHelper } from "@react-three/drei";
import * as THREE from "three";

interface QuantumNodeData {
  id: number;
  position: readonly [number, number, number];
}

const QUANTUM_NODES: QuantumNodeData[] = [
  { id: 1, position: [0, 0, 0] },
  { id: 2, position: [2, 2, 2] },
  { id: 3, position: [-2, 1, -1] },
  { id: 4, position: [1, -2, 1] },
];

interface QuantumNodeProps {
  position: readonly [number, number, number];
  state: QuantumState;
  pulseFactor?: number;
  dimensionalShift?: number;
}

// Utility function for smooth interpolation
const lerp = (start: number, end: number, alpha: number) => start * (1 - alpha) + end * alpha;

const QuantumNode = ({ position, state, pulseFactor = 1, dimensionalShift = 0 }: QuantumNodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const pulseTime = useRef(Math.random() * Math.PI * 2);
  const originalPosition = useMemo(() => new THREE.Vector3(...position), [position]);
  const targetScale = useRef(1);
  const currentScale = useRef(1);

  // Cache light for performance
  const light = useMemo(() => {
    const pointLight = new THREE.PointLight(0x8020ff, 1, 4);
    return pointLight;
  }, []);

  // Create materials with shared geometries for better performance
  const { materials, geometries } = useMemo(() => {
    const core = new THREE.MeshPhysicalMaterial({
      color: 0x8020ff,
      emissive: 0x200080,
      roughness: 0.4,
      metalness: 0.8,
      transmission: 0.5,
      thickness: 0.5,
    });

    const glow = new THREE.MeshPhysicalMaterial({
      color: 0x5010cc,
      emissive: 0x6620ff,
      transparent: true,
      opacity: 0.5,
      transmission: 0.9,
      thickness: 0.2,
    });

    return {
      materials: { core, glow },
      geometries: {
        core: new THREE.SphereGeometry(0.5, 32, 32),
        glow: new THREE.SphereGeometry(0.5, 16, 16),
      }
    };
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      pulseTime.current += delta;
      
      // Smooth scaling animation
      targetScale.current = pulseFactor * (1 + Math.sin(pulseTime.current * 2) * 0.1);
      currentScale.current = lerp(currentScale.current, targetScale.current, delta * 5);
      meshRef.current.scale.setScalar(currentScale.current);
      
      // Dimensional shift with smooth transitions
      const shiftAmount = Math.sin(pulseTime.current + dimensionalShift) * 0.5;
      const newPosition = originalPosition.clone().add(
        new THREE.Vector3(
          shiftAmount * Math.sin(pulseTime.current * 0.7),
          shiftAmount * Math.cos(pulseTime.current * 0.8),
          shiftAmount * Math.sin(pulseTime.current * 0.9)
        )
      );
      meshRef.current.position.lerp(newPosition, delta * 3);
      
      // Update materials
      const intensity = (state.superposition / 100) * (0.5 + Math.sin(pulseTime.current * 3) * 0.2);
      materials.core.emissiveIntensity = intensity;
      materials.glow.opacity = intensity * 0.5;
      
      // Update light
      light.intensity = lerp(light.intensity, intensity * 2, delta * 4);
      light.color.setHSL(
        0.7 + Math.sin(pulseTime.current) * 0.1,
        0.8,
        0.5 + intensity * 0.2
      );
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <primitive object={geometries.core} />
        <primitive object={materials.core} />
      </mesh>
      
      <mesh scale={[1.2, 1.2, 1.2]}>
        <primitive object={geometries.glow} />
        <primitive object={materials.glow} />
      </mesh>

      <primitive object={light} />
    </group>
  );
};

// Optimize connection lines with instanced geometry
interface ConnectionLinesProps {
  nodes: QuantumNodeData[];
  state: QuantumState;
}

const ConnectionLines = ({ nodes, state }: ConnectionLinesProps) => {
  const linesRef = useRef<THREE.LineSegments>(null);
  const instanceCount = (nodes.length * (nodes.length - 1)) / 2;
  
  const { geometry, material } = useMemo(() => {
    const points: number[] = [];
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach(target => {
        points.push(...node.position, ...target.position);
      });
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(points, 3)
    );

    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(0.5, 0.2, 1),
      transparent: true,
      linewidth: 1,
    });

    return { geometry, material };
  }, [nodes]);

  useFrame(() => {
    if (linesRef.current) {
      const time = performance.now() * 0.001;
      material.opacity = (state.entanglementStrength / 200) * (0.5 + Math.sin(time * 2) * 0.2);
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <primitive object={geometry} />
      <primitive object={material} />
    </lineSegments>
  );
};

interface QuantumFieldProps {
  state: QuantumState;
  dimensionalShift: number;
}

const QuantumField = ({ state, dimensionalShift }: QuantumFieldProps) => {
  const fieldRef = useRef<THREE.Mesh>(null);
  const { clock } = useThree();

  const fieldMaterial = useMemo(() => {
    return new MeshTransmissionMaterial({
      backside: true,
      samples: 16,
      thickness: 2,
      chromaticAberration: 0.5 + (dimensionalShift * 0.2),
      distortion: 0.5,
      temporalDistortion: 0.2 + (dimensionalShift * 0.1),
      distortionScale: 0.5,
      transmission: 1,
      resolution: 256,
      background: new THREE.Color(0.1, 0.1, 0.1)
    });
  }, [dimensionalShift]);

  useFrame(() => {
    if (fieldRef.current) {
      const time = clock.getElapsedTime();
      fieldRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
      fieldRef.current.rotation.y = Math.cos(time * 0.3) * 0.1;
      
      fieldMaterial.distortion = 0.5 + (state.coherence / 200) * Math.sin(time);
      fieldMaterial.temporalDistortion = 0.2 + (state.entanglementStrength / 200) * Math.cos(time);
      fieldMaterial.chromaticAberration = 0.5 + (state.superposition / 200) * Math.sin(time * 0.5);
    }
  });

  return (
    <mesh ref={fieldRef} scale={[8, 8, 8]}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={fieldMaterial} />
    </mesh>
  );
};

const Scene = () => {
  const { quantumState, currentDimension } = useQuantumState();
  const dimensionalShift = useMemo(() => currentDimension * Math.PI / 6, [currentDimension]);

  // Cache camera settings
  const cameraSettings = useMemo(() => ({
    position: [0, 0, 8] as const,
    fov: 75,
    near: 0.1,
    far: 1000
  }), []);

  // Cache controls settings
  const controlsSettings = useMemo(() => ({
    enablePan: false,
    enableZoom: true,
    maxDistance: 10,
    minDistance: 3,
    autoRotate: true,
    autoRotateSpeed: 0.5,
    enableDamping: true,
    dampingFactor: 0.05
  }), []);

  return (
    <>
      <ambientLight 
        intensity={0.2}
        color={new THREE.Color(0.4, 0.4, 0.6)}
      />
      <pointLight 
        position={[10, 10, 10]}
        intensity={0.8}
        color={new THREE.Color(0.6, 0.4, 1)}
      />
      <Environment preset="night" />

      <QuantumField state={quantumState} dimensionalShift={dimensionalShift} />
      <ConnectionLines nodes={QUANTUM_NODES} state={quantumState} />

      {QUANTUM_NODES.map((node) => (
        <QuantumNode
          key={node.id}
          position={node.position}
          state={quantumState}
          pulseFactor={1 + quantumState.coherence / 200}
          dimensionalShift={dimensionalShift}
        />
      ))}

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        maxDistance={10}
        minDistance={3}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
};

const DimensionalView = () => {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden dimensional-border relative">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none z-10" />
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          precision: "highp",
          stencil: false,
          depth: true
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        camera={{ fov: 75, near: 0.1, far: 1000 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default DimensionalView;
