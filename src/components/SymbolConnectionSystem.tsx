
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { toast } from "@/hooks/use-toast";
import { analyzeSymbolPattern } from '../utils/quantum';

type Symbol = {
  id: number;
  glyph: string;
  position: { x: number; y: number };
  connections: number[];
};

const SymbolConnectionSystem = () => {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [connecting, setConnecting] = useState<number | null>(null);
  const [activeSymbols, setActiveSymbols] = useState<number[]>([]);
  const [connectionMode, setConnectionMode] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Available glyphs
  const availableGlyphs = ["⊕", "⊗", "⊛", "⊙", "⊚", "⊝", "⌬", "✸", "⍟"];

  // Initialize symbols
  useEffect(() => {
    generateSymbols();
  }, []);

  // Generate random symbols
  const generateSymbols = () => {
    const newSymbols: Symbol[] = [];
    for (let i = 0; i < 7; i++) {
      newSymbols.push({
        id: i,
        glyph: availableGlyphs[Math.floor(Math.random() * availableGlyphs.length)],
        position: {
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        },
        connections: []
      });
    }
    setSymbols(newSymbols);
    setActiveSymbols([]);
  };

  // Handle symbol click
  const handleSymbolClick = (id: number) => {
    if (connectionMode) {
      if (connecting === null) {
        // Start connection
        setConnecting(id);
      } else if (connecting !== id) {
        // Complete connection if not already connected
        setSymbols(prev => prev.map(s => {
          if (s.id === connecting && !s.connections.includes(id)) {
            return { ...s, connections: [...s.connections, id] };
          }
          if (s.id === id && !s.connections.includes(connecting)) {
            return { ...s, connections: [...s.connections, connecting] };
          }
          return s;
        }));
        
        // Add both to active symbols
        if (!activeSymbols.includes(connecting)) {
          setActiveSymbols(prev => [...prev, connecting]);
        }
        if (!activeSymbols.includes(id)) {
          setActiveSymbols(prev => [...prev, id]);
        }
        
        // Check pattern after connection
        const pattern = symbols.filter(s => activeSymbols.includes(s.id) || s.id === connecting || s.id === id)
          .map(s => s.glyph).join('');
        
        const analysis = analyzeSymbolPattern(pattern);
        
        toast({
          title: "Symbol Connection",
          description: analysis.effect,
          duration: 3000,
        });
        
        if (analysis.dimensionalEffect) {
          setTimeout(() => {
            toast({
              title: "Dimensional Effect",
              description: analysis.dimensionalEffect,
              duration: 3000,
            });
          }, 1500);
        }
        
        // Reset connecting state
        setConnecting(null);
      } else {
        // Clicked same symbol, cancel connection
        setConnecting(null);
      }
    } else {
      // Toggle active state when not in connection mode
      if (activeSymbols.includes(id)) {
        setActiveSymbols(prev => prev.filter(sid => sid !== id));
      } else {
        setActiveSymbols(prev => [...prev, id]);
        
        // If we have multiple active symbols, analyze the pattern
        if (activeSymbols.length > 0) {
          const newActiveSet = [...activeSymbols, id];
          const pattern = symbols
            .filter(s => newActiveSet.includes(s.id))
            .map(s => s.glyph)
            .join('');
          
          const analysis = analyzeSymbolPattern(pattern);
          
          if (analysis.effect) {
            toast({
              title: "Symbol Pattern",
              description: analysis.effect,
              duration: 3000,
            });
          }
        }
      }
    }
  };

  // Reset connections
  const resetConnections = () => {
    setSymbols(prev => prev.map(s => ({ ...s, connections: [] })));
    setActiveSymbols([]);
    setConnecting(null);
    setConnectionMode(false);
    
    toast({
      title: "Symbol Grid Reset",
      description: "All connections have been cleared.",
      duration: 2000,
    });
  };

  // Toggle connection mode
  const toggleConnectionMode = () => {
    setConnectionMode(!connectionMode);
    setConnecting(null);
  };

  // Generate new symbols
  const handleRegenerateSymbols = () => {
    generateSymbols();
    
    toast({
      title: "Symbols Regenerated",
      description: "New symbol grid has been created.",
      duration: 2000,
    });
  };

  return (
    <Card className="symbol-connection-system bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-quantum-purple">Symbol Connection System</CardTitle>
          <Badge variant="outline" className="bg-quantum-purple/20 text-quantum-purple">
            {connectionMode ? "Connection Mode" : "Selection Mode"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="relative h-60 border border-dashed border-quantum-purple/30 rounded-md mb-4">
          {symbols.map((symbol) => (
            <React.Fragment key={symbol.id}>
              {/* Draw connections */}
              {connectionMode && symbol.connections.map(targetId => {
                const target = symbols.find(s => s.id === targetId);
                if (!target) return null;
                
                return (
                  <svg 
                    key={`${symbol.id}-${targetId}`} 
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 1 }}
                  >
                    <line
                      x1={`${symbol.position.x}%`}
                      y1={`${symbol.position.y}%`}
                      x2={`${target.position.x}%`}
                      y2={`${target.position.y}%`}
                      stroke="#9b87f5"
                      strokeWidth="2"
                      strokeOpacity="0.6"
                    />
                  </svg>
                );
              })}
              
              {/* Symbol */}
              <div 
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                  activeSymbols.includes(symbol.id) 
                    ? 'bg-quantum-purple text-white' 
                    : connecting === symbol.id
                    ? 'bg-quantum-gold text-black'
                    : 'bg-quantum-dark border border-quantum-purple/50 text-quantum-purple/80'
                }`}
                style={{ 
                  left: `${symbol.position.x}%`, 
                  top: `${symbol.position.y}%`,
                  zIndex: 2
                }}
                onClick={() => handleSymbolClick(symbol.id)}
              >
                <span className="text-lg">{symbol.glyph}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            className={connectionMode ? "bg-quantum-purple/20 border-quantum-purple" : ""}
            onClick={toggleConnectionMode}
          >
            {connectionMode ? "Exit Connection Mode" : "Connect Symbols"}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={resetConnections}
          >
            Clear
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleRegenerateSymbols}
          >
            Regenerate
          </Button>
        </div>
        
        {activeSymbols.length > 0 && (
          <div className="mt-4 p-2 border border-quantum-purple/30 rounded-md">
            <p className="text-sm text-muted-foreground">Active Pattern:</p>
            <div className="flex items-center space-x-2 mt-1">
              {activeSymbols.map(id => {
                const symbol = symbols.find(s => s.id === id);
                if (!symbol) return null;
                
                return (
                  <span 
                    key={id}
                    className="text-lg text-quantum-purple"
                  >
                    {symbol.glyph}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SymbolConnectionSystem;
