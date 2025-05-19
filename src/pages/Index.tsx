import React, { useState, useEffect } from "react";
import VirtualCompass from "@/components/VirtualCompass";
import DimensionalView from "@/components/DimensionalView";
import QuantumInterface from "@/components/QuantumInterface";
import SymbolSystem from "@/components/SymbolSystem";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateDimensionalEffect } from "@/utils/quantum";
import { useToast } from "@/components/ui/use-toast";
import { DreamCompass, RitualInterface, MythicAIShowcase, EchoSimulatorMode } from './PillowDreamworkShowcase';

const Index = () => {
  const { toast } = useToast();
  const [currentDimension, setCurrentDimension] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [dimensionalEffects, setDimensionalEffects] = useState<string[]>([]);
  const [superpositionValues, setSuperpositionValues] = useState<number[]>([]);
  
  // Transition effect when dimension changes
  const handleDimensionChange = (dimension: number) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentDimension(dimension);
      
      setTimeout(() => {
        setIsTransitioning(false);
        
        // Add dimensional effect
        const effect = generateDimensionalEffect(dimension);
        setDimensionalEffects(prev => [effect, ...prev].slice(0, 5));
        
        toast({
          title: `Shifted to ${dimension}D Reality`,
          description: effect,
          duration: 3000,
        });
      }, 500);
    }, 1500);
  };
  
  // Handle superposition calculation
  const handleSuperposition = (values: number[]) => {
    setSuperpositionValues(values);
    
    // If values suggest a higher dimension is possible, indicate it
    const highestDimValue = Math.max(...values.slice(currentDimension));
    if (highestDimValue > 0.3) {
      const possibleDimension = values.indexOf(highestDimValue) + 1;
      
      if (possibleDimension > currentDimension) {
        toast({
          title: "Dimensional Resonance Detected",
          description: `${possibleDimension}D appears to be accessible through superposition.`,
          duration: 4000,
        });
      }
    }
  };
  
  // Handle symbol activation
  const handleSymbolActivate = (pattern: string) => {
    // Different effects based on symbol combinations
    const dimensionalEffects = [
      "Reality ripples around you as symbols connect",
      "The fabric of space-time briefly fluctuates",
      "Geometric patterns emerge in the air, then fade",
      "A sense of dimensional awareness expands in your mind",
      "Quantum probabilities briefly stabilize",
      "Hidden connections between dimensions become visible"
    ];
    
    const effect = dimensionalEffects[Math.floor(Math.random() * dimensionalEffects.length)];
    
    setDimensionalEffects(prev => [effect, ...prev].slice(0, 5));
    
    // Special patterns that allow dimensional transitions
    if (pattern.includes("⊛") || pattern.includes("⊕")) {
      if (currentDimension < 11) {
        handleDimensionChange(currentDimension + 1);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-quantum-dark text-foreground p-4 md:p-6">
      <header className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-quantum-purple mb-2">
          Quantum Dimensional Simulator
        </h1>
        <p className="text-quantum-blue max-w-xl mx-auto">
          Explore multidimensional realities through quantum mechanics and symbolic interactions
        </p>
      </header>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left sidebar - Virtual Compass */}
        <div className="flex flex-col space-y-4">
          <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
            <CardContent className="pt-6 flex flex-col items-center">
              <VirtualCompass
                currentDimension={currentDimension}
                onDimensionChange={handleDimensionChange}
                maxDimension={11}
              />
            </CardContent>
          </Card>
          
          <SymbolSystem 
            dimension={currentDimension}
            onSymbolActivate={handleSymbolActivate}
          />
        </div>
        
        {/* Main content - Dimensional View */}
        <div className="md:col-span-2 flex flex-col space-y-4">
          <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70 h-80">
            <CardContent className="pt-6">
              <DimensionalView 
                dimension={currentDimension}
                isTransitioning={isTransitioning}
              />
            </CardContent>
          </Card>
          
          <QuantumInterface
            currentDimension={currentDimension}
            onSuperposition={handleSuperposition}
          />
          
          {/* Reality log */}
          <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
            <CardContent className="py-4">
              <div className="flex items-center mb-3">
                <h3 className="text-sm font-medium text-quantum-gold">Reality Log</h3>
                <Badge variant="outline" className="ml-2 bg-quantum-gold/10 text-quantum-gold text-xs">
                  {dimensionalEffects.length} entries
                </Badge>
              </div>
              
              <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {dimensionalEffects.length > 0 ? (
                  dimensionalEffects.map((effect, index) => (
                    <div key={index} className="text-sm">
                      <p className="text-muted-foreground">{effect}</p>
                      {index < dimensionalEffects.length - 1 && (
                        <Separator className="my-2" />
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-xs italic">No dimensional effects recorded yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* PillowDreamwork showcase components */}
      <div className="mt-8">
        <DreamCompass />
        <RitualInterface />
        <MythicAIShowcase />
        <EchoSimulatorMode />
      </div>
      
      <footer className="mt-8 text-center text-xs text-muted-foreground">
        <p>Quantum Dimensional Simulator v0.1.0</p>
        <p className="mt-1">
          Exploring dimensions 1-11 through quantum mechanics and symbolic language
        </p>
      </footer>
    </div>
  );
};

export default Index;
