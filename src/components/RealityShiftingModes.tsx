
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Circle, Star, WandSparklesIcon, LayersIcon } from "lucide-react";
import { useToast } from "../hooks/use-toast";

interface ModeProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  onSelect: () => void;
}

const ShiftingMode: React.FC<ModeProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color,
  onSelect 
}) => {
  return (
    <Card 
      className="cursor-pointer hover:bg-muted/30 transition-colors"
      onClick={onSelect}
    >
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`rounded-full p-2 ${color} flex items-center justify-center`}>
          <Icon size={20} />
        </div>
        <div>
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface RealityShiftingModesProps {
  onSelectMode: (mode: string) => void;
  currentDimension: number;
}

const RealityShiftingModes: React.FC<RealityShiftingModesProps> = ({
  onSelectMode,
  currentDimension
}) => {
  const { toast } = useToast();
  
  const handleSelectMode = (mode: string) => {
    toast({
      title: `${mode} Mode Selected`,
      description: `You'll now experience reality in ${mode} mode`,
      duration: 3000,
    });
    onSelectMode(mode);
  };
  
  // Define mode categories
  const exploreModes = [
    {
      title: "Gentle Flow",
      description: "Smooth transitions between dimensional layers",
      icon: Circle,
      color: "bg-quantum-blue/20 text-quantum-blue",
      key: "gentle"
    },
    {
      title: "Deep Dive",
      description: "Intense immersion into single dimensions",
      icon: Star,
      color: "bg-quantum-purple/20 text-quantum-purple",
      key: "deep"
    }
  ];
  
  const creativeModes = [
    {
      title: "Dream Weaver",
      description: "Create and connect symbols across realities",
      icon: WandSparklesIcon,
      color: "bg-quantum-gold/20 text-quantum-gold",
      key: "dream"
    },
    {
      title: "Pattern Seeker",
      description: "Detect and decode dimensional patterns",
      icon: LayersIcon, 
      color: "bg-quantum-teal/20 text-quantum-teal",
      key: "pattern"
    }
  ];
  
  return (
    <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-lg">
            <WandSparklesIcon className="mr-2 text-quantum-gold" size={18} />
            Reality Shifting Modes
          </CardTitle>
          <Badge variant="outline" className="bg-quantum-gold/20 text-quantum-gold">
            {currentDimension}D Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Choose how you'd like to experience and interact with dimensional realities
        </p>
        
        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore" className="space-y-3">
            {exploreModes.map((mode) => (
              <ShiftingMode
                key={mode.key}
                title={mode.title}
                description={mode.description}
                icon={mode.icon}
                color={mode.color}
                onSelect={() => handleSelectMode(mode.key)}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="create" className="space-y-3">
            {creativeModes.map((mode) => (
              <ShiftingMode
                key={mode.key}
                title={mode.title}
                description={mode.description}
                icon={mode.icon}
                color={mode.color}
                onSelect={() => handleSelectMode(mode.key)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RealityShiftingModes;
