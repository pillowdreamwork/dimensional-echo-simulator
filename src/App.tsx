
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Portal from "./pages/Portal";
import Multimedia from "./pages/Multimedia";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner size="lg" text="Loading DreamForge..." />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={
                  <Suspense fallback={<LoadingSpinner size="lg" text="Loading Control Center..." />}>
                    <Dashboard />
                  </Suspense>
                } />
                <Route path="/portal" element={
                  <Suspense fallback={<LoadingSpinner size="lg" text="Loading Portal Interface..." />}>
                    <Portal />
                  </Suspense>
                } />
                <Route path="/multimedia" element={
                  <Suspense fallback={<LoadingSpinner size="lg" text="Loading Multimedia Suite..." />}>
                    <Multimedia />
                  </Suspense>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
