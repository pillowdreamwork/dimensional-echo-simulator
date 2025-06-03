
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { QuantumValidationMonitor } from './QuantumValidationMonitor';
import { RealTimeSyncMonitor } from './RealTimeSyncMonitor';
import { SyncMonitor } from './SyncMonitor';
import { SymbolConnectionSystem } from '../SymbolConnectionSystem';
import { SystemStatus } from '../SystemStatus';
import { ErrorBoundary } from '../ErrorBoundary';

export const ForgeDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            DreamForge Control Center
          </h1>
          <p className="text-gray-600">
            Quantum Reality Engineering Dashboard
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <ErrorBoundary>
            <SystemStatus />
          </ErrorBoundary>

          <ErrorBoundary>
            <Card className="bg-white shadow-md rounded-md">
              <CardHeader>
                <CardTitle>Forge Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Initialize quantum reality engineering processes.</p>
                <Button className="w-full">Start Engineering</Button>
              </CardContent>
            </Card>
          </ErrorBoundary>

          <ErrorBoundary>
            <QuantumValidationMonitor />
          </ErrorBoundary>

          <ErrorBoundary>
            <RealTimeSyncMonitor />
          </ErrorBoundary>

          <ErrorBoundary>
            <SyncMonitor />
          </ErrorBoundary>

          <ErrorBoundary>
            <SymbolConnectionSystem />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};
