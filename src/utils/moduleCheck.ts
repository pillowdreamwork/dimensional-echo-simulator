
import { getEngineModules, checkEngineStatus } from '../lib/engine';

export function runSystemCheck() {
  // Check if engine modules are initialized
  const status = checkEngineStatus();
  const modules = getEngineModules();
  
  console.log('Engine Status Check:', status);
  
  // Verify specific functionality
  const checks = {
    coreRunning: !!modules.simulationCore,
    dreamworkActive: !!modules.pillowDreamwork && modules.pillowDreamwork.getDreamState().initialized,
    vectorAlchemyReady: !!modules.vectorAlchemy && modules.vectorAlchemy.isReady(),
    ritualSystemOnline: !!modules.iuri && modules.iuri.isInitialized(),
    mythicIntelligenceConnected: !!modules.mythicAI && modules.mythicAI.isConnected(),
    uncertaintyEngineCalibrated: !!modules.uncertainty && modules.uncertainty.isCalibrated(),
    echoSimulatorFunctional: !!modules.echoSimulator && modules.echoSimulator.isOperational(),
    dreamServerOnline: !!modules.dreamServer && modules.dreamServer.isOnline(),
    siderAIResponsive: !!modules.siderAI && modules.siderAI.isResponsive(),
    dreamCompassCalibrated: !!modules.dreamCompass && modules.dreamCompass.isCalibrated()
  };
  
  console.log('Module Functionality Check:', checks);
  
  // Return overall system status
  const functionalCount = Object.values(checks).filter(Boolean).length;
  const totalModules = Object.keys(checks).length;
  
  return {
    status: functionalCount === totalModules ? 'fully_operational' : 'partially_operational',
    functionalityScore: Math.round((functionalCount / totalModules) * 100),
    moduleChecks: checks
  };
}
