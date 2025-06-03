
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ErrorBoundary } from '../ErrorBoundary';
import { QuantumRealityDashboard } from './QuantumRealityDashboard';
import { AdvancedQuantumVisualizer } from './AdvancedQuantumVisualizer';
import { QuantumErrorMonitor } from './QuantumErrorMonitor';
import { QuantumValidationMonitor } from './QuantumValidationMonitor';
import { RealTimeSyncMonitor } from './RealTimeSyncMonitor';
import { SyncMonitor } from './SyncMonitor';
import { SystemStatus } from '../SystemStatus';
import { QuantumErrorHandler } from '../../lib/cores/quantum-error-handler';
import { 
  Activity, 
  Zap, 
  Monitor, 
  Shield, 
  Sync, 
  Database,
  Settings,
  Eye
} from 'lucide-react';

export const DreamForgeControlCenter: React.FC = () => {
  const [errorHandler] = useState(() => new QuantumErrorHandler());

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/10 to-blue-900/10 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center">
              <Zap className="mr-3" size={32} />
              DreamForge Control Center
              <span className="ml-auto text-lg font-normal">Phase 2</span>
            </CardTitle>
            <p className="text-purple-100">
              Advanced Quantum Reality Engineering Platform - Complete System Control
            </p>
          </CardHeader>
        </Card>

        {/* Main Control Tabs */}
        <Tabs defaultValue="reality-dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="reality-dashboard" className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Reality
            </TabsTrigger>
            <TabsTrigger value="quantum-visualizer" className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              Visualizer
            </TabsTrigger>
            <TabsTrigger value="system-status" className="flex items-center">
              <Monitor className="w-4 h-4 mr-2" />
              System
            </TabsTrigger>
            <TabsTrigger value="error-monitor" className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Errors
            </TabsTrigger>
            <TabsTrigger value="validation" className="flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Validation
            </TabsTrigger>
            <TabsTrigger value="realtime-sync" className="flex items-center">
              <Sync className="w-4 h-4 mr-2" />
              Sync
            </TabsTrigger>
            <TabsTrigger value="data-sync" className="flex items-center">
              <Database className="w-4 h-4 mr-2" />
              Data
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reality-dashboard">
            <ErrorBoundary>
              <QuantumRealityDashboard />
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="quantum-visualizer">
            <ErrorBoundary>
              <AdvancedQuantumVisualizer />
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="system-status">
            <ErrorBoundary>
              <div className="grid gap-6">
                <SystemStatus />
                <Card>
                  <CardHeader>
                    <CardTitle>System Metrics Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Activity className="w-8 h-8 mx-auto mb-2 text-green-500" />
                        <h3 className="font-semibold">Uptime</h3>
                        <p className="text-2xl font-bold text-green-600">99.9%</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Zap className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                        <h3 className="font-semibold">Performance</h3>
                        <p className="text-2xl font-bold text-blue-600">Optimal</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Shield className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                        <h3 className="font-semibold">Security</h3>
                        <p className="text-2xl font-bold text-purple-600">Secure</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="error-monitor">
            <ErrorBoundary>
              <QuantumErrorMonitor errorHandler={errorHandler} />
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="validation">
            <ErrorBoundary>
              <QuantumValidationMonitor />
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="realtime-sync">
            <ErrorBoundary>
              <RealTimeSyncMonitor />
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="data-sync">
            <ErrorBoundary>
              <SyncMonitor />
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="settings">
            <ErrorBoundary>
              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Quantum Engine Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium">Reality Stability Threshold</h4>
                          <p className="text-sm text-gray-600">Minimum stability before auto-correction</p>
                          <div className="mt-2">
                            <span className="text-lg font-bold">30%</span>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium">Energy Conservation Mode</h4>
                          <p className="text-sm text-gray-600">Optimize for energy efficiency</p>
                          <div className="mt-2">
                            <span className="text-lg font-bold text-green-600">Enabled</span>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium">Auto-Recovery</h4>
                          <p className="text-sm text-gray-600">Automatic error recovery system</p>
                          <div className="mt-2">
                            <span className="text-lg font-bold text-blue-600">Active</span>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium">Quantum Coherence Target</h4>
                          <p className="text-sm text-gray-600">Target coherence level</p>
                          <div className="mt-2">
                            <span className="text-lg font-bold">95%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ErrorBoundary>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
