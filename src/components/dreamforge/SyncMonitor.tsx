import React, { useEffect, useState } from 'react';
import { AethericAPICore, SyncState } from '../../lib/cores/aetheric-api';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Progress } from '../ui/progress';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';

interface SyncMonitorProps {
  apiCore: AethericAPICore;
}

export const SyncMonitor: React.FC<SyncMonitorProps> = ({ apiCore }) => {
  const [syncState, setSyncState] = useState<SyncState>({
    lastSync: Date.now(),
    pendingOperations: 0,
    syncStatus: 'idle'
  });

  useEffect(() => {
    const subscription = apiCore.observeSyncState().subscribe(
      state => setSyncState(state)
    );
    return () => subscription.unsubscribe();
  }, [apiCore]);

  const getStatusColor = (status: SyncState['syncStatus']) => {
    switch (status) {
      case 'syncing': return 'text-blue-500';
      case 'error': return 'text-red-500';
      default: return 'text-green-500';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const handleForceSync = async () => {
    try {
      await apiCore.forceSync();
    } catch (error) {
      console.error('Force sync failed:', error);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reality Sync Status</h2>
        <HoverCard>
          <HoverCardTrigger>
            <div 
              className={`px-3 py-1 rounded-full ${getStatusColor(syncState.syncStatus)}`}
            >
              {syncState.syncStatus.toUpperCase()}
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="text-sm">
              Last sync: {formatTimestamp(syncState.lastSync)}
              <br />
              Pending operations: {syncState.pendingOperations}
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Sync Progress</span>
          <span>{syncState.pendingOperations} pending</span>
        </div>
        <Progress 
          value={100 - (syncState.pendingOperations * 10)} 
          className="w-full"
        />
      </div>

      {syncState.syncStatus === 'error' && (
        <Alert variant="destructive">
          <AlertTitle>Sync Error</AlertTitle>
          <AlertDescription>
            {syncState.errorMessage || 'An unknown error occurred'}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex space-x-4">
        <Button 
          onClick={handleForceSync}
          disabled={syncState.syncStatus === 'syncing'}
        >
          Force Sync
        </Button>
        <Button 
          variant="outline"
          onClick={() => window.location.reload()}
        >
          Reset Connection
        </Button>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <div className="grid grid-cols-2 gap-2">
          <div>Last Successful Sync:</div>
          <div>{formatTimestamp(syncState.lastSync)}</div>
          
          <div>Connection Status:</div>
          <div className={getStatusColor(syncState.syncStatus)}>
            {syncState.syncStatus === 'idle' ? 'Connected' : syncState.syncStatus}
          </div>
        </div>
      </div>

      <style jsx>{`
        .progress-indicator {
          height: 4px;
          background: #e2e8f0;
          border-radius: 2px;
          overflow: hidden;
        }
        
        .progress-bar {
          height: 100%;
          background: #4299e1;
          transition: width 0.3s ease-in-out;
        }
      `}</style>
    </Card>
  );
};
