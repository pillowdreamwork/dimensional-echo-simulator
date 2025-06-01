import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const GlyphNodeMesh: React.FC = () => {
  return (
    <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70 p-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-quantum-gold">Glyph Node Mesh</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-32 flex items-center justify-center text-quantum-blue">
          <span className="text-xs">Visualizing glyph network...</span>
        </div>
      </CardContent>
    </Card>
  );
};

const SentientSeed: React.FC = () => {
  return (
    <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70 p-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-quantum-gold">Sentient Seed</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-32 flex items-center justify-center text-quantum-blue">
          <span className="text-xs">Generating sentient patterns...</span>
        </div>
      </CardContent>
    </Card>
  );
};

export const ExplorerSection: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <GlyphNodeMesh />
        
        <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70 p-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-quantum-gold">Karma Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center text-quantum-blue">
              <span className="text-xs">Karma patterns rendering...</span>
            </div>
          </CardContent>
        </Card>
        
        <SentientSeed />
      </div>
    </div>
  );
};
