
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ValidationResult } from '../../types/quantum';

export const QuantumValidationMonitor: React.FC = () => {
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsValidating(true);
      setTimeout(() => {
        const mockResult: ValidationResult = {
          isValid: Math.random() > 0.3,
          errors: Math.random() > 0.7 ? ['Mock validation error'] : [],
          warnings: Math.random() > 0.5 ? ['Mock warning'] : [],
          score: Math.random() * 100
        };
        setValidationResults(prev => [...prev.slice(-4), mockResult]);
        setIsValidating(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quantum Validation Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isValidating && (
            <Badge variant="secondary">Validating...</Badge>
          )}
          
          {validationResults.map((result, index) => (
            <div key={index} className="p-2 border rounded">
              <div className="flex items-center justify-between">
                <Badge variant={result.isValid ? "default" : "destructive"}>
                  {result.isValid ? "Valid" : "Invalid"}
                </Badge>
                <span className="text-sm">Score: {result.score.toFixed(1)}</span>
              </div>
              
              {result.errors.length > 0 && (
                <div className="mt-2 text-red-500 text-sm">
                  Errors: {result.errors.join(', ')}
                </div>
              )}
              
              {result.warnings.length > 0 && (
                <div className="mt-2 text-yellow-500 text-sm">
                  Warnings: {result.warnings.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
