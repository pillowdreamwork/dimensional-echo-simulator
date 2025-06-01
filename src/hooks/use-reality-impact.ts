
import { useState, useEffect, useCallback } from 'react';
import { getEngineModules } from '../lib/engine';
import type { DimensionalImpact, RealityFeedback, PersonalEffect } from '../types/impact';

interface UseRealityImpactOptions {
  pollInterval?: number;
  maxHistory?: number;
}

export function useRealityImpact({ pollInterval = 5000, maxHistory = 50 }: UseRealityImpactOptions = {}) {
  const [impacts, setImpacts] = useState<DimensionalImpact[]>([]);
  const [feedback, setFeedback] = useState<RealityFeedback[]>([]);
  const [personalEffects, setPersonalEffects] = useState<PersonalEffect[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Get engine modules safely
  const getEngineModulesSafely = useCallback(() => {
    try {
      return getEngineModules();
    } catch (error) {
      console.error('Failed to get engine modules:', error);
      return {
        echoSimulator: null,
        dreamServer: null,
        mythicAI: null,
        iuri: null
      };
    }
  }, []);

  // Add missing methods for compatibility
  const realityFeedback = feedback;
  const stabilizeReality = useCallback(async () => {
    console.log('Stabilizing reality...');
  }, []);
  
  const processCascadeEffect = useCallback(async (effect: any) => {
    console.log('Processing cascade effect:', effect);
  }, []);

  // Add a new impact
  const addImpact = useCallback(async (impact: Omit<DimensionalImpact, 'id' | 'timestamp'>) => {
    try {
      const { echoSimulator, iuri } = getEngineModulesSafely();

      // Create ripple effect if echo simulator is available
      if (echoSimulator?.createRippleEffect) {
        const rippleEvent = echoSimulator.createRippleEffect({
          description: impact.action,
          dimension: impact.effects[0]?.intensity || 1
        });

        if (rippleEvent) {
          console.log('Ripple effect created:', rippleEvent);
        }
      }

      // Invoke ritual if IURI is available
      if (iuri?.invokeRitual) {
        const ritualResult = await iuri.invokeRitual({
          glyph: impact.dimensionalCode,
          intensity: Math.max(...impact.effects.map(e => e.intensity)) * 100,
          intention: impact.action
        });

        if (ritualResult?.success) {
          console.log('Ritual successful:', ritualResult);
        }
      }

      const newImpact: DimensionalImpact = {
        ...impact,
        id: `impact-${Date.now()}`,
        timestamp: new Date().toISOString(),
        verificationStatus: 'PENDING'
      };

      setImpacts(prev => [newImpact, ...prev].slice(0, maxHistory));
      return newImpact;
    } catch (error) {
      console.error('Failed to add impact:', error);
      throw error;
    }
  }, [maxHistory, getEngineModulesSafely]);

  // Verify an impact
  const verifyImpact = useCallback(async (impactId: string, status: 'VERIFIED' | 'UNVERIFIED') => {
    try {
      setImpacts(prev => prev.map(impact =>
        impact.id === impactId
          ? { ...impact, verificationStatus: status }
          : impact
      ));
    } catch (error) {
      console.error('Failed to verify impact:', error);
      throw error;
    }
  }, []);

  // Poll for new events
  useEffect(() => {
    let mounted = true;
    let pollTimer: NodeJS.Timeout;

    const pollForUpdates = async () => {
      if (!mounted) return;

      try {
        const { dreamServer, mythicAI } = getEngineModulesSafely();

        // Get feedback from dream server
        if (dreamServer?.getDreamFeedback) {
          const dreamFeedback = await dreamServer.getDreamFeedback();
          if (mounted && dreamFeedback) {
            setFeedback(prev => [...dreamFeedback, ...prev].slice(0, maxHistory));
          }
        }

        // Get personal effects from mythic AI
        if (mythicAI?.getCurrentEffects) {
          const effects = await mythicAI.getCurrentEffects();
          if (mounted && effects) {
            setPersonalEffects(prev => [...effects, ...prev].slice(0, maxHistory));
          }
        }

        setError(null);
      } catch (err) {
        console.error('Error polling for updates:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to poll for updates'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Initial poll
    pollForUpdates();

    // Set up polling interval
    pollTimer = setInterval(pollForUpdates, pollInterval);

    return () => {
      mounted = false;
      clearInterval(pollTimer);
    };
  }, [pollInterval, maxHistory, getEngineModulesSafely]);

  return {
    impacts,
    feedback,
    realityFeedback, // Added compatibility alias
    personalEffects,
    isLoading,
    error,
    addImpact,
    verifyImpact,
    stabilizeReality, // Added missing method
    processCascadeEffect // Added missing method
  };
}
