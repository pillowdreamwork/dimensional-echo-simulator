
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { StarIcon, WandSparklesIcon } from "lucide-react";
import { useToast } from "../hooks/use-toast";

interface PortalEntryProps {
  onEnterPortal: () => void;
  isFirstVisit?: boolean;
}

const PortalEntry: React.FC<PortalEntryProps> = ({ 
  onEnterPortal, 
  isFirstVisit = false 
}) => {
  const [intention, setIntention] = useState("");
  const [isReady, setIsReady] = useState(false);
  const { toast } = useToast();
  
  const handleSetIntention = () => {
    if (intention.trim().length > 0) {
      toast({
        title: "Intention Set",
        description: "Your intention will guide your multidimensional journey",
        duration: 3000,
      });
      setIsReady(true);
    } else {
      toast({
        title: "Set Your Intention",
        description: "Please share a few words about your purpose for today's journey",
        duration: 3000,
      });
    }
  };
  
  const handleEnterPortal = () => {
    toast({
      title: "Entering the Portal",
      description: "Welcome to your multidimensional journey...",
      duration: 3000,
    });
    onEnterPortal();
  };
  
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-quantum-purple mb-2">Quantum Doorway</h1>
          <p className="text-quantum-blue text-lg">
            A portal to multidimensional exploration
          </p>
        </div>
        
        <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="portal-icon w-20 h-20 mx-auto mb-4 rounded-full bg-quantum-purple/20 flex items-center justify-center">
                <StarIcon size={36} className="text-quantum-gold animate-pulse-subtle" />
              </div>
              
              <h2 className="text-xl text-quantum-gold mb-2">Set Your Intention</h2>
              <p className="text-sm text-muted-foreground">
                Before entering, take a moment to set an intention for your journey.
                What are you seeking to discover or understand?
              </p>
            </div>
            
            <div className="space-y-4">
              <Input
                placeholder="My intention for this journey is..."
                value={intention}
                onChange={(e) => setIntention(e.target.value)}
                className="bg-quantum-dark border-quantum-purple/50 text-quantum-blue"
              />
              
              {!isReady ? (
                <Button 
                  onClick={handleSetIntention}
                  variant="outline"
                  className="w-full border-quantum-gold text-quantum-gold hover:bg-quantum-gold/20"
                >
                  <WandSparklesIcon className="mr-2 h-4 w-4" />
                  Set Intention
                </Button>
              ) : (
                <Button 
                  onClick={handleEnterPortal}
                  variant="default" 
                  className="w-full bg-gradient-to-r from-quantum-purple to-quantum-blue hover:opacity-90"
                >
                  Enter the Portal
                </Button>
              )}
              
              {isFirstVisit && (
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Your first visit? Don't worry. 
                  This is a safe space for inner exploration.
                  There's no right or wrong way to journey.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortalEntry;
