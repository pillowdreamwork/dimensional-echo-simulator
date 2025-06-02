import { memo, useCallback, useMemo, useState } from 'react';
import type { FC } from 'react';
import { useQuantumState } from '../hooks/use-quantum-state';
import { useRealityImpact } from '../hooks/use-reality-impact';
import type { DimensionalEffect } from '../types/quantum';
import type { DimensionalImpact, RealityFeedback, PersonalEffect } from '../types/impact';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { EffectItem } from './ui/effect-item';
import { ResonanceBar } from './ui/resonance-bar';
import { useToast } from '../hooks/use-toast';
import { cn } from '../lib/utils';
import { CheckCircle2, XCircle, Loader2, AlertTriangle } from 'lucide-react';

interface RealityImpactEngineProps {
  initialResonance?: number;
  className?: string;
  onImpactVerified?: (impactId: string, status: 'VERIFIED' | 'UNVERIFIED') => Promise<void>;
  onStabilize?: () => Promise<void>;
}

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
const RealityImpactEngine = memo<RealityImpactEngineProps>(({
  initialResonance = 100,
  className,
  onImpactVerified,
  onStabilize
}) => {

interface RealityImpactEngineProps {
  initialResonance?: number;
  className?: string;
}

const RealityImpactEngine = memo<RealityImpactEngineProps>(({
  initialResonance = 100,
  className,
  onImpactVerified,
  onStabilize
}) => {
  const { toast } = useToast();
  const [resonance, setResonance] = useState(initialResonance);
  const [stabilizing, setStabilizing] = useState(false);
  const [selectedImpact, setSelectedImpact] = useState<string | null>(null);
  
  const {
    impacts,
    realityFeedback,
    personalEffects,
    isLoading,
    error,
    verifyImpact,
    stabilizeReality,
    processCascadeEffect
  } = useRealityImpact();

  const { state: quantumState } = useQuantumState();

  const handleVerifyImpact = useCallback(async (impactId: string, status: 'VERIFIED' | 'UNVERIFIED') => {
    try {
      await verifyImpact(impactId, status);
      onImpactVerified?.(impactId, status);
      toast({
        title: 'Impact Verified',
        description: `Reality impact has been marked as ${status.toLowerCase()}`,
        variant: 'default'
      });
    } catch (err) {
      toast({
        title: 'Verification Failed',
        description: err instanceof Error ? err.message : 'Failed to verify impact',
        variant: 'destructive'
      });
    }
  }, [verifyImpact, onImpactVerified, toast]);

  const handleStabilize = useCallback(async () => {
    setStabilizing(true);
    try {
      await stabilizeReality();
      await onStabilize?.();
      toast({
        title: 'Reality Stabilized',
        description: 'Reality matrix has been successfully rebalanced',
        variant: 'default'
      });
    } catch (err) {
      toast({
        title: 'Stabilization Failed',
        description: err instanceof Error ? err.message : 'Failed to stabilize reality',
        variant: 'destructive'
      });
    } finally {
      setStabilizing(false);
    }
  }, [stabilizeReality, onStabilize, toast]);

  const handleProcessEffect = useCallback(async (effect: PersonalEffect) => {
    setStabilizing(true);
    try {
      const result = await processCascadeEffect(effect);
      
      // Update resonance based on effect type and intensity
      setResonance(prev => Math.max(0, Math.min(100, 
        prev + (effect.intensity * (
          effect.type === 'DREAMSCAPE' || 
          effect.type === 'SYNCHRONICITY' ? 1 : 
          effect.type === 'EMOTIONAL_SURGE' ? 0.5 : -0.5
        ))
      )));
      
      toast({
        title: 'Effect Processed',
        description: `${effect.type} cascade effect has been processed`,
        variant: 'default'
      });
      
      // Auto-stabilize when resonance gets too low
      if (resonance < 30) {
        await handleStabilize();
      }
      
      return result;
    } finally {
      setStabilizing(false);
    }
  }, [processCascadeEffect, resonance, handleStabilize, toast]);

  return (
    <Card className={cn("w-full overflow-hidden", className)}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Reality Impact Engine</h2>
          <div className="flex items-center space-x-2">
            {isLoading && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
              </div>
            )}
            {error && (
              <div className="flex items-center space-x-2 text-sm text-red-500">
                <AlertTriangle className="h-4 w-4" />
                <span>Error: {error.message}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <ResonanceBar
            value={resonance}
            label="Reality Resonance"
            variant={
              resonance >= 70 ? 'success' :
              resonance >= 40 ? 'warning' : 'danger'
            }
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Active Impacts</h3>
              {impacts.map((impact) => (
                <div
                  key={impact.id}
                  className={cn(
                    "border rounded-lg p-4 transition-colors",
                    selectedImpact === impact.id && "border-quantum-purple bg-quantum-dark/5"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <h4 className="font-medium">{impact.action}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <code className="text-xs">{impact.dimensionalCode}</code>
                        <span>•</span>
                        <span>Target: {impact.targetDimension}</span>
                      </div>
                    </div>
                    
                    <Badge 
                      variant={
                        impact.verificationStatus === 'VERIFIED' ? 'success' :
                        impact.verificationStatus === 'UNVERIFIED' ? 'destructive' :
                        'secondary'
                      }
                    >
                      {impact.verificationStatus}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {impact.effects.map((effect, index) => (
                      <EffectItem
                        key={index}
                        type={effect.type}
                        description={effect.description}
                        intensity={effect.intensity}
                      />
                    ))}
                  </div>

                  {impact.verificationStatus === 'PENDING' && (
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerifyImpact(impact.id, 'VERIFIED')}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Verify
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerifyImpact(impact.id, 'UNVERIFIED')}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-4">Reality Feedback</h3>
                <div className="space-y-3">
                  {realityFeedback.map((feedback, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3 space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="text-xs">
                          {feedback.source}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {feedback.confidence}% match
                        </span>
                      </div>
                      <p className="text-sm">{feedback.content}</p>
                      <div className="flex flex-wrap gap-1">
                        {feedback.keywords.map((keyword, i) => (
                          <span
                            key={i}
                            className="text-xs px-1.5 py-0.5 rounded-full bg-muted"
                          >
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Personal Effects</h3>
                <div className="space-y-3">
                  {personalEffects.map((effect, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-3"
                    >
                      <EffectItem
                        type={effect.type}
                        description={effect.description}
                        intensity={effect.intensity}
                        frequency={effect.frequency}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            disabled={stabilizing || isLoading}
            onClick={handleStabilize}
            className="w-full max-w-sm"
          >
            {stabilizing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Stabilizing Reality...
              </>
            ) : (
              <>
                <span className="relative flex h-4 w-4 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-quantum-purple opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-quantum-purple"></span>
                </span>
                Stabilize Reality Matrix
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
});
