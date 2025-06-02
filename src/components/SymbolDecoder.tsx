
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, Sparkles, Zap } from "lucide-react";
import { Symbol, PatternAnalysis } from "@/types/quantum";

interface SymbolDecoderProps {
  symbols?: Symbol[];
  onAnalyze?: (symbols: Symbol[]) => Promise<PatternAnalysis>;
}

const SymbolDecoder: React.FC<SymbolDecoderProps> = ({ 
  symbols = [], 
  onAnalyze 
}) => {
  const [inputSymbol, setInputSymbol] = useState('');
  const [activeSymbols, setActiveSymbols] = useState<Symbol[]>(symbols);
  const [analysis, setAnalysis] = useState<PatternAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const addSymbol = () => {
    if (inputSymbol.trim()) {
      const newSymbol: Symbol = {
        id: `symbol-${Date.now()}`,
        symbol: inputSymbol.trim(),
        meaning: `Meaning for ${inputSymbol}`,
        energy: Math.random() * 100,
        connections: []
      };
      setActiveSymbols([...activeSymbols, newSymbol]);
      setInputSymbol('');
    }
  };

  const analyzePattern = async () => {
    if (activeSymbols.length === 0 || !onAnalyze) return;
    
    setIsAnalyzing(true);
    try {
      const result = await onAnalyze(activeSymbols);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeSymbol = (id: string) => {
    setActiveSymbols(activeSymbols.filter(s => s.id !== id));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Symbol Decoder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Symbol Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Enter a symbol or pattern..."
            value={inputSymbol}
            onChange={(e) => setInputSymbol(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSymbol()}
          />
          <Button onClick={addSymbol} disabled={!inputSymbol.trim()}>
            Add Symbol
          </Button>
        </div>

        {/* Active Symbols */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Active Symbols</h3>
          <div className="flex flex-wrap gap-2">
            {activeSymbols.map(symbol => (
              <Badge
                key={symbol.id}
                variant="outline"
                className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                onClick={() => removeSymbol(symbol.id)}
              >
                {symbol.symbol} ×
              </Badge>
            ))}
          </div>
        </div>

        {/* Analysis Controls */}
        <div className="flex justify-between items-center">
          <Button
            onClick={analyzePattern}
            disabled={activeSymbols.length === 0 || isAnalyzing}
            className="flex items-center gap-2"
          >
            {isAnalyzing ? (
              <Sparkles className="h-4 w-4 animate-spin" />
            ) : (
              <Zap className="h-4 w-4" />
            )}
            {isAnalyzing ? 'Analyzing...' : 'Analyze Pattern'}
          </Button>
          
          <div className="text-sm text-muted-foreground">
            {activeSymbols.length} symbols loaded
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <Card>
            <CardHeader>
              <CardTitle>Pattern Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Pattern</h4>
                    <p className="text-sm text-muted-foreground">{analysis.pattern}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Interpretation</h4>
                    <p className="text-sm">{analysis.interpretation}</p>
                  </div>

                  {analysis.insight && (
                    <div>
                      <h4 className="font-semibold">Insight</h4>
                      <p className="text-sm text-blue-600">{analysis.insight}</p>
                    </div>
                  )}

                  {analysis.effect && (
                    <div>
                      <h4 className="font-semibold">Effect</h4>
                      <p className="text-sm text-purple-600">{analysis.effect}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold">Significance Level</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${analysis.significance * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {(analysis.significance * 100).toFixed(1)}%
                    </span>
                  </div>

                  {analysis.effect && (
                    <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h4 className="font-semibold text-purple-700 dark:text-purple-300">
                        Quantum Effect
                      </h4>
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        {analysis.effect}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default SymbolDecoder;
