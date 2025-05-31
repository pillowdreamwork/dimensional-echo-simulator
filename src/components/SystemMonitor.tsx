import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  ActivityIcon, 
  ShieldCheckIcon, 
  ShieldAlertIcon, 
  RefreshCwIcon,
  AlertCircleIcon,
  CheckCircleIcon
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { runSystemCheck } from '../utils/moduleCheck';
import { resetEngine, getEngineModules } from '../lib/engine';

interface SystemStatus {
  status: 'healthy' | 'warning' | 'critical' | 'unknown';
  functionalityScore: number;
  moduleChecks: Record<string, boolean>;
  issues: string[];
}

const CRITICAL_THRESHOLD = 60;
const WARNING_THRESHOLD = 80;

const SystemMonitor: React.FC = () => {
  const { toast } = useToast();
  const [systemHealth, setSystemHealth] = useState<SystemStatus>({
    status: 'unknown',
    functionalityScore: 0,
    moduleChecks: {},
    issues: []
  });
  const [isAutoFixEnabled, setIsAutoFixEnabled] = useState<boolean>(false);
  const [isRepairing, setIsRepairing] = useState<boolean>(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [repairHistory, setRepairHistory] = useState<string[]>([]);
  const [repairProgress, setRepairProgress] = useState<number>(0);
  
  // Run initial check and set up monitoring
  useEffect(() => {
    checkSystemHealth();
    
    // Set up timer for auto checks
    const timer = setInterval(() => {
      if (isAutoFixEnabled) {
        checkSystemHealth();
        if (systemHealth.functionalityScore < WARNING_THRESHOLD) {
          repairSystem();
        }
      }
    }, 30000); // Check every 30 seconds if auto-fix enabled
    
    return () => clearInterval(timer);
  }, [isAutoFixEnabled]);
  
  // Check system health
  const checkSystemHealth = async () => {
    const systemStatus = await runSystemCheck();
    const { echoSimulator, dreamServer, iuri } = getEngineModules();
    
    // Validate core modules
    const moduleChecks = {
      'Echo Simulator': !!echoSimulator?.isInitialized(),
      'Dream Server': !!dreamServer?.isConnected(),
      'IURI System': !!iuri?.isOperational(),
      'Reality Engine': systemStatus.realityEngineStatus,
      'Quantum Core': systemStatus.quantumCoreStatus
    };
    
    // Calculate overall functionality score
    const functionalityScore = Object.values(moduleChecks)
      .reduce((score, status) => score + (status ? 20 : 0), 0);
    
    // Determine system status
    let status: SystemStatus['status'] = 'healthy';
    if (functionalityScore <= CRITICAL_THRESHOLD) status = 'critical';
    else if (functionalityScore <= WARNING_THRESHOLD) status = 'warning';
    
    // Identify issues
    const issues = Object.entries(moduleChecks)
      .filter(([_, status]) => !status)
      .map(([module]) => `${module} is not operational`);
    
    setSystemHealth({
      status,
      functionalityScore,
      moduleChecks,
      issues
    });
    
    setLastCheck(new Date());
    
    // Notify if status is not healthy
    if (status !== 'healthy') {
      toast({
        title: `System Status: ${status.toUpperCase()}`,
        description: `Functionality Score: ${functionalityScore}%`,
        variant: status === 'critical' ? 'destructive' : 'default'
      });
    }
  };

  // Repair system issues
  const repairSystem = async () => {
    if (isRepairing) return;
    
    setIsRepairing(true);
    setRepairProgress(0);
    
    try {
      // Reset engine modules
      await resetEngine();
      
      // Simulate repair process
      for (let i = 0; i <= 100; i += 10) {
        setRepairProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Log repair attempt
      const repairLog = `System repair completed at ${new Date().toLocaleTimeString()}`;
      setRepairHistory(prev => [repairLog, ...prev.slice(0, 4)]);
      
      // Recheck system health
      await checkSystemHealth();
      
      toast({
        title: "System Repair Completed",
        description: "All modules have been reset and reinitialized.",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Repair Failed",
        description: "Unable to complete system repairs. Manual intervention required.",
        variant: "destructive"
      });
    } finally {
      setIsRepairing(false);
      setRepairProgress(0);
    }
  };

  // Replace direct property access with safe checks and use allowed badge variants
  const monitoredModules = [
    { label: 'Core', value: systemHealth.status },
    { label: 'Functionality', value: systemHealth.functionalityScore },
    { label: 'Dreamwork', value: systemHealth.moduleChecks.dreamworkActive ? 'Active' : 'Inactive' },
    { label: 'Vector Alchemy', value: systemHealth.moduleChecks.vectorAlchemyReady ? 'Ready' : 'Not Ready' },
    { label: 'Ritual System', value: systemHealth.moduleChecks.ritualSystemOnline ? 'Online' : 'Offline' },
    { label: 'Mythic Intelligence', value: systemHealth.moduleChecks.mythicIntelligenceConnected ? 'Connected' : 'Disconnected' },
    { label: 'Dream Compass', value: systemHealth.moduleChecks.dreamCompassCalibrated ? 'Calibrated' : 'Uncalibrated' }
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {systemHealth.status === 'healthy' ? (
              <ShieldCheckIcon className="h-6 w-6 text-green-500" />
            ) : systemHealth.status === 'warning' ? (
              <ShieldAlertIcon className="h-6 w-6 text-yellow-500" />
            ) : (
              <AlertCircleIcon className="h-6 w-6 text-red-500" />
            )}
            System Monitor
          </div>
          <Badge
            variant={
              systemHealth.status === 'healthy' ? "default" :
              systemHealth.status === 'warning' ? "secondary" :
              "destructive"
            }
          >
            {systemHealth.status.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">System Functionality</span>
              <span className="text-sm text-gray-500">
                {systemHealth.functionalityScore}%
              </span>
            </div>
            <Progress value={systemHealth.functionalityScore} />
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Module Status</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(systemHealth.moduleChecks).map(([module, status]) => (
                <div key={module} className="flex items-center justify-between p-2 border rounded-lg">
                  <span className="text-sm">{module}</span>
                  {status ? (
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircleIcon className="h-4 w-4 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={repairSystem}
              disabled={isRepairing || systemHealth.status === 'healthy'}
              className="relative"
            >
              {isRepairing ? (
                <>
                  <div 
                    className="absolute inset-0 bg-blue-500 opacity-20" 
                    style={{ width: `${repairProgress}%` }} 
                  />
                  <RefreshCwIcon className="h-4 w-4 mr-2 animate-spin" />
                  Repairing...
                </>
              ) : (
                <>
                  <ActivityIcon className="h-4 w-4 mr-2" />
                  Repair System
                </>
              )}
            </Button>

            <div className="flex items-center space-x-2">
              <Switch
                id="auto-fix"
                checked={isAutoFixEnabled}
                onCheckedChange={setIsAutoFixEnabled}
              />
              <Label htmlFor="auto-fix">Auto-Fix</Label>
            </div>
          </div>

          {systemHealth.issues.length > 0 && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h3 className="font-semibold mb-2 text-red-600 dark:text-red-400">
                Active Issues
              </h3>
              <ul className="space-y-1 text-sm text-red-600 dark:text-red-400">
                {systemHealth.issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </div>
          )}

          {repairHistory.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Repair History</h3>
              <div className="space-y-1 text-sm text-gray-500">
                {repairHistory.map((log, index) => (
                  <p key={index}>{log}</p>
                ))}
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 text-right">
            Last checked: {lastCheck?.toLocaleString() || 'Never'}
          </div>

          {monitoredModules.map(module => (
            <div key={module.label} className="flex items-center justify-between">
              <span>{module.label}</span>
              <Badge variant={module.value === 'Active' || module.value === 'Ready' || module.value === 'Online' || module.value === 'Connected' || module.value === 'Calibrated' ? 'default' : 'destructive'}>
                {module.value}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemMonitor;
