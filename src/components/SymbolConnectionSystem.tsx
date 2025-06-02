import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Connection } from '../types/glyph';
import { analyzeSymbolPattern } from '../utils/quantum';

interface SymbolNode {
  id: string;
  symbol: string;
  x: number;
  y: number;
}

export const SymbolConnectionSystem: React.FC = () => {
  const [nodes, setNodes] = useState<SymbolNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const addNode = useCallback(() => {
    const newNode: SymbolNode = {
      id: `node-${Date.now()}`,
      symbol: ['◯', '△', '□', '◊', '⬟'][Math.floor(Math.random() * 5)],
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50
    };
    setNodes(prev => [...prev, newNode]);
  }, []);

  const connectNodes = useCallback((sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;
    
    const connectionExists = connections.some(
      conn => (conn.source === sourceId && conn.target === targetId) ||
              (conn.source === targetId && conn.target === sourceId)
    );
    
    if (!connectionExists) {
      const newConnection: Connection = {
        id: `conn-${Date.now()}`,
        source: sourceId,
        target: targetId,
        power: Math.random() * 100,
        strength: Math.random() * 100
      };
      setConnections(prev => [...prev, newConnection]);
    }
  }, [connections]);

  const handleNodeClick = useCallback((nodeId: string) => {
    if (isConnecting && selectedNode && selectedNode !== nodeId) {
      connectNodes(selectedNode, nodeId);
      setSelectedNode(null);
      setIsConnecting(false);
    } else {
      setSelectedNode(nodeId);
      setIsConnecting(true);
    }
  }, [isConnecting, selectedNode, connectNodes]);

  const analyzePattern = useCallback(() => {
    const symbols = nodes.map(node => node.symbol);
    const analysis = analyzeSymbolPattern(symbols);
    console.log('Pattern Analysis:', analysis);
  }, [nodes]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Symbol Connection System</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-x-2">
          <Button onClick={addNode}>Add Symbol</Button>
          <Button onClick={analyzePattern} variant="secondary">Analyze Pattern</Button>
        </div>
        
        <div className="relative h-96 border rounded-lg bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full">
            {connections.map(connection => {
              const sourceNode = nodes.find(n => n.id === connection.source);
              const targetNode = nodes.find(n => n.id === connection.target);
              if (!sourceNode || !targetNode) return null;
              
              return (
                <line
                  key={connection.id}
                  x1={sourceNode.x + 20}
                  y1={sourceNode.y + 20}
                  x2={targetNode.x + 20}
                  y2={targetNode.y + 20}
                  stroke="rgba(168, 85, 247, 0.6)"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
          
          {nodes.map(node => (
            <div
              key={node.id}
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                selectedNode === node.id ? 'bg-purple-500 text-white scale-110' : 'bg-white border-2 border-gray-300'
              }`}
              style={{ left: node.x, top: node.y }}
              onClick={() => handleNodeClick(node.id)}
            >
              {node.symbol}
            </div>
          ))}
        </div>
        
        {isConnecting && selectedNode && (
          <div className="mt-4 p-2 bg-blue-100 dark:bg-blue-900 rounded">
            Click another symbol to create a connection
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SymbolConnectionSystem;
