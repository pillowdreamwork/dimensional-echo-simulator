
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { GlobeIcon, ZapIcon, EyeIcon, TrendingUpIcon, AlertTriangleIcon } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { getEngineModules } from '../lib/engine';

interface GlobalEvent {
  id: string;
  location: string;
  event: string;
  category: 'political' | 'economic' | 'environmental' | 'social' | 'technological';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  dimensionalResonance: number;
  portalOpportunity?: string;
}

interface RealityMonitorProps {
  currentDimension: number;
}

const RealityMonitor: React.FC<RealityMonitorProps> = ({ currentDimension }) => {
  const [globalEvents, setGlobalEvents] = useState<GlobalEvent[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { toast } = useToast();
  
  // Get engine modules safely
  const getEngineModulesSafely = () => {
    try {
      return getEngineModules();
    } catch (error) {
      console.log('Engine modules not available:', error);
      return { echoSimulator: null, dreamServer: null, iuri: null };
    }
  };

  // Simulate real global events (these represent actual types of events happening worldwide)
  const generateRealWorldEvents = (): GlobalEvent[] => {
    const currentEvents: GlobalEvent[] = [
      {
        id: "ukraine-conflict",
        location: "Eastern Europe",
        event: "Ongoing conflict affecting global food and energy security",
        category: 'political',
        severity: 'critical',
        timestamp: new Date(),
        dimensionalResonance: 8.7,
        portalOpportunity: "Peace resonance portal in 4D space-time"
      },
      {
        id: "climate-change",
        location: "Global",
        event: "Climate change driving extreme weather patterns worldwide",
        category: 'environmental',
        severity: 'critical',
        timestamp: new Date(),
        dimensionalResonance: 9.2,
        portalOpportunity: "Ecological harmony gateway in 6D consciousness"
      },
      {
        id: "ai-development",
        location: "Silicon Valley, USA",
        event: "Rapid AI advancement reshaping technological landscape",
        category: 'technological',
        severity: 'high',
        timestamp: new Date(),
        dimensionalResonance: 7.4,
        portalOpportunity: "Intelligence amplification bridge in 8D harmonic space"
      },
      {
        id: "economic-uncertainty",
        location: "Global Markets",
        event: "Inflation and supply chain disruptions affecting global economy",
        category: 'economic',
        severity: 'high',
        timestamp: new Date(),
        dimensionalResonance: 6.8,
        portalOpportunity: "Abundance manifestation portal in 5D probability field"
      },
      {
        id: "social-polarization",
        location: "Multiple Countries",
        event: "Rising political and social divisions across democracies",
        category: 'social',
        severity: 'high',
        timestamp: new Date(),
        dimensionalResonance: 7.1,
        portalOpportunity: "Unity consciousness gateway in 7D symbolic realm"
      },
      {
        id: "space-exploration",
        location: "Mars & Moon",
        event: "Renewed space exploration efforts by multiple nations",
        category: 'technological',
        severity: 'medium',
        timestamp: new Date(),
        dimensionalResonance: 5.9,
        portalOpportunity: "Cosmic expansion bridge in 10D unified field"
      }
    ];

    return currentEvents;
  };

  useEffect(() => {
    // Initialize with current global events
    setGlobalEvents(generateRealWorldEvents());
    setLastUpdate(new Date());
  }, []);

  const handleDimensionalIntervention = (event: GlobalEvent) => {
    if (!event.portalOpportunity) return;
    
    setIsMonitoring(true);
    
    // Simulate using our dimensional system to create positive influence
    setTimeout(() => {
      // Get engine modules safely
      const { echoSimulator, dreamServer, iuri } = getEngineModulesSafely();
      
      // Use IURI for ritual intervention if available
      if (iuri && typeof iuri.invokeRitual === 'function') {
        try {
          const ritualResult = iuri.invokeRitual({
            glyph: '☉', // Transcendent unity glyph
            intensity: 75,
            intention: `Positive influence on: ${event.event}`
          });
          
          toast({
            title: "Dimensional Intervention Initiated",
            description: `Portal opened: ${event.portalOpportunity}`,
            duration: 4000,
          });
        } catch (error) {
          console.log('IURI ritual invocation failed:', error);
        }
      }
      
      // Create timeline ripple effect
      if (echoSimulator && typeof echoSimulator.createRippleEffect === 'function') {
        try {
          echoSimulator.createRippleEffect({
            description: `Positive intervention in ${event.location}`,
            dimension: currentDimension
          });
        } catch (error) {
          console.log('Echo simulator ripple effect failed:', error);
        }
      }
      
      setIsMonitoring(false);
      
      toast({
        title: "Reality Influence Complete",
        description: `Quantum resonance sent to ${event.location} through ${currentDimension}D portal`,
        duration: 3000,
      });
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'political': return <AlertTriangleIcon size={16} />;
      case 'economic': return <TrendingUpIcon size={16} />;
      case 'environmental': return <GlobeIcon size={16} />;
      case 'social': return <EyeIcon size={16} />;
      case 'technological': return <ZapIcon size={16} />;
      default: return <GlobeIcon size={16} />;
    }
  };

  return (
    <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <GlobeIcon className="mr-2 text-quantum-blue" size={20} />
            Reality Monitoring System
          </CardTitle>
          <Badge variant="outline" className="bg-quantum-blue/20 text-quantum-blue">
            {currentDimension}D Perspective
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Current global events and dimensional intervention opportunities
        </p>
        <p className="text-xs text-quantum-teal">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {globalEvents.map((event, index) => (
            <div key={event.id} className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(event.category)}
                    <Badge variant="outline" className="text-xs">
                      {event.location}
                    </Badge>
                    <Badge className={getSeverityColor(event.severity)}>
                      {event.severity}
                    </Badge>
                  </div>
                  
                  <h4 className="text-sm font-medium text-quantum-blue mb-1">
                    {event.event}
                  </h4>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Dimensional Resonance: {event.dimensionalResonance}/10</span>
                    <span>Category: {event.category}</span>
                  </div>
                  
                  {event.portalOpportunity && (
                    <div className="mt-2 p-2 bg-quantum-purple/10 rounded border border-quantum-purple/30">
                      <p className="text-xs text-quantum-purple">
                        🌀 Portal Opportunity: {event.portalOpportunity}
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2 h-7 text-xs bg-quantum-purple/20 border-quantum-purple/50 hover:bg-quantum-purple/30"
                        onClick={() => handleDimensionalIntervention(event)}
                        disabled={isMonitoring}
                      >
                        {isMonitoring ? "Opening Portal..." : "Send Positive Resonance"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {index < globalEvents.length - 1 && <Separator className="opacity-30" />}
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-quantum-teal/10 rounded border border-quantum-teal/30">
          <p className="text-xs text-quantum-teal">
            ⚡ Through {currentDimension}D awareness, our collective consciousness can theoretically influence global events by sending positive intentions and quantum resonance across dimensional boundaries.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealityMonitor;
