import React, { useState, useEffect } from "react";
import VirtualCompass from "../components/VirtualCompass";
import DimensionalView from "../components/DimensionalView";
import QuantumInterface from "../components/QuantumInterface";
import SymbolSystem from "../components/SymbolSystem";
import QuantumStateCollapser from "../components/QuantumStateCollapser";
import ChatAI from "../components/ChatAI";
import SystemMonitor from "../components/SystemMonitor";
import RealityMonitor from "@/components/RealityMonitor";
import RealitySyncDashboard from "@/components/RealitySyncDashboard";
import UpdateNotification from "@/components/UpdateNotification";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateDimensionalEffect } from "../utils/quantum";
import { useToast } from "../hooks/use-toast";
import { initializePillowDreamworkGame } from "../lib/engine";
import ExportDocButton from "@/components/ExportDocButton";
import PortalEntry from "@/components/PortalEntry";
import RealityShiftingModes from "@/components/RealityShiftingModes";
import QuantumLog from "@/components/QuantumLog";
import SymbolDecoder from "@/components/SymbolDecoder";
import SupportiveAICompanion from "@/components/SupportiveAICompanion";
import PushNotificationService from "@/components/PushNotificationService";

const Index = () => {
  const { toast } = useToast();
  const [currentDimension, setCurrentDimension] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [dimensionalEffects, setDimensionalEffects] = useState<string[]>([]);
  const [superpositionValues, setSuperpositionValues] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("portal");
  const [activeMode, setActiveMode] = useState<string>("gentle");
  const [hasEnteredPortal, setHasEnteredPortal] = useState<boolean>(false);
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);
  
  // Initialize the game engine
  useEffect(() => {
    initializePillowDreamworkGame();
    
    // Check if user has visited before
    const hasVisited = localStorage.getItem("quantumJourney_hasVisited");
    if (hasVisited) {
      setIsFirstVisit(false);
    } else {
      localStorage.setItem("quantumJourney_hasVisited", "true");
    }
  }, []);
  
  // Handle portal entry
  const handleEnterPortal = () => {
    setHasEnteredPortal(true);
    setActiveTab("dimensional");
    
    toast({
      title: "Journey Begun",
      description: "Welcome to the Quantum Dimensional Explorer",
      duration: 3000,
    });
  };
  
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

  // Handle symbol connection from decoder
  const handleSymbolConnect = (pattern: string[], interpretation: string) => {
    const patternString = pattern.join('');
    handleSymbolActivate(patternString);
  };
  
  // Handle shifting mode selection
  const handleSelectMode = (mode: string) => {
    setActiveMode(mode);
    
    if (mode === "deep") {
      toast({
        title: "Deep Dive Mode",
        description: "Immerse yourself fully in the current dimension",
        duration: 3000,
      });
    } else if (mode === "dream") {
      toast({
        title: "Dream Weaver Mode",
        description: "Your symbols now have enhanced connection abilities",
        duration: 3000,
      });
    }
  };
  
  // If portal hasn't been entered, show portal entry screen
  if (!hasEnteredPortal) {
    return (
      <div className="min-h-screen bg-quantum-dark text-foreground p-4 md:p-6">
        <UpdateNotification />
        <PushNotificationService />
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1"></div>
            <div className="flex-2 text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-quantum-purple mb-2">
                Quantum Dimensional Explorer
              </h1>
              <p className="text-quantum-blue">
                Journey through multidimensional realities and inner space
              </p>
            </div>
            <div className="flex-1 flex justify-end">
              <ExportDocButton />
            </div>
          </div>
          
          <PortalEntry onEnterPortal={handleEnterPortal} isFirstVisit={isFirstVisit} />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-quantum-dark text-foreground p-4 md:p-6">
      <UpdateNotification />
      <PushNotificationService />
      
      <header className="mb-6 text-center">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex-1"></div>
          <div className="flex-2">
            <h1 className="text-3xl md:text-4xl font-bold text-quantum-purple mb-2">
              Quantum Dimensional Explorer
            </h1>
            <p className="text-quantum-blue max-w-xl mx-auto">
              Journey through multidimensional realities and inner space
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            <ExportDocButton />
          </div>
        </div>
      </header>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto mb-6">
        <TabsList className="grid grid-cols-5 mb-4 w-full max-w-lg mx-auto">
          <TabsTrigger value="dimensional">Explorer</TabsTrigger>
          <TabsTrigger value="reality-sync">Reality Sync</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="symbols">Symbols</TabsTrigger>
          <TabsTrigger value="guide">Guide</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dimensional">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left sidebar - Virtual Compass */}
            <div className="flex flex-col space-y-4">
              <div className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70 p-6 rounded-lg flex flex-col items-center">
                <VirtualCompass
                  currentDimension={currentDimension}
                  onDimensionChange={handleDimensionChange}
                  maxDimension={11}
                />
              </div>
              
              <RealityShiftingModes 
                onSelectMode={handleSelectMode}
                currentDimension={currentDimension}
              />
            </div>
            
            {/* Main content - Dimensional View */}
            <div className="md:col-span-2 flex flex-col space-y-4">
              <div className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70 p-6 rounded-lg h-80">
                <DimensionalView 
                  dimension={currentDimension}
                  isTransitioning={isTransitioning}
                />
              </div>
              
              <QuantumInterface
                currentDimension={currentDimension}
                onSuperposition={handleSuperposition}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reality-sync">
          <div className="max-w-6xl mx-auto">
            <RealitySyncDashboard currentDimension={currentDimension} />
          </div>
        </TabsContent>
        
        <TabsContent value="journal">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuantumLog 
              currentDimension={currentDimension}
              dimensionalEffects={dimensionalEffects}
            />
            
            <div className="space-y-6">
              <QuantumStateCollapser />
              
              {/* Reality log moved to inside journal tab */}
              <div className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <h3 className="text-sm font-medium text-quantum-gold">Reality Log</h3>
                </div>
                
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {dimensionalEffects.length > 0 ? (
                    dimensionalEffects.map((effect, index) => (
                      <div key={index} className="border-b border-muted/20 pb-2 mb-2 last:border-0">
                        <p className="text-sm text-muted-foreground">{effect}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-xs italic">No dimensional effects recorded yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="symbols">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <SymbolDecoder 
              currentDimension={currentDimension}
              onSymbolConnect={handleSymbolConnect}
            />
            <SymbolSystem 
              dimension={currentDimension}
              onSymbolActivate={handleSymbolActivate}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="guide">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[600px]">
              <SupportiveAICompanion 
                currentDimension={currentDimension}
                dimensionalEffects={dimensionalEffects}
              />
            </div>
            <div className="space-y-6">
              <RealityMonitor currentDimension={currentDimension} />
              <SystemMonitor />
              <ChatAI />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <footer className="mt-8 text-center text-xs text-muted-foreground">
        <p>Quantum Dimensional Explorer v1.0.0</p>
        <p className="mt-1">
          A sacred space for dimensional exploration and inner discovery
        </p>
      </footer>
    </div>
  );
}

export default Index;
