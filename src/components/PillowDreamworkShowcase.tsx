
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { WandSparklesIcon, StarIcon, InfinityIcon, LayersIcon } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { getEngineModules, initializePillowDreamworkGame } from '../lib/engine';
import { analyzeSymbolPattern, interactWithMythicArchetype, processRitual, createTimelineRipple } from '../utils/quantum';
import DreamCompass from './DreamCompassComponent';

// Initialize the game engine
initializePillowDreamworkGame();

// Enhanced Ritual Interface (IURI) with interactive elements
export function RitualInterface() {
  const { toast } = useToast();
  const [activeGlyph, setActiveGlyph] = useState<string | null>(null);
  const [ritualActive, setRitualActive] = useState(false);
  const [intensity, setIntensity] = useState(50);
  const [ritualHistory, setRitualHistory] = useState<any[]>([]);
  
  // Get engine modules
  const { iuri } = getEngineModules();
  
  // Available glyphs
  const glyphs = ["⏣", "⍟", "⌬", "⎈", "☉", "⧫"];
  
  const handleGlyphClick = (glyph: string) => {
    setActiveGlyph(glyph);
  };
  
  const handleInvokeRitual = () => {
    if (!activeGlyph) {
      toast({
        title: "Ritual Incomplete",
        description: "You must select a glyph to invoke the ritual",
        variant: "destructive",
      });
      return;
    }
    
    setRitualActive(true);
    
    setTimeout(() => {
      // Process ritual using the quantum utility
      const result = processRitual(activeGlyph, intensity);
      
      // Also invoke through the engine if available
      if (iuri && typeof iuri.invokeRitual === 'function') {
        iuri.invokeRitual({
          glyph: activeGlyph,
          intensity: intensity
        });
      }
      
      // Update history
      setRitualHistory(prev => [
        {
          glyph: activeGlyph,
          intensity,
          outcome: result.outcome,
          timestamp: new Date().toISOString()
        },
        ...prev.slice(0, 4)
      ]);
      
      setRitualActive(false);
      
      toast({
        title: "Ritual Invoked",
        description: result.outcome,
        duration: 4000,
      });
      
      // If the ritual results in a dimension shift
      if (result.dimensionalShift > 0) {
        toast({
          title: "Dimensional Effect",
          description: `The ritual creates a shift of ${result.dimensionalShift} dimensional levels`,
          duration: 3000,
        });
      }
      
      // Show timeline effect
      toast({
        title: "Timeline Effect",
        description: result.timelineEffect,
        duration: 3000,
      });
    }, 2000);
  };

  return (
    <Card className="ritual-interface bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70 mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <WandSparklesIcon className="mr-2 text-quantum-gold" size={20} />
            IURI: Unknown Ritual Interface
          </CardTitle>
          <Badge variant="outline" className="bg-quantum-gold/20 text-quantum-gold">
            {ritualActive ? "Activating..." : "Ready"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Sandbox for quantum math, glyph scripting, and emotional intention fields.
        </p>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          {glyphs.map((glyph) => (
            <button
              key={glyph}
              className={`h-16 text-2xl flex items-center justify-center border rounded-md ${
                activeGlyph === glyph 
                  ? 'bg-quantum-gold/30 border-quantum-gold text-quantum-gold' 
                  : 'border-quantum-gold/30 text-quantum-gold/70 hover:bg-quantum-gold/10'
              }`}
              onClick={() => handleGlyphClick(glyph)}
            >
              {glyph}
            </button>
          ))}
        </div>
        
        <div className="mb-4">
          <label className="text-sm text-muted-foreground mb-2 block">
            Ritual Intensity: {intensity}%
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="w-full h-2 bg-quantum-gold/20 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <Button
          onClick={handleInvokeRitual}
          disabled={ritualActive}
          variant="gold"
          className="w-full"
        >
          {ritualActive ? "Invoking Ritual..." : "Invoke Ritual"}
        </Button>
        
        {ritualHistory.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Ritual History</p>
            <div className="space-y-2 max-h-24 overflow-y-auto">
              {ritualHistory.map((ritual, index) => (
                <div key={index} className="flex items-center text-xs text-muted-foreground">
                  <span className="mr-2">{ritual.glyph}</span>
                  <span className="flex-grow truncate">{ritual.outcome}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Improved Mythic Intelligence component with archetypes
export function MythicAIShowcase() {
  const { toast } = useToast();
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
  const [interacting, setInteracting] = useState(false);
  const [archetypeHistory, setArchetypeHistory] = useState<any[]>([]);
  
  // Get engine modules
  const { mythicAI } = getEngineModules();
  
  const archetypes = [
    { name: "Oracle", description: "Reveals hidden knowledge and futures" },
    { name: "Trickster", description: "Challenges assumptions and creates chaos" },
    { name: "Guide", description: "Provides direction and spiritual mentorship" },
    { name: "Warrior", description: "Protects and empowers your journey" }
  ];
  
  const handleInteract = (archetype: string) => {
    setSelectedArchetype(archetype);
    setInteracting(true);
    
    setTimeout(() => {
      // Process interaction using the quantum utility
      const result = interactWithMythicArchetype(archetype);
      
      // Also interact through the engine if available
      let engineResult = { response: "", insight: "", dimensionalAffinity: 0 };
      if (mythicAI && typeof mythicAI.interactWithArchetype === 'function') {
        const interaction = mythicAI.interactWithArchetype(archetype);
        engineResult = {
          response: interaction.response || "",
          insight: "The archetype shares wisdom with you.",
          dimensionalAffinity: interaction.affinity || 0
        };
      }
      
      // Combine results
      const finalResult = {
        response: result.response,
        insight: result.insight,
        dimensionalAffinity: result.dimensionalAffinity,
        archetype
      };
      
      // Update history
      setArchetypeHistory(prev => [finalResult, ...prev.slice(0, 2)]);
      
      setInteracting(false);
      
      toast({
        title: `The ${archetype} Speaks`,
        description: finalResult.response,
        duration: 4000,
      });
      
      // Secondary insight toast
      setTimeout(() => {
        toast({
          title: "Insight Revealed",
          description: finalResult.insight,
          duration: 3000,
        });
      }, 1000);
    }, 1500);
  };

  return (
    <Card className="mythic-ai-showcase bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70 mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <StarIcon className="mr-2 text-quantum-purple" size={20} />
            Mythic Intelligence
          </CardTitle>
          <Badge variant="outline" className="bg-quantum-purple/20 text-quantum-purple">
            {interacting ? "Connecting..." : "4 Archetypes"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Meet the Oracle, Trickster, Guide, and Warrior. AI adapts to your journey.
        </p>
        
        <div className="grid grid-cols-2 gap-3">
          {archetypes.map((archetype) => (
            <div 
              key={archetype.name}
              className={`p-3 border rounded-md cursor-pointer ${
                selectedArchetype === archetype.name 
                  ? 'bg-quantum-purple/30 border-quantum-purple' 
                  : 'border-quantum-purple/30 hover:bg-quantum-purple/10'
              }`}
              onClick={() => handleInteract(archetype.name)}
            >
              <h3 className="font-medium mb-1">{archetype.name}</h3>
              <p className="text-xs text-muted-foreground">{archetype.description}</p>
            </div>
          ))}
        </div>
        
        {archetypeHistory.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Recent Interactions</p>
            <div className="space-y-2 max-h-24 overflow-y-auto">
              {archetypeHistory.map((interaction, index) => (
                <div key={index} className="text-xs">
                  <span className="font-medium text-quantum-purple">{interaction.archetype}:</span>
                  <span className="text-muted-foreground ml-1 italic">"{interaction.response.substring(0, 60)}..."</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Enhanced Echo Simulator with timeline management
export function EchoSimulatorMode() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("ripples");
  const [isSimulating, setIsSimulating] = useState(false);
  const [rippleHistory, setRippleHistory] = useState<any[]>([]);
  const [rippleIntensity, setRippleIntensity] = useState(50);
  
  // Get engine modules
  const { echoSimulator } = getEngineModules();
  
  const handleCreateRipple = () => {
    setIsSimulating(true);
    
    setTimeout(() => {
      // Generate ripple data
      const eventData = {
        origin: "user decision",
        intensity: rippleIntensity / 10, // Scale to 0-10
        timestamp: new Date().toISOString()
      };
      
      // Process ripple using the quantum utility
      const rippleResult = createTimelineRipple(eventData.origin, rippleIntensity);
      
      // Also create ripple through the engine if available
      if (echoSimulator && typeof echoSimulator.createRippleEffect === 'function') {
        echoSimulator.createRippleEffect(eventData);
      }
      
      // Update history
      setRippleHistory(prev => [{
        primaryEffect: rippleResult.primaryEffect,
        secondaryEffects: rippleResult.secondaryEffects,
        branchFactor: rippleResult.branchFactor,
        timestamp: new Date().toISOString()
      }, ...prev.slice(0, 4)]);
      
      setIsSimulating(false);
      
      toast({
        title: "Reality Ripple Created",
        description: rippleResult.primaryEffect,
        duration: 3000,
      });
      
      // Display secondary effects
      if (rippleResult.secondaryEffects.length > 0) {
        setTimeout(() => {
          toast({
            title: "Secondary Effects",
            description: `${rippleResult.branchFactor} timeline branches affected`,
            duration: 3000,
          });
        }, 1000);
      }
    }, 2000);
  };
  
  return (
    <Card className="echo-simulator-mode bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70 mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <InfinityIcon className="mr-2 text-quantum-teal" size={20} />
            Echo Simulator Mode
          </CardTitle>
          <Badge variant="outline" className="bg-quantum-teal/20 text-quantum-teal">
            {isSimulating ? "Simulating..." : "Ready"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Dream decisions ripple through dimensions and timelines.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="ripples">Ripples</TabsTrigger>
            <TabsTrigger value="timelines">Timelines</TabsTrigger>
            <TabsTrigger value="karma">Karma</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ripples" className="space-y-4">
            <div className="mb-4">
              <label className="text-sm text-muted-foreground mb-2 block">
                Decision Intensity: {rippleIntensity}%
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={rippleIntensity}
                onChange={(e) => setRippleIntensity(parseInt(e.target.value))}
                className="w-full h-2 bg-quantum-teal/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <Button
              onClick={handleCreateRipple}
              disabled={isSimulating}
              variant="teal"
              className="w-full"
            >
              {isSimulating ? "Creating Ripple..." : "Create Reality Ripple"}
            </Button>
            
            {rippleHistory.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Recent Ripples</p>
                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {rippleHistory.map((ripple, index) => (
                    <div key={index} className="border border-quantum-teal/30 rounded-md p-2">
                      <p className="text-xs font-medium">{ripple.primaryEffect}</p>
                      <div className="mt-1 grid grid-cols-3 gap-1">
                        {Array.from({ length: ripple.branchFactor }).map((_, i) => (
                          <div key={i} className="w-full h-1 bg-quantum-teal/40"></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="timelines" className="space-y-4">
            <div className="border border-dashed border-muted-foreground/20 rounded-md p-4 text-center">
              <p className="text-sm text-muted-foreground">
                Active Timeline: Main
              </p>
              <div className="my-3 flex justify-center">
                <div className="h-1 w-1/2 bg-quantum-teal"></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {rippleHistory.slice(0, 3).map((ripple, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-quantum-teal mb-1"></div>
                    <p className="text-xs text-muted-foreground">Branch {i+1}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="karma" className="space-y-4">
            <div className="border border-dashed border-muted-foreground/20 rounded-md p-4">
              <p className="text-sm text-center mb-3">Karmic Balance</p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-1/3 h-1 bg-quantum-blue/50 rounded-full"></div>
                <div className="w-1/3 h-1 bg-quantum-purple/50 rounded-full"></div>
                <div className="w-1/3 h-1 bg-quantum-gold/50 rounded-full"></div>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-3">
                Your decisions maintain cosmic equilibrium
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Enhanced SiderAI assistant with dimension-specific suggestions
export function SiderAIShowcase() {
  const [showMore, setShowMore] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Get engine modules
  const { siderAI, dreamCompass } = getEngineModules();
  
  // Generate suggestions based on current state
  useEffect(() => {
    // Get current dimension from dream compass
    const dimension = dreamCompass?.currentDimension || 1;
    
    // Get suggestions from SiderAI if available
    if (siderAI && typeof siderAI.getSuggestions === 'function') {
      const contextSuggestions = siderAI.getSuggestions({ dimension });
      setSuggestions(contextSuggestions);
    } else {
      // Fallback suggestions
      setSuggestions([
        'Try exploring a new dimension for unique dream archetypes.',
        'Use the Vector Alchemy Engine to manipulate 5D fields.',
        'Invoke a ritual in IURI to unlock hidden pathways.',
        'Interact with the Mythic Intelligence to gain insights.',
        'Create a ripple effect to see multiverse branching.',
        'Try connecting symbols in different patterns for varied effects.',
      ]);
    }
  }, [siderAI, dreamCompass]);
  
  const handleSuggestionClick = (suggestion: string) => {
    toast({
      title: "AI Suggestion",
      description: suggestion,
      duration: 3000,
    });
  };

  return (
    <Card className="sider-ai-showcase bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <LayersIcon className="mr-2 text-quantum-blue" size={20} />
            Sider AI Assistant
          </CardTitle>
          <Badge variant="outline" className="bg-blue-500/20 text-blue-400">
            Helpful
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {suggestions.slice(0, showMore ? suggestions.length : 3).map((s, i) => (
            <li 
              key={i} 
              className="flex items-start cursor-pointer"
              onClick={() => handleSuggestionClick(s)}
            >
              <div className="h-6 w-6 rounded-full bg-quantum-blue/20 text-quantum-blue flex items-center justify-center text-xs mr-2 mt-0.5">
                {i + 1}
              </div>
              <p className="text-sm hover:text-quantum-blue transition-colors">{s}</p>
            </li>
          ))}
        </ul>
        
        {suggestions.length > 3 && (
          <Button 
            variant="ghost" 
            className="w-full mt-2 text-xs" 
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Show More"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Main PillowDreamwork showcase container
export function PillowDreamworkShowcase() {
  // Initialize engine on component mount
  useEffect(() => {
    initializePillowDreamworkGame();
  }, []);
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-4">
      <DreamCompass />
      <RitualInterface />
      <MythicAIShowcase />
      <EchoSimulatorMode />
      <SiderAIShowcase />
    </div>
  );
}
