import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useQuantumState } from './hooks/use-quantum-state';
import { useDimensionalProperties } from './hooks/use-dimensional-properties';
import { LoadingFallback } from './components/ui/loading';
import { runSystemCheck } from './utils/moduleCheck';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { ForgeDashboard } from './components/dreamforge/ForgeDashboard';
import './App.css';

// Create query client for data fetching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Lazy load major components
const DimensionalView = lazy(() => import('./components/DimensionalView').then(m => ({ default: m.default })));
const RealityMonitor = lazy(() => import('./components/RealityMonitor').then(m => ({ default: m.RealityMonitor })));
const QuantumStateCollapser = lazy(() => import('./components/QuantumStateCollapser').then(m => ({ default: m.QuantumStateCollapser })));
const TesseractWeaveEditor = lazy(() => import('./components/TesseractWeaveEditor').then(m => ({ default: m.TesseractWeaveEditor })));

const App = () => {
  // Initialize system check
  useEffect(() => {
    const systemStatus = runSystemCheck();
    console.log(`System Status: ${systemStatus.status} (${systemStatus.functionalityScore}% functional)`);
  }, []);

  const { quantumState, updateQuantumState } = useQuantumState();
  const { dimensionalProperties, updateDimensionalProperties } = useDimensionalProperties();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <div className="min-h-screen bg-background text-foreground">
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">
                  Dimensional Echo Simulator
                </h1>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <ErrorBoundary>
                    <Suspense fallback={<LoadingFallback />}>
                      <DimensionalView 
                        quantumState={quantumState}
                        isTransitioning={quantumState.isCollapsed}
                      />
                    </Suspense>
                  </ErrorBoundary>

                  <ErrorBoundary>
                    <Suspense fallback={<LoadingFallback />}>
                      <RealityMonitor 
                        currentDimension={dimensionalProperties.level} 
                        stabilityFactor={quantumState.dimensionalStability}
                        timelineConvergence={quantumState.timelineConvergence}
                      />
                    </Suspense>
                  </ErrorBoundary>

                  <ErrorBoundary>
                    <Suspense fallback={<LoadingFallback />}>
                      <QuantumStateCollapser 
                        className="w-full"
                        quantumState={quantumState}
                        onStateChange={updateQuantumState}
                      />
                    </Suspense>
                  </ErrorBoundary>
                </div>
              </div>

              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/forge" element={<ForgeDashboard />} />
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
