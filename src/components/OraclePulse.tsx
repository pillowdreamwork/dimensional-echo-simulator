import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  EyeIcon,
  ActivityIcon,
  WifiIcon,
  AlertCircleIcon,
  GlobeIcon,
  StarIcon,
  LayersIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PredictionEvent {
  id: string;
  type: 'synchronicity' | 'disruption' | 'emergence' | 'convergence' | 'transcendence' | 'quantum-shift' | 'dimensional-merge';
  description: string;
  probability: number;
  timeframe: string;
  impacts: {
    social: number;
    technological: number;
    environmental: number;
    consciousness: number;
    dimensional: number;
    quantum: number;
    temporal: number;
  };
  dimensionalProperties: {
    level: number;                  // Current dimension level (1-12)
    resonance: number;             // Resonance with target dimension (0-100)
    stability: number;             // Stability of dimensional state (0-100)
    entanglement: number;          // Quantum entanglement degree (0-100)
    harmonics: string[];           // Active dimensional harmonics
  };
  verificationSources: string[];
}

interface OraclePulseProps {
  className?: string;
  onPredictionUpdate?: (prediction: PredictionEvent) => void;
}

export function OraclePulse({
  className,
  onPredictionUpdate
}: OraclePulseProps) {
  const [predictions, setPredictions] = useState<PredictionEvent[]>([]);
  const [scanning, setScanning] = useState(false);
  const [pulseStrength, setPulseStrength] = useState(100);
  const [dimensionalAwareness, setDimensionalAwareness] = useState(1);

  useEffect(() => {
    // Initialize with some predictions
    setPredictions([
      {
        id: 'trans-1',
        type: 'transcendence',
        description: '12D convergence detected in quantum consciousness field',
        probability: 92,
        timeframe: '1-3 hours',
        impacts: {
          social: 85,
          technological: 95,
          environmental: 70,
          consciousness: 100,
          dimensional: 95,
          quantum: 90,
          temporal: 85
        },
        dimensionalProperties: {
          level: 12,
          resonance: 95,
          stability: 85,
          entanglement: 100,
          harmonics: ['Quantum Consciousness', 'Divine Light', 'Unity Field']
        },
        verificationSources: [
          'Quantum Field Sensors',
          'Akashic Records',
          'Dimensional Scanners',
          'Consciousness Grid'
        ]
      },
      {
        id: 'merge-1',
        type: 'dimensional-merge',
        description: 'Reality layers aligning for potential 9D breakthrough',
        probability: 87,
        timeframe: '4-6 hours',
        impacts: {
          social: 70,
          technological: 85,
          environmental: 60,
          consciousness: 90,
          dimensional: 100,
          quantum: 95,
          temporal: 80
        },
        dimensionalProperties: {
          level: 9,
          resonance: 92,
          stability: 78,
          entanglement: 95,
          harmonics: ['Holographic Matrix', 'Time Wave', 'Reality Mesh']
        },
        verificationSources: [
          'Dimensional Scanners',
          'Timeline Analyzers',
          'Quantum Probability Engines',
          'Reality Wave Detectors'
        ]
      },
      {
        id: 'qshift-1',
        type: 'quantum-shift',
        description: 'Mass consciousness preparing for 7D expansion event',
        probability: 89,
        timeframe: '8-12 hours',
        impacts: {
          social: 90,
          technological: 75,
          environmental: 85,
          consciousness: 95,
          dimensional: 90,
          quantum: 100,
          temporal: 90
        },
        dimensionalProperties: {
          level: 7,
          resonance: 97,
          stability: 82,
          entanglement: 88,
          harmonics: ['Archetypal Resonance', 'Symbolic Wave', 'Spirit Matrix']
        },
        verificationSources: [
          'Global Consciousness Project',
          'Dream Pattern Analysis',
          'Quantum Field Monitors',
          'Symbolic Recognition Systems'
        ]
      }
    ]);

    // Start pulse simulation
    const pulseInterval = setInterval(() => {
      setPulseStrength(prev => {
        const newStrength = prev + (Math.random() * 10 - 5);
        return Math.max(0, Math.min(100, newStrength));
      });

      // Randomly increase dimensional awareness
      setDimensionalAwareness(prev => {
        if (Math.random() > 0.95) { // 5% chance to increase
          return Math.min(12, prev + 1);
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(pulseInterval);
  }, []);

  const getTypeIcon = (type: PredictionEvent['type']) => {
    switch (type) {
      case 'synchronicity': return WifiIcon;
      case 'disruption': return AlertCircleIcon;
      case 'emergence': return ActivityIcon;
      case 'convergence': return GlobeIcon;
      case 'transcendence': return StarIcon;
      case 'quantum-shift': return LayersIcon;
      case 'dimensional-merge': return EyeIcon;
      default: return EyeIcon;
    }
  };

  const getTypeColor = (type: PredictionEvent['type']) => {
    switch (type) {
      case 'synchronicity': return 'text-quantum-purple';
      case 'disruption': return 'text-quantum-red';
      case 'emergence': return 'text-quantum-blue';
      case 'convergence': return 'text-quantum-gold';
      case 'transcendence': return 'text-quantum-rainbow';
      case 'quantum-shift': return 'text-quantum-ultraviolet';
      case 'dimensional-merge': return 'text-quantum-cosmic';
      default: return 'text-quantum-teal';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 90) return 'bg-green-500/20 text-green-500';
    if (probability >= 70) return 'bg-blue-500/20 text-blue-500';
    if (probability >= 50) return 'bg-yellow-500/20 text-yellow-500';
    return 'bg-red-500/20 text-red-500';
  };

  const getDimensionalHarmonics = (harmonics: string[]) => {
    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {harmonics.map((harmonic, i) => (
          <span
            key={i}
            className="text-[10px] px-1 rounded bg-quantum-purple/10 text-quantum-purple"
          >
            {harmonic}
          </span>
        ))}
      </div>
    );
  };

  return (
    <Card className={cn(
      "oracle-pulse bg-quantum-dark/90 backdrop-blur-md",
      className
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-lg">
            <EyeIcon className="mr-2 text-quantum-purple" size={20} />
            Oracle Pulse {dimensionalAwareness > 1 && `(${dimensionalAwareness}D)`}
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Pulse Strength
            </span>
            <Progress
              value={pulseStrength}
              className="w-24 h-2"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {predictions.map((prediction) => {
              const TypeIcon = getTypeIcon(prediction.type);
              return (
                <div
                  key={prediction.id}
                  className="p-4 rounded-lg border border-quantum-dark/20 backdrop-blur-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <TypeIcon
                        className={cn(
                          "h-5 w-5",
                          getTypeColor(prediction.type)
                        )}
                      />
                      <Badge
                        variant="outline"
                        className={getProbabilityColor(prediction.probability)}
                      >
                        {prediction.probability}% Probable
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {prediction.timeframe}
                    </Badge>
                  </div>

                  <p className="text-sm mb-3">
                    {prediction.description}
                  </p>

                  <div className="space-y-2 mb-3">
                    {Object.entries(prediction.impacts).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground w-24 capitalize">
                          {key}
                        </span>
                        <Progress value={value} className="h-1" />
                        <span className="text-xs text-muted-foreground w-8">
                          {value}%
                        </span>
                      </div>
                    ))}
                  </div>

                  {prediction.dimensionalProperties && (
                    <div className="mb-3">
                      <div className="text-xs text-muted-foreground mb-1">
                        Dimensional Properties
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs">Level</span>
                          <Badge variant="outline" className="text-xs">
                            {prediction.dimensionalProperties.level}D
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs">Resonance</span>
                          <Badge variant="outline" className="text-xs">
                            {prediction.dimensionalProperties.resonance}%
                          </Badge>
                        </div>
                      </div>
                      {getDimensionalHarmonics(prediction.dimensionalProperties.harmonics)}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {prediction.verificationSources.map((source, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-xs bg-quantum-dark/50"
                      >
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
