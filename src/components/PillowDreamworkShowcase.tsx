
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CompassIcon, WandSparklesIcon, StarIcon, InfinityIcon, LayersIcon } from "lucide-react";
import { SiderAI, MythicIntelligence, IURI, EchoSimulator } from '../lib/pillowdreamwork';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Improved Dream Compass component with interactive elements
export function DreamCompass() {
  const { toast } = useToast();
  const [activeDirection, setActiveDirection] = useState<string | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);

  const handleDirectionClick = (direction: string) => {
    setActiveDirection(direction);
    setIsCalibrating(true);
    
    setTimeout(() => {
      setIsCalibrating(false);
      toast({
        title: "Dream Navigation",
        description: `Navigated to ${direction} in the dream landscape`,
        duration: 3000,
      });
    }, 1500);
  };

  return (
    <Card className="dream-compass bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70 mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <CompassIcon className="mr-2 text-quantum-blue" size={20} />
            Dream Compass
          </CardTitle>
          <Badge variant="outline" className="bg-quantum-blue/20 text-quantum-blue">
            Navigation
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Navigate across dimensions using dreams, vectors, and intention signals.
        </p>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          {['North', 'East', 'South', 'West', 'Above', 'Below'].map((dir) => (
            <Button 
              key={dir}
              variant="outline" 
              className={`h-12 ${activeDirection === dir ? 'bg-quantum-blue/30 border-quantum-blue' : 'hover:bg-quantum-blue/10'}`}
              onClick={() => handleDirectionClick(dir)}
              disabled={isCalibrating}
            >
              {dir}
            </Button>
          ))}
        </div>
        
        {isCalibrating && (
          <div className="text-center text-sm text-quantum-blue animate-pulse mt-2">
            Calibrating dream coordinates...
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Enhanced Ritual Interface (IURI) with interactive elements
export function RitualInterface() {
  const { toast } = useToast();
  const [activeGlyph, setActiveGlyph] = useState<string | null>(null);
  const [ritualActive, setRitualActive] = useState(false);
  const [intensity, setIntensity] = useState(50);
  
  const iuri = new IURI();
  
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
      const result = iuri.invokeRitual({
        glyph: activeGlyph,
        intensity: intensity
      });
      
      setRitualActive(false);
      
      toast({
        title: "Ritual Invoked",
        description: `The ${activeGlyph} ritual has been activated with ${intensity}% intensity`,
        duration: 4000,
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
          className="w-full bg-quantum-gold hover:bg-quantum-gold/80 text-black"
        >
          {ritualActive ? "Invoking Ritual..." : "Invoke Ritual"}
        </Button>
      </CardContent>
    </Card>
  );
}

// Improved Mythic Intelligence component with archetypes
export function MythicAIShowcase() {
  const { toast } = useToast();
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
  const [interacting, setInteracting] = useState(false);
  
  const mythicAI = new MythicIntelligence();
  
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
      const result = mythicAI.interactWithArchetype(archetype);
      setInteracting(false);
      
      toast({
        title: `The ${archetype} Speaks`,
        description: result.response,
        duration: 4000,
      });
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
      </CardContent>
    </Card>
  );
}

// Enhanced Echo Simulator with timeline management
export function EchoSimulatorMode() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("ripples");
  const [isSimulating, setIsSimulating] = useState(false);
  
  const echoSimulator = new EchoSimulator();
  
  const handleCreateRipple = () => {
    setIsSimulating(true);
    
    setTimeout(() => {
      const result = echoSimulator.createRippleEffect({
        origin: "user decision",
        intensity: Math.random() * 10,
        timestamp: new Date().toISOString()
      });
      
      setIsSimulating(false);
      
      toast({
        title: "Reality Ripple Created",
        description: "Your decision has created ripples across multiple timelines",
        duration: 3000,
      });
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
            <Button
              onClick={handleCreateRipple}
              disabled={isSimulating}
              className="w-full bg-quantum-teal hover:bg-quantum-teal/80"
            >
              {isSimulating ? "Creating Ripple..." : "Create Reality Ripple"}
            </Button>
            
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-quantum-teal/30 rounded-md p-2">
                  <div className="w-full h-1 bg-quantum-teal/30 mb-2"></div>
                  <p className="text-xs text-muted-foreground">Timeline {i}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="timelines" className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              Timeline visualization coming soon
            </p>
          </TabsContent>
          
          <TabsContent value="karma" className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              Karma logs will appear here
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Enhanced SiderAI assistant with dimension-specific suggestions
export function SiderAIShowcase() {
  const [showMore, setShowMore] = useState(false);
  const { toast } = useToast();
  
  // Use SiderAI directly from the module with enhanced suggestions
  const siderAI = new SiderAI();
  const suggestions = [
    'Try exploring a new dimension for unique dream archetypes.',
    'Use the Vector Alchemy Engine to manipulate 5D fields.',
    'Invoke a ritual in IURI to unlock hidden pathways.',
    'Interact with the Mythic Intelligence to gain insights.',
    'Create a ripple effect to see multiverse branching.',
    'Try connecting symbols in different patterns for varied effects.',
  ];
  
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
              className="flex items-start"
              onClick={() => handleSuggestionClick(s)}
            >
              <div className="h-6 w-6 rounded-full bg-quantum-blue/20 text-quantum-blue flex items-center justify-center text-xs mr-2 mt-0.5">
                {i + 1}
              </div>
              <p className="text-sm cursor-pointer hover:text-quantum-blue transition-colors">{s}</p>
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
