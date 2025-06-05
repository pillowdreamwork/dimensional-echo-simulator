import React, { memo, useCallback, useMemo, useState } from 'react';
import { useQuantumState } from '@/hooks/use-quantum-state';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { LayersIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QuantumState, QuantumMetrics } from '@/types/quantum';

const CustomProgress = ({ value, className, indicatorClassName }: { value: number; className?: string; indicatorClassName?: string }) => (
  <Progress
    value={value}
    className={cn("h-2", className)}
    // Handle the indicator class through CSS styling instead
  />
);

interface Props {
  className?: string;
  quantumState: QuantumState;
  onStateChange: (state: Partial<QuantumState>) => void;
}

// QuantumStateCollapser: Quantum state manipulation UI and logic
// <<Component>>
// Fields: className, quantumState, onStateChange, stabilityFactor, collapsing, collapsedState
// Methods: handleCollapseState, handleSuperimpose, handleReset
// Uses: useToast

// Helper functions for quantum state manipulation
const collapseQuantumState = (state: QuantumState, targetState: string, stabilityFactor: number): Partial<QuantumState> => {
  const baseStates = ['alpha', 'beta', 'gamma', 'delta'] as const;
  const updates: Partial<QuantumState> = {
    superposition: 0,
    coherence: Math.max(0.1, state.coherence * stabilityFactor),
    entanglement: Math.max(0, state.entanglement * stabilityFactor),
    dimensionalStability: Math.min(1, state.dimensionalStability + 0.2),
    collapseTimestamp: Date.now()
  };
  baseStates.forEach(stateKey => {
    (updates as any)[stateKey] = stateKey === targetState ? 1 : 0;
  });
  return updates;
};

const stabilizeQuantumState = (state: QuantumState): Partial<QuantumState> => ({
  coherence: Math.min(1, state.coherence + 0.2),
  dimensionalStability: Math.min(1, state.dimensionalStability + 0.1),
  entanglement: Math.max(0, state.entanglement - 0.1)
});

const QuantumStateCollapser = memo(function QuantumStateCollapser({ className, quantumState, onStateChange }: Props) {
  const { toast } = useToast();
  const [stabilityFactor, setStabilityFactor] = useState(50);
  const [collapsing, setCollapsing] = useState(false);
  const [collapsedState, setCollapsedState] = useState<string | null>(null);
  const [wasReset, setWasReset] = useState(false);

  const metrics = useMemo<QuantumMetrics>(() => ({
    coherence: quantumState.coherence * 100,
    entanglement: quantumState.entanglement * 100,
    stability: quantumState.dimensionalStability * 100
  }), [quantumState]);

  // Calculate quantum probabilities for the base states only
  const calculateProbabilities = () => {
    const baseStates = ['alpha', 'beta', 'gamma', 'delta'] as const;
    let sum = 0;
    baseStates.forEach(state => {
      sum += Number(quantumState[state]) * Number(quantumState[state]);
    });
    const result: Record<typeof baseStates[number], number> = {
      alpha: 0, beta: 0, gamma: 0, delta: 0
    };
    baseStates.forEach(state => {
      result[state] = sum > 0 ? (Number(quantumState[state]) * Number(quantumState[state])) / sum : 0;
    });
    return result;
  };

  // Quantum state names
  const stateNames: {[key: string]: string} = {
    alpha: "Reality Prime",
    beta: "Dreamfield",
    gamma: "Symbolic Realm",
    delta: "Echo Space"
  };

  // Handle quantum state change
  const handleStateChange = (state: string, value: number) => {
    onStateChange({
      [state]: value
    });
  };

  // Superimpose quantum states
  const handleSuperimpose = () => {
    setCollapsing(true);
    
    setTimeout(() => {
      // Create a superposition of states
      const allStates = ['alpha', 'beta', 'gamma', 'delta'] as const;
      const superpositionState = allStates[Math.floor(Math.random() * allStates.length)];
      
      // Create new state updates
      const stateUpdates: Partial<QuantumState> = {
        superposition: 1,
        coherence: Math.max(0.5, quantumState.coherence),
        entanglementStrength: Math.min(1, quantumState.entanglementStrength + 0.2)
      };
      
      // Add probability updates
      allStates.forEach(key => {
        (stateUpdates as any)[key] = key === superpositionState ? 0.7 + Math.random() * 0.3 : 0.2 + Math.random() * 0.3;
      });
      
      onStateChange(stateUpdates);
      toast({
        title: "Quantum States Superimposed",
        description: `Created superposition centered on ${stateNames[superpositionState]} state`,
      });
      
      setCollapsing(false);
    }, 1500);
  };

  // Collapse quantum state
  const handleCollapseState = useCallback(() => {
    setCollapsing(true);
    
    setTimeout(() => {
      // Calculate probabilities
      const probs = calculateProbabilities();
      
      // Determine collapse target state using quantum probability distribution
      const random = Math.random();
      let cumulativeProb = 0;
      const targetState = (Object.entries(probs) as [string, number][]).find(([_, prob]) => {
        cumulativeProb += prob;
        return random < cumulativeProb;
      })?.[0] || 'alpha';

      // Apply stability factor
      const effectiveState = (collapsedState && Math.random() < (stabilityFactor / 100))
        ? collapsedState
        : targetState;

      // Update quantum state
      const updates = collapseQuantumState(quantumState, effectiveState, stabilityFactor / 100);
      onStateChange(updates);
      setCollapsedState(effectiveState);

      // Show collapse result
      toast({
        title: "Quantum State Collapsed",
        description: `Wavefunction collapsed to ${stateNames[effectiveState]} state`,
      });
      
      // Reset after delay
      setTimeout(() => {
        setCollapsedState(null);
        setWasReset(true);
        onStateChange(stabilizeQuantumState(quantumState));
        setTimeout(() => setWasReset(false), 500);
      }, 5000);
      
      setCollapsing(false);
    }, 2000);
  }, [quantumState, stabilityFactor, collapsedState, toast, onStateChange, stateNames]);

  // Reset all quantum states to equal probability
  const handleReset = () => {
    onStateChange({
      alpha: 0.5,
      beta: 0.5,
      gamma: 0.5,
      delta: 0.5,
      coherence: 1,
      entanglement: 0,
      superposition: 0,
      dimensionalStability: 1
    });
    setCollapsedState(null);
    
    toast({
      title: "Quantum States Reset",
      description: "All states returned to equal probability"
    });
  };

  const isCollapseDisabled = quantumState.dimensionalStability < 0.1;

  return (
    <Card className={cn("bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70 w-full", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <LayersIcon className="mr-2 text-quantum-purple" size={18} />
            Quantum Control Interface
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSuperimpose}
              disabled={collapsing || !!collapsedState}
            >
              Superimpose
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCollapseState}
              disabled={collapsing || !!collapsedState || isCollapseDisabled}
            >
              Collapse
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReset}
              disabled={collapsing}
            >
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {Object.entries(quantumState).map(([state, value]) => (
          <div key={state} className={cn(
            "mb-4",
            wasReset && "animate-quantum-reset",
            collapsedState === state && "animate-quantum-collapse"
          )}>
            <div className="flex justify-between mb-1">
              <label className="text-sm">
                {stateNames[state]}
              </label>
              <span className="text-xs text-muted-foreground">
                {Math.round(calculateProbabilities()[state] * 100)}%
              </span>
            </div>
            <Slider
              value={[value * 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={(vals) => handleStateChange(state, vals[0] / 100)}
              disabled={collapsing || !!collapsedState}
              className="mb-1"
            />
            <CustomProgress 
              value={calculateProbabilities()[state] * 100}
              className="h-2"
              indicatorClassName={collapsedState === state ? 'bg-quantum-purple' : 'bg-quantum-purple/40'}
            />
          </div>
        ))}
        
        <div className="mb-4 mt-6">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm">Stability Factor</label>
            <span className="text-xs text-muted-foreground">
              {stabilityFactor}%
            </span>
          </div>
          <Slider
            value={[stabilityFactor]}
            min={0}
            max={100}
            step={1}
            onValueChange={(vals) => setStabilityFactor(vals[0])}
            disabled={collapsing}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-sm">
            <div className="font-medium mb-1">Coherence</div>
            <CustomProgress 
              value={quantumState.coherence}
              className="mb-2"
              indicatorClassName="bg-blue-400"
            />
          </div>
          <div className="text-sm">
            <div className="font-medium mb-1">Entanglement</div>
            <CustomProgress 
              value={quantumState.entanglementStrength}
              className="mb-2"
              indicatorClassName="bg-purple-400"
            />
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          Last Collapse: {new Date(quantumState.collapseTimestamp).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
});

export default QuantumStateCollapser;
