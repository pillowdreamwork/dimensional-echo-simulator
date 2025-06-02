import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

// Mock hooks and services  
const useQuantumState = () => ({
  quantumState: { activeRitualId: null },
  updateQuantumState: (update: any) => console.log('Updating quantum state:', update)
});

const useRealTimeSync = (config: any) => ({
  syncState: { 
    connection: { status: 'connected' },
    lastKarmaEvent: null,
    lastDimensionalShift: null
  },
  sendQuantumUpdate: (state: any, nodeId: string) => console.log('Sending quantum update'),
  sendKarmaEvent: (event: any) => console.log('Sending karma event'),
  sendDimensionalShift: (source: string, target: string, magnitude: number) => console.log('Sending dimensional shift')
});

const askGPT = async (prompt: string): Promise<string> => {
  return `Mock roles for ritual: Role 1\nRole 2\nRole 3`;
};

// Helper to create a valid RitualKarmaEvent
function createRitualKarmaEvent(
  type: 'ritual_created' | 'ritual_contribution' | 'ritual_evolved',
  payload: any,
  nodeId: string,
  targetNode: string,
  resonancePattern: string[] = [],
  dimensionalImpact: { local: number; global: number; temporal: number } = { local: 0, global: 0, temporal: 0 }
): any {
  return {
    id: uuidv4(),
    type,
    karmaType: 'neutral',
    resonancePattern,
    dimensionalImpact,
    intensity: 1,
    sourceNode: nodeId,
    targetNode,
    timestamp: Date.now(),
    payload,
    metadata: {
      catalystGlyph: '',
      harmonicFrequency: 0,
      stabilityIndex: 0,
    },
  };
}

export function DreamCouncil() {
  const { toast } = useToast();
  const { quantumState, updateQuantumState } = useQuantumState();
  const [rituals, setRituals] = useState<any[]>([]);
  const [selectedRitual, setSelectedRitual] = useState<any>(null);
  const [isEvolvingRitual, setIsEvolvingRitual] = useState(false);
  const [evolutionLog, setEvolutionLog] = useState<string>('');
  const nodeId = useRef(uuidv4()).current;
  const { syncState, sendQuantumUpdate, sendKarmaEvent, sendDimensionalShift } = useRealTimeSync({
    url: process.env.WEBSOCKET_URL || 'ws://localhost:3001',
    autoConnect: true,
    retryOnDisconnect: true
  });

  // Monitor connection state and handle reconnections
  useEffect(() => {
    const handleConnectionChange = (status: string) => {
      if (status === 'connected') {
        toast({
          title: 'Dream Council Connected',
          description: 'Real-time synchronization active',
          duration: 3000,
        });
      } else if (status === 'error') {
        toast({
          title: 'Connection Error',
          description: 'Failed to connect to Dream Council network',
          variant: 'destructive',
        });
      }
    };

    handleConnectionChange(syncState.connection.status);
  }, [syncState.connection.status, toast]);

  async function createGroupRitual(name: string, participantCount: number) {
    try {
      const roles = await askGPT(`Generate ${participantCount} unique quantum ritual roles for ritual: ${name}`);
      const roleList = roles.split('\n').filter(Boolean);
      
      const newRitual = {
        id: uuidv4(),
        name,
        participants: roleList.map((role, i) => ({
          id: `p${i}`,
          name: `Dreamer ${i + 1}`,
          role,
          contribution: '',
          connected: false,
          lastActive: new Date()
        })),
        state: 'preparing',
        resonanceScore: 0
      };

      setRituals(prev => [...prev, newRitual]);
      
      toast({
        title: 'Ritual Created',
        description: `Created ritual "${name}" with ${participantCount} roles`,
        duration: 5000
      });

      return newRitual;
    } catch (error) {
      toast({
        title: 'Error Creating Ritual',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive'
      });
      throw error;
    }
  }

  // Simplified helper functions
  const formatTimestamp = (date: Date | undefined): string => {
    if (!date) return 'Never';
    return date.toLocaleTimeString();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dream Council</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={() => createGroupRitual("New Ritual", 5)}
              disabled={isEvolvingRitual}
            >
              Create New Ritual
            </Button>
            <Badge 
              variant={syncState.connection.status === 'connected' ? 'default' : 'destructive'}
            >
              {syncState.connection.status.toUpperCase()}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Ritual List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Active Rituals</h3>
              {rituals.map(ritual => (
                <Card
                  key={ritual.id}
                  className={`cursor-pointer transition-all ${
                    selectedRitual?.id === ritual.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedRitual(ritual)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{ritual.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {ritual.participants.length} participants
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={'secondary'}>
                          {ritual.state}
                        </Badge>
                        <div className="mt-1">
                          <Progress value={ritual.resonanceScore} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Ritual Details */}
            {selectedRitual && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Ritual Details</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">{selectedRitual.name}</h4>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm">Resonance Score</span>
                          <span className="font-mono">{selectedRitual.resonanceScore.toFixed(2)}%</span>
                        </div>
                        <Progress 
                          value={selectedRitual.resonanceScore}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <h5 className="text-sm font-medium mb-2">Participants</h5>
                        {selectedRitual.participants.map((participant: any) => (
                          <div
                            key={participant.id}
                            className="border rounded-lg p-3 mb-2"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <div>
                                <span className="font-medium">{participant.name}</span>
                                <p className="text-sm text-muted-foreground">
                                  {participant.role}
                                </p>
                              </div>
                              <Badge variant={'default'}>
                                {participant.connected ? 'Connected' : 'Offline'}
                              </Badge>
                            </div>
                            <textarea
                              className="w-full min-h-[60px] p-2 text-sm border rounded-md"
                              value={participant.contribution}
                              onChange={(e) => console.log('Updating contribution')}
                              placeholder="Enter your contribution..."
                              disabled={!participant.connected}
                            />
                            <div className="text-xs text-muted-foreground mt-1">
                              Last active: {formatTimestamp(participant.lastActive)}
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => console.log('Evolving ritual')}
                        disabled={isEvolvingRitual}
                      >
                        {isEvolvingRitual ? 'Evolving...' : 'Begin Evolution'}
                      </Button>

                      {isEvolvingRitual && (
                        <div className="border rounded-lg p-4 bg-muted">
                          <h5 className="font-medium mb-2">Evolution Log</h5>
                          <div className="text-sm whitespace-pre-wrap">
                            {evolutionLog}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
