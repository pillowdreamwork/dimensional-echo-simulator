
import { ExportedQuantumState } from './types';

/**
 * Export quantum states to JSON
 */
export const exportQuantumStatesToJson = (states: {[key: string]: number}, stateNames: {[key: string]: string}): string => {
  const exportData: ExportedQuantumState[] = [];
  
  // Calculate probabilities
  const sum = Object.values(states).reduce((acc, val) => acc + val * val, 0);
  const probabilities = Object.fromEntries(
    Object.entries(states).map(([key, value]) => [key, (value * value) / sum])
  );
  
  // Format data for export
  Object.entries(probabilities).forEach(([stateKey, probability]) => {
    exportData.push({
      stateName: stateNames[stateKey] || stateKey,
      probability,
      timestamp: new Date().toISOString()
    });
  });
  
  return JSON.stringify(exportData, null, 2);
};

