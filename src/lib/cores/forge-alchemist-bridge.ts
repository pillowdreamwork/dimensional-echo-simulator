import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vector3 } from 'three';
import { ChaosAlchemist, StabilityMetrics, ParadoxEvent } from './chaos-alchemist';
import { AethericForge } from './aetheric-forge';
import { QuantumState } from '../../types/quantum';

export class ForgeAlchemistBridge {
    private static instance: ForgeAlchemistBridge;
    private chaosAlchemist: ChaosAlchemist;
    private aethericForge: AethericForge;

    private constructor() {
        this.chaosAlchemist = new ChaosAlchemist();
        this.aethericForge = AethericForge.getInstance();
    }

    public static getInstance(): ForgeAlchemistBridge {
        if (!ForgeAlchemistBridge.instance) {
            ForgeAlchemistBridge.instance = new ForgeAlchemistBridge();
        }
        return ForgeAlchemistBridge.instance;
    }

    public synthesizeReality(
        origin: Vector3,
        intensity: number,
        radius: number
    ): Observable<{
        stabilityMetrics: StabilityMetrics;
        quantumState: QuantumState;
    }> {
        // Create an observable for the chaos field perturbations
        const chaosObservable = this.chaosAlchemist.stirVectorField(
            origin,
            intensity,
            radius
        );

        // Create a quantum state based on chaos metrics
        const quantumObservable = chaosObservable.pipe(
            map(metrics => this.createQuantumState(metrics))
        );

        // Combine and process both streams
        return combineLatest([chaosObservable, quantumObservable]).pipe(
            map(([stability, quantum]) => ({
                stabilityMetrics: stability,
                quantumState: this.aethericForge.weaveReality(quantum)
            }))
        );
    }

    public observeParadoxEvents(): Observable<ParadoxEvent> {
        return this.chaosAlchemist.observeParadoxEvents();
    }

    private createQuantumState(metrics: StabilityMetrics): QuantumState {
        return {
            state: 'synthesizing',
            probability: metrics.spatialCoherence,
            coherence: metrics.temporalStability,
            entanglement: metrics.energeticBalance,
            superposition: metrics.harmonicResonance,
            aethericResonance: 0,
            dimensionalStability: 0,
            timelineConvergence: 0,
            realityAnchors: {
                primary: 'chaos-field',
                secondary: [],
                strength: metrics.spatialCoherence
            },
            quantumSignature: {
                hash: crypto.randomUUID(),
                timestamp: Date.now(),
                validityPeriod: 3600000
            },
            forgeMetadata: {
                version: '10.0.0',
                lastModified: Date.now(),
                stabilityIndex: (
                    metrics.spatialCoherence +
                    metrics.temporalStability +
                    metrics.energeticBalance +
                    metrics.harmonicResonance
                ) / 4,
                energyConsumption: 0
            }
        };
    }

    public getCurrentMetrics() {
        const stabilityMetrics = this.chaosAlchemist.getCurrentStability();
        const quantumState = this.createQuantumState(stabilityMetrics);
        return {
            stability: stabilityMetrics,
            quantum: this.aethericForge.weaveReality(quantumState)
        };
    }
}
