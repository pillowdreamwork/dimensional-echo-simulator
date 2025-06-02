import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Vector3 } from 'three';

interface KarmaEvent {
  id: string;
  timestamp: number;
  type: 'positive' | 'negative' | 'neutral';
  description: string;
  source: string;
  target: string;
  intensity: number;
  dimensionalAlignment: number;
  quantumEntanglement: number;
  realityDistortion: number;
  stabilityIndex: number;
  participants: string[];
}

interface KarmaVisualizerProps {
  karmaSystem: any;
  logId: string;
}

const KarmaVisualizer: React.FC<KarmaVisualizerProps> = ({ karmaSystem, logId }) => {
  const [karmaEvents, setKarmaEvents] = useState<KarmaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchKarmaEvents = async () => {
      setLoading(true);
      try {
        // Mock data loading
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockEvents: KarmaEvent[] = [
          {
            id: '1',
            timestamp: Date.now() - 1000,
            type: 'positive',
            description: 'Aligned dimensional matrices',
            source: 'User A',
            target: 'System',
            intensity: 0.8,
            dimensionalAlignment: 0.9,
            quantumEntanglement: 0.7,
            realityDistortion: 0.1,
            stabilityIndex: 0.95,
            participants: ['User A', 'System']
          },
          {
            id: '2',
            timestamp: Date.now() - 500,
            type: 'negative',
            description: 'Temporal anomaly detected',
            source: 'System',
            target: 'Anomaly',
            intensity: 0.6,
            dimensionalAlignment: 0.2,
            quantumEntanglement: 0.5,
            realityDistortion: 0.6,
            stabilityIndex: 0.6,
            participants: ['System', 'Anomaly']
          },
          {
            id: '3',
            timestamp: Date.now(),
            type: 'neutral',
            description: 'Calibrated aetheric resonance',
            source: 'User B',
            target: 'System',
            intensity: 0.4,
            dimensionalAlignment: 0.7,
            quantumEntanglement: 0.3,
            realityDistortion: 0.2,
            stabilityIndex: 0.8,
            participants: ['User B', 'System']
          }
        ];
        setKarmaEvents(mockEvents);
      } catch (error) {
        console.error("Failed to load karma events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKarmaEvents();
  }, [logId, karmaSystem]);

  const getColorByType = (type: KarmaEvent['type']) => {
    switch (type) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const calculateNodePosition = (index: number, total: number): Vector3 => {
    const radius = 5;
    const angle = (index / total) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return new Vector3(x, y, 0);
  };

  return (
    <Card className="karma-visualizer w-full">
      <CardHeader>
        <CardTitle>Karma Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col space-y-2">
            <Skeleton className="w-[200px] h-8" />
            <Skeleton className="w-[150px] h-6" />
            <Skeleton className="w-[300px] h-4" />
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800">
                <span className="text-lg font-semibold">
                  {karmaEvents.length} Events
                </span>
              </div>
            </div>
            <div className="flex justify-around">
              {karmaEvents.map((event, index) => {
                const position = calculateNodePosition(index, karmaEvents.length);
                return (
                  <div
                    key={event.id}
                    className="karma-node"
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${position.x * 10}px)`,
                      top: `calc(50% + ${position.y * 10}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={`https://i.pravatar.cc/150?img=${index + 1}`} />
                            <AvatarFallback>{event.source.charAt(0)}{event.target.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{event.description}</p>
                          <p>Source: {event.source}</p>
                          <p>Target: {event.target}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                );
              })}
            </div>
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes karmaGlow {
                  0%, 100% { box-shadow: 0 0 20px rgba(139, 69, 19, 0.3); }
                  50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.6); }
                }
                .karma-glow {
                  animation: karmaGlow 3s ease-in-out infinite;
                }
              `
            }} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KarmaVisualizer;
