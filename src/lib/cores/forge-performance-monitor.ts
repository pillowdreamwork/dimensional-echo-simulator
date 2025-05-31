import { BehaviorSubject, Observable } from 'rxjs';
import { QuantumState } from '../../types/quantum';
import { StabilityMetrics } from './chaos-alchemist';

export interface PerformanceMetrics {
    fps: number;
    memoryUsage: number;
    operationsPerSecond: number;
    quantumStateLatency: number;
    stabilityCalculationTime: number;
    forgeProcessingTime: number;
}

export class ForgePerformanceMonitor {
    private static instance: ForgePerformanceMonitor;
    private metrics: BehaviorSubject<PerformanceMetrics>;
    private lastFrameTime: number = performance.now();
    private frameCount: number = 0;
    private operationCount: number = 0;

    private constructor() {
        this.metrics = new BehaviorSubject<PerformanceMetrics>({
            fps: 0,
            memoryUsage: 0,
            operationsPerSecond: 0,
            quantumStateLatency: 0,
            stabilityCalculationTime: 0,
            forgeProcessingTime: 0
        });

        this.startMonitoring();
    }

    public static getInstance(): ForgePerformanceMonitor {
        if (!ForgePerformanceMonitor.instance) {
            ForgePerformanceMonitor.instance = new ForgePerformanceMonitor();
        }
        return ForgePerformanceMonitor.instance;
    }

    private startMonitoring(): void {
        setInterval(() => this.updateMetrics(), 1000);
    }

    private updateMetrics(): void {
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastFrameTime;
        
        const fps = this.frameCount * (1000 / deltaTime);
        const operationsPerSecond = this.operationCount * (1000 / deltaTime);
        
        this.metrics.next({
            ...this.metrics.value,
            fps,
            operationsPerSecond,
            memoryUsage: this.getMemoryUsage()
        });

        this.frameCount = 0;
        this.operationCount = 0;
        this.lastFrameTime = currentTime;
    }

    private getMemoryUsage(): number {
        if (typeof performance.memory !== 'undefined') {
            return (performance as any).memory.usedJSHeapSize / (1024 * 1024);
        }
        return 0;
    }

    public trackOperation(type: 'quantumState' | 'stability' | 'forge', duration: number): void {
        this.operationCount++;
        
        const metrics = { ...this.metrics.value };
        switch (type) {
            case 'quantumState':
                metrics.quantumStateLatency = duration;
                break;
            case 'stability':
                metrics.stabilityCalculationTime = duration;
                break;
            case 'forge':
                metrics.forgeProcessingTime = duration;
                break;
        }
        
        this.metrics.next(metrics);
    }

    public trackFrame(): void {
        this.frameCount++;
    }

    public getMetrics(): Observable<PerformanceMetrics> {
        return this.metrics.asObservable();
    }

    public async measureOperationTime<T>(
        type: 'quantumState' | 'stability' | 'forge',
        operation: () => Promise<T>
    ): Promise<T> {
        const start = performance.now();
        const result = await operation();
        const duration = performance.now() - start;
        
        this.trackOperation(type, duration);
        return result;
    }
}
