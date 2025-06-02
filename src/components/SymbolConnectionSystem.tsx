import React, { useState, useEffect } from 'react';

// Define types for symbols and connections
interface Symbol {
  id: string;
  glyph: string;
  name: string;
  x: number;
  y: number;
  connected: boolean;
}

interface Connection {
  id: string;
  source: string;
  target: string;
  power: number;
}

interface SymbolPattern {
  power: number;
  resonance: number;
  stability: number;
  description: string;
}

// Placeholder for toast notifications
const useToast = () => ({
  toast: (msg: string) => alert(msg),
});

// Fetch pattern analysis from backend AI
async function fetchAIPatternAnalysis(symbols: Symbol[], connections: Connection[]): Promise<SymbolPattern> {
  const response = await fetch('/api/analyze-pattern', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symbols, connections }),
  });
  if (!response.ok) throw new Error('AI analysis failed');
  return response.json();
}

const SymbolConnectionSystem: React.FC = () => {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [hoveredSymbol, setHoveredSymbol] = useState<string | null>(null);
  const [isActivating, setIsActivating] = useState(false);
  const [patternAnalysis, setPatternAnalysis] = useState<SymbolPattern | null>(null);
  const [activationProgress, setActivationProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Initialize available symbols on mount
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

  // Handle clicking on a symbol
  const handleSymbolClick = (id: string) => {
    if (isActivating) return;

    if (!selectedSymbol) {
      setSelectedSymbol(id);
      return;
    }

    if (selectedSymbol === id) {
      setSelectedSymbol(null);
      return;
    }

    const exists = connections.some(
      conn =>
        (conn.source === selectedSymbol && conn.target === id) ||
        (conn.source === id && conn.target === selectedSymbol)
    );
    if (exists) {
      toast('Connection already exists.');
      setSelectedSymbol(null);
      return;
    }

    const newConnection: Connection = {
      id: `${selectedSymbol}-${id}`,
      source: selectedSymbol,
      target: id,
      power: Math.random() * 0.5 + 0.5,
    };
    setConnections(prev => [...prev, newConnection]);
    setSymbols(prev =>
      prev.map(s =>
        s.id === selectedSymbol || s.id === id ? { ...s, connected: true } : s
      )
    );
    setSelectedSymbol(null);
    toast('Symbols connected!');
  };

  // Call backend AI for pattern analysis when connections or symbols change
  useEffect(() => {
    if (connections.length > 0) {
      setLoading(true);
      fetchAIPatternAnalysis(symbols, connections)
        .then(setPatternAnalysis)
        .catch(() => toast('AI analysis failed'))
        .finally(() => setLoading(false));
    } else {
      setPatternAnalysis(null);
    }
  }, [connections, symbols]);

  // Render the symbols and connections (basic SVG example)
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Symbol Connection System</h2>
      {loading && (
        <div className="mb-2">
          <span>Analyzing pattern with AI...</span>
        </div>
      )}
      <svg width={400} height={400} style={{ border: '1px solid #ccc' }}>
        {/* Draw connections */}
        {connections.map(conn => {
          const source = symbols.find(s => s.id === conn.source);
          const target = symbols.find(s => s.id === conn.target);
          if (!source || !target) return null;
          return (
            <line
              key={conn.id}
              x1={source.x * 4}
              y1={source.y * 4}
              x2={target.x * 4}
              y2={target.y * 4}
              stroke="#888"
              strokeWidth={2}
            />
          );
        })}
        {/* Draw symbols */}
        {symbols.map(symbol => (
          <g
            key={symbol.id}
            onClick={() => handleSymbolClick(symbol.id)}
            onMouseEnter={() => setHoveredSymbol(symbol.id)}
            onMouseLeave={() => setHoveredSymbol(null)}
            style={{ cursor: 'pointer' }}
          >
            <circle
              cx={symbol.x * 4}
              cy={symbol.y * 4}
              r={18}
              fill={symbol.connected ? '#aaf' : '#eee'}
              stroke={hoveredSymbol === symbol.id ? '#00f' : '#888'}
              strokeWidth={hoveredSymbol === symbol.id ? 3 : 1}
            />
            <text
              x={symbol.x * 4}
              y={symbol.y * 4 + 5}
              textAnchor="middle"
              fontSize={22}
              fill="#333"
            >
              {symbol.glyph}
            </text>
          </g>
        ))}
      </svg>
      {/* Show pattern analysis */}
      {patternAnalysis && (
        <div className="mt-4 p-2 border rounded bg-gray-50">
          <div><b>Power:</b> {patternAnalysis.power.toFixed(2)}</div>
          <div><b>Resonance:</b> {patternAnalysis.resonance.toFixed(2)}</div>
          <div><b>Stability:</b> {patternAnalysis.stability.toFixed(2)}</div>
          <div><b>Description:</b> {patternAnalysis.description}</div>
        </div>
      )}
    </div>
  );
};

export default SymbolConnectionSystem;
