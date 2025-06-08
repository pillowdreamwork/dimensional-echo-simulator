
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  dimensionalEchoCore, 
  DimensionalEchoState, 
  EchoEvent 
} from '../../lib/cores/dimensional-echo-core';
import { 
  Waves, 
  Zap, 
  Eye, 
  Activity, 
  Target, 
  Clock,
  Sparkles,
  Radio
} from 'lucide-react';

export const DimensionalEchoMonitor: React.FC = () => {
  const [echoState, setEchoState] = useState<DimensionalEchoState>({
    quantumCoherence: 0,
    realityStability: 0,
    dimensionalResonance: 0,
    echoStrength: 0,
    temporalAlignment: 0,
    consciousnessLink: 0,
    manifestationPotential: 0,
    activeProcesses: 0,
    energyLevel: 0,
    systemStatus: 'initializing',
    lastUpdate: new Date()
  });

  const [recentEvents, setRecentEvents] = useState<EchoEvent[]>([]);
  const [isSimulatorActive, setIsSimulatorActive] = useState(false);

  useEffect(() => {
    const stateSubscription = dimensionalEchoCore.observeEchoState()
      .subscribe(state => setEchoState(state));

    const eventsSubscription = dimensionalEchoCore.observeEchoEvents()
      .subscribe(event => {
        setRecentEvents(prev => [event, ...prev.slice(0, 9)]);
      });

    return () => {
      stateSubscription.unsubscribe();
      eventsSubscription.unsubscribe();
    };
  }, []);

  const initializeSimulator = async () => {
    try {
      await dimensionalEchoCore.initialize();
      setIsSimulatorActive(true);
    } catch (error) {
      console.error('Failed to initialize simulator:', error);
    }
  };

  const triggerDimensionalShift = () => {
    dimensionalEchoCore.triggerDimensionalShift(0.7);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'transcendent': return 'bg-purple-500 text-white';
      case 'resonating': return 'bg-blue-500 text-white';
      case 'stable': return 'bg-green-500 text-white';
      case 'critical': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'quantum_shift': return <Zap className="w-4 h-4" />;
      case 'dimensional_echo': return <Waves className="w-4 h-4" />;
      case 'consciousness_pulse': return <Eye className="w-4 h-4" />;
      case 'reality_anchor': return <Target className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-300/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Radio className="mr-3 text-purple-400" size={28} />
              Dimensional Echo Simulator
              <Badge className={`ml-3 ${getStatusColor(echoState.systemStatus)}`}>
                {echoState.systemStatus.toUpperCase()}
              </Badge>
            </div>
            <div className="flex space-x-2">
              {!isSimulatorActive ? (
                <Button onClick={initializeSimulator} className="bg-purple-600 hover:bg-purple-700">
                  <Sparkles className="mr-2 w-4 h-4" />
                  Initialize Simulator
                </Button>
              ) : (
                <Button onClick={triggerDimensionalShift} variant="outline" className="border-purple-300">
                  <Waves className="mr-2 w-4 h-4" />
                  Trigger Echo
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Quantum Coherence</p>
                <p className="text-2xl font-bold text-purple-600">
                  {echoState.quantumCoherence.toFixed(1)}%
                </p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
            <Progress value={echoState.quantumCoherence} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Reality Stability</p>
                <p className="text-2xl font-bold text-blue-600">
                  {echoState.realityStability.toFixed(1)}%
                </p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
            <Progress value={echoState.realityStability} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Echo Strength</p>
                <p className="text-2xl font-bold text-green-600">
                  {echoState.echoStrength.toFixed(1)}%
                </p>
              </div>
              <Waves className="w-8 h-8 text-green-500" />
            </div>
            <Progress value={echoState.echoStrength} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Consciousness Link</p>
                <p className="text-2xl font-bold text-orange-600">
                  {echoState.consciousnessLink.toFixed(1)}%
                </p>
              </div>
              <Eye className="w-8 h-8 text-orange-500" />
            </div>
            <Progress value={echoState.consciousnessLink} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Advanced Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Dimensional Resonance</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {echoState.dimensionalResonance.toFixed(1)}%
                </p>
              </div>
              <Radio className="w-8 h-8 text-indigo-500" />
            </div>
            <Progress value={echoState.dimensionalResonance} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Temporal Alignment</p>
                <p className="text-2xl font-bold text-cyan-600">
                  {echoState.temporalAlignment.toFixed(1)}%
                </p>
              </div>
              <Clock className="w-8 h-8 text-cyan-500" />
            </div>
            <Progress value={echoState.temporalAlignment} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Manifestation Potential</p>
                <p className="text-2xl font-bold text-pink-600">
                  {echoState.manifestationPotential.toFixed(1)}%
                </p>
              </div>
              <Sparkles className="w-8 h-8 text-pink-500" />
            </div>
            <Progress value={echoState.manifestationPotential} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Echo Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Dimensional Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {recentEvents.length > 0 ? (
              recentEvents.map(event => (
                <div key={event.id} className="flex items-center p-3 border rounded-lg bg-gray-50">
                  {getEventIcon(event.type)}
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium">
                      {event.type.replace('_', ' ').toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Intensity: {(event.intensity * 100).toFixed(0)}% | 
                      Location: ({event.location.x.toFixed(0)}, {event.location.y.toFixed(0)}, {event.location.z.toFixed(0)})
                    </p>
                  </div>
                  <Badge variant="outline">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No dimensional events detected. Initialize the simulator to begin.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
