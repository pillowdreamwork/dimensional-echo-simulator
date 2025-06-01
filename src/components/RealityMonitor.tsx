import { memo } from 'react';
import type { FC } from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { cn } from '../lib/utils';

interface RealityMonitorProps {
  currentDimension: number;
  stabilityFactor: number;
  timelineConvergence: number;
  className?: string;
}

const RealityMonitorComponent: FC<RealityMonitorProps> = ({ 
  currentDimension,
  stabilityFactor,
  timelineConvergence,
  className 
}) => {
  return (
    <Card className={cn("w-full", className)}>
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Reality Monitor</h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Current Dimension</span>
              <span>Level {currentDimension}</span>
            </div>
            <Progress 
              value={currentDimension / 12 * 100} 
              className="h-2" 
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Stability</span>
              <span>{(stabilityFactor * 100).toFixed(1)}%</span>
            </div>
            <Progress 
              value={stabilityFactor * 100} 
              className="h-2" 
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Timeline Convergence</span>
              <span>{(timelineConvergence * 100).toFixed(1)}%</span>
            </div>
            <Progress 
              value={timelineConvergence * 100} 
              className="h-2" 
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export const RealityMonitor = memo(RealityMonitorComponent);
export type { RealityMonitorProps };
