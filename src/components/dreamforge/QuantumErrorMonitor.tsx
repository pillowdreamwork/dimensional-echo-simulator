
import React, { useEffect, useState } from 'react';
import { QuantumErrorHandler, ErrorState, ErrorSeverity } from '../../lib/cores/quantum-error-handler';
import { Card } from '../ui/card';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface ErrorMonitorProps {
  errorHandler: QuantumErrorHandler;
}

export const QuantumErrorMonitor: React.FC<ErrorMonitorProps> = ({
  errorHandler
}) => {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasErrors: false,
    criticalCount: 0,
    highCount: 0,
    mediumCount: 0,
    lowCount: 0,
    activeErrors: new Map(),
    recoveryInProgress: false,
    lastRecoveryAttempt: 0,
    systemStability: 1.0
  });

  useEffect(() => {
    const subscription = errorHandler.observeErrorState()
      .subscribe(state => setErrorState(state));
    
    return () => subscription.unsubscribe();
  }, [errorHandler]);

  const getSeverityColor = (severity: ErrorSeverity): string => {
    switch (severity) {
      case ErrorSeverity.CRITICAL: return 'text-red-500 bg-red-100';
      case ErrorSeverity.HIGH: return 'text-orange-500 bg-orange-100';
      case ErrorSeverity.MEDIUM: return 'text-yellow-500 bg-yellow-100';
      case ErrorSeverity.LOW: return 'text-blue-500 bg-blue-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getStabilityColor = (stability: number): string => {
    if (stability > 0.8) return 'text-green-500';
    if (stability > 0.5) return 'text-yellow-500';
    if (stability > 0.3) return 'text-orange-500';
    return 'text-red-500';
  };

  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString();
  };

  const handleErrorClear = (errorId: string) => {
    errorHandler.clearError(errorId);
  };

  // Function to generate test errors
  const generateTestError = (severity: ErrorSeverity) => {
    const errorTypes = {
      [ErrorSeverity.LOW]: "QUANTUM_FLUCTUATION",
      [ErrorSeverity.MEDIUM]: "DIMENSIONAL_SHIFT",
      [ErrorSeverity.HIGH]: "STABILITY_BREACH",
      [ErrorSeverity.CRITICAL]: "REALITY_COLLAPSE"
    };
    
    const errorMessages = {
      [ErrorSeverity.LOW]: "Minor quantum fluctuation detected",
      [ErrorSeverity.MEDIUM]: "Dimensional shift occurring in subsystem",
      [ErrorSeverity.HIGH]: "Reality stability breach in progress",
      [ErrorSeverity.CRITICAL]: "Critical reality collapse imminent"
    };
    
    errorHandler.reportError(
      errorTypes[severity],
      errorMessages[severity],
      severity,
      `Module-${Math.floor(Math.random() * 100)}`,
      { timestamp: Date.now() }
    );
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quantum Error Monitor</h2>
        <div className={`px-4 py-2 rounded-full ${getStabilityColor(errorState.systemStability)}`}>
          System Stability: {(errorState.systemStability * 100).toFixed(1)}%
        </div>
      </div>

      {errorState.recoveryInProgress && (
        <Alert>
          <AlertTitle>Recovery In Progress</AlertTitle>
          <AlertDescription>
            System is attempting to recover from errors. Last attempt: {formatTimestamp(errorState.lastRecoveryAttempt)}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>System Health</span>
          <span>{errorState.activeErrors.size} active errors</span>
        </div>
        <Progress 
          value={errorState.systemStability * 100}
          className="w-full"
        />
      </div>

      <div className="flex space-x-2 mb-4">
        <Button size="sm" variant="outline" onClick={() => generateTestError(ErrorSeverity.LOW)}>
          Low Error
        </Button>
        <Button size="sm" variant="outline" onClick={() => generateTestError(ErrorSeverity.MEDIUM)}>
          Medium Error
        </Button>
        <Button size="sm" variant="outline" onClick={() => generateTestError(ErrorSeverity.HIGH)}>
          High Error
        </Button>
        <Button size="sm" variant="outline" onClick={() => generateTestError(ErrorSeverity.CRITICAL)}>
          Critical Error
        </Button>
      </div>

      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from(errorState.activeErrors.values()).map((error) => (
              <TableRow key={error.id}>
                <TableCell className="font-mono">{error.id.slice(0, 8)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded ${getSeverityColor(error.severity as ErrorSeverity)}`}>
                    {error.severity}
                  </span>
                </TableCell>
                <TableCell>{error.message}</TableCell>
                <TableCell>{error.type}</TableCell>
                <TableCell>{formatTimestamp(error.timestamp)}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleErrorClear(error.id)}
                  >
                    Clear
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {errorState.activeErrors.size === 0 && (
        <div className="text-center text-gray-500 py-8">
          No active errors - System running smoothly
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Error Distribution</h3>
          <div className="h-32 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div>Critical: {errorState.criticalCount}</div>
              <div>High: {errorState.highCount}</div>
              <div>Medium: {errorState.mediumCount}</div>
              <div>Low: {errorState.lowCount}</div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">System Health</h3>
          <div className="h-32 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getStabilityColor(errorState.systemStability)}`}>
                {(errorState.systemStability * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-500">Stability</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
