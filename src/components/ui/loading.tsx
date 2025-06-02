import { FC } from 'react';
import { Progress } from './progress';
import { Card } from './card';
import { cn } from '@/lib/utils';

interface LoadingFallbackProps {
  message?: string;
  dimensionalShift?: boolean;
  resonanceLevel?: number;
  className?: string;
}

export const LoadingFallback: FC<LoadingFallbackProps> = ({
  message = 'Stabilizing Quantum Field...',
  dimensionalShift = false,
  resonanceLevel = 100,
  className
}) => {
  return (
    <div className={cn(
      'fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center',
      dimensionalShift && 'animate-dimension-shift',
      className
    )}>
      <Card className="w-[300px] p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin-slow" />
              <div className="absolute inset-2 rounded-full border-2 border-primary/40 animate-spin-reverse" />
              <div className="absolute inset-4 rounded-full border border-primary/60 animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-center text-sm font-medium">{message}</div>
            <Progress 
              value={resonanceLevel} 
              className="h-1"
              indicatorClassName={cn(
                "transition-all duration-300",
                resonanceLevel >= 80 ? "bg-blue-500" :
                resonanceLevel >= 50 ? "bg-amber-500" :
                "bg-red-500"
              )}
            />
            <div className="text-center text-xs text-muted-foreground">
              Field Resonance: {resonanceLevel.toFixed(1)}%
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};