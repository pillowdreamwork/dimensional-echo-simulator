import { QuantumState } from '../../types/quantum';
import { StabilityMetrics } from './chaos-alchemist';

export interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
    metrics: ValidationMetrics;
}

export interface ValidationError {
    code: string;
    message: string;
    severity: 'critical' | 'error';
    field: string;
}

export interface ValidationWarning {
    code: string;
    message: string;
    field: string;
    threshold: number;
    actualValue: number;
}

export interface ValidationMetrics {
    coherenceScore: number;
    stabilityScore: number;
    integrityScore: number;
    overallHealth: number;
}

export class QuantumValidator {
    private static instance: QuantumValidator;
    private readonly MINIMUM_PROBABILITY = 0.1;
    private readonly MINIMUM_COHERENCE = 0.3;
    private readonly MINIMUM_STABILITY = 0.4;
    private readonly MAXIMUM_ENERGY_CONSUMPTION = 1000;
    private readonly MINIMUM_AETHERIC_RESONANCE = 0.4;
    private readonly MINIMUM_TIMELINE_CONVERGENCE = 0.5;
    private readonly MINIMUM_REALITY_ANCHOR_STRENGTH = 0.6;

    private constructor() {}

    public static getInstance(): QuantumValidator {
        if (!QuantumValidator.instance) {
            QuantumValidator.instance = new QuantumValidator();
        }
        return QuantumValidator.instance;
    }

    public validateQuantumState(state: QuantumState): ValidationResult {
        const errors: ValidationError[] = [];
        const warnings: ValidationWarning[] = [];

        // Validate probability
        if (state.probability < this.MINIMUM_PROBABILITY) {
            errors.push({
                code: 'QV001',
                message: 'Quantum state probability too low for stable operation',
                severity: 'critical',
                field: 'probability'
            });
        }

        // Validate coherence
        if (state.coherence < this.MINIMUM_COHERENCE) {
            errors.push({
                code: 'QV002',
                message: 'Quantum coherence below acceptable threshold',
                severity: 'error',
                field: 'coherence'
            });
        }

        // Validate dimensional stability
        if (state.dimensionalStability < this.MINIMUM_STABILITY) {
            warnings.push({
                code: 'QW001',
                message: 'Dimensional stability approaching critical threshold',
                field: 'dimensionalStability',
                threshold: this.MINIMUM_STABILITY,
                actualValue: state.dimensionalStability
            });
        }

        // Validate energy consumption
        if (state.forgeMetadata.energyConsumption > this.MAXIMUM_ENERGY_CONSUMPTION) {
            warnings.push({
                code: 'QW002',
                message: 'Energy consumption exceeding recommended limits',
                field: 'energyConsumption',
                threshold: this.MAXIMUM_ENERGY_CONSUMPTION,
                actualValue: state.forgeMetadata.energyConsumption
            });
        }

        // Validate aetheric resonance
        if (state.aethericResonance < this.MINIMUM_AETHERIC_RESONANCE) {
            errors.push({
                code: 'QV004',
                message: 'Aetheric resonance too weak for stable forge operation',
                severity: 'error',
                field: 'aethericResonance'
            });
        }

        // Validate timeline convergence
        if (state.timelineConvergence < this.MINIMUM_TIMELINE_CONVERGENCE) {
            warnings.push({
                code: 'QW004',
                message: 'Timeline convergence below optimal threshold',
                field: 'timelineConvergence',
                threshold: this.MINIMUM_TIMELINE_CONVERGENCE,
                actualValue: state.timelineConvergence
            });
        }

        // Validate reality anchors
        if (state.realityAnchors.strength < this.MINIMUM_REALITY_ANCHOR_STRENGTH) {
            warnings.push({
                code: 'QW005',
                message: 'Reality anchor strength insufficient',
                field: 'realityAnchorStrength',
                threshold: this.MINIMUM_REALITY_ANCHOR_STRENGTH,
                actualValue: state.realityAnchors.strength
            });
        }

        // Validate quantum signature
        if (Date.now() - state.quantumSignature.timestamp > state.quantumSignature.validityPeriod) {
            errors.push({
                code: 'QV005',
                message: 'Quantum signature expired',
                severity: 'critical',
                field: 'quantumSignature'
            });
        }

        // Calculate validation metrics
        const metrics = this.calculateValidationMetrics(state);

        return {
            isValid: errors.length === 0,
            errors,
            warnings,
            metrics
        };
    }

    public validateStabilityMetrics(metrics: StabilityMetrics): ValidationResult {
        const errors: ValidationError[] = [];
        const warnings: ValidationWarning[] = [];

        if (metrics.spatialCoherence < this.MINIMUM_COHERENCE) {
            errors.push({
                code: 'QV003',
                message: 'Spatial coherence below minimum threshold',
                severity: 'error',
                field: 'spatialCoherence'
            });
        }

        if (metrics.temporalStability < this.MINIMUM_STABILITY) {
            warnings.push({
                code: 'QW003',
                message: 'Temporal stability needs attention',
                field: 'temporalStability',
                threshold: this.MINIMUM_STABILITY,
                actualValue: metrics.temporalStability
            });
        }

        const validationMetrics = {
            coherenceScore: metrics.spatialCoherence,
            stabilityScore: metrics.temporalStability,
            integrityScore: metrics.energeticBalance,
            overallHealth: (
                metrics.spatialCoherence +
                metrics.temporalStability +
                metrics.energeticBalance +
                metrics.harmonicResonance
            ) / 4
        };

        return {
            isValid: errors.length === 0,
            errors,
            warnings,
            metrics: validationMetrics
        };
    }

    private calculateValidationMetrics(state: QuantumState): ValidationMetrics {
        return {
            coherenceScore: state.coherence,
            stabilityScore: state.dimensionalStability,
            integrityScore: (
                state.aethericResonance +
                state.timelineConvergence
            ) / 2,
            overallHealth: (
                state.coherence +
                state.dimensionalStability +
                state.aethericResonance +
                state.timelineConvergence
            ) / 4
        };
    }
}