export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  private readonly SAMPLE_SIZE = 60; // 1 second at 60fps
  private readonly MAX_HISTORY = 3600; // 1 minute at 60fps

  constructor(sampleSize: number = 60) {
    this.SAMPLE_SIZE = sampleSize;
  }

  public trackMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }

    const samples = this.metrics.get(name)!;
    samples.push(value);

    // Keep only recent samples
    if (samples.length > this.MAX_HISTORY) {
      samples.shift();
    }

    this.metrics.set(name, samples);
  }

  public getAverageMetric(name: string): number {
    const samples = this.metrics.get(name);
    if (!samples || samples.length === 0) return 0;

    const recentSamples = samples.slice(-this.SAMPLE_SIZE);
    return recentSamples.reduce((a, b) => a + b, 0) / recentSamples.length;
  }

  public getMetricHistory(name: string): number[] {
    return this.metrics.get(name) || [];
  }

  public getRecentMetrics(name: string): number[] {
    const samples = this.metrics.get(name);
    if (!samples) return [];
    return samples.slice(-this.SAMPLE_SIZE);
  }

  public getAllMetricNames(): string[] {
    return Array.from(this.metrics.keys());
  }

  public getMetricStats(name: string): {
    average: number;
    min: number;
    max: number;
    current: number;
  } {
    const samples = this.metrics.get(name);
    if (!samples || samples.length === 0) {
      return { average: 0, min: 0, max: 0, current: 0 };
    }

    const recentSamples = samples.slice(-this.SAMPLE_SIZE);
    const average = recentSamples.reduce((a, b) => a + b, 0) / recentSamples.length;
    const min = Math.min(...recentSamples);
    const max = Math.max(...recentSamples);
    const current = recentSamples[recentSamples.length - 1];

    return { average, min, max, current };
  }

  public reset(metricName?: string): void {
    if (metricName) {
      this.metrics.delete(metricName);
    } else {
      this.metrics.clear();
    }
  }
}
