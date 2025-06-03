
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CheckCircle, AlertCircle, XCircle, Zap } from 'lucide-react';

interface SystemMetrics {
  quantumCoherence: number;
  dimensionalStability: number;
  realityIntegrity: number;
  systemLoad: number;
  activeConnections: number;
  errorCount: number;
}

export const SystemStatus: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    quantumCoherence: 95,
    dimensionalStability: 88,
    realityIntegrity: 92,
    systemLoad: 45,
    activeConnections: 3,
    errorCount: 0
  });

  const [systemHealth, setSystemHealth] = useState<'healthy' | 'warning' | 'critical'>('healthy');

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        quantumCoherence: Math.max(80, Math.min(100, prev.quantumCoherence + (Math.random() - 0.5) * 2)),
        dimensionalStability: Math.max(70, Math.min(100, prev.dimensionalStability + (Math.random() - 0.5) * 3)),
        realityIntegrity: Math.max(85, Math.min(100, prev.realityIntegrity + (Math.random() - 0.5) * 1.5)),
        systemLoad: Math.max(20, Math.min(80, prev.systemLoad + (Math.random() - 0.5) * 5)),
        activeConnections: Math.max(1, Math.min(10, prev.activeConnections + Math.floor((Math.random() - 0.5) * 2))),
        errorCount: Math.max(0, prev.errorCount + (Math.random() > 0.95 ? 1 : 0))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const avgStability = (metrics.quantumCoherence + metrics.dimensionalStability + metrics.realityIntegrity) / 3;
    if (avgStability > 85 && metrics.errorCount < 3) {
      setSystemHealth('healthy');
    } else if (avgStability > 70 && metrics.errorCount < 10) {
      setSystemHealth('warning');
    } else {
      setSystemHealth('critical');
    }
  }, [metrics]);

  const getHealthIcon = () => {
    switch (systemHealth) {
      case 'healthy': return <CheckCircle className="text-green-500" size={20} />;
      case 'warning': return <AlertCircle className="text-yellow-500" size={20} />;
      case 'critical': return <XCircle className="text-red-500" size={20} />;
    }
  };

  const getHealthBadge = () => {
    const variants = {
      healthy: 'default' as const,
      warning: 'secondary' as const,
      critical: 'destructive' as const
    };
    
    return (
      <Badge variant={variants[systemHealth]}>
        {systemHealth.toUpperCase()}
      </Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="mr-2 text-blue-500" size={20} />
            System Status
          </div>
          <div className="flex items-center space-x-2">
            {getHealthIcon()}
            {getHealthBadge()}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Quantum Coherence</span>
                <span>{metrics.quantumCoherence.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.quantumCoherence} className="mt-1" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm">
                <span>Dimensional Stability</span>
                <span>{metrics.dimensionalStability.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.dimensionalStability} className="mt-1" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm">
                <span>Reality Integrity</span>
                <span>{metrics.realityIntegrity.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.realityIntegrity} className="mt-1" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm">
                <span>System Load</span>
                <span>{metrics.systemLoad.toFixed(1)}%</span>
              </div>
              <Progress value={metrics.systemLoad} className="mt-1" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{metrics.activeConnections}</p>
              <p className="text-sm text-gray-500">Active Connections</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{metrics.errorCount}</p>
              <p className="text-sm text-gray-500">System Errors</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
