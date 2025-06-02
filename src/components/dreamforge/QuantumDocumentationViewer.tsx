
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, BookOpen, Code, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface DocumentationSection {
  id: string;
  title: string;
  content: string;
  category: 'guide' | 'api' | 'tutorial' | 'reference';
  tags: string[];
  lastUpdated: Date;
}

interface QuantumDocumentationViewerProps {
  className?: string;
}

export const QuantumDocumentationViewer: React.FC<QuantumDocumentationViewerProps> = ({ className }) => {
  const [sections, setSections] = useState<DocumentationSection[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock documentation sections
    const mockSections: DocumentationSection[] = [
      {
        id: 'quantum-basics',
        title: 'Quantum State Fundamentals',
        content: `# Quantum State Fundamentals

## Overview
Understanding quantum states is essential for working with the DreamForge system.

### Key Concepts
- **Superposition**: Multiple states existing simultaneously
- **Entanglement**: Quantum correlation between particles
- **Coherence**: Maintenance of quantum properties

### Code Example
\`\`\`typescript
const quantumState = {
  superposition: 0.8,
  entanglement: 0.6,
  coherence: 0.9
};
\`\`\``,
        category: 'guide',
        tags: ['quantum', 'basics', 'fundamentals'],
        lastUpdated: new Date()
      },
      {
        id: 'dimensional-api',
        title: 'Dimensional API Reference',
        content: `# Dimensional API Reference

## DimensionalProperties Interface
\`\`\`typescript
interface DimensionalProperties {
  level: DimensionalLevel;
  resonance: number;
  stability: number;
  harmonics: string[];
  entanglement: number;
  phaseAlignment: number;
}
\`\`\`

## Methods
- \`shiftDimension(level: number)\`: Change dimensional level
- \`calculateResonance()\`: Get current resonance value`,
        category: 'api',
        tags: ['api', 'dimensional', 'reference'],
        lastUpdated: new Date()
      }
    ];

    setSections(mockSections);
    setActiveSection(mockSections[0]?.id || '');
    setLoading(false);
  }, []);

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCategoryIcon = (category: DocumentationSection['category']) => {
    switch (category) {
      case 'guide':
        return <BookOpen className="h-4 w-4" />;
      case 'api':
        return <Code className="h-4 w-4" />;
      case 'tutorial':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const activeDoc = sections.find(section => section.id === activeSection);

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Loading Documentation...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Quantum Documentation
        </CardTitle>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search documentation..."
            className="flex-1 px-3 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="index">Index</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {filteredSections.map((section) => (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveSection(section.id)}
                      >
                        {getCategoryIcon(section.category)}
                        <span className="ml-2 truncate">{section.title}</span>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="md:col-span-2">
                <ScrollArea className="h-[400px]">
                  {activeDoc && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">
                          {activeDoc.category}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          Last updated: {activeDoc.lastUpdated.toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="prose max-w-none">
                        <ReactMarkdown
                          components={{
                            code: ({ children, className }) => (
                              <code className={`${className} bg-gray-100 px-1 py-0.5 rounded text-sm`}>
                                {children}
                              </code>
                            ),
                            pre: ({ children }) => (
                              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                                {children}
                              </pre>
                            )
                          }}
                        >
                          {activeDoc.content}
                        </ReactMarkdown>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {activeDoc.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="index" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section) => (
                <Card key={section.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(section.category)}
                        <span className="font-medium text-sm">{section.title}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {section.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1">
                      {section.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
