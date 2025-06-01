import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Server, Database, Network, Terminal, CheckCircle, AlertCircle } from "lucide-react";

const SystemMonitor: React.FC = () => {
  const [systemHealth, setSystemHealth] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    networkLatency: 0,
    databaseStatus: 'online',
    serverStatus: 'active',
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate system health updates
      setSystemHealth({
        cpuUsage: Math.random() * 100,
        memoryUsage: Math.random() * 100,
        networkLatency: Math.random() * 200,
        databaseStatus: Math.random() > 0.5 ? 'online' : 'offline',
        serverStatus: Math.random() > 0.5 ? 'active' : 'inactive',
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const systemStatus: Record<string, boolean | string> = {
    'Echo Simulator': true,
    'Dream Server': true,
    'IURI System': true,
    'Reality Engine': 'online', // Fixed type to match record
    'Quantum Core': 'stable'    // Fixed type to match record
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>System Monitor</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Cpu className="h-4 w-4 text-gray-500" />
            <span>CPU Usage: {systemHealth.cpuUsage.toFixed(1)}%</span>
          </div>
          <div className="flex items-center space-x-3">
            <Server className="h-4 w-4 text-gray-500" />
            <span>Server Status: {systemHealth.serverStatus}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Database className="h-4 w-4 text-gray-500" />
            <span>Database: {systemHealth.databaseStatus}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Network className="h-4 w-4 text-gray-500" />
            <span>Latency: {systemHealth.networkLatency}ms</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(systemStatus).map(([name, status]) => (
            <div key={name} className="flex items-center space-x-2">
              {status === true || status === 'online' || status === 'stable' ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              <span>{name}: {String(status)}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-3">
          <Terminal className="h-4 w-4 text-gray-500" />
          <span>System Load: Normal</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemMonitor;
