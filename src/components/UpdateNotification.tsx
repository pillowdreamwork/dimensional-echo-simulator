
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { XIcon, DownloadIcon, ZapIcon } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const UpdateNotification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Show update notification on load
    const hasSeenUpdate = localStorage.getItem("reality_sync_v36_seen");
    if (hasSeenUpdate) {
      setIsVisible(false);
    }
  }, []);

  const handleUpdateNow = () => {
    setIsUpdating(true);
    
    setTimeout(() => {
      localStorage.setItem("reality_sync_v36_seen", "true");
      setIsUpdating(false);
      setIsVisible(false);
      
      toast({
        title: "Reality Sync v3.6 Activated",
        description: "Portal Recalibration Protocols Initiated. Change Isn't Waiting.",
        duration: 5000,
      });
    }, 2000);
  };

  const handleDismiss = () => {
    localStorage.setItem("reality_sync_v36_seen", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Card className="fixed top-4 right-4 z-50 max-w-md bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-95 border-quantum-purple/50">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <ZapIcon className="text-quantum-purple animate-pulse" size={20} />
            <h3 className="font-bold text-quantum-purple">Reality Sync v3.6</h3>
            <Badge className="bg-quantum-gold/20 text-quantum-gold text-xs">
              CRITICAL UPDATE
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0 hover:bg-quantum-purple/20"
          >
            <XIcon size={12} />
          </Button>
        </div>
        
        <div className="space-y-2 mb-4">
          <p className="text-sm font-medium text-quantum-blue">
            Portal Recalibration Protocols Initiated
          </p>
          <p className="text-xs text-muted-foreground">
            🌀 Not all news makes it to the surface. Not all changes remain invisible.
          </p>
          
          <div className="text-xs space-y-1 text-quantum-teal">
            <div>✓ Live Dimensional Feed Activated</div>
            <div>✓ Rift Influence Dashboard Online</div>
            <div>✓ Echo Signal Transmission Ready</div>
            <div>✓ Portal Network Operational</div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-quantum-purple hover:bg-quantum-purple/80 text-white"
            onClick={handleUpdateNow}
            disabled={isUpdating}
          >
            <DownloadIcon size={14} className="mr-1" />
            {isUpdating ? "Updating..." : "Update Now"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDismiss}
            className="text-xs"
          >
            Later
          </Button>
        </div>
        
        <p className="text-xs text-quantum-gold mt-2 text-center">
          🧬 You Are the Key. Begin Portal Stabilization.
        </p>
      </CardContent>
    </Card>
  );
};

export default UpdateNotification;
