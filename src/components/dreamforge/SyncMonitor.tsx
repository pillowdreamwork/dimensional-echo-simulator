import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Circle } from 'lucide-react';

interface SyncStatus {
  status: 'online' | 'offline' | 'syncing' | 'error';
  lastSync: string;
  dataIntegrity: number;
  errorDetails?: string;
}

export const SyncMonitor: React.FC = () => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    status: 'offline',
    lastSync: 'Never',
    dataIntegrity: 100,
    errorDetails: undefined
  });

  useEffect(() => {
    // Simulate real-time sync status updates
    const intervalId = setInterval(() => {
      const randomStatus = Math.random();
      if (randomStatus < 0.7) {
        setSyncStatus({
          status: 'online',
          lastSync: new Date().toLocaleTimeString(),
          dataIntegrity: Math.random() * 30 + 70,
          errorDetails: undefined
        });
      } else if (randomStatus < 0.9) {
        setSyncStatus({
          status: 'syncing',
          lastSync: new Date().toLocaleTimeString(),
          dataIntegrity: Math.random() * 50 + 50,
          errorDetails: undefined
        });
      } else {
        setSyncStatus({
          status: 'error',
          lastSync: new Date().toLocaleTimeString(),
          dataIntegrity: Math.random() * 20 + 10,
          errorDetails: 'Connection timed out'
        });
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const getStatusColor = () => {
    switch (syncStatus.status) {
      case 'online':
        return 'text-green-500';
      case 'syncing':
        return 'text-blue-500 pulse-animation';
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
          <span>Real-Time Sync Status</span>
          <Badge variant={syncStatus.status === 'online' ? 'default' : 'secondary'}>
            {syncStatus.status.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Circle className={`h-4 w-4 ${getStatusColor()}`} />
          <span>Status:</span>
          <span className="font-medium">{syncStatus.status}</span>
        </div>
        <div>
          <span>Last Sync:</span>
          <span className="font-medium">{syncStatus.lastSync}</span>
        </div>
        <div>
          <span>Data Integrity:</span>
          <span className="font-medium">{syncStatus.dataIntegrity.toFixed(1)}%</span>
        </div>
        {syncStatus.status === 'error' && syncStatus.errorDetails && (
          <div className="text-red-500">
            Error: {syncStatus.errorDetails}
          </div>
        )}

        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes pulse {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; }
            }
            .pulse-animation {
              animation: pulse 2s ease-in-out infinite;
            }
          `
        }} />
      </div>
    </Card>
  );
};
