
import { Observable, BehaviorSubject, Subject } from 'rxjs';

interface DimensionalEchoState {
  quantumCoherence: number;
  realityStability: number;
  echoStrength: number;
  dimensionalResonance: number;
  consciousnessLink: number;
  activeProcesses: number;
  energyLevel: number;
  temporalAlignment: number;
  manifestationPotential: number;
  systemStatus: 'initializing' | 'stable' | 'resonating' | 'critical' | 'transcendent';
  lastUpdate: Date;
}

interface EchoEvent {
  id: string;
  type: 'dimensional_shift' | 'quantum_fluctuation' | 'reality_anchor' | 'consciousness_spike' | 'quantum_shift' | 'dimensional_echo' | 'consciousness_pulse';
  intensity: number;
  timestamp: Date;
  description: string;
  location: {
    x: number;
    y: number;
    z: number;
  };
}

class DimensionalEchoCore {
  private state: DimensionalEchoState;
  private eventHistory: EchoEvent[] = [];
  private subscribers: Array<(state: DimensionalEchoState) => void> = [];
  private updateInterval: NodeJS.Timeout | null = null;
  private stateSubject: BehaviorSubject<DimensionalEchoState>;
  private eventsSubject: Subject<EchoEvent>;
  private isInitialized: boolean = false;

  constructor() {
    this.state = {
      quantumCoherence: 95.7,
      realityStability: 88.2,
      echoStrength: 75.4,
      dimensionalResonance: 92.1,
      consciousnessLink: 82.3,
      activeProcesses: 12,
      energyLevel: 142,
      temporalAlignment: 85.6,
      manifestationPotential: 73.2,
      systemStatus: 'initializing',
      lastUpdate: new Date()
    };

    this.stateSubject = new BehaviorSubject(this.state);
    this.eventsSubject = new Subject();
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    this.isInitialized = true;
    this.state.systemStatus = 'stable';
    this.stateSubject.next(this.state);
    this.startRealTimeUpdates();
  }

  private startRealTimeUpdates() {
    if (this.updateInterval) return;
    
    this.updateInterval = setInterval(() => {
      this.updateState();
    }, 3000);
  }

  private updateState() {
    const fluctuation = () => (Math.random() - 0.5) * 2;
    
    this.state = {
      ...this.state,
      quantumCoherence: Math.max(70, Math.min(100, this.state.quantumCoherence + fluctuation())),
      realityStability: Math.max(60, Math.min(100, this.state.realityStability + fluctuation())),
      echoStrength: Math.max(50, Math.min(100, this.state.echoStrength + fluctuation())),
      dimensionalResonance: Math.max(70, Math.min(100, this.state.dimensionalResonance + fluctuation())),
      consciousnessLink: Math.max(40, Math.min(100, this.state.consciousnessLink + fluctuation())),
      temporalAlignment: Math.max(40, Math.min(100, this.state.temporalAlignment + fluctuation())),
      manifestationPotential: Math.max(30, Math.min(100, this.state.manifestationPotential + fluctuation())),
      activeProcesses: Math.max(5, Math.min(25, this.state.activeProcesses + Math.floor(fluctuation()))),
      energyLevel: Math.max(50, Math.min(200, this.state.energyLevel + fluctuation() * 5)),
      systemStatus: this.determineSystemStatus(),
      lastUpdate: new Date()
    };

    // Generate random events
    if (Math.random() < 0.3) {
      this.generateRandomEvent();
    }

    this.notifySubscribers();
    this.stateSubject.next(this.state);
  }

  private determineSystemStatus(): DimensionalEchoState['systemStatus'] {
    const avgLevel = (this.state.quantumCoherence + this.state.realityStability + this.state.echoStrength) / 3;
    
    if (avgLevel > 90) return 'transcendent';
    if (avgLevel > 80) return 'resonating';
    if (avgLevel > 60) return 'stable';
    return 'critical';
  }

  private generateRandomEvent() {
    const eventTypes: EchoEvent['type'][] = [
      'dimensional_shift',
      'quantum_fluctuation', 
      'reality_anchor',
      'consciousness_spike',
      'quantum_shift',
      'dimensional_echo',
      'consciousness_pulse'
    ];

    const descriptions = {
      dimensional_shift: 'Dimensional barrier fluctuation detected',
      quantum_fluctuation: 'Quantum field disturbance observed',
      reality_anchor: 'Reality anchor point stabilized',
      consciousness_spike: 'Consciousness resonance spike measured',
      quantum_shift: 'Quantum state transition observed',
      dimensional_echo: 'Echo resonance detected across dimensions',
      consciousness_pulse: 'Consciousness pulse propagating through reality'
    };

    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    const event: EchoEvent = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      intensity: Math.random(),
      timestamp: new Date(),
      description: descriptions[type],
      location: {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        z: (Math.random() - 0.5) * 100
      }
    };

    this.eventHistory.unshift(event);
    this.eventHistory = this.eventHistory.slice(0, 50);
    this.eventsSubject.next(event);
  }

  public observeEchoState(): Observable<DimensionalEchoState> {
    return this.stateSubject.asObservable();
  }

  public observeEchoEvents(): Observable<EchoEvent> {
    return this.eventsSubject.asObservable();
  }

  public triggerDimensionalShift(intensity: number): void {
    const event: EchoEvent = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'dimensional_shift',
      intensity,
      timestamp: new Date(),
      description: 'Manual dimensional shift triggered',
      location: {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        z: (Math.random() - 0.5) * 100
      }
    };

    this.eventHistory.unshift(event);
    this.eventHistory = this.eventHistory.slice(0, 50);
    this.eventsSubject.next(event);
    
    // Apply shift effects to state
    this.state.dimensionalResonance = Math.min(100, this.state.dimensionalResonance + intensity * 10);
    this.state.echoStrength = Math.min(100, this.state.echoStrength + intensity * 5);
    this.stateSubject.next(this.state);
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.state));
  }

  public subscribe(callback: (state: DimensionalEchoState) => void) {
    this.subscribers.push(callback);
    callback(this.state);
    
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  public getCurrentState(): DimensionalEchoState {
    return { ...this.state };
  }

  public getEventHistory(): EchoEvent[] {
    return [...this.eventHistory];
  }

  public triggerManualEvent(type: EchoEvent['type'], intensity: number) {
    const descriptions = {
      dimensional_shift: 'Manual dimensional shift initiated',
      quantum_fluctuation: 'Quantum field manually disrupted',
      reality_anchor: 'Reality anchor manually established',
      consciousness_spike: 'Consciousness manually enhanced',
      quantum_shift: 'Manual quantum shift initiated',
      dimensional_echo: 'Manual dimensional echo triggered',
      consciousness_pulse: 'Manual consciousness pulse activated'
    };

    const event: EchoEvent = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      intensity,
      timestamp: new Date(),
      description: descriptions[type],
      location: {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        z: (Math.random() - 0.5) * 100
      }
    };

    this.eventHistory.unshift(event);
    this.eventHistory = this.eventHistory.slice(0, 50);
    this.eventsSubject.next(event);
    this.notifySubscribers();
  }

  public adjustParameter(parameter: keyof Omit<DimensionalEchoState, 'lastUpdate' | 'systemStatus'>, value: number) {
    if (parameter in this.state && typeof this.state[parameter] === 'number') {
      this.state = {
        ...this.state,
        [parameter]: Math.max(0, Math.min(parameter === 'energyLevel' ? 200 : 100, value)),
        lastUpdate: new Date()
      };
      this.stateSubject.next(this.state);
      this.notifySubscribers();
    }
  }

  public destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.subscribers = [];
    this.stateSubject.complete();
    this.eventsSubject.complete();
  }
}

export const dimensionalEchoCore = new DimensionalEchoCore();
export type { DimensionalEchoState, EchoEvent };
