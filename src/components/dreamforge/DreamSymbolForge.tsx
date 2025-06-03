
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { DreamSymbol } from '../../types/quantum';
import { 
  Sparkles, 
  Plus, 
  Search, 
  Zap, 
  Target, 
  Layers,
  RefreshCw,
  Eye
} from 'lucide-react';

interface SymbolConnection {
  from: string;
  to: string;
  strength: number;
  type: 'resonance' | 'opposition' | 'synthesis';
}

export const DreamSymbolForge: React.FC = () => {
  const [symbols, setSymbols] = useState<DreamSymbol[]>([]);
  const [connections, setConnections] = useState<SymbolConnection[]>([]);
  const [newSymbol, setNewSymbol] = useState({
    symbol: '',
    meaning: '',
    energy: 50
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
  const [forgeActive, setForgeActive] = useState(false);

  useEffect(() => {
    // Initialize with some predefined symbols
    const initialSymbols: DreamSymbol[] = [
      {
        id: crypto.randomUUID(),
        symbol: '⚕',
        meaning: 'Healing and Transformation',
        energy: 85,
        connections: [],
        resonance: 0.9,
        metadata: {
          origin: 'Ancient Medicine',
          timestamp: Date.now(),
          quantumSignature: crypto.randomUUID()
        }
      },
      {
        id: crypto.randomUUID(),
        symbol: '∞',
        meaning: 'Infinite Potential',
        energy: 95,
        connections: [],
        resonance: 0.95,
        metadata: {
          origin: 'Mathematical Mysticism',
          timestamp: Date.now(),
          quantumSignature: crypto.randomUUID()
        }
      },
      {
        id: crypto.randomUUID(),
        symbol: '🌙',
        meaning: 'Lunar Consciousness',
        energy: 70,
        connections: [],
        resonance: 0.8,
        metadata: {
          origin: 'Celestial Wisdom',
          timestamp: Date.now(),
          quantumSignature: crypto.randomUUID()
        }
      }
    ];
    setSymbols(initialSymbols);
  }, []);

  const createSymbol = () => {
    if (newSymbol.symbol && newSymbol.meaning) {
      const symbol: DreamSymbol = {
        id: crypto.randomUUID(),
        symbol: newSymbol.symbol,
        meaning: newSymbol.meaning,
        energy: newSymbol.energy,
        connections: [],
        resonance: newSymbol.energy / 100,
        metadata: {
          origin: 'User Created',
          timestamp: Date.now(),
          quantumSignature: crypto.randomUUID()
        }
      };
      
      setSymbols(prev => [...prev, symbol]);
      setNewSymbol({ symbol: '', meaning: '', energy: 50 });
    }
  };

  const forgeConnection = () => {
    if (selectedSymbols.length === 2) {
      const connection: SymbolConnection = {
        from: selectedSymbols[0],
        to: selectedSymbols[1],
        strength: Math.random(),
        type: ['resonance', 'opposition', 'synthesis'][Math.floor(Math.random() * 3)] as any
      };
      
      setConnections(prev => [...prev, connection]);
      
      // Update symbol connections
      setSymbols(prev => prev.map(symbol => {
        if (selectedSymbols.includes(symbol.id)) {
          return {
            ...symbol,
            connections: [...symbol.connections, ...selectedSymbols.filter(id => id !== symbol.id)]
          };
        }
        return symbol;
      }));
      
      setSelectedSymbols([]);
    }
  };

  const activateForge = () => {
    setForgeActive(true);
    // Simulate forging process
    setTimeout(() => {
      setSymbols(prev => prev.map(symbol => ({
        ...symbol,
        energy: Math.min(100, symbol.energy + Math.random() * 10),
        resonance: Math.min(1, symbol.resonance + Math.random() * 0.1)
      })));
      setForgeActive(false);
    }, 3000);
  };

  const toggleSymbolSelection = (symbolId: string) => {
    setSelectedSymbols(prev => 
      prev.includes(symbolId) 
        ? prev.filter(id => id !== symbolId)
        : [...prev, symbolId].slice(-2) // Only keep last 2
    );
  };

  const filteredSymbols = symbols.filter(symbol =>
    symbol.symbol.includes(searchTerm) || 
    symbol.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getConnectionType = (symbolId: string) => {
    const connection = connections.find(conn => 
      conn.from === symbolId || conn.to === symbolId
    );
    return connection?.type || 'none';
  };

  const getEnergyColor = (energy: number) => {
    if (energy >= 80) return 'text-green-500';
    if (energy >= 60) return 'text-yellow-500';
    if (energy >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="grid gap-6 p-6">
      {/* Header Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles className="mr-2 text-purple-500" size={24} />
              Dream Symbol Forge
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={activateForge} 
                disabled={forgeActive}
                className="flex items-center"
              >
                {forgeActive ? (
                  <RefreshCw className="mr-2 w-4 h-4 animate-spin" />
                ) : (
                  <Zap className="mr-2 w-4 h-4" />
                )}
                {forgeActive ? 'Forging...' : 'Activate Forge'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Symbol Creation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Symbol</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Enter symbol (emoji, unicode, etc.)"
              value={newSymbol.symbol}
              onChange={(e) => setNewSymbol(prev => ({ ...prev, symbol: e.target.value }))}
            />
            <Textarea
              placeholder="Symbol meaning and interpretation"
              value={newSymbol.meaning}
              onChange={(e) => setNewSymbol(prev => ({ ...prev, meaning: e.target.value }))}
            />
            <div>
              <label className="text-sm text-gray-600">Energy Level: {newSymbol.energy}</label>
              <input
                type="range"
                min="1"
                max="100"
                value={newSymbol.energy}
                onChange={(e) => setNewSymbol(prev => ({ ...prev, energy: parseInt(e.target.value) }))}
                className="w-full mt-1"
              />
            </div>
            <Button onClick={createSymbol} className="w-full">
              <Plus className="mr-2 w-4 h-4" />
              Create Symbol
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connection Forge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">
              Select 2 symbols to create a connection
            </div>
            <div className="space-y-2">
              {selectedSymbols.map((symbolId, index) => {
                const symbol = symbols.find(s => s.id === symbolId);
                return symbol ? (
                  <div key={symbolId} className="flex items-center p-2 bg-blue-50 rounded">
                    <span className="text-2xl mr-3">{symbol.symbol}</span>
                    <span className="flex-1">{symbol.meaning}</span>
                    <Badge>Selected {index + 1}</Badge>
                  </div>
                ) : null;
              })}
            </div>
            <Button 
              onClick={forgeConnection} 
              disabled={selectedSymbols.length !== 2}
              className="w-full"
            >
              <Target className="mr-2 w-4 h-4" />
              Forge Connection
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Symbol Library */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Symbol Library ({symbols.length})</span>
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search symbols..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSymbols.map(symbol => (
              <Card 
                key={symbol.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedSymbols.includes(symbol.id) 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : ''
                }`}
                onClick={() => toggleSymbolSelection(symbol.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{symbol.symbol}</span>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${getEnergyColor(symbol.energy)}`}>
                        {symbol.energy}% Energy
                      </div>
                      <div className="text-xs text-gray-500">
                        {(symbol.resonance * 100).toFixed(0)}% Resonance
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-medium text-sm mb-2">{symbol.meaning}</h3>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{symbol.metadata.origin}</span>
                    <div className="flex items-center space-x-2">
                      {symbol.connections.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <Layers className="w-3 h-3 mr-1" />
                          {symbol.connections.length}
                        </Badge>
                      )}
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          getConnectionType(symbol.id) === 'resonance' ? 'border-green-300' :
                          getConnectionType(symbol.id) === 'opposition' ? 'border-red-300' :
                          getConnectionType(symbol.id) === 'synthesis' ? 'border-purple-300' :
                          'border-gray-300'
                        }`}
                      >
                        {getConnectionType(symbol.id)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Connections Overview */}
      {connections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Connections ({connections.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {connections.map((connection, index) => {
                const fromSymbol = symbols.find(s => s.id === connection.from);
                const toSymbol = symbols.find(s => s.id === connection.to);
                
                return (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{fromSymbol?.symbol}</span>
                      <Badge 
                        className={
                          connection.type === 'resonance' ? 'bg-green-100 text-green-700' :
                          connection.type === 'opposition' ? 'bg-red-100 text-red-700' :
                          'bg-purple-100 text-purple-700'
                        }
                      >
                        {connection.type}
                      </Badge>
                      <span className="text-2xl">{toSymbol?.symbol}</span>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">
                        Strength: {(connection.strength * 100).toFixed(0)}%
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${connection.strength * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Forge Status */}
      {forgeActive && (
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-purple-500 mr-3 animate-spin" />
              <div>
                <h3 className="text-lg font-semibold text-purple-700">Symbol Forge Active</h3>
                <p className="text-purple-600">Enhancing symbol energies and resonances...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
