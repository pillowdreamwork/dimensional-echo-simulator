import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';

interface SyncEvent<T> {
  type: string;
  payload: T;
}

interface SyncOptions {
  url: string;
  autoConnect?: boolean;
  reconnectionAttempts?: number;
}

export class RealTimeSyncManager {
  private socket: Socket | null = null;
  private connectionStatus = new BehaviorSubject<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  private syncEvents = new BehaviorSubject<SyncEvent<any> | null>(null);
  private options: SyncOptions;
  private reconnectionAttempt = 0;

  constructor(options: SyncOptions) {
    this.options = { autoConnect: true, reconnectionAttempts: 3, ...options };

    if (this.options.autoConnect) {
      this.connect();
    }
  }

  public connect(): void {
    if (this.socket?.connected || this.connectionStatus.value === 'connecting') {
      return;
    }

    this.connectionStatus.next('connecting');
    this.socket = io(this.options.url, {
      reconnectionAttempts: this.options.reconnectionAttempts,
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      this.connectionStatus.next('connected');
      this.reconnectionAttempt = 0;
      console.log('Connected to sync server');
    });

    this.socket.on('disconnect', () => {
      this.connectionStatus.next('disconnected');
      console.log('Disconnected from sync server');
    });

    this.socket.on('syncEvent', (event: SyncEvent<any>) => {
      this.syncEvents.next(event);
    });

    this.socket.on('connect_error', (error: Error) => {
      console.error('Connection error:', error);
      this.handleConnectionError(error);
    });

    this.socket.on('reconnect_attempt', (attempt: number) => {
      console.log(`Attempting to reconnect: ${attempt}`);
      this.reconnectionAttempt = attempt;
    });

    this.socket.on('reconnect_error', (error: Error) => {
      console.error('Reconnection error:', error);
    });

    this.socket.on('reconnect_failed', () => {
      console.error('Failed to reconnect');
      this.connectionStatus.next('error');
    });
  }

  private handleConnectionError(error: Error): void {
    if (this.reconnectionAttempt >= (this.options.reconnectionAttempts || 3)) {
      this.connectionStatus.next('error');
      console.error('Max reconnection attempts reached. Connection failed.');
      this.socket?.disconnect();
    } else {
      console.error('Connection error:', error);
    }
  }

  public disconnect(): void {
    this.socket?.disconnect();
    this.connectionStatus.next('disconnected');
  }

  public emit<T>(event: SyncEvent<T>): void {
    if (this.socket?.connected) {
      this.socket.emit('syncEvent', event);
    } else {
      console.warn('Socket not connected, event not emitted:', event);
    }
  }

  public onSyncEvent(): Observable<SyncEvent<any>> {
    return this.syncEvents.asObservable().pipe(
      (event) => {
        if (event) {
          return new BehaviorSubject(event).asObservable();
        }
        return new BehaviorSubject(null).asObservable();
      }
    );
  }

  public getConnectionStatus(): Observable<'disconnected' | 'connecting' | 'connected' | 'error'> {
    return this.connectionStatus.asObservable();
  }

  public getSocketId(): string | undefined {
    return this.socket?.id;
  }
  
  public getLatency(): Promise<number> {
    return new Promise((resolve, reject) => {
      if (!this.socket?.connected) {
        reject(new Error('Socket not connected'));
        return;
      }
  
      const start = Date.now();
      this.socket.emit('ping', () => {
        const latency = Date.now() - start;
        resolve(latency);
      });
    });
  }

  private handleWebSocketMessage(event: MessageEvent): void {
    try {
      const message = JSON.parse(event.data);
      // Handle different message types
      switch (message.type) {
        case 'stateUpdate':
          // Process state update
          console.log('Received state update:', message.payload);
          break;
        case 'nodeUpdate':
          // Process node update
          console.log('Received node update:', message.payload);
          break;
        // Add more cases as needed
        default:
          console.log('Received unknown message:', message);
      }
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  }

  public close(): void {
    this.socket?.close();
    this.connectionStatus.next('disconnected');
    console.log('WebSocket connection closed.');
  }
}
