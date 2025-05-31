import React, { useEffect, useState } from 'react';
import { OptimizationMetrics } from '../../lib/cores/quantum-optimizer';
import { QuantumTesseractEngine } from '../../lib/cores/quantum-tesseract';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface PerformanceMonitorProps {
  engine: QuantumTesseractEngine;
}

interface MetricHistory {
  timestamp: number;
  computeTime: number;
  operationsPerSecond: number;
  memoryUsage: number;
}

export const QuantumPerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  engine
}) => {
  const [currentMetrics, setCurrentMetrics] = useState<OptimizationMetrics>({
    computeTime: 0,
    memoryUsage: 0,
    operationsPerSecond: 0,
    batchSize: 64,
    optimizationLevel: 1
  });

  const [metricsHistory, setMetricsHistory] = useState<MetricHistory[]>([]);
  const maxHistoryLength = 100;

  useEffect(() => {
    const subscription = engine.observeOptimizationMetrics().subscribe(metrics => {
      setCurrentMetrics(metrics);
      setMetricsHistory(prev => {
        const newHistory = [...prev, {
          timestamp: Date.now(),
          computeTime: metrics.computeTime,
          operationsPerSecond: metrics.operationsPerSecond,
          memoryUsage: metrics.memoryUsage
        }];
        
        // Keep only the last maxHistoryLength items
        return newHistory.slice(-maxHistoryLength);
      });
    });

    return () => subscription.unsubscribe();
  }, [engine]);

  const formatNumber = (num: number): string => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const getPerformanceLevel = (ops: number): string => {
    if (ops > 10000) return 'Excellent';
    if (ops > 5000) return 'Good';
    if (ops > 1000) return 'Fair';
    return 'Poor';
  };

  const getPerformanceColor = (ops: number): string => {
    if (ops > 10000) return 'text-green-500';
    if (ops > 5000) return 'text-blue-500';
    if (ops > 1000) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quantum Performance Metrics</h2>
        <div className={`px-3 py-1 rounded-full ${getPerformanceColor(currentMetrics.operationsPerSecond)}`}>
          {getPerformanceLevel(currentMetrics.operationsPerSecond)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Operations/Second</p>
          <p className="text-2xl font-mono">
            {formatNumber(currentMetrics.operationsPerSecond)}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Compute Time (ms)</p>
          <p className="text-2xl font-mono">
            {formatNumber(currentMetrics.computeTime)}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Memory Usage (KB)</p>
          <p className="text-2xl font-mono">
            {formatNumber(currentMetrics.memoryUsage)}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-500">Batch Size</p>
          <p className="text-2xl font-mono">
            {currentMetrics.batchSize}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Optimization Level</span>
          <span>{currentMetrics.optimizationLevel * 100}%</span>
        </div>
        <Progress 
          value={currentMetrics.optimizationLevel * 100}
          className="w-full"
        />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={metricsHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp"
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleTimeString()}
              formatter={(value: number) => [formatNumber(value)]}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="operationsPerSecond"
              stroke="#4299E1"
              name="Ops/Sec"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="memoryUsage"
              stroke="#9F7AEA"
              name="Memory (KB)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <style jsx>{`
        .metric-card {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          padding: 1rem;
        }
      `}</style>
    </Card>
  );
};
