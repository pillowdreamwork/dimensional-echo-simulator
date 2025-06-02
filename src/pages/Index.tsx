
import { useState, useEffect } from "react";
import QuantumInterface from "@/components/QuantumInterface";
import SymbolDecoder from "@/components/SymbolDecoder";
import { QuantumState } from "@/types/quantum";

const Index = () => {
  const [quantumState, setQuantumState] = useState<QuantumState | undefined>();

  const handleSuperposition = (values: number[]) => {
    console.log('Superposition values:', values);
  };

  const handleSymbolConnect = (pattern: string[], interpretation: string) => {
    console.log('Symbol connection:', { pattern, interpretation });
  };

  return (
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
          <QuantumInterface 
            initialState={quantumState}
            onStateChange={setQuantumState}
          />
          
          <SymbolDecoder 
            onSymbolConnect={handleSymbolConnect}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
