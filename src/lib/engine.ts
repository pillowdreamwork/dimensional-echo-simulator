
import { SimulationCore, PillowDreamworkModule, VectorAlchemyEngine, InvocationAPI, MythicIntelligence, UncertaintyEngine, EchoSimulator, MultiversalDreamServer, IURI, SiderAI, DreamCompass } from '../lib/pillowdreamwork';

// Global singleton instances for the entire application
let simulationCore: SimulationCore | null = null;
let pillowDreamwork: PillowDreamworkModule | null = null;
let vectorAlchemy: VectorAlchemyEngine | null = null;
let invocationAPI: InvocationAPI | null = null;
let mythicAI: MythicIntelligence | null = null;
let uncertainty: UncertaintyEngine | null = null;
let echoSimulator: EchoSimulator | null = null;
let dreamServer: MultiversalDreamServer | null = null;
let iuri: IURI | null = null;
let siderAI: SiderAI | null = null;
let dreamCompass: DreamCompass | null = null;

// Main entry point for initializing the PillowDreamwork: Dimensional Echo Simulator
export function initializePillowDreamworkGame() {
  // Only initialize once
  if (simulationCore) {
    console.log("Game engine already initialized");
    return getEngineModules();
  }

  // Initialize core modules
  simulationCore = new SimulationCore();
  pillowDreamwork = new PillowDreamworkModule();
  vectorAlchemy = new VectorAlchemyEngine();
  iuri = new IURI();
  invocationAPI = new InvocationAPI(iuri);
  mythicAI = new MythicIntelligence();
  uncertainty = new UncertaintyEngine();
  echoSimulator = new EchoSimulator();
  dreamServer = new MultiversalDreamServer();
  siderAI = new SiderAI();
  dreamCompass = new DreamCompass();

  // Wire modules together
  simulationCore.addUpdateListener((frame, dimensions) => {
    if (pillowDreamwork?.getDreamState().inDream) {
      pillowDreamwork.processDreamLogic();
    }
  });
  
  // Start simulation core
  simulationCore.start();
  console.log("PillowDreamwork game engine initialized");

  return getEngineModules();
}

// Get access to all engine modules
export function getEngineModules() {
  if (!simulationCore) {
    initializePillowDreamworkGame();
  }
  
  return {
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
  };
}

// Get a specific module by name
export function getModule(moduleName: string) {
  const modules = getEngineModules();
  return modules[moduleName as keyof typeof modules] || null;
}

// Reset the entire engine (useful for testing or cleanup)
export function resetEngine() {
  if (simulationCore) {
    simulationCore.stop();
  }
  
  simulationCore = null;
  pillowDreamwork = null;
  vectorAlchemy = null;
  invocationAPI = null;
  mythicAI = null;
  uncertainty = null;
  echoSimulator = null;
  dreamServer = null;
  iuri = null;
  siderAI = null;
  dreamCompass = null;
  
  console.log("Engine reset complete");
  return true;
}
