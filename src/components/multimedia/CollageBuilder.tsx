
import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  Download, 
  Layers, 
  RotateCcw, 
  Move, 
  ZoomIn, 
  ZoomOut,
  Trash2
} from "lucide-react";

interface MediaElement {
  id: string;
  type: 'image' | 'text' | 'shape';
  src?: string;
  content?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  zIndex: number;
}

export const CollageBuilder: React.FC = () => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [elements, setElements] = useState<MediaElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newElement: MediaElement = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'image',
            src: e.target?.result as string,
            x: 50,
            y: 50,
            width: 200,
            height: 150,
            rotation: 0,
            opacity: 1,
            zIndex: elements.length
          };
          setElements(prev => [...prev, newElement]);
        };
        reader.readAsDataURL(file);
      }
    });

    toast({
      title: "Media Uploaded",
      description: `${files.length} file(s) added to collage`,
    });
  }, [elements.length, toast]);

  const addTextElement = useCallback(() => {
    const newElement: MediaElement = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'text',
      content: 'New Text',
      x: 100,
      y: 100,
      width: 150,
      height: 40,
      rotation: 0,
      opacity: 1,
      zIndex: elements.length
    };
    setElements(prev => [...prev, newElement]);
  }, [elements.length]);

  const updateElement = useCallback((id: string, updates: Partial<MediaElement>) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  }, []);

  const deleteElement = useCallback((id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent, element: MediaElement) => {
    e.preventDefault();
    setSelectedElement(element.id);
    setIsDragging(true);
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - element.x,
        y: e.clientY - rect.top - element.y
      });
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedElement) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;
      
      updateElement(selectedElement, { x: newX, y: newY });
    }
  }, [isDragging, selectedElement, dragOffset, updateElement]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const exportCollage = useCallback(async () => {
    // In a real implementation, this would render to canvas and export
    toast({
      title: "Export Started",
      description: "Collage is being processed for download",
    });
  }, [toast]);

  const selectedEl = elements.find(el => el.id === selectedElement);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Layers className="text-purple-500" size={20} />
              <span>Collage Builder</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2" size={16} />
                Upload Media
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={addTextElement}
              >
                Add Text
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportCollage}
              >
                <Download className="mr-2" size={16} />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Canvas Area */}
            <div className="lg:col-span-3">
              <div
                ref={canvasRef}
                className="relative w-full h-96 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {elements.map((element) => (
                  <div
                    key={element.id}
                    className={`absolute cursor-move select-none ${
                      selectedElement === element.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    style={{
                      left: element.x,
                      top: element.y,
                      width: element.width,
                      height: element.height,
                      transform: `rotate(${element.rotation}deg)`,
                      opacity: element.opacity,
                      zIndex: element.zIndex
                    }}
                    onMouseDown={(e) => handleMouseDown(e, element)}
                  >
                    {element.type === 'image' && element.src && (
                      <img
                        src={element.src}
                        alt="Collage element"
                        className="w-full h-full object-cover rounded"
                        draggable={false}
                      />
                    )}
                    {element.type === 'text' && (
                      <div className="w-full h-full flex items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded p-2">
                        <span className="text-sm font-medium">{element.content}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Properties Panel */}
            <div className="space-y-4">
              {selectedEl ? (
                <>
                  <h3 className="font-semibold">Element Properties</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Position X</label>
                      <Input
                        type="number"
                        value={selectedEl.x}
                        onChange={(e) => updateElement(selectedEl.id, { x: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Position Y</label>
                      <Input
                        type="number"
                        value={selectedEl.y}
                        onChange={(e) => updateElement(selectedEl.id, { y: parseInt(e.target.value) || 0 })}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Width</label>
                      <Input
                        type="number"
                        value={selectedEl.width}
                        onChange={(e) => updateElement(selectedEl.id, { width: parseInt(e.target.value) || 0 })}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Height</label>
                      <Input
                        type="number"
                        value={selectedEl.height}
                        onChange={(e) => updateElement(selectedEl.id, { height: parseInt(e.target.value) || 0 })}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Rotation: {selectedEl.rotation}°</label>
                      <Slider
                        value={[selectedEl.rotation]}
                        onValueChange={([value]) => updateElement(selectedEl.id, { rotation: value })}
                        min={0}
                        max={360}
                        step={1}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Opacity: {Math.round(selectedEl.opacity * 100)}%</label>
                      <Slider
                        value={[selectedEl.opacity]}
                        onValueChange={([value]) => updateElement(selectedEl.id, { opacity: value })}
                        min={0}
                        max={1}
                        step={0.01}
                      />
                    </div>

                    {selectedEl.type === 'text' && (
                      <div>
                        <label className="text-sm font-medium">Text Content</label>
                        <Input
                          value={selectedEl.content || ''}
                          onChange={(e) => updateElement(selectedEl.id, { content: e.target.value })}
                        />
                      </div>
                    )}

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteElement(selectedEl.id)}
                      className="w-full"
                    >
                      <Trash2 className="mr-2" size={16} />
                      Delete Element
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Layers className="mx-auto mb-2" size={32} />
                  <p>Select an element to edit properties</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default CollageBuilder;
