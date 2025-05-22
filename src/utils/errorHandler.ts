
import { toast } from "@/hooks/use-toast";
import { resetEngine, initializePillowDreamworkGame } from "../lib/engine";

// Define error handler class
class ErrorHandler {
  private static instance: ErrorHandler;
  private isMonitoring: boolean = false;
  private originalOnError: OnErrorEventHandler | null = null;
  private originalOnUnhandledRejection: ((event: PromiseRejectionEvent) => void) | null = null;
  private errorCount: number = 0;
  private lastErrorTime: number = 0;
  private autoRepairEnabled: boolean = false;
  
  // Get singleton instance
  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }
  
  // Start error monitoring
  public startMonitoring(autoRepair: boolean = false): void {
    if (this.isMonitoring) return;
    
    this.autoRepairEnabled = autoRepair;
    this.errorCount = 0;
    this.lastErrorTime = Date.now();
    
    // Save original handlers
    this.originalOnError = window.onerror;
    this.originalOnUnhandledRejection = window.onunhandledrejection;
    
    // Set up custom error handler
    window.onerror = (message, source, lineno, colno, error) => {
      this.handleError(message.toString(), source?.toString() || '', error);
      
      // Call original handler if it exists
      if (this.originalOnError) {
        return this.originalOnError(message, source, lineno, colno, error);
      }
      return false;
    };
    
    // Set up promise rejection handler
    window.onunhandledrejection = (event) => {
      this.handleError(
        'Unhandled Promise Rejection', 
        '', 
        event.reason instanceof Error ? event.reason : new Error(String(event.reason))
      );
      
      // Call original handler if it exists
      if (this.originalOnUnhandledRejection) {
        this.originalOnUnhandledRejection(event);
      }
    };
    
    this.isMonitoring = true;
    console.log("Error monitoring started", autoRepair ? "with auto-repair enabled" : "");
  }
  
  // Stop error monitoring
  public stopMonitoring(): void {
    if (!this.isMonitoring) return;
    
    // Restore original handlers
    window.onerror = this.originalOnError;
    window.onunhandledrejection = this.originalOnUnhandledRejection;
    
    this.isMonitoring = false;
    console.log("Error monitoring stopped");
  }
  
  // Handle error
  private handleError(message: string, source: string, error: Error | null): void {
    // Increment error count
    this.errorCount++;
    
    // Log error details
    console.error("Error detected:", {
      message,
      source,
      error,
      count: this.errorCount,
      timeSinceLast: Date.now() - this.lastErrorTime
    });
    
    // Update last error time
    this.lastErrorTime = Date.now();
    
    // Check if we should attempt repair
    if (this.autoRepairEnabled) {
      // If multiple errors occur in a short time, attempt repair
      if (this.errorCount >= 3) {
        this.attemptRepair();
        this.errorCount = 0;
      }
    } else if (this.errorCount === 3) {
      // Suggest repair after 3 errors if auto-repair is disabled
      toast({
        title: "System Errors Detected",
        description: "Multiple errors detected. Consider enabling system auto-repair.",
        variant: "destructive",
        duration: 5000,
      });
    }
  }
  
  // Attempt to repair the system
  public attemptRepair(): void {
    console.log("Attempting system repair...");
    
    try {
      // Reset and reinitialize engine
      resetEngine();
      setTimeout(() => {
        initializePillowDreamworkGame();
        
        toast({
          title: "System Repaired",
          description: "Runtime errors have been addressed",
          duration: 3000,
        });
        
        console.log("System repair completed");
      }, 500);
    } catch (err) {
      console.error("Error during repair attempt:", err);
      
      toast({
        title: "Repair Failed",
        description: "Unable to automatically repair system",
        variant: "destructive",
        duration: 3000,
      });
    }
  }
  
  // Set auto-repair state
  public setAutoRepair(enabled: boolean): void {
    this.autoRepairEnabled = enabled;
    console.log("Auto-repair", enabled ? "enabled" : "disabled");
    
    if (enabled) {
      this.errorCount = 0;
    }
  }
  
  // Get monitoring status
  public isActive(): boolean {
    return this.isMonitoring;
  }
  
  // Get auto-repair status
  public isAutoRepairEnabled(): boolean {
    return this.autoRepairEnabled;
  }
}

// Export singleton instance
export const errorHandler = ErrorHandler.getInstance();

// Initialize error handler
export const initializeErrorHandler = (autoRepair: boolean = false) => {
  errorHandler.startMonitoring(autoRepair);
  return errorHandler;
};
