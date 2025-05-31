import React, { useState, useEffect } from 'react';
import { QuantumState } from '../../types/quantum';
import { AethericForge } from '../../lib/cores/aetheric-forge';
import { ForgePerformanceMonitor, PerformanceMetrics } from '../../lib/cores/forge-performance-monitor';
import { ForgeAlchemistBridge } from '../../lib/cores/forge-alchemist-bridge';

interface ForgeMetrics {
    resonance: number;
    stability: number;
    convergence: number;
    energy: number;
}

export const AethericForgeController: React.FC = () => {
    const [metrics, setMetrics] = useState<ForgeMetrics>({
        resonance: 0,
        stability: 0,
        convergence: 0,
        energy: 0
    });
    const [performance, setPerformance] = useState<PerformanceMetrics>({
        fps: 0,
        memoryUsage: 0,
        operationsPerSecond: 0,
        quantumStateLatency: 0,
        stabilityCalculationTime: 0,
        forgeProcessingTime: 0
    });
    const [isForging, setIsForging] = useState(false);

    const forge = AethericForge.getInstance();
    const bridge = ForgeAlchemistBridge.getInstance();
    const performanceMonitor = ForgePerformanceMonitor.getInstance();

    useEffect(() => {
        const perfSub = performanceMonitor.getMetrics().subscribe(setPerformance);
        return () => perfSub.unsubscribe();
    }, []);

    useEffect(() => {
        if (isForging) {
            const interval = setInterval(async () => {
                const startTime = performance.now();
                
                const { stability, quantum } = await performanceMonitor.measureOperationTime(
                  'forge',
                  () => bridge.getCurrentMetrics()
                );

                setMetrics({
                  resonance: quantum.aethericResonance,
                  stability: quantum.dimensionalStability,
                  convergence: quantum.timelineConvergence,
                  energy: quantum.forgeMetadata.energyConsumption
                });

                performanceMonitor.trackFrame();
              }, 1000);
              return () => clearInterval(interval);
        }
    }, [isForging]);

    return (
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
                Aetheric Forge Controller
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-700 p-3 rounded">
                    <h3 className="text-blue-300">Resonance</h3>
                    <div className="text-2xl text-white">
                        {(metrics.resonance * 100).toFixed(2)}%
                    </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded">
                    <h3 className="text-blue-300">Stability</h3>
                    <div className="text-2xl text-white">
                        {(metrics.stability * 100).toFixed(2)}%
                    </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded">
                    <h3 className="text-blue-300">Convergence</h3>
                    <div className="text-2xl text-white">
                        {(metrics.convergence * 100).toFixed(2)}%
                    </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded">
                    <h3 className="text-blue-300">Energy</h3>
                    <div className="text-2xl text-white">
                        {metrics.energy.toFixed(2)} AE
                    </div>
                </div>
            </div>
            
            <div className="mt-4 bg-gray-700 p-4 rounded">
                <h3 className="text-blue-300 mb-2">Performance Metrics</h3>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <span className="text-blue-200">FPS</span>
                        <div className="text-white">{performance.fps.toFixed(1)}</div>
                    </div>
                    <div>
                        <span className="text-blue-200">Memory (MB)</span>
                        <div className="text-white">{performance.memoryUsage.toFixed(1)}</div>
                    </div>
                    <div>
                        <span className="text-blue-200">Ops/sec</span>
                        <div className="text-white">{performance.operationsPerSecond.toFixed(0)}</div>
                    </div>
                    <div>
                        <span className="text-blue-200">State Latency (ms)</span>
                        <div className="text-white">{performance.quantumStateLatency.toFixed(2)}</div>
                    </div>
                    <div>
                        <span className="text-blue-200">Stability Calc (ms)</span>
                        <div className="text-white">{performance.stabilityCalculationTime.toFixed(2)}</div>
                    </div>
                    <div>
                        <span className="text-blue-200">Forge Time (ms)</span>
                        <div className="text-white">{performance.forgeProcessingTime.toFixed(2)}</div>
                    </div>
                </div>
            </div>
            
            <button
                className={`w-full py-2 px-4 rounded-lg font-bold mt-4 ${
                    isForging
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                } transition-colors`}
                onClick={() => setIsForging(!isForging)}
            >
                {isForging ? 'Stop Forging' : 'Start Forging'}
            </button>
        </div>
    );
};
