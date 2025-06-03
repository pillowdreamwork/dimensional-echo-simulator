
import { useState, useEffect } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import QuantumInterface from "@/components/QuantumInterface";
import SymbolDecoder from "@/components/SymbolDecoder";
import { QuantumState } from "@/types/quantum";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [quantumState, setQuantumState] = useState<QuantumState | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Quantum Interface Initialized",
        description: "DreamForge is ready for reality engineering.",
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleSuperposition = (values: number[]) => {
    console.log('Superposition values:', values);
  };

  const handleSymbolConnect = (pattern: string[], interpretation: string) => {
    console.log('Symbol connection:', { pattern, interpretation });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900/20 to-indigo-900/20 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Initializing Quantum Reality Matrix..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-purple-900/20 to-indigo-900/20 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              DreamForge Quantum Interface
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced Quantum Reality Engineering Platform
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ErrorBoundary>
              <QuantumInterface 
                initialState={quantumState}
                onStateChange={setQuantumState}
              />
            </ErrorBoundary>
            
            <ErrorBoundary>
              <SymbolDecoder 
                onSymbolConnect={handleSymbolConnect}
              />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Index;
