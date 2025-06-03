
import { Observable, BehaviorSubject } from 'rxjs';

export interface OptimizationMetrics {
  computeTime: number;
  memoryUsage: number;
  operationsPerSecond: number;
  batchSize: number;
  optimizationLevel: number;
  gpuEnabled: boolean;
  simdEnabled: boolean;
}

export class QuantumOptimizer {
  private metrics = new BehaviorSubject<OptimizationMetrics>({
    computeTime: 0,
    memoryUsage: 0,
    operationsPerSecond: 0,
    batchSize: 64,
    optimizationLevel: 1,
    gpuEnabled: false,
    simdEnabled: false
  });

  constructor(
    private batchSize: number = 64,
    private useGPU: boolean = false
  ) {
    this.updateMetrics({ batchSize, gpuEnabled: useGPU });
  }

  async optimizeStateVector(vector: number[], intensity: number): Promise<number[]> {
    const startTime = performance.now();
    
    try {
      const optimized = vector.map(val => {
        const noise = (Math.random() - 0.5) * 0.01;
        return Math.max(-1, Math.min(1, val * intensity + noise));
      });
      
      const computeTime = performance.now() - startTime;
      this.updateMetrics({ 
        computeTime,
        operationsPerSecond: vector.length / (computeTime / 1000)
      });
      
      return optimized;
    } catch (error) {
      console.error('State vector optimization failed:', error);
      return vector;
    }
  }

  optimizeEntanglementCalculation(source: any, target: any): number {
    try {
      const distance = source.position?.distanceTo?.(target.position) || 1;
      const energyDiff = Math.abs((source.energyLevel || 1) - (target.energyLevel || 1));
      const stabilityFactor = Math.min(
        source.timelineStability || 1,
        target.timelineStability || 1
      );
      
      return Math.max(0, Math.min(1, (1 / (1 + distance)) * stabilityFactor * (1 - energyDiff)));
    } catch (error) {
      console.error('Entanglement calculation failed:', error);
      return 0.5;
    }
  }

  observeMetrics(): Observable<OptimizationMetrics> {
    return this.metrics.asObservable();
  }

  private updateMetrics(updates: Partial<OptimizationMetrics>): void {
    this.metrics.next({ ...this.metrics.value, ...updates });
  }

  getCurrentMetrics(): OptimizationMetrics {
    return this.metrics.value;
  }

  setBatchSize(size: number): void {
    this.updateMetrics({ batchSize: size });
  }

  setOptimizationLevel(level: number): void {
    this.updateMetrics({ optimizationLevel: Math.max(0, Math.min(1, level)) });
  }
}
