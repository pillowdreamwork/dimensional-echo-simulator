
import React, { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { useToast } from '../hooks/use-toast';
import { 
  analyzeSymbolPattern, 
  calculateUncertainty, 
  collapseQuantumState, 
  processRitual 
} from '../utils/quantum';
import { getModule } from '../lib/engine';

interface QuantumState {
  id: string;
  probability: number;
  description: string;
  effect: string;
}

const SymbolConnectionSystem = () => {
  const { toast } = useToast();
  const [activeSymbols, setActiveSymbols] = useState<string[]>([]);
  const [connectedPattern, setConnectedPattern] = useState<string>('');
  const [quantumStates, setQuantumStates] = useState<QuantumState[]>([]);
  const [collapsedState, setCollapsedState] = useState<QuantumState | null>(null);
  const [uncertainty, setUncertainty] = useState<number>(0.5);
  
  // Get required modules
  const vectorAlchemy = getModule('vectorAlchemy');
  const uncertaintyEngine = getModule('uncertainty');
  const iuri = getModule('iuri');
  
  // Available symbols based on dimensions
  const dimensionalSymbols: {[key: number]: string[]} = {
    1: ['—'],
    2: ['┼', '—'],
    3: ['⬠', '┼', '—'],
    4: ['⧫', '⬠', '┼', '—'],
    5: ['⎔', '⧫', '⬠', '┼', '—'],
    6: ['⌬', '⎔', '⧫', '⬠', '┼'],
    7: ['⍟', '⌬', '⎔', '⧫', '⬠'],
    8: ['⎈', '⍟', '⌬', '⎔', '⧫'],
    9: ['⏣', '⎈', '⍟', '⌬', '⎔'],
    10: ['⏧', '⏣', '⎈', '⍟', '⌬'],
    11: ['☉', '⏧', '⏣', '⎈', '⍟']
  };
  
  // Get current dimension
  const simulationCore = getModule('simulationCore');
  const currentDimension = simulationCore?.getCurrentState()?.dimensions?.current || 1;
  const availableSymbols = dimensionalSymbols[currentDimension] || ['—'];
  
  // Initialize quantum states
  useEffect(() => {
    // Generate some quantum states based on current dimension
    const states: QuantumState[] = [
      {
        id: `state-${currentDimension}-1`,
        probability: 0.4,
        description: `Harmonious ${currentDimension}D resonance`,
        effect: `Creates stable flow through ${currentDimension}D space`
      },
      {
        id: `state-${currentDimension}-2`,
        probability: 0.3,
        description: `Unstable ${currentDimension}D flux`,
        effect: `Generates chaotic energy patterns across dimensions`
      },
      {
        id: `state-${currentDimension}-3`,
        probability: 0.2,
        description: `Transcendent ${currentDimension}D pathway`,
        effect: `Opens connection to higher dimensional states`
      },
      {
        id: `state-${currentDimension}-4`,
        probability: 0.1,
        description: `Quantum ${currentDimension}D entanglement`,
        effect: `Links multiple dimensional realities simultaneously`
      }
    ];
    
    setQuantumStates(states);
    
    // Update uncertainty based on dimension
    const newUncertainty = calculateUncertainty(currentDimension, 0.8);
    setUncertainty(newUncertainty);
    
    // Reset when dimension changes
    setActiveSymbols([]);
    setConnectedPattern('');
    setCollapsedState(null);
  }, [currentDimension]);
  
  // Add symbol to active collection
  const addSymbol = (symbol: string) => {
    if (activeSymbols.length >= 5) {
      toast({
        title: "Symbol Limit Reached",
        description: "Cannot connect more than 5 symbols at once.",
        variant: "destructive"
      });
      return;
    }
    
    setActiveSymbols(prev => [...prev, symbol]);
  };
  
  // Clear active symbols
  const clearSymbols = () => {
    setActiveSymbols([]);
    setConnectedPattern('');
  };
  
  // Connect symbols to form a pattern
  const connectSymbols = () => {
    if (activeSymbols.length < 2) {
      toast({
        title: "Insufficient Symbols",
        description: "Need at least 2 symbols to form a connection.",
        variant: "destructive"
      });
      return;
    }
    
    const pattern = activeSymbols.join('');
    setConnectedPattern(pattern);
    
    // Analyze the pattern
    const analysis = analyzeSymbolPattern(pattern);
    
    toast({
      title: "Symbols Connected",
      description: analysis.effect,
      duration: 4000
    });
    
    // If using vector alchemy engine
    if (vectorAlchemy) {
      const field = pattern.split('').map(char => char.charCodeAt(0) % 10);
      vectorAlchemy.manipulateVectorField({
        fieldName: "symbolic",
        transformation: "superposition",
        parameters: {
          secondField: "quantum",
          weight: analysis.power / 100,
          target: "result"
        }
      });
    }
  };
  
  // Collapse quantum state
  const collapseState = () => {
    if (!quantumStates.length) return;
    
    // If we have an uncertainty engine, use it
    if (uncertaintyEngine) {
      const outcome = uncertaintyEngine.collapseWaveFunction({
        outcomes: quantumStates.map(state => ({
          value: state.id,
          probability: state.probability
        }))
      });
      
      const found = quantumStates.find(state => state.id === outcome);
      if (found) {
        setCollapsedState(found);
        
        toast({
          title: "Quantum State Collapsed",
          description: found.description,
          duration: 3000
        });
        
        return;
      }
    }
    
    // Fallback to local function if engine not available
    const observer = Math.random(); // Random observer influence
    const collapsed = collapseQuantumState(quantumStates, observer);
    setCollapsedState(collapsed);
    
    toast({
      title: "Quantum State Collapsed",
      description: collapsed.description,
      duration: 3000
    });
  };
  
  // Invoke ritual if pattern matches a glyph
  const invokeRitual = () => {
    if (!connectedPattern) {
      toast({
        title: "No Pattern Available",
        description: "Connect symbols first to create a ritual pattern.",
        variant: "destructive"
      });
      return;
    }
    
    // If IURI module is available
    if (iuri) {
      // Find a matching glyph
      const availableGlyphs = iuri.getAvailableGlyphs();
      const matchingGlyph = availableGlyphs.find(g => connectedPattern.includes(g.glyph));
      
      if (matchingGlyph) {
        const result = iuri.invokeRitual({
          glyph: matchingGlyph.glyph,
          intensity: 50 + Math.random() * 50,
          intention: `Pattern: ${connectedPattern}`
        });
        
        toast({
          title: `Ritual: ${matchingGlyph.name}`,
          description: result.effects[0] || "Ritual invoked successfully",
          duration: 4000
        });
        return;
      }
    }
    
    // Fallback to local function if no IURI or matching glyph
    const firstSymbol = connectedPattern[0] || '⎔';
    const result = processRitual(firstSymbol, activeSymbols.length * 20);
    
    toast({
      title: "Ritual Invoked",
      description: result.outcome,
      duration: 4000
    });
  };
  
  return (
    <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
      <CardContent className="p-4">
        <div className="flex items-center mb-3 justify-between">
          <h3 className="text-sm font-medium text-quantum-gold">Symbol Connections</h3>
          <Badge variant="outline" className="bg-quantum-gold/10 text-quantum-gold text-xs">
            {currentDimension}D Active
          </Badge>
        </div>
        
        {/* Available Symbols */}
        <div className="mb-4">
          <h4 className="text-xs text-muted-foreground mb-2">Available Symbols</h4>
          <div className="flex flex-wrap gap-2">
            {availableSymbols.map((symbol, idx) => (
              <Button 
                key={idx}
                variant="ghost" 
                size="sm"
                className="text-lg h-10 w-10 bg-quantum-dark/40 hover:bg-quantum-gold/30 hover:text-quantum-gold"
                onClick={() => addSymbol(symbol)}
              >
                {symbol}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Active Symbols */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs text-muted-foreground">Active Pattern</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearSymbols}
              className="h-6 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          </div>
          <div className="border border-dashed border-muted rounded-md p-3 min-h-10 flex items-center justify-center">
            {activeSymbols.length > 0 ? (
              <div className="flex gap-1 text-lg text-quantum-purple">
                {activeSymbols.map((symbol, idx) => (
                  <span key={idx}>{symbol}</span>
                ))}
              </div>
            ) : (
              <span className="text-xs text-muted-foreground italic">No symbols selected</span>
            )}
          </div>
        </div>
        
        {/* Connection Actions */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button 
            variant="outline"
            size="sm"
            onClick={connectSymbols}
            disabled={activeSymbols.length < 2}
            className="bg-quantum-purple/20 border-quantum-purple/40 text-quantum-purple hover:bg-quantum-purple/30"
          >
            Connect Symbols
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={invokeRitual}
            disabled={!connectedPattern}
            className="bg-quantum-gold/20 border-quantum-gold/40 text-quantum-gold hover:bg-quantum-gold/30"
          >
            Invoke Ritual
          </Button>
        </div>
        
        <Separator className="my-3" />
        
        {/* Quantum State */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs text-muted-foreground">Quantum State</h4>
            <Button 
              variant="ghost"
              size="sm"
              onClick={collapseState}
              className="h-6 text-xs text-muted-foreground hover:text-foreground"
            >
              Collapse
            </Button>
          </div>
          {collapsedState ? (
            <div className="text-sm space-y-1">
              <p className="text-quantum-blue">{collapsedState.description}</p>
              <p className="text-xs text-muted-foreground">{collapsedState.effect}</p>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground italic">
              Quantum state uncollapsed (uncertainty: {Math.round(uncertainty * 100)}%)
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SymbolConnectionSystem;
