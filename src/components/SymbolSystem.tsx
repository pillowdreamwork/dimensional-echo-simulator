
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dimensionGlyphs } from "@/utils/quantum";
import { Layers3Icon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SymbolSystemProps {
  dimension: number;
  onSymbolActivate: (symbol: string) => void;
}

const SymbolSystem: React.FC<SymbolSystemProps> = ({
  dimension,
  onSymbolActivate
}) => {
  const { toast } = useToast();
  const [activeSymbols, setActiveSymbols] = useState<string[]>([]);
  const [connecting, setConnecting] = useState(false);
  
  // Define available symbols based on current dimension
  const getAvailableSymbols = () => {
    const symbols: string[] = [];
    
    // Add symbols from dimensionGlyphs array up to current dimension + 2
    for (let i = 0; i < Math.min(dimension + 2, dimensionGlyphs.length); i++) {
      symbols.push(dimensionGlyphs[i].symbol);
    }
    
    // Add some combinatorial symbols for higher dimensions
    if (dimension >= 4) {
      symbols.push("◈");
    }
    if (dimension >= 6) {
      symbols.push("⊛");
    }
    if (dimension >= 8) {
      symbols.push("⊿");
    }
    if (dimension >= 10) {
      symbols.push("⊕");
    }
    
    return symbols;
  };
  
  // Reset active symbols when dimension changes
  useEffect(() => {
    setActiveSymbols([]);
  }, [dimension]);
  
  // Handle symbol click
  const handleSymbolClick = (symbol: string) => {
    if (activeSymbols.includes(symbol)) {
      setActiveSymbols(activeSymbols.filter(s => s !== symbol));
    } else {
      // Limit to 3 active symbols
      if (activeSymbols.length < 3) {
        setActiveSymbols([...activeSymbols, symbol]);
      } else {
        toast({
          title: "Symbol Limit Reached",
          description: "You can only activate 3 symbols at once. Deactivate one first.",
          variant: "destructive",
        });
      }
    }
  };
  
  // Connect symbols to create a pattern
  const handleConnectSymbols = () => {
    if (activeSymbols.length < 2) {
      toast({
        title: "Not Enough Symbols",
        description: "You need at least 2 symbols to create a connection.",
        variant: "destructive",
      });
      return;
    }
    
    setConnecting(true);
    
    setTimeout(() => {
      const pattern = activeSymbols.join("");
      onSymbolActivate(pattern);
      
      toast({
        title: "Symbol Pattern Activated",
        description: `${activeSymbols.length} symbols connected: ${pattern}`,
      });
      
      setConnecting(false);
      setActiveSymbols([]);
    }, 1500);
  };
  
  return (
    <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Layers3Icon className="mr-2 text-quantum-teal" size={18} />
            Symbolic Language System
          </CardTitle>
          <Badge variant="outline" className="bg-quantum-teal/20 text-quantum-teal">
            {activeSymbols.length}/3
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Select symbols to create patterns and invoke dimensional effects.
          </p>
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-4">
          {getAvailableSymbols().map((symbol, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-12 text-xl ${
                activeSymbols.includes(symbol) 
                  ? "bg-quantum-teal/30 border-quantum-teal" 
                  : "hover:bg-quantum-teal/10"
              }`}
              onClick={() => handleSymbolClick(symbol)}
            >
              {symbol}
            </Button>
          ))}
        </div>
        
        {/* Active symbols display */}
        {activeSymbols.length > 0 && (
          <div className="flex justify-center mb-4">
            {activeSymbols.map((symbol, index) => (
              <div 
                key={index}
                className={`glyph-container w-12 h-12 bg-quantum-dark/30 border border-quantum-teal rounded-full mx-1 text-xl text-quantum-gold ${
                  connecting ? "animate-pulse-subtle" : ""
                }`}
              >
                {symbol}
                {index < activeSymbols.length - 1 && (
                  <div className="absolute -right-2 top-1/2 w-4 h-px bg-quantum-teal"></div>
                )}
              </div>
            ))}
          </div>
        )}
        
        <Button
          onClick={handleConnectSymbols}
          disabled={activeSymbols.length < 2 || connecting}
          className="w-full bg-quantum-teal hover:bg-quantum-teal/80"
        >
          {connecting ? "Connecting Symbols..." : "Connect Symbols"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SymbolSystem;
