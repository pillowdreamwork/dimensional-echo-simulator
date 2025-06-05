
import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Play, 
  Pause, 
  Square, 
  Upload, 
  Download,
  Volume2,
  Waves,
  RotateCcw,
  Zap
} from "lucide-react";

interface AudioEffect {
  id: string;
  name: string;
  type: 'echo' | 'reverb' | 'distortion' | 'delay';
  intensity: number;
  active: boolean;
}

export const AudioProcessor: React.FC = () => {
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [audioFile, setAudioFile] = useState<string | null>(null);
  
  const [effects, setEffects] = useState<AudioEffect[]>([
    { id: 'echo', name: 'Echo', type: 'echo', intensity: 30, active: false },
    { id: 'reverb', name: 'Reverb', type: 'reverb', intensity: 40, active: false },
    { id: 'distortion', name: 'Distortion', type: 'distortion', intensity: 20, active: false },
    { id: 'delay', name: 'Delay', type: 'delay', intensity: 35, active: false }
  ]);

  const initializeAudioContext = useCallback(() => {
    if (!audioContextRef.current && audioRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(audioContextRef.current.destination);
    }
  }, []);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      setAudioFile(url);
      
      toast({
        title: "Audio Loaded",
        description: `${file.name} ready for processing`,
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please select an audio file",
        variant: "destructive"
      });
    }
  }, [toast]);

  const togglePlayback = useCallback(() => {
    if (!audioRef.current) return;

    initializeAudioContext();

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying, initializeAudioContext]);

  const stopPlayback = useCallback(() => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const updateVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  }, []);

  const toggleEffect = useCallback((effectId: string) => {
    setEffects(prev => prev.map(effect => 
      effect.id === effectId 
        ? { ...effect, active: !effect.active }
        : effect
    ));
  }, []);

  const updateEffectIntensity = useCallback((effectId: string, intensity: number) => {
    setEffects(prev => prev.map(effect => 
      effect.id === effectId 
        ? { ...effect, intensity }
        : effect
    ));
  }, []);

  const applyEffects = useCallback(() => {
    const activeEffects = effects.filter(e => e.active);
    if (activeEffects.length === 0) {
      toast({
        title: "No Effects Active",
        description: "Enable at least one effect to process audio",
      });
      return;
    }

    toast({
      title: "Processing Audio",
      description: `Applying ${activeEffects.length} effect(s)`,
    });

    // Simulate processing time
    setTimeout(() => {
      toast({
        title: "Effects Applied",
        description: "Audio processing complete",
      });
    }, 2000);
  }, [effects, toast]);

  const exportAudio = useCallback(() => {
    if (!audioFile) {
      toast({
        title: "No Audio Loaded",
        description: "Please load an audio file first",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Export Started",
      description: "Processing audio for download",
    });
  }, [audioFile, toast]);

  // Update time
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Waves className="text-purple-500" size={20} />
              <span>Audio Echo Processor</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2" size={16} />
                Load Audio
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportAudio}
                disabled={!audioFile}
              >
                <Download className="mr-2" size={16} />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Audio Player */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={togglePlayback}
                disabled={!audioFile}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={stopPlayback}
                disabled={!audioFile}
              >
                <Square size={16} />
              </Button>
              
              <div className="flex items-center space-x-2 flex-1">
                <span className="text-sm text-muted-foreground">
                  {formatTime(currentTime)}
                </span>
                <Progress 
                  value={duration ? (currentTime / duration) * 100 : 0} 
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">
                  {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Volume2 size={16} />
                <div className="w-20">
                  <Slider
                    value={[volume]}
                    onValueChange={([value]) => updateVolume(value)}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Audio Effects */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Audio Effects</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {effects.map((effect) => (
                <Card key={effect.id} className="bg-white/5">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{effect.name}</span>
                        <Button
                          variant={effect.active ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleEffect(effect.id)}
                        >
                          {effect.active ? 'ON' : 'OFF'}
                        </Button>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Intensity</span>
                          <span className="text-sm">{effect.intensity}%</span>
                        </div>
                        <Slider
                          value={[effect.intensity]}
                          onValueChange={([value]) => updateEffectIntensity(effect.id, value)}
                          max={100}
                          step={1}
                          disabled={!effect.active}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={applyEffects} disabled={!audioFile}>
                <Zap className="mr-2" size={16} />
                Apply Effects
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setEffects(prev => prev.map(e => ({ ...e, active: false, intensity: 30 })))}
              >
                <RotateCcw className="mr-2" size={16} />
                Reset Effects
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hidden audio element */}
      {audioFile && (
        <audio
          ref={audioRef}
          src={audioFile}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default AudioProcessor;
