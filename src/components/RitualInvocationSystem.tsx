
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { useToast } from '../hooks/use-toast';
import { getModule } from '../lib/engine';

interface Ritual {
  name: string;
  description: string;
  glyph: string;
}

interface GlyphInfo {
  name: string;
  power: number;
  domain: string;
  description: string;
  glyph: string;
}

const RitualInvocationSystem = () => {
  const { toast } = useToast();
  const [availableRituals, setAvailableRituals] = useState<Ritual[]>([]);
  const [availableGlyphs, setAvailableGlyphs] = useState<GlyphInfo[]>([]);
  const [selectedRitual, setSelectedRitual] = useState<string | null>(null);
  const [selectedGlyph, setSelectedGlyph] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<number>(50);
  const [activeEffects, setActiveEffects] = useState<string[]>([]);
  
  // Get required modules
  const invocationAPI = getModule('invocationAPI');
  const iuri = getModule('iuri');
  
  // Load available rituals and glyphs
  useEffect(() => {
    // Initialize from modules if available
    if (invocationAPI) {
      const rituals = invocationAPI.listRituals().map(ritual => ({
        name: ritual.name,
        description: ritual.description,
        glyph: ritual.glyph
      }));
      
      setAvailableRituals(rituals);
      
      if (rituals.length > 0) {
        setSelectedRitual(rituals[0].name);
      }
    } else {
      // Fallback hardcoded rituals if module not available
      setAvailableRituals([
        { name: "clarity", description: "Clears mental fog and enhances perception", glyph: "⍟" },
        { name: "gateway", description: "Opens pathways between dimensional states", glyph: "⏣" },
        { name: "harmony", description: "Aligns frequencies across multiple systems", glyph: "⎈" },
        { name: "timestep", description: "Manipulates subjective temporal experience", glyph: "⧫" }
      ]);
      setSelectedRitual("clarity");
    }
    
    // Get glyphs from IURI if available
    if (iuri) {
      const glyphs = iuri.getAvailableGlyphs();
      setAvailableGlyphs(glyphs);
      
      if (glyphs.length > 0) {
        setSelectedGlyph(glyphs[0].glyph);
      }
    } else {
      // Fallback hardcoded glyphs
      setAvailableGlyphs([
        { glyph: "⏣", name: "Holographic Nexus", power: 7, domain: "reality", description: "Manipulates information fields" },
        { glyph: "⍟", name: "Star Fragment", power: 5, domain: "consciousness", description: "Aligns mental patterns" },
        { glyph: "⌬", name: "Energy Prism", power: 6, domain: "energy", description: "Channels quantum energy" },
        { glyph: "⎈", name: "Harmonic Wheel", power: 8, domain: "harmony", description: "Creates resonant frequencies" },
        { glyph: "⧫", name: "Temporal Diamond", power: 4, domain: "time", description: "Manipulates timeflow" }
      ]);
      setSelectedGlyph("⍟");
    }
  }, [invocationAPI, iuri]);
  
  // Get selected ritual info
  const getSelectedRitualInfo = () => {
    return availableRituals.find(r => r.name === selectedRitual) || null;
  };
  
  // Get selected glyph info
  const getSelectedGlyphInfo = () => {
    return availableGlyphs.find(g => g.glyph === selectedGlyph) || null;
  };
  
  // Invoke a ritual
  const invokeRitual = () => {
    const ritualInfo = getSelectedRitualInfo();
    
    if (!ritualInfo) {
      toast({
        title: "Ritual Error",
        description: "No ritual selected",
        variant: "destructive"
      });
      return;
    }
    
    let result;
    
    // Use invocation API if available
    if (invocationAPI) {
      result = invocationAPI.invokeRitual(ritualInfo.name, {
        intensity: intensity
      });
      
      if (result.success) {
        // Add effect to active effects
        if (result.effects && result.effects.length > 0) {
          setActiveEffects(prev => [result.effects[0], ...prev].slice(0, 3));
        }
        
        toast({
          title: `Ritual: ${ritualInfo.name}`,
          description: result.effects[0] || "Ritual successfully invoked",
          duration: 3000
        });
      } else {
        toast({
          title: "Ritual Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive"
        });
      }
    } else if (iuri) {
      // Direct IURI invocation
      result = iuri.invokeRitual({
        glyph: ritualInfo.glyph || selectedGlyph,
        intensity: intensity,
        intention: ritualInfo.name
      });
      
      if (result.success) {
        // Add effect to active effects
        if (result.effects && result.effects.length > 0) {
          setActiveEffects(prev => [result.effects[0], ...prev].slice(0, 3));
        }
        
        toast({
          title: `Ritual: ${ritualInfo.name}`,
          description: result.effects[0] || "Ritual successfully invoked",
          duration: 3000
        });
      } else {
        toast({
          title: "Ritual Failed",
          description: "IURI invocation failed",
          variant: "destructive"
        });
      }
    } else {
      // Fallback for when neither module is available
      const effectDescriptions = [
        "Reality fabric temporarily shifts around you",
        "Your mental patterns align with higher dimensions",
        "Energy flows become visible as geometric patterns",
        "Temporal flow fluctuates around you briefly",
        "Resonant frequencies align across dimensions"
      ];
      
      const randomEffect = effectDescriptions[Math.floor(Math.random() * effectDescriptions.length)];
      setActiveEffects(prev => [randomEffect, ...prev].slice(0, 3));
      
      toast({
        title: `Ritual: ${ritualInfo.name}`,
        description: randomEffect,
        duration: 3000
      });
    }
  };
  
  // Invoke a glyph directly
  const invokeGlyph = () => {
    const glyphInfo = getSelectedGlyphInfo();
    
    if (!glyphInfo) {
      toast({
        title: "Glyph Error",
        description: "No glyph selected",
        variant: "destructive"
      });
      return;
    }
    
    // Use IURI if available
    if (iuri) {
      const result = iuri.invokeRitual({
        glyph: glyphInfo.glyph,
        intensity: intensity,
        intention: `Direct ${glyphInfo.name} invocation`
      });
      
      if (result.success) {
        // Add effect to active effects
        if (result.effects && result.effects.length > 0) {
          setActiveEffects(prev => [result.effects[0], ...prev].slice(0, 3));
        }
        
        toast({
          title: `Glyph: ${glyphInfo.name}`,
          description: result.effects[0] || "Glyph activated successfully",
          duration: 3000
        });
      } else {
        toast({
          title: "Glyph Activation Failed",
          description: "Could not activate the glyph",
          variant: "destructive"
        });
      }
    } else {
      // Fallback when IURI not available
      const domains = {
        reality: "Reality fabric temporarily shifts around you",
        consciousness: "Your mental patterns align with higher dimensions",
        energy: "Energy flows become visible as geometric patterns",
        time: "Temporal flow fluctuates around you briefly",
        harmony: "Resonant frequencies align across dimensions"
      };
      
      const effect = domains[glyphInfo.domain as keyof typeof domains] || 
        "Strange effects manifest around you";
      
      setActiveEffects(prev => [effect, ...prev].slice(0, 3));
      
      toast({
        title: `Glyph: ${glyphInfo.name}`,
        description: effect,
        duration: 3000
      });
    }
  };
  
  return (
    <Card className="bg-quantum-dark dimensional-border backdrop-blur-sm bg-opacity-70">
      <CardContent className="p-4">
        <div className="flex items-center mb-3 justify-between">
          <h3 className="text-sm font-medium text-quantum-gold">IURI: Ritual Interface</h3>
          <Badge variant="outline" className="bg-quantum-gold/10 text-quantum-gold text-xs">
            {availableRituals.length} Rituals
          </Badge>
        </div>
        
        {/* Ritual Selection */}
        <div className="mb-4">
          <h4 className="text-xs text-muted-foreground mb-2">Available Rituals</h4>
          <div className="grid grid-cols-2 gap-2">
            {availableRituals.slice(0, 4).map((ritual) => (
              <Button
                key={ritual.name}
                variant={selectedRitual === ritual.name ? "secondary" : "outline"}
                size="sm"
                className={selectedRitual === ritual.name 
                  ? "bg-quantum-purple/30 text-quantum-purple justify-start" 
                  : "bg-quantum-dark/40 hover:bg-quantum-purple/20 justify-start"
                }
                onClick={() => setSelectedRitual(ritual.name)}
              >
                <span className="mr-2 text-base">{ritual.glyph}</span>
                <span className="truncate">{ritual.name}</span>
              </Button>
            ))}
          </div>
          {availableRituals.length > 4 && (
            <p className="text-xs text-muted-foreground mt-1">+ {availableRituals.length - 4} more rituals</p>
          )}
        </div>
        
        {/* Glyph Selection */}
        <div className="mb-4">
          <h4 className="text-xs text-muted-foreground mb-2">Available Glyphs</h4>
          <div className="flex flex-wrap gap-2">
            {availableGlyphs.slice(0, 5).map((glyph) => (
              <Button
                key={glyph.glyph}
                variant="ghost"
                size="sm"
                className={`text-lg h-10 w-10 ${
                  selectedGlyph === glyph.glyph 
                  ? "bg-quantum-gold/30 text-quantum-gold" 
                  : "bg-quantum-dark/40 hover:bg-quantum-gold/20"
                }`}
                onClick={() => setSelectedGlyph(glyph.glyph)}
                title={glyph.name}
              >
                {glyph.glyph}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Intensity Slider */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-xs text-muted-foreground">Ritual Intensity</h4>
            <span className="text-xs text-quantum-blue">{intensity}%</span>
          </div>
          <Slider
            value={[intensity]}
            min={10}
            max={100}
            step={1}
            onValueChange={(value) => setIntensity(value[0])}
            className="my-3"
          />
        </div>
        
        {/* Invocation Actions */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={invokeRitual}
            className="bg-quantum-purple/20 border-quantum-purple/40 text-quantum-purple hover:bg-quantum-purple/30"
            disabled={!selectedRitual}
          >
            Invoke Ritual
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={invokeGlyph}
            className="bg-quantum-gold/20 border-quantum-gold/40 text-quantum-gold hover:bg-quantum-gold/30"
            disabled={!selectedGlyph}
          >
            Activate Glyph
          </Button>
        </div>
        
        <Separator className="my-3" />
        
        {/* Active Effects */}
        <div>
          <h4 className="text-xs text-muted-foreground mb-2">Active Effects</h4>
          {activeEffects.length > 0 ? (
            <div className="space-y-2 text-xs">
              {activeEffects.map((effect, idx) => (
                <p key={idx} className="text-quantum-blue">{effect}</p>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">No active ritual effects</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RitualInvocationSystem;
