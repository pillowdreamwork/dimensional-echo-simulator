
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
import { TesseractControlPanel } from './TesseractControlPanel';
import { AdvancedRealityMonitor } from './AdvancedRealityMonitor';
import { DreamSymbolForge } from './DreamSymbolForge';
import { SystemStatus } from '../SystemStatus';
import { QuantumErrorHandler } from '../../lib/cores/quantum-error-handler';
import { 
  Activity, 
  Zap, 
  Monitor, 
  Shield, 
  RefreshCw, 
  Database,
  Settings,
  Eye,
  Layers,
  Sparkles,
  Globe,
  Target
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
              <span className="ml-auto text-lg font-normal">Phase 3 - Complete</span>
            </CardTitle>
            <p className="text-purple-100">
              Advanced Quantum Reality Engineering Platform - Complete System Control & Symbol Forging
            </p>
          </CardHeader>
        </Card>

        {/* Main Control Tabs */}
        <Tabs defaultValue="reality-dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
            <TabsTrigger value="reality-dashboard" className="flex items-center">
              <Zap className="w-4 h-4 mr-1" />
              Reality
            </TabsTrigger>
            <TabsTrigger value="tesseract-control" className="flex items-center">
              <Layers className="w-4 h-4 mr-1" />
              Tesseract
            </TabsTrigger>
            <TabsTrigger value="symbol-forge" className="flex items-center">
              <Sparkles className="w-4 h-4 mr-1" />
              Symbols
            </TabsTrigger>
            <TabsTrigger value="quantum-visualizer" className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              Visualizer
            </TabsTrigger>
            <TabsTrigger value="reality-monitor" className="flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              Monitor
            </TabsTrigger>
            <TabsTrigger value="system-status" className="flex items-center">
              <Monitor className="w-4 h-4 mr-1" />
              System
            </TabsTrigger>
            <TabsTrigger value="error-monitor" className="flex items-center">
              <Shield className="w-4 h-4 mr-1" />
              Errors
            </TabsTrigger>
            <TabsTrigger value="validation" className="flex items-center">
              <Activity className="w-4 h-4 mr-1" />
              Validation
            </TabsTrigger>
            <TabsTrigger value="realtime-sync" className="flex items-center">
              <RefreshCw className="w-4 h-4 mr-1" />
              Sync
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="w-4 h-4 mr-1" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reality-dashboard">
            <ErrorBoundary>
              <QuantumRealityDashboard />
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="tesseract-control">
            <ErrorBoundary>
              <TesseractControlPanel />
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="symbol-forge">
            <ErrorBoundary>
              <DreamSymbolForge />
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="quantum-visualizer">
            <ErrorBoundary>
              <AdvancedQuantumVisualizer />
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="reality-monitor">
            <ErrorBoundary>
              <AdvancedRealityMonitor />
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
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <Target className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                        <h3 className="font-semibold">Accuracy</h3>
                        <p className="text-2xl font-bold text-orange-600">98.7%</p>
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
              <div className="grid gap-6">
                <RealTimeSyncMonitor />
                <SyncMonitor />
              </div>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="settings">
            <ErrorBoundary>
              <Card>
                <CardHeader>
                  <CardTitle>Advanced System Configuration</CardTitle>
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
                          <h4 className="font-medium">Tesseract Node Limit</h4>
                          <p className="text-sm text-gray-600">Maximum active tesseract nodes</p>
                          <div className="mt-2">
                            <span className="text-lg font-bold">1000</span>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium">Symbol Forge Energy</h4>
                          <p className="text-sm text-gray-600">Energy allocation for symbol creation</p>
                          <div className="mt-2">
                            <span className="text-lg font-bold text-purple-600">High</span>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium">Dimensional Weave Limit</h4>
                          <p className="text-sm text-gray-600">Maximum simultaneous weaves</p>
                          <div className="mt-2">
                            <span className="text-lg font-bold">50</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Phase 3 Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium flex items-center">
                            <Layers className="w-4 h-4 mr-2" />
                            Tesseract Engine
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">Multi-dimensional node management</p>
                          <div className="mt-2">
                            <span className="text-lg font-bold text-green-600">Active</span>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium flex items-center">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Symbol Forge
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">Dream symbol creation and connection</p>
                          <div className="mt-2">
                            <span className="text-lg font-bold text-blue-600">Enabled</span>
                          </div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium flex items-center">
                            <Globe className="w-4 h-4 mr-2" />
                            Reality Monitor
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">Advanced reality matrix monitoring</p>
                          <div className="mt-2">
                            <span className="text-lg font-bold text-purple-600">Online</span>
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
