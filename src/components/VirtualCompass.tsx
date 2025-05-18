
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CompassIcon, MoveIcon } from "lucide-react";

interface VirtualCompassProps {
  currentDimension: number;
  onDimensionChange: (dimension: number) => void;
  maxDimension: number;
}

const VirtualCompass: React.FC<VirtualCompassProps> = ({
  currentDimension,
  onDimensionChange,
  maxDimension
}) => {
  const [rotating, setRotating] = useState(false);
  const [calibrating, setCalibrating] = useState(false);
  
  // Handle compass rotation
  const handleRotate = () => {
    setRotating(true);
    
    // Simulate dimensional calibration
    setTimeout(() => {
      setRotating(false);
      setCalibrating(true);
      
      setTimeout(() => {
        setCalibrating(false);
        // Choose a random dimension or go to next if current is under max
        const nextDimension = 
          currentDimension < maxDimension 
            ? currentDimension + 1 
            : Math.max(1, Math.floor(Math.random() * maxDimension));
            
        onDimensionChange(nextDimension);
      }, 1500);
    }, 2000);
  };
  
  return (
    <div className="relative w-64 h-64">
      {/* Background grid */}
      <div className="absolute inset-0 rounded-full quantum-grid opacity-30"></div>
      
      {/* Outer ring */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full border-2 border-quantum-purple dimensional-border",
          rotating ? "animate-rotate-slow" : "",
          calibrating ? "animate-pulse-subtle" : ""
        )}
      ></div>
      
      {/* Middle ring */}
      <div 
        className={cn(
          "absolute inset-8 rounded-full border border-quantum-blue dimensional-border",
          rotating ? "animate-rotate-slow duration-9000" : ""
        )}
      ></div>
      
      {/* Inner ring */}
      <div 
        className={cn(
          "absolute inset-16 rounded-full border border-quantum-teal dimensional-border",
          rotating ? "animate-rotate-slow duration-6000" : ""
        )}
      ></div>
      
      {/* Center */}
      <div 
        className={cn(
          "absolute inset-0 m-auto w-16 h-16 rounded-full bg-quantum-dark flex items-center justify-center cursor-pointer hover:scale-105 transition-transform",
          "border border-quantum-gold dimensional-border",
          calibrating ? "animate-pulse-subtle" : ""
        )}
        onClick={handleRotate}
      >
        {rotating || calibrating ? (
          <MoveIcon className="animate-spin text-quantum-gold" />
        ) : (
          <CompassIcon className="text-quantum-gold" />
        )}
      </div>
      
      {/* Dimension markers */}
      {Array.from({ length: maxDimension }).map((_, index) => {
        const dimension = index + 1;
        const angle = (dimension - 1) * (360 / maxDimension);
        const isActive = dimension === currentDimension;
        
        return (
          <div
            key={dimension}
            className={cn(
              "absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2",
              isActive ? "bg-quantum-gold animate-pulse-subtle" : "bg-quantum-purple/50"
            )}
            style={{
              left: `${50 + 45 * Math.cos((angle * Math.PI) / 180)}%`,
              top: `${50 + 45 * Math.sin((angle * Math.PI) / 180)}%`
            }}
          >
            {isActive && (
              <span className="absolute top-5 left-0 text-xs font-bold text-quantum-gold whitespace-nowrap">
                {dimension}D
              </span>
            )}
          </div>
        );
      })}
      
      {/* Status text */}
      <div className="absolute -bottom-10 left-0 right-0 text-center">
        {rotating && <p className="text-quantum-blue">Shifting dimensions...</p>}
        {calibrating && <p className="text-quantum-teal">Calibrating reality...</p>}
        {!rotating && !calibrating && (
          <p className="text-quantum-purple">
            {currentDimension}D | Tap center to shift
          </p>
        )}
      </div>
    </div>
  );
};

export default VirtualCompass;
