
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { quantumTesseractEngine, TesseractNode, DimensionalWeave, QuantumRitual } from '../../lib/cores/quantum-tesseract-engine';
import { Vector3 } from 'three';
import { 
  Layers, 
  Zap, 
  Activity, 
  Play, 
  Square, 
  RefreshCw,
  Target,
  Users,
  Sparkles
} from 'lucide-react';

export const TesseractControlPanel: React.FC = () => {
  const [nodes, setNodes] = useState<Map<string, TesseractNode>>(new Map());
  const [weaves, setWeaves] = useState<Map<string, DimensionalWeave>>(new Map());
  const [rituals, setRituals] = useState<Map<string, QuantumRitual>>(new Map());
  const [isEngineActive, setIsEngineActive] = useState(false);
  const [newNodePosition, setNewNodePosition] = useState({ x: 0, y: 0, z: 0 });
  const [ritualName, setRitualName] = useState('');
  const [ritualSymbols, setRitualSymbols] = useState('');

  useEffect(() => {
    const nodesSub = quantumTesseractEngine.observeNodes().subscribe(setNodes);
    const weavesSub = quantumTesseractEngine.observeWeaves().subscribe(setWeaves);
    const ritualsSub = quantumTesseractEngine.observeRituals().subscribe(setRituals);

    return () => {
      nodesSub.unsubscribe();
      weavesSub.unsubscribe();
      ritualsSub.unsubscribe();
    };
  }, []);

  const handleEngineToggle = () => {
    if (isEngineActive) {
      quantumTesseractEngine.shutdown();
      setIsEngineActive(false);
    } else {
      quantumTesseractEngine.initialize();
      setIsEngineActive(true);
    }
  };

  const createNode = () => {
    const position = new Vector3(newNodePosition.x, newNodePosition.y, newNodePosition.z);
    const nodeId = quantumTesseractEngine.createTesseractNode(
      position,
      `DIM-${Date.now()}`,
      Math.random() + 0.5
    );
    console.log('Created tesseract node:', nodeId);
  };

  const createWeave = () => {
    const nodeIds = Array.from(nodes.keys()).slice(0, 3);
    if (nodeIds.length >= 2) {
      const weaveId = quantumTesseractEngine.createDimensionalWeave(nodeIds);
      console.log('Created dimensional weave:', weaveId);
    }
  };

  const initiateRitual = () => {
    if (ritualName && ritualSymbols) {
      const symbols = ritualSymbols.split(',').map(s => s.trim());
      const ritualId = quantumTesseractEngine.initiateQuantumRitual(
        ritualName,
        ['user-1', 'user-2'],
        symbols
      );
      console.log('Initiated quantum ritual:', ritualId);
      setRitualName('');
      setRitualSymbols('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'complete': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="grid gap-6 p-6">
      {/* Engine Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Layers className="mr-2 text-purple-500" size={24} />
              Tesseract Engine Control
            </div>
            <Button
              onClick={handleEngineToggle}
              variant={isEngineActive ? "destructive" : "default"}
              className="flex items-center"
            >
              {isEngineActive ? (
                <>
                  <Square className="mr-2 w-4 h-4" />
                  Shutdown
                </>
              ) : (
                <>
                  <Play className="mr-2 w-4 h-4" />
                  Initialize
                </>
              )}
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Node Creation */}
      <Card>
        <CardHeader>
          <CardTitle>Tesseract Node Creation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <Input
              type="number"
              placeholder="X"
              value={newNodePosition.x}
              onChange={(e) => setNewNodePosition(prev => ({ ...prev, x: parseFloat(e.target.value) || 0 }))}
            />
            <Input
              type="number"
              placeholder="Y"
              value={newNodePosition.y}
              onChange={(e) => setNewNodePosition(prev => ({ ...prev, y: parseFloat(e.target.value) || 0 }))}
            />
            <Input
              type="number"
              placeholder="Z"
              value={newNodePosition.z}
              onChange={(e) => setNewNodePosition(prev => ({ ...prev, z: parseFloat(e.target.value) || 0 }))}
            />
          </div>
          <Button onClick={createNode} className="w-full">
            <Target className="mr-2 w-4 h-4" />
            Create Tesseract Node
          </Button>
        </CardContent>
      </Card>

      {/* Ritual Initiation */}
      <Card>
        <CardHeader>
          <CardTitle>Quantum Ritual Initiation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Ritual Name"
            value={ritualName}
            onChange={(e) => setRitualName(e.target.value)}
          />
          <Input
            placeholder="Symbols (comma-separated)"
            value={ritualSymbols}
            onChange={(e) => setRitualSymbols(e.target.value)}
          />
          <Button onClick={initiateRitual} className="w-full">
            <Sparkles className="mr-2 w-4 h-4" />
            Initiate Ritual
          </Button>
        </CardContent>
      </Card>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Nodes */}
        <Card>
          <CardHeader>
            <CardTitle>Tesseract Nodes ({nodes.size})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {Array.from(nodes.values()).map(node => (
                <div key={node.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <div className="font-mono text-xs">{node.id.slice(0, 8)}</div>
                    <div className="text-sm text-gray-600">{node.dimensionalCode}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{node.energyLevel.toFixed(2)}</div>
                    <Progress value={node.timelineStability * 100} className="w-16 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weaves */}
        <Card>
          <CardHeader>
            <CardTitle>Dimensional Weaves ({weaves.size})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {Array.from(weaves.values()).map(weave => (
                <div key={weave.id} className="p-2 bg-blue-50 rounded">
                  <div className="font-mono text-xs">{weave.id.slice(0, 8)}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Nodes: {weave.nodes.length}</span>
                    <Progress value={weave.stability * 100} className="w-16 h-2" />
                  </div>
                  <div className="text-xs text-gray-600">
                    Resonance: {weave.resonanceFrequency.toFixed(1)}Hz
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rituals */}
        <Card>
          <CardHeader>
            <CardTitle>Active Rituals ({rituals.size})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {Array.from(rituals.values()).map(ritual => (
                <div key={ritual.id} className="p-2 bg-purple-50 rounded">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{ritual.name}</span>
                    <Badge className={getStatusColor(ritual.status)}>
                      {ritual.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-600">
                    Participants: {ritual.participants.length}
                  </div>
                  <div className="text-xs text-gray-600">
                    Symbols: {ritual.symbols.join(', ')}
                  </div>
                  {ritual.status === 'active' && (
                    <Progress value={ritual.energyLevel} className="w-full h-2 mt-1" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={createWeave} variant="outline" className="flex flex-col items-center p-4 h-auto">
              <RefreshCw className="w-6 h-6 mb-2" />
              Create Weave
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
              <Activity className="w-6 h-6 mb-2" />
              Stabilize Reality
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
              <Zap className="w-6 h-6 mb-2" />
              Energy Boost
            </Button>
            <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
              <Users className="w-6 h-6 mb-2" />
              Sync Participants
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
