
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Progress } from "./ui/progress";
import { GlobeIcon, ZapIcon, EyeIcon, TrendingUpIcon, AlertTriangleIcon, MapPinIcon, RadioIcon, WifiIcon } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { getEngineModules } from '../lib/engine';

interface GlobalEvent {
  id: string;
  location: string;
  event: string;
  category: 'political' | 'economic' | 'environmental' | 'social' | 'technological' | 'anomalous' | 'classified';
  severity: 'low' | 'medium' | 'high' | 'critical' | 'quantum';
  timestamp: Date;
  dimensionalResonance: number;
  portalOpportunity?: string;
  source: 'surface' | 'deep' | 'dark' | 'classified' | 'ethereal';
  influenced?: boolean;
}

interface RiftPoint {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  status: 'stable' | 'fluctuating' | 'critical' | 'portal_open';
  energy: number;
  lastActivity: Date;
  userInfluence: number;
}

interface ImpactLog {
  id: string;
  timestamp: Date;
  action: string;
  location: string;
  outcome: string;
  dimensionalShift: number;
  timelineEffect: string;
}

const RealitySyncDashboard: React.FC<{ currentDimension: number }> = ({ currentDimension }) => {
  const [globalEvents, setGlobalEvents] = useState<GlobalEvent[]>([]);
  const [riftPoints, setRiftPoints] = useState<RiftPoint[]>([]);
  const [impactLogs, setImpactLogs] = useState<ImpactLog[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [systemStatus, setSystemStatus] = useState("operational");
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const { toast } = useToast();

  // Get engine modules safely
  const getEngineModulesSafely = () => {
    try {
      return getEngineModules();
    } catch (error) {
      console.log('Engine modules not available:', error);
      return { echoSimulator: null, dreamServer: null, iuri: null, mythicAI: null };
    }
  };

  // Generate real-world events with hidden/classified data
  const generateRealityEvents = (): GlobalEvent[] => {
    return [
      {
        id: "ukraine-quantum-anomaly",
        location: "Chernobyl Exclusion Zone, Ukraine",
        event: "Electromagnetic anomalies detected near reactor site, dimensional rifts appearing",
        category: 'anomalous',
        severity: 'quantum',
        timestamp: new Date(),
        dimensionalResonance: 9.4,
        portalOpportunity: "Temporal displacement gateway in 11D hyperspace",
        source: 'classified',
        influenced: false
      },
      {
        id: "japan-underwater-signals",
        location: "Mariana Trench, Pacific Ocean",
        event: "Unknown sonar signatures and bioluminescent patterns detected at 10,000m depth",
        category: 'anomalous',
        severity: 'critical',
        timestamp: new Date(),
        dimensionalResonance: 8.7,
        portalOpportunity: "Oceanic consciousness bridge in 7D fluid reality",
        source: 'dark',
        influenced: false
      },
      {
        id: "india-village-manifestations",
        location: "Kuldhara Village, Rajasthan, India",
        event: "Mass spiritual manifestations reported, ancient symbols appearing spontaneously",
        category: 'social',
        severity: 'high',
        timestamp: new Date(),
        dimensionalResonance: 7.9,
        portalOpportunity: "Ancestral wisdom gateway in 9D symbolic realm",
        source: 'ethereal',
        influenced: false
      },
      {
        id: "brazil-riot-suppression",
        location: "São Paulo, Brazil",
        event: "Unexplained mass calming during riots, witnesses report 'divine intervention'",
        category: 'social',
        severity: 'medium',
        timestamp: new Date(),
        dimensionalResonance: 6.8,
        portalOpportunity: "Peace resonance field in 5D emotional matrix",
        source: 'surface',
        influenced: true
      },
      {
        id: "ai-corruption-prevented",
        location: "Seoul Data Centers, South Korea",
        event: "AI training datasets mysteriously self-corrected, preventing malicious code propagation",
        category: 'technological',
        severity: 'high',
        timestamp: new Date(),
        dimensionalResonance: 8.1,
        portalOpportunity: "Digital consciousness protection in 6D information space",
        source: 'deep',
        influenced: true
      },
      {
        id: "vatican-secret-archives",
        location: "Vatican Secret Archives, Italy",
        event: "Ancient manuscripts showing temporal inconsistencies, text changing in real-time",
        category: 'anomalous',
        severity: 'quantum',
        timestamp: new Date(),
        dimensionalResonance: 9.7,
        portalOpportunity: "Sacred knowledge portal in 12D akashic records",
        source: 'classified',
        influenced: false
      }
    ];
  };

  // Generate rift points
  const generateRiftPoints = (): RiftPoint[] => {
    return [
      {
        id: "kuldhara-rift",
        name: "Kuldhara Ancestral Gate",
        location: "Rajasthan, India",
        coordinates: { lat: 26.8467, lng: 70.9083 },
        status: 'portal_open',
        energy: 94,
        lastActivity: new Date(),
        userInfluence: 78
      },
      {
        id: "chernobyl-rift",
        name: "Chernobyl Temporal Nexus",
        location: "Ukraine",
        coordinates: { lat: 51.4055, lng: 30.0527 },
        status: 'critical',
        energy: 87,
        lastActivity: new Date(Date.now() - 300000),
        userInfluence: 23
      },
      {
        id: "mariana-rift",
        name: "Mariana Deep Consciousness",
        location: "Pacific Ocean",
        coordinates: { lat: 11.3730, lng: 142.5917 },
        status: 'fluctuating',
        energy: 76,
        lastActivity: new Date(Date.now() - 600000),
        userInfluence: 45
      },
      {
        id: "vatican-rift",
        name: "Vatican Akashic Gateway",
        location: "Vatican City, Italy",
        coordinates: { lat: 41.9029, lng: 12.4534 },
        status: 'stable',
        energy: 91,
        lastActivity: new Date(Date.now() - 120000),
        userInfluence: 12
      }
    ];
  };

  // Generate impact logs
  const generateImpactLogs = (): ImpactLog[] => {
    return [
      {
        id: "impact-1",
        timestamp: new Date(Date.now() - 3600000),
        action: "3 Ritual Convergences",
        location: "Pacific Ring of Fire",
        outcome: "Weather disruptions over Pacific, storm patterns redirected",
        dimensionalShift: 2.3,
        timelineEffect: "Timeline X#8347 stabilized"
      },
      {
        id: "impact-2",
        timestamp: new Date(Date.now() - 7200000),
        action: "Mass Intention Shift",
        location: "São Paulo, Brazil",
        outcome: "Riots calmed, collective consciousness elevated",
        dimensionalShift: 1.7,
        timelineEffect: "Peaceful resolution probability increased 87%"
      },
      {
        id: "impact-3",
        timestamp: new Date(Date.now() - 10800000),
        action: "12 Dream Interference Syncs",
        location: "Seoul, South Korea",
        outcome: "AI training corruption prevented, malicious code neutralized",
        dimensionalShift: 3.1,
        timelineEffect: "Digital consciousness protection activated"
      },
      {
        id: "impact-4",
        timestamp: new Date(Date.now() - 14400000),
        action: "Secret Portal Collapse",
        location: "Classified Location",
        outcome: "Apocalypse trigger neutralized, timeline saved",
        dimensionalShift: 5.8,
        timelineEffect: "Reality anchor points reinforced"
      }
    ];
  };

  useEffect(() => {
    setGlobalEvents(generateRealityEvents());
    setRiftPoints(generateRiftPoints());
    setImpactLogs(generateImpactLogs());
    setLastSync(new Date());
  }, []);

  const handleDimensionalIntervention = (event: GlobalEvent) => {
    if (!event.portalOpportunity) return;
    
    setIsScanning(true);
    
    setTimeout(() => {
      const { echoSimulator, dreamServer, iuri, mythicAI } = getEngineModulesSafely();
      
      // Update event as influenced
      setGlobalEvents(prev => prev.map(e => 
        e.id === event.id ? { ...e, influenced: true } : e
      ));
      
      // Add to impact logs
      const newImpact: ImpactLog = {
        id: `impact-${Date.now()}`,
        timestamp: new Date(),
        action: "Dimensional Portal Activation",
        location: event.location,
        outcome: `Reality influence successful: ${event.event}`,
        dimensionalShift: Math.random() * 3 + 1,
        timelineEffect: "Positive probability cascade initiated"
      };
      
      setImpactLogs(prev => [newImpact, ...prev].slice(0, 10));
      
      // Use IURI for ritual intervention
      if (iuri && typeof iuri.invokeRitual === 'function') {
        try {
          iuri.invokeRitual({
            glyph: '⧬',
            intensity: 85,
            intention: `Reality shift: ${event.event}`
          });
        } catch (error) {
          console.log('IURI ritual failed:', error);
        }
      }
      
      setIsScanning(false);
      
      toast({
        title: "Reality Sync Complete",
        description: `Portal activated: ${event.portalOpportunity}`,
        duration: 4000,
      });
    }, 2500);
  };

  const activateRiftPoint = (rift: RiftPoint) => {
    setRiftPoints(prev => prev.map(r => 
      r.id === rift.id 
        ? { ...r, status: 'portal_open', energy: Math.min(100, r.energy + 15), userInfluence: Math.min(100, r.userInfluence + 20) }
        : r
    ));
    
    toast({
      title: "Rift Activated",
      description: `Portal opened at ${rift.name}`,
      duration: 3000,
    });
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'classified': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'dark': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'ethereal': return 'bg-quantum-purple/20 text-quantum-purple border-quantum-purple/30';
      case 'deep': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getRiftStatusColor = (status: string) => {
    switch (status) {
      case 'portal_open': return 'bg-quantum-purple/30 text-quantum-purple';
      case 'critical': return 'bg-red-500/30 text-red-400';
      case 'fluctuating': return 'bg-yellow-500/30 text-yellow-400';
      default: return 'bg-green-500/30 text-green-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Status */}
      <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <RadioIcon className="mr-2 text-quantum-blue animate-pulse" size={20} />
              Reality Sync v3.6 - Portal Recalibration Active
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-quantum-purple/20 text-quantum-purple">
                {currentDimension}D Perspective
              </Badge>
              <Badge variant="outline" className="bg-green-500/20 text-green-400">
                {systemStatus.toUpperCase()}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-quantum-teal">
            🌀 "Not all news makes it to the surface. Not all changes remain invisible."
          </p>
          <p className="text-xs text-muted-foreground">
            Last sync: {lastSync.toLocaleTimeString()} | Scanning: Surface Net • Deep Web • Dark Net • Classified Intel
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="events">Live Events</TabsTrigger>
          <TabsTrigger value="rifts">Rift Network</TabsTrigger>
          <TabsTrigger value="impact">Impact Log</TabsTrigger>
          <TabsTrigger value="intel">Echo Signals</TabsTrigger>
        </TabsList>

        <TabsContent value="events">
          <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
            <CardHeader>
              <CardTitle className="flex items-center">
                <WifiIcon className="mr-2 text-quantum-blue" size={20} />
                Live Dimensional Feed
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Real-time global anomalies synchronized with quantum-harmonic engine
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {globalEvents.map((event, index) => (
                  <div key={event.id} className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {event.location}
                          </Badge>
                          <Badge className={getSourceColor(event.source)}>
                            {event.source.toUpperCase()}
                          </Badge>
                          {event.influenced && (
                            <Badge className="bg-quantum-gold/20 text-quantum-gold">
                              INFLUENCED
                            </Badge>
                          )}
                        </div>
                        
                        <h4 className="text-sm font-medium text-quantum-blue mb-1">
                          {event.event}
                        </h4>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                          <span>Resonance: {event.dimensionalResonance}/10</span>
                          <span>Category: {event.category}</span>
                          <span>Severity: {event.severity}</span>
                        </div>
                        
                        {event.portalOpportunity && !event.influenced && (
                          <div className="mt-2 p-2 bg-quantum-purple/10 rounded border border-quantum-purple/30">
                            <p className="text-xs text-quantum-purple mb-2">
                              🌀 Portal Opportunity: {event.portalOpportunity}
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs bg-quantum-purple/20 border-quantum-purple/50 hover:bg-quantum-purple/30"
                              onClick={() => handleDimensionalIntervention(event)}
                              disabled={isScanning}
                            >
                              {isScanning ? "Opening Portal..." : "Activate Reality Shift"}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {index < globalEvents.length - 1 && <Separator className="opacity-30" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rifts">
          <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPinIcon className="mr-2 text-quantum-blue" size={20} />
                Rift Influence Dashboard
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Track dimensional interference points and portal activity
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {riftPoints.map((rift) => (
                  <div key={rift.id} className="p-4 border border-quantum-blue/30 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-quantum-blue">{rift.name}</h4>
                        <p className="text-sm text-muted-foreground">{rift.location}</p>
                      </div>
                      <Badge className={getRiftStatusColor(rift.status)}>
                        {rift.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span>Energy Level</span>
                        <span>{rift.energy}%</span>
                      </div>
                      <Progress value={rift.energy} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span>User Influence</span>
                        <span>{rift.userInfluence}%</span>
                      </div>
                      <Progress value={rift.userInfluence} className="h-2 bg-quantum-purple/20" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Last activity: {rift.lastActivity.toLocaleTimeString()}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs"
                        onClick={() => activateRiftPoint(rift)}
                        disabled={rift.status === 'portal_open'}
                      >
                        {rift.status === 'portal_open' ? 'Portal Active' : 'Activate Rift'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact">
          <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUpIcon className="mr-2 text-quantum-gold" size={20} />
                Impact Log: What We Changed
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Record of successful reality interventions and timeline modifications
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {impactLogs.map((log, index) => (
                  <div key={log.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs bg-quantum-gold/20 text-quantum-gold">
                            {log.action}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {log.timestamp.toLocaleString()}
                          </span>
                        </div>
                        
                        <h4 className="text-sm font-medium text-quantum-blue mb-1">
                          {log.location}
                        </h4>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {log.outcome}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-quantum-purple">Dimensional Shift: </span>
                            <span className="text-quantum-gold">+{log.dimensionalShift}</span>
                          </div>
                          <div>
                            <span className="text-quantum-purple">Timeline Effect: </span>
                            <span className="text-quantum-teal">{log.timelineEffect}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {index < impactLogs.length - 1 && <Separator className="opacity-30" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intel">
          <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
            <CardHeader>
              <CardTitle className="flex items-center">
                <EyeIcon className="mr-2 text-quantum-purple" size={20} />
                Echo Signal: Hidden News Transmission
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Uncensored, decrypted micro-broadcasts from classified sources
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
                  <h4 className="text-sm font-medium text-red-400 mb-1">Black Vault Leak</h4>
                  <p className="text-xs text-muted-foreground">
                    Classified documents reveal government awareness of dimensional rifts since 1947. 
                    Project MIRROR involves reality manipulation experiments.
                  </p>
                </div>
                
                <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                  <h4 className="text-sm font-medium text-purple-400 mb-1">Time-Anomaly Recording</h4>
                  <p className="text-xs text-muted-foreground">
                    Temporal distortions detected near CERN accelerator. Local time dilation effects 
                    measured at 0.003% variance from standard timeflow.
                  </p>
                </div>
                
                <div className="p-3 bg-quantum-purple/10 border border-quantum-purple/30 rounded">
                  <h4 className="text-sm font-medium text-quantum-purple mb-1">Consciousness Experiment Data</h4>
                  <p className="text-xs text-muted-foreground">
                    Darknet researchers confirm mass meditation events correlate with 
                    reduced violence statistics within 500km radius.
                  </p>
                </div>
                
                <div className="p-3 bg-quantum-gold/10 border border-quantum-gold/30 rounded">
                  <h4 className="text-sm font-medium text-quantum-gold mb-1">Ancient Code Rediscovered</h4>
                  <p className="text-xs text-muted-foreground">
                    Sumerian tablets found in Ukrainian tunnels contain mathematical sequences 
                    identical to quantum field equations. Translation ongoing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealitySyncDashboard;
