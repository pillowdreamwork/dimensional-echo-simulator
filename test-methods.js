// Quick test to verify all required methods exist
import { 
  MythicIntelligence, 
  UncertaintyEngine, 
  MultiversalDreamServer, 
  DreamCompass, 
  VectorAlchemyEngine, 
  EchoSimulator, 
  SiderAI, 
  IURI 
} from './src/lib/pillowdreamwork.ts';

console.log('Testing required methods...');

// Test MythicIntelligence
const mythicAI = new MythicIntelligence();
console.log('MythicIntelligence.isConnected():', typeof mythicAI.isConnected === 'function' ? mythicAI.isConnected() : 'MISSING');

// Test UncertaintyEngine
const uncertainty = new UncertaintyEngine();
console.log('UncertaintyEngine.isCalibrated():', typeof uncertainty.isCalibrated === 'function' ? uncertainty.isCalibrated() : 'MISSING');

// Test MultiversalDreamServer
const dreamServer = new MultiversalDreamServer();
console.log('MultiversalDreamServer.isOnline():', typeof dreamServer.isOnline === 'function' ? dreamServer.isOnline() : 'MISSING');

// Test DreamCompass
const dreamCompass = new DreamCompass();
console.log('DreamCompass.isCalibrated():', typeof dreamCompass.isCalibrated === 'function' ? dreamCompass.isCalibrated() : 'MISSING');

// Test VectorAlchemyEngine
const vectorAlchemy = new VectorAlchemyEngine();
console.log('VectorAlchemyEngine.isReady():', typeof vectorAlchemy.isReady === 'function' ? vectorAlchemy.isReady() : 'MISSING');

// Test EchoSimulator
const echoSimulator = new EchoSimulator();
console.log('EchoSimulator.isOperational():', typeof echoSimulator.isOperational === 'function' ? echoSimulator.isOperational() : 'MISSING');

// Test SiderAI
const siderAI = new SiderAI();
console.log('SiderAI.isResponsive():', typeof siderAI.isResponsive === 'function' ? siderAI.isResponsive() : 'MISSING');

// Test IURI
const iuri = new IURI();
console.log('IURI.isInitialized():', typeof iuri.isInitialized === 'function' ? iuri.isInitialized() : 'MISSING');

console.log('Method testing complete!');
