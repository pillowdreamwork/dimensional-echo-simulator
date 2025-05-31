import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { filter, map, retryWhen, delay, take } from 'rxjs/operators';
import { QuantumState, TesseractNode } from './quantum-tesseract';
import { KarmaEvent } from './karma-reflection';

export interface WebSocketMessage {
  type: 'quantum_update' | 'karma_event' | 'dimensional_shift' | 'reality_anchor';
  payload: any;
  timestamp: number;
  signature?: string;
}

export interface ConnectionState {
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
  lastPing?: number;
  latency?: number;
  error?: string;
}

export class RealTimeSync {
  private ws: WebSocket | null = null;
  private messageQueue = new Subject<WebSocketMessage>();
  private connectionState = new BehaviorSubject<ConnectionState>({
    status: 'disconnected'
  });
  private pingInterval: NodeJS.Timer | null = null;
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;
  private readonly RECONNECT_DELAY = 1000;
  private readonly PING_INTERVAL = 30000;

  constructor(
    private readonly wsUrl: string,
    private readonly authToken?: string
  ) {
    this.initializeConnection();
  }

  private initializeConnection(): void {
    this.updateConnectionState({ status: 'connecting' });

    try {
      this.ws = new WebSocket(this.wsUrl);
      this.setupWebSocketHandlers();
      this.startPingInterval();
    } catch (error) {
      this.handleConnectionError(error);
    }
  }

  private setupWebSocketHandlers(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      this.handleConnection();
      if (this.authToken) {
        this.authenticate();
      }
    };

    this.ws.onmessage = (event) => {
      this.handleMessage(event);
    };

    this.ws.onclose = () => {
      this.handleDisconnection();
    };

    this.ws.onerror = (error) => {
      this.handleConnectionError(error);
    };
  }

  private handleConnection(): void {
    this.reconnectAttempts = 0;
    this.updateConnectionState({
      status: 'connected',
      lastPing: Date.now()
    });
  }

  private handleDisconnection(): void {
    this.updateConnectionState({ status: 'disconnected' });
    this.stopPingInterval();

    if (this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS) {
      setTimeout(() => {
        this.reconnectAttempts++;
        this.initializeConnection();
      }, this.RECONNECT_DELAY * Math.pow(2, this.reconnectAttempts));
    }
  }

  private handleConnectionError(error: any): void {
    this.updateConnectionState({
      status: 'error',
      error: error.message || 'Unknown connection error'
    });
  }

  private handleMessage(event: MessageEvent): void {
    try {
      const message: WebSocketMessage = JSON.parse(event.data);
      
      // Handle ping messages separately
      if (message.type === 'ping') {
        this.handlePing(message.timestamp);
        return;
      }

      this.messageQueue.next(message);
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  }

  private authenticate(): void {
    if (!this.ws || !this.authToken) return;

    this.ws.send(JSON.stringify({
      type: 'auth',
      payload: { token: this.authToken },
      timestamp: Date.now()
    }));
  }

  private startPingInterval(): void {
    this.pingInterval = setInterval(() => {
      this.sendPing();
    }, this.PING_INTERVAL);
  }

  private stopPingInterval(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  private sendPing(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      const pingMessage: WebSocketMessage = {
        type: 'ping',
        payload: null,
        timestamp: Date.now()
      };
      this.ws.send(JSON.stringify(pingMessage));
    }
  }

  private handlePing(timestamp: number): void {
    const latency = Date.now() - timestamp;
    this.updateConnectionState({
      lastPing: timestamp,
      latency
    });
  }

  private updateConnectionState(partial: Partial<ConnectionState>): void {
    const current = this.connectionState.value;
    this.connectionState.next({ ...current, ...partial });
  }

  // Public methods for sending updates
  public sendQuantumUpdate(state: QuantumState, nodeId: string): void {
    this.sendMessage({
      type: 'quantum_update',
      payload: { state, nodeId },
      timestamp: Date.now()
    });
  }

  public sendKarmaEvent(event: KarmaEvent): void {
    this.sendMessage({
      type: 'karma_event',
      payload: event,
      timestamp: Date.now()
    });
  }

  public sendDimensionalShift(
    sourceId: string, 
    targetId: string, 
    magnitude: number
  ): void {
    this.sendMessage({
      type: 'dimensional_shift',
      payload: { sourceId, targetId, magnitude },
      timestamp: Date.now()
    });
  }

  public sendRealityAnchor(
    nodeId: string, 
    anchor: TesseractNode['realityAnchor']
  ): void {
    this.sendMessage({
      type: 'reality_anchor',
      payload: { nodeId, anchor },
      timestamp: Date.now()
    });
  }

  private sendMessage(message: WebSocketMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected, message queued');
    }
  }

  // Observable streams for different message types
  public observeQuantumUpdates(): Observable<{ state: QuantumState; nodeId: string }> {
    return this.messageQueue.pipe(
      filter(msg => msg.type === 'quantum_update'),
      map(msg => msg.payload)
    );
  }

  public observeKarmaEvents(): Observable<KarmaEvent> {
    return this.messageQueue.pipe(
      filter(msg => msg.type === 'karma_event'),
      map(msg => msg.payload)
    );
  }

  public observeDimensionalShifts(): Observable<{
    sourceId: string;
    targetId: string;
    magnitude: number;
  }> {
    return this.messageQueue.pipe(
      filter(msg => msg.type === 'dimensional_shift'),
      map(msg => msg.payload)
    );
  }

  public observeRealityAnchors(): Observable<{
    nodeId: string;
    anchor: TesseractNode['realityAnchor'];
  }> {
    return this.messageQueue.pipe(
      filter(msg => msg.type === 'reality_anchor'),
      map(msg => msg.payload)
    );
  }

  public observeConnectionState(): Observable<ConnectionState> {
    return this.connectionState.asObservable();
  }

  // Cleanup
  public disconnect(): void {
    this.stopPingInterval();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
