import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DimensionalViewProps {
  dimension: number;
  isTransitioning: boolean;
}

const DimensionalView: React.FC<DimensionalViewProps> = ({ dimension, isTransitioning }) => {
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
  const cameraRef = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const rendererRef = useRef<THREE.WebGLRenderer>(new THREE.WebGLRenderer({ alpha: true }));
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;

    // Set up camera
    camera.position.z = 5;

    // Set up renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background

    // Append renderer to the container
    const container = document.getElementById('dimensional-view');
    if (container) {
      container.appendChild(renderer.domElement);
    }

    // Particle geometry
    const particleCount = 500;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Fix the Color constructor issue
    const particleColors = [
      new THREE.Color().setHex(0x4299E1),
      new THREE.Color().setHex(0x9F7AEA), 
      new THREE.Color().setHex(0xF6AD55)
    ];

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.7
    });

    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const color = particleColors[i % particleColors.length];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create particle system
    particlesRef.current = new THREE.Points(particleGeometry, material);
    scene.add(particlesRef.current);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as THREE.TypedArray;
        for (let i = 0; i < particleCount * 3; i += 3) {
          positions[i + 1] -= 0.01; // Drift upwards
          if (positions[i + 1] < -5) {
            positions[i + 1] = 5;
          }
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [dimension, isTransitioning]);

  return (
    <div
      id="dimensional-view"
      className="w-full h-full transition-opacity duration-500"
      style={{ opacity: isTransitioning ? 0.5 : 1 }}
    />
  );
};

export default DimensionalView;
