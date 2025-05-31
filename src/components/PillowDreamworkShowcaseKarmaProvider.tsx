import React, { createContext, useContext, useMemo } from 'react';
import { KarmaReflectionSystem } from '../lib/cores/karma-reflection';
import { QuantumTesseractEngine } from '../lib/cores/quantum-tesseract';

const tesseractEngine = new QuantumTesseractEngine();
const karmaSystem = new KarmaReflectionSystem(tesseractEngine);

export const KarmaSystemContext = createContext<KarmaReflectionSystem>(karmaSystem);

export const useKarmaSystem = () => useContext(KarmaSystemContext);

export const PillowDreamworkShowcaseKarmaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Memoize to avoid re-instantiating
  const value = useMemo(() => karmaSystem, []);
  return (
    <KarmaSystemContext.Provider value={value}>
      {children}
    </KarmaSystemContext.Provider>
  );
};
