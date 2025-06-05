
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  History, 
  Download, 
  RotateCcw, 
  Eye, 
  Clock,
  GitBranch,
  Check
} from "lucide-react";

interface VersionEntry {
  id: string;
  version: string;
  timestamp: Date;
  description: string;
  features: string[];
  status: 'stable' | 'beta' | 'deprecated';
  size: string;
}

export const VersionHistory: React.FC = () => {
  const { toast } = useToast();
  const [versions, setVersions] = useState<VersionEntry[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading version history
    const mockVersions: VersionEntry[] = [
      {
        id: '3.2.1',
        version: '3.2.1',
        timestamp: new Date('2024-01-15'),
        description: 'Complete Dimensional Portal System with restored multimedia features',
        features: [
          'Dimensional Portal Interface',
          'Collage Builder with drag-drop',
          'Audio Echo Processor',
          'Visual Superimposition',
          'Quantum Reality Engine',
          'Tesseract Control Panel'
        ],
        status: 'stable',
        size: '2.4 MB'
      },
      {
        id: '3.1.0',
        version: '3.1.0',
        timestamp: new Date('2024-01-10'),
        description: 'Advanced Reality Monitoring and Symbol Forge',
        features: [
          'Reality Impact Engine',
          'Advanced Quantum Visualizer',
          'Dream Symbol Forge',
          'Dimensional Echo Monitor',
          'Performance Optimization'
        ],
        status: 'stable',
        size: '2.1 MB'
      },
      {
        id: '3.0.0',
        version: '3.0.0',
        timestamp: new Date('2024-01-05'),
        description: 'Major rebuild with Quantum Tesseract Engine',
        features: [
          'Quantum Tesseract Engine',
          'Dimensional Navigation',
          'Reality Anchoring System',
          'Echo Visualization',
          'Modern UI Overhaul'
        ],
        status: 'stable',
        size: '1.9 MB'
      },
      {
        id: '2.5.2',
        version: '2.5.2',
        timestamp: new Date('2023-12-20'),
        description: 'Legacy multimedia tools and basic portal features',
        features: [
          'Basic Portal Entry',
          'Symbol Decoder',
          'Quantum State Interface',
          'System Status Monitor'
        ],
        status: 'deprecated',
        size: '1.2 MB'
      }
    ];

    setVersions(mockVersions);
    setSelectedVersion(mockVersions[0].id);
  }, []);

  const handleRestore = (versionId: string) => {
    toast({
      title: "Restore Initiated",
      description: `Restoring to version ${versionId}. This may take a moment.`,
    });

    // Simulate restore process
    setTimeout(() => {
      toast({
        title: "Version Restored",
        description: `Successfully restored to version ${versionId}`,
      });
    }, 2000);
  };

  const handleDownload = (versionId: string) => {
    toast({
      title: "Download Started",
      description: `Downloading version ${versionId} archive`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-500';
      case 'beta': return 'bg-yellow-500';
      case 'deprecated': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const selectedVersionData = versions.find(v => v.id === selectedVersion);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="text-purple-500" size={20} />
            <span>Version History & Feature Restoration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Version List */}
            <div className="lg:col-span-1">
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {versions.map((version) => (
                    <Card
                      key={version.id}
                      className={`cursor-pointer transition-all hover:bg-purple-50 dark:hover:bg-purple-900/20 ${
                        selectedVersion === version.id ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20' : ''
                      }`}
                      onClick={() => setSelectedVersion(version.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">v{version.version}</span>
                          <Badge className={getStatusColor(version.status)}>
                            {version.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          <div className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{version.timestamp.toLocaleDateString()}</span>
                          </div>
                        </div>
                        <p className="text-xs line-clamp-2">{version.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Version Details */}
            <div className="lg:col-span-2">
              {selectedVersionData ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">Version {selectedVersionData.version}</h3>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(selectedVersionData.id)}
                        >
                          <Download className="mr-2" size={16} />
                          Download
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleRestore(selectedVersionData.id)}
                        >
                          <RotateCcw className="mr-2" size={16} />
                          Restore
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-muted-foreground" />
                        <span className="text-sm">
                          {selectedVersionData.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GitBranch size={16} className="text-muted-foreground" />
                        <span className="text-sm">{selectedVersionData.size}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6">
                      {selectedVersionData.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3">Features Included</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedVersionData.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Check size={16} className="text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedVersionData.status === 'deprecated' && (
                    <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-2">
                          <Eye className="text-yellow-600 mt-0.5" size={16} />
                          <div>
                            <h5 className="font-medium text-yellow-800 dark:text-yellow-200">
                              Legacy Version
                            </h5>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300">
                              This version is deprecated. Some features may not work with current systems.
                              Consider using a more recent stable version.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <History size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Select a version to view details</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VersionHistory;
