
import { Observable } from 'rxjs';
import { QuantumError } from '../../types/quantum';

export class MockQuantumErrorHandler {
  observeErrors(): Observable<QuantumError> {
    return new Observable(subscriber => {
      const interval = setInterval(() => {
        subscriber.next({
          id: crypto.randomUUID(),
          type: 'MOCK_ERROR',
          message: 'Mock error for testing',
          severity: 'LOW' as const,
          timestamp: Date.now()
        });
      }, 5000);
      
      return () => clearInterval(interval);
    });
  }

  handleError(error: any): void {
    console.log('Mock error handler:', error);
  }

  reportError(error: QuantumError): void {
    console.log('Mock report error:', error);
  }
}
