
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { processRitual } from '../utils/quantum';
import { getEngineModules } from '../lib/engine';

// Ritual categories with predefined rituals
const ritualCategories = {
  dimensional: [
    { id: 'dim1', name: 'Gateway Opening', glyph: '⊛', description: 'Opens pathways between adjacent dimensions', intensity: 65 },
    { id: 'dim2', name: 'Boundary Dissolution', glyph: '⊙', description: 'Temporarily weakens dimensional boundaries', intensity: 70 },
    { id: 'dim3', name: 'Quantum Anchoring', glyph: '⊕', description: 'Creates stable reference points across dimensions', intensity: 55 }
  ],
  temporal: [
    { id: 'temp1', name: 'Timeline Echo', glyph: '⍟', description: 'Reveals past/future decision branches', intensity: 60 },
    { id: 'temp2', name: 'Temporal Fold', glyph: '⌬', description: 'Brings distant timeline points into proximity', intensity: 75 },
    { id: 'temp3', name: 'Causality Loop', glyph: '⊚', description: 'Creates a stable timelike closed curve', intensity: 80 }
  ],
  symbolic: [
    { id: 'sym1', name: 'Glyph Activation', glyph: '✸', description: 'Energizes dormant symbols in the dreamfield', intensity: 50 },
    { id: 'sym2', name: 'Pattern Recognition', glyph: '⊗', description: 'Enhances perception of hidden symbolic structures', intensity: 45 },
    { id: 'sym3', name: 'Symbolic Binding', glyph: '⊝', description: 'Creates connections between disparate symbols', intensity: 55 }
  ]
};

type Ritual = {
  id: string;
  name: string;
  glyph: string;
  description: string;
  intensity: number;
};

const RitualList = () => {
  const [activeCategory, setActiveCategory] = useState<string>('dimensional');
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null);
  const [customIntensity, setCustomIntensity] = useState<number>(50);
  const [isPerforming, setIsPerforming] = useState<boolean>(false);
  
  const { iuri } = getEngineModules();
  
  const handleSelectRitual = (ritual: Ritual) => {
    setSelectedRitual(ritual);
    setCustomIntensity(ritual.intensity);
  };
  
  const handlePerformRitual = () => {
    if (!selectedRitual) return;
    
    setIsPerforming(true);
    
    // Process the ritual
    setTimeout(() => {
      // Process ritual using the quantum utility
      const result = processRitual(selectedRitual.glyph, customIntensity);
      
      // Also invoke through the engine if available
      if (iuri) {
        iuri.invokeRitual({
          glyph: selectedRitual.glyph,
          intensity: customIntensity,
          name: selectedRitual.name
        });
      }
      
      // Show ritual effect toast
      toast({
        title: `Ritual: ${selectedRitual.name}`,
        description: result.outcome,
        duration: 4000,
      });
      
      // If the ritual results in a dimension shift
      if (result.dimensionalShift > 0) {
        setTimeout(() => {
          toast({
            title: "Dimensional Effect",
            description: `The ritual creates a shift of ${result.dimensionalShift} dimensional levels`,
            duration: 3000,
          });
        }, 1000);
      }
      
      // Show timeline effect
      setTimeout(() => {
        toast({
          title: "Timeline Effect",
          description: result.timelineEffect,
          duration: 3000,
        });
      }, 2000);
      
      setIsPerforming(false);
    }, 2000);
  };

  return (
    <Card className="ritual-list bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-quantum-gold">Ritual Compendium</CardTitle>
          <Badge variant="outline" className="bg-quantum-gold/20 text-quantum-gold">
            {Object.values(ritualCategories).flat().length} Rituals
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="dimensional" value={activeCategory} onValueChange={setActiveCategory}>
          <div className="px-4 pt-2">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="dimensional">Dimensional</TabsTrigger>
              <TabsTrigger value="temporal">Temporal</TabsTrigger>
              <TabsTrigger value="symbolic">Symbolic</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-4">
            {Object.entries(ritualCategories).map(([category, rituals]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <ScrollArea className="h-40">
                  <div className="space-y-2">
                    {rituals.map(ritual => (
                      <div 
                        key={ritual.id}
                        className={`p-2 border rounded-md cursor-pointer transition-colors ${
                          selectedRitual?.id === ritual.id
                            ? 'bg-quantum-gold/20 border-quantum-gold'
                            : 'border-quantum-gold/30 hover:bg-quantum-gold/10'
                        }`}
                        onClick={() => handleSelectRitual(ritual)}
                      >
                        <div className="flex items-center">
                          <div className="text-2xl text-quantum-gold mr-3">{ritual.glyph}</div>
                          <div>
                            <h4 className="font-medium">{ritual.name}</h4>
                            <p className="text-xs text-muted-foreground">{ritual.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </div>
          
          {selectedRitual && (
            <div className="border-t border-quantum-gold/30 p-4">
              <h3 className="font-medium mb-2">Ritual Configuration</h3>
              
              <div className="mb-4">
                <label className="text-sm text-muted-foreground mb-1 block">
                  Ritual Intensity: {customIntensity}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={customIntensity}
                  onChange={(e) => setCustomIntensity(parseInt(e.target.value))}
                  className="w-full h-2 bg-quantum-gold/20 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              <Button
                onClick={handlePerformRitual}
                disabled={isPerforming}
                className="w-full bg-quantum-gold hover:bg-quantum-gold/80 text-black"
              >
                {isPerforming ? "Performing Ritual..." : `Perform ${selectedRitual.name}`}
              </Button>
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RitualList;
