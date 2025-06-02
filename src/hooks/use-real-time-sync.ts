
import { useState, useEffect } from 'react';
import { RealTimeSync, ConnectionState } from '../lib/cores/real-time-sync';

export const useRealTimeSync = (url: string, authToken?: string) => {
  const [connectionState, setConnectionState] = useState<ConnectionState>({
    status: 'disconnected',
    lastSync: 0,
    latency: 0
  });
  
  const [realTimeSync] = useState(() => new RealTimeSync(url, authToken));

  useEffect(() => {
    const subscription = realTimeSync.observeConnectionState().subscribe(
      state => setConnectionState(state)
    );

    // Simulate connection
    setTimeout(() => {
      setConnectionState({
        status: 'connected',
        lastSync: Date.now(),
        latency: Math.random() * 100
      });
    }, 1000);

    return () => subscription.unsubscribe();
  }, [realTimeSync]);

  return {
    connectionState,
    realTimeSync,
    isConnected: connectionState.status === 'connected'
  };
};
