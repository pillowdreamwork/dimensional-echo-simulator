import { memo, useCallback, useMemo } from 'react';
import type { FC } from 'react';
import { useQuantumState } from '../hooks/use-quantum-state';
import { useRealityImpact } from '../hooks/use-reality-impact';
import type { DimensionalEffect } from '../types/quantum';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { useToast } from '../hooks/use-toast';
import { cn } from '../lib/utils';

interface Props {
  className?: string;
}

const EffectItem: FC<{ effect: DimensionalEffect }> = ({ effect }) => (
  <div className="text-sm flex justify-between items-center">
    <span>{effect.description}</span>
    <span className="text-gray-500 ml-2">
      {(effect.intensity * 100).toFixed(1)}%
    </span>
  </div>
);

export const RealityImpactEngine = memo<Props>(({ className }) => {
  const { quantumState, updateQuantumState } = useQuantumState();
  const { processImpact, calculateStability, isLoading } = useRealityImpact();
  const { toast } = useToast();

  const currentEffects = useMemo<DimensionalEffect[]>(() => {
    const effects: DimensionalEffect[] = [];
    const stabilityDelta = calculateStability(quantumState) - quantumState.dimensionalStability;
    
    if (quantumState.coherence < 0.5) {
      effects.push({
        description: "Low Coherence Warning",
        intensity: 1 - quantumState.coherence,
        stabilityChange: -0.1
      });
    }

    if (quantumState.entanglementStrength > 0.8) {
      effects.push({
        description: "High Entanglement Alert",
        intensity: quantumState.entanglementStrength,
        dimensionChange: 0.2
      });
    }

    if (stabilityDelta !== 0) {
      effects.push({
        description: stabilityDelta > 0 ? "Reality Stabilizing" : "Reality Destabilizing",
        intensity: Math.abs(stabilityDelta),
        stabilityChange: stabilityDelta
      });
    }

    return effects;
  }, [quantumState, calculateStability]);

  const handleImpactProcess = useCallback(async () => {
    if (isLoading || currentEffects.length === 0) return;

    try {
      const result = await processImpact({
        quantumState,
        effects: currentEffects
      });

      updateQuantumState({
        dimensionalStability: result.stability,
        coherence: result.coherence,
        entanglementStrength: result.entanglement
      });

      toast({
        title: "Reality Impact Processed",
        description: `Effects: ${currentEffects.length}, Stability: ${(result.stability * 100).toFixed(1)}%`,
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Processing Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    }
  }, [quantumState, currentEffects, processImpact, updateQuantumState, toast, isLoading]);

  const impactScore = useMemo(() => 
    currentEffects.reduce((sum, effect) => sum + effect.intensity, 0) * 100
  , [currentEffects]);

  return (
    <Card className={cn("w-full", className)}>
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Reality Impact Engine</h2>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Impact Score</span>
              <span>{impactScore.toFixed(1)}%</span>
            </div>
            <Progress value={impactScore} className="h-2" />
          </div>

          <div className="space-y-2">
            {currentEffects.map((effect, index) => (
              <EffectItem key={index} effect={effect} />
            ))}
            {currentEffects.length === 0 && (
              <div className="text-sm text-gray-500">
                No active reality effects
              </div>
            )}
          </div>

          <button
            onClick={handleImpactProcess}
            disabled={isLoading || currentEffects.length === 0}
            className={cn(
              "w-full px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors",
              "bg-indigo-500 hover:bg-indigo-600",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isLoading ? 'Processing...' : 'Process Reality Impact'}
          </button>
        </div>
      </div>
    </Card>
  );
});
