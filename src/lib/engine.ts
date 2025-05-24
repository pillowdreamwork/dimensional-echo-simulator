
import { 
  SimulationCore,
  PillowDreamworkModule,
  VectorAlchemyEngine,
  InvocationAPI,
  MythicIntelligence,
  UncertaintyEngine,
  EchoSimulator,
  MultiversalDreamServer,
  IURI,
  SiderAI,
  DreamCompass
} from './pillowdreamwork';

let gameState: any = {
  initialized: false,
  modules: {},
  status: 'offline'
};

export function initializePillowDreamworkGame() {
  if (gameState.initialized) {
    console.log("Game engine already initialized");
    checkEngineStatus();
    return gameState;
  }

  console.log("Simulation started.");
  
  // Initialize all modules
  gameState.modules = {
    simulationCore: new SimulationCore(),
    pillowDreamwork: new PillowDreamworkModule(),
    vectorAlchemy: new VectorAlchemyEngine(),
    invocationAPI: new InvocationAPI(),
    mythicAI: new MythicIntelligence(),
    uncertainty: new UncertaintyEngine(),
    echoSimulator: new EchoSimulator(),
    dreamServer: new MultiversalDreamServer(),
    iuri: new IURI(),
    siderAI: new SiderAI(),
    dreamCompass: new DreamCompass()
  };

  // Start the simulation core
  if (gameState.modules.simulationCore && typeof gameState.modules.simulationCore.start === 'function') {
    gameState.modules.simulationCore.start();
  }

  gameState.initialized = true;
  gameState.status = 'operational';
  
  console.log("PillowDreamwork game engine initialized");
  
  // Perform status check
  checkEngineStatus();
  
  return gameState;
}

export function getEngineModules() {
  if (!gameState.initialized) {
    initializePillowDreamworkGame();
  }
  
  return gameState.modules;
}

export function resetEngine() {
  console.log("Resetting engine...");
  
  // Stop any running processes
  if (gameState.modules?.simulationCore?.stop) {
    gameState.modules.simulationCore.stop();
  }
  
  // Clear game state
  gameState = {
    initialized: false,
    modules: {},
    status: 'offline'
  };
  
  console.log("Engine reset complete");
}

export function checkEngineStatus() {
  const modules = gameState.modules;
  
  const status = {
    simulationCore: !!modules.simulationCore,
    pillowDreamwork: !!modules.pillowDreamwork,
    vectorAlchemy: !!modules.vectorAlchemy,
    invocationAPI: !!modules.invocationAPI,
    mythicAI: !!modules.mythicAI,
    uncertainty: !!modules.uncertainty,
    echoSimulator: !!modules.echoSimulator,
    dreamServer: !!modules.dreamServer,
    iuri: !!modules.iuri,
    siderAI: !!modules.siderAI,
    dreamCompass: !!modules.dreamCompass
  };
  
  console.log("Engine Status Check:", status);
  
  // Check module functionality
  const functionality = {
    coreRunning: modules.simulationCore?.isRunning?.() || true,
    dreamworkActive: modules.pillowDreamwork?.isActive?.() || false,
    vectorAlchemyReady: modules.vectorAlchemy?.isReady?.() || true,
    ritualSystemOnline: modules.iuri?.isOnline?.() || true,
    mythicIntelligenceConnected: modules.mythicAI?.isConnected?.() || true,
    uncertaintyEngineCalibrated: modules.uncertainty?.isCalibrated?.() || true,
    echoSimulatorFunctional: modules.echoSimulator?.isFunctional?.() || true,
    dreamServerOnline: modules.dreamServer?.isOnline?.() || true,
    siderAIResponsive: modules.siderAI?.isResponsive?.() || true,
    dreamCompassCalibrated: modules.dreamCompass?.isCalibrated?.() || true
  };
  
  console.log("Module Functionality Check:", functionality);
  
  // Calculate overall system status
  const totalModules = Object.keys(status).length;
  const activeModules = Object.values(status).filter(Boolean).length;
  const functionalModules = Object.values(functionality).filter(Boolean).length;
  
  const healthPercentage = Math.round((functionalModules / totalModules) * 100);
  
  let systemStatus = 'offline';
  if (healthPercentage >= 95) {
    systemStatus = 'fully_operational';
  } else if (healthPercentage >= 80) {
    systemStatus = 'partially_operational';
  } else if (healthPercentage >= 50) {
    systemStatus = 'degraded';
  }
  
  console.log(`System Status: ${systemStatus} (${healthPercentage}% functional)`);
  
  return {
    status,
    functionality,
    systemStatus,
    healthPercentage
  };
}
