
import React, { useState } from 'react';
import { Symbol, PatternAnalysis } from '@/types/quantum';

interface SymbolDecoderProps {
  onSymbolConnect: (pattern: string[], interpretation: string) => void;
}

export const SymbolDecoder: React.FC<SymbolDecoderProps> = ({ onSymbolConnect }) => {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [analysis, setAnalysis] = useState<PatternAnalysis | null>(null);

  const analyzePattern = () => {
    const pattern = symbols.map(s => s.glyph);
    const mockAnalysis: PatternAnalysis = {
      pattern,
      confidence: Math.random(),
      meaning: 'Quantum entanglement detected',
      dimensional: Math.floor(Math.random() * 11) + 1
    };
    setAnalysis(mockAnalysis);
    onSymbolConnect(pattern, mockAnalysis.meaning);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-4">Symbol Decoder</h3>
      
      <button 
        onClick={analyzePattern}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Analyze Pattern
      </button>

      {analysis && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <p>Pattern: {analysis.pattern.join(' - ')}</p>
          <p>Confidence: {(analysis.confidence * 100).toFixed(1)}%</p>
          <p>Meaning: {analysis.meaning}</p>
          <p>Dimensional Level: {analysis.dimensional}</p>
        </div>
      )}
    </div>
  );
};

export default SymbolDecoder;
