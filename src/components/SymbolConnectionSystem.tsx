import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { analyzeSymbolPattern } from '../utils/quantum';
import { useToast } from "../hooks/use-toast";
import { Symbol, Connection } from '../types/glyph';

interface SymbolPattern {
  power: number;
  resonance: number;
  stability: number;
  description: string;
}

const SymbolConnectionSystem: React.FC = () => {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [hoveredSymbol, setHoveredSymbol] = useState<string | null>(null);
  const [isActivating, setIsActivating] = useState(false);
  const [patternAnalysis, setPatternAnalysis] = useState<SymbolPattern | null>(null);
  const [activationProgress, setActivationProgress] = useState(0);
  const { toast } = useToast();

  // Initialize available symbols
  useEffect(() => {
    const initialSymbols: Symbol[] = [
      { id: '1', glyph: '⊕', name: 'Confluence', x: 30, y: 30, connected: false },
      { id: '2', glyph: '⊗', name: 'Nexus', x: 70, y: 30, connected: false },
      { id: '3', glyph: '⊛', name: 'Radiance', x: 30, y: 70, connected: false },
      { id: '4', glyph: '⊙', name: 'Singularity', x: 70, y: 70, connected: false },
      { id: '5', glyph: '⊚', name: 'Vortex', x: 50, y: 50, connected: false },
      { id: '6', glyph: '⊝', name: 'Null', x: 20, y: 50, connected: false },
      { id: '7', glyph: '⌬', name: 'Drift', x: 80, y: 50, connected: false },
      { id: '8', glyph: '⍟', name: 'Echo', x: 50, y: 20, connected: false },
      { id: '9', glyph: '✸', name: 'Forge', x: 50, y: 80, connected: false }
    ];
    
    setSymbols(initialSymbols);
  }, []);

  const analyzeCurrentPattern = (): SymbolPattern => {
    const connectedSymbols = symbols.filter(s => s.connected);
    const analysis = analyzeSymbolPattern(connectedSymbols, connections);
    
    // Calculate pattern metrics
    const power = connections.reduce((sum, conn) => sum + conn.power, 0) / connections.length;
    
    return {
      power,
      resonance: analysis.resonance,
      stability: analysis.stability,
      description: analysis.description
    };
  };

  const handleSymbolClick = (id: string) => {
    if (isActivating) return;
    
    // If no symbol is selected, select this one
    if (!selectedSymbol) {
      setSelectedSymbol(id);
      return;
    }
    
    // If clicking on the same symbol, deselect it
    if (selectedSymbol === id) {
      setSelectedSymbol(null);
      return;
    }
    
    // Otherwise, create a connection between the two symbols
    const newConnection = {
      id: `${selectedSymbol}-${id}`,
      source: selectedSymbol,
      target: id,
      power: Math.random() * 0.5 + 0.5 // Random power between 0.5 and 1
    };
    
    // Check if connection already exists
    const connectionExists = connections.some(
      conn => (conn.source === selectedSymbol && conn.target === id) || 
              (conn.source === id && conn.target === selectedSymbol)
    );
    
    if (!connectionExists) {
      setConnections([...connections, newConnection]);
      
      // Mark symbols as connected
      setSymbols(symbols.map(s => 
        s.id === selectedSymbol || s.id === id 
          ? { ...s, connected: true } 
          : s
      ));
    }
    
    // Reset selection
    setSelectedSymbol(null);
  };

  const handleActivate = async () => {
    if (connections.length === 0) {
      toast({
        title: "No Connections",
        description: "Create connections between symbols first.",
        variant: "destructive",
      });
      return;
    }

    setIsActivating(true);
    const pattern = analyzeCurrentPattern();
    setPatternAnalysis(pattern);

    // Simulate activation process
    for (let i = 0; i <= 100; i += 10) {
      setActivationProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    if (pattern.stability >= 0.7) {
      toast({
        title: "Pattern Activated",
        description: `${pattern.description} (Power: ${(pattern.power * 100).toFixed(1)}%)`,
        variant: "default"
      });
    } else {
      toast({
        title: "Unstable Pattern",
        description: "The symbol pattern is unstable. Try a different configuration.",
        variant: "destructive"
      });
    }

    setActivationProgress(0);
    setIsActivating(false);
  };

  const handleReset = () => {
    setConnections([]);
    setSymbols(symbols.map(s => ({ ...s, connected: false })));
    setSelectedSymbol(null);
    setPatternAnalysis(null);
    setActivationProgress(0);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Symbol Connection System</span>
          {patternAnalysis && (
            <Badge variant={patternAnalysis.stability >= 0.7 ? "default" : "destructive"}>
              Stability: {(patternAnalysis.stability * 100).toFixed(1)}%
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="relative w-full h-[400px] border rounded-lg p-4">
            {/* Symbol grid */}
            {symbols.map((symbol) => (
              <div
                key={symbol.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer
                  ${symbol.connected ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'}
                  ${selectedSymbol === symbol.id ? 'ring-2 ring-blue-500' : ''}
                  ${hoveredSymbol === symbol.id ? 'bg-blue-50 dark:bg-blue-800' : ''}
                `}
                style={{ left: `${symbol.x}%`, top: `${symbol.y}%` }}
                onClick={() => handleSymbolClick(symbol.id)}
                onMouseEnter={() => setHoveredSymbol(symbol.id)}
                onMouseLeave={() => setHoveredSymbol(null)}
              >
                <span className="text-2xl">{symbol.glyph}</span>
              </div>
            ))}
            
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {connections.map((conn) => {
                const source = symbols.find(s => s.id === conn.source);
                const target = symbols.find(s => s.id === conn.target);
                if (!source || !target) return null;
                
                return (
                  <line
                    key={conn.id}
                    x1={`${source.x}%`}
                    y1={`${source.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeOpacity={conn.power}
                    className="text-blue-500"
                  />
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={isActivating}
            >
              Reset Pattern
            </Button>
            
            <Button
              onClick={handleActivate}
              disabled={connections.length === 0 || isActivating}
              className="relative"
            >
              {isActivating ? (
                <>
                  <div className="absolute inset-0 bg-blue-500 opacity-20" 
                       style={{ width: `${activationProgress}%` }} />
                  <span>Activating... {activationProgress}%</span>
                </>
              ) : (
                "Activate Pattern"
              )}
            </Button>
          </div>

          {patternAnalysis && (
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 className="font-semibold mb-2">Pattern Analysis</h3>
              <div className="space-y-2 text-sm">
                <p>Description: {patternAnalysis.description}</p>
                <p>Power: {(patternAnalysis.power * 100).toFixed(1)}%</p>
                <p>Resonance: {(patternAnalysis.resonance * 100).toFixed(1)}%</p>
                <p>Stability: {(patternAnalysis.stability * 100).toFixed(1)}%</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SymbolConnectionSystem;
