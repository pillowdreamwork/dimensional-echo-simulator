
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomProgress } from "@/components/ui/custom-progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  ActivityIcon, 
  ShieldCheckIcon, 
  ShieldAlertIcon, 
  RefreshCwIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { runSystemCheck } from '../utils/moduleCheck';
import { resetEngine, initializePillowDreamworkGame } from '../lib/engine';

const SystemMonitor = () => {
  const { toast } = useToast();
  const [systemHealth, setSystemHealth] = useState({
    status: 'unknown',
    functionalityScore: 0,
    moduleChecks: {} as Record<string, boolean>
  });
  const [isAutoFixEnabled, setIsAutoFixEnabled] = useState(false);
  const [isRepairing, setIsRepairing] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [repairHistory, setRepairHistory] = useState<string[]>([]);
  
  // Run initial check
  useEffect(() => {
    checkSystemHealth();
    
    // Set up timer for auto checks
    const timer = setInterval(() => {
      if (isAutoFixEnabled) {
        checkSystemHealth();
        repairSystem();
      }
    }, 30000); // Check every 30 seconds if auto-fix enabled
    
    return () => clearInterval(timer);
  }, [isAutoFixEnabled]);
  
  // Check system health
  const checkSystemHealth = () => {
    const systemStatus = runSystemCheck();
    setSystemHealth(systemStatus);
    setLastCheck(new Date());
    
    // Show toast if system is not fully operational
    if (systemStatus.status !== 'fully_operational' && !isRepairing) {
      toast({
        title: "System Status Alert",
        description: `${systemStatus.functionalityScore}% functionality detected, some modules may need repair.`,
        variant: "destructive",
        duration: 5000,
      });
    }
  };
  
  // Repair system
  const repairSystem = () => {
    setIsRepairing(true);
    
    // Record what we're fixing
    const issueModules = Object.entries(systemHealth.moduleChecks)
      .filter(([_, isWorking]) => !isWorking)
      .map(([name]) => name);
    
    const repairMessage = issueModules.length > 0 
      ? `Repairing modules: ${issueModules.join(', ')}`
      : 'Running diagnostic repair on all modules';
    
    // Add to repair history
    setRepairHistory(prev => [
      `[${new Date().toLocaleTimeString()}] ${repairMessage}`,
      ...prev.slice(0, 9)
    ]);
    
    setTimeout(() => {
      // Reset and reinitialize the engine
      resetEngine();
      initializePillowDreamworkGame();
      
      // Check if repair was successful
      const newStatus = runSystemCheck();
      setSystemHealth(newStatus);
      
      // Show result
      const wasSuccessful = newStatus.functionalityScore > systemHealth.functionalityScore;
      toast({
        title: wasSuccessful ? "System Repair Successful" : "System Repair Complete",
        description: wasSuccessful
          ? `System functionality improved to ${newStatus.functionalityScore}%`
          : `System maintained at ${newStatus.functionalityScore}% functionality`,
        variant: wasSuccessful ? "default" : "destructive",
        duration: 3000,
      });
      
      setIsRepairing(false);
    }, 3000);
  };
  
  // Get status color based on functionality score
  const getStatusColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Get progress indicator class based on score
  const getProgressClass = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <ActivityIcon className="mr-2 text-quantum-teal" size={20} />
            System Monitor
          </CardTitle>
          <Badge 
            variant="outline" 
            className={`${
              systemHealth.functionalityScore >= 90
                ? 'bg-green-500/20 text-green-500'
                : systemHealth.functionalityScore >= 70
                ? 'bg-yellow-500/20 text-yellow-500'
                : 'bg-red-500/20 text-red-500'
            }`}
          >
            {systemHealth.status === 'fully_operational' ? 'Online' : 'Needs Attention'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              {systemHealth.functionalityScore >= 90 ? (
                <ShieldCheckIcon className="mr-2 text-green-500" size={16} />
              ) : (
                <ShieldAlertIcon className="mr-2 text-yellow-500" size={16} />
              )}
              <span className="font-medium">System Health</span>
            </div>
            <span className={getStatusColor(systemHealth.functionalityScore)}>
              {systemHealth.functionalityScore}%
            </span>
          </div>
          
          <CustomProgress 
            value={systemHealth.functionalityScore} 
            className="h-2 mb-2"
            indicatorClassName={getProgressClass(systemHealth.functionalityScore)}
          />
          
          <div className="text-xs text-muted-foreground">
            Last checked: {lastCheck ? lastCheck.toLocaleTimeString() : 'Never'}
          </div>
        </div>
        
        <div className="space-y-1 mb-4">
          {Object.entries(systemHealth.moduleChecks).map(([name, isWorking]) => (
            <div key={name} className="flex justify-between items-center text-sm">
              <span>{name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
              <Badge variant={isWorking ? "default" : "destructive"} className="text-xs">
                {isWorking ? 'OK' : 'Error'}
              </Badge>
            </div>
          ))}
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <Switch 
            id="auto-fix" 
            checked={isAutoFixEnabled}
            onCheckedChange={setIsAutoFixEnabled}
            disabled={isRepairing}
          />
          <Label htmlFor="auto-fix">Enable Auto-Fix</Label>
        </div>
        
        <div className="flex space-x-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={checkSystemHealth}
            disabled={isRepairing}
          >
            <RefreshCwIcon className="mr-1" size={16} />
            Check
          </Button>
          
          <Button
            variant="quantum"
            size="sm"
            className="flex-1"
            onClick={repairSystem}
            disabled={isRepairing}
          >
            {isRepairing ? (
              <>
                <RefreshCwIcon className="mr-1 animate-spin" size={16} />
                Repairing...
              </>
            ) : (
              <>
                <ShieldCheckIcon className="mr-1" size={16} />
                Repair
              </>
            )}
          </Button>
        </div>
        
        {repairHistory.length > 0 && (
          <div className="mt-4 border-t border-border pt-2">
            <p className="text-sm font-medium mb-2">Repair History</p>
            <div className="space-y-1 max-h-32 overflow-y-auto text-xs">
              {repairHistory.map((entry, i) => (
                <div key={i} className="text-muted-foreground">
                  {entry}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemMonitor;
