
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import QuantumInterface from "@/components/QuantumInterface";
import SymbolDecoder from "@/components/SymbolDecoder";
import { SystemStatus } from "@/components/SystemStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QuantumState } from "@/types/quantum";
import { useToast } from "@/components/ui/use-toast";
import { 
  Zap, 
  Activity, 
  Monitor, 
  ArrowRight, 
  Sparkles, 
  Globe,
  Settings,
  Eye
} from "lucide-react";

const Index = () => {
  const [quantumState, setQuantumState] = useState<QuantumState | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [systemMetrics, setSystemMetrics] = useState({
    activeProcesses: 12,
    quantumCoherence: 95.7,
    realityStability: 88.2,
    energyLevel: 142
  });
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "🌟 DreamForge Quantum Interface Online",
        description: "Advanced reality engineering capabilities activated.",
      });
    }, 2000);

    // Update system metrics
    const metricsInterval = setInterval(() => {
      setSystemMetrics(prev => ({
        activeProcesses: prev.activeProcesses + Math.floor((Math.random() - 0.5) * 3),
        quantumCoherence: Math.max(80, Math.min(100, prev.quantumCoherence + (Math.random() - 0.5) * 2)),
        realityStability: Math.max(70, Math.min(100, prev.realityStability + (Math.random() - 0.5) * 3)),
        energyLevel: Math.max(50, Math.min(200, prev.energyLevel + (Math.random() - 0.5) * 10))
      }));
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(metricsInterval);
    };
  }, [toast]);

  const handleSuperposition = (values: number[]) => {
    console.log('Superposition values:', values);
    toast({
      title: "Quantum Superposition Achieved",
      description: `Reality manifolds aligned with coherence: ${values.join(', ')}`,
    });
  };

  const handleSymbolConnect = (pattern: string[], interpretation: string) => {
    console.log('Symbol connection:', { pattern, interpretation });
    toast({
      title: "Symbol Pattern Decoded",
      description: `Dimensional resonance: ${interpretation}`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" text="Initializing Quantum Reality Matrix..." />
          <p className="text-gray-400 animate-pulse">Calibrating dimensional resonance frequencies...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
        {/* Navigation Header */}
        <header className="border-b border-purple-200/30 bg-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className="text-purple-400" size={32} />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  DreamForge
                </h1>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  Phase 2
                </Badge>
              </div>
              <nav className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button className="flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Monitor className="mr-2 w-4 h-4" />
                    Control Center
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-6 py-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Quantum Reality Engineering
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced dimensional manipulation and consciousness-reality interface technology. 
              Engineer your reality through quantum consciousness protocols.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-purple-200/30">
                <Activity className="w-6 h-6 mx-auto mb-1 text-green-500" />
                <p className="text-sm text-gray-500">Active Processes</p>
                <p className="text-lg font-bold text-green-600">{systemMetrics.activeProcesses}</p>
              </div>
              <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-purple-200/30">
                <Sparkles className="w-6 h-6 mx-auto mb-1 text-purple-500" />
                <p className="text-sm text-gray-500">Coherence</p>
                <p className="text-lg font-bold text-purple-600">{systemMetrics.quantumCoherence.toFixed(1)}%</p>
              </div>
              <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-purple-200/30">
                <Globe className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                <p className="text-sm text-gray-500">Stability</p>
                <p className="text-lg font-bold text-blue-600">{systemMetrics.realityStability.toFixed(1)}%</p>
              </div>
              <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-purple-200/30">
                <Zap className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
                <p className="text-sm text-gray-500">Energy</p>
                <p className="text-lg font-bold text-yellow-600">{systemMetrics.energyLevel}</p>
              </div>
            </div>
          </div>

          {/* Main Dashboard Preview */}
          <Card className="bg-white/10 backdrop-blur-sm border-purple-200/30">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="mr-2 text-blue-500" size={20} />
                  Quantum Interface Overview
                </div>
                <Link to="/dashboard">
                  <Button variant="outline" className="border-purple-300 hover:bg-purple-50">
                    <Settings className="mr-2 w-4 h-4" />
                    Advanced Controls
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ErrorBoundary>
                  <SystemStatus />
                </ErrorBoundary>
                
                <Card className="lg:col-span-2 bg-white/5 border-purple-200/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Access Panel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Link to="/dashboard">
                        <Button className="w-full h-20 flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                          <Monitor className="w-6 h-6 mb-2" />
                          Reality Dashboard
                        </Button>
                      </Link>
                      <Link to="/dashboard">
                        <Button className="w-full h-20 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                          <Activity className="w-6 h-6 mb-2" />
                          Quantum Visualizer
                        </Button>
                      </Link>
                      <Link to="/dashboard">
                        <Button className="w-full h-20 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                          <Sparkles className="w-6 h-6 mb-2" />
                          Error Monitor
                        </Button>
                      </Link>
                      <Link to="/dashboard">
                        <Button className="w-full h-20 flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
                          <Globe className="w-6 h-6 mb-2" />
                          System Status
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Components */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ErrorBoundary>
              <Card className="bg-white/10 backdrop-blur-sm border-purple-200/30">
                <CardHeader>
                  <CardTitle>Quantum State Interface</CardTitle>
                </CardHeader>
                <CardContent>
                  <QuantumInterface 
                    initialState={quantumState}
                    onStateChange={setQuantumState}
                  />
                </CardContent>
              </Card>
            </ErrorBoundary>
            
            <ErrorBoundary>
              <Card className="bg-white/10 backdrop-blur-sm border-purple-200/30">
                <CardHeader>
                  <CardTitle>Symbol Decoder Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <SymbolDecoder 
                    onSymbolConnect={handleSymbolConnect}
                  />
                </CardContent>
              </Card>
            </ErrorBoundary>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-300/30">
              <CardContent className="p-6 text-center">
                <Activity className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                <h3 className="text-lg font-semibold mb-2">Real-time Monitoring</h3>
                <p className="text-gray-600">Advanced quantum error detection and system health monitoring with auto-recovery protocols.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-300/30">
              <CardContent className="p-6 text-center">
                <Eye className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">Quantum Visualization</h3>
                <p className="text-gray-600">Interactive particle systems and wave function visualization for dimensional analysis.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-300/30">
              <CardContent className="p-6 text-center">
                <Globe className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-semibold mb-2">Reality Engineering</h3>
                <p className="text-gray-600">Dimensional manipulation tools with reality anchoring and timeline convergence controls.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
