
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Sparkles, AlertOctagon, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DimensionalImpact, RealityFeedback, PersonalEffect } from "@/types/impact";

// Mock hook for reality impact
const useRealityImpact = () => {
  const [impacts] = useState<DimensionalImpact[]>([]);
  const [realityFeedback] = useState<RealityFeedback[]>([]);
  const [personalEffects] = useState<PersonalEffect[]>([]);

  const verifyImpact = async (impactId: string, status: 'VERIFIED' | 'UNVERIFIED') => {
    console.log('Verifying impact:', impactId, status);
  };

  const stabilizeReality = async () => {
    console.log('Stabilizing reality...');
  };

  const processCascadeEffect = async (effect: PersonalEffect): Promise<PersonalEffect> => {
    console.log('Processing cascade effect:', effect);
    return effect;
  };

  return {
    impacts,
    realityFeedback,
    personalEffects,
    verifyImpact,
    stabilizeReality,
    processCascadeEffect
  };
};

// Node color mapping
const NODE_COLORS = {
  HOSTILE: 'bg-red-500/20 text-red-500 border-red-500/50',
  ELEVATION: 'bg-blue-500/20 text-blue-500 border-blue-500/50',
  RESTORATION: 'bg-green-500/20 text-green-500 border-green-500/50',
  UNKNOWN: 'bg-purple-500/20 text-purple-500 border-purple-500/50',
};

interface ImpactNodeProps {
  impact: DimensionalImpact;
  onVerify: (impactId: string, status: 'VERIFIED' | 'UNVERIFIED') => Promise<void>;
}

interface FeedbackNodeProps {
  feedback: RealityFeedback;
}

interface PersonalEffectNodeProps {
  effect: PersonalEffect;
}

interface RealityImpactEngineProps {
  initialResonance?: number;
  className?: string;
}

const ImpactNode: React.FC<ImpactNodeProps> = ({ impact, onVerify }) => {
  const [verifying, setVerifying] = useState(false);

  const handleVerify = async (status: 'VERIFIED' | 'UNVERIFIED') => {
    setVerifying(true);
    try {
      await onVerify(impact.id, status);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="border border-quantum-dark/20 rounded-lg p-4 mb-4 backdrop-blur-sm hover:bg-quantum-dark/10 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-medium">{impact.action}</h4>
        <div className="flex items-center gap-2">
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs",
              impact.verificationStatus === 'VERIFIED' ? 'bg-green-500/20 text-green-500' :
              impact.verificationStatus === 'PENDING' ? 'bg-yellow-500/20 text-yellow-500' :
              'bg-red-500/20 text-red-500'
            )}
          >
            {impact.verificationStatus}
          </Badge>
          {impact.verificationStatus === 'PENDING' && !verifying && (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-green-500 hover:text-green-600"
                onClick={() => handleVerify('VERIFIED')}
              >
                <CheckCircle2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-red-500 hover:text-red-600"
                onClick={() => handleVerify('UNVERIFIED')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          )}
          {verifying && (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
      </div>
      <div className="text-xs text-muted-foreground mb-2">
        <span className="font-mono">{impact.dimensionalCode}</span> • {impact.targetDimension}
      </div>
      <div className="space-y-2">
        {impact.effects.map((impactEffect, i) => (
          <div key={i} className="text-xs flex items-center">
            <span className={cn(
              "w-2 h-2 rounded-full mr-2",
              impactEffect.type === 'TURBULENCE' ? 'bg-red-400' :
              impactEffect.type === 'FREQUENCY_SHIFT' ? 'bg-blue-400' :
              impactEffect.type === 'ANOMALY' ? 'bg-purple-400' :
              'bg-green-400'
            )} />
            <span>{impactEffect.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeedbackNode: React.FC<FeedbackNodeProps> = ({ feedback }) => {
  return (
    <div className={cn(
      "border rounded-lg p-3 mb-3",
      NODE_COLORS[feedback.nodeType]
    )}>
      <div className="flex justify-between items-start mb-1">
        <Badge variant="outline" className="text-xs">
          {feedback.source}
        </Badge>
        <span className="text-xs opacity-70">{feedback.confidence}% match</span>
      </div>
      <p className="text-sm mt-2">{feedback.content}</p>
      <div className="flex gap-1 mt-2 flex-wrap">
        {feedback.keywords.map((keyword, i) => (
          <span key={i} className="text-xs px-1.5 py-0.5 rounded-full bg-quantum-dark/20">
            #{keyword}
          </span>
        ))}
      </div>
    </div>
  );
};

const PersonalEffectNode: React.FC<PersonalEffectNodeProps> = ({ effect }) => {
  return (
    <div className="border border-quantum-dark/20 rounded-lg p-3 mb-3 backdrop-blur-sm">
      <div className="flex justify-between items-start mb-2">
        <Badge variant="outline" className="text-xs">
          {effect.type}
        </Badge>
        <div className="flex space-x-1">
          {Array.from({ length: Math.min(5, Math.ceil(effect.intensity * 5)) }).map((_, i) => (
            <span key={i} className="w-1 h-4 bg-quantum-purple/40 rounded-full" />
          ))}
        </div>
      </div>
      <p className="text-sm">{effect.description}</p>
      {effect.frequency && (
        <div className="mt-2 text-xs text-muted-foreground">
          Frequency: {effect.frequency}Hz
        </div>
      )}
    </div>
  );
};

export const RealityImpactEngine: React.FC<RealityImpactEngineProps> = ({
  initialResonance = 100,
  className
}) => {
  const [resonance, setResonance] = useState(initialResonance);
  const [stabilizing, setStabilizing] = useState(false);
  const [cascadeEffects, setCascadeEffects] = useState<PersonalEffect[]>([]);
  
  const {
    impacts,
    realityFeedback,
    personalEffects,
    verifyImpact,
    stabilizeReality,
    processCascadeEffect
  } = useRealityImpact();

  const handleCascadeEffect = async (effect: PersonalEffect) => {
    setStabilizing(true);
    try {
      const result = await processCascadeEffect(effect);
      setCascadeEffects(prev => [...prev, result]); // Fixed: result is guaranteed to be PersonalEffect
      
      // Update resonance based on effect
      setResonance(prev => Math.max(0, Math.min(100, 
        prev + (effect.intensity * (effect.type === 'ELEVATION' ? 1 : -1))
      )));
      
      if (resonance < 30) {
        await stabilizeReality();
      }
    } finally {
      setStabilizing(false);
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Reality Impact Interface</span>
          <Badge 
            variant="outline" 
            className={cn(
              resonance > 70 ? "bg-green-500/20 text-green-500" :
              resonance > 30 ? "bg-yellow-500/20 text-yellow-500" :
              "bg-red-500/20 text-red-500"
            )}
          >
            Resonance: {resonance.toFixed(1)}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="impacts">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="impacts">Dimensional Impacts</TabsTrigger>
            <TabsTrigger value="feedback">Reality Feedback</TabsTrigger>
            <TabsTrigger value="effects">Personal Effects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="impacts" className="space-y-4">
            <ScrollArea className="h-[400px] pr-4">
              {impacts.map(impact => (
                <ImpactNode 
                  key={impact.id} 
                  impact={impact}
                  onVerify={verifyImpact}
                />
              ))}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="feedback">
            <ScrollArea className="h-[400px] pr-4">
              {realityFeedback.map(feedback => (
                <FeedbackNode key={feedback.id} feedback={feedback} />
              ))}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="effects">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {personalEffects.map(effect => (
                  <PersonalEffectNode key={effect.id} effect={effect} />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
