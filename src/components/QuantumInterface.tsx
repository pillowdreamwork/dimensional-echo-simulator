
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { LayersIcon, CompassIcon, MoveIcon, Layers2Icon } from "lucide-react";
import { calculateUncertainty, calculateSuperposition, collapseQuantumState, QuantumState } from "@/utils/quantum";
import { useToast } from "@/components/ui/use-toast";

interface QuantumInterfaceProps {
  currentDimension: number;
  onSuperposition: (values: number[]) => void;
}

const QuantumInterface: React.FC<QuantumInterfaceProps> = ({
  currentDimension,
  onSuperposition,
}) => {
  const { toast } = useToast();
  const [precisionLevel, setPrecisionLevel] = useState<number>(50);
  const [observerInfluence, setObserverInfluence] = useState<number>(30);
  const [entanglementLevel, setEntanglementLevel] = useState<number>(20);
  const [uncertainty, setUncertainty] = useState<number>(0.5);
  const [activeTab, setActiveTab] = useState<string>("controls");
  
  // Generate possible quantum states based on current dimension
  const generateQuantumStates = (): QuantumState[] => {
    const baseStates: QuantumState[] = [
      { 
        id: "state1", 
        probability: 0.4, 
        description: "Stable Dimension", 
        effect: "Maintain current dimensional alignment" 
      },
      { 
        id: "state2", 
        probability: 0.3, 
        description: "Quantum Flux", 
        effect: "Dimensional boundaries become permeable" 
      },
      { 
        id: "state3", 
        probability: 0.2, 
        description: "Temporal Shift", 
        effect: "Time flows differently in this state" 
      },
      { 
        id: "state4", 
        probability: 0.1, 
        description: "Reality Fracture", 
        effect: "Glimpse parallel realities" 
      },
    ];
    
    // Adjust probabilities based on dimension
    return baseStates.map(state => ({
      ...state,
      probability: state.probability * (1 + (Math.sin(currentDimension) * 0.2))
    }));
  };
  
  // Handle quantum collapse
  const handleQuantumCollapse = () => {
    const states = generateQuantumStates();
    const observerStrength = observerInfluence / 100;
    const result = collapseQuantumState(states, observerStrength);
    
    toast({
      title: result.description,
      description: result.effect,
      duration: 3000,
    });
    
    // Calculate new uncertainty after collapse
    const newUncertainty = calculateUncertainty(
      precisionLevel / 100,
      observerInfluence / 100
    );
    setUncertainty(newUncertainty);
  };
  
  // Handle superposition calculation
  const handleSuperposition = () => {
    const dimensions = Array(11).fill(0).map((_, i) => 
      i + 1 === currentDimension ? 1 : 0.1
    );
    
    const result = calculateSuperposition(
      dimensions,
      entanglementLevel / 100
    );
    
    onSuperposition(result);
    
    toast({
      title: "Superposition Calculated",
      description: `Entanglement factor: ${entanglementLevel}%`,
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
          <Badge variant="outline" className="bg-quantum-purple/20 text-quantum-purple">
            {currentDimension}D
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4 bg-muted/30">
            <TabsTrigger value="controls" className="data-[state=active]:bg-quantum-purple/20">
              Controls
            </TabsTrigger>
            <TabsTrigger value="states" className="data-[state=active]:bg-quantum-purple/20">
              States
            </TabsTrigger>
            <TabsTrigger value="vectors" className="data-[state=active]:bg-quantum-purple/20">
              Vectors
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="controls">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-muted-foreground">Precision Level</label>
                  <span className="text-xs">{precisionLevel}%</span>
                </div>
                <Slider
                  value={[precisionLevel]}
                  onValueChange={(values) => setPrecisionLevel(values[0])}
                  min={1}
                  max={100}
                  step={1}
                  className="z-0"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-muted-foreground">Observer Influence</label>
                  <span className="text-xs">{observerInfluence}%</span>
                </div>
                <Slider 
                  value={[observerInfluence]}
                  onValueChange={(values) => setObserverInfluence(values[0])}
                  min={1}
                  max={100}
                  step={1}
                  className="z-0"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-muted-foreground">Entanglement Level</label>
                  <span className="text-xs">{entanglementLevel}%</span>
                </div>
                <Slider 
                  value={[entanglementLevel]}
                  onValueChange={(values) => setEntanglementLevel(values[0])}
                  min={1}
                  max={100}
                  step={1}
                  className="z-0"
                />
              </div>
              
              <div className="flex justify-between gap-2">
                <Button 
                  onClick={handleQuantumCollapse}
                  className="flex-1 bg-quantum-blue hover:bg-quantum-blue/80"
                >
                  <CompassIcon className="mr-2 h-4 w-4" />
                  Collapse Quantum State
                </Button>
                
                <Button 
                  onClick={handleSuperposition}
                  className="flex-1 bg-quantum-purple hover:bg-quantum-purple/80"
                >
                  <Layers2Icon className="mr-2 h-4 w-4" />
                  Calculate Superposition
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="states">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Uncertainty Level</span>
                <span className="text-xs">{Math.round(uncertainty * 100)}%</span>
              </div>
              
              <Progress value={uncertainty * 100} className="h-2" />
              
              <Separator className="my-2" />
              
              <div className="space-y-3">
                {generateQuantumStates().map((state) => (
                  <div key={state.id} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{state.description}</p>
                      <p className="text-xs text-muted-foreground">{state.effect}</p>
                    </div>
                    <Progress 
                      value={state.probability * 100} 
                      className="h-1 w-24" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="vectors">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-2">
                Dimensional Vector Values
              </p>
              
              <div className="grid grid-cols-11 gap-1">
                {Array.from({ length: 11 }).map((_, i) => {
                  const dimension = i + 1;
                  const isCurrent = dimension === currentDimension;
                  
                  return (
                    <div 
                      key={dimension}
                      className={`flex flex-col items-center ${
                        isCurrent ? "text-quantum-gold" : "text-muted-foreground"
                      }`}
                    >
                      <div 
                        className={`w-4 h-${Math.max(2, isCurrent ? 12 : 2 + Math.floor(Math.random() * 5))} 
                          ${isCurrent ? "bg-quantum-gold" : "bg-quantum-purple/30"}`}
                      ></div>
                      <span className="text-[10px] mt-1">{dimension}D</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div 
                    key={i}
                    className="text-xs py-1 px-2 rounded-md bg-muted/30 flex items-center"
                  >
                    <span className="mr-1">V{i+1}</span>
                    <span className="text-quantum-teal">
                      {(Math.random() * 2 - 1).toFixed(3)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QuantumInterface;
