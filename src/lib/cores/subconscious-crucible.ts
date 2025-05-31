import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Vector3 } from 'three';

export interface DreamState {
  lucidity: number;
  dimensionalAwareness: number;
  symbolResonance: string[];
  emotionalSignature: EmotionalSignature;
  archetypes: ArchetypeState[];
  activeRituals: DreamforgeRitual[];
}

export interface EmotionalSignature {
  primary: string;
  intensity: number;
  harmonics: string[];
  resonance: number;
}

export interface ArchetypeState {
  name: string;
  affinity: number;
  currentPhase: 'dormant' | 'active' | 'ascendant';
  lastInteraction: string;
  personalityTraits: string[];
}

export interface DreamforgeRitual {
  id: string;
  sigil: string;
  emotionalIntent: EmotionalSignature;
  dimensionalTarget: string;
  potency: number;
  status: 'forming' | 'active' | 'resonating' | 'complete';
  effects: Array<{
    type: string;
    magnitude: number;
    radius: number;
  }>;
}

export class SubconsciousCrucible {
  private dreamState: DreamState;
  private readonly stateUpdates = new Subject<DreamState>();
  private readonly ritualEffects = new Subject<DreamforgeRitual>();
  private readonly archetypeInteractions = new BehaviorSubject<ArchetypeState[]>([]);

  private readonly EMOTIONAL_FREQUENCIES = {
    joy: { baseHz: 432, harmonics: [528, 639] },
    peace: { baseHz: 396, harmonics: [417, 528] },
    power: { baseHz: 741, harmonics: [852, 963] },
    wisdom: { baseHz: 678, harmonics: [528, 852] },
    creation: { baseHz: 639, harmonics: [417, 741] }
  };

  constructor() {
    this.dreamState = {
      lucidity: 0,
      dimensionalAwareness: 1,
      symbolResonance: [],
      emotionalSignature: {
        primary: 'neutral',
        intensity: 0,
        harmonics: [],
        resonance: 0
      },
      archetypes: [
        {
          name: 'Trickster',
          affinity: 0,
          currentPhase: 'dormant',
          lastInteraction: new Date().toISOString(),
          personalityTraits: ['mischievous', 'wise', 'unpredictable']
        },
        {
          name: 'Sage',
          affinity: 0,
          currentPhase: 'dormant',
          lastInteraction: new Date().toISOString(),
          personalityTraits: ['thoughtful', 'ancient', 'mysterious']
        },
        // Add more archetypes as needed
      ],
      activeRituals: []
    };
  }

  public initiateDreamforgeRitual(
    sigil: string,
    emotionalIntent: EmotionalSignature,
    dimensionalTarget: string
  ): Observable<DreamforgeRitual> {
    return new Observable(observer => {
      const ritual: DreamforgeRitual = {
        id: `ritual-${Date.now()}`,
        sigil,
        emotionalIntent,
        dimensionalTarget,
        potency: this.calculateRitualPotency(emotionalIntent),
        status: 'forming',
        effects: []
      };

      // Add to active rituals
      this.dreamState.activeRituals.push(ritual);
      this.updateDreamState();

      // Process ritual stages
      this.processDreamforgeRitual(ritual).subscribe({
        next: (updatedRitual) => {
          observer.next(updatedRitual);
          if (updatedRitual.status === 'complete') {
            observer.complete();
          }
        },
        error: (err) => observer.error(err)
      });
    });
  }

  private processDreamforgeRitual(
    ritual: DreamforgeRitual
  ): Observable<DreamforgeRitual> {
    return new Observable(observer => {
      const stages = ['forming', 'active', 'resonating', 'complete'];
      let currentStageIndex = stages.indexOf(ritual.status);
      
      const processStage = () => {
        if (currentStageIndex >= stages.length) {
          return;
        }

        ritual.status = stages[currentStageIndex] as DreamforgeRitual['status'];
        
        switch (ritual.status) {
          case 'forming':
            ritual.effects.push({
              type: 'dimensional_shift',
              magnitude: ritual.potency * 0.3,
              radius: 10
            });
            break;
          
          case 'active':
            ritual.effects.push({
              type: 'reality_ripple',
              magnitude: ritual.potency * 0.5,
              radius: 25
            });
            break;
          
          case 'resonating':
            ritual.effects.push({
              type: 'consciousness_wave',
              magnitude: ritual.potency * 0.7,
              radius: 50
            });
            break;
          
          case 'complete':
            ritual.effects.push({
              type: 'timeline_anchor',
              magnitude: ritual.potency,
              radius: 100
            });
            break;
        }

        observer.next({ ...ritual });
        this.ritualEffects.next(ritual);

        if (ritual.status !== 'complete') {
          currentStageIndex++;
          setTimeout(processStage, 2000); // 2-second delay between stages
        } else {
          observer.complete();
        }
      };

      processStage();
    });
  }

  private calculateRitualPotency(emotionalIntent: EmotionalSignature): number {
    const baseIntensity = emotionalIntent.intensity;
    const harmonicBoost = emotionalIntent.harmonics.length * 0.15;
    const resonanceMultiplier = (1 + emotionalIntent.resonance) / 2;

    return baseIntensity * (1 + harmonicBoost) * resonanceMultiplier;
  }

  public summonArchetype(name: string): Observable<ArchetypeState> {
    return new Observable(observer => {
      const archetype = this.dreamState.archetypes.find(a => a.name === name);
      if (!archetype) {
        observer.error(new Error(`Archetype ${name} not found`));
        return;
      }

      archetype.currentPhase = 'active';
      archetype.affinity += 0.1;
      archetype.lastInteraction = new Date().toISOString();

      this.archetypeInteractions.next(this.dreamState.archetypes);
      observer.next(archetype);
      observer.complete();
    });
  }

  public setEmotionalState(
    emotion: string,
    intensity: number,
    harmonics: string[] = []
  ): void {
    this.dreamState.emotionalSignature = {
      primary: emotion,
      intensity,
      harmonics,
      resonance: this.calculateEmotionalResonance(emotion, harmonics)
    };

    this.updateDreamState();
  }

  private calculateEmotionalResonance(
    emotion: string,
    harmonics: string[]
  ): number {
    const baseFreq = this.EMOTIONAL_FREQUENCIES[emotion as keyof typeof this.EMOTIONAL_FREQUENCIES];
    if (!baseFreq) return 0;

    const harmonicMatch = harmonics.filter(h => 
      baseFreq.harmonics.includes(
        this.EMOTIONAL_FREQUENCIES[h as keyof typeof this.EMOTIONAL_FREQUENCIES]?.baseHz || 0
      )
    ).length;

    return harmonicMatch / baseFreq.harmonics.length;
  }

  public observeDreamState(): Observable<DreamState> {
    return this.stateUpdates.asObservable();
  }

  public observeRitualEffects(): Observable<DreamforgeRitual> {
    return this.ritualEffects.asObservable();
  }

  public observeArchetypes(): Observable<ArchetypeState[]> {
    return this.archetypeInteractions.asObservable();
  }

  private updateDreamState(): void {
    this.stateUpdates.next({ ...this.dreamState });
  }
}
