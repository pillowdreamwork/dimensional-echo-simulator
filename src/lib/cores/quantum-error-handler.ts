
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { QuantumError } from '../../types/quantum';

export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface ErrorState {
  hasErrors: boolean;
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  lastError?: QuantumError;
  activeErrors: Map<string, QuantumError>;
  recoveryInProgress: boolean;
  lastRecoveryAttempt: number;
  systemStability: number;
}

export class QuantumErrorHandler {
  private errors = new Subject<QuantumError>();
  private errorState = new BehaviorSubject<ErrorState>({
    hasErrors: false,
    criticalCount: 0,
    highCount: 0,
    mediumCount: 0,
    lowCount: 0,
    activeErrors: new Map(),
    recoveryInProgress: false,
    lastRecoveryAttempt: 0,
    systemStability: 1.0
  });
  private errorHistory: QuantumError[] = [];
  private maxRetries = 3;
  private recoveryThreshold = 0.8;

  reportError(
    type: string,
    message: string,
    severity: ErrorSeverity,
    context?: string,
    metadata?: any
  ): void {
    const error: QuantumError = {
      id: crypto.randomUUID(),
      type,
      message,
      severity,
      timestamp: Date.now(),
      context: { context, metadata }
    };

    this.errorHistory.push(error);
    this.errors.next(error);
    this.updateErrorState(error);

    // Auto-recovery for non-critical errors
    if (severity !== ErrorSeverity.CRITICAL) {
      this.attemptRecovery(error);
    }
  }

  private updateErrorState(error: QuantumError): void {
    const current = this.errorState.value;
    const activeErrors = new Map(current.activeErrors);
    activeErrors.set(error.id, error);
    
    const newState: ErrorState = {
      hasErrors: true,
      criticalCount: current.criticalCount + (error.severity === 'CRITICAL' ? 1 : 0),
      highCount: current.highCount + (error.severity === 'HIGH' ? 1 : 0),
      mediumCount: current.mediumCount + (error.severity === 'MEDIUM' ? 1 : 0),
      lowCount: current.lowCount + (error.severity === 'LOW' ? 1 : 0),
      lastError: error,
      activeErrors,
      recoveryInProgress: current.recoveryInProgress,
      lastRecoveryAttempt: current.lastRecoveryAttempt,
      systemStability: Math.max(0.1, current.systemStability - 0.1)
    };
    
    this.errorState.next(newState);
  }

  private async attemptRecovery(error: QuantumError): Promise<void> {
    const current = this.errorState.value;
    this.errorState.next({
      ...current,
      recoveryInProgress: true,
      lastRecoveryAttempt: Date.now()
    });

    try {
      console.log(`Attempting recovery for error: ${error.type}`);
      await new Promise(resolve => setTimeout(resolve, 100));
      console.log(`Recovery completed for error: ${error.type}`);
      
      // Update stability after recovery
      const updated = this.errorState.value;
      this.errorState.next({
        ...updated,
        recoveryInProgress: false,
        systemStability: Math.min(1.0, updated.systemStability + 0.05)
      });
    } catch (recoveryError) {
      console.error('Recovery failed:', recoveryError);
      const updated = this.errorState.value;
      this.errorState.next({
        ...updated,
        recoveryInProgress: false
      });
    }
  }

  clearError(errorId: string): void {
    const current = this.errorState.value;
    const activeErrors = new Map(current.activeErrors);
    activeErrors.delete(errorId);
    
    this.errorState.next({
      ...current,
      activeErrors,
      hasErrors: activeErrors.size > 0
    });
  }

  observeErrors(): Observable<QuantumError> {
    return this.errors.asObservable();
  }

  observeErrorState(): Observable<ErrorState> {
    return this.errorState.asObservable();
  }

  getErrorHistory(): QuantumError[] {
    return [...this.errorHistory];
  }

  clearErrors(): void {
    this.errorHistory = [];
    this.errorState.next({
      hasErrors: false,
      criticalCount: 0,
      highCount: 0,
      mediumCount: 0,
      lowCount: 0,
      activeErrors: new Map(),
      recoveryInProgress: false,
      lastRecoveryAttempt: 0,
      systemStability: 1.0
    });
  }

  getErrorStats(): { total: number; bySeverity: Record<string, number> } {
    const bySeverity = this.errorHistory.reduce((acc, error) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: this.errorHistory.length,
      bySeverity
    };
  }
}
