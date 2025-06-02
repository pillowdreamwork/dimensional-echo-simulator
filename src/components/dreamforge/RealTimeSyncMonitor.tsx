import React, { useEffect, useState } from 'react';
import { RealTimeSync, ConnectionState, WebSocketMessage } from '../../lib/cores/real-time-sync';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Alert, AlertDescription } from '../ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface RealTimeSyncMonitorProps {
  syncManager: RealTimeSync;
}

interface MessageStats {
  quantum: number;
  karma: number;
  dimensional: number;
  anchor: number;
  total: number;
}

interface ConnectionState {
  status: 'connected' | 'connecting' | 'disconnected' | 'error';
  lastSync: number;
  latency: number;
  error?: string;
}

export const RealTimeSyncMonitor: React.FC<RealTimeSyncMonitorProps> = ({
  syncManager
}) => {
  const [connectionState, setConnectionState] = useState<ConnectionState>({
    status: 'disconnected',
    lastSync: 0,
    latency: 0
  });
  const [messageStats, setMessageStats] = useState<MessageStats>({
    quantum: 0,
    karma: 0,
    dimensional: 0,
    anchor: 0,
    total: 0
  });
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    // Subscribe to connection state changes
    const connectionSub = syncManager.observeConnectionState()
      .subscribe(state => {
        setConnectionState(state);
        setLastUpdate(new Date());
      });

    // Subscribe to quantum updates
    const quantumSub = syncManager.observeQuantumUpdates()
      .subscribe(() => {
        updateMessageStats('quantum');
      });

    // Subscribe to karma events
    const karmaSub = syncManager.observeKarmaEvents()
      .subscribe(() => {
        updateMessageStats('karma');
      });

    // Subscribe to dimensional shifts
    const dimensionalSub = syncManager.observeDimensionalShifts()
      .subscribe(() => {
        updateMessageStats('dimensional');
      });

    // Subscribe to reality anchors
    const anchorSub = syncManager.observeRealityAnchors()
      .subscribe(() => {
        updateMessageStats('anchor');
      });

    return () => {
      connectionSub.unsubscribe();
      quantumSub.unsubscribe();
      karmaSub.unsubscribe();
      dimensionalSub.unsubscribe();
      anchorSub.unsubscribe();
    };
  }, [syncManager]);

  const updateMessageStats = (type: keyof Omit<MessageStats, 'total'>) => {
    setMessageStats(prev => ({
      ...prev,
      [type]: prev[type] + 1,
      total: prev.total + 1
    }));
  };

  const getConnectionColor = (status: ConnectionState['status']) => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'connecting': return 'bg-yellow-500';
      case 'disconnected': return 'bg-red-500';
      case 'error': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const formatLatency = (latency?: number) => {
    if (!latency) return 'N/A';
    return `${latency}ms`;
  };

  const formatTimestamp = (date: Date | null) => {
    if (!date) return 'Never';
    return date.toLocaleTimeString();
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Real-Time Synchronization</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div 
                className={`h-3 w-3 rounded-full ${getConnectionColor(connectionState.status)}`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Status: {connectionState.status}</p>
              <p>Latency: {formatLatency(connectionState.latency)}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Connection Status</p>
          <Badge
            variant={connectionState.status === 'connected' ? 'default' : 'destructive'}
          >
            {connectionState.status.toUpperCase()}
          </Badge>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Latency</p>
          <p className="text-lg font-mono">
            {formatLatency(connectionState.latency)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Message Flow</span>
            <span>{messageStats.total} total</span>
          </div>
          <Progress value={
            messageStats.total > 0 ? 
              (messageStats.quantum / messageStats.total) * 100 : 
              0
          } />
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Quantum Updates:</div>
          <div>{messageStats.quantum}</div>
          
          <div>Karma Events:</div>
          <div>{messageStats.karma}</div>
          
          <div>Dimensional Shifts:</div>
          <div>{messageStats.dimensional}</div>
          
          <div>Reality Anchors:</div>
          <div>{messageStats.anchor}</div>
        </div>
      </div>

      {connectionState.status === 'error' && connectionState.error && (
        <div className="text-red-500 text-sm">
          Error: {connectionState.error}
        </div>
      )}

      <div className="text-sm text-gray-500 mt-4">
        Last Update: {formatTimestamp(lastUpdate)}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes syncPulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          .sync-pulse {
            animation: syncPulse 2s ease-in-out infinite;
          }
        `
      }} />
    </Card>
  );
};
