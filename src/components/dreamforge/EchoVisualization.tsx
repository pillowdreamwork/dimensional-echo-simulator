
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { dimensionalEchoCore, EchoEvent } from '../../lib/cores/dimensional-echo-core';
import { Activity } from 'lucide-react';

export const EchoVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const echoPoints = useRef<Array<{
    x: number;
    y: number;
    intensity: number;
    age: number;
    type: string;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Subscribe to echo events
    const subscription = dimensionalEchoCore.observeEchoEvents().subscribe((event: EchoEvent) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      echoPoints.current.push({
        x: centerX + (event.location.x / 10),
        y: centerY + (event.location.y / 10),
        intensity: event.intensity,
        age: 0,
        type: event.type
      });
    });

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw echo points
      echoPoints.current = echoPoints.current.filter(point => {
        point.age += 1;
        
        const alpha = Math.max(0, 1 - point.age / 100);
        const radius = point.age * 2 * point.intensity;
        
        if (alpha <= 0) return false;

        // Draw echo ripple
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, radius
        );
        
        const color = point.type === 'quantum_shift' ? '128, 0, 255' : 
                     point.type === 'dimensional_echo' ? '0, 255, 128' :
                     point.type === 'consciousness_pulse' ? '255, 128, 0' : '255, 255, 255';
        
        gradient.addColorStop(0, `rgba(${color}, ${alpha * 0.8})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw center point
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();

        return true;
      });

      // Draw quantum field background
      drawQuantumField(ctx, canvas.width, canvas.height);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      subscription.unsubscribe();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const drawQuantumField = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const time = Date.now() * 0.001;
    
    for (let i = 0; i < 50; i++) {
      const x = (Math.sin(time + i) * 0.5 + 0.5) * width;
      const y = (Math.cos(time + i * 0.7) * 0.5 + 0.5) * height;
      const alpha = (Math.sin(time * 2 + i) * 0.5 + 0.5) * 0.1;
      
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100, 200, 255, ${alpha})`;
      ctx.fill();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2" size={20} />
          Dimensional Echo Visualization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <canvas
          ref={canvasRef}
          className="w-full h-64 bg-black rounded-lg border"
          style={{ aspectRatio: '16/9' }}
        />
        <div className="mt-4 flex justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            Quantum Shift
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            Dimensional Echo
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
            Consciousness Pulse
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
