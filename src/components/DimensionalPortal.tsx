
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { 
  Radio, 
  Portal, 
  Layers3, 
  Sparkles, 
  Zap, 
  Eye,
  Waves,
  Settings,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

interface PortalState {
  isActive: boolean;
  energy: number;
  stability: number;
  dimension: number;
  resonance: number;
  consciousness: number;
}

interface EnvironmentalEffect {
  id: string;
  type: 'visual' | 'audio' | 'dimensional';
  intensity: number;
  active: boolean;
}

export const DimensionalPortal: React.FC = () => {
  const { toast } = useToast();
  const [portalState, setPortalState] = useState<PortalState>({
    isActive: false,
    energy: 75,
    stability: 88,
    dimension: 3.5,
    resonance: 92,
    consciousness: 67
  });

  const [effects, setEffects] = useState<EnvironmentalEffect[]>([
    { id: 'echo', type: 'audio', intensity: 45, active: false },
    { id: 'overlay', type: 'visual', intensity: 60, active: false },
    { id: 'distortion', type: 'dimensional', intensity: 30, active: false },
    { id: 'quantum-blur', type: 'visual', intensity: 25, active: false }
  ]);

  // Portal activation system
  const togglePortal = useCallback(() => {
    setPortalState(prev => {
      const newState = { ...prev, isActive: !prev.isActive };
      
      if (newState.isActive) {
        toast({
          title: "🌌 Portal Activated",
          description: "Dimensional gateway is now online. Reality overlay enabled.",
        });
      } else {
        toast({
          title: "Portal Deactivated",
          description: "Returning to baseline reality state.",
        });
      }
      
      return newState;
    });
  }, [toast]);

  // Environmental effect management
  const toggleEffect = useCallback((effectId: string) => {
    setEffects(prev => prev.map(effect => 
      effect.id === effectId 
        ? { ...effect, active: !effect.active }
        : effect
    ));
  }, []);

  const updateEffectIntensity = useCallback((effectId: string, intensity: number) => {
    setEffects(prev => prev.map(effect => 
      effect.id === effectId 
        ? { ...effect, intensity }
        : effect
    ));
  }, []);

  // Real-time state updates
  useEffect(() => {
    if (!portalState.isActive) return;

    const interval = setInterval(() => {
      setPortalState(prev => ({
        ...prev,
        energy: Math.max(20, Math.min(100, prev.energy + (Math.random() - 0.5) * 5)),
        stability: Math.max(50, Math.min(100, prev.stability + (Math.random() - 0.5) * 3)),
        resonance: Math.max(70, Math.min(100, prev.resonance + (Math.random() - 0.5) * 2)),
        consciousness: Math.max(40, Math.min(100, prev.consciousness + (Math.random() - 0.5) * 4))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [portalState.isActive]);

  const getStatusColor = (value: number) => {
    if (value > 80) return 'text-green-500';
    if (value > 60) return 'text-yellow-500';
    if (value > 40) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Portal Control Header */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Portal className="text-purple-400" size={28} />
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Dimensional Portal Interface
                </h2>
                <p className="text-sm text-gray-500">Advanced Reality Manipulation System</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant={portalState.isActive ? "default" : "secondary"}>
                {portalState.isActive ? "ACTIVE" : "STANDBY"}
              </Badge>
              <Button
                onClick={togglePortal}
                className={`flex items-center space-x-2 ${
                  portalState.isActive 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {portalState.isActive ? <Pause size={16} /> : <Play size={16} />}
                <span>{portalState.isActive ? 'Deactivate' : 'Activate'}</span>
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Real-time Status Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-purple-200/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Energy</span>
              <Zap className="text-yellow-500" size={16} />
            </div>
            <div className={`text-2xl font-bold ${getStatusColor(portalState.energy)}`}>
              {portalState.energy.toFixed(1)}%
            </div>
            <Progress value={portalState.energy} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-purple-200/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Stability</span>
              <Layers3 className="text-blue-500" size={16} />
            </div>
            <div className={`text-2xl font-bold ${getStatusColor(portalState.stability)}`}>
              {portalState.stability.toFixed(1)}%
            </div>
            <Progress value={portalState.stability} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-purple-200/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Resonance</span>
              <Waves className="text-green-500" size={16} />
            </div>
            <div className={`text-2xl font-bold ${getStatusColor(portalState.resonance)}`}>
              {portalState.resonance.toFixed(1)}%
            </div>
            <Progress value={portalState.resonance} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-purple-200/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Consciousness</span>
              <Eye className="text-purple-500" size={16} />
            </div>
            <div className={`text-2xl font-bold ${getStatusColor(portalState.consciousness)}`}>
              {portalState.consciousness.toFixed(1)}%
            </div>
            <Progress value={portalState.consciousness} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Control Interface */}
      <Tabs defaultValue="navigation" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-purple-900/20">
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="effects">Environmental</TabsTrigger>
          <TabsTrigger value="multimedia">Multimedia</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="navigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dimensional Navigation Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Dimensional Frequency</span>
                  <span className="text-sm text-muted-foreground">{portalState.dimension.toFixed(1)}D</span>
                </div>
                <Slider
                  value={[portalState.dimension]}
                  onValueChange={([value]) => setPortalState(prev => ({ ...prev, dimension: value }))}
                  min={1}
                  max={12}
                  step={0.1}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <Radio className="mb-2" size={20} />
                  <span className="text-xs">Echo Scan</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <Sparkles className="mb-2" size={20} />
                  <span className="text-xs">Manifest</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <RotateCcw className="mb-2" size={20} />
                  <span className="text-xs">Reset</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="effects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Modification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {effects.map((effect) => (
                  <div key={effect.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant={effect.active ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleEffect(effect.id)}
                        >
                          {effect.active ? 'ON' : 'OFF'}
                        </Button>
                        <span className="font-medium capitalize">{effect.id}</span>
                        <Badge variant="outline">{effect.type}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {effect.intensity}%
                      </span>
                    </div>
                    <Slider
                      value={[effect.intensity]}
                      onValueChange={([value]) => updateEffectIntensity(effect.id, value)}
                      max={100}
                      step={1}
                      className="w-full"
                      disabled={!effect.active}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="multimedia" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Multimedia Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                  <Layers3 className="mb-2" size={24} />
                  <span className="text-sm">Collage Maker</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                  <Sparkles className="mb-2" size={24} />
                  <span className="text-sm">Superimpose</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                  <Waves className="mb-2" size={24} />
                  <span className="text-sm">Audio Echo</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                  <Eye className="mb-2" size={24} />
                  <span className="text-sm">Visual Filters</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portal Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2" size={16} />
                  Advanced Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Radio className="mr-2" size={16} />
                  Calibrate Sensors
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Zap className="mr-2" size={16} />
                  Energy Management
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DimensionalPortal;
