
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { retry, tap, catchError } from 'rxjs/operators';

export interface SecureConnectionConfig {
  url: string;
  authToken?: string;
  maxRetries?: number;
  heartbeatInterval?: number;
}

export interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: number;
  signature?: string;
}

export class SecureWebSocketManager {
  private connection$: WebSocketSubject<WebSocketMessage> | null = null;
  private connectionState$ = new BehaviorSubject<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  private messageSubject$ = new Subject<WebSocketMessage>();
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts: number;
  private isAuthenticated = false;

  constructor(private config: SecureConnectionConfig) {
    this.maxReconnectAttempts = config.maxRetries || 5;
  }

  connect(): Observable<WebSocketMessage> {
    if (this.connection$ && !this.connection$.closed) {
      return this.messageSubject$.asObservable();
    }

    this.connectionState$.next('connecting');

    // Validate auth token before connecting
    if (!this.validateAuthToken(this.config.authToken)) {
      this.connectionState$.next('error');
      throw new Error('Invalid or missing authentication token');
    }

    try {
      this.connection$ = webSocket({
        url: this.buildSecureUrl(),
        openObserver: {
          next: () => {
            console.log('WebSocket connection established');
            this.connectionState$.next('connected');
            this.reconnectAttempts = 0;
            this.startHeartbeat();
            this.authenticateConnection();
          }
        },
        closeObserver: {
          next: () => {
            console.log('WebSocket connection closed');
            this.connectionState$.next('disconnected');
            this.stopHeartbeat();
            this.isAuthenticated = false;
            this.handleReconnection();
          }
        }
      });

      this.connection$.pipe(
        tap(message => this.handleIncomingMessage(message)),
        retry(this.maxReconnectAttempts),
        catchError(error => {
          console.error('WebSocket error:', error);
          this.connectionState$.next('error');
          throw error;
        })
      ).subscribe(
        message => this.messageSubject$.next(message),
        error => {
          console.error('WebSocket subscription error:', error);
          this.connectionState$.next('error');
        }
      );

      return this.messageSubject$.asObservable();
    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
      this.connectionState$.next('error');
      throw error;
    }
  }

  private validateAuthToken(token?: string): boolean {
    if (!token) return false;
    
    try {
      // Basic JWT validation - check if it's properly formatted
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      // Decode payload to check expiration
      const payload = JSON.parse(atob(parts[1]));
      const now = Math.floor(Date.now() / 1000);
      
      return payload.exp > now;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  private buildSecureUrl(): string {
    const url = new URL(this.config.url);
    
    // Ensure WSS protocol for security
    if (url.protocol === 'ws:') {
      url.protocol = 'wss:';
    }
    
    // Add auth token as query parameter
    if (this.config.authToken) {
      url.searchParams.set('token', this.config.authToken);
    }
    
    return url.toString();
  }

  private authenticateConnection(): void {
    if (!this.connection$ || !this.config.authToken) return;

    const authMessage: WebSocketMessage = {
      type: 'AUTH',
      payload: { token: this.config.authToken },
      timestamp: Date.now()
    };

    this.connection$.next(authMessage);
  }

  private handleIncomingMessage(message: WebSocketMessage): void {
    // Validate message structure
    if (!this.isValidMessage(message)) {
      console.warn('Received invalid message:', message);
      return;
    }

    // Handle authentication response
    if (message.type === 'AUTH_SUCCESS') {
      this.isAuthenticated = true;
      console.log('WebSocket authentication successful');
    } else if (message.type === 'AUTH_FAILED') {
      console.error('WebSocket authentication failed');
      this.disconnect();
    }

    // Only process messages if authenticated
    if (!this.isAuthenticated && message.type !== 'AUTH_SUCCESS') {
      console.warn('Ignoring message - not authenticated');
      return;
    }
  }

  private isValidMessage(message: any): message is WebSocketMessage {
    return (
      typeof message === 'object' &&
      typeof message.type === 'string' &&
      typeof message.timestamp === 'number' &&
      message.payload !== undefined
    );
  }

  private startHeartbeat(): void {
    if (this.heartbeatInterval) return;

    this.heartbeatInterval = setInterval(() => {
      if (this.connection$ && this.isAuthenticated) {
        const heartbeat: WebSocketMessage = {
          type: 'HEARTBEAT',
          payload: { timestamp: Date.now() },
          timestamp: Date.now()
        };
        this.connection$.next(heartbeat);
      }
    }, this.config.heartbeatInterval || 30000);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private handleReconnection(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      this.reconnectAttempts++;
      
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.connect();
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
      this.connectionState$.next('error');
    }
  }

  sendMessage(message: Omit<WebSocketMessage, 'timestamp'>): void {
    if (!this.connection$ || !this.isAuthenticated) {
      throw new Error('WebSocket not connected or not authenticated');
    }

    const fullMessage: WebSocketMessage = {
      ...message,
      timestamp: Date.now()
    };

    this.connection$.next(fullMessage);
  }

  observeConnectionState(): Observable<string> {
    return this.connectionState$.asObservable();
  }

  disconnect(): void {
    this.stopHeartbeat();
    this.isAuthenticated = false;
    
    if (this.connection$) {
      this.connection$.complete();
      this.connection$ = null;
    }
    
    this.connectionState$.next('disconnected');
  }
}
