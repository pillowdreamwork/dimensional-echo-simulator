
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { 
  Activity, 
  Zap, 
  Shield, 
  Cpu, 
  Database, 
  Settings,
  AlertTriangle,
  TrendingUp,
  Layers
} from 'lucide-react';
import { QuantumPerformanceMonitor } from './QuantumPerformanceMonitor';
import { QuantumErrorMonitor } from './QuantumErrorMonitor';
import { QuantumValidationMonitor } from './QuantumValidationMonitor';
import { RealTimeSyncMonitor } from './RealTimeSyncMonitor';
import { MockQuantumTesseractEngine } from '../../lib/cores/mock-quantum-tesseract';
import { MockQuantumErrorHandler } from '../../lib/cores/mock-quantum-error-handler';

interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  quantumStability: number;
  dimensionalResonance: number;
  aethericFlow: number;
  timestamp: number;
}

export function ForgeDashboard() {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpuUsage: 0,
    memoryUsage: 0,
    quantumStability: 0,
    dimensionalResonance: 0,
    aethericFlow: 0,
    timestamp: Date.now()
  });

  const [isInitialized, setIsInitialized] = useState(false);
  const [activeProcesses, setActiveProcesses] = useState(0);

  // Mock engine instances
  const tesseractEngine = new MockQuantumTesseractEngine();
  const errorHandler = new MockQuantumErrorHandler();

  useEffect(() => {
    const updateMetrics = () => {
      const performanceMetrics = tesseractEngine.getPerformance();
      const resourceMetrics = tesseractEngine.getMetrics();

      setSystemMetrics({
        cpuUsage: resourceMetrics.cpuUsage,
        memoryUsage: resourceMetrics.memoryUsage,
        quantumStability: performanceMetrics.stability,
        dimensionalResonance: Math.random() * 100,
        aethericFlow: Math.random() * 100,
        timestamp: Date.now()
      });
    };

    // Initial update
    updateMetrics();
    setIsInitialized(true);

    // Set up interval for periodic updates
    const intervalId = setInterval(updateMetrics, 2000);

    return () => clearInterval(intervalId);
  }, [tesseractEngine]);

  const getStatusColor = (value: number) => {
    if (value >= 80) return 'text-green-500';
    if (value >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusBadge = (value: number) => {
    if (value >= 80) return 'default';
    if (value >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900/20 to-indigo-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              DreamForge Dashboard
            </h1>
            <p className="text-muted-foreground">
              Quantum Reality Engineering & Dimensional Management
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={isInitialized ? 'default' : 'secondary'}>
              {isInitialized ? 'Online' : 'Initializing'}
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemMetrics.cpuUsage.toFixed(1)}%</div>
              <Progress value={systemMetrics.cpuUsage} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemMetrics.memoryUsage.toFixed(1)}%</div>
              <Progress value={systemMetrics.memoryUsage} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quantum Stability</CardTitle>
              <Shield className={`h-4 w-4 ${getStatusColor(systemMetrics.quantumStability)}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(systemMetrics.quantumStability)}`}>
                {systemMetrics.quantumStability.toFixed(1)}%
              </div>
              <Progress value={systemMetrics.quantumStability} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dimensional Resonance</CardTitle>
              <Layers className={`h-4 w-4 ${getStatusColor(systemMetrics.dimensionalResonance)}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(systemMetrics.dimensionalResonance)}`}>
                {systemMetrics.dimensionalResonance.toFixed(1)}%
              </div>
              <Progress value={systemMetrics.dimensionalResonance} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aetheric Flow</CardTitle>
              <Zap className={`h-4 w-4 ${getStatusColor(systemMetrics.aethericFlow)}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(systemMetrics.aethericFlow)}`}>
                {systemMetrics.aethericFlow.toFixed(1)}%
              </div>
              <Progress value={systemMetrics.aethericFlow} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="sync">Synchronization</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Overall Health</span>
                    <Badge variant={getStatusBadge(systemMetrics.quantumStability)}>
                      {systemMetrics.quantumStability >= 80 ? 'Excellent' : 
                       systemMetrics.quantumStability >= 60 ? 'Good' : 'Needs Attention'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Processes</span>
                    <span className="font-mono">{activeProcesses}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Last Update</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(systemMetrics.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Quantum Coherence</span>
                        <span className="text-sm font-mono">98.7%</span>
                      </div>
                      <Progress value={98.7} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Reality Stability</span>
                        <span className="text-sm font-mono">95.2%</span>
                      </div>
                      <Progress value={95.2} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Dimensional Alignment</span>
                        <span className="text-sm font-mono">91.8%</span>
                      </div>
                      <Progress value={91.8} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <QuantumPerformanceMonitor />
          </TabsContent>

          <TabsContent value="monitoring">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QuantumErrorMonitor />
              <QuantumValidationMonitor />
            </div>
          </TabsContent>

          <TabsContent value="sync">
            <RealTimeSyncMonitor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
