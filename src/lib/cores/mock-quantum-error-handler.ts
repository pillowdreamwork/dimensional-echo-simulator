
import { QuantumErrorHandler } from './quantum-error-handler';

export class MockQuantumErrorHandler implements Partial<QuantumErrorHandler> {
  errorSubject: any = { subscribe: () => ({}) };
  errorState: any = {};
  currentState: any = {};
  ERROR_CODES: any = {};

  getErrors() {
    return [];
  }

  clearErrors() {
    // Mock implementation
  }

  observeErrors() {
    return {
      subscribe: () => ({})
    };
  }

  // Add other required methods as stubs
  handleError() { return Promise.resolve(); }
  logError() { return Promise.resolve(); }
  recoverFromError() { return Promise.resolve(); }
  getErrorHistory() { return []; }
  setErrorThreshold() { return Promise.resolve(); }
  enableErrorReporting() { return Promise.resolve(); }
  disableErrorReporting() { return Promise.resolve(); }
  exportErrorReport() { return Promise.resolve(''); }
  importErrorReport() { return Promise.resolve(); }
  validateState() { return Promise.resolve(true); }
  sanitizeState() { return Promise.resolve({}); }
  createCheckpoint() { return Promise.resolve(''); }
  restoreCheckpoint() { return Promise.resolve(); }
  getCheckpoints() { return []; }
  clearCheckpoints() { return Promise.resolve(); }
  setRetryPolicy() { return Promise.resolve(); }
  getRetryPolicy() { return {}; }
  enableAutoRecovery() { return Promise.resolve(); }
  disableAutoRecovery() { return Promise.resolve(); }
  getRecoveryStatus() { return {}; }
  forceRecovery() { return Promise.resolve(); }
  reset() { return Promise.resolve(); }
}
