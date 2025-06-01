
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { WavesIcon, EyeIcon, ZapIcon } from "lucide-react";

interface RealityShiftingModesProps {
  onSelectMode: (mode: string) => void;
  currentDimension: number;
}

interface ShiftingMode {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  requirements: {
    minDimension: number;
    maxDimension: number;
  };
}

const RealityShiftingModes: React.FC<RealityShiftingModesProps> = ({ 
  onSelectMode, 
  currentDimension 
}) => {
  const [selectedMode, setSelectedMode] = useState<string>("");

  const modes: ShiftingMode[] = [
    {
      id: "gentle",
      name: "Gentle Drift",
      description: "Soft transitions between dimensional states",
      icon: WavesIcon,
      color: "quantum-blue",
      requirements: { minDimension: 1, maxDimension: 11 }
    },
    {
      id: "deep",
      name: "Deep Dive",
      description: "Immersive exploration of current dimension",
      icon: EyeIcon,
      color: "quantum-purple",
      requirements: { minDimension: 2, maxDimension: 11 }
    },
    {
      id: "quantum",
      name: "Quantum Leap",
      description: "Rapid dimensional transitions",
      icon: ZapIcon,
      color: "quantum-gold",
      requirements: { minDimension: 3, maxDimension: 11 }
    }
  ];

  const handleSelectMode = (mode: ShiftingMode) => {
    if (currentDimension >= mode.requirements.minDimension && 
        currentDimension <= mode.requirements.maxDimension) {
      setSelectedMode(mode.id);
      onSelectMode(mode.id);
    }
  };

  const isAvailable = (mode: ShiftingMode): boolean => {
    return currentDimension >= mode.requirements.minDimension && 
           currentDimension <= mode.requirements.maxDimension;
  };

  return (
    <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-quantum-gold">Reality Shifting Modes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {modes.map((mode) => {
          const IconComponent = mode.icon;
          const available = isAvailable(mode);
          
          return (
            <div key={mode.id} className="space-y-2">
              <Button
                variant={selectedMode === mode.id ? "default" : "outline"}
                className={`w-full justify-start h-auto p-3 ${
                  !available ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => handleSelectMode(mode)}
                disabled={!available}
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className={`h-4 w-4 text-${mode.color}`} />
                  <div className="text-left">
                    <div className="font-medium text-sm">{mode.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {mode.description}
                    </div>
                  </div>
                </div>
              </Button>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">
                  Req: {mode.requirements.minDimension}D - {mode.requirements.maxDimension}D
                </span>
                {available ? (
                  <Badge variant="outline" className="bg-green-500/20 text-green-400">
                    Available
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-500/20 text-red-400">
                    Locked
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RealityShiftingModes;
