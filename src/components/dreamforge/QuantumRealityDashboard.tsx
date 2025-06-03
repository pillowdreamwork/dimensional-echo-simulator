
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { quantumRealityEngine, RealityMatrix, RealityManipulation } from '../../lib/cores/quantum-reality-engine';
import { ErrorBoundary } from '../ErrorBoundary';
import { 
  Zap, 
  Activity, 
  Layers, 
  Clock, 
  AlertTriangle, 
  PlayCircle, 
  PauseCircle,
  RefreshCw,
  Target
} from 'lucide-react';

export const QuantumRealityDashboard: React.FC = () => {
  const [realityMatrix, setRealityMatrix] = useState<RealityMatrix>({
    dimensions: [],
    stability: 1.0,
    energy: 100,
    coherence: 0.95,
    entanglement: 0.8,
    timelineConvergence: 0.9,
    activeManipulations: []
  });

  const [recentManipulations, setRecentManipulations] = useState<RealityManipulation[]>([]);
  const [isEngineActive, setIsEngineActive] = useState(false);

  useEffect(() => {
    const matrixSubscription = quantumRealityEngine.observeRealityMatrix()
      .subscribe(matrix => setRealityMatrix(matrix));

    const manipulationSubscription = quantumRealityEngine.observeManipulations()
      .subscribe(manipulation => {
        setRecentManipulations(prev => [manipulation, ...prev.slice(0, 9)]);
      });

    return () => {
      matrixSubscription.unsubscribe();
      manipulationSubscription.unsubscribe();
    };
  }, []);

  const initializeEngine = () => {
    quantumRealityEngine.initialize();
    setIsEngineActive(true);
  };

  const shutdownEngine = () => {
    quantumRealityEngine.shutdown();
    setIsEngineActive(false);
  };

  const performManipulation = (type: RealityManipulation['type']) => {
    const manipulation: RealityManipulation = {
      id: crypto.randomUUID(),
      type,
      intensity: 0.5,
      duration: 3000,
      parameters: {},
      timestamp: Date.now()
    };

    quantumRealityEngine.performRealityManipulation(manipulation);
  };

  const getStabilityColor = (value: number): string => {
    if (value > 0.8) return 'text-green-500';
    if (value > 0.5) return 'text-yellow-500';
    if (value > 0.3) return 'text-orange-500';
    return 'text-red-500';
  };

  const getManipulationIcon = (type: string) => {
    switch (type) {
      case 'dimensional_shift': return <Layers className="w-4 h-4" />;
      case 'quantum_collapse': return <Target className="w-4 h-4" />;
      case 'reality_anchor': return <RefreshCw className="w-4 h-4" />;
      case 'timeline_merge': return <Clock className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="grid gap-6 p-6">
        {/* Header Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="mr-2 text-purple-500" size={24} />
                Quantum Reality Dashboard
              </div>
              <div className="flex space-x-2">
                {!isEngineActive ? (
                  <Button onClick={initializeEngine} className="flex items-center">
                    <PlayCircle className="mr-2 w-4 h-4" />
                    Initialize Engine
                  </Button>
                ) : (
                  <Button onClick={shutdownEngine} variant="destructive" className="flex items-center">
                    <PauseCircle className="mr-2 w-4 h-4" />
                    Shutdown Engine
                  </Button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Reality Matrix Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Reality Stability</p>
                  <p className={`text-2xl font-bold ${getStabilityColor(realityMatrix.stability)}`}>
                    {(realityMatrix.stability * 100).toFixed(1)}%
                  </p>
                </div>
                <Activity className="w-8 h-8 text-blue-500" />
              </div>
              <Progress value={realityMatrix.stability * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Energy Level</p>
                  <p className="text-2xl font-bold text-green-500">
                    {realityMatrix.energy.toFixed(0)}
                  </p>
                </div>
                <Zap className="w-8 h-8 text-green-500" />
              </div>
              <Progress value={(realityMatrix.energy / 200) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Quantum Coherence</p>
                  <p className="text-2xl font-bold text-purple-500">
                    {(realityMatrix.coherence * 100).toFixed(1)}%
                  </p>
                </div>
                <Target className="w-8 h-8 text-purple-500" />
              </div>
              <Progress value={realityMatrix.coherence * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Timeline Convergence</p>
                  <p className="text-2xl font-bold text-blue-500">
                    {(realityMatrix.timelineConvergence * 100).toFixed(1)}%
                  </p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
              <Progress value={realityMatrix.timelineConvergence * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Reality Manipulation Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Reality Manipulation Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                onClick={() => performManipulation('dimensional_shift')}
                className="flex flex-col items-center p-4 h-auto"
                variant="outline"
              >
                <Layers className="w-6 h-6 mb-2" />
                Dimensional Shift
              </Button>
              <Button 
                onClick={() => performManipulation('quantum_collapse')}
                className="flex flex-col items-center p-4 h-auto"
                variant="outline"
              >
                <Target className="w-6 h-6 mb-2" />
                Quantum Collapse
              </Button>
              <Button 
                onClick={() => performManipulation('reality_anchor')}
                className="flex flex-col items-center p-4 h-auto"
                variant="outline"
              >
                <RefreshCw className="w-6 h-6 mb-2" />
                Reality Anchor
              </Button>
              <Button 
                onClick={() => performManipulation('timeline_merge')}
                className="flex flex-col items-center p-4 h-auto"
                variant="outline"
              >
                <Clock className="w-6 h-6 mb-2" />
                Timeline Merge
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Manipulations & Recent History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Manipulations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {realityMatrix.activeManipulations.length > 0 ? (
                  realityMatrix.activeManipulations.map(id => (
                    <div key={id} className="flex items-center p-2 bg-blue-50 rounded">
                      <Activity className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="font-mono text-sm">{id.slice(0, 8)}</span>
                      <Badge variant="secondary" className="ml-auto">Active</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No active manipulations</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Manipulations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {recentManipulations.length > 0 ? (
                  recentManipulations.map(manipulation => (
                    <div key={manipulation.id} className="flex items-center p-2 border rounded">
                      {getManipulationIcon(manipulation.type)}
                      <div className="ml-2 flex-1">
                        <p className="text-sm font-medium">
                          {manipulation.type.replace('_', ' ').toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Intensity: {(manipulation.intensity * 100).toFixed(0)}%
                        </p>
                      </div>
                      <Badge variant="outline">
                        {new Date(manipulation.timestamp).toLocaleTimeString()}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No recent manipulations</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Warning Panel */}
        {(realityMatrix.stability < 0.5 || realityMatrix.energy < 20) && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-red-700">Reality Instability Detected</h3>
                  <p className="text-red-600">
                    Critical system parameters detected. Immediate stabilization recommended.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ErrorBoundary>
  );
};
