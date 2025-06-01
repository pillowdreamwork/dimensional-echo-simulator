import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useQuantumState } from '@/hooks/use-quantum-state';
import { useRealTimeSync } from '@/hooks/use-real-time-sync';
import { askGPT } from '@/lib/ai/gptService';
import type { QuantumState } from '@/types/quantum';
import type { GroupRitual, Participant, RitualKarmaEvent } from '@/types/ritual';
import type { KarmaEvent } from '@/lib/cores/karma-reflection';

import { formatDistanceToNow } from 'date-fns';

function createSyncedQuantumState(
  base: QuantumState,
  ritual: GroupRitual | null
): QuantumState {
  return {
    ...base,
    activeRitualId: ritual?.id ?? base.activeRitualId,
    lastEvolvedRitualId: ritual?.id ?? base.lastEvolvedRitualId,
    dimensionalShift: ritual?.resonanceScore ?? base.dimensionalShift,
    ritualParticipants: ritual
      ? {
          ...base.ritualParticipants,
          [ritual.id]: Object.fromEntries(
            ritual.participants.map((p) => [
              p.id,
              { lastActive: p.lastActive.getTime(), connected: p.connected },
            ])
          ),
        }
      : base.ritualParticipants,
  };
}

// Helper to create a valid RitualKarmaEvent
function createRitualKarmaEvent(
  type: 'ritual_created' | 'ritual_contribution' | 'ritual_evolved',
  payload: RitualKarmaEvent['payload'],
  nodeId: string,
  targetNode: string,
  resonancePattern: string[] = [],
  dimensionalImpact: { local: number; global: number; temporal: number } = { local: 0, global: 0, temporal: 0 }
): RitualKarmaEvent {
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

export const DreamCouncil = memo(function DreamCouncil() {
  const { toast } = useToast();
  const { quantumState, updateQuantumState } = useQuantumState();
  const [rituals, setRituals] = useState<GroupRitual[]>([]);
  const [selectedRitual, setSelectedRitual] = useState<GroupRitual | null>(null);
  const [isEvolvingRitual, setIsEvolvingRitual] = useState(false);
  const [evolutionLog, setEvolutionLog] = useState<string>('');
  const nodeId = useRef(uuidv4()).current;
  const { syncState, sendQuantumUpdate, sendKarmaEvent, sendDimensionalShift } = useRealTimeSync({
    url: process.env.WEBSOCKET_URL || 'ws://localhost:3001',
    autoConnect: true,
    retryOnDisconnect: true
  });

  // Initialize real-time sync
  useEffect(() => {
    // Monitor connection state and handle reconnections
    const handleConnectionChange = (status: string) => {
      if (status === 'connected') {
        toast({
          title: 'Dream Council Connected',
          description: 'Real-time synchronization active',
          duration: 3000,
        });
        // When connected, send current state to sync with other participants
        if (selectedRitual) {
          const updatedState = createSyncedQuantumState(quantumState, selectedRitual);
          sendQuantumUpdate(updatedState, nodeId);
        }
      } else if (status === 'error') {
        toast({
          title: 'Connection Error',
          description: 'Failed to connect to Dream Council network',
          variant: 'destructive',
        });
      }
    };

    handleConnectionChange(syncState.connection.status);
  }, [syncState.connection.status, toast, selectedRitual, quantumState, sendQuantumUpdate]);

  // Synchronize ritual state with quantum state
  useEffect(() => {
    if (quantumState.activeRitualId) {
      const ritual = rituals.find((r) => r.id === quantumState.activeRitualId);
      if (ritual && ritual.id !== selectedRitual?.id) {
        setSelectedRitual(ritual);
      }
    }
  }, [quantumState.activeRitualId, rituals, selectedRitual]);

  // Handle participant updates
  useEffect(() => {
    if (!selectedRitual || !syncState.lastKarmaEvent) return;
    const event = syncState.lastKarmaEvent.event as RitualKarmaEvent;
    if (event.type === 'ritual_contribution' && event.payload.ritualId === selectedRitual.id) {
      const updatedRitual = { ...selectedRitual };
      const participant = updatedRitual.participants.find((p) => p.id === event.payload.participantId);
      if (participant && event.payload.contribution) {
        participant.contribution = event.payload.contribution;
        participant.lastActive = new Date();
        participant.connected = true;
        updatedRitual.resonanceScore = calculateResonanceScore(updatedRitual);
        setSelectedRitual(updatedRitual);
        setRituals((prev) => prev.map((r) => (r.id === updatedRitual.id ? updatedRitual : r)));
        sendDimensionalShift(
          participant.id,
          updatedRitual.id,
          updatedRitual.resonanceScore
        );
      }
    }
  }, [syncState.lastKarmaEvent, selectedRitual, sendDimensionalShift]);

  // Handle incoming dimensional shifts
  useEffect(() => {
    if (!syncState.lastDimensionalShift || !selectedRitual) return;

    const { magnitude, targetId } = syncState.lastDimensionalShift;
    if (targetId === selectedRitual.id) {
      const updatedRitual = {
        ...selectedRitual,
        resonanceScore: Math.max(0, Math.min(100, magnitude))
      };
      setSelectedRitual(updatedRitual);
      setRituals(prev => prev.map(r => 
        r.id === updatedRitual.id ? updatedRitual : r
      ));

      // Update quantum state with new resonance
      updateQuantumState({
        ...quantumState,
        activeRitualId: updatedRitual.id,
        lastEvolvedRitualId: updatedRitual.id,
        dimensionalShift: magnitude,
      });
    }
  }, [syncState.lastDimensionalShift, selectedRitual, quantumState, updateQuantumState]);

  async function createGroupRitual(name: string, participantCount: number) {
    try {
      const roles = await askGPT(
        `Generate ${participantCount} unique quantum ritual roles for ritual: ${name}`,
        { systemPrompt: 'You are a quantum ritual architect specializing in group consciousness harmonization.' }
      );

      const roleList = roles.split('\n').filter(Boolean);
      const newRitual: GroupRitual = {
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
      
      // Notify other participants with a properly formed karma event
      const karmaEvent = createRitualKarmaEvent(
        'ritual_created',
        {
          ritualId: newRitual.id,
          name: newRitual.name,
          participantCount,
          dimensionalImpact: 0,
        },
        nodeId,
        newRitual.id,
        [],
        { local: 0, global: 0, temporal: 0 }
      );
      sendKarmaEvent(karmaEvent);

      // Update quantum state with new ritual
      updateQuantumState({
        ...quantumState,
        activeRitualId: newRitual.id,
        lastEvolvedRitualId: newRitual.id,
        dimensionalShift: 0,
        ritualParticipants: {
          ...quantumState.ritualParticipants,
          [newRitual.id]: Object.fromEntries(
            newRitual.participants.map(p => [
              p.id,
              { lastActive: Date.now(), connected: false }
            ])
          )
        }
      });

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

  const generateCatalystGlyph = (ritual: GroupRitual): string => {
    const activeParticipants = ritual.participants.filter(p => p.connected);
    const contribs = activeParticipants.map(p => p.contribution);
    
    // Create a hash from contributions
    const hash = contribs.join('').split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    
    // Convert hash to hexadecimal glyph representation
    return Math.abs(hash).toString(16).padStart(8, '0');
  };

  const calculateHarmonicFrequency = (ritual: GroupRitual): number => {
    const baseFrequency = 432; // Base frequency in Hz
    const participantMultiplier = ritual.participants.length / 12; // Normalize for max 12 participants
    const resonanceModifier = ritual.resonanceScore / 100;
    
    return baseFrequency * (1 + participantMultiplier * resonanceModifier);
  };

  const calculateStabilityIndex = (ritual: GroupRitual): number => {
    if (ritual.participants.length === 0) return 0;
    
    // Calculate average contribution length per participant
    const avgContributionLength = ritual.participants.reduce(
      (sum, p) => sum + p.contribution.length,
      0
    ) / ritual.participants.length;
    
    // Calculate time-based stability
    const now = Date.now();
    const timeStability = ritual.participants.reduce((sum, p) => {
      const timeDiff = now - p.lastActive.getTime();
      return sum + Math.max(0, 1 - timeDiff / (30 * 60 * 1000)); // 30 minutes decay
    }, 0) / ritual.participants.length;
    
    // Combine factors
    const contributionFactor = Math.min(1, avgContributionLength / 1000);
    const resonanceFactor = ritual.resonanceScore / 100;
    
    return (contributionFactor * 0.4 + timeStability * 0.3 + resonanceFactor * 0.3) * 100;
  };

  const calculateResonanceScore = (ritual: GroupRitual): number => {
    const activeParticipants = ritual.participants.filter(p => 
      p.connected && p.contribution.length > 0
    );
    
    if (activeParticipants.length === 0) return 0;
    
    const baseScore = (activeParticipants.length / ritual.participants.length) * 100;
    const contributionScore = activeParticipants.reduce((score, p) => {
      const timeSinceLastActive = Date.now() - p.lastActive.getTime();
      const recency = Math.max(0, 1 - (timeSinceLastActive / (15 * 60 * 1000))); // 15 minutes max
      return score + (recency * (p.contribution.length / 500)); // Contribution length factor
    }, 0);
    
    return Math.min(100, (baseScore + contributionScore) / 2);
  };

  async function evolveRitual(ritual: GroupRitual) {
    setIsEvolvingRitual(true);
    setEvolutionLog('');
    
    const startTime = new Date();
    const updatedRitual: GroupRitual = {
      ...ritual,
      state: 'active',
      startTime
    };
    setSelectedRitual(updatedRitual);

    // Start evolution
    const evolvedDescription = `[Evolution in progress for ritual "${ritual.name}"]`;
    setEvolutionLog(evolvedDescription);

    // Calculate dimensional impact
    const dimensionalImpact = Math.min(10, 
      ritual.participants.length * 
      (ritual.resonanceScore / 100) * 
      Math.random() * 3
    );

    const completionTime = new Date();
    const finalRitual: GroupRitual = {
      ...updatedRitual,
      state: 'complete',
      completionTime,
      dimensionalImpact
    };

    // Update rituals
    setRituals(prev => prev.map(r => r.id === ritual.id ? finalRitual : r));
    setSelectedRitual(finalRitual);
    setIsEvolvingRitual(false);

    // Notify the network of completion
    sendDimensionalShift(ritual.id, 'quantum_fabric', dimensionalImpact);
    
    // Update quantum state
    updateQuantumState({
      lastEvolvedRitualId: finalRitual.id,
      dimensionalShift: (quantumState.dimensionalShift || 0) + dimensionalImpact,
      dimensionalResonance: Math.min(1, quantumState.dimensionalResonance + (dimensionalImpact * 0.1))
    });

    toast({
      title: 'Ritual Evolution Complete',
      description: `Dimensional Impact: ${dimensionalImpact.toFixed(2)}`,
      duration: 4000,
    });
  }

  function updateParticipantContribution(ritualId: string, participantId: string, contribution: string) {
    const updatedRituals = rituals.map(ritual => {
      if (ritual.id === ritualId) {
        return {
          ...ritual,
          participants: ritual.participants.map(p => 
            p.id === participantId ? { ...p, contribution, lastActive: new Date() } : p
          )
        };
      }
      return ritual;
    });

    setRituals(updatedRituals);
    const updatedRitual = updatedRituals.find(r => r.id === ritualId);
    if (updatedRitual) {
      setSelectedRitual(updatedRitual);

      // Update quantum state with participant activity
      const updatedState = {
        ...quantumState,
        activeRitualId: ritualId,
        dimensionalShift: updatedRitual.resonanceScore,
        ritualParticipants: {
          ...quantumState.ritualParticipants,
          [ritualId]: {
            ...quantumState.ritualParticipants[ritualId],
            [participantId]: {
              lastActive: Date.now(),
              connected: true
            }
          }
        }
      };
      updateQuantumState(updatedState);

      // Notify the network
      const karmaEvent = createRitualKarmaEvent(
        'ritual_contribution',
        {
          ritualId,
          participantId,
          contribution,
          dimensionalImpact: updatedRitual.resonanceScore
        },
        nodeId,
        ritualId,
        [],
        { 
          local: updatedRitual.resonanceScore,
          global: updatedRitual.resonanceScore * 0.5,
          temporal: updatedRitual.resonanceScore * 0.3
        }
      );
      sendKarmaEvent(karmaEvent);
    }
  }

  function formatTimestamp(date: Date | undefined): string {
    if (!date) return 'Never';
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.round((date.getTime() - Date.now()) / (1000 * 60)),
      'minutes'
    );
  }

  const ritualState = useMemo(() => ({
    ...quantumState,
    ritualParticipants: syncState.participants,
    dimensionalShift: quantumState.dimensionalStability * syncState.participants.length
  }), [quantumState, syncState.participants]);

  const handleRitualUpdate = useCallback((update: Partial<QuantumState>) => {
    updateQuantumState({
      ...update,
      collapseTimestamp: Date.now(),
      dimensionalStability: Math.min(1, quantumState.dimensionalStability * 1.1)
    });
  }, [quantumState, updateQuantumState]);

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
                        <Badge variant={
                          ritual.state === 'preparing' ? 'secondary' :
                          ritual.state === 'active' ? 'default' :
                          'outline'
                        }>
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
                        {selectedRitual.participants.map(participant => (
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
                              <Badge variant={participant.connected ? 'default' : 'secondary'}>
                                {participant.connected ? 'Connected' : 'Offline'}
                              </Badge>
                            </div>
                            <textarea
                              className="w-full min-h-[60px] p-2 text-sm border rounded-md"
                              value={participant.contribution}
                              onChange={(e) => updateParticipantContribution(
                                selectedRitual.id,
                                participant.id,
                                e.target.value
                              )}
                              placeholder="Enter your contribution..."
                              disabled={!participant.connected}
                            />
                            <div className="text-xs text-muted-foreground mt-1">
                              Last active: {formatTimestamp(participant.lastActive)}
                            </div>
                          </div>
                        ))}
                      </div>

                      {selectedRitual.state === 'preparing' && (
                        <Button
                          className="w-full"
                          onClick={() => evolveRitual(selectedRitual)}
                          disabled={isEvolvingRitual}
                        >
                          {isEvolvingRitual ? 'Evolving...' : 'Begin Evolution'}
                        </Button>
                      )}

                      {isEvolvingRitual && (
                        <div className="border rounded-lg p-4 bg-muted">
                          <h5 className="font-medium mb-2">Evolution Log</h5>
                          <div className="text-sm whitespace-pre-wrap">
                            {evolutionLog}
                          </div>
                        </div>
                      )}

                      {selectedRitual.state === 'complete' && (
                        <div className="border rounded-lg p-4 bg-muted">
                          <h5 className="font-medium mb-2">Ritual Completion</h5>
                          <div className="text-sm space-y-2">
                            <div>
                              Dimensional Impact: {selectedRitual.dimensionalImpact?.toFixed(2)}
                            </div>
                            <div>
                              Completion Time: {formatTimestamp(selectedRitual.completionTime)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div> {/* End grid md:grid-cols-2 gap-6 */}
        </CardContent>
      </Card>
    </div>
  );
});
