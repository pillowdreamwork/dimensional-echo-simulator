import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { GlobeIcon, ZapIcon, EyeIcon } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { getEngineModules } from '../lib/engine';
import { generateRealWorldEvents } from '../utils/eventGenerator';

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
  const [stabilityIndex, setStabilityIndex] = useState(100);
  const [dimensionalFlux, setDimensionalFlux] = useState(0);
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

  const { echoSimulator, dreamServer, iuri } = getEngineModulesSafely();

  const analyzeDimensionalStability = (events: GlobalEvent[]) => {
    const totalResonance = events.reduce((sum, evt) => sum + evt.dimensionalResonance, 0);
    const avgResonance = totalResonance / events.length;
    const flux = Math.abs(avgResonance - currentDimension);
    setDimensionalFlux(flux);
    
    const stability = 100 - (flux * 10);
    setStabilityIndex(Math.max(0, Math.min(100, stability)));
    
    if (stability < 50) {
      toast({
        title: "Dimensional Instability Detected",
        description: `Current stability index: ${stability.toFixed(1)}%. Intervention recommended.`,
        variant: "destructive"
      });
    }
  };

  const processEvents = (rawEvents: GlobalEvent[]) => {
    if (echoSimulator) {
      const processedEvents = rawEvents.map(event => ({
        ...event,
        dimensionalResonance: echoSimulator.calculateResonance(event)
      }));
      setGlobalEvents(processedEvents);
      analyzeDimensionalStability(processedEvents);
    } else {
      setGlobalEvents(rawEvents);
      analyzeDimensionalStability(rawEvents);
    }
  };

  const startMonitoring = () => {
    setIsMonitoring(true);
    const monitoringInterval = setInterval(() => {
      const newEvents = generateRealWorldEvents();
      processEvents(newEvents);
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(monitoringInterval);
  };

  useEffect(() => {
    const initialEvents = generateRealWorldEvents();
    processEvents(initialEvents);

    if (isMonitoring) {
      const cleanup = startMonitoring();
      return cleanup;
    }
  }, [isMonitoring, currentDimension]);

  const handlePortalDetection = (event: GlobalEvent) => {
    if (iuri && event.portalOpportunity) {
      const portalStrength = iuri.analyzePortalOpportunity(event);
      if (portalStrength > 0.7) {
        toast({
          title: "Portal Opportunity Detected",
          description: event.portalOpportunity,
          variant: "default"
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GlobeIcon className="h-6 w-6" />
            Reality Monitor
          </div>
          <Badge variant={stabilityIndex > 70 ? "default" : "destructive"}>
            Stability: {stabilityIndex.toFixed(1)}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ZapIcon className="h-4 w-4" />
              <span>Dimensional Flux: {dimensionalFlux.toFixed(2)}</span>
            </div>
            <Button 
              variant={isMonitoring ? "destructive" : "default"}
              onClick={() => setIsMonitoring(!isMonitoring)}
            >
              {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
            </Button>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            {globalEvents.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{event.location}</h3>
                  <Badge variant={
                    event.severity === 'critical' ? "destructive" :
                    event.severity === 'high' ? "secondary" :
                    "default"
                  }>
                    {event.severity.toUpperCase()}
                  </Badge>
                </div>
                <p>{event.event}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>Resonance: {event.dimensionalResonance.toFixed(1)}</span>
                  {event.portalOpportunity && (
                    <span 
                      className="flex items-center gap-1 cursor-pointer hover:text-blue-500"
                      onClick={() => handlePortalDetection(event)}
                    >
                      <EyeIcon className="h-4 w-4" />
                      Portal Opportunity
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealityMonitor;
