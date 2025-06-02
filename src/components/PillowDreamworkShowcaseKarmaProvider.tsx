
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface KarmaMetrics {
  positiveActions: number;
  negativeActions: number;
  neutralActions: number;
  overallBalance: number;
  dimensionalAlignment: number;
  timelineStability: number;
}

interface KarmaContextType {
  metrics: KarmaMetrics;
  updateKarma: (action: 'positive' | 'negative' | 'neutral', intensity?: number) => void;
  resetKarma: () => void;
}

const KarmaContext = createContext<KarmaContextType | undefined>(undefined);

const defaultMetrics: KarmaMetrics = {
  positiveActions: 0,
  negativeActions: 0,
  neutralActions: 0,
  overallBalance: 0,
  dimensionalAlignment: 1,
  timelineStability: 1
};

interface PillowDreamworkShowcaseKarmaProviderProps {
  children: ReactNode;
}

export const PillowDreamworkShowcaseKarmaProvider: React.FC<PillowDreamworkShowcaseKarmaProviderProps> = ({ children }) => {
  const [metrics, setMetrics] = useState<KarmaMetrics>(defaultMetrics);

  const updateKarma = (action: 'positive' | 'negative' | 'neutral', intensity: number = 1) => {
    setMetrics(prev => {
      const newMetrics = { ...prev };
      
      switch (action) {
        case 'positive':
          newMetrics.positiveActions += intensity;
          newMetrics.overallBalance += intensity;
          newMetrics.dimensionalAlignment = Math.min(1, newMetrics.dimensionalAlignment + intensity * 0.1);
          break;
        case 'negative':
          newMetrics.negativeActions += intensity;
          newMetrics.overallBalance -= intensity;
          newMetrics.timelineStability = Math.max(0, newMetrics.timelineStability - intensity * 0.1);
          break;
        case 'neutral':
          newMetrics.neutralActions += intensity;
          break;
      }

      return newMetrics;
    });
  };

  const resetKarma = () => {
    setMetrics(defaultMetrics);
  };

  return (
    <KarmaContext.Provider value={{ metrics, updateKarma, resetKarma }}>
      {children}
    </KarmaContext.Provider>
  );
};

export const useKarma = (): KarmaContextType => {
  const context = useContext(KarmaContext);
  if (!context) {
    throw new Error('useKarma must be used within a PillowDreamworkShowcaseKarmaProvider');
  }
  return context;
};
