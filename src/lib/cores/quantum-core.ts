
import { Observable, BehaviorSubject } from 'rxjs';
import { QuantumState } from '../../types/quantum';
import { GPUAccelerator } from './gpu-accelerator';
import { PerformanceMonitor } from './performance-monitor';

export interface QuantumCoreConfig {
  useGPU: boolean;
  maxStates: number;
  optimizationLevel: number;
}

export class QuantumCore {
  private states = new BehaviorSubject<Map<string, QuantumState>>(new Map());
  private gpuAccelerator: GPUAccelerator;
  private performanceMonitor: PerformanceMonitor;
  private isInitialized = false;

  constructor(private config: QuantumCoreConfig = {
    useGPU: false,
    maxStates: 1000,
    optimizationLevel: 1
  }) {
    this.gpuAccelerator = new GPUAccelerator();
    this.performanceMonitor = new PerformanceMonitor();
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      await this.gpuAccelerator.initialize();
      this.performanceMonitor.startMonitoring();
      this.isInitialized = true;
      console.log('Quantum Core initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Quantum Core:', error);
      throw error;
    }
  }

  async processQuantumState(stateId: string, partialState: Partial<QuantumState>): Promise<QuantumState> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const startTime = performance.now();
    
    try {
      const processedState = await this.gpuAccelerator.processQuantumState(partialState);
      const states = this.states.value;
      states.set(stateId, processedState);
      this.states.next(states);
      
      const duration = performance.now() - startTime;
      this.performanceMonitor.recordWorkerTime(duration);
      
      return processedState;
    } catch (error) {
      console.error('Failed to process quantum state:', error);
      throw error;
    }
  }

  observeStates(): Observable<Map<string, QuantumState>> {
    return this.states.asObservable();
  }

  getState(stateId: string): QuantumState | undefined {
    return this.states.value.get(stateId);
  }

  getAllStates(): QuantumState[] {
    return Array.from(this.states.value.values());
  }

  getMetrics() {
    return this.performanceMonitor.getMetrics();
  }

  async optimizeSystem(): Promise<void> {
    const states = this.getAllStates();
    const optimizedStates = await this.gpuAccelerator.compute(states);
    
    const statesMap = this.states.value;
    optimizedStates.forEach((state, index) => {
      const stateId = Array.from(statesMap.keys())[index];
      if (stateId) {
        statesMap.set(stateId, state);
      }
    });
    
    this.states.next(statesMap);
  }
}
