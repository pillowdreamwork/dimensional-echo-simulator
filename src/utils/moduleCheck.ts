import { getEngineModules, checkEngineStatus } from '../lib/engine';

export function runSystemCheck() {
  const modules = getEngineModules();
  
  // Log engine status 
  const status = checkEngineStatus();
  console.log('Engine Status Check:', status);
  
  const checks = {
    coreRunning: !!modules.simulationCore,
    dreamworkActive: !!modules.pillowDreamwork && typeof modules.pillowDreamwork.getDreamState === 'function' && modules.pillowDreamwork.getDreamState().inDream,
    vectorAlchemyReady: !!modules.vectorAlchemy && typeof modules.vectorAlchemy.isReady === 'function' ? (() => {
      try {
        return modules.vectorAlchemy.isReady();
      } catch (e) {
        console.warn('vectorAlchemy.isReady threw an error:', e);
        return false;
      }
    })() : false,
    ritualSystemOnline: !!modules.iuri && typeof modules.iuri.isInitialized === 'function' ? (() => {
      try {
        return modules.iuri.isInitialized();
      } catch (e) {
        console.warn('iuri.isInitialized threw an error:', e);
        return false;
      }
    })() : false,
    mythicIntelligenceConnected: !!modules.mythicAI && typeof modules.mythicAI.isConnected === 'function' ? (() => {
      try {
        return modules.mythicAI.isConnected();
      } catch (e) {
        console.warn('mythicAI.isConnected threw an error:', e);
        return false;
      }
    })() : false,
    uncertaintyEngineCalibrated: !!modules.uncertainty && typeof modules.uncertainty.isCalibrated === 'function' ? (() => {
      try {
        return modules.uncertainty.isCalibrated();
      } catch (e) {
        console.warn('uncertainty.isCalibrated threw an error:', e);
        return false;
      }
    })() : false,
    echoSimulatorFunctional: !!modules.echoSimulator && typeof modules.echoSimulator.isOperational === 'function' ? (() => {
      try {
        return modules.echoSimulator.isOperational();
      } catch (e) {
        console.warn('echoSimulator.isOperational threw an error:', e);
        return false;
      }
    })() : false,
    dreamServerOnline: !!modules.dreamServer && typeof modules.dreamServer.isOnline === 'function' ? (() => {
      try {
        return modules.dreamServer.isOnline();
      } catch (e) {
        console.warn('dreamServer.isOnline threw an error:', e);
        return false;
      }
    })() : false,
    siderAIResponsive: !!modules.siderAI && typeof modules.siderAI.isResponsive === 'function' ? (() => {
      try {
        return modules.siderAI.isResponsive();
      } catch (e) {
        console.warn('siderAI.isResponsive threw an error:', e);
        return false;
      }
    })() : false,
    dreamCompassCalibrated: !!modules.dreamCompass && typeof modules.dreamCompass.isCalibrated === 'function' ? (() => {
      try {
        return modules.dreamCompass.isCalibrated();
      } catch (e) {
        console.warn('dreamCompass.isCalibrated threw an error:', e);
        return false;
      }
    })() : false
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
