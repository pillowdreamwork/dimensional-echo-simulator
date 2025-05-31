import { useEffect, useState } from 'react';
import { RealTimeSync, ConnectionState, WebSocketMessage } from '../lib/cores/real-time-sync';
import { QuantumState } from '../lib/cores/quantum-tesseract';
import { KarmaEvent } from '../lib/cores/karma-reflection';

interface UseRealTimeSyncOptions {
  url: string;
  authToken?: string;
  autoConnect?: boolean;
  retryOnDisconnect?: boolean;
}

interface RealTimeSyncState {
  connection: ConnectionState;
  lastQuantumUpdate?: {
    state: QuantumState;
    nodeId: string;
    timestamp: number;
  };
  lastKarmaEvent?: {
    event: KarmaEvent;
    timestamp: number;
  };
  lastDimensionalShift?: {
    sourceId: string;
    targetId: string;
    magnitude: number;
    timestamp: number;
  };
  messageStats: {
    quantum: number;
    karma: number;
    dimensional: number;
    anchor: number;
    total: number;
  };
}

export function useRealTimeSync(options: UseRealTimeSyncOptions) {
  const [syncManager] = useState(() => new RealTimeSync(options.url, options.authToken));
  const [syncState, setSyncState] = useState<RealTimeSyncState>({
    connection: { status: 'disconnected' },
    messageStats: {
      quantum: 0,
      karma: 0,
      dimensional: 0,
      anchor: 0,
      total: 0
    }
  });

  useEffect(() => {
    const subscriptions = [
      // Connection state updates
      syncManager.observeConnectionState().subscribe(connection => {
        setSyncState(prev => ({ ...prev, connection }));
      }),

      // Quantum updates
      syncManager.observeQuantumUpdates().subscribe(({ state, nodeId }) => {
        setSyncState(prev => ({
          ...prev,
          lastQuantumUpdate: {
            state,
            nodeId,
            timestamp: Date.now()
          },
          messageStats: {
            ...prev.messageStats,
            quantum: prev.messageStats.quantum + 1,
            total: prev.messageStats.total + 1
          }
        }));
      }),

      // Karma events
      syncManager.observeKarmaEvents().subscribe(event => {
        setSyncState(prev => ({
          ...prev,
          lastKarmaEvent: {
            event,
            timestamp: Date.now()
          },
          messageStats: {
            ...prev.messageStats,
            karma: prev.messageStats.karma + 1,
            total: prev.messageStats.total + 1
          }
        }));
      }),

      // Dimensional shifts
      syncManager.observeDimensionalShifts().subscribe(shift => {
        setSyncState(prev => ({
          ...prev,
          lastDimensionalShift: {
            ...shift,
            timestamp: Date.now()
          },
          messageStats: {
            ...prev.messageStats,
            dimensional: prev.messageStats.dimensional + 1,
            total: prev.messageStats.total + 1
          }
        }));
      })
    ];

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
      if (!options.retryOnDisconnect) {
        syncManager.disconnect();
      }
    };
  }, [syncManager, options.retryOnDisconnect]);

  const sendQuantumUpdate = (state: QuantumState, nodeId: string) => {
    syncManager.sendQuantumUpdate(state, nodeId);
  };

  const sendKarmaEvent = (event: KarmaEvent) => {
    syncManager.sendKarmaEvent(event);
  };

  const sendDimensionalShift = (
    sourceId: string,
    targetId: string,
    magnitude: number
  ) => {
    syncManager.sendDimensionalShift(sourceId, targetId, magnitude);
  };

  return {
    syncState,
    sendQuantumUpdate,
    sendKarmaEvent,
    sendDimensionalShift,
    disconnect: () => syncManager.disconnect()
  };
}
