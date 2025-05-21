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
  const checks = {
    coreRunning: !!modules.simulationCore,
    dreamworkActive: !!modules.pillowDreamwork && typeof modules.pillowDreamwork.getDreamState === 'function' && modules.pillowDreamwork.getDreamState().initialized,
    vectorAlchemyReady: !!modules.vectorAlchemy && typeof modules.vectorAlchemy.isReady === 'function' ? (() => {
      try {
        return modules.vectorAlchemy.isReady();
      } catch (e) {
        console.warn('vectorAlchemy.isReady threw an error:', e);
        return false;
      }
    })() : false,
    ritualSystemOnline: !!modules.iuri && typeof modules.iuri.isInitialized === 'function' && modules.iuri.isInitialized(),
    mythicIntelligenceConnected: !!modules.mythicAI && typeof modules.mythicAI.isConnected === 'function' && modules.mythicAI.isConnected(),
    uncertaintyEngineCalibrated: !!modules.uncertainty && typeof modules.uncertainty.isCalibrated === 'function' && modules.uncertainty.isCalibrated(),
    echoSimulatorFunctional: !!modules.echoSimulator && typeof modules.echoSimulator.isOperational === 'function' && modules.echoSimulator.isOperational(),
    dreamServerOnline: !!modules.dreamServer && typeof modules.dreamServer.isOnline === 'function' && modules.dreamServer.isOnline(),
    siderAIResponsive: !!modules.siderAI && typeof modules.siderAI.isResponsive === 'function' && modules.siderAI.isResponsive(),
    dreamCompassCalibrated: !!modules.dreamCompass && typeof modules.dreamCompass.isCalibrated === 'function' && modules.dreamCompass.isCalibrated()
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
