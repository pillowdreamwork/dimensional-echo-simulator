import { Vector3, Matrix4, Quaternion } from 'three';
import { Observable, Subject } from 'rxjs';
import { map, filter, debounceTime } from 'rxjs/operators';

export interface ChaoticVector {
  position: Vector3;
  velocity: Vector3;
  charge: number;
  entropy: number;
  harmonics: number[];
}

export interface StabilityMetrics {
  spatialCoherence: number;
  temporalStability: number;
  energeticBalance: number;
  harmonicResonance: number;
}

export interface ParadoxEvent {
  origin: Vector3;
  intensity: number;
  radius: number;
  duration: number;
  effects: {
    type: 'temporal' | 'spatial' | 'energetic';
    magnitude: number;
    description: string;
  }[];
}

export class ChaosAlchemist {
  private vectorField: Map<string, ChaoticVector> = new Map();
  private paradoxEvents = new Subject<ParadoxEvent>();
  private stabilityMatrix = new Matrix4();
  private readonly maxEntropy = 100;
  
  private readonly HARMONIC_SERIES = [
    432, // Base frequency
    528, // Transformation
    639, // Connection
    741, // Expression
    852, // Spiritual
    963  // Cosmic
  ];

  constructor(
    private readonly maxVectors: number = 1000,
    private readonly paradoxThreshold: number = 0.85
  ) {
    this.initializeStabilityMatrix();
  }

  private initializeStabilityMatrix(): void {
    this.stabilityMatrix.identity();
    for (let i = 0; i < 16; i++) {
      const stabilityFactor = 0.5 + Math.random() * 0.5;
      this.stabilityMatrix.elements[i] *= stabilityFactor;
    }
  }

  public stirVectorField(
    origin: Vector3,
    intensity: number,
    radius: number
  ): Observable<StabilityMetrics> {
    return new Observable(observer => {
      const vectorId = `v-${Date.now()}`;
      const chaoticVector: ChaoticVector = {
        position: origin.clone(),
        velocity: new Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).multiplyScalar(intensity),
        charge: intensity,
        entropy: 0,
        harmonics: this.generateHarmonics(intensity)
      };

      this.vectorField.set(vectorId, chaoticVector);

      // Process vector field perturbations
      const processStir = () => {
        const metrics = this.calculateStabilityMetrics(chaoticVector);
        
        // Check for paradox formation
        if (metrics.temporalStability < 1 - this.paradoxThreshold) {
          this.generateParadox(chaoticVector);
        }

        // Update vector state
        chaoticVector.entropy += intensity * 0.1;
        chaoticVector.position.add(chaoticVector.velocity);
        chaoticVector.velocity.multiplyScalar(0.98); // Damping

        observer.next(metrics);

        if (chaoticVector.entropy < this.maxEntropy) {
          requestAnimationFrame(processStir);
        } else {
          this.vectorField.delete(vectorId);
          observer.complete();
        }
      };

      processStir();
    });
  }

  private generateHarmonics(baseIntensity: number): number[] {
    return this.HARMONIC_SERIES.map(freq => 
      freq * (1 + (Math.random() - 0.5) * baseIntensity * 0.2)
    );
  }

  private calculateStabilityMetrics(vector: ChaoticVector): StabilityMetrics {
    const spatialCoherence = 1 - (vector.position.length() / 10);
    const temporalStability = 1 - (vector.entropy / this.maxEntropy);
    const energeticBalance = 1 - (vector.velocity.length() / (2 * vector.charge));
    
    // Calculate harmonic resonance
    const harmonicDeviation = vector.harmonics.reduce((sum, h, i) => {
      const baseFreq = this.HARMONIC_SERIES[i];
      return sum + Math.abs(h - baseFreq) / baseFreq;
    }, 0) / vector.harmonics.length;
    
    const harmonicResonance = 1 - harmonicDeviation;

    return {
      spatialCoherence: Math.max(0, Math.min(1, spatialCoherence)),
      temporalStability: Math.max(0, Math.min(1, temporalStability)),
      energeticBalance: Math.max(0, Math.min(1, energeticBalance)),
      harmonicResonance: Math.max(0, Math.min(1, harmonicResonance))
    };
  }

  private generateParadox(vector: ChaoticVector): void {
    const paradox: ParadoxEvent = {
      origin: vector.position.clone(),
      intensity: vector.charge * (1 - vector.entropy / this.maxEntropy),
      radius: vector.charge * 2,
      duration: 1000 * vector.charge,
      effects: [
        {
          type: 'temporal',
          magnitude: vector.entropy / this.maxEntropy,
          description: 'Temporal fluctuations detected in local spacetime'
        },
        {
          type: 'spatial',
          magnitude: vector.position.length() / 10,
          description: 'Spatial distortions manifesting in target area'
        },
        {
          type: 'energetic',
          magnitude: vector.velocity.length() / vector.charge,
          description: 'Energy patterns showing unusual harmonics'
        }
      ]
    };

    this.paradoxEvents.next(paradox);
  }

  public observeParadoxEvents(): Observable<ParadoxEvent> {
    return this.paradoxEvents.asObservable().pipe(
      filter(event => event.intensity > 0.1),
      debounceTime(100)
    );
  }

  public getActiveVectors(): ChaoticVector[] {
    return Array.from(this.vectorField.values());
  }

  public getCurrentStability(): StabilityMetrics {
    const vectors = this.getActiveVectors();
    if (vectors.length === 0) {
      return {
        spatialCoherence: 1,
        temporalStability: 1,
        energeticBalance: 1,
        harmonicResonance: 1
      };
    }

    return vectors.reduce((acc, vector) => {
      const metrics = this.calculateStabilityMetrics(vector);
      return {
        spatialCoherence: acc.spatialCoherence * metrics.spatialCoherence,
        temporalStability: acc.temporalStability * metrics.temporalStability,
        energeticBalance: acc.energeticBalance * metrics.energeticBalance,
        harmonicResonance: acc.harmonicResonance * metrics.harmonicResonance
      };
    }, {
      spatialCoherence: 1,
      temporalStability: 1,
      energeticBalance: 1,
      harmonicResonance: 1
    });
  }
}
