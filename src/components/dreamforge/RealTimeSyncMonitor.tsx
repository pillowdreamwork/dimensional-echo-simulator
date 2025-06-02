
import React, { useState, useEffect } from 'react';
import { ConnectionState as RealtimeSyncConnectionState } from '../../lib/cores/real-time-sync';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Circle } from 'lucide-react';

export const RealTimeSyncMonitor: React.FC = () => {
  const [connectionState, setConnectionState] = useState<RealtimeSyncConnectionState>({
    status: 'disconnected',
    lastSync: 0,
    latency: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const randomStatus = Math.random();
      if (randomStatus < 0.7) {
        setConnectionState({
          status: 'connected',
          lastSync: Date.now(),
          latency: Math.random() * 100 + 10
        });
      } else if (randomStatus < 0.9) {
        setConnectionState({
          status: 'connecting',
          lastSync: Date.now(),
          latency: Math.random() * 200 + 50
        });
      } else {
        setConnectionState({
          status: 'error',
          lastSync: Date.now(),
          latency: Math.random() * 500 + 100,
          error: 'Connection timeout'
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (connectionState.status) {
      case 'connected':
        return 'text-green-500';
      case 'connecting':
        return 'text-blue-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Real-Time Sync Monitor</span>
          <Badge variant={connectionState.status === 'connected' ? 'default' : 'secondary'}>
            {connectionState.status.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Circle className={`h-4 w-4 ${getStatusColor()}`} />
          <span>Status: {connectionState.status}</span>
        </div>
        <div>
          <span>Last Sync: {new Date(connectionState.lastSync).toLocaleTimeString()}</span>
        </div>
        <div>
          <span>Latency: {connectionState.latency.toFixed(0)}ms</span>
        </div>
        {connectionState.error && (
          <div className="text-red-500">
            Error: {connectionState.error}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
