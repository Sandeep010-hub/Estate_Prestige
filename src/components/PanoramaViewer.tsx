import React, { useState, useEffect, useRef } from 'react';
import { X, RotateCcw, Play, Pause, Compass, Sun, Eye, Info, Volume2, VolumeX, CheckCircle, Flame } from 'lucide-react';
import { Plot } from '../types';

interface PanoramaViewerProps {
  isOpen: boolean;
  onClose: () => void;
  plot: Plot;
  propertyName: string;
  isDubai: boolean;
}

interface Hotspot {
  id: string;
  label: string;
  angle: number; // 0 to 360 degrees
  distance: string;
  description: string;
}

export default function PanoramaViewer({ isOpen, onClose, plot, propertyName, isDubai }: PanoramaViewerProps) {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<'day' | 'sunset' | 'blueprint'>('sunset');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 1 to 1.5

  const lastMouseX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRequestRef = useRef<number | null>(null);

  // Panorama width constant (the virtual wrap-around boundary)
  const PANORAMA_WIDTH = 2400;

  // Derive scenic setting assets based on property/plot selection
  const isWaterfront = plot.id.startsWith('Plot #P-');
  const isForest = plot.id.startsWith('Plot #B-');
  const isDubaiHills = plot.id.startsWith('Plot #H-');

  let panoramaImage = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=80';
  let backdropTheme = 'Prestige Horizon';
  let description = 'Continuous 360° Site View showing pristine, build-ready topography and local connections.';

  if (isWaterfront) {
    panoramaImage = activeTab === 'day' 
      ? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80' // Beach Day
      : 'https://images.unsplash.com/photo-1468413253725-0d5181026217?auto=format&fit=crop&w=2400&q=80'; // Beach Sunset
    backdropTheme = 'Placid Turquoise Cove';
    description = 'Waterfront sand parcel with full direct marine shoreline access and crystal turquoise waters.';
  } else if (isForest) {
    panoramaImage = activeTab === 'day'
      ? 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=80' // Woodland Day
      : 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2400&q=80'; // Botanical Sunset
    backdropTheme = 'Eco-Botanical Forest Canopy';
    description = 'Thickly wooded private sanctuary plot bordered by desert-adapted flora and natural streams.';
  } else if (isDubaiHills) {
    panoramaImage = activeTab === 'day'
      ? 'https://images.unsplash.com/photo-1588880331179-bc9b93a8c5c8?auto=format&fit=crop&w=2400&q=80' // Park / Green field Day
      : 'https://images.unsplash.com/photo-1545466835-752157521fa9?auto=format&fit=crop&w=2400&q=80'; // Golf Sunset
    backdropTheme = 'Signature Golf Course Ridge';
    description = 'Lush, manicured master development overlooking the championship fairways and skyline.';
  } else {
    // Hyderabad Gated Communes (Golden Fields, Horizon Heights, Emerald Estates)
    panoramaImage = activeTab === 'day'
      ? 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2400&q=80' // Farmland Day
      : 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=80'; // Farmland Sunset
    backdropTheme = 'Gated Ridge Estates Valley';
    description = 'High-altitude leveled development on premium clay foundations overlooking prime IT skyline channels.';
  }

  // Set standard geographic hotspots
  const hotspots: Hotspot[] = isWaterfront 
    ? [
        { id: 'hs-1', label: 'Beachside Club', angle: 45, distance: '120m', description: 'Exclusive residential club with infinity pools and private dining berths.' },
        { id: 'hs-2', label: 'East Marina Gate', angle: 165, distance: '340m', description: 'Gated shoreline checkpoint equipped with high-security vessel monitoring.' },
        { id: 'hs-3', label: 'Downtown Skyline View', angle: 280, distance: 'Sightline', description: 'Unobstructed view of Burj Al Arab & Dubai Marina skyline across the fronds.' }
      ]
    : isForest
    ? [
        { id: 'hs-1', label: 'Waterway Trail', angle: 80, distance: '45m', description: 'Freshwater stream and dense forest pathways tailored for cycling.' },
        { id: 'hs-2', label: 'Al Barari Oasis Plaza', angle: 190, distance: '220m', description: 'High-end organic food markets, luxury spa retreats, and nursery structures.' },
        { id: 'hs-3', label: 'Protected Eco reserve', angle: 305, distance: 'Sightline', description: 'Non-building woodland zone protecting mature eucalyptus trees.' }
      ]
    : isDubaiHills
    ? [
        { id: 'hs-1', label: 'Dubai Hills Clubhouse', angle: 60, distance: '180m', description: 'Championship 18-hole club featuring dining, fitness suites, and social hubs.' },
        { id: 'hs-2', label: 'Central Park Greenery', angle: 175, distance: '90m', description: 'Over 180,000 square meters of green park space with children activity sectors.' },
        { id: 'hs-3', label: 'Highway Integration', angle: 290, distance: '450m', description: 'Direct Al Khail Road junctions ensuring extremely swift downtown connectivity.' }
      ]
    : [
        { id: 'hs-1', label: 'Sector Clubhouse & Gym', angle: 50, distance: '150m', description: 'State-of-the-art amenity block prioritizing thermal swimming and squash.' },
        { id: 'hs-2', label: 'Prestige Boulevard Loop', angle: 155, distance: '60m', description: 'Dual-carriageway internal asphalt arteries bounded by decorative planters.' },
        { id: 'hs-3', label: 'Outer Ring Road Link', angle: 260, distance: '1.2km', description: 'High-speed transit egress tying directly into Hyderabad airport corridors.' }
      ];

  // Auto-rotation engine
  useEffect(() => {
    if (!isPlaying || isDragging) return;

    const animateRotation = () => {
      setScrollOffset(prev => (prev + 0.5) % PANORAMA_WIDTH);
      rotationRequestRef.current = requestAnimationFrame(animateRotation);
    };

    rotationRequestRef.current = requestAnimationFrame(animateRotation);
    return () => {
      if (rotationRequestRef.current) cancelAnimationFrame(rotationRequestRef.current);
    };
  }, [isPlaying, isDragging]);

  if (!isOpen) return null;

  // Handle Dragging / Gesture Control
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouseX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMouseX.current;
    
    // Smooth inverse dragging
    setScrollOffset(prev => {
      let next = prev - deltaX * 1.5;
      if (next < 0) next += PANORAMA_WIDTH;
      return next % PANORAMA_WIDTH;
    });
    
    lastMouseX.current = e.clientX;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch Support
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) {
      lastMouseX.current = e.touches[0].clientX;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !e.touches[0]) return;
    const deltaX = e.touches[0].clientX - lastMouseX.current;
    
    setScrollOffset(prev => {
      let next = prev - deltaX * 1.5;
      if (next < 0) next += PANORAMA_WIDTH;
      return next % PANORAMA_WIDTH;
    });
    
    lastMouseX.current = e.touches[0].clientX;
  };

  // Convert scroll offset to heading degrees (0 to 360)
  const currentDegrees = Math.round((scrollOffset / PANORAMA_WIDTH) * 360);

  // Derive Compass direction
  const getCompassDirection = (degrees: number) => {
    const sectors = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];
    const index = Math.round((degrees % 360) / 45);
    return sectors[index];
  };

  const resetView = () => {
    setScrollOffset(0);
    setSelectedHotspot(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      {/* Immersive Main Frame */}
      <div className="relative w-full max-w-6xl h-[90vh] md:h-[80vh] bg-[#090d1a] border border-[#ffc02c]/30 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        
        {/* TOP HUD BAR */}
        <div className="z-10 flex items-center justify-between p-4 bg-[#0e1322]/80 border-b border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ffc02c]/10 border border-[#ffc02c]/20 flex items-center justify-center">
              <Compass className="w-4 h-4 text-[#ffc02c] animate-pulse" />
            </div>
            <div className="text-left">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#ffc02c] font-bold block">
                IMMERSE EXCLUSIVE SITE AUDIT
              </span>
              <h2 className="text-sm md:text-base font-serif font-normal text-white">
                {plot.id} — 360° Panorama Viewer <span className="text-white/40">({propertyName})</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Ambient Track Indicator */}
            <button
              onClick={() => setSoundOn(!soundOn)}
              className={`p-2 rounded-lg border transition-all text-xs font-mono flex items-center gap-1.5 ${
                soundOn 
                  ? 'bg-[#ffc02c]/10 border-[#ffc02c]/40 text-[#ffc02c]' 
                  : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
              }`}
              title={soundOn ? 'Mute environmental drone' : 'Play peaceful ambient drone'}
            >
              {soundOn ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#ffc02c] animate-bounce" />
                  <span className="hidden sm:inline text-[9px]">Ambient Active</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[9px]">Ambient Off</span>
                </>
              )}
            </button>

            {/* Exit button */}
            <button
              onClick={onClose}
              className="p-2 text-[#9E9A90] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 360 PANORAMA CAMERA VIEWPORT */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUpOrLeave}
          className={`relative flex-1 bg-black overflow-hidden select-none select-none touch-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {/* Audio Loop Simulator */}
          {soundOn && (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur px-3 py-1.5 rounded-full border border-[#ffc02c]/20 flex items-center gap-2 text-[9px] font-mono select-none pointer-events-none text-[#ffc02c] z-10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffc02c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffc02c]"></span>
              </span>
              <span>Playing site wind drafts & birds chirp drone (synthesized)</span>
            </div>
          )}

          {/* Panoramic Image Canvas with Wrap-Around tiling */}
          <div 
            className="absolute top-0 bottom-0 flex transition-transform duration-75 ease-out"
            style={{ 
              width: `${PANORAMA_WIDTH * 3}px`,
              transform: `translate3d(-${scrollOffset}px, 0, 0) scale(${zoomLevel})`,
              transformOrigin: 'center center'
            }}
          >
            {/* Tile 1 */}
            <div className="relative h-full" style={{ width: `${PANORAMA_WIDTH}px` }}>
              <img 
                src={panoramaImage} 
                alt="Panorama tile 1" 
                className="w-full h-full object-cover select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              {/* Hotspots mapped onto Tile 1 coords */}
              {hotspots.map((hs) => {
                const hsX = (hs.angle / 360) * PANORAMA_WIDTH;
                return (
                  <button
                    key={`t1-${hs.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHotspot(hs);
                    }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 group z-20`}
                    style={{ left: `${hsX}px`, top: '48%' }}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute inline-flex h-12 w-12 rounded-full col-span-1 bg-[#ffc02c]/10 border border-[#ffc02c]/30 animate-ping" />
                      <div className="relative bg-[#0e1322]/90 border border-[#ffc02c]/80 text-[#ffc02c] hover:bg-[#ffc02c] hover:text-black py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-lg transition-all duration-300 transform group-hover:scale-105 active:scale-95">
                        <Eye className="w-3.5 h-3.5 animate-pulse" />
                        <span className="text-[10px] font-sans font-semibold uppercase tracking-wider">{hs.label}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Tile 2 (Center) */}
            <div className="relative h-full" style={{ width: `${PANORAMA_WIDTH}px` }}>
              <img 
                src={panoramaImage} 
                alt="Panorama tile 2" 
                className="w-full h-full object-cover select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              {/* Hotspots mapped onto Tile 2 coords */}
              {hotspots.map((hs) => {
                const hsX = (hs.angle / 360) * PANORAMA_WIDTH;
                return (
                  <button
                    key={`t2-${hs.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHotspot(hs);
                    }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 group z-20`}
                    style={{ left: `${hsX}px`, top: '48%' }}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute inline-flex h-12 w-12 rounded-full col-span-1 bg-[#ffc02c]/10 border border-[#ffc02c]/30 animate-ping" />
                      <div className="relative bg-[#0e1322]/90 border border-[#ffc02c]/80 text-[#ffc02c] hover:bg-[#ffc02c] hover:text-black py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-lg transition-all duration-300 transform group-hover:scale-105 active:scale-95">
                        <Eye className="w-3.5 h-3.5 animate-pulse" />
                        <span className="text-[10px] font-sans font-semibold uppercase tracking-wider">{hs.label}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Tile 3 */}
            <div className="relative h-full" style={{ width: `${PANORAMA_WIDTH}px` }}>
              <img 
                src={panoramaImage} 
                alt="Panorama tile 3" 
                className="w-full h-full object-cover select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              {/* Hotspots mapped onto Tile 3 coords */}
              {hotspots.map((hs) => {
                const hsX = (hs.angle / 360) * PANORAMA_WIDTH;
                return (
                  <button
                    key={`t3-${hs.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHotspot(hs);
                    }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 group z-20`}
                    style={{ left: `${hsX}px`, top: '48%' }}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute inline-flex h-12 w-12 rounded-full col-span-1 bg-[#ffc02c]/10 border border-[#ffc02c]/30 animate-ping" />
                      <div className="relative bg-[#0e1322]/90 border border-[#ffc02c]/80 text-[#ffc02c] hover:bg-[#ffc02c] hover:text-black py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-lg transition-all duration-300 transform group-hover:scale-105 active:scale-95">
                        <Eye className="w-3.5 h-3.5 animate-pulse" />
                        <span className="text-[10px] font-sans font-semibold uppercase tracking-wider">{hs.label}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DRAG ASSISTANCE GUIDE SHIELD ON LOAD */}
          <div className="absolute inset-x-0 bottom-16 select-none pointer-events-none flex justify-center z-10 animate-bounce">
            <span className="bg-[#0e1322]/80 backdrop-blur border border-white/10 px-4 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-wider text-white/70">
              ↔ Click and Drag or Swipe anywhere to pan 360°
            </span>
          </div>

          {/* HOTSPOT / PIN DETAIL POPOVER */}
          {selectedHotspot && (
            <div className="absolute bottom-6 left-6 max-w-xs bg-[#0e1322]/95 border border-[#ffc02c]/40 p-4 rounded-xl shadow-xl z-30 fade-up text-left">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-[9px] uppercase font-mono bg-[#ffc02c]/15 text-[#ffc02c] px-2 py-0.5 rounded font-bold">
                    LANDMARK PIN
                  </span>
                  <h4 className="text-xs font-semibold text-white mt-1 uppercase tracking-wider">
                    {selectedHotspot.label}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="text-white/40 hover:text-white p-0.5 rounded bg-white/5 hover:bg-white/10"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="flex gap-4 font-mono text-[9px] text-[#9E9A90] border-b border-white/5 pb-2 mb-2">
                <div>
                  <span>EST. RANGE: </span>
                  <span className="text-white font-semibold">{selectedHotspot.distance}</span>
                </div>
                <div>
                  <span>BEARING: </span>
                  <span className="text-white font-semibold">{selectedHotspot.angle}° {getCompassDirection(selectedHotspot.angle)}</span>
                </div>
              </div>
              <p className="text-[10.5px] leading-relaxed text-white/70 font-sans">
                {selectedHotspot.description}
              </p>
            </div>
          )}

          {/* COMPASS AND ORIENTATION HUD OVERLAY */}
          <div className="absolute top-6 left-6 bg-[#0e1322]/80 backdrop-blur border border-white/10 px-4 py-3 rounded-xl flex items-center gap-4 text-left z-10 pointer-events-auto select-none">
            {/* Minimal SVG Radar */}
            <div className="relative w-12 h-12 rounded-full border border-[#ffc02c]/20 bg-black/40 overflow-hidden flex items-center justify-center">
              {/* Radar Grid Lines */}
              <div className="absolute inset-0 border-t border-b border-white/5" />
              <div className="absolute inset-0 border-l border-r border-white/5" />
              
              {/* Sweep Indicator line */}
              <div 
                className="absolute top-1/2 left-1/2 w-full h-[1px] bg-gradient-to-r from-transparent to-[#ffc02c] origin-left transition-transform duration-75"
                style={{ transform: `rotate(${currentDegrees - 90}deg) translateY(-50%)` }}
              />
              
              {/* Spot indicating center */}
              <div className="w-1.5 h-1.5 rounded-full bg-white relative z-10" />
            </div>

            <div>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#9E9A90] block">
                GRID HEADING
              </span>
              <div className="flex items-baseline gap-1 font-mono">
                <span className="text-lg font-bold text-[#ffc02c]">{currentDegrees}°</span>
                <span className="text-xs font-semibold text-white/50">{getCompassDirection(currentDegrees)}</span>
              </div>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#ffc02c] block mt-0.5">
                {backdropTheme}
              </span>
            </div>
          </div>

          {/* VIEWPORT ZOOMS & CONTROLS RAIL */}
          <div className="absolute bottom-6 right-6 bg-[#0e1322]/80 backdrop-blur border border-white/10 p-2.5 rounded-xl flex items-center gap-3 z-10 pointer-events-auto shadow-lg">
            {/* Auto Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded-lg border transition-all ${
                isPlaying 
                  ? 'bg-[#ffc02c] text-[#402d00] border-[#ffc02c]' 
                  : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
              }`}
              title={isPlaying ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* Scale Zoom Controls */}
            <button
              onClick={() => setZoomLevel(prev => (prev === 1 ? 1.35 : 1))}
              className={`p-2 rounded-lg border text-[10px] font-mono transition-all ${
                zoomLevel > 1 
                  ? 'bg-white text-[#0e1322] border-white font-bold' 
                  : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
              }`}
            >
              {zoomLevel > 1 ? 'Zoom: 1.3x' : 'Zoom: 1.0x'}
            </button>

            {/* Recenter Camera Direction */}
            <button
              onClick={resetView}
              className="p-2 text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
              title="Reset View to North (0°)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* BOTTOM VISUAL CONTROL CONSOLE & SPECS */}
        <div className="p-6 bg-[#0e1322] border-t border-white/5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          <div className="text-left space-y-1.5 max-w-lg md:max-w-xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Sector Environmental Profile:
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#ffc02c]/10 text-[#ffc02c] border border-[#ffc02c]/20 font-bold">
                <Flame className="w-3 h-3" /> {getCompassDirection(currentDegrees)}-Oriented Prime View
              </span>
            </div>
            <p className="text-[11.5px] leading-relaxed text-[#9E9A90]">
              {description} Use the environmental daylight switches to examine how late-afternoon solar rays interact with building angles on {plot.id}.
            </p>
          </div>

          <div className="flex gap-2 shrink-0 justify-end items-center">
            {/* Solar Daylight / Environment Preset Switches */}
            <div className="flex p-1 bg-[#121626] rounded-xl border border-white/5">
              <button
                onClick={() => setActiveTab('day')}
                className={`px-3 py-2 rounded-lg text-xs font-sans tracking-wide transition-all uppercase font-medium flex items-center gap-1.5 ${
                  activeTab === 'day' 
                    ? 'bg-white text-[#0e1322] font-semibold' 
                    : 'text-[#9E9A90] hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Day Peak</span>
              </button>
              <button
                onClick={() => setActiveTab('sunset')}
                className={`px-3 py-2 rounded-lg text-xs font-sans tracking-wide transition-all uppercase font-medium flex items-center gap-1.5 ${
                  activeTab === 'sunset' 
                    ? 'bg-white text-[#0e1322] font-semibold' 
                    : 'text-[#9E9A90] hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5 rotate-45 text-amber-500" />
                <span>Sunset Dusk</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
