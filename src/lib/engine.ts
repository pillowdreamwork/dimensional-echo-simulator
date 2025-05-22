
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

    // Wire modules together with safe checks to avoid runtime errors
    simulationCore.addUpdateListener((frame, dimensions) => {
      // Process dream logic if module and method exist
      if (pillowDreamwork && typeof pillowDreamwork.getDreamState === 'function') {
        const dreamState = pillowDreamwork.getDreamState();
        if (dreamState && dreamState.inDream && typeof pillowDreamwork.processDreamLogic === 'function') {
          pillowDreamwork.processDreamLogic();
        }
      }
      
      // Connect vector alchemy to the dream state if modules and methods exist
      if (vectorAlchemy && pillowDreamwork && 
          typeof pillowDreamwork.getDreamState === 'function') {
        // Safely skip vectorAlchemy.processVectorFields if it doesn't exist
        if (typeof vectorAlchemy.processVectorFields === 'function') {
          vectorAlchemy.processVectorFields(pillowDreamwork.getDreamState());
        }
      }
      
      // Process uncertainty calculations if module and method exist
      if (uncertainty) {
        // Safely skip calculating quantum states if method doesn't exist
        if (typeof uncertainty.calculateQuantumStates === 'function') {
          uncertainty.calculateQuantumStates(frame);
        }
      }
      
      // Update dream compass based on current dimensions
      if (dreamCompass) {
        // Safely skip updating dimensional readings if method doesn't exist
        if (typeof dreamCompass.updateDimensionalReadings === 'function') {
          dreamCompass.updateDimensionalReadings(dimensions);
        }
      }
    });
    
    // Connect Vector Alchemy to Mythic Intelligence if modules and methods exist
    if (vectorAlchemy && mythicAI) {
      // Safely skip registering observer if method doesn't exist
      if (typeof vectorAlchemy.registerObserver === 'function') {
        vectorAlchemy.registerObserver(mythicAI);
      }
    }
    
    // Connect Echo Simulator to Dream Server if modules and methods exist
    if (echoSimulator && dreamServer) {
      // Safely skip connecting to dream server if method doesn't exist
      if (typeof echoSimulator.connectToDreamServer === 'function') {
        echoSimulator.connectToDreamServer(dreamServer);
      }
    }
    
    // Connect Sider AI to all relevant systems for comprehensive insights if module exists
    if (siderAI) {
      // Safely skip connection methods if they don't exist
      if (pillowDreamwork && typeof siderAI.connectToDreamModule === 'function') {
        siderAI.connectToDreamModule(pillowDreamwork);
      }
      if (mythicAI && typeof siderAI.connectToMythicIntelligence === 'function') {
        siderAI.connectToMythicIntelligence(mythicAI);
      }
      if (echoSimulator && typeof siderAI.connectToEchoSimulator === 'function') {
        siderAI.connectToEchoSimulator(echoSimulator);
      }
      if (dreamCompass && typeof siderAI.connectToDreamCompass === 'function') {
        siderAI.connectToDreamCompass(dreamCompass);
      }
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
