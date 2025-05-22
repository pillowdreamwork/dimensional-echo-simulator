
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { CompassIcon } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { getEngineModules } from '../lib/engine';

// Improved Dream Compass component with interactive elements
export function DreamCompass() {
  const { toast } = useToast();
  const [activeDirection, setActiveDirection] = useState<string | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [compassState, setCompassState] = useState({
    currentDimension: 1,
    accessibleDimensions: [1, 2, 3]
  });

  // Get engine modules
  const { dreamCompass } = getEngineModules();
  
  // Initialize compass state
  useEffect(() => {
    if (dreamCompass) {
      setCompassState({
        currentDimension: dreamCompass.currentDimension || 1,
        accessibleDimensions: typeof dreamCompass.getAccessibleDimensions === 'function' ? 
          dreamCompass.getAccessibleDimensions() : [1, 2, 3]
      });
    }
  }, []);

  const handleDirectionClick = (direction: string) => {
    setActiveDirection(direction);
    setIsCalibrating(true);
    
    setTimeout(() => {
      // Map direction to dimensional effect
      let dimensionChange = 0;
      
      switch(direction) {
        case "North":
          dimensionChange = 1;
          break;
        case "South":
          dimensionChange = -1;
          break;
        case "East":
        case "West":
          // Lateral movement - same dimension but different perspective
          break;  
        case "Above":
          dimensionChange = 2;
          break;
        case "Below":
          dimensionChange = -2;
          break;
      }
      
      // Calculate target dimension
      const targetDimension = Math.max(1, Math.min(11, compassState.currentDimension + dimensionChange));
      
      // Check if dimension is accessible
      if (compassState.accessibleDimensions.includes(targetDimension)) {
        // Update compass
        if (dreamCompass && typeof dreamCompass.navigateToDimension === 'function') {
          dreamCompass.navigateToDimension(targetDimension);
          
          setCompassState({
            currentDimension: targetDimension,
            accessibleDimensions: typeof dreamCompass.getAccessibleDimensions === 'function' ?
              dreamCompass.getAccessibleDimensions() : compassState.accessibleDimensions
          });
        } else {
          // If method doesn't exist, just update local state
          setCompassState(prev => ({
            ...prev,
            currentDimension: targetDimension
          }));
        }
        
        toast({
          title: "Dimensional Shift",
          description: `Navigated to ${targetDimension}D via ${direction.toLowerCase()} direction`,
          duration: 3000,
        });
      } else {
        toast({
          title: "Navigation Failed",
          description: `Dimension ${targetDimension}D is not currently accessible`,
          variant: "destructive",
          duration: 3000,
        });
      }
      
      setIsCalibrating(false);
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
            {compassState.currentDimension}D
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
        
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Accessible Dimensions</div>
          <div className="flex flex-wrap gap-2">
            {compassState.accessibleDimensions.map(dim => (
              <Badge 
                key={dim} 
                variant={dim === compassState.currentDimension ? "default" : "outline"}
                className={dim === compassState.currentDimension ? "bg-quantum-blue" : ""}
              >
                {dim}D
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DreamCompass;
