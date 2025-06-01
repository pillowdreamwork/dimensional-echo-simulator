
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { filter, map, retry, catchError } from 'rxjs/operators';
import { QuantumState } from './quantum-tesseract';
import { KarmaEvent } from './karma-reflection';
import { SecureWebSocketManager, WebSocketMessage } from './secure-websocket';

export interface ConnectionState {
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  lastConnected?: number;
  error?: string;
}

export class RealTimeSync {
  private wsManager: SecureWebSocketManager;
  private connectionState$ = new BehaviorSubject<ConnectionState>({ status: 'disconnected' });
  private quantumUpdates$ = new Subject<{ state: QuantumState; nodeId: string }>();
  private karmaEvents$ = new Subject<KarmaEvent>();
  private dimensionalShifts$ = new Subject<{
    sourceId: string;
    targetId: string;
    magnitude: number;
  }>();

  constructor(url: string, authToken?: string) {
    this.wsManager = new SecureWebSocketManager({
      url,
      authToken,
      maxRetries: 3,
      heartbeatInterval: 30000
    });

    this.initializeConnection();
  }

  private initializeConnection(): void {
    try {
      this.wsManager.connect().pipe(
        retry(3),
        catchError(error => {
          console.error('Real-time sync connection error:', error);
          this.connectionState$.next({
            status: 'error',
            error: error.message
          });
          throw error;
        })
      ).subscribe({
        next: (message) => this.handleMessage(message),
        error: (error) => {
          console.error('Real-time sync error:', error);
          this.connectionState$.next({
            status: 'error',
            error: error.message
          });
        }
      });

      // Subscribe to connection state changes
      this.wsManager.observeConnectionState().subscribe(state => {
        this.connectionState$.next({
          status: state as any,
          lastConnected: state === 'connected' ? Date.now() : undefined
        });
      });
    } catch (error) {
      console.error('Failed to initialize real-time sync:', error);
      this.connectionState$.next({
        status: 'error',
        error: error.message
      });
    }
  }

  private handleMessage(message: WebSocketMessage): void {
    try {
      switch (message.type) {
        case 'QUANTUM_UPDATE':
          if (this.isValidQuantumUpdate(message.payload)) {
            this.quantumUpdates$.next(message.payload);
          }
          break;

        case 'KARMA_EVENT':
          if (this.isValidKarmaEvent(message.payload)) {
            this.karmaEvents$.next(message.payload);
          }
          break;

        case 'DIMENSIONAL_SHIFT':
          if (this.isValidDimensionalShift(message.payload)) {
            this.dimensionalShifts$.next(message.payload);
          }
          break;

        default:
          console.warn('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Error handling real-time message:', error);
    }
  }

  private isValidQuantumUpdate(payload: any): payload is { state: QuantumState; nodeId: string } {
    return (
      payload &&
      typeof payload.nodeId === 'string' &&
      payload.state &&
      typeof payload.state === 'object'
    );
  }

  private isValidKarmaEvent(payload: any): payload is KarmaEvent {
    return (
      payload &&
      typeof payload.id === 'string' &&
      typeof payload.type === 'string' &&
      typeof payload.magnitude === 'number'
    );
  }

  private isValidDimensionalShift(payload: any): payload is {
    sourceId: string;
    targetId: string;
    magnitude: number;
  } {
    return (
      payload &&
      typeof payload.sourceId === 'string' &&
      typeof payload.targetId === 'string' &&
      typeof payload.magnitude === 'number'
    );
  }

  // Public API methods
  observeConnectionState(): Observable<ConnectionState> {
    return this.connectionState$.asObservable();
  }

  observeQuantumUpdates(): Observable<{ state: QuantumState; nodeId: string }> {
    return this.quantumUpdates$.asObservable();
  }

  observeKarmaEvents(): Observable<KarmaEvent> {
    return this.karmaEvents$.asObservable();
  }

  observeDimensionalShifts(): Observable<{
    sourceId: string;
    targetId: string;
    magnitude: number;
  }> {
    return this.dimensionalShifts$.asObservable();
  }

  sendQuantumUpdate(state: QuantumState, nodeId: string): void {
    try {
      this.wsManager.sendMessage({
        type: 'QUANTUM_UPDATE',
        payload: { state, nodeId }
      });
    } catch (error) {
      console.error('Failed to send quantum update:', error);
    }
  }

  sendKarmaEvent(event: KarmaEvent): void {
    try {
      this.wsManager.sendMessage({
        type: 'KARMA_EVENT',
        payload: event
      });
    } catch (error) {
      console.error('Failed to send karma event:', error);
    }
  }

  sendDimensionalShift(sourceId: string, targetId: string, magnitude: number): void {
    try {
      this.wsManager.sendMessage({
        type: 'DIMENSIONAL_SHIFT',
        payload: { sourceId, targetId, magnitude }
      });
    } catch (error) {
      console.error('Failed to send dimensional shift:', error);
    }
  }

  disconnect(): void {
    this.wsManager.disconnect();
    this.connectionState$.next({ status: 'disconnected' });
  }
}
