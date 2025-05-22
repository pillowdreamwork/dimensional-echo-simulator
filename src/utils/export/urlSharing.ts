
/**
 * URL sharing utilities for quantum states
 */

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

