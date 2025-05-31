import React, { useState, useEffect } from 'react';
import { useQuantumState } from '@/hooks/use-quantum-state';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { LayersIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const CustomProgress = ({ value, className, indicatorClassName }: any) => (
  <Progress
    value={value}
    className={cn("h-2", className)}
    indicatorClassName={indicatorClassName}
  />
);

const QuantumStateCollapser = () => {
  const { toast } = useToast();
  const [stabilityFactor, setStabilityFactor] = useState(50);
  const [collapsing, setCollapsing] = useState(false);
  const [collapsedState, setCollapsedState] = useState<string | null>(null);
  const [wasReset, setWasReset] = useState(false);
  const [quantumStates, setQuantumStates] = useState({
    alpha: 0.5,
    beta: 0.5,
    gamma: 0.5,
    delta: 0.5
  });

  const { quantumState, collapseQuantumState, stabilizeQuantumState } = useQuantumState({
    onStateChange: (newState) => {
      // Update UI when quantum state changes
      toast({
        title: "Quantum State Updated",
        description: `Coherence: ${Math.round(newState.coherence)}%, Entanglement: ${Math.round(newState.entanglementStrength)}%`,
      });
    }
  });

  // Calculate quantum probabilities
  const calculateProbabilities = () => {
    const sum = Object.values(quantumStates).reduce((acc, val) => acc + val * val, 0);
    return Object.fromEntries(
      Object.entries(quantumStates).map(([key, value]) => [key, (value * value) / sum])
    );
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
    setQuantumStates(prev => ({
      ...prev,
      [state]: value
    }));
  };

  // Superimpose quantum states
  const handleSuperimpose = () => {
    setCollapsing(true);
    
    setTimeout(() => {
      // Create a superposition of states
      const allStates = Object.keys(quantumStates);
      const superpositionState = allStates[Math.floor(Math.random() * allStates.length)];
      
      // Update all quantum states based on superposition
      const newStates = {...quantumStates};
      
      // Redistribute probabilities while maintaining the chosen state as highest
      Object.keys(newStates).forEach(key => {
        if (key === superpositionState) {
          newStates[key] = 0.7 + Math.random() * 0.3;
        } else {
          newStates[key] = 0.2 + Math.random() * 0.3;
        }
      });
      
      setQuantumStates(newStates);
      
      toast({
        title: "Quantum States Superimposed",
        description: `Created superposition centered on ${stateNames[superpositionState]} state`,
        duration: 3000,
      });
      
      setCollapsing(false);
    }, 1500);
  };

  // Collapse quantum state
  const handleCollapseState = () => {
    setCollapsing(true);
    
    setTimeout(() => {
      // Calculate probabilities
      const probs = calculateProbabilities();
      
      // Manual calculation for quantum state collapse
      const random = Math.random();
      let cumulativeProb = 0;
      let stateKey = Object.entries(probs).find(([key, prob]) => {
        cumulativeProb += prob;
        return random < cumulativeProb;
      })?.[0] || Object.keys(probs)[0];
      
      // Apply stability factor (higher = more likely to stay in current state)
      if (collapsedState && Math.random() < (stabilityFactor / 100)) {
        stateKey = collapsedState;
      }

      // Collapse the quantum state
      collapseQuantumState(stabilityFactor / 100);
      
      setCollapsedState(stateKey || null);
      
      // Reset to uncollapsed state after a few seconds
      setTimeout(() => {
        setCollapsedState(null);
        setWasReset(true);
        setTimeout(() => setWasReset(false), 500);
        stabilizeQuantumState(0.8); // Stabilize after collapse
      }, 5000);
      
      // Show toast with results
      toast({
        title: "Quantum State Collapsed",
        description: `Wavefunction collapsed to ${stateNames[stateKey || '']} state`,
        duration: 3000,
      });
      
      setCollapsing(false);
    }, 2000);
  };
  
  // Reset all quantum states to equal probability
  const handleReset = () => {
    setQuantumStates({
      alpha: 0.5,
      beta: 0.5,
      gamma: 0.5,
      delta: 0.5
    });
    setCollapsedState(null);
    stabilizeQuantumState(1.0); // Full stability on reset
    
    toast({
      title: "Quantum States Reset",
      description: "All states returned to equal probability",
      duration: 2000,
    });
  };

  return (
    <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70 w-full">
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
              disabled={collapsing || !!collapsedState}
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
        {Object.entries(quantumStates).map(([state, value]) => (
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
      </CardContent>
    </Card>
  );
};

export default QuantumStateCollapser;
