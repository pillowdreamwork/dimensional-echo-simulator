interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  gpuTime: number;
  workerTime: number;
}

const TARGET_FPS = 60;

export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fps: TARGET_FPS,
    frameTime: 16.67,
    gpuTime: 0,
    workerTime: 0
  };
  private lastFrameTime: number = 0;
  private frameTimes: number[] = [];
  private metricHistory: Map<string, number[]> = new Map();

  constructor() {
    this.startMonitoring();
  }

  private getMemoryUsage(): number {
    if ('memory' in performance && (performance as any).memory) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024;
    }
    return 0; // Fallback for browsers that don't support memory API
  }

  private updateFPS(): void {
    const now = performance.now();
    const frameTime = now - this.lastFrameTime;
    this.lastFrameTime = now;

    this.frameTimes.push(frameTime);
    if (this.frameTimes.length > 100) {
      this.frameTimes.shift();
    }

    const averageFrameTime = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    const currentFPS = 1000 / averageFrameTime;

    this.metrics = {
      ...this.metrics,
      fps: currentFPS,
      frameTime: averageFrameTime
    };
  }

  startMonitoring(): void {
    this.lastFrameTime = performance.now();
    requestAnimationFrame(this.monitor.bind(this));
  }

  monitor(timestamp: number): void {
    this.updateFPS();
    requestAnimationFrame(this.monitor.bind(this));
  }

  getMetrics(): PerformanceMetrics {
    return this.metrics;
  }

  recordGPUTime(time: number): void {
    this.metrics = {
      ...this.metrics,
      gpuTime: time
    };
  }

  recordWorkerTime(time: number): void {
    this.metrics = {
      ...this.metrics,
      workerTime: time
    };
  }

  trackMetric(name: string, value: number): void {
    if (!this.metricHistory.has(name)) {
      this.metricHistory.set(name, []);
    }
    
    const history = this.metricHistory.get(name)!;
    history.push(value);
    
    // Keep only last 100 values
    if (history.length > 100) {
      history.shift();
    }
  }

  getAverageMetric(name: string): number {
    const history = this.metricHistory.get(name);
    if (!history || history.length === 0) {
      return 0;
    }
    
    return history.reduce((sum, value) => sum + value, 0) / history.length;
  }
}
