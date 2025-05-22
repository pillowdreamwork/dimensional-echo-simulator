
/**
 * Utility functions for exporting quantum data
 */

// Format for exporting quantum states
export interface ExportedQuantumState {
  stateName: string;
  probability: number;
  timestamp: string;
}

// Export quantum states to JSON
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

// Generate shareable URL with state data
export const generateShareableUrl = (states: {[key: string]: number}): string => {
  const stateParams = Object.entries(states)
    .map(([key, value]) => `${key}=${value.toFixed(2)}`)
    .join('&');
  
  // Create base URL - in production this would be the actual domain
  const baseUrl = window.location.origin;
  return `${baseUrl}?quantumStates=${encodeURIComponent(stateParams)}`;
};

// Parse quantum states from URL parameters
export const parseQuantumStatesFromUrl = (): {[key: string]: number} | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const stateParams = urlParams.get('quantumStates');
  
  if (!stateParams) return null;
  
  try {
    const stateEntries = decodeURIComponent(stateParams).split('&');
    const states: {[key: string]: number} = {};
    
    stateEntries.forEach(entry => {
      const [key, value] = entry.split('=');
      if (key && value) {
        states[key] = parseFloat(value);
      }
    });
    
    return Object.keys(states).length > 0 ? states : null;
  } catch (error) {
    console.error("Error parsing quantum states from URL:", error);
    return null;
  }
};
