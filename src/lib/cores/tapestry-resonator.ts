import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { filter, map, debounceTime } from 'rxjs/operators';
import { Vector3 } from 'three';

export interface ResonanceThread {
  id: string;
  type: 'emotional' | 'physical' | 'psychic';
  origin: Vector3;
  target: Vector3;
  intensity: number;
  frequency: number;
  effects: ThreadEffect[];
  status: 'forming' | 'active' | 'resonating' | 'fading';
}

export interface ThreadEffect {
  type: string;
  magnitude: number;
  radius: number;
  duration: number;
  description: string;
}

export interface ResonanceMetrics {
  overallHarmony: number;
  threadDensity: number;
  stabilityIndex: number;
  emotionalResonance: number;
  physicalAlignment: number;
  psychicCoherence: number;
}

export class TapestryResonator {
  private threads = new Map<string, ResonanceThread>();
  private resonanceUpdates = new Subject<ResonanceThread>();
  private metricsUpdates = new BehaviorSubject<ResonanceMetrics>(this.getDefaultMetrics());
  
  private readonly BASE_FREQUENCIES = {
    emotional: 432, // Hz - Heart chakra resonance
    physical: 528, // Hz - DNA repair frequency
    psychic: 963  // Hz - Crown chakra frequency
  };

  constructor(
    private readonly maxThreads: number = 100,
    private readonly updateInterval: number = 100
  ) {
    this.startMetricsUpdates();
  }

  private getDefaultMetrics(): ResonanceMetrics {
    return {
      overallHarmony: 1,
      threadDensity: 0,
      stabilityIndex: 1,
      emotionalResonance: 1,
      physicalAlignment: 1,
      psychicCoherence: 1
    };
  }

  private startMetricsUpdates(): void {
    setInterval(() => {
      const metrics = this.calculateCurrentMetrics();
      this.metricsUpdates.next(metrics);
    }, this.updateInterval);
  }

  public createThread(
    type: ResonanceThread['type'],
    origin: Vector3,
    target: Vector3,
    intensity: number
  ): Observable<ResonanceThread> {
    return new Observable(observer => {
      if (this.threads.size >= this.maxThreads) {
        observer.error(new Error('Maximum thread capacity reached'));
        return;
      }

      const thread: ResonanceThread = {
        id: `thread-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type,
        origin: origin.clone(),
        target: target.clone(),
        intensity,
        frequency: this.calculateThreadFrequency(type, intensity),
        effects: [],
        status: 'forming'
      };

      this.threads.set(thread.id, thread);
      
      const processThread = () => {
        switch (thread.status) {
          case 'forming':
            thread.effects.push(this.generateEffect(thread, 'formation'));
            thread.status = 'active';
            break;
          
          case 'active':
            thread.effects.push(this.generateEffect(thread, 'resonance'));
            thread.status = 'resonating';
            break;
          
          case 'resonating':
            if (thread.intensity > 0.1) {
              thread.intensity *= 0.95;
              thread.effects.push(this.generateEffect(thread, 'sustain'));
            } else {
              thread.status = 'fading';
            }
            break;
          
          case 'fading':
            this.threads.delete(thread.id);
            observer.complete();
            return;
        }

        this.resonanceUpdates.next(thread);
        observer.next(thread);

        if (thread.status !== 'fading') {
          setTimeout(processThread, this.updateInterval);
        }
      };

      processThread();
    });
  }

  private calculateThreadFrequency(type: ResonanceThread['type'], intensity: number): number {
    const baseFreq = this.BASE_FREQUENCIES[type];
    const variation = (Math.random() - 0.5) * 0.1 * intensity;
    return baseFreq * (1 + variation);
  }

  private generateEffect(thread: ResonanceThread, phase: string): ThreadEffect {
    const baseEffect = {
      type: `${thread.type}_${phase}`,
      magnitude: thread.intensity * (0.5 + Math.random() * 0.5),
      radius: thread.intensity * 10,
      duration: 1000 * thread.intensity,
      description: ''
    };

    switch (thread.type) {
      case 'emotional':
        baseEffect.description = this.generateEmotionalEffect(phase);
        break;
      case 'physical':
        baseEffect.description = this.generatePhysicalEffect(phase);
        break;
      case 'psychic':
        baseEffect.description = this.generatePsychicEffect(phase);
        break;
    }

    return baseEffect;
  }

  private generateEmotionalEffect(phase: string): string {
    const effects = {
      formation: [
        'Emotional field forming',
        'Heart resonance detected',
        'Empathic wave emerging'
      ],
      resonance: [
        'Collective emotion amplified',
        'Heart-field harmonics stable',
        'Emotional coherence achieved'
      ],
      sustain: [
        'Emotional pattern stabilizing',
        'Heart-field maintaining coherence',
        'Empathic network sustained'
      ]
    };
    return effects[phase as keyof typeof effects][
      Math.floor(Math.random() * effects[phase as keyof typeof effects].length)
    ];
  }

  private generatePhysicalEffect(phase: string): string {
    const effects = {
      formation: [
        'Material resonance initiating',
        'Physical harmonics forming',
        'Quantum alignment beginning'
      ],
      resonance: [
        'Matter-wave coherence achieved',
        'Physical pattern stabilized',
        'Quantum state synchronized'
      ],
      sustain: [
        'Material stability maintained',
        'Physical resonance sustained',
        'Quantum alignment held'
      ]
    };
    return effects[phase as keyof typeof effects][
      Math.floor(Math.random() * effects[phase as keyof typeof effects].length)
    ];
  }

  private generatePsychicEffect(phase: string): string {
    const effects = {
      formation: [
        'Consciousness field emerging',
        'Psychic resonance forming',
        'Mental pattern crystallizing'
      ],
      resonance: [
        'Consciousness web stabilized',
        'Psychic harmony achieved',
        'Mental lattice synchronized'
      ],
      sustain: [
        'Consciousness field sustained',
        'Psychic resonance maintained',
        'Mental pattern preserved'
      ]
    };
    return effects[phase as keyof typeof effects][
      Math.floor(Math.random() * effects[phase as keyof typeof effects].length)
    ];
  }

  private calculateCurrentMetrics(): ResonanceMetrics {
    const activeThreads = Array.from(this.threads.values());
    if (activeThreads.length === 0) return this.getDefaultMetrics();

    const threadsByType = {
      emotional: activeThreads.filter(t => t.type === 'emotional'),
      physical: activeThreads.filter(t => t.type === 'physical'),
      psychic: activeThreads.filter(t => t.type === 'psychic')
    };

    return {
      overallHarmony: this.calculateOverallHarmony(activeThreads),
      threadDensity: activeThreads.length / this.maxThreads,
      stabilityIndex: this.calculateStabilityIndex(activeThreads),
      emotionalResonance: this.calculateTypeResonance(threadsByType.emotional),
      physicalAlignment: this.calculateTypeResonance(threadsByType.physical),
      psychicCoherence: this.calculateTypeResonance(threadsByType.psychic)
    };
  }

  private calculateOverallHarmony(threads: ResonanceThread[]): number {
    const frequencies = threads.map(t => t.frequency);
    const meanFreq = frequencies.reduce((a, b) => a + b, 0) / frequencies.length;
    const variance = frequencies.reduce((a, b) => a + Math.pow(b - meanFreq, 2), 0) / frequencies.length;
    return 1 / (1 + variance / meanFreq);
  }

  private calculateStabilityIndex(threads: ResonanceThread[]): number {
    const intensities = threads.map(t => t.intensity);
    return intensities.reduce((a, b) => a + b, 0) / (threads.length * 1.5);
  }

  private calculateTypeResonance(threads: ResonanceThread[]): number {
    if (threads.length === 0) return 1;
    return threads.reduce((acc, thread) => acc + thread.intensity, 0) / threads.length;
  }

  public observeResonance(): Observable<ResonanceThread> {
    return this.resonanceUpdates.asObservable().pipe(
      filter(thread => thread.intensity > 0.05),
      debounceTime(50)
    );
  }

  public observeMetrics(): Observable<ResonanceMetrics> {
    return this.metricsUpdates.asObservable();
  }

  public tuneThread(threadId: string, intensityDelta: number): boolean {
    const thread = this.threads.get(threadId);
    if (!thread) return false;

    thread.intensity = Math.max(0, Math.min(1, thread.intensity + intensityDelta));
    thread.frequency = this.calculateThreadFrequency(thread.type, thread.intensity);
    
    this.resonanceUpdates.next(thread);
    return true;
  }

  public getActiveThreads(): ResonanceThread[] {
    return Array.from(this.threads.values());
  }
}
