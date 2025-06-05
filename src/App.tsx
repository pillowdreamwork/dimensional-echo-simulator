import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingFallback } from './components/ui/loading';
import { useQuantumState } from './hooks/use-quantum-state';
import { useDimensionalProperties } from './hooks/use-dimensional-properties';
import { runSystemCheck } from './utils/moduleCheck';
import { validateDimensionalTransition } from './lib/utils';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/toaster';
import type { DimensionalLevel } from './types/dimensional';
import NotFound from './pages/NotFound';
import './App.css';

// Create query client with dimensional stability awareness
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: Error | null) => {
        const errorWithContext = error as Error & { dimensionalContext?: { stability: number } };
        const { stability } = errorWithContext?.dimensionalContext ?? { stability: 1 };
        const maxRetries = Math.ceil(4 * stability);
        return failureCount < maxRetries;
      },
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Lazy load major components with proper type handling
const DimensionalView = lazy(() => import('./components/DimensionalView'));

const RealityMonitor = lazy(() => 
  import('./components/RealityMonitor').then(module => ({
    default: module.RealityMonitor
  }))
);

const QuantumStateCollapser = lazy(() => 
  import('./components/QuantumStateCollapser')
);

const TesseractWeaveEditor = lazy(() =>
  import('./components/TesseractWeaveEditor')
);

const DreamForge = lazy(() => 
  import('./components/dreamforge/ForgeDashboard')
);

const App = () => {
  const {
    properties: dimensionalProperties,
    updateProperties: updateDimensionalProperties,
    stabilityStatus
  } = useDimensionalProperties();

  const {
    quantumState,
    updateQuantumState,
    collapseQuantumState: handleCollapseState
  } = useQuantumState({
    initialState: {
      coherence: 1,
      entanglement: 0.5,
      superposition: 1,
      dimensionalStability: dimensionalProperties.stability,
      timelineConvergence: dimensionalProperties.timelineFactor
    }
  });

  // Enhanced system check with dimensional monitoring
  useEffect(() => {
    const checkSystem = async () => {
      const systemStatus = await runSystemCheck();
      
      // Validate dimensional stability for transitions
      const validationResult = validateDimensionalTransition(
        dimensionalProperties,
        {
          ...dimensionalProperties,
          level: dimensionalProperties.level + 1
        }
      );

      console.log(`System Status: ${systemStatus.status} (${systemStatus.functionalityScore}% functional)`);
      console.log('Dimensional Stability:', validationResult);
      
      if (!stabilityStatus.isStable) {
        console.warn('Stability Warnings:', stabilityStatus.warnings);
        console.info('Suggested Actions:', stabilityStatus.suggestedActions);
      }
    };

    checkSystem();

    // Monitor quantum state changes
    const quantumMonitor = setInterval(() => {
      if (quantumState.coherence < 0.5) {
        console.warn('Low quantum coherence detected');
      }
    }, 10000);

    return () => clearInterval(quantumMonitor);
  }, [dimensionalProperties, quantumState, stabilityStatus]);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <BrowserRouter>
          <TooltipProvider>
            <Suspense 
              fallback={
                <LoadingFallback 
                  message="Stabilizing dimensional matrix..."
                  resonanceLevel={dimensionalProperties.resonance}
                />
              }
            >
              <Toaster />
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <DimensionalView 
                      quantumState={quantumState}
                      isTransitioning={quantumState.isTransitioning}
                    />
                  } 
                />
                <Route 
                  path="/forge" 
                  element={<DreamForge />} 
                />
                <Route 
                  path="/weaver" 
                  element={
                    <TesseractWeaveEditor 
                      quantumState={quantumState}
                      dimensionalProperties={dimensionalProperties}
                      onStateChange={updateQuantumState}
                      onDimensionalShift={updateDimensionalProperties}
                    />
                  } 
                />
                <Route 
                  path="/monitor" 
                  element={
                    <RealityMonitor 
                      currentDimension={dimensionalProperties.level as DimensionalLevel}
                      stabilityFactor={dimensionalProperties.stability}
                      timelineConvergence={dimensionalProperties.timelineFactor}
                      consciousness={0.8}
                    />
                  } 
                />
                <Route 
                  path="/quantum" 
                  element={
                    <QuantumStateCollapser 
                      quantumState={quantumState}
                      onStateChange={updateQuantumState}
                    />
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </TooltipProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
