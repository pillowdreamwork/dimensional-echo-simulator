import { FC } from 'react';
import { cn } from '../../lib/utils';

interface EffectItemProps {
  type: 'TURBULENCE' | 'FREQUENCY_SHIFT' | 'ANOMALY' | 'STABILIZATION' |
        'DREAMSCAPE' | 'NUMEROLOGY' | 'ARCHETYPE' | 'SYNCHRONICITY' | 'EMOTIONAL_SURGE';
  description: string;
  intensity?: number;
  frequency?: number;
  className?: string;
}

export const EffectItem: FC<EffectItemProps> = ({
  type,
  description,
  intensity = 1,
  frequency,
  className
}) => {
  const getTypeColor = () => {
    switch (type) {
      case 'TURBULENCE': return 'bg-red-400';
      case 'FREQUENCY_SHIFT': return 'bg-blue-400';
      case 'ANOMALY': return 'bg-purple-400';
      case 'STABILIZATION': return 'bg-green-400';
      case 'DREAMSCAPE': return 'bg-indigo-400';
      case 'NUMEROLOGY': return 'bg-yellow-400';
      case 'ARCHETYPE': return 'bg-cyan-400';
      case 'SYNCHRONICITY': return 'bg-violet-400';
      case 'EMOTIONAL_SURGE': return 'bg-pink-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <div className="flex items-center space-x-2">
        <span className={cn("w-2 h-2 rounded-full", getTypeColor())} />
        <span className="text-sm font-medium">{description}</span>
      </div>
      
      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
        {intensity && (
          <div className="flex items-center space-x-1">
            <span>Intensity:</span>
            <div className="flex space-x-0.5">
              {Array.from({ length: Math.min(5, Math.ceil(intensity * 5)) }).map((_, i) => (
                <span key={i} className="w-1 h-3 bg-quantum-purple/40 rounded-full" />
              ))}
            </div>
          </div>
        )}
        
        {frequency && (
          <div className="font-mono">
            {frequency.toFixed(1)} Hz
          </div>
        )}
      </div>
    </div>
  );
};
