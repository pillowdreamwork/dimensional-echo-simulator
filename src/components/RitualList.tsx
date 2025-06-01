import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { processRitual } from '../utils/quantum';
import { getEngineModules } from '../lib/engine';
import { askGPT } from '../lib/ai/gptService';
import { 
  BookMarkedIcon, 
  CircleIcon, 
  Loader2Icon, 
  AlertTriangleIcon,
  LayersIcon,
  ClockIcon,
  SparklesIcon
} from "lucide-react";

// Ritual categories with predefined rituals
const ritualCategories = {
  dimensional: [
    { id: 'dim1', name: 'Gateway Opening', glyph: '⊛', description: 'Opens pathways between adjacent dimensions', intensity: 65, stabilityReq: 0.7 },
    { id: 'dim2', name: 'Boundary Dissolution', glyph: '⊙', description: 'Temporarily weakens dimensional boundaries', intensity: 70, stabilityReq: 0.8 },
    { id: 'dim3', name: 'Quantum Anchoring', glyph: '⊕', description: 'Creates stable reference points across dimensions', intensity: 55, stabilityReq: 0.6 }
  ],
  temporal: [
    { id: 'temp1', name: 'Timeline Echo', glyph: '⍟', description: 'Reveals past/future decision branches', intensity: 60, stabilityReq: 0.65 },
    { id: 'temp2', name: 'Temporal Fold', glyph: '⌬', description: 'Brings distant timeline points into proximity', intensity: 75, stabilityReq: 0.85 },
    { id: 'temp3', name: 'Causality Loop', glyph: '⊚', description: 'Creates a stable timelike closed curve', intensity: 80, stabilityReq: 0.9 }
  ],
  symbolic: [
    { id: 'sym1', name: 'Glyph Activation', glyph: '✸', description: 'Energizes dormant symbols in the dreamfield', intensity: 50, stabilityReq: 0.5 },
    { id: 'sym2', name: 'Pattern Recognition', glyph: '⊗', description: 'Enhances perception of hidden symbolic structures', intensity: 45, stabilityReq: 0.4 },
    { id: 'sym3', name: 'Symbolic Binding', glyph: '⊝', description: 'Creates connections between disparate symbols', intensity: 55, stabilityReq: 0.6 }
  ]
};

interface RitualEffect {
  id: string;
  type: 'dimensional' | 'temporal' | 'symbolic';
  strength: number;
  duration: number;
  description: string;
}

interface Ritual {
  id: string;
  name: string;
  glyph: string;
  description: string;
  intensity: number;
  stabilityReq: number;
  effects?: RitualEffect[];
}

export const RitualList = () => {
  const [activeCategory, setActiveCategory] = useState<string>('dimensional');
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null);
  const [customIntensity, setCustomIntensity] = useState<number>(50);
  const [isPerforming, setIsPerforming] = useState<boolean>(false);
  const [activeEffects, setActiveEffects] = useState<RitualEffect[]>([]);
  const [systemStability, setSystemStability] = useState<number>(1.0);
  const [ritualProgress, setRitualProgress] = useState<number>(0);
  const [aiResponse, setAIResponse] = useState<string>('');
  
  const { iuri, dreamCompass } = getEngineModules();

  // Monitor system stability
  useEffect(() => {
    if (!iuri) return;

    const stabilityCheck = setInterval(() => {
      const currentStability = iuri.checkSystemStability();
      setSystemStability(currentStability);

      // Remove expired effects
      setActiveEffects(prev => 
        prev.filter(effect => effect.duration > Date.now())
      );
    }, 1000);

    return () => clearInterval(stabilityCheck);
  }, [iuri]);

  const handleSelectRitual = (ritual: Ritual) => {
    setSelectedRitual(ritual);
    setCustomIntensity(ritual.intensity);
  };

  const performRitual = async (ritual: Ritual) => {
    if (!iuri || !dreamCompass) return;

    // Check stability requirements
    if (systemStability < ritual.stabilityReq) {
      toast({
        title: "Insufficient Stability",
        description: `System stability (${(systemStability * 100).toFixed(1)}%) is below required threshold (${(ritual.stabilityReq * 100).toFixed(1)}%)`,
        variant: "destructive"
      });
      return;
    }

    setIsPerforming(true);
    setRitualProgress(0);

    try {
      // Generate ritual effects
      const effects: RitualEffect[] = [];
      const baseEffect: RitualEffect = {
        id: Math.random().toString(36).substr(2, 9),
        type: activeCategory as 'dimensional' | 'temporal' | 'symbolic',
        strength: customIntensity / 100,
        duration: Date.now() + 60000, // 1 minute duration
        description: ritual.description
      };
      effects.push(baseEffect);

      // Process ritual in steps
      for (let i = 0; i <= 100; i += 5) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setRitualProgress(i);
        
        // Random chance for additional effects
        if (Math.random() < 0.1) {
          const additionalEffect: RitualEffect = {
            id: Math.random().toString(36).substr(2, 9),
            type: activeCategory as 'dimensional' | 'temporal' | 'symbolic',
            strength: Math.random() * 0.5,
            duration: Date.now() + 30000, // 30 seconds duration
            description: "Secondary resonance effect"
          };
          effects.push(additionalEffect);
        }
      }

      // Apply ritual effects
      const success = await iuri.performRitual(ritual.id, customIntensity);
      if (success) {
        setActiveEffects(prev => [...prev, ...effects]);
        toast({
          title: "Ritual Complete",
          description: `${ritual.name} was successfully performed`,
        });
      } else {
        throw new Error("Ritual failed to complete");
      }
    } catch (error) {
      toast({
        title: "Ritual Failed",
        description: "Failed to complete the ritual",
        variant: "destructive"
      });
    } finally {
      setIsPerforming(false);
      setRitualProgress(0);
    }
  };

  const handleGenerateRitual = async () => {
    setAIResponse('Generating ritual...');
    const prompt = `Generate a new advanced quantum ritual for the Dimensional Echo Simulator. Include a glyph, name, description, and intensity.`;
    const result = await askGPT(prompt);
    setAIResponse(result);
  };

  const handleExplainRitual = async () => {
    if (!selectedRitual) return;
    setAIResponse('Explaining ritual...');
    const prompt = `Explain the ritual '${selectedRitual.name}' (glyph: ${selectedRitual.glyph}) in the context of quantum dimensional simulation. Include its effects and best use cases.`;
    const result = await askGPT(prompt);
    setAIResponse(result);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'dimensional':
        return <LayersIcon className="h-4 w-4" />;
      case 'temporal':
        return <ClockIcon className="h-4 w-4" />;
      case 'symbolic':
        return <SparklesIcon className="h-4 w-4" />;
      default:
        return <CircleIcon className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Ritual List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-2">
          <Button onClick={handleGenerateRitual}>Generate Ritual (AI)</Button>
          <Button onClick={handleExplainRitual} disabled={!selectedRitual}>Explain Ritual (AI)</Button>
        </div>
        {aiResponse && <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm mb-2">{aiResponse}</div>}

        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-3">
            {Object.keys(ritualCategories).map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="flex items-center gap-2"
              >
                {getCategoryIcon(category)}
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(ritualCategories).map(([category, rituals]) => (
            <TabsContent key={category} value={category}>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-4">
                  {rituals.map((ritual: Ritual) => (
                    <div
                      key={ritual.id}
                      className={`p-4 rounded-lg border transition-colors
                        ${selectedRitual?.id === ritual.id ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : ''}
                        ${systemStability < ritual.stabilityReq ? 'opacity-50' : ''}
                      `}
                      onClick={() => handleSelectRitual(ritual)}
                    >
                      {/* Ritual header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{ritual.glyph}</span>
                            <h3 className="font-medium">{ritual.name}</h3>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {ritual.description}
                          </p>
                        </div>
                        <Badge variant={systemStability >= ritual.stabilityReq ? "outline" : "destructive"}>
                          {ritual.intensity}% Intensity
                        </Badge>
                      </div>

                      {/* Ritual controls when selected */}
                      {selectedRitual?.id === ritual.id && (
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Ritual Intensity</span>
                              <span className="text-sm text-gray-500">
                                {customIntensity}%
                              </span>
                            </div>
                            <Slider
                              value={[customIntensity]}
                              onValueChange={([value]) => setCustomIntensity(value)}
                              max={100}
                              step={1}
                            />
                          </div>

                          <Button
                            onClick={() => performRitual(ritual)}
                            disabled={isPerforming || systemStability < ritual.stabilityReq}
                            className="w-full relative overflow-hidden"
                          >
                            {isPerforming ? (
                              <>
                                <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />
                                <span>Performing... {ritualProgress}%</span>
                                <div 
                                  className="absolute bottom-0 left-0 h-1 bg-blue-500"
                                  style={{ width: `${ritualProgress}%` }}
                                />
                              </>
                            ) : (
                              <>
                                {systemStability < ritual.stabilityReq ? (
                                  <>
                                    <AlertTriangleIcon className="h-4 w-4 mr-2" />
                                    <span>Insufficient Stability</span>
                                  </>
                                ) : (
                                  <>
                                    <SparklesIcon className="h-4 w-4 mr-2" />
                                    <span>Perform Ritual</span>
                                  </>
                                )}
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Active Effects Panel */}
              {activeEffects.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Active Effects</h3>
                  <div className="space-y-2">
                    {activeEffects
                      .filter(effect => effect.type === category)
                      .map(effect => (
                        <div
                          key={effect.id}
                          className="flex items-center justify-between p-2 rounded-md bg-gray-50 dark:bg-gray-900"
                        >
                          <span className="text-sm">{effect.description}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {Math.ceil((effect.duration - Date.now()) / 1000)}s
                            </Badge>
                            <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500"
                                style={{ width: `${effect.strength * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
