import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Circle } from 'lucide-react';

interface SyncMonitorProps {
  syncStatus: 'connected' | 'connecting' | 'disconnected' | 'error';
  lastSyncTime: Date | null;
  dataPointsSynced: number;
  errorDetails?: string;
}

export const SyncMonitor: React.FC<SyncMonitorProps> = ({
  syncStatus,
  lastSyncTime,
  dataPointsSynced,
  errorDetails
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate sync progress
    let intervalId: NodeJS.Timeout;
    if (syncStatus === 'connecting') {
      setProgress(0);
      intervalId = setInterval(() => {
        setProgress(prevProgress => {
          const newProgress = prevProgress + 10;
          return newProgress > 95 ? 95 : newProgress;
        });
      }, 300);
    } else if (syncStatus === 'connected') {
      setProgress(100);
    } else {
      setProgress(0);
    }

    return () => clearInterval(intervalId);
  }, [syncStatus]);

  const getStatusColor = () => {
    switch (syncStatus) {
      case 'connected':
        return 'text-green-500';
      case 'connecting':
        return 'text-yellow-500 animate-pulse';
      case 'disconnected':
        return 'text-red-500';
      case 'error':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatLastSyncTime = () => {
    if (!lastSyncTime) return 'Never';
    return lastSyncTime.toLocaleTimeString();
  };

  return (
    <Card className="sync-monitor">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Synchronization Monitor</span>
          <div className="flex items-center space-x-2">
            <Circle className={`h-4 w-4 sync-indicator ${getStatusColor()}`} />
            <Badge variant="secondary">{syncStatus.toUpperCase()}</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Status</p>
          <p className={`text-lg ${getStatusColor()}`}>
            {syncStatus.toUpperCase()}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Last Sync</p>
          <p className="text-muted-foreground">{formatLastSyncTime()}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Data Synced</p>
          <p className="text-muted-foreground">{dataPointsSynced} points</p>
        </div>

        <div>
          <p className="text-sm font-medium">Progress</p>
          <Progress value={progress} />
        </div>

        {errorDetails && (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm">
            <p className="font-medium">Error Details:</p>
            <p>{errorDetails}</p>
          </div>
        )}
      </CardContent>
      <style>{`
        .sync-monitor {
          transition: all 0.3s ease;
        }
        .sync-indicator {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </Card>
  );
};
