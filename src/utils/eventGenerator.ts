interface GlobalEvent {
  id: string;
  location: string;
  event: string;
  category: 'political' | 'economic' | 'environmental' | 'social' | 'technological';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  dimensionalResonance: number;
  portalOpportunity?: string;
}

export const generateRealWorldEvents = (): GlobalEvent[] => {
  return [
    {
      id: "ukraine-conflict",
      location: "Eastern Europe",
      event: "Ongoing conflict affecting global food and energy security",
      category: 'political',
      severity: 'critical',
      timestamp: new Date(),
      dimensionalResonance: 8.7,
      portalOpportunity: "Peace resonance portal in 4D space-time"
    },
    {
      id: "climate-change",
      location: "Global",
      event: "Climate change driving extreme weather patterns worldwide",
      category: 'environmental',
      severity: 'critical',
      timestamp: new Date(),
      dimensionalResonance: 9.2,
      portalOpportunity: "Ecological harmony gateway in 6D consciousness"
    },
    {
      id: "ai-development",
      location: "Silicon Valley, USA",
      event: "Rapid AI advancement reshaping technological landscape",
      category: 'technological',
      severity: 'high',
      timestamp: new Date(),
      dimensionalResonance: 7.4,
      portalOpportunity: "Intelligence amplification bridge in 8D harmonic space"
    },
    {
      id: "economic-uncertainty",
      location: "Global Markets",
      event: "Inflation and supply chain disruptions affecting global economy",
      category: 'economic',
      severity: 'high',
      timestamp: new Date(),
      dimensionalResonance: 6.8,
      portalOpportunity: "Abundance manifestation portal in 5D probability field"
    },
    {
      id: "social-polarization",
      location: "Multiple Countries",
      event: "Rising political and social divisions across democracies",
      category: 'social',
      severity: 'high',
      timestamp: new Date(),
      dimensionalResonance: 7.1,
      portalOpportunity: "Unity consciousness gateway in 7D symbolic realm"
    },
    {
      id: "space-exploration",
      location: "Mars & Moon",
      event: "Renewed space exploration efforts by multiple nations",
      category: 'technological',
      severity: 'medium',
      timestamp: new Date(),
      dimensionalResonance: 5.6,
      portalOpportunity: "Cosmic expansion portal in 9D spacetime"
    }
  ];
};
