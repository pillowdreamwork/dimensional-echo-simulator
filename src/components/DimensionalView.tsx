
import React, { useEffect, useRef, useState } from "react";
import { dimensionProperties, dimensionGlyphs, generateDimensionalEffect } from "@/utils/quantum";

interface DimensionalViewProps {
  dimension: number;
  isTransitioning: boolean;
}

const DimensionalView: React.FC<DimensionalViewProps> = ({ 
  dimension,
  isTransitioning 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [effect, setEffect] = useState<string>("");
  
  // Generate a new effect when dimension changes
  useEffect(() => {
    if (!isTransitioning) {
      setEffect(generateDimensionalEffect(dimension));
    }
  }, [dimension, isTransitioning]);
  
  // Draw dimensional visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw based on current dimension
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Common properties
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#9b87f5"; // quantum-purple
    
    // Create visualization based on dimension
    switch (dimension) {
      case 1: // 1D - Line
        ctx.beginPath();
        ctx.moveTo(centerX - 100, centerY);
        ctx.lineTo(centerX + 100, centerY);
        ctx.stroke();
        break;
        
      case 2: // 2D - Square
        ctx.beginPath();
        ctx.rect(centerX - 70, centerY - 70, 140, 140);
        ctx.stroke();
        break;
        
      case 3: // 3D - Cube (simple perspective)
        // Front face
        ctx.beginPath();
        ctx.rect(centerX - 50, centerY - 50, 100, 100);
        ctx.stroke();
        
        // Back face
        ctx.beginPath();
        ctx.rect(centerX - 30, centerY - 30, 100, 100);
        ctx.stroke();
        
        // Connecting lines
        ctx.beginPath();
        ctx.moveTo(centerX - 50, centerY - 50);
        ctx.lineTo(centerX - 30, centerY - 30);
        ctx.moveTo(centerX + 50, centerY - 50);
        ctx.lineTo(centerX + 70, centerY - 30);
        ctx.moveTo(centerX - 50, centerY + 50);
        ctx.lineTo(centerX - 30, centerY + 70);
        ctx.moveTo(centerX + 50, centerY + 50);
        ctx.lineTo(centerX + 70, centerY + 70);
        ctx.stroke();
        break;
        
      case 4: // 4D - Time (Tesseract with animation)
        // Draw as cube with shadow/echo
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.rect(centerX - 60, centerY - 60, 120, 120);
        ctx.stroke();
        
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.rect(centerX - 55, centerY - 55, 110, 110);
        ctx.stroke();
        
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.rect(centerX - 50, centerY - 50, 100, 100);
        ctx.stroke();
        break;
        
      default: // 5D+ - Abstract shapes
        // Create complex patterns for higher dimensions
        const sides = dimension + 2;
        const radius = 80;
        
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
          const angle = (i / sides) * Math.PI * 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          
          // For higher dimensions, create inner connections
          if (dimension > 5) {
            const innerRadius = radius * 0.5;
            const innerAngle = ((i + 0.5) / sides) * Math.PI * 2;
            const innerX = centerX + innerRadius * Math.cos(innerAngle);
            const innerY = centerY + innerRadius * Math.sin(innerAngle);
            
            ctx.moveTo(x, y);
            ctx.lineTo(innerX, innerY);
          }
        }
        ctx.closePath();
        ctx.stroke();
        
        // Additional patterns for even higher dimensions
        if (dimension >= 8) {
          ctx.beginPath();
          for (let i = 0; i < sides; i++) {
            const angle1 = (i / sides) * Math.PI * 2;
            const angle2 = ((i + Math.floor(sides / 2)) % sides / sides) * Math.PI * 2;
            
            const x1 = centerX + radius * Math.cos(angle1);
            const y1 = centerY + radius * Math.sin(angle1);
            const x2 = centerX + radius * Math.cos(angle2);
            const y2 = centerY + radius * Math.sin(angle2);
            
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
          ctx.stroke();
        }
        
        break;
    }
    
    // Add transition effects if transitioning
    if (isTransitioning) {
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0, centerX, centerY, 150
      );
      gradient.addColorStop(0, "rgba(14, 165, 233, 0.5)");
      gradient.addColorStop(1, "rgba(14, 165, 233, 0)");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
  }, [dimension, isTransitioning]);

  return (
    <div className="relative w-full h-64 flex flex-col items-center">
      <div className="mb-2 text-center">
        <h3 className="text-lg font-bold text-quantum-blue">
          {dimensionProperties[dimension as keyof typeof dimensionProperties]?.name || "Unknown"} Dimension
        </h3>
        <p className="text-sm text-quantum-purple opacity-80">
          {dimensionProperties[dimension as keyof typeof dimensionProperties]?.description || ""}
        </p>
      </div>
      
      <div className="relative w-full h-full flex justify-center">
        <canvas
          ref={canvasRef}
          className={`w-full h-full ${isTransitioning ? "animate-dimension-shift" : ""}`}
        />
        
        <div className="absolute top-4 left-4">
          <div className="glyph-container w-10 h-10 bg-quantum-dark border border-quantum-purple rounded-full flex items-center justify-center text-xl text-quantum-gold">
            {dimensionGlyphs[dimension as keyof typeof dimensionGlyphs] || "?"}
          </div>
        </div>
      </div>
      
      {effect && !isTransitioning && (
        <div className="mt-2 text-center text-sm italic text-quantum-teal animate-pulse-subtle">
          {effect}
        </div>
      )}
    </div>
  );
};

export default DimensionalView;
