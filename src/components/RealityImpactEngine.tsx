import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Sparkles, AlertOctagon, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { DimensionalImpact, RealityFeedback, PersonalEffect } from "@/types/impact";
import { useRealityImpact } from "@/hooks/use-reality-impact";

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

interface FeedbackNodeProps {
  feedback: RealityFeedback;
}

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

interface PersonalEffectNodeProps {
  effect: PersonalEffect;
}

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

interface RealityImpactEngineProps {
  className?: string;
}

export function RealityImpactEngine({ className }: RealityImpactEngineProps) {
  const [activeTab, setActiveTab] = useState("shifts");
  const {
    impacts,
    feedback,
    personalEffects,
    isLoading,
    error,
    addImpact,
    verifyImpact
  } = useRealityImpact({
    pollInterval: 5000,
    maxHistory: 50
  });

  useEffect(() => {
    if (error) {
      console.error('Reality Impact Engine Error:', error);
    }
  }, [error]);

  const handleVerification = async (impactId: string, status: 'VERIFIED' | 'UNVERIFIED') => {
    try {
      await verifyImpact(impactId, status);
    } catch (err) {
      console.error('Failed to verify impact:', err);
    }
  };

  const renderContent = (items: any[], Component: React.FC<any>, props = {}) => {
    if (isLoading && items.length === 0) {
      return (
        <div className="flex items-center justify-center h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-[400px] text-red-500 gap-2">
          <AlertOctagon className="h-8 w-8" />
          <p className="text-sm">Failed to load reality impact data</p>
          <p className="text-xs text-muted-foreground">{error.message}</p>
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground gap-2">
          <Sparkles className="h-8 w-8" />
          <p className="text-sm">No data available</p>
        </div>
      );
    }

    return (
      <ScrollArea className="h-[400px] pr-4">
        {items.map((item, i) => (
          <Component key={i} {...props} {...{[Component.name.replace('Node', '').toLowerCase()]: item}} />
        ))}
      </ScrollArea>
    );
  };

  return (
    <Card className={cn("reality-impact-engine bg-quantum-dark/90 backdrop-blur-md", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold tracking-tight">
          Reality Impact Engine
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="shifts">Dimensional Shifts</TabsTrigger>
            <TabsTrigger value="feedback">Reality Feedback</TabsTrigger>
            <TabsTrigger value="personal">Personal Effects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="shifts">
            {renderContent(impacts, ImpactNode, { onVerify: handleVerification })}
          </TabsContent>
          
          <TabsContent value="feedback">
            {renderContent(feedback, FeedbackNode)}
          </TabsContent>
          
          <TabsContent value="personal">
            {renderContent(personalEffects, PersonalEffectNode)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
