
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react";
import { runSystemCheck } from "../utils/moduleCheck";
import { getEngineModules, resetEngine, initializePillowDreamworkGame } from "../lib/engine";
import { toast } from "@/hooks/use-toast";

const SystemMonitor = () => {
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const [autofix, setAutofix] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  // Run initial system check
  useEffect(() => {
    runCheck();
    
    // Set up interval for automatic checks if autofix is enabled
    const intervalId = setInterval(() => {
      if (autofix) {
        runCheck(true);
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [autofix]);

  // Run system check
  const runCheck = (silent = false) => {
    if (!silent) setIsChecking(true);
    
    try {
      const status = runSystemCheck();
      setSystemStatus(status);
      setLastCheck(new Date());
      
      if (!silent) {
        toast({
          title: `System Status: ${status.status === 'fully_operational' ? 'Optimal' : 'Needs Attention'}`,
          description: `Functionality score: ${status.functionalityScore}%`,
          variant: status.functionalityScore > 80 ? "default" : "destructive",
        });
      }
      
      // Auto-fix if enabled and score is below threshold
      if (autofix && status.functionalityScore < 100) {
        handleFix(true);
      }
    } catch (err) {
      console.error("Error during system check:", err);
      if (!silent) {
        toast({
          title: "System Check Failed",
          description: "Unable to complete system diagnostics",
          variant: "destructive",
        });
      }
    }
    
    if (!silent) setIsChecking(false);
  };

  // Fix system issues
  const handleFix = (silent = false) => {
    if (!silent) setIsFixing(true);
    
    try {
      // Reset and reinitialize the engine
      resetEngine();
      setTimeout(() => {
        initializePillowDreamworkGame();
        
        // Re-run check after fixing
        setTimeout(() => {
          const newStatus = runSystemCheck();
          setSystemStatus(newStatus);
          setLastCheck(new Date());
          
          if (!silent) {
            toast({
              title: "System Repair Complete",
              description: `New functionality score: ${newStatus.functionalityScore}%`,
              variant: newStatus.functionalityScore > 80 ? "default" : "destructive",
            });
          }
          
          if (!silent) setIsFixing(false);
        }, 500);
      }, 500);
    } catch (err) {
      console.error("Error during system repair:", err);
      if (!silent) {
        toast({
          title: "System Repair Failed",
          description: "Unable to complete system repairs",
          variant: "destructive",
        });
      }
      
      if (!silent) setIsFixing(false);
    }
  };

  // Toggle autofix
  const toggleAutofix = () => {
    setAutofix(!autofix);
    toast({
      title: !autofix ? "Autofix Enabled" : "Autofix Disabled",
      description: !autofix 
        ? "System will automatically repair issues when detected" 
        : "Automatic repairs have been disabled",
    });
  };

  return (
    <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-quantum-teal">System Monitor</CardTitle>
          <Badge 
            variant="outline" 
            className={`
              ${systemStatus?.status === 'fully_operational' 
                ? 'bg-green-500/20 text-green-500' 
                : 'bg-amber-500/20 text-amber-500'}
            `}
          >
            {systemStatus?.status === 'fully_operational' ? 'Optimal' : 'Needs Attention'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        {systemStatus ? (
          <>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">System Functionality</span>
                <span className="text-sm font-medium">{systemStatus.functionalityScore}%</span>
              </div>
              <Progress 
                value={systemStatus.functionalityScore} 
                className="h-2"
                indicatorClassName={
                  systemStatus.functionalityScore > 80 ? "bg-green-500" : 
                  systemStatus.functionalityScore > 50 ? "bg-amber-500" : "bg-red-500"
                }
              />
            </div>
            
            <div className="space-y-1 mb-4">
              {Object.entries(systemStatus.moduleChecks).map(([key, value]: [string, any]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {value ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <AlertCircle size={16} className="text-amber-500" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {key.replace(/([A-Z])/g, ' $1')
                        .replace(/^./, str => str.toUpperCase())
                        .replace(/([A-Z]) ([A-Z])/g, '$1$2')}
                    </span>
                  </div>
                  <Badge variant="outline" className={value ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"}>
                    {value ? "OK" : "Issue"}
                  </Badge>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
              <span>Last check: {lastCheck ? lastCheck.toLocaleTimeString() : 'Never'}</span>
              <div className="flex items-center gap-2">
                <span className={autofix ? "text-quantum-teal" : "text-muted-foreground"}>
                  Autofix: {autofix ? "On" : "Off"}
                </span>
                <div 
                  className={`w-8 h-4 rounded-full transition-colors cursor-pointer ${autofix ? 'bg-quantum-teal' : 'bg-muted'}`}
                  onClick={toggleAutofix}
                >
                  <div 
                    className={`w-3 h-3 rounded-full bg-background transition-transform ${
                      autofix ? 'translate-x-4' : 'translate-x-1'
                    } mt-0.5`} 
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-quantum-teal text-quantum-teal hover:bg-quantum-teal/10"
                onClick={() => runCheck()}
                disabled={isChecking || isFixing}
              >
                {isChecking ? (
                  <>
                    <RefreshCw size={16} className="animate-spin mr-1" />
                    Checking...
                  </>
                ) : (
                  "Run Check"
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-quantum-teal text-quantum-teal hover:bg-quantum-teal/10"
                onClick={() => handleFix()}
                disabled={isChecking || isFixing || systemStatus?.functionalityScore === 100}
              >
                {isFixing ? (
                  <>
                    <RefreshCw size={16} className="animate-spin mr-1" />
                    Fixing...
                  </>
                ) : (
                  "Repair System"
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-32">
            <RefreshCw size={24} className="animate-spin text-quantum-teal mb-2" />
            <p className="text-sm text-muted-foreground">Running system diagnostics...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemMonitor;
