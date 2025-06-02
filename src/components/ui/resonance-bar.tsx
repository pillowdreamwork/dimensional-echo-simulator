import { FC } from 'react';
import { cn } from '../../lib/utils';

interface ResonanceBarProps {
  value: number;
  maxValue?: number;
  label?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const ResonanceBar: FC<ResonanceBarProps> = ({
  value,
  maxValue = 100,
  label,
  variant = 'default',
  className
}) => {
  const percentage = (value / maxValue) * 100;
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-600 from-green-500/20 to-green-600/20';
      case 'warning':
        return 'bg-yellow-600 from-yellow-500/20 to-yellow-600/20';
      case 'danger':
        return 'bg-red-600 from-red-500/20 to-red-600/20';
      default:
        return 'bg-quantum-purple from-quantum-purple/20 to-quantum-purple/20';
    }
  };

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-mono">{value.toFixed(1)}%</span>
        </div>
      )}
      
      <div className="h-2 w-full bg-gradient-to-r from-transparent to-transparent rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-500 ease-out bg-gradient-to-r",
            getVariantClasses()
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
