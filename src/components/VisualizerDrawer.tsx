import React, { useState } from 'react';
import { X, RotateCw, Sparkles, AlertCircle } from 'lucide-react';
import { Plot } from '../types';

interface VisualizerDrawerProps {
  plot: Plot | null;
  isOpen: boolean;
  onClose: () => void;
  onEnquire: (plot: Plot) => void;
}

export default function VisualizerDrawer({ plot, isOpen, onClose, onEnquire }: VisualizerDrawerProps) {
  const [orientation, setOrientation] = useState<'EAST' | 'WEST' | 'NORTH' | 'SOUTH'>('EAST');
  const [showZoningOverlay, setShowZoningOverlay] = useState(true);

  if (!isOpen || !plot) return null;

  // Derive setback values dynamically
  const isOversized = plot.width >= 60;
  const frontSetback = isOversized ? 18 : 15;
  const sideSetback = isOversized ? 15 : 10;
  const rearSetback = isOversized ? 12 : 10;

  // Calculate coordinates inside a standard 400x400 SVG box representing the plot boundaries
  // Plot bounding box
  const plotWidth = 320;
  const plotHeight = 320;
  const startX = 40;
  const startY = 40;

  // Build setbacks offsets scaled inside our 320px SVG frame
  // Scale factor based on plot proportions
  const scaleX = plotWidth / plot.width;
  const scaleY = plotHeight / plot.height;

  const fSetbackPx = frontSetback * scaleY;
  const sSetbackPx = sideSetback * scaleX;
  const rSetbackPx = rearSetback * scaleY;

  // Permitted buildable rectangle bounds
  const buildX = startX + sSetbackPx;
  const buildY = startY + fSetbackPx;
  const buildWidth = plotWidth - (2 * sSetbackPx);
  const buildHeight = plotHeight - fSetbackPx - rSetbackPx;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end font-sans">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#090e1c]/80 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-xl bg-[#161b2b] h-full shadow-2xl border-l border-white/5 flex flex-col justify-between z-10 animate-fade-in text-left">
        
        {/* Header Block */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-[#1a1f2f]">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#ffc02c] font-bold">CAD Blueprint visualizer</span>
            <h3 className="font-serif text-lg md:text-xl text-white font-normal mt-0.5">
              Technical Layout: {plot.id}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#9E9A90] hover:text-[#ffc02c] rounded-full hover:bg-white/5 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CAD Canvas Area & interactive state controls */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
          
          {/* Interactive Parameters Selector Panel */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left">
              <span className="block text-[10px] uppercase tracking-wider text-[#9E9A90] font-medium">Layout Entrance Direction</span>
              <div className="flex gap-1 bg-[#0e1322] p-1 rounded-lg border border-white/5">
                {(['EAST', 'WEST', 'NORTH', 'SOUTH'] as const).map((dir) => (
                  <button
                    key={dir}
                    onClick={() => setOrientation(dir)}
                    className={`flex-1 py-1.5 text-[9px] font-bold uppercase rounded transition-all ${
                      orientation === dir 
                        ? 'bg-[#ffc02c] text-[#402d00]' 
                        : 'text-[#d4c5ad] hover:text-[#ffc02c]'
                    }`}
                  >
                    {dir[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <span className="block text-[10px] uppercase tracking-wider text-[#9E9A90] font-medium">Structural Overlay</span>
              <button
                onClick={() => setShowZoningOverlay(!showZoningOverlay)}
                className={`w-full py-2 px-3 text-[10px] font-bold uppercase rounded border transition-all flex items-center justify-center gap-1.5 ${
                  showZoningOverlay 
                    ? 'border-[#ffc02c]/40 text-[#ffc02c] bg-[#ffc02c]/5' 
                    : 'border-white/10 text-[#9E9A90] hover:border-white/20'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {showZoningOverlay ? 'Setback lines active' : 'Raw dimensions only'}
              </button>
            </div>
          </div>

          {/* Blueprint Drawing Container */}
          <div className="bg-[#0e1322] p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden" style={{ minHeight: '380px' }}>
            
            {/* Grid Line Visuals */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,192,44,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,192,44,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Custom SVG Drawing */}
            <svg 
              viewBox="0 0 400 400" 
              className="w-full max-w-[340px] h-[340px] z-10 transition-transform duration-500"
              style={{
                transform: `rotate(${
                  orientation === 'EAST' ? 0 : orientation === 'NORTH' ? 90 : orientation === 'WEST' ? 180 : 270
                }deg)`
              }}
            >
              <defs>
                <pattern id="diagonalHatch" width="8" h="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#ffc02c" strokeWidth="0.8" opacity="0.15" />
                </pattern>
              </defs>

              {/* 1. Main Plot Borders */}
              <rect 
                x={startX} 
                y={startY} 
                width={plotWidth} 
                height={plotHeight} 
                fill="none" 
                stroke="#d4c5ad" 
                strokeWidth="2.5" 
                strokeDasharray="2,2" 
                opacity="0.35"
              />

              {/* Outside Labels showing dimensions lines */}
              {/* Width Line */}
              <line x1={startX} y1={startY - 15} x2={startX + plotWidth} y2={startY - 15} stroke="#ffc02c" strokeWidth="1" opacity="0.6"/>
              <text x={startX + plotWidth/2} y={startY - 22} fill="#ffc02c" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="0.05em">
                {plot.dimensions.split('x')[0].trim()} BOUNDARY
              </text>

              {/* Height Line */}
              <line x1={startX - 15} y1={startY} x2={startX - 15} y2={startY + plotHeight} stroke="#ffc02c" strokeWidth="1" opacity="0.6"/>
              <text x={startX - 22} y={startY + plotHeight/2} fill="#ffc02c" fontSize="10" fontFamily="monospace" textAnchor="middle" transform={`rotate(-90, ${startX - 22}, ${startY + plotHeight/2})`} letterSpacing="0.05em">
                {plot.dimensions.split('x')[1].trim()} BOUNDARY
              </text>

              {/* 2. Buildable Footprint Area with setbacks */}
              {showZoningOverlay && buildWidth > 0 && buildHeight > 0 && (
                <>
                  {/* Hatched Fill for valid building envelope */}
                  <rect 
                    x={buildX} 
                    y={buildY} 
                    width={buildWidth} 
                    height={buildHeight} 
                    fill="url(#diagonalHatch)" 
                    stroke="#ffc02c" 
                    strokeWidth="2" 
                    opacity="0.9"
                  />

                  {/* Setbacks Overlay Text indicator lines */}
                  {/* Front Setback */}
                  <line x1={buildX} y1={startY + fSetbackPx} x2={buildX + buildWidth} y2={startY + fSetbackPx} stroke="#e01212" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.7" />
                  <text x={buildX + buildWidth/2} y={startY + fSetbackPx - 6} fill="#e01212" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    FRONT SETBACK: {frontSetback} FT
                  </text>

                  {/* Rear Setback */}
                  <line x1={buildX} y1={startY + plotHeight - rSetbackPx} x2={buildX + buildWidth} y2={startY + plotHeight - rSetbackPx} stroke="#e01212" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.7" />
                  <text x={buildX + buildWidth/2} y={startY + plotHeight - rSetbackPx + 14} fill="#e01212" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    REAR SETBACK: {rearSetback} FT
                  </text>

                  {/* Core Build Tag */}
                  <rect x={startX + plotWidth/2 - 50} y={startY + fSetbackPx + buildHeight/2 - 12} width="100" height="24" rx="3" fill="#ffc02c" opacity="0.9" />
                  <text x={startX + plotWidth/2} y={startY + fSetbackPx + buildHeight/2 + 4} fill="#402d00" fontSize="10" fontWeight="bold" textAnchor="middle">
                    BUILD AREA
                  </text>
                </>
              )}

              {/* Orientation Compass Marker inside vector */}
              <g transform="translate(340, 340)" opacity="0.7">
                <circle cx="0" cy="0" r="14" fill="#0e1322" stroke="#ffc02c" strokeWidth="1"/>
                <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffc02c" strokeWidth="1"/>
                <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffc02c" strokeWidth="1"/>
                <text x="0" y="-16" fill="#ffc02c" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">N</text>
              </g>
            </svg>

            {/* Static orientation compass direction text helper overrides rotate transforms */}
            <div className="absolute bottom-3 left-4 text-[10px] font-mono text-[#d4c5ad]">
              Interactive Rotation Matrix: <span className="text-[#ffc02c] font-bold">Vastu {orientation} Facing</span>
            </div>
          </div>

          {/* Technical Specifications Notes Box */}
          <div className="bg-[#1a1f2f] p-6 rounded-xl border border-white/5 space-y-4 text-xs">
            <span className="font-serif text-white font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#ffc02c]" /> Zoning Ordinance Rules
            </span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div>
                <span className="block text-[10.5px] uppercase tracking-wide text-[#9E9A90]">Maximum F.A.R</span>
                <span className="font-mono text-xs font-semibold text-white">{plot.maxFar}</span>
              </div>
              <div>
                <span className="block text-[10.5px] uppercase tracking-wide text-[#9E9A90]">Build Envelope</span>
                <span className="font-mono text-xs font-semibold text-white">4 Levels max height</span>
              </div>
              <div>
                <span className="block text-[10.5px] uppercase tracking-wide text-[#9E9A90]">Vastu Class</span>
                <span className="font-mono text-xs font-semibold text-white">Uchha Entrance Level</span>
              </div>
              <div>
                <span className="block text-[10.5px] uppercase tracking-wide text-[#9E9A90]">Compound Clearance</span>
                <span className="font-mono text-xs font-semibold text-white">100% Gated compound clear</span>
              </div>
            </div>
            <p className="border-t border-white/5 pt-3 leading-relaxed text-[#9E9A90] text-[11px]">
              Setback rules ensure compliance with local Telangana Town Planning acts. Ideal for securing private setbacks without sacrificing interior premium courtyard volumes.
            </p>
          </div>
        </div>

        {/* Footer Enquiry capturing inside Drawer */}
        <div className="p-6 bg-[#1a1f2f] border-t border-white/5 flex gap-4">
          <button
            onClick={() => onEnquire(plot)}
            className="flex-1 bg-[#ffc02c] hover:bg-[#C9841C] text-[#402d00] py-3.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300"
          >
            Confirm Inquiry: {plot.id}
          </button>
        </div>

      </div>
    </div>
  );
}
