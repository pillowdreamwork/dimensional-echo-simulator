import { GPUAccelerator } from './gpu-accelerator';
import { QuantumState } from '../../types/quantum';
import { PerformanceMonitor } from './performance-monitor';

export class QuantumCore {
  private gpuAccelerator: GPUAccelerator;
  private workerPool: Worker[];
  private stateBuffer: SharedArrayBuffer;
  private performanceMonitor: PerformanceMonitor;
  private isInitialized: boolean = false;

  constructor(numWorkers = navigator.hardwareConcurrency || 4) {
    this.gpuAccelerator = new GPUAccelerator();
    this.stateBuffer = new SharedArrayBuffer(1024 * 1024); // 1MB buffer
    this.performanceMonitor = new PerformanceMonitor();
    this.workerPool = [];
    this.initializeWorkerPool(numWorkers);
  }

  private async initializeWorkerPool(numWorkers: number): Promise<void> {
    for (let i = 0; i < numWorkers; i++) {
      const worker = new Worker(
        new URL('./quantum-worker.ts', import.meta.url),
        { type: 'module' }
      );
      
      worker.onmessage = (e: MessageEvent) => {
        const { type, payload } = e.data;
        this.handleWorkerMessage(type, payload, i);
      };

      this.workerPool.push(worker);
    }
  }

  private handleWorkerMessage(type: string, payload: any, workerId: number): void {
    switch (type) {
      case 'COMPLETED':
        this.performanceMonitor.trackMetric(`worker_${workerId}_time`, Date.now());
        // Handle completed calculations
        break;
      case 'ERROR':
        console.error(`Worker ${workerId} error:`, payload);
        break;
    }
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await this.gpuAccelerator.initialize();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize QuantumCore:', error);
      throw error;
    }
  }

  private splitIntoChunks(states: QuantumState[]): Array<{
    workerId: number;
    states: QuantumState[];
  }> {
    const chunkSize = Math.ceil(states.length / this.workerPool.length);
    return this.workerPool.map((_, index) => ({
      workerId: index,
      states: states.slice(
        index * chunkSize,
        Math.min((index + 1) * chunkSize, states.length)
      )
    }));
  }

  public async calculateParallelStates(
    states: QuantumState[]
  ): Promise<QuantumState[]> {
    const startTime = Date.now();

    try {
      // Try GPU acceleration first
      const gpuResults = await this.gpuAccelerator.compute(states);
      this.performanceMonitor.trackMetric('gpu_calculation_time', Date.now() - startTime);
      return gpuResults;
    } catch (error) {
      console.warn('GPU acceleration failed, falling back to worker pool:', error);
      
      // Fall back to worker pool
      const chunks = this.splitIntoChunks(states);
      const promises = chunks.map(chunk => 
        new Promise<QuantumState[]>((resolve) => {
          const worker = this.workerPool[chunk.workerId];
          
          const messageHandler = (e: MessageEvent) => {
            if (e.data.type === 'COMPLETED') {
              worker.removeEventListener('message', messageHandler);
              resolve(e.data.payload);
            }
          };
          
          worker.addEventListener('message', messageHandler);
          worker.postMessage({
            type: 'PROCESS_QUANTUM_STATES',
            payload: chunk.states
          });
        })
      );

      const results = await Promise.all(promises);
      this.performanceMonitor.trackMetric('worker_calculation_time', Date.now() - startTime);
      return results.flat();
    }
  }

  public async evolveQuantumState(state: QuantumState): Promise<QuantumState> {
    // For single state evolution, use first available worker
    return new Promise((resolve) => {
      const worker = this.workerPool[0];
      
      const messageHandler = (e: MessageEvent) => {
        if (e.data.type === 'STATE_EVOLVED') {
          worker.removeEventListener('message', messageHandler);
          resolve(e.data.payload);
        }
      };
      
      worker.addEventListener('message', messageHandler);
      worker.postMessage({
        type: 'EVOLVE_QUANTUM_STATE',
        payload: state
      });
    });
  }

  public getPerformanceMetrics(): Record<string, number> {
    return {
      averageGPUTime: this.performanceMonitor.getAverageMetric('gpu_calculation_time'),
      averageWorkerTime: this.performanceMonitor.getAverageMetric('worker_calculation_time'),
      ...this.workerPool.reduce((acc, _, index) => ({
        ...acc,
        [`worker_${index}_avg_time`]: this.performanceMonitor.getAverageMetric(`worker_${index}_time`)
      }), {})
    };
  }

  public cleanup(): void {
    this.workerPool.forEach(worker => worker.terminate());
  }
}
