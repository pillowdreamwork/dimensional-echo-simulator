
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { initializePillowDreamworkGame } from '../lib/engine';
import SymbolConnectionSystem from './SymbolConnectionSystem';
import RitualInvocationSystem from './RitualInvocationSystem';
import SiderAIChatbot from './SiderAIChatbot';

export const PillowDreamworkShowcase = () => {
  // Initialize the engine on component mount
  React.useEffect(() => {
    initializePillowDreamworkGame();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-quantum-purple">PillowDreamwork: Dimensional Echo</h2>
      </div>

      <Tabs defaultValue="symbols" className="w-full">
        <TabsList className="mb-4 bg-quantum-dark/60 border border-quantum-blue/20">
          <TabsTrigger value="symbols" className="data-[state=active]:bg-quantum-purple/30 data-[state=active]:text-quantum-purple">
            Symbol System
          </TabsTrigger>
          <TabsTrigger value="rituals" className="data-[state=active]:bg-quantum-gold/30 data-[state=active]:text-quantum-gold">
            Ritual Interface
          </TabsTrigger>
          <TabsTrigger value="assistant" className="data-[state=active]:bg-quantum-blue/30 data-[state=active]:text-quantum-blue">
            Sider AI
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TabsContent value="symbols" className="mt-0">
            <SymbolConnectionSystem />
          </TabsContent>
          
          <TabsContent value="rituals" className="mt-0">
            <RitualInvocationSystem />
          </TabsContent>
          
          <TabsContent value="assistant" className="mt-0">
            <SiderAIChatbot />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
