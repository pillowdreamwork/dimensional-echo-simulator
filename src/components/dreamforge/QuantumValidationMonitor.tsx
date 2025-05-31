import React, { useEffect, useState } from 'react';
import { QuantumValidator, ValidationResult, ValidationMetrics } from '../../lib/cores/quantum-validator';
import { ForgeAlchemistBridge } from '../../lib/cores/forge-alchemist-bridge';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

export const QuantumValidationMonitor: React.FC = () => {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const validator = QuantumValidator.getInstance();
  const bridge = ForgeAlchemistBridge.getInstance();

  const [validationHistory, setValidationHistory] = useState<{
    timestamp: number;
    result: ValidationResult;
  }[]>([]);

  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        const { quantum } = bridge.getCurrentMetrics();
        const result = validator.validateQuantumState(quantum);
        setValidationResult(result);
        setValidationHistory(prev => [...prev, {
          timestamp: Date.now(),
          result
        }].slice(-50)); // Keep last 50 entries
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  const getHealthColor = (value: number): string => {
    if (value >= 0.8) return 'text-green-500';
    if (value >= 0.6) return 'text-yellow-500';
    if (value >= 0.4) return 'text-orange-500';
    return 'text-red-500';
  };

  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString();
  };

  const radarData = validationResult ? [
    {
      metric: 'Coherence',
      value: validationResult.metrics.coherenceScore * 100,
    },
    {
      metric: 'Stability',
      value: validationResult.metrics.stabilityScore * 100,
    },
    {
      metric: 'Integrity',
      value: validationResult.metrics.integrityScore * 100,
    },
    {
      metric: 'Health',
      value: validationResult.metrics.overallHealth * 100,
    },
  ] : [];

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quantum System Validation</h2>
        <Button
          onClick={() => setIsMonitoring(!isMonitoring)}
          variant={isMonitoring ? "destructive" : "default"}
        >
          {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
        </Button>
      </div>

      {validationResult && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">System Health Metrics</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Metrics"
                      dataKey="value"
                      stroke="#4299E1"
                      fill="#4299E1"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Validation History</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={validationHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp"
                      tickFormatter={formatTimestamp}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      labelFormatter={formatTimestamp}
                      formatter={(value: number) => [`${value.toFixed(1)}%`]}
                    />
                    <Line
                      type="monotone"
                      dataKey="result.metrics.stabilityScore"
                      stroke="#4299E1"
                      name="Stability"
                    />
                    <Line
                      type="monotone"
                      dataKey="result.metrics.coherenceScore"
                      stroke="#9F7AEA"
                      name="Coherence"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Validation Results */}
          <div className="space-y-4">
            {validationResult.errors.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-red-500">Critical Issues</h3>
                {validationResult.errors.map((error, index) => (
                  <Alert key={index} variant="destructive">
                    <AlertTitle>Error {error.code}</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                  </Alert>
                ))}
              </div>
            )}

            {validationResult.warnings.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-yellow-500">Warnings</h3>
                {validationResult.warnings.map((warning, index) => (
                  <Alert key={index} variant="warning">
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                      {warning.message}
                      (Current: {warning.actualValue.toFixed(2)},
                      Threshold: {warning.threshold.toFixed(2)})
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Overall Health</span>
              <span>{(validationResult.metrics.overallHealth * 100).toFixed(1)}%</span>
            </div>
            <Progress 
              value={validationResult.metrics.overallHealth * 100} 
              className="w-full" 
            />
          </div>
        </>
      )}
                <TableCell>{result.name}</TableCell>
                <TableCell>
                  <span className={result.success ? 'text-green-500' : 'text-red-500'}>
                    {result.success ? 'PASS' : 'FAIL'}
                  </span>
                </TableCell>
                <TableCell>{formatDuration(result.duration)}</TableCell>
                <TableCell className={getHealthColor(result.metrics.stability)}>
                  {(result.metrics.stability * 100).toFixed(1)}%
                </TableCell>
                <TableCell className={getHealthColor(result.metrics.performance)}>
                  {(result.metrics.performance * 100).toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {result.error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <h4 className="font-semibold">Error Details</h4>
          <pre className="mt-2 text-sm overflow-auto">
            {result.error.message}
          </pre>
        </div>
      )}
    </Card>
  );
};
