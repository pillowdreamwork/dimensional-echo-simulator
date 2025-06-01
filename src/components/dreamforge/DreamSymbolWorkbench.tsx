import React, { useEffect, useState } from 'react';
import { DreamSymbol, CompilationResult } from '../../types/quantum';
import { DreamSymbolCompiler } from '../../lib/cores/dream-symbol-compiler';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { askGPT } from '../../lib/ai/gptService';
import { useQuantumState } from '../../hooks/use-quantum-state';

const compiler = new DreamSymbolCompiler();

const SymbolVisualizer: React.FC<{ symbol: DreamSymbol }> = ({ symbol }) => {
  const { scene } = useThree();
  
  useFrame(() => {
    // Animate the symbol based on its quantum state
  });

  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color={`hsl(${symbol.resonance * 360}, 70%, 50%)`}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
};

export const DreamSymbolWorkbench: React.FC = () => {
  const { quantumState, updateQuantumState } = useQuantumState();
  const [activeSymbol, setActiveSymbol] = useState<DreamSymbol | null>(null);
  const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null);
  const [symbols, setSymbols] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const subscription = compiler.observeCompilationState().subscribe(
      result => setCompilationResult(result)
    );
    return () => subscription.unsubscribe();
  }, []);

  const handleSymbolCreation = async () => {
    const newSymbol: DreamSymbol = {
      id: crypto.randomUUID(),
      pattern: 'test-pattern',
      resonance: Math.random(),
      metadata: {
        origin: 'user-created',
        timestamp: Date.now(),
        quantumSignature: crypto.randomUUID()
      }
    };
    setActiveSymbol(newSymbol);
    await compiler.compileSymbol(newSymbol);
  };

  async function analyzeSymbols() {
    setIsAnalyzing(true);
    const prompt = `Analyze these quantum dream symbols in context: ${symbols.join(', ')}`;
    const result = await askGPT(prompt, {
      systemPrompt: 'You are a quantum archetypal analyst specializing in dream symbol interpretation.'
    });
    setAnalysis(result);
    updateQuantumState({ lastSymbolAnalysis: result });
    setIsAnalyzing(false);
  }

  return (
    <div className="dream-symbol-workbench">
      <div className="controls">
        <button onClick={handleSymbolCreation}>Create New Symbol</button>
        <div className="flex space-x-2">
          <input 
            type="text"
            placeholder="Add new symbol..."
            className="px-3 py-2 border rounded"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const input = e.currentTarget;
                setSymbols([...symbols, input.value]);
                input.value = '';
              }
            }}
          />
          <button 
            onClick={analyzeSymbols}
            disabled={isAnalyzing || symbols.length === 0}
            className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Symbols'}
          </button>
        </div>
        {compilationResult && (
          <div className="compilation-info">
            <h3>Compilation Result</h3>
            <p>Coherence: {compilationResult.quantumState.coherence.toFixed(3)}</p>
            <p>Entanglement: {compilationResult.quantumState.entanglement.toFixed(3)}</p>
            <p>Superposition: {compilationResult.quantumState.superposition.toFixed(3)}</p>
          </div>
        )}
      </div>
      
      <div className="visualization">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          {activeSymbol && <SymbolVisualizer symbol={activeSymbol} />}
        </Canvas>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 space-y-2">
          <h3 className="font-semibold">Active Symbols</h3>
          <div className="space-y-1">
            {symbols.map((symbol, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className="flex-1">{symbol}</span>
                <button 
                  onClick={() => setSymbols(symbols.filter((_, j) => j !== i))}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-span-2">
          <h3 className="font-semibold">Quantum Analysis</h3>
          <div className="p-4 bg-gray-50 rounded min-h-[200px]">
            {analysis || 'Add symbols and click Analyze to begin...'}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .dream-symbol-workbench {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 20px;
          height: 100vh;
          padding: 20px;
        }
        
        .controls {
          background: rgba(0, 0, 0, 0.1);
          padding: 20px;
          border-radius: 8px;
        }
        
        .visualization {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          overflow: hidden;
        }
        
        .compilation-info {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};
