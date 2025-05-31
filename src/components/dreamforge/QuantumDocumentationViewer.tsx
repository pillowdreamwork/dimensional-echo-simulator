import React, { useEffect, useState } from 'react';
import { QuantumDocumentationSystem, DocumentationSection, DocumentationMetrics } from '../../lib/cores/quantum-documentation';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import mermaid from 'mermaid';

interface DocumentationViewerProps {
  docSystem: QuantumDocumentationSystem;
}

export const QuantumDocumentationViewer: React.FC<DocumentationViewerProps> = ({
  docSystem
}) => {
  const [sections, setSections] = useState<Map<string, DocumentationSection>>(new Map());
  const [metrics, setMetrics] = useState<DocumentationMetrics>({
    totalSections: 0,
    coverage: 0,
    lastUpdate: Date.now(),
    completionStatus: { draft: 0, review: 0, published: 0 }
  });
  const [activeCategory, setActiveCategory] = useState<DocumentationSection['category']>('core');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSections, setFilteredSections] = useState<DocumentationSection[]>([]);

  useEffect(() => {
    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
      securityLevel: 'loose'
    });

    // Subscribe to documentation updates
    const sectionsSub = docSystem.observeSections()
      .subscribe(newSections => {
        setSections(newSections);
        updateFilteredSections(newSections, searchQuery, activeCategory);
      });

    const metricsSub = docSystem.observeMetrics()
      .subscribe(setMetrics);

    return () => {
      sectionsSub.unsubscribe();
      metricsSub.unsubscribe();
    };
  }, [docSystem]);

  useEffect(() => {
    updateFilteredSections(sections, searchQuery, activeCategory);
  }, [searchQuery, activeCategory, sections]);

  const updateFilteredSections = (
    sections: Map<string, DocumentationSection>,
    query: string,
    category: DocumentationSection['category']
  ) => {
    let filtered = Array.from(sections.values())
      .filter(section => section.category === category);

    if (query) {
      const searchTerms = query.toLowerCase().split(' ');
      filtered = filtered.filter(section =>
        searchTerms.every(term =>
          section.title.toLowerCase().includes(term) ||
          section.content.toLowerCase().includes(term) ||
          section.tags.some(tag => tag.toLowerCase().includes(term))
        )
      );
    }

    setFilteredSections(filtered);
  };

  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusColor = (status: DocumentationSection['status']): string => {
    switch (status) {
      case 'published': return 'text-green-500';
      case 'review': return 'text-yellow-500';
      case 'draft': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <Card className="p-6 h-full">
      <div className="flex flex-col h-full space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Quantum System Documentation</h2>
          <div className="text-sm text-gray-500">
            Last Update: {formatTimestamp(metrics.lastUpdate)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Documentation Coverage</p>
            <div className="flex items-center space-x-2">
              <Progress value={metrics.coverage * 100} className="flex-1" />
              <span className="text-sm font-medium">
                {(metrics.coverage * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-2xl font-bold">{metrics.completionStatus.published}</div>
              <div className="text-sm text-gray-500">Published</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{metrics.completionStatus.review}</div>
              <div className="text-sm text-gray-500">In Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{metrics.completionStatus.draft}</div>
              <div className="text-sm text-gray-500">Draft</div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <Input
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline" onClick={() => setSearchQuery('')}>
            Clear
          </Button>
        </div>

        <Tabs
          value={activeCategory}
          onValueChange={(value) => setActiveCategory(value as DocumentationSection['category'])}
          className="flex-1"
        >
          <TabsList>
            <TabsTrigger value="core">Core</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 h-[600px] mt-4">
            {filteredSections.map(section => (
              <div key={section.id} className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{section.title}</h3>
                  <div className={`px-2 py-1 rounded ${getStatusColor(section.status)}`}>
                    {section.status.toUpperCase()}
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      code: ({ node, inline, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        if (match && match[1] === 'mermaid') {
                          return (
                            <div className="mermaid">
                              {String(children).replace(/\n$/, '')}
                            </div>
                          );
                        }
                        return inline ? (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        ) : (
                          <pre className={className} {...props}>
                            <code>{children}</code>
                          </pre>
                        );
                      }
                    }}
                  >
                    {section.content}
                  </ReactMarkdown>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {section.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  Version: {section.version} | Last Updated: {formatTimestamp(section.lastUpdated)}
                </div>
              </div>
            ))}
          </ScrollArea>
        </Tabs>
      </div>
    </Card>
  );
};
