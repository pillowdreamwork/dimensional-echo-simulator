
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { getEngineModules } from '../lib/engine';
import { CustomProgress } from './ui/custom-progress';

const QuantumStateCollapser = () => {
  const [quantumStates, setQuantumStates] = useState<{[key: string]: number}>({
    alpha: 0.5,
    beta: 0.5,
    gamma: 0.5,
    delta: 0.5
  });
  const [collapsing, setCollapsing] = useState(false);
  const [collapsedState, setCollapsedState] = useState<string | null>(null);
  const [stabilityFactor, setStabilityFactor] = useState(50);
  const [wasReset, setWasReset] = useState(false);
  
  const { uncertainty } = getEngineModules();
  
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
  
  // Calculate entropy of the system
  const calculateEntropy = () => {
    const probs = calculateProbabilities();
    return -Object.values(probs).reduce(
      (acc, p) => acc + (p > 0 ? p * Math.log2(p) : 0),
      0
    );
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
  
  // Collapse quantum state - this simulates the quantum collapse without requiring the actual engine function
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
      
      setCollapsedState(stateKey || null);
      
      // Reset to uncollapsed state after a few seconds
      setTimeout(() => {
        setCollapsedState(null);
        setWasReset(true);
        setTimeout(() => setWasReset(false), 500);
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
    
    toast({
      title: "Quantum States Reset",
      description: "All states returned to equal probability",
      duration: 2000,
    });
  };

  return (
    <Card className={`quantum-state-collapser bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70 ${wasReset ? 'animate-pulse' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-quantum-purple">Quantum State Collapser</CardTitle>
          <Badge variant="outline" className={`
            ${collapsedState ? 'bg-quantum-purple text-white' : 'bg-quantum-purple/20 text-quantum-purple'}
          `}>
            {collapsedState ? stateNames[collapsedState] : "Superposition"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Adjust quantum probability amplitudes and collapse the wavefunction.
        </p>
        
        {Object.entries(quantumStates).map(([state, value]) => (
          <div key={state} className="mb-4">
            <div className="flex justify-between items-center mb-1">
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
            <span className="text-xs text-muted-foreground">{stabilityFactor}%</span>
          </div>
          <Slider
            value={[stabilityFactor]}
            min={0}
            max={100}
            step={1}
            onValueChange={(vals) => setStabilityFactor(vals[0])}
            disabled={collapsing || !!collapsedState}
          />
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-xs text-muted-foreground">Entropy: </span>
            <span className="text-sm">{calculateEntropy().toFixed(2)}</span>
          </div>
          <Badge variant={calculateEntropy() > 1.5 ? "default" : "outline"} className="bg-quantum-teal/20 text-quantum-teal">
            {calculateEntropy() > 1.5 ? "High Uncertainty" : "Low Uncertainty"}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          <Button
            onClick={handleCollapseState}
            disabled={collapsing || !!collapsedState}
            variant="quantum"
            className="w-full"
          >
            {collapsing ? "Collapsing Quantum State..." : "Collapse Quantum State"}
          </Button>
          
          <Button
            onClick={handleSuperimpose}
            disabled={collapsing || !!collapsedState}
            variant="superimpose"  
            className="w-full"
          >
            Superimpose States
          </Button>
          
          <Button
            onClick={handleReset}
            disabled={collapsing}
            variant="outline"
            className="w-full"
          >
            Reset States
          </Button>
        </div>
        
        {collapsedState && (
          <div className="mt-4 p-3 border border-quantum-purple/30 rounded-md bg-quantum-purple/10">
            <p className="text-sm font-medium text-quantum-purple">
              State collapsed to: {stateNames[collapsedState]}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Wavefunction will reset to superposition in a few seconds...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuantumStateCollapser;
