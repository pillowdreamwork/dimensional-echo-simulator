
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

// Debug helpers to check module status
export function checkEngineStatus() {
  return {
    simulationCore: !!simulationCore,
    pillowDreamwork: !!pillowDreamwork,
    vectorAlchemy: !!vectorAlchemy,
    invocationAPI: !!invocationAPI,
    mythicAI: !!mythicAI,
    uncertainty: !!uncertainty,
    echoSimulator: !!echoSimulator,
    dreamServer: !!dreamServer,
    iuri: !!iuri,
    siderAI: !!siderAI,
    dreamCompass: !!dreamCompass
  };
}

// Main entry point for initializing the PillowDreamwork: Dimensional Echo Simulator
export function initializePillowDreamworkGame() {
  // Only initialize once
  if (simulationCore) {
    console.log("Game engine already initialized");
    return getEngineModules();
  }

  try {
    // Initialize core modules
    console.log("Simulation started.");
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
      
      // Connect vector alchemy to the dream state
      if (vectorAlchemy && pillowDreamwork) {
        vectorAlchemy.processVectorFields(pillowDreamwork.getDreamState());
      }
      
      // Process uncertainty calculations
      if (uncertainty) {
        uncertainty.calculateQuantumStates(frame);
      }
      
      // Update dream compass based on current dimensions
      if (dreamCompass) {
        dreamCompass.updateDimensionalReadings(dimensions);
      }
    });
    
    // Connect Vector Alchemy to Mythic Intelligence
    if (vectorAlchemy && mythicAI) {
      vectorAlchemy.registerObserver(mythicAI);
    }
    
    // Connect Echo Simulator to Dream Server
    if (echoSimulator && dreamServer) {
      echoSimulator.connectToDreamServer(dreamServer);
    }
    
    // Connect Sider AI to all relevant systems for comprehensive insights
    if (siderAI) {
      if (pillowDreamwork) siderAI.connectToDreamModule(pillowDreamwork);
      if (mythicAI) siderAI.connectToMythicIntelligence(mythicAI);
      if (echoSimulator) siderAI.connectToEchoSimulator(echoSimulator);
      if (dreamCompass) siderAI.connectToDreamCompass(dreamCompass);
    }
    
    // Start simulation core
    simulationCore.start();
    console.log("PillowDreamwork game engine initialized");
  } catch (error) {
    console.error("Error initializing game engine:", error);
  }

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
