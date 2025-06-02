import { useState, useCallback, useRef, useEffect } from 'react';

export type ToastVariant = 'default' | 'destructive';  // Matching Radix UI Toast variants

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: React.ReactNode;
}

interface ToastOptions extends Omit<Toast, 'id'> {
  duration?: number;
  dismissible?: boolean;
  onDismiss?: () => void;
  persist?: boolean;
}

interface ToastConfig {
  maxToasts?: number;
  defaultDuration?: number;
  pauseOnHover?: boolean;
}

interface UseToastResult {
  toasts: Toast[];
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  clearAll: () => void;
  update: (id: string, options: Partial<ToastOptions>) => void;
  pause: (id: string) => void;
  resume: (id: string) => void;
}

const DEFAULT_CONFIG: ToastConfig = {
  maxToasts: 5,
  defaultDuration: 5000,
  pauseOnHover: true
};

export function useToast(config: ToastConfig = {}): UseToastResult {
  const {
    maxToasts = DEFAULT_CONFIG.maxToasts,
    defaultDuration = DEFAULT_CONFIG.defaultDuration,
    pauseOnHover = DEFAULT_CONFIG.pauseOnHover
  } = config;

  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutsRef = useRef(new Map<string, NodeJS.Timeout>());
  const pausedAtRef = useRef(new Map<string, number>());
  const remainingTimeRef = useRef(new Map<string, number>());

  const dismiss = useCallback((id: string): void => {
    setToasts(prev => {
      const toast = prev.find(t => t.id === id);
      if (toast?.onDismiss) {
        toast.onDismiss();
      }
      return prev.filter(t => t.id !== id);
    });
    
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }
    
    pausedAtRef.current.delete(id);
    remainingTimeRef.current.delete(id);
  }, []);

  const clearAll = useCallback((): void => {
    toasts.forEach(toast => {
      if (toast.onDismiss) {
        toast.onDismiss();
      }
    });
    
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current.clear();
    pausedAtRef.current.clear();
    remainingTimeRef.current.clear();
    setToasts([]);
  }, [toasts]);

  const update = useCallback((id: string, options: Partial<ToastOptions>): void => {
    setToasts(prev => 
      prev.map(t => 
        t.id === id ? { ...t, ...options } : t
      )
    );
  }, []);

  const pause = useCallback((id: string): void => {
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(id);
      pausedAtRef.current.set(id, Date.now());
    }
  }, []);

  const resume = useCallback((id: string): void => {
    const pausedAt = pausedAtRef.current.get(id);
    const remainingTime = remainingTimeRef.current.get(id);
    
    if (pausedAt && remainingTime) {
      const elapsed = Date.now() - pausedAt;
      const newTimeout = setTimeout(() => {
        dismiss(id);
      }, Math.max(0, remainingTime - elapsed));
      
      timeoutsRef.current.set(id, newTimeout);
      pausedAtRef.current.delete(id);
    }
  }, [dismiss]);

  const toast = useCallback((options: ToastOptions): string => {
    const {
      title,
      description,
      variant = 'default',
      duration = defaultDuration,
      dismissible = true,
      persist = false,
      onDismiss,
      action
    } = options;

    // Generate unique ID
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create new toast
    const newToast: Toast = {
      id,
      title,
      description,
      variant,
      dismissible,
      onDismiss,
      action
    };

    // Add toast while respecting maxToasts limit
    setToasts(prev => {
      const nextToasts = [...prev, newToast];
      if (nextToasts.length > maxToasts) {
        const [oldestToast, ...remainingToasts] = nextToasts;
        if (oldestToast.onDismiss) {
          oldestToast.onDismiss();
        }
        return remainingToasts;
      }
      return nextToasts;
    });

    // Set up auto-dismiss timer if not persistent
    if (!persist && duration > 0) {
      const timeout = setTimeout(() => {
        dismiss(id);
      }, duration);
      
      timeoutsRef.current.set(id, timeout);
      remainingTimeRef.current.set(id, duration);
    }

    return id;
  }, [defaultDuration, maxToasts, dismiss]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current.clear();
      pausedAtRef.current.clear();
      remainingTimeRef.current.clear();
    };
  }, []);

  return {
    toasts,
    toast,
    dismiss,
    clearAll,
    update,
    pause,
    resume
  };
}
