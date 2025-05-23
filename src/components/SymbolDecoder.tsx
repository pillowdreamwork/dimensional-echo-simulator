
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { analyzeSymbolPattern } from '../utils/quantum';

interface Symbol {
  glyph: string;
  name: string;
  meaning: string;
  dimension: number;
}

interface DecodedPattern {
  pattern: string[];
  interpretation: string;
  dimensionalEffect: string;
  resonance: number; // 0-100
}

interface SymbolDecoderProps {
  currentDimension: number;
  onSymbolConnect?: (pattern: string[], interpretation: string) => void;
}

const SymbolDecoder: React.FC<SymbolDecoderProps> = ({
  currentDimension,
  onSymbolConnect
}) => {
  const [selectedSymbols, setSelectedSymbols] = useState<Symbol[]>([]);
  const [decodedPattern, setDecodedPattern] = useState<DecodedPattern | null>(null);
  const { toast } = useToast();
  
  // Symbol library - would come from quantum utils in production
  const symbolLibrary: Symbol[] = [
    { glyph: "⏣", name: "Quantum Flow", meaning: "Continuous movement between states", dimension: 1 },
    { glyph: "⍟", name: "Harmonic Point", meaning: "Balance point between dimensions", dimension: 2 },
    { glyph: "⌬", name: "Void Prism", meaning: "Container of potential realities", dimension: 3 },
    { glyph: "⎈", name: "Temporal Loop", meaning: "Circular time patterns", dimension: 4 },
    { glyph: "☉", name: "Inner Sun", meaning: "Core consciousness center", dimension: 5 },
    { glyph: "⧫", name: "Crystal Mind", meaning: "Clarity of perception", dimension: 6 },
    { glyph: "⌘", name: "Command Key", meaning: "Intentional reality creation", dimension: 7 },
    { glyph: "∞", name: "Eternal Return", meaning: "Cyclic nature of existence", dimension: 8 },
    { glyph: "⊗", name: "Soul Circle", meaning: "Inner connection to all beings", dimension: 9 },
    { glyph: "⊛", name: "Star Bridge", meaning: "Connection between worlds", dimension: 10 },
    { glyph: "⊕", name: "Unity Point", meaning: "Oneness of all dimensions", dimension: 11 }
  ];
  
  // Filter symbols based on current dimension (can see current and lower dimensions)
  const availableSymbols = symbolLibrary.filter(s => s.dimension <= currentDimension);
  
  const handleSelectSymbol = (symbol: Symbol) => {
    // Limit to 3 symbols at a time for simplicity
    if (selectedSymbols.length >= 3 && !selectedSymbols.find(s => s.glyph === symbol.glyph)) {
      toast({
        title: "Symbol Limit Reached",
        description: "You can connect up to 3 symbols at once. Remove a symbol first.",
        duration: 3000,
      });
      return;
    }
    
    // Toggle selection
    if (selectedSymbols.find(s => s.glyph === symbol.glyph)) {
      setSelectedSymbols(selectedSymbols.filter(s => s.glyph !== symbol.glyph));
      setDecodedPattern(null);
    } else {
      setSelectedSymbols([...selectedSymbols, symbol]);
    }
  };
  
  const handleDecodePattern = () => {
    if (selectedSymbols.length < 2) {
      toast({
        title: "More Symbols Needed",
        description: "Please select at least 2 symbols to form a meaningful pattern",
        duration: 3000,
      });
      return;
    }
    
    // Create symbol pattern string
    const pattern = selectedSymbols.map(s => s.glyph);
    
    // Use the quantum utility to analyze the pattern
    const analysis = analyzeSymbolPattern(pattern.join(''), currentDimension);
    
    // Create the interpretation based on selected symbols and analysis
    const meanings = selectedSymbols.map(s => s.meaning.toLowerCase());
    const meaningText = meanings.join(', ');
    
    const interpretation = `This pattern connects ${meaningText}, suggesting ${analysis.insight}`;
    
    // Create decoded pattern result
    const decoded: DecodedPattern = {
      pattern,
      interpretation,
      dimensionalEffect: analysis.effect,
      resonance: Math.min(100, Math.floor(analysis.resonance * 100))
    };
    
    setDecodedPattern(decoded);
    
    // Notify parent component if callback exists
    if (onSymbolConnect) {
      onSymbolConnect(pattern, interpretation);
    }
    
    toast({
      title: "Pattern Decoded",
      description: analysis.effect,
      duration: 4000,
    });
  };
  
  const handleClearSymbols = () => {
    setSelectedSymbols([]);
    setDecodedPattern(null);
  };
  
  return (
    <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <StarIcon className="mr-2 text-quantum-gold" size={18} />
            Symbol Decoder
          </CardTitle>
          <Badge variant="outline" className="bg-quantum-gold/20 text-quantum-gold">
            {currentDimension}D Vision
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground mb-2">
          Connect dimensional symbols to decode their combined meaning and effects
        </p>
        
        {/* Symbol Selection Grid */}
        <div>
          <h3 className="text-sm font-medium mb-2">Available Symbols</h3>
          <div className="grid grid-cols-5 gap-2">
            {availableSymbols.map((symbol) => (
              <div
                key={symbol.glyph}
                className={`h-12 flex items-center justify-center border rounded-md cursor-pointer text-xl hover:bg-quantum-gold/10 ${
                  selectedSymbols.find(s => s.glyph === symbol.glyph)
                    ? 'bg-quantum-gold/30 border-quantum-gold text-quantum-gold'
                    : 'border-quantum-gold/30 text-quantum-gold/70'
                }`}
                onClick={() => handleSelectSymbol(symbol)}
                title={`${symbol.name}: ${symbol.meaning}`}
              >
                {symbol.glyph}
              </div>
            ))}
          </div>
        </div>
        
        {/* Selected Symbols */}
        {selectedSymbols.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Connected Pattern</h3>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 flex items-center justify-center h-16 bg-quantum-dark/50 border border-quantum-gold/30 rounded-md">
                {selectedSymbols.map((symbol, index) => (
                  <div key={index} className="text-2xl text-quantum-gold mx-1">
                    {symbol.glyph}
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-quantum-gold text-quantum-gold hover:bg-quantum-gold/20"
                  onClick={handleDecodePattern}
                  disabled={selectedSymbols.length < 2}
                >
                  Decode
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-muted-foreground/30 hover:bg-muted/30"
                  onClick={handleClearSymbols}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Decoded Pattern */}
        {decodedPattern && (
          <div className="border border-quantum-gold/30 rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-quantum-gold">Decoded Pattern</h3>
              <Badge 
                variant="outline" 
                className={`
                  ${decodedPattern.resonance >= 80 ? 'bg-quantum-gold/30 text-quantum-gold' : 
                    decodedPattern.resonance >= 50 ? 'bg-quantum-teal/30 text-quantum-teal' : 
                    'bg-quantum-blue/30 text-quantum-blue'}
                `}
              >
                {decodedPattern.resonance}% Resonance
              </Badge>
            </div>
            
            <p className="text-sm mb-3">{decodedPattern.interpretation}</p>
            
            <div className="text-xs text-muted-foreground">
              <span className="text-quantum-gold">Dimensional Effect:</span> {decodedPattern.dimensionalEffect}
            </div>
            
            <div className="mt-3 text-xs flex items-center gap-1">
              <span className="text-muted-foreground">Symbol Names:</span>
              {selectedSymbols.map((symbol, i) => (
                <span key={i} className="text-quantum-purple">
                  {symbol.name}{i < selectedSymbols.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SymbolDecoder;
