
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
import { useToast } from "@/hooks/use-toast";
import { dimensionalEchoCore } from "@/lib/cores/dimensional-echo-core";
import { 
  Radio, 
  Activity, 
  Monitor, 
  ArrowRight, 
  Sparkles, 
  Globe,
  Settings,
  Eye,
  Waves,
  Zap
} from "lucide-react";

const Index = () => {
  const [quantumState, setQuantumState] = useState<QuantumState | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [systemMetrics, setSystemMetrics] = useState({
    activeProcesses: 12,
    quantumCoherence: 95.7,
    realityStability: 88.2,
    energyLevel: 142,
    echoStrength: 75.4,
    dimensionalResonance: 92.1,
    consciousnessLink: 82.3
  });
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "🌌 Dimensional Echo Simulator Online",
        description: "Advanced quantum reality engineering capabilities activated.",
      });
    }, 2000);

    // Update system metrics
    const metricsInterval = setInterval(() => {
      const echoState = dimensionalEchoCore.getCurrentState();
      setSystemMetrics(prev => ({
        ...prev,
        quantumCoherence: echoState.quantumCoherence,
        realityStability: echoState.realityStability,
        echoStrength: echoState.echoStrength,
        dimensionalResonance: echoState.dimensionalResonance,
        consciousnessLink: echoState.consciousnessLink,
        activeProcesses: prev.activeProcesses + Math.floor((Math.random() - 0.5) * 3),
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
          <LoadingSpinner size="lg" text="Initializing Dimensional Echo Simulator..." />
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
              <div className="flex items-center space-x-4">
                <Radio className="text-purple-400" size={32} />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Dimensional Echo Simulator
                  </h1>
                  <p className="text-sm text-gray-500">DreamForge Interface</p>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  Complete System
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
              Dimensional Echo Simulation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced dimensional echo processing with consciousness-reality interface technology. 
              Engineer your reality through quantum dimensional echo protocols and manifestation systems.
            </p>
            
            {/* Core System Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-purple-200/30">
                <Radio className="w-6 h-6 mx-auto mb-1 text-purple-500" />
                <p className="text-sm text-gray-500">Echo Strength</p>
                <p className="text-lg font-bold text-purple-600">{systemMetrics.echoStrength.toFixed(1)}%</p>
              </div>
              <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-purple-200/30">
                <Waves className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                <p className="text-sm text-gray-500">Resonance</p>
                <p className="text-lg font-bold text-blue-600">{systemMetrics.dimensionalResonance.toFixed(1)}%</p>
              </div>
              <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-purple-200/30">
                <Eye className="w-6 h-6 mx-auto mb-1 text-green-500" />
                <p className="text-sm text-gray-500">Consciousness</p>
                <p className="text-lg font-bold text-green-600">{systemMetrics.consciousnessLink.toFixed(1)}%</p>
              </div>
              <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-purple-200/30">
                <Sparkles className="w-6 h-6 mx-auto mb-1 text-orange-500" />
                <p className="text-sm text-gray-500">Coherence</p>
                <p className="text-lg font-bold text-orange-600">{systemMetrics.quantumCoherence.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          {/* Enhanced Dashboard Preview */}
          <Card className="bg-white/10 backdrop-blur-sm border-purple-200/30">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Radio className="mr-2 text-purple-500" size={20} />
                  Dimensional Echo Interface Overview
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
                    <CardTitle className="text-lg">Echo Control Matrix</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Link to="/dashboard">
                        <Button className="w-full h-20 flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                          <Radio className="w-6 h-6 mb-2" />
                          Echo Monitor
                        </Button>
                      </Link>
                      <Link to="/dashboard">
                        <Button className="w-full h-20 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                          <Waves className="w-6 h-6 mb-2" />
                          Echo Visualization
                        </Button>
                      </Link>
                      <Link to="/dashboard">
                        <Button className="w-full h-20 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                          <Zap className="w-6 h-6 mb-2" />
                          Reality Dashboard
                        </Button>
                      </Link>
                      <Link to="/dashboard">
                        <Button className="w-full h-20 flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
                          <Sparkles className="w-6 h-6 mb-2" />
                          Symbol Forge
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

          {/* Enhanced Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-300/30">
              <CardContent className="p-6 text-center">
                <Radio className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                <h3 className="text-lg font-semibold mb-2">Dimensional Echo Processing</h3>
                <p className="text-gray-600">Advanced echo simulation with real-time dimensional resonance monitoring and consciousness integration.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-300/30">
              <CardContent className="p-6 text-center">
                <Waves className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">Quantum Visualization</h3>
                <p className="text-gray-600">Interactive particle systems and echo wave visualization for comprehensive dimensional analysis.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-300/30">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-semibold mb-2">Reality Engineering</h3>
                <p className="text-gray-600">Complete dimensional manipulation suite with reality anchoring and manifestation controls.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
