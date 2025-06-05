
interface DimensionalEchoState {
  quantumCoherence: number;
  realityStability: number;
  echoStrength: number;
  dimensionalResonance: number;
  consciousnessLink: number;
  activeProcesses: number;
  energyLevel: number;
  lastUpdate: Date;
}

interface EchoEvent {
  id: string;
  type: 'dimensional_shift' | 'quantum_fluctuation' | 'reality_anchor' | 'consciousness_spike';
  intensity: number;
  timestamp: Date;
  description: string;
}

class DimensionalEchoCore {
  private state: DimensionalEchoState;
  private eventHistory: EchoEvent[] = [];
  private subscribers: Array<(state: DimensionalEchoState) => void> = [];
  private updateInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.state = {
      quantumCoherence: 95.7,
      realityStability: 88.2,
      echoStrength: 75.4,
      dimensionalResonance: 92.1,
      consciousnessLink: 82.3,
      activeProcesses: 12,
      energyLevel: 142,
      lastUpdate: new Date()
    };

    this.startRealTimeUpdates();
  }

  private startRealTimeUpdates() {
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
      activeProcesses: Math.max(5, Math.min(25, this.state.activeProcesses + Math.floor(fluctuation()))),
      energyLevel: Math.max(50, Math.min(200, this.state.energyLevel + fluctuation() * 5)),
      lastUpdate: new Date()
    };

    // Generate random events
    if (Math.random() < 0.3) {
      this.generateRandomEvent();
    }

    this.notifySubscribers();
  }

  private generateRandomEvent() {
    const eventTypes: EchoEvent['type'][] = [
      'dimensional_shift',
      'quantum_fluctuation', 
      'reality_anchor',
      'consciousness_spike'
    ];

    const descriptions = {
      dimensional_shift: 'Dimensional barrier fluctuation detected',
      quantum_fluctuation: 'Quantum field disturbance observed',
      reality_anchor: 'Reality anchor point stabilized',
      consciousness_spike: 'Consciousness resonance spike measured'
    };

    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    const event: EchoEvent = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      intensity: Math.floor(Math.random() * 100),
      timestamp: new Date(),
      description: descriptions[type]
    };

    this.eventHistory.unshift(event);
    this.eventHistory = this.eventHistory.slice(0, 50); // Keep last 50 events
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.state));
  }

  public subscribe(callback: (state: DimensionalEchoState) => void) {
    this.subscribers.push(callback);
    callback(this.state); // Initial call
    
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
      consciousness_spike: 'Consciousness manually enhanced'
    };

    const event: EchoEvent = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      intensity,
      timestamp: new Date(),
      description: descriptions[type]
    };

    this.eventHistory.unshift(event);
    this.eventHistory = this.eventHistory.slice(0, 50);
    this.notifySubscribers();
  }

  public adjustParameter(parameter: keyof Omit<DimensionalEchoState, 'lastUpdate'>, value: number) {
    if (parameter in this.state && typeof this.state[parameter] === 'number') {
      this.state = {
        ...this.state,
        [parameter]: Math.max(0, Math.min(parameter === 'energyLevel' ? 200 : 100, value)),
        lastUpdate: new Date()
      };
      this.notifySubscribers();
    }
  }

  public destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.subscribers = [];
  }
}

export const dimensionalEchoCore = new DimensionalEchoCore();
export type { DimensionalEchoState, EchoEvent };
