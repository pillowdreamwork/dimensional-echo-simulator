import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { CompassIcon, WavesIcon, ClockIcon, LayersIcon } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { getEngineModules } from '../lib/engine';
import { Slider } from "@/components/ui/slider";

interface TimelineEffect {
  id: string;
  strength: number;
  duration: number;
  type: 'convergence' | 'divergence' | 'ripple';
}

interface RealityRipple {
  id: string;
  origin: { x: number; y: number };
  intensity: number;
  radius: number;
  frequency: number;
}

export function DreamCompass() {
  const { toast } = useToast();
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [compassState, setCompassState] = useState({
    currentDimension: 1,
    accessibleDimensions: [1, 2, 3]
  });
  
  const [timelineEffects, setTimelineEffects] = useState<TimelineEffect[]>([]);
  const [realityRipples, setRealityRipples] = useState<RealityRipple[]>([]);
  const [timelineStability, setTimelineStability] = useState(1.0);
  const [dimensionalResonance, setDimensionalResonance] = useState(0.5);
  
  // Get engine modules
  const { dreamCompass, echoSimulator } = getEngineModules();

  // Initialize compass state and timeline effects
  useEffect(() => {
    if (dreamCompass && echoSimulator) {
      setCompassState({
        currentDimension: dreamCompass.currentDimension || 1,
        accessibleDimensions: dreamCompass.getAccessibleDimensions?.() || [1, 2, 3]
      });

      // Initialize timeline monitoring
      const cleanup = echoSimulator.monitorTimeline((effects) => {
        setTimelineEffects(effects);
        setTimelineStability(
          effects.reduce((stability, effect) => 
            stability * (1 - effect.strength * 0.1), 1)
        );
      });

      return cleanup;
    }
  }, [dreamCompass, echoSimulator]);

  // Handle reality ripple creation
  const createRealityRipple = useCallback((x: number, y: number) => {
    const newRipple: RealityRipple = {
      id: Math.random().toString(36).substr(2, 9),
      origin: { x, y },
      intensity: Math.random() * 0.5 + 0.5,
      radius: 0,
      frequency: Math.random() * 2 + 1
    };

    setRealityRipples(ripples => [...ripples, newRipple]);
    
    // Animate ripple expansion
    const animate = () => {
      setRealityRipples(ripples => 
        ripples.map(ripple => 
          ripple.id === newRipple.id
            ? { ...ripple, radius: ripple.radius + 2 }
            : ripple
        ).filter(ripple => ripple.radius < 100) // Remove fully expanded ripples
      );
    };

    const intervalId = setInterval(animate, 16);
    setTimeout(() => clearInterval(intervalId), 3000);
  }, []);

  // Handle dimensional transition
  const handleDimensionalShift = async (targetDimension: number) => {
    if (!dreamCompass) return;

    setIsCalibrating(true);
    try {
      await dreamCompass.initiateDimensionalShift(targetDimension);
      
      // Create reality ripples during transition
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createRealityRipple(
            Math.random() * 100,
            Math.random() * 100
          );
        }, i * 200);
      }

      // Update compass state
      setCompassState(prev => ({
        ...prev,
        currentDimension: targetDimension
      }));

      toast({
        title: "Dimensional Shift Complete",
        description: `Shifted to dimension ${targetDimension}D`,
      });
    } catch (error) {
      toast({
        title: "Shift Failed",
        description: "Failed to complete dimensional transition",
        variant: "destructive"
      });
    } finally {
      setIsCalibrating(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CompassIcon className="h-6 w-6" />
            Dream Compass
          </div>
          <Badge variant={timelineStability > 0.7 ? "default" : "destructive"}>
            Timeline Stability: {(timelineStability * 100).toFixed(1)}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Timeline Effects Display */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <ClockIcon className="h-4 w-4" />
              Active Timeline Effects
            </h3>
            <div className="space-y-2">
              {timelineEffects.map(effect => (
                <div key={effect.id} className="flex items-center justify-between">
                  <span className="text-sm">
                    {effect.type.charAt(0).toUpperCase() + effect.type.slice(1)}
                  </span>
                  <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-200"
                      style={{ width: `${effect.strength * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reality Ripples Visualization */}
          <div className="relative h-[200px] border rounded-lg overflow-hidden">
            {realityRipples.map(ripple => (
              <div
                key={ripple.id}
                className="absolute border-2 border-blue-500 rounded-full opacity-50 transition-all duration-200"
                style={{
                  left: `${ripple.origin.x}%`,
                  top: `${ripple.origin.y}%`,
                  width: `${ripple.radius * 2}px`,
                  height: `${ripple.radius * 2}px`,
                  transform: `translate(-50%, -50%) scale(${1 + Math.sin(Date.now() * ripple.frequency / 1000) * 0.1})`,
                  opacity: Math.max(0, 0.5 - ripple.radius / 200),
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <WavesIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          {/* Dimensional Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Dimensional Resonance</span>
              <Slider
                value={[dimensionalResonance]}
                onValueChange={([value]) => setDimensionalResonance(value)}
                max={1}
                step={0.01}
                className="w-[60%]"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {compassState.accessibleDimensions.map(dim => (
                <Button
                  key={dim}
                  variant={compassState.currentDimension === dim ? "default" : "outline"}
                  disabled={isCalibrating}
                  onClick={() => handleDimensionalShift(dim)}
                  className="relative overflow-hidden"
                >
                  <LayersIcon className="h-4 w-4 mr-2" />
                  {dim}D
                  {isCalibrating && compassState.currentDimension === dim && (
                    <div className="absolute inset-0 bg-blue-500 opacity-20" 
                         style={{ width: `${dimensionalResonance * 100}%` }} />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DreamCompass;
