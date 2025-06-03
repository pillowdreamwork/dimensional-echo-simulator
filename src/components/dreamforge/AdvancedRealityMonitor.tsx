
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { quantumRealityEngine, RealityMatrix } from '../../lib/cores/quantum-reality-engine';
import { quantumTesseractEngine, TesseractNode } from '../../lib/cores/quantum-tesseract-engine';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  Activity, 
  Zap, 
  Globe, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  Shield
} from 'lucide-react';

interface MetricData {
  timestamp: number;
  stability: number;
  energy: number;
  coherence: number;
  convergence: number;
}

export const AdvancedRealityMonitor: React.FC = () => {
  const [realityMatrix, setRealityMatrix] = useState<RealityMatrix>({
    dimensions: [],
    stability: 1.0,
    energy: 100,
    coherence: 0.95,
    entanglement: 0.8,
    timelineConvergence: 0.9,
    activeManipulations: []
  });

  const [tesseractNodes, setTesseractNodes] = useState<Map<string, TesseractNode>>(new Map());
  const [metricsHistory, setMetricsHistory] = useState<MetricData[]>([]);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    dimensionalFlux: 0,
    quantumCoherence: 0,
    realityStability: 0,
    timelineIntegrity: 0,
    energyFlow: 0
  });

  useEffect(() => {
    const matrixSub = quantumRealityEngine.observeRealityMatrix()
      .subscribe(matrix => {
        setRealityMatrix(matrix);
        
        // Update metrics history
        const newMetric: MetricData = {
          timestamp: Date.now(),
          stability: matrix.stability * 100,
          energy: matrix.energy,
          coherence: matrix.coherence * 100,
          convergence: matrix.timelineConvergence * 100
        };
        
        setMetricsHistory(prev => [...prev.slice(-19), newMetric]);
      });

    const nodesSub = quantumTesseractEngine.observeNodes()
      .subscribe(nodes => {
        setTesseractNodes(nodes);
        
        // Calculate real-time metrics from nodes
        const nodeArray = Array.from(nodes.values());
        const avgCoherence = nodeArray.reduce((sum, node) => sum + node.quantumState.coherence, 0) / nodeArray.length || 0;
        const avgStability = nodeArray.reduce((sum, node) => sum + node.timelineStability, 0) / nodeArray.length || 0;
        const totalEnergy = nodeArray.reduce((sum, node) => sum + node.energyLevel, 0);
        
        setRealTimeMetrics({
          dimensionalFlux: Math.random() * 100,
          quantumCoherence: avgCoherence,
          realityStability: avgStability * 100,
          timelineIntegrity: (avgStability + avgCoherence / 100) * 50,
          energyFlow: totalEnergy
        });
      });

    return () => {
      matrixSub.unsubscribe();
      nodesSub.unsubscribe();
    };
  }, []);

  const getStatusColor = (value: number, thresholds = { good: 80, warning: 50 }) => {
    if (value >= thresholds.good) return 'text-green-500';
    if (value >= thresholds.warning) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getProgressColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="grid gap-6 p-6">
      {/* Real-time Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Dimensional Flux</p>
                <p className={`text-2xl font-bold ${getStatusColor(realTimeMetrics.dimensionalFlux)}`}>
                  {realTimeMetrics.dimensionalFlux.toFixed(1)}%
                </p>
              </div>
              <Globe className="w-8 h-8 text-blue-500" />
            </div>
            <Progress 
              value={realTimeMetrics.dimensionalFlux} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Quantum Coherence</p>
                <p className={`text-2xl font-bold ${getStatusColor(realTimeMetrics.quantumCoherence)}`}>
                  {realTimeMetrics.quantumCoherence.toFixed(1)}%
                </p>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
            <Progress 
              value={realTimeMetrics.quantumCoherence} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Reality Stability</p>
                <p className={`text-2xl font-bold ${getStatusColor(realTimeMetrics.realityStability)}`}>
                  {realTimeMetrics.realityStability.toFixed(1)}%
                </p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
            <Progress 
              value={realTimeMetrics.realityStability} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Timeline Integrity</p>
                <p className={`text-2xl font-bold ${getStatusColor(realTimeMetrics.timelineIntegrity)}`}>
                  {realTimeMetrics.timelineIntegrity.toFixed(1)}%
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
            <Progress 
              value={realTimeMetrics.timelineIntegrity} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Energy Flow</p>
                <p className={`text-2xl font-bold ${getStatusColor(realTimeMetrics.energyFlow, { good: 5, warning: 2 })}`}>
                  {realTimeMetrics.energyFlow.toFixed(1)}
                </p>
              </div>
              <Zap className="w-8 h-8 text-yellow-500" />
            </div>
            <Progress 
              value={Math.min(100, realTimeMetrics.energyFlow * 10)} 
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Reality Matrix Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={metricsHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleTimeString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="stability" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Stability %"
                />
                <Line 
                  type="monotone" 
                  dataKey="coherence" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="Coherence %"
                />
                <Line 
                  type="monotone" 
                  dataKey="convergence" 
                  stroke="#ffc658" 
                  strokeWidth={2}
                  name="Convergence %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Energy Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={metricsHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleTimeString()}
                />
                <Area 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6}
                  name="Energy Level"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle>System Health Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Active Components</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Tesseract Nodes</span>
                  <Badge variant="secondary">{tesseractNodes.size}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Reality Manipulations</span>
                  <Badge variant="secondary">{realityMatrix.activeManipulations.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Dimensional Anchors</span>
                  <Badge variant="secondary">{realityMatrix.dimensions.length}</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Performance Metrics</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Stability</span>
                    <span>{(realityMatrix.stability * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={realityMatrix.stability * 100} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Quantum Entanglement</span>
                    <span>{(realityMatrix.entanglement * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={realityMatrix.entanglement * 100} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">System Alerts</h3>
              <div className="space-y-2">
                {realityMatrix.stability < 0.5 && (
                  <div className="flex items-center p-2 bg-red-50 border border-red-200 rounded">
                    <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                    <span className="text-sm text-red-700">Low Reality Stability</span>
                  </div>
                )}
                {realityMatrix.energy < 30 && (
                  <div className="flex items-center p-2 bg-yellow-50 border border-yellow-200 rounded">
                    <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className="text-sm text-yellow-700">Low Energy Levels</span>
                  </div>
                )}
                {realTimeMetrics.quantumCoherence < 50 && (
                  <div className="flex items-center p-2 bg-orange-50 border border-orange-200 rounded">
                    <Activity className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm text-orange-700">Quantum Decoherence</span>
                  </div>
                )}
                {realityMatrix.stability >= 0.8 && realityMatrix.energy >= 80 && realTimeMetrics.quantumCoherence >= 80 && (
                  <div className="flex items-center p-2 bg-green-50 border border-green-200 rounded">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-green-700">All Systems Optimal</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
