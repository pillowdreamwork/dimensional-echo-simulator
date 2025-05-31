import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

interface SeedState {
  growth: number;
  branches: number;
  timeline: string[];
}

export const SentientSeed: React.FC = () => {
  const [seed, setSeed] = useState<SeedState>({ growth: 0, branches: 1, timeline: ['Planted'] });

  const grow = () => {
    setSeed(prev => ({
      growth: Math.min(prev.growth + Math.random() * 0.2, 1),
      branches: prev.branches + Math.floor(Math.random() * 2),
      timeline: [...prev.timeline, `Branch at ${new Date().toLocaleTimeString()}`]
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Sentient Ritual Seed
          <Badge variant="secondary">Fractal AI</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={grow}>
            Grow Seed
          </button>
        </div>
        <div className="mb-2">Growth: {(seed.growth * 100).toFixed(1)}%</div>
        <div className="mb-2">Branches: {seed.branches}</div>
        <div className="text-xs text-gray-500">Timeline:</div>
        <ul className="text-xs pl-4">
          {seed.timeline.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SentientSeed;
