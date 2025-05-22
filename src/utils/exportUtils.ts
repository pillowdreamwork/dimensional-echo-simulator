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

/**
 * Exports all quantum states and dimensional data to a file
 * @param fileName Optional file name
 * @returns Promise that resolves when export is complete
 */
export function exportFullSystemData(fileName?: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      // Import engine modules
      const { 
        simulationCore, 
        pillowDreamwork, 
        vectorAlchemy, 
        invocationAPI, 
        mythicAI, 
        uncertainty, 
        echoSimulator, 
        dreamServer, 
        iuri, 
        siderAI, 
        dreamCompass 
      } = await import('../lib/engine').then(module => module.getEngineModules());
      
      // Gather all system data with safe checks for each method
      const systemData = {
        version: "1.0.0",
        exportDate: new Date().toISOString(),
        engineState: {
          simulation: simulationCore ? {
            // Fix: Check for an isActive method first, then try other approaches
            active: typeof simulationCore.isActive === 'function' ? simulationCore.isActive() : 
                    (simulationCore as any).status === 'active' || false,
            currentFrame: simulationCore.getCurrentState?.() || 0,
            dimensions: simulationCore.setDimension ? ['dimension data unavailable'] : []
          } : null,
          dreamwork: pillowDreamwork ? {
            dreamState: pillowDreamwork.getDreamState?.() || null,
            activeProcesses: []  // Method not available, using empty array
          } : null,
          vectors: vectorAlchemy ? {
            fields: [],  // Method not available, using empty array
            stability: 0  // Method not available, using default value
          } : null,
          mythic: mythicAI ? {
            archetypes: mythicAI.getActiveArchetype ? [mythicAI.getActiveArchetype()] : [],
            insights: []  // Method not available, using empty array
          } : null,
          uncertainty: uncertainty ? {
            state: null,  // Method not available, using null
            entropy: 0    // Method not available, using default value
          } : null,
          echo: echoSimulator ? {
            timelines: echoSimulator.getTimelines?.() || [],
            ripples: []   // Method not available, using empty array
          } : null,
          compass: dreamCompass ? {
            currentDimension: dreamCompass.currentDimension || 1,
            accessibleDimensions: dreamCompass.getAccessibleDimensions?.() || []
          } : null
        },
        quantumStates: [],
        dimensionalEffects: [],
        symbolPatterns: [],
        ritualHistory: []
      };
      
      // Create a download file
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(systemData, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", fileName || "quantum-dimensional-export.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
      resolve();
    } catch (error) {
      console.error("Error exporting system data:", error);
      reject(error);
    }
  });
}

/**
 * Exports the project codebase structure as a blueprint document
 */
export function exportProjectBlueprint(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      fetch('/src/docs/ProjectBlueprint.md')
        .then(response => response.text())
        .then(text => {
          const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(text);
          const downloadAnchorNode = document.createElement('a');
          downloadAnchorNode.setAttribute("href", dataStr);
          downloadAnchorNode.setAttribute("download", "quantum-dimensional-simulator-blueprint.md");
          document.body.appendChild(downloadAnchorNode);
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
          resolve();
        })
        .catch(error => {
          console.error("Error fetching blueprint:", error);
          reject(error);
        });
    } catch (error) {
      console.error("Error exporting blueprint:", error);
      reject(error);
    }
  });
}

/**
 * Exports the full codebase as a structured document
 */
export function exportCodebaseDocument(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // In a real implementation, this would gather code from various files
      // For now, we'll create a sample structure
      const codeDocument = `# Quantum Dimensional Simulator - Codebase Documentation

## Core Engine Modules

\`\`\`typescript
// SimulationCore.ts
// Core simulation engine that drives the dimensional experience
class SimulationCore {
  // Implementation details...
}

// PillowDreamworkModule.ts
// Manages dream state and logic processing
class PillowDreamworkModule {
  // Implementation details...
}

// VectorAlchemyEngine.ts
// Processes vector fields and dimensional interactions
class VectorAlchemyEngine {
  // Implementation details...
}
\`\`\`

## UI Components

\`\`\`tsx
// Index.tsx
// Main container component
function Index() {
  // Implementation details...
}

// VirtualCompass.tsx
// Interface for dimensional navigation
function VirtualCompass({ currentDimension, onDimensionChange, maxDimension }) {
  // Implementation details...
}

// QuantumInterface.tsx
// Controls for quantum calculations
function QuantumInterface({ currentDimension, onSuperposition }) {
  // Implementation details...
}
\`\`\`

## Utility Functions

\`\`\`typescript
// quantum.ts
// Utilities for quantum calculations

function calculateUncertainty(precision: number, observerStrength: number): number {
  // Implementation details...
}

function calculateSuperposition(dimensions: number[], entanglementLevel: number): number[] {
  // Implementation details...
}

function collapseQuantumState(states: QuantumState[], observerStrength: number): QuantumState {
  // Implementation details...
}
\`\`\`
`;

      const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(codeDocument);
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "quantum-dimensional-simulator-code.md");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
      resolve();
    } catch (error) {
      console.error("Error exporting codebase document:", error);
      reject(error);
    }
  });
}
