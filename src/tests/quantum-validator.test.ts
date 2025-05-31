import { describe, it, expect } from 'vitest';
import { QuantumValidator } from '../lib/cores/quantum-validator';
import { QuantumState } from '../types/quantum';
import { StabilityMetrics } from '../lib/cores/chaos-alchemist';

describe('QuantumValidator', () => {
    const validator = QuantumValidator.getInstance();

    describe('validateQuantumState', () => {
        it('should validate a healthy quantum state', () => {
            const healthyState: QuantumState = {
                state: 'stable',
                probability: 0.85,
                coherence: 0.9,
                entanglement: 0.8,
                superposition: 0.75,
                aethericResonance: 0.95,
                dimensionalStability: 0.88,
                timelineConvergence: 0.92,
                realityAnchors: {
                    primary: 'main',
                    secondary: [],
                    strength: 1
                },
                quantumSignature: {
                    hash: 'test-hash',
                    timestamp: Date.now(),
                    validityPeriod: 3600000
                },
                forgeMetadata: {
                    version: '10.0.0',
                    lastModified: Date.now(),
                    stabilityIndex: 0.9,
                    energyConsumption: 500
                }
            };

            const result = validator.validateQuantumState(healthyState);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
            expect(result.warnings).toHaveLength(0);
            expect(result.metrics.overallHealth).toBeGreaterThan(0.8);
        });

        it('should detect critical probability issues', () => {
            const unstableState: QuantumState = {
                ...createDefaultQuantumState(),
                probability: 0.05
            };

            const result = validator.validateQuantumState(unstableState);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContainEqual(expect.objectContaining({
                code: 'QV001',
                severity: 'critical'
            }));
        });

        it('should warn about high energy consumption', () => {
            const highEnergyState: QuantumState = {
                ...createDefaultQuantumState(),
                forgeMetadata: {
                    ...createDefaultQuantumState().forgeMetadata,
                    energyConsumption: 1200
                }
            };

            const result = validator.validateQuantumState(highEnergyState);
            expect(result.warnings).toContainEqual(expect.objectContaining({
                code: 'QW002',
                field: 'energyConsumption'
            }));
        });
    });

    describe('validateStabilityMetrics', () => {
        it('should validate stable metrics', () => {
            const stableMetrics: StabilityMetrics = {
                spatialCoherence: 0.9,
                temporalStability: 0.85,
                energeticBalance: 0.88,
                harmonicResonance: 0.92
            };

            const result = validator.validateStabilityMetrics(stableMetrics);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
            expect(result.metrics.overallHealth).toBeGreaterThan(0.8);
        });

        it('should detect low spatial coherence', () => {
            const unstableMetrics: StabilityMetrics = {
                spatialCoherence: 0.2,
                temporalStability: 0.85,
                energeticBalance: 0.88,
                harmonicResonance: 0.92
            };

            const result = validator.validateStabilityMetrics(unstableMetrics);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContainEqual(expect.objectContaining({
                code: 'QV003',
                field: 'spatialCoherence'
            }));
        });
    });
});

function createDefaultQuantumState(): QuantumState {
    return {
        state: 'stable',
        probability: 0.85,
        coherence: 0.9,
        entanglement: 0.8,
        superposition: 0.75,
        aethericResonance: 0.95,
        dimensionalStability: 0.88,
        timelineConvergence: 0.92,
        realityAnchors: {
            primary: 'main',
            secondary: [],
            strength: 1
        },
        quantumSignature: {
            hash: 'test-hash',
            timestamp: Date.now(),
            validityPeriod: 3600000
        },
        forgeMetadata: {
            version: '10.0.0',
            lastModified: Date.now(),
            stabilityIndex: 0.9,
            energyConsumption: 500
        }
    };
}