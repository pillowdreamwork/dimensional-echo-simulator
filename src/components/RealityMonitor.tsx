import { memo, useMemo } from 'react';
import type { FC } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { 
  DIMENSIONAL_PLANES, 
  DimensionalLevel 
} from '@/types/dimensional';
import { 
  calculateRelativeStability,
  getActiveHarmonics,
  calculateConvergenceFactor,
  getRecommendedDimension
} from '@/utils/dimensional';

interface RealityMonitorProps {
  currentDimension: DimensionalLevel;
  stabilityFactor: number;
  timelineConvergence: number;
  className?: string;
  onDimensionalShift?: (dimension: DimensionalLevel) => void;
  consciousness?: number;
}

const RealityMonitorComponent: FC<RealityMonitorProps> = memo(({ 
  currentDimension,
  stabilityFactor,
  timelineConvergence,
  className,
  onDimensionalShift,
  consciousness = 0.5
}) => {
  // Memoized calculations for performance
  const currentDimensionalPlane = useMemo(() => 
    DIMENSIONAL_PLANES.find(plane => plane.level === currentDimension) || DIMENSIONAL_PLANES[0]
  , [currentDimension]);

  const recommendedDimension = useMemo(() => 
    getRecommendedDimension(currentDimension, stabilityFactor, consciousness)
  , [currentDimension, stabilityFactor, consciousness]);

  const relativeStability = useMemo(() =>
    calculateRelativeStability(currentDimension, stabilityFactor)
  , [currentDimension, stabilityFactor]);

  const activeHarmonics = useMemo(() =>
    getActiveHarmonics(currentDimension)
  , [currentDimension]);

  const convergenceFactor = useMemo(() =>
    timelineConvergence * (1 - Math.abs(currentDimension - recommendedDimension) / 12)
  , [currentDimension, recommendedDimension, timelineConvergence]);

  const dimensionalFlux = useMemo(() => 
    Math.abs(currentDimension - recommendedDimension) * (1 - stabilityFactor)
  , [currentDimension, recommendedDimension, stabilityFactor]);

  // Dynamic classes based on state
  const stabilityClass = useMemo(() => {
    if (stabilityFactor >= 0.9) return 'bg-emerald-600';
    if (stabilityFactor >= 0.7) return 'bg-amber-600';
    return 'bg-red-600';
  }, [stabilityFactor]);

  const convergenceClass = useMemo(() => {
    if (convergenceFactor >= 0.9) return 'bg-blue-600';
    if (convergenceFactor >= 0.7) return 'bg-purple-600';
    return 'bg-orange-600';
  }, [convergenceFactor]);

  const fluxClass = useMemo(() => {
    if (dimensionalFlux <= 0.1) return 'bg-teal-600';
    if (dimensionalFlux <= 0.3) return 'bg-cyan-600';
    return 'bg-violet-600';
  }, [dimensionalFlux]);

  return (
    <Card className={cn("w-full backdrop-blur-sm", className)}>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Reality Monitor</h2>
          <span className="text-sm text-muted-foreground">
            {currentDimensionalPlane.name} Plane
          </span>
        </div>
        
        <div className="space-y-4">
          {/* Dimension Level Indicator */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Current Dimension</span>
              <span>Level {currentDimension}</span>
            </div>
            <Progress 
              value={currentDimension / 12 * 100} 
              className={cn("h-2")}
              indicatorClassName="transition-all duration-500"
              style={{ backgroundColor: currentDimensionalPlane.color }}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {currentDimensionalPlane.description}
            </p>
          </div>

          {/* Stability Indicator */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Stability ({(currentDimensionalPlane.stabilityThreshold * 100).toFixed(0)}% required)</span>
              <span>{(stabilityFactor * 100).toFixed(1)}%</span>
            </div>
            <Progress 
              value={stabilityFactor * 100} 
              className={cn("h-2", stabilityClass)}
              indicatorClassName="transition-all duration-500"
            />
            {recommendedDimension !== currentDimension && (
              <p className="text-xs text-muted-foreground mt-1">
                Recommended: Level {recommendedDimension}
              </p>
            )}
          </div>

          {/* Timeline Convergence */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Timeline Convergence</span>
              <span>{(convergenceFactor * 100).toFixed(1)}%</span>
            </div>
            <Progress 
              value={convergenceFactor * 100} 
              className={cn("h-2", convergenceClass)}
              indicatorClassName="transition-all duration-500"
            />
          </div>

          {/* Dimensional Flux */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Dimensional Flux</span>
              <span>{(dimensionalFlux * 100).toFixed(1)}%</span>
            </div>
            <Progress 
              value={Math.min(dimensionalFlux * 100, 100)} 
              className={cn("h-2", fluxClass)}
              indicatorClassName="transition-all duration-500"
            />
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
            <div>
              <div>Active Harmonics:</div>
              <div className="font-mono mt-1">{activeHarmonics.join(', ')}</div>
            </div>
            <div>
              <div>Consciousness Level:</div>
              <div className="font-mono mt-1">{(consciousness * 100).toFixed(0)}%</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
});

RealityMonitorComponent.displayName = 'RealityMonitor';

export const RealityMonitor = memo(RealityMonitorComponent);
export type { RealityMonitorProps };
