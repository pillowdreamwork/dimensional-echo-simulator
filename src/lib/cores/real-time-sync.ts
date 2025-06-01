import { Observable, Subject } from 'rxjs';
import { QuantumState } from './quantum-tesseract';
import { KarmaEvent } from './karma-reflection';

export interface WebSocketMessage {
  type: 'quantum_update' | 'karma_event' | 'dimensional_shift' | 'reality_anchor';
  payload: any;
  timestamp: number;
  id: string;
}

export interface ConnectionState {
  status: 'connected' | 'connecting' | 'disconnected' | 'error';
  lastConnected?: Date;
  reconnectAttempts?: number;
  latency?: number;
}

interface DimensionalShift {
  sourceId: string;
  targetId: string;
  magnitude: number;
}

export class RealTimeSync {
  private ws: WebSocket | null = null;
  private url: string;
  private authToken?: string;
  private connectionStateSubject = new Subject<ConnectionState>();
  private quantumUpdateSubject = new Subject<{ state: QuantumState; nodeId: string }>();
  private karmaEventSubject = new Subject<KarmaEvent>();
  private dimensionalShiftSubject = new Subject<DimensionalShift>();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectInterval = 3000;
  private reconnectTimeoutId: NodeJS.Timeout | null = null;

  constructor(url: string, authToken?: string) {
    this.url = url;
    this.authToken = authToken;
    this.connect();
  }

  private connect() {
    if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
      console.log('Already connected or connecting.');
      return;
    }

    this.connectionStateSubject.next({ status: 'connecting' });
    this.ws = new WebSocket(this.url, this.authToken ? ['Authorization', `Bearer ${this.authToken}`] : []);

    this.ws.onopen = () => {
      console.log('Connected to WebSocket server.');
      this.reconnectAttempts = 0;
      this.connectionStateSubject.next({ status: 'connected', lastConnected: new Date() });
    };

    this.ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        switch (message.type) {
          case 'quantum_update':
            this.quantumUpdateSubject.next(message.payload);
            break;
          case 'karma_event':
            this.karmaEventSubject.next(message.payload);
            break;
          case 'dimensional_shift':
            this.dimensionalShiftSubject.next(message.payload);
            break;
          default:
            console.warn('Unknown message type:', message.type);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    this.ws.onclose = (event) => {
      console.log('Disconnected from WebSocket server:', event.reason);
      this.connectionStateSubject.next({ status: 'disconnected' });
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.connectionStateSubject.next({ status: 'error' });
    };
  }

  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      this.reconnectTimeoutId = setTimeout(() => this.connect(), this.reconnectInterval);
    } else {
      console.error('Max reconnect attempts reached. Giving up.');
      this.connectionStateSubject.next({ status: 'error' });
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
      if (this.reconnectTimeoutId) {
        clearTimeout(this.reconnectTimeoutId);
      }
      this.connectionStateSubject.next({ status: 'disconnected' });
    }
  }

  sendMessage(message: WebSocketMessage) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected. Message dropped.');
    }
  }

  sendQuantumUpdate(state: QuantumState, nodeId: string) {
    this.sendMessage({
      type: 'quantum_update',
      payload: { state, nodeId },
      timestamp: Date.now(),
      id: 'quantum-' + Date.now()
    });
  }

  sendKarmaEvent(event: KarmaEvent) {
    this.sendMessage({
      type: 'karma_event',
      payload: event,
      timestamp: Date.now(),
      id: 'karma-' + Date.now()
    });
  }

  sendDimensionalShift(sourceId: string, targetId: string, magnitude: number) {
    this.sendMessage({
      type: 'dimensional_shift',
      payload: { sourceId, targetId, magnitude },
      timestamp: Date.now(),
      id: 'shift-' + Date.now()
    });
  }

  observeConnectionState(): Observable<ConnectionState> {
    return this.connectionStateSubject.asObservable();
  }

  observeQuantumUpdates(): Observable<{ state: QuantumState; nodeId: string }> {
    return this.quantumUpdateSubject.asObservable();
  }

  observeKarmaEvents(): Observable<KarmaEvent> {
    return this.karmaEventSubject.asObservable();
  }

  observeDimensionalShifts(): Observable<DimensionalShift> {
    return this.dimensionalShiftSubject.asObservable();
  }

  observeRealityAnchors() {
    return new Observable(subscriber => {
      const handleMessage = (event: MessageEvent) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          if (message.type === 'reality_anchor') {
            subscriber.next(message.payload);
          }
        } catch (error) {
          console.error('Error parsing reality anchor message:', error);
        }
      };

      if (this.ws) {
        this.ws.addEventListener('message', handleMessage);
        return () => {
          if (this.ws) {
            this.ws.removeEventListener('message', handleMessage);
          }
        };
      }

      return () => {};
    });
  }
}
