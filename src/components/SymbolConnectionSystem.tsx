import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { analyzeSymbolPattern } from '../utils/quantum';
import { useToast } from "../hooks/use-toast";

// Define Symbol type
type Symbol = {
  id: string;
  glyph: string;
  name: string;
  x: number;
  y: number;
  connected: boolean;
};

// Define Connection type
type Connection = {
  id: string;
  source: string;
  target: string;
  power: number;
};

const SymbolConnectionSystem = () => {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [hoveredSymbol, setHoveredSymbol] = useState<string | null>(null);
  const [isActivating, setIsActivating] = useState(false);
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

  const handleActivate = () => {
    if (connections.length === 0) {
      toast({
        title: "No Connections",
        description: "Create connections between symbols first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsActivating(true);
    
    // Sort connections by highest power first
    const sortedConnections = [...connections].sort((a, b) => b.power - a.power);
    
    // Create pattern from connected symbols
    const pattern = sortedConnections.map(conn => {
      const sourceSymbol = symbols.find(s => s.id === conn.source);
      const targetSymbol = symbols.find(s => s.id === conn.target);
      return sourceSymbol?.glyph + targetSymbol?.glyph;
    }).join('');
    
    setTimeout(() => {
      // Analyze the pattern
      const result = analyzeSymbolPattern(pattern);
      
      // Extract effects, providing fallbacks if properties don't exist
      const effect = result.effect || "The symbols resonate with each other.";
      const dimensionalEffect = 
        'dimensionalEffect' in result ? result.dimensionalEffect : 
        "The dimensional membrane fluctuates slightly.";
      
      // Show results
      toast({
        title: "Symbol Pattern Activated",
        description: effect,
        duration: 4000,
      });
      
      // Show dimensional effect toast after a delay
      setTimeout(() => {
        toast({
          title: "Dimensional Effect",
          description: dimensionalEffect || "The fabric of reality shifts subtly.",
          duration: 3000,
        });
      }, 1000);
      
      setIsActivating(false);
    }, 2000);
  };

  const handleClearConnections = () => {
    setConnections([]);
    setSymbols(symbols.map(s => ({ ...s, connected: false })));
    setSelectedSymbol(null);
  };

  return (
    <Card className="symbol-connection-system bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-quantum-gold">Symbol Connection System</CardTitle>
          <Badge variant="outline" className="bg-quantum-gold/20 text-quantum-gold">
            {connections.length} Connections
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Connect quantum symbols to create dimensional effects and reality shifts.
        </p>
        
        {/* Symbol connection canvas */}
        <div className="relative w-full h-64 border border-quantum-gold/30 rounded-md mb-4 overflow-hidden">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connections.map(conn => {
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
                  stroke={`rgba(255, 215, 0, ${conn.power})`}
                  strokeWidth="2"
                  strokeDasharray={isActivating ? "4" : ""}
                  className={isActivating ? "animate-pulse" : ""}
                />
              );
            })}
            
            {/* Line from selected symbol to hovered symbol */}
            {selectedSymbol && hoveredSymbol && selectedSymbol !== hoveredSymbol && (
              (() => {
                const source = symbols.find(s => s.id === selectedSymbol);
                const target = symbols.find(s => s.id === hoveredSymbol);
                
                if (!source || !target) return null;
                
                return (
                  <line
                    x1={`${source.x}%`}
                    y1={`${source.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke="rgba(255, 215, 0, 0.3)"
                    strokeWidth="2"
                    strokeDasharray="4"
                  />
                );
              })()
            )}
          </svg>
          
          {/* Symbols */}
          {symbols.map(symbol => (
            <div
              key={symbol.id}
              className={`absolute w-10 h-10 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full cursor-pointer transition-all ${
                symbol.connected ? 'bg-quantum-gold/30' : 'bg-quantum-gold/10'
              } ${
                selectedSymbol === symbol.id ? 'ring-2 ring-quantum-gold' : ''
              } ${
                hoveredSymbol === symbol.id ? 'bg-quantum-gold/20' : ''
              } ${
                isActivating && symbol.connected ? 'animate-pulse' : ''
              }`}
              style={{
                left: `${symbol.x}%`,
                top: `${symbol.y}%`
              }}
              onClick={() => handleSymbolClick(symbol.id)}
              onMouseEnter={() => setHoveredSymbol(symbol.id)}
              onMouseLeave={() => setHoveredSymbol(null)}
            >
              <span className="text-xl text-quantum-gold">{symbol.glyph}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground">
              {selectedSymbol 
                ? `Select another symbol to connect` 
                : `Select a symbol to begin`}
            </p>
          </div>
          <div>
            <p className="text-xs text-quantum-gold">
              {symbols.find(s => s.id === hoveredSymbol)?.name || '\u00A0'}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            onClick={handleActivate}
            disabled={connections.length === 0 || isActivating}
            className="flex-1 bg-quantum-gold hover:bg-quantum-gold/80 text-black"
          >
            {isActivating ? "Activating..." : "Activate Pattern"}
          </Button>
          
          <Button
            onClick={handleClearConnections}
            disabled={connections.length === 0 || isActivating}
            variant="outline"
            className="border-quantum-gold/50 text-quantum-gold hover:bg-quantum-gold/10"
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SymbolConnectionSystem;
