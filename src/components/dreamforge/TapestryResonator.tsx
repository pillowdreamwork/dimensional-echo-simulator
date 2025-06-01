import { useState, useRef, useEffect } from 'react';
import { useQuantumState } from '../../hooks/use-quantum-state';

interface TimelineNode {
  id: string;
  timestamp: number;
  event: string;
  resonance: number;
}

export function TapestryResonator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { quantumState } = useQuantumState();
  const [timeline, setTimeline] = useState<TimelineNode[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw timeline
    const drawTimeline = () => {
      if (timeline.length === 0) return;

      const padding = 40;
      const nodeRadius = 6;
      const lineY = canvas.height / 2;

      // Draw main timeline line
      ctx.beginPath();
      ctx.strokeStyle = '#9333ea';
      ctx.lineWidth = 2;
      ctx.moveTo(padding, lineY);
      ctx.lineTo(canvas.width - padding, lineY);
      ctx.stroke();

      // Draw nodes and resonance waves
      timeline.forEach((node, index) => {
        const x = padding + (index * (canvas.width - 2 * padding)) / (timeline.length - 1);
        
        // Draw resonance wave
        ctx.beginPath();
        ctx.strokeStyle = `rgba(147, 51, 234, ${node.resonance / 100})`;
        for (let i = -20; i <= 20; i++) {
          const waveY = lineY + Math.sin(i / 2) * (node.resonance / 2);
          if (i === -20) {
            ctx.moveTo(x + i, waveY);
          } else {
            ctx.lineTo(x + i, waveY);
          }
        }
        ctx.stroke();

        // Draw node
        ctx.beginPath();
        ctx.fillStyle = '#9333ea';
        ctx.arc(x, lineY, nodeRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw event text
        ctx.fillStyle = '#1f2937';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        const text = node.event.length > 20 ? node.event.substring(0, 17) + '...' : node.event;
        ctx.fillText(text, x, lineY + 25);
      });
    };

    drawTimeline();
  }, [timeline]);

  useEffect(() => {
    // Update timeline based on quantum state changes
    if (quantumState.lastSymbolAnalysis) {
      setTimeline(prev => [...prev, {
        id: Date.now().toString(),
        timestamp: Date.now(),
        event: 'Symbol Analysis',
        resonance: Math.random() * 100
      }]);
    }
  }, [quantumState.lastSymbolAnalysis]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Tapestry Resonator</h2>
      <div className="relative w-full" style={{ height: '200px' }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {timeline.map(node => (
          <div key={node.id} className="p-3 border rounded">
            <div className="font-medium">{node.event}</div>
            <div className="text-sm text-gray-500">
              Resonance: {node.resonance.toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
