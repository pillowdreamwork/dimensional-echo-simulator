import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuantumCore } from '../lib/cores/quantum-core';
import { useQuantumState } from '../hooks/use-quantum-state';
import { QuantumState } from '../types/quantum';

interface QuantumInterfaceProps {
  initialState?: QuantumState;
  onStateChange?: (state: QuantumState) => void;
  dimensionalControls?: boolean;
  realityManipulation?: boolean;
  timelineNavigation?: boolean;
}

export const QuantumInterface: React.FC<QuantumInterfaceProps> = ({
  initialState,
  onStateChange,
  dimensionalControls = true,
  realityManipulation = true,
  timelineNavigation = true
}) => {
  // Initialize the quantum core with hardware acceleration
  const quantumCore = useMemo(() => new QuantumCore(), []);
  const [isInitialized, setIsInitialized] = useState(false);
  const [performance, setPerformance] = useState<Record<string, number>>({});
  
  // Get quantum state management from our hook
  const {
    quantumState,
    updateQuantumState
  } = useQuantumState({ initialState });
  
  // Initialize quantum core
  useEffect(() => {
    const init = async () => {
      await quantumCore.initialize();
      setIsInitialized(true);
    };
    init();
    
    return () => quantumCore.cleanup();
  }, [quantumCore]);

  // Process quantum states
  useEffect(() => {
    if (!isInitialized) return;

    const processState = async () => {
      const evolvedState = await quantumCore.evolveQuantumState(quantumState);
      updateQuantumState(evolvedState);
      onStateChange?.(evolvedState);
      
      // Update performance metrics
      setPerformance(quantumCore.getPerformanceMetrics());
    };

    const intervalId = setInterval(processState, 16); // 60fps updates
    return () => clearInterval(intervalId);
  }, [quantumState, isInitialized, quantumCore, updateQuantumState, onStateChange]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Quantum Interface</span>
          <Badge variant={isInitialized ? "default" : "destructive"}>
            {isInitialized ? "Initialized" : "Initializing..."}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Quantum State Display */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Coherence</p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-200"
                  style={{ width: `${quantumState.coherence * 100}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Entanglement</p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 transition-all duration-200"
                  style={{ width: `${quantumState.entanglement * 100}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Superposition</p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-200"
                  style={{ width: `${quantumState.superposition * 100}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Dimensional Resonance</p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 transition-all duration-200"
                  style={{ width: `${quantumState.dimensionalResonance * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <h3 className="font-semibold mb-2">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">GPU Time</p>
                <p>{performance.averageGPUTime?.toFixed(2) || 'N/A'} ms</p>
              </div>
              <div>
                <p className="text-gray-500">Worker Time</p>
                <p>{performance.averageWorkerTime?.toFixed(2) || 'N/A'} ms</p>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4">
            {dimensionalControls && (
              <Button variant="outline" onClick={() => {
                updateQuantumState({
                  dimensionalResonance: Math.min(quantumState.dimensionalResonance + 0.1, 1)
                });
              }}>
                Increase Resonance
              </Button>
            )}
            
            {realityManipulation && (
              <Button variant="outline" onClick={() => {
                updateQuantumState({
                  coherence: Math.min(quantumState.coherence + 0.1, 1)
                });
              }}>
                Enhance Coherence
              </Button>
            )}
            
            {timelineNavigation && (
              <Button variant="outline" onClick={() => {
                updateQuantumState({
                  phase: (quantumState.phase + Math.PI / 4) % (Math.PI * 2)
                });
              }}>
                Shift Phase
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuantumInterface;
