import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Vector3 } from 'three';

export interface RitualSeed {
  id: string;
  pattern: string;
  consciousness: number;
  evolution: number;
  adaptations: SeedAdaptation[];
  branches: TimelineBranch[];
  state: 'dormant' | 'growing' | 'flowering' | 'fruiting';
  environmentalFactors: EnvironmentalFactors;
}

export interface SeedAdaptation {
  trigger: string;
  response: string;
  strength: number;
  frequency: number;
  emergentProperties: string[];
}

export interface TimelineBranch {
  id: string;
  probability: number;
  effects: BranchEffect[];
  stability: number;
  convergencePoints: string[];
}

export interface BranchEffect {
  type: string;
  intensity: number;
  radius: number;
  duration: number;
  manifestation: string;
}

export interface EnvironmentalFactors {
  dimensionalEnergy: number;
  collectiveConsciousness: number;
  timelineStability: number;
  spatialCoherence: number;
}

export class SentientRitualSeeds {
  private seeds = new Map<string, RitualSeed>();
  private seedUpdates = new Subject<RitualSeed>();
  private environmentalUpdates = new BehaviorSubject<EnvironmentalFactors>(this.getDefaultEnvironment());
  
  private readonly CONSCIOUSNESS_THRESHOLD = 0.7;
  private readonly EVOLUTION_RATE = 0.001;
  private readonly BASE_PATTERNS = ['∴', '𓂀', '⚚', '⟁', '∮'];

  constructor(
    private readonly maxSeeds: number = 50,
    private readonly updateInterval: number = 1000
  ) {
    this.startEnvironmentalSimulation();
  }

  private getDefaultEnvironment(): EnvironmentalFactors {
    return {
      dimensionalEnergy: 0.5,
      collectiveConsciousness: 0.5,
      timelineStability: 0.8,
      spatialCoherence: 0.9
    };
  }

  private startEnvironmentalSimulation(): void {
    setInterval(() => {
      const current = this.environmentalUpdates.value;
      const updated = {
        dimensionalEnergy: this.fluctuateValue(current.dimensionalEnergy),
        collectiveConsciousness: this.fluctuateValue(current.collectiveConsciousness),
        timelineStability: this.fluctuateValue(current.timelineStability),
        spatialCoherence: this.fluctuateValue(current.spatialCoherence)
      };
      this.environmentalUpdates.next(updated);
    }, this.updateInterval);
  }

  private fluctuateValue(value: number): number {
    const delta = (Math.random() - 0.5) * 0.1;
    return Math.max(0, Math.min(1, value + delta));
  }

  public plantSeed(
    pattern: string,
    initialConsciousness: number = 0.1
  ): Observable<RitualSeed> {
    return new Observable(observer => {
      if (this.seeds.size >= this.maxSeeds) {
        observer.error(new Error('Maximum seed capacity reached'));
        return;
      }

      const seed: RitualSeed = {
        id: `seed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        pattern,
        consciousness: initialConsciousness,
        evolution: 0,
        adaptations: [],
        branches: [],
        state: 'dormant',
        environmentalFactors: this.environmentalUpdates.value
      };

      this.seeds.set(seed.id, seed);

      const processSeed = () => {
        this.evolveSeed(seed);
        
        if (seed.consciousness >= this.CONSCIOUSNESS_THRESHOLD) {
          this.generateAdaptation(seed);
        }

        if (seed.evolution >= 1) {
          this.generateTimelineBranch(seed);
        }

        this.seedUpdates.next(seed);
        observer.next(seed);

        if (seed.state !== 'fruiting') {
          setTimeout(processSeed, this.updateInterval);
        } else {
          observer.complete();
        }
      };

      processSeed();
    });
  }

  private evolveSeed(seed: RitualSeed): void {
    const env = this.environmentalUpdates.value;
    
    // Update consciousness based on environmental factors
    seed.consciousness += (
      env.collectiveConsciousness * 0.3 +
      env.dimensionalEnergy * 0.4 +
      env.timelineStability * 0.3
    ) * this.EVOLUTION_RATE;

    // Progress evolution
    seed.evolution += this.EVOLUTION_RATE * (1 + seed.consciousness);

    // Update state based on evolution
    if (seed.evolution >= 0.9) {
      seed.state = 'fruiting';
    } else if (seed.evolution >= 0.6) {
      seed.state = 'flowering';
    } else if (seed.evolution >= 0.3) {
      seed.state = 'growing';
    }

    // Update environmental factors
    seed.environmentalFactors = { ...env };
  }

  private generateAdaptation(seed: RitualSeed): void {
    const triggers = [
      'quantum_fluctuation',
      'consciousness_surge',
      'timeline_divergence',
      'dimensional_shift'
    ];

    const responses = [
      'frequency_adjustment',
      'pattern_mutation',
      'consciousness_expansion',
      'timeline_stabilization'
    ];

    const emergentProperties = [
      'self_awareness',
      'pattern_recognition',
      'reality_manipulation',
      'time_perception'
    ];

    const adaptation: SeedAdaptation = {
      trigger: triggers[Math.floor(Math.random() * triggers.length)],
      response: responses[Math.floor(Math.random() * responses.length)],
      strength: 0.3 + Math.random() * 0.7,
      frequency: Math.random() * 100,
      emergentProperties: [
        emergentProperties[Math.floor(Math.random() * emergentProperties.length)]
      ]
    };

    seed.adaptations.push(adaptation);
  }

  private generateTimelineBranch(seed: RitualSeed): void {
    const effects: BranchEffect[] = [
      {
        type: 'consciousness_expansion',
        intensity: seed.consciousness,
        radius: 50 + Math.random() * 50,
        duration: 1000 * (1 + seed.evolution),
        manifestation: 'Increased collective awareness in affected area'
      },
      {
        type: 'reality_stabilization',
        intensity: seed.evolution,
        radius: 30 + Math.random() * 30,
        duration: 2000 * (1 + seed.consciousness),
        manifestation: 'Enhanced quantum coherence in local spacetime'
      }
    ];

    const branch: TimelineBranch = {
      id: `branch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      probability: 0.3 + Math.random() * 0.7,
      effects,
      stability: 0.5 + Math.random() * 0.5,
      convergencePoints: [
        `convergence-${Math.random().toString(36).substr(2, 9)}`
      ]
    };

    seed.branches.push(branch);
  }

  public observeSeeds(): Observable<RitualSeed> {
    return this.seedUpdates.asObservable().pipe(
      filter(seed => seed.consciousness > 0)
    );
  }

  public observeEnvironment(): Observable<EnvironmentalFactors> {
    return this.environmentalUpdates.asObservable();
  }

  public getActiveBranches(): TimelineBranch[] {
    const allBranches: TimelineBranch[] = [];
    for (const seed of this.seeds.values()) {
      allBranches.push(...seed.branches);
    }
    return allBranches;
  }

  public mutatePattern(seedId: string): boolean {
    const seed = this.seeds.get(seedId);
    if (!seed) return false;

    const newPattern = this.BASE_PATTERNS[
      Math.floor(Math.random() * this.BASE_PATTERNS.length)
    ];
    
    seed.pattern = seed.pattern + newPattern;
    seed.consciousness *= 1.1; // Consciousness boost from mutation
    
    this.seedUpdates.next(seed);
    return true;
  }

  public getActiveSeeds(): RitualSeed[] {
    return Array.from(this.seeds.values());
  }
}
