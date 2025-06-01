
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ForgeDashboard } from "./components/dreamforge/ForgeDashboard";
import { useEffect } from "react";
import { runSystemCheck } from "./utils/moduleCheck";
import { TesseractWeaveEditor } from "./components/TesseractWeaveEditor";

// Create a new query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  // Run system check on app initialization
  useEffect(() => {
    const systemStatus = runSystemCheck();
    console.log(`System Status: ${systemStatus.status} (${systemStatus.functionalityScore}% functional)`);
  }, []);

  // Create default props for TesseractWeaveEditor
  const defaultQuantumState = {
    stateVector: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    probability: 1,
    entanglementMap: new Map(),
    collapseHistory: [],
    state: 'stable',
    coherence: 1,
    entanglement: 0,
    entanglementStrength: 0,
    superposition: 0,
    phase: 0,
    dimensionalResonance: 0,
    aethericResonance: 0,
    dimensionalStability: 1,
    timelineConvergence: 0,
    dimensionalShift: 0,
    ritualParticipants: {},
    realityAnchors: { primary: '', secondary: [], strength: 0 },
    quantumSignature: { hash: '', timestamp: Date.now(), validityPeriod: 3600 },
    forgeMetadata: { version: '1.0', lastModified: Date.now(), stabilityIndex: 1, energyConsumption: 0 }
  };

  const defaultDimensionalProperties = {
    id: 'default',
    name: 'Base Reality',
    stability: 1,
    energy: 100,
    resonance: 0.5
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/forge" element={<ForgeDashboard />} />
            <Route path="/weaver" element={
              <TesseractWeaveEditor 
                quantumState={defaultQuantumState}
                dimensionalProperties={defaultDimensionalProperties}
                onStateChange={() => {}}
                onDimensionalShift={() => {}}
              />
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
