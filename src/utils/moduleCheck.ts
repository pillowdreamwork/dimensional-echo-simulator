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
  const checks = {
    coreRunning: !!modules.simulationCore,
    dreamworkActive: !!modules.pillowDreamwork,
    vectorAlchemyReady:
      !!modules.vectorAlchemy &&
      typeof modules.vectorAlchemy.isReady === 'function' &&
      modules.vectorAlchemy.isReady(),
    ritualSystemOnline:
      !!modules.iuri &&
      typeof modules.iuri.isInitialized === 'function' &&
      modules.iuri.isInitialized(),
    mythicIntelligenceConnected:
      !!modules.mythicAI &&
      typeof modules.mythicAI.isConnected === 'function' &&
      modules.mythicAI.isConnected(),
    uncertaintyEngineCalibrated:
      !!modules.uncertainty &&
      typeof modules.uncertainty.isCalibrated === 'function' &&
      modules.uncertainty.isCalibrated(),
    echoSimulatorFunctional:
      !!modules.echoSimulator &&
      typeof modules.echoSimulator.isOperational === 'function' &&
      modules.echoSimulator.isOperational(),
    dreamServerOnline:
      !!modules.dreamServer &&
      typeof modules.dreamServer.isOnline === 'function' &&
      modules.dreamServer.isOnline(),
    siderAIResponsive:
      !!modules.siderAI &&
      typeof modules.siderAI.isResponsive === 'function' &&
      modules.siderAI.isResponsive(),
  };
  return checks;
}
