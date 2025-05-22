
import * as engine from '../lib/engine';

// Use the modules property or call the modules function from engine if available
const getEngineModules = () => {
  if (typeof (engine as any).getEngineModules === 'function') {
    return (engine as any).getEngineModules();
  }
  if (typeof (engine as any).modules === 'function') {
    return (engine as any).modules();
  }
  return (engine as any).modules;
};

export function runSystemCheck() {
  const modules = getEngineModules();
  // Optionally log engine status if available
  if (typeof (engine as any).checkEngineStatus === 'function') {
    const status = (engine as any).checkEngineStatus();
    console.log('Engine Status Check:', status);
  }
  
  // Safely check if methods exist before calling them
  const checks = {
    coreRunning: !!modules.simulationCore,
    dreamworkActive: !!modules.pillowDreamwork && 
      typeof modules.pillowDreamwork.getDreamState === 'function' && 
      (() => {
        try {
          const state = modules.pillowDreamwork.getDreamState();
          // Check if the state has an initialized property or if inDream is true
          return state && (state.initialized === true || state.inDream === true);
        } catch (e) {
          console.warn('Error checking dreamwork state:', e);
          return false;
        }
      })(),
    vectorAlchemyReady: !!modules.vectorAlchemy,  // Simple check for existence
    ritualSystemOnline: !!modules.iuri && 
      typeof modules.iuri.isInitialized === 'function' ? 
        modules.iuri.isInitialized() : 
        !!modules.iuri, // Fall back to just checking if the module exists
    mythicIntelligenceConnected: !!modules.mythicAI && 
      typeof modules.mythicAI.isConnected === 'function' ? 
        modules.mythicAI.isConnected() : 
        !!modules.mythicAI, // Fall back to just checking if the module exists
    uncertaintyEngineCalibrated: !!modules.uncertainty,  // Simple check for existence
    echoSimulatorFunctional: !!modules.echoSimulator && 
      typeof modules.echoSimulator.isOperational === 'function' ? 
        modules.echoSimulator.isOperational() : 
        !!modules.echoSimulator, // Fall back to just checking if the module exists
    dreamServerOnline: !!modules.dreamServer && 
      typeof modules.dreamServer.isOnline === 'function' ? 
        modules.dreamServer.isOnline() : 
        !!modules.dreamServer, // Fall back to just checking if the module exists
    siderAIResponsive: !!modules.siderAI && 
      typeof modules.siderAI.isResponsive === 'function' ? 
        modules.siderAI.isResponsive() : 
        !!modules.siderAI, // Fall back to just checking if the module exists
    dreamCompassCalibrated: !!modules.dreamCompass // Simple check for existence
  };
  
  console.log('Module Functionality Check:', checks);
  const functionalCount = Object.values(checks).filter(Boolean).length;
  const totalModules = Object.keys(checks).length;
  return {
    status: functionalCount === totalModules ? 'fully_operational' : 'partially_operational',
    functionalityScore: Math.round((functionalCount / totalModules) * 100),
    moduleChecks: checks
  };
}
