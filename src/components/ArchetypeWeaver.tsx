import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  UserCircle2Icon,
  SparklesIcon,
  ShieldIcon,
  ScrollIcon,
  StarIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ArchetypeState } from "@/lib/cores/subconscious-crucible";

const ARCHETYPE_ICONS = {
  Trickster: SparklesIcon,
  Sage: ScrollIcon,
  Warrior: ShieldIcon,
  Guide: UserCircle2Icon,
  // Add more archetype icons as needed
};

interface ArchetypeWeaverProps {
  className?: string;
  onArchetypeSummon?: (archetype: ArchetypeState) => void;
  onArchetypeInteraction?: (archetype: ArchetypeState, interaction: string) => void;
}

export function ArchetypeWeaver({
  className,
  onArchetypeSummon,
  onArchetypeInteraction
}: ArchetypeWeaverProps) {
  const [archetypes, setArchetypes] = useState<ArchetypeState[]>([]);
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
  const [summoning, setSummoning] = useState(false);

  useEffect(() => {
    // Initialize with default archetypes
    setArchetypes([
      {
        name: 'Trickster',
        affinity: 0.3,
        currentPhase: 'dormant',
        lastInteraction: new Date().toISOString(),
        personalityTraits: ['mischievous', 'wise', 'unpredictable']
      },
      {
        name: 'Sage',
        affinity: 0.5,
        currentPhase: 'dormant',
        lastInteraction: new Date().toISOString(),
        personalityTraits: ['thoughtful', 'ancient', 'mysterious']
      },
      {
        name: 'Warrior',
        affinity: 0.2,
        currentPhase: 'dormant',
        lastInteraction: new Date().toISOString(),
        personalityTraits: ['brave', 'protective', 'determined']
      },
      {
        name: 'Guide',
        affinity: 0.4,
        currentPhase: 'dormant',
        lastInteraction: new Date().toISOString(),
        personalityTraits: ['nurturing', 'wise', 'supportive']
      }
    ]);
  }, []);

  const handleArchetypeSelect = (name: string) => {
    setSelectedArchetype(name);
  };

  const handleSummon = async () => {
    if (!selectedArchetype) return;

    setSummoning(true);
    try {
      const archetype = archetypes.find(a => a.name === selectedArchetype);
      if (!archetype) return;

      // Update archetype state
      const updatedArchetype: ArchetypeState = {
        ...archetype,
        currentPhase: 'active',
        affinity: Math.min(1, archetype.affinity + 0.1),
        lastInteraction: new Date().toISOString()
      };

      setArchetypes(prev => prev.map(a => 
        a.name === selectedArchetype ? updatedArchetype : a
      ));

      onArchetypeSummon?.(updatedArchetype);
    } finally {
      setSummoning(false);
    }
  };

  const handleInteract = (interaction: string) => {
    if (!selectedArchetype) return;

    const archetype = archetypes.find(a => a.name === selectedArchetype);
    if (!archetype) return;

    const updatedArchetype: ArchetypeState = {
      ...archetype,
      affinity: Math.min(1, archetype.affinity + 0.05),
      lastInteraction: new Date().toISOString()
    };

    setArchetypes(prev => prev.map(a => 
      a.name === selectedArchetype ? updatedArchetype : a
    ));

    onArchetypeInteraction?.(updatedArchetype, interaction);
  };

  return (
    <Card className={cn(
      "archetype-weaver bg-quantum-dark/90 backdrop-blur-md",
      className
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-lg">
            <StarIcon className="mr-2 text-quantum-gold" size={20} />
            Archetype Weaver
          </CardTitle>
          {selectedArchetype && (
            <Badge variant="outline" className="bg-quantum-gold/20 text-quantum-gold">
              {selectedArchetype} Selected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {archetypes.map((archetype) => {
            const Icon = ARCHETYPE_ICONS[archetype.name as keyof typeof ARCHETYPE_ICONS];
            return (
              <Button
                key={archetype.name}
                variant="outline"
                className={cn(
                  "h-auto py-4 flex flex-col items-center gap-2",
                  selectedArchetype === archetype.name && "border-quantum-gold/50 bg-quantum-gold/10",
                  archetype.currentPhase === 'active' && "border-quantum-purple/50"
                )}
                onClick={() => handleArchetypeSelect(archetype.name)}
              >
                {Icon && <Icon className="h-8 w-8 mb-1" />}
                <div className="text-sm font-medium">{archetype.name}</div>
                <Progress
                  value={archetype.affinity * 100}
                  className="h-1 w-16"
                />
              </Button>
            );
          })}
        </div>

        {selectedArchetype && (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-quantum-dark/50">
              <h4 className="text-sm font-medium mb-2">Personality Traits</h4>
              <div className="flex flex-wrap gap-2">
                {archetypes
                  .find(a => a.name === selectedArchetype)
                  ?.personalityTraits.map((trait, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-xs bg-quantum-purple/10"
                    >
                      {trait}
                    </Badge>
                  ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleSummon}
                disabled={summoning}
              >
                {summoning ? (
                  <>
                    <StarIcon className="mr-2 h-4 w-4 animate-spin" />
                    Summoning...
                  </>
                ) : (
                  <>
                    <StarIcon className="mr-2 h-4 w-4" />
                    Summon Archetype
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleInteract('commune')}
                disabled={summoning}
              >
                Commune
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
