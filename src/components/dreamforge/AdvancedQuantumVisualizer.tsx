
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { QuantumState } from '../../types/quantum';
import { ErrorBoundary } from '../ErrorBoundary';
import { Activity, Layers, Zap, Target } from 'lucide-react';

interface QuantumParticle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  energy: number;
  entangled: boolean;
  coherence: number;
}

interface WaveFunction {
  amplitude: number;
  frequency: number;
  phase: number;
  collapse: boolean;
}

export const AdvancedQuantumVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  const [particles, setParticles] = useState<QuantumParticle[]>([]);
  const [waveFunction, setWaveFunction] = useState<WaveFunction>({
    amplitude: 1.0,
    frequency: 2.0,
    phase: 0,
    collapse: false
  });
  
  const [isRunning, setIsRunning] = useState(false);
  const [quantumState, setQuantumState] = useState<QuantumState>({
    stateVector: [1, 0, 0, 0],
    probability: 1.0,
    entanglementMap: new Map(),
    collapseHistory: [],
    state: 'superposition',
    coherence: 0.95,
    entanglement: 0.8,
    entanglementStrength: 0.7,
    superposition: 0.9,
    phase: 0,
    dimensionalResonance: 0.85,
    aethericResonance: 0.75,
    dimensionalStability: 0.92,
    timelineConvergence: 0.88,
    dimensionalShift: 0,
    ritualParticipants: {},
    realityAnchors: {
      primary: '',
      secondary: [],
      strength: 0.8
    },
    quantumSignature: {
      hash: '',
      timestamp: Date.now(),
      validityPeriod: 3600000
    },
    forgeMetadata: {
      version: '2.0',
      lastModified: Date.now(),
      stabilityIndex: 0.95,
      energyConsumption: 45
    }
  });

  // Initialize particles
  useEffect(() => {
    const initialParticles: QuantumParticle[] = Array.from({ length: 50 }, (_, i) => ({
      id: `particle-${i}`,
      x: Math.random() * 800,
      y: Math.random() * 400,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      energy: Math.random() * 100,
      entangled: Math.random() > 0.7,
      coherence: Math.random() * 0.5 + 0.5
    }));
    
    setParticles(initialParticles);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isRunning) return;

    const animate = () => {
      updateParticles();
      updateWaveFunction();
      updateQuantumState();
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, particles, waveFunction]);

  const updateParticles = () => {
    setParticles(prev => prev.map(particle => {
      let { x, y, vx, vy } = particle;
      
      // Update position
      x += vx;
      y += vy;
      
      // Boundary bouncing
      if (x <= 0 || x >= 800) vx *= -1;
      if (y <= 0 || y >= 400) vy *= -1;
      
      // Quantum fluctuations
      if (Math.random() < 0.1) {
        vx += (Math.random() - 0.5) * 0.5;
        vy += (Math.random() - 0.5) * 0.5;
      }
      
      // Entanglement effects
      if (particle.entangled && Math.random() < 0.05) {
        const entangledParticle = prev.find(p => p.entangled && p.id !== particle.id);
        if (entangledParticle) {
          const dx = entangledParticle.x - x;
          const dy = entangledParticle.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 0) {
            vx += (dx / distance) * 0.1;
            vy += (dy / distance) * 0.1;
          }
        }
      }
      
      return {
        ...particle,
        x: Math.max(0, Math.min(800, x)),
        y: Math.max(0, Math.min(400, y)),
        vx,
        vy,
        coherence: Math.max(0.1, Math.min(1.0, particle.coherence + (Math.random() - 0.5) * 0.02))
      };
    }));
  };

  const updateWaveFunction = () => {
    setWaveFunction(prev => ({
      ...prev,
      phase: (prev.phase + 0.1) % (2 * Math.PI),
      amplitude: Math.max(0.1, Math.min(1.0, prev.amplitude + (Math.random() - 0.5) * 0.02))
    }));
  };

  const updateQuantumState = () => {
    setQuantumState(prev => ({
      ...prev,
      coherence: Math.max(0.1, Math.min(1.0, prev.coherence + (Math.random() - 0.5) * 0.01)),
      entanglement: Math.max(0, Math.min(1.0, prev.entanglement + (Math.random() - 0.5) * 0.005)),
      superposition: Math.max(0, Math.min(1.0, prev.superposition + (Math.random() - 0.5) * 0.008)),
      dimensionalResonance: Math.max(0, Math.min(1.0, prev.dimensionalResonance + (Math.random() - 0.5) * 0.003))
    }));
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw wave function
    drawWaveFunction(ctx);
    
    // Draw particles
    particles.forEach(particle => {
      drawParticle(ctx, particle);
    });
    
    // Draw entanglement connections
    drawEntanglements(ctx);
    
    // Draw quantum field
    drawQuantumField(ctx);
  };

  const drawWaveFunction = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = `rgba(128, 255, 255, ${waveFunction.amplitude})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let x = 0; x < 800; x += 2) {
      const y = 200 + waveFunction.amplitude * 50 * Math.sin(
        waveFunction.frequency * x * 0.01 + waveFunction.phase
      );
      
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: QuantumParticle) => {
    const radius = 2 + particle.energy * 0.05;
    const alpha = particle.coherence;
    
    // Particle glow
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, radius * 3
    );
    
    if (particle.entangled) {
      gradient.addColorStop(0, `rgba(255, 100, 255, ${alpha})`);
      gradient.addColorStop(1, `rgba(255, 100, 255, 0)`);
    } else {
      gradient.addColorStop(0, `rgba(100, 200, 255, ${alpha})`);
      gradient.addColorStop(1, `rgba(100, 200, 255, 0)`);
    }
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, radius * 3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Core particle
    ctx.fillStyle = particle.entangled ? '#ff64ff' : '#64c8ff';
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, radius, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawEntanglements = (ctx: CanvasRenderingContext2D) => {
    const entangledParticles = particles.filter(p => p.entangled);
    
    for (let i = 0; i < entangledParticles.length - 1; i++) {
      for (let j = i + 1; j < entangledParticles.length; j++) {
        const p1 = entangledParticles[i];
        const p2 = entangledParticles[j];
        
        const distance = Math.sqrt(
          (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2
        );
        
        if (distance < 150) {
          const alpha = Math.max(0, 1 - distance / 150) * 0.3;
          
          ctx.strokeStyle = `rgba(255, 100, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  };

  const drawQuantumField = (ctx: CanvasRenderingContext2D) => {
    const gridSize = 40;
    
    for (let x = 0; x < 800; x += gridSize) {
      for (let y = 0; y < 400; y += gridSize) {
        const fieldStrength = Math.sin(x * 0.01 + waveFunction.phase) * 
                             Math.cos(y * 0.01 + waveFunction.phase) * 
                             quantumState.coherence;
        
        const alpha = Math.abs(fieldStrength) * 0.1;
        const size = Math.abs(fieldStrength) * 3;
        
        ctx.fillStyle = `rgba(150, 255, 150, ${alpha})`;
        ctx.fillRect(x - size/2, y - size/2, size, size);
      }
    }
  };

  const toggleAnimation = () => {
    setIsRunning(!isRunning);
  };

  const collapseWaveFunction = () => {
    setWaveFunction(prev => ({ ...prev, collapse: !prev.collapse }));
    setQuantumState(prev => ({
      ...prev,
      state: prev.state === 'superposition' ? 'collapsed' : 'superposition',
      collapseHistory: [...prev.collapseHistory, `collapse-${Date.now()}`]
    }));
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setWaveFunction({
      amplitude: 1.0,
      frequency: 2.0,
      phase: 0,
      collapse: false
    });
    
    const resetParticles: QuantumParticle[] = Array.from({ length: 50 }, (_, i) => ({
      id: `particle-${i}`,
      x: Math.random() * 800,
      y: Math.random() * 400,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      energy: Math.random() * 100,
      entangled: Math.random() > 0.7,
      coherence: Math.random() * 0.5 + 0.5
    }));
    
    setParticles(resetParticles);
  };

  return (
    <ErrorBoundary>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="mr-2 text-blue-500" size={20} />
              Advanced Quantum Visualizer
            </div>
            <div className="flex space-x-2">
              <Button onClick={toggleAnimation} variant="outline">
                {isRunning ? 'Pause' : 'Start'} Simulation
              </Button>
              <Button onClick={collapseWaveFunction} variant="outline">
                <Target className="mr-2 w-4 h-4" />
                {waveFunction.collapse ? 'Expand' : 'Collapse'} Wave
              </Button>
              <Button onClick={resetSimulation} variant="outline">
                Reset
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {/* Quantum State Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <Badge variant="outline">Coherence</Badge>
                <p className="text-2xl font-bold text-blue-500">
                  {(quantumState.coherence * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-center">
                <Badge variant="outline">Entanglement</Badge>
                <p className="text-2xl font-bold text-purple-500">
                  {(quantumState.entanglement * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-center">
                <Badge variant="outline">Superposition</Badge>
                <p className="text-2xl font-bold text-green-500">
                  {(quantumState.superposition * 100).toFixed(1)}%
                </p>
              </div>
              <div className="text-center">
                <Badge variant="outline">State</Badge>
                <p className="text-lg font-semibold text-gray-700">
                  {quantumState.state}
                </p>
              </div>
            </div>
            
            {/* Canvas */}
            <canvas
              ref={canvasRef}
              width={800}
              height={400}
              className="border border-gray-300 rounded-lg bg-black w-full"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-gray-50 rounded">
                <Layers className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <p className="text-sm text-gray-500">Active Particles</p>
                <p className="text-xl font-bold">{particles.length}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                <p className="text-sm text-gray-500">Wave Amplitude</p>
                <p className="text-xl font-bold">{waveFunction.amplitude.toFixed(2)}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <Target className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                <p className="text-sm text-gray-500">Entangled Pairs</p>
                <p className="text-xl font-bold">
                  {particles.filter(p => p.entangled).length}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
};
