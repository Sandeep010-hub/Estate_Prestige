import React, { useState, useEffect } from 'react';
import { MapPin, Ruler, CheckCircle, HelpCircle, FileText, ChevronRight, Coins } from 'lucide-react';
import { Property, Plot } from '../types';
import { plotsData, defaultPlots } from '../data';

interface DetailsPageProps {
  property: Property;
  onPlotSelect: (plot: Plot) => void;
  onEnquirePlot: (plot: Plot) => void;
}

export default function DetailsPage({ property, onPlotSelect, onEnquirePlot }: DetailsPageProps) {
  // Grab the plots for this specific property or fallback to defaults
  const plots = plotsData[property.id] || defaultPlots;
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);

  // Initialize selected plot once plots list loads
  useEffect(() => {
    const available = plots.find(p => p.status === 'AVAILABLE');
    if (available) {
      setSelectedPlot(available);
    } else if (plots.length > 0) {
      setSelectedPlot(plots[0]);
    }
  }, [plots, property]);

  // Handle local selection and pass upwards to trigger visuals
  const handlePlotClick = (plot: Plot) => {
    setSelectedPlot(plot);
    onPlotSelect(plot);
  };

  return (
    <main className="pt-24 min-h-screen bg-[#0e1322] text-[#dee1f7]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-[#9E9A90] uppercase tracking-wider mb-8 text-left">
          <span>Properties</span>
          <ChevronRight className="w-3 h-3" />
          <span>Hyderabad Sectors</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#ffc02c]">{property.name}</span>
        </div>

        {/* Multi-Section Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: Gallery + Description + Project Specs (7/12 cols) */}
          <div className="lg:col-span-7 space-y-10 text-left">
            
            {/* Primary Visual Showcase Carousel */}
            <div className="space-y-4">
              <div className="relative h-[320px] md:h-[420px] rounded-2xl overflow-hidden border border-white/5 bg-[#161b2b]">
                <img 
                  alt={property.name} 
                  className="w-full h-full object-cover transition-all duration-500"
                  src={property.images[selectedPhotoIndex] || property.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-[#0e1322]/80 backdrop-blur-md px-3 py-1.5 rounded text-[10px] uppercase font-sans tracking-widest text-[#ffc02c] border border-[#ffc02c]/20">
                  {property.tag}
                </div>
              </div>
              
              {/* Dynamic Thumbnail list */}
              {property.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                  {property.images.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                        selectedPhotoIndex === idx ? 'border-[#ffc02c] scale-95' : 'border-transparent opacity-65 hover:opacity-100'
                      }`}
                    >
                      <img 
                        alt={`${property.name} view ${idx + 1}`} 
                        className="w-full h-full object-cover" 
                        src={imgUrl}
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* In-depth Editorial Narrative */}
            <div className="bg-[#161b2b] p-8 rounded-2xl border border-white/5 space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl text-white font-normal">
                Development profile
              </h2>
              <p className="font-sans text-xs md:text-sm text-[#9E9A90] leading-relaxed">
                {property.description}
              </p>
              
              {/* Plot Technical Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#9E9A90] mb-1">Total Scale</span>
                  <span className="font-sans text-xs md:text-sm font-semibold text-white">{property.totalArea}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#9E9A90] mb-1">Sector Units</span>
                  <span className="font-sans text-xs md:text-sm font-semibold text-white">{property.totalPlots} Parcels</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#9E9A90] mb-1">Land Classification</span>
                  <span className="font-sans text-xs md:text-sm font-semibold text-white">{property.landType}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#9E9A90] mb-1">Official Zoning</span>
                  <span className="font-sans text-xs md:text-sm font-semibold text-white">{property.zoning}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#9E9A90] mb-1">Average Plotsize</span>
                  <span className="font-sans text-xs md:text-sm font-semibold text-white">{property.avgPlotArea}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#9E9A90] mb-1">RERA Status</span>
                  <span className="font-sans text-xs md:text-sm font-semibold text-[#ffc02c] uppercase tracking-wide">Approved</span>
                </div>
              </div>
            </div>

            {/* Custom Architectural Services Callout */}
            {property.isCustomBuildAvailable && (
              <div className="bg-gradient-to-r from-[#ffc02c]/5 to-transparent p-8 rounded-2xl border border-[#ffc02c]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h4 className="font-serif text-lg text-white font-normal mb-1">Custom Architectural Design Support</h4>
                  <p className="font-sans text-xs text-[#9E9A90] max-w-md">
                    This sector qualifies for our premium custom builder division. Our local engineers handling drafts, setbacks, and permits directly.
                  </p>
                </div>
                <div className="bg-[#ffc02c] text-[#402d00] text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded">
                  Design Enabled
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Interactive Selector Matrix & Live Visualizer (5/12 cols) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            {/* Real-time Sector Selector and Booking Panel */}
            <div className="bg-[#161b2b] p-8 rounded-2xl border border-white/5 space-y-6">
              <div>
                <span className="font-sans text-[10px] tracking-widest text-[#ffc02c] uppercase block mb-1">Interactive Selection</span>
                <h3 className="font-serif text-xl md:text-2xl text-white font-normal">Select an Available Plot</h3>
              </div>

              {/* Status Indicator Legend */}
              <div className="flex gap-4 text-[10px] uppercase tracking-wider font-sans text-[#9E9A90] border-b border-white/5 pb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffc02c]" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span>Reserved</span>
                </div>
              </div>

              {/* Live Interactive Grid Map */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {plots.map((plot) => {
                  const isAvailable = plot.status === 'AVAILABLE';
                  const isSelected = selectedPlot?.id === plot.id;
                  
                  return (
                    <button
                      key={plot.id}
                      disabled={!isAvailable}
                      onClick={() => handlePlotClick(plot)}
                      className={`relative p-4 rounded-xl border text-center transition-all duration-300 ${
                        !isAvailable 
                          ? 'bg-[#0e1322]/40 border-white/5 text-white/20 cursor-not-allowed line-through' 
                          : isSelected
                            ? 'bg-[#ffc02c]/20 border-[#ffc02c] text-white shadow-md'
                            : 'bg-[#0e1322] border-white/10 text-[#d4c5ad] hover:border-[#ffc02c]/40 hover:text-white'
                      }`}
                    >
                      <span className="block text-xs font-semibold uppercase tracking-wider">{plot.id}</span>
                      <span className="block font-mono text-[10px] text-[#9E9A90] mt-1">{plot.dimensions}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamically Selected Plot Metadata Card */}
              {selectedPlot && (
                <div className="mt-8 bg-[#090e1c] p-6 rounded-xl border border-white/5 space-y-4 fade-up">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-[#ffc02c]/10 text-[#ffc02c] text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">
                        {selectedPlot.id}
                      </span>
                      <h4 className="font-sans text-base font-semibold text-white mt-2">
                        {selectedPlot.area} Residential Plot
                      </h4>
                    </div>
                    <span className="font-mono text-xs md:text-sm font-bold text-[#ffc02c]">
                      ₹{(selectedPlot.price / 10000000).toFixed(2)} Cr
                    </span>
                  </div>

                  <p className="font-sans text-xs text-[#9E9A90] leading-relaxed">
                    {selectedPlot.notes}
                  </p>

                  {/* Dimension Blueprint Visualizer Box */}
                  <div className="bg-[#121626] p-4 rounded-lg border border-white/5 space-y-3">
                    <div className="flex justify-between text-[11px] font-sans">
                      <span className="text-[#9E9A90]">Zoning Guidelines:</span>
                      <span className="text-white font-mono">{selectedPlot.maxFar}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-sans">
                      <span className="text-[#9E9A90]">Road Setbacks:</span>
                      <span className="text-white font-mono">{selectedPlot.setbacks}</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-sans">
                      <span className="text-[#9E9A90]">Cardinal Face:</span>
                      <span className="text-[#ffc02c] font-mono">Vastu East Facing</span>
                    </div>
                  </div>

                  {/* Primary Trigger Buttons */}
                  <div className="pt-2 flex gap-4">
                    <button
                      onClick={() => onEnquirePlot(selectedPlot)}
                      className="flex-1 bg-[#ffc02c] hover:bg-[#C9841C] text-[#402d00] py-3 rounded-lg font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm"
                    >
                      Request Callback
                    </button>
                    <button
                      onClick={() => onPlotSelect(selectedPlot)}
                      className="bg-[#0e1322] border border-[#ffc02c]/30 text-[#ffc02c] hover:bg-[#ffc02c]/5 px-4 rounded-lg font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center"
                      title="View blueprint details"
                    >
                      Blueprint
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Side Map Indicator Panel */}
            <div className="bg-[#161b2b] p-6 rounded-2xl border border-white/5 text-left text-xs text-[#9E9A90] space-y-4">
              <span className="font-sans text-[10px] tracking-widest text-[#ffc02c] uppercase block">Geographic Integration</span>
              <div className="relative h-44 rounded-lg overflow-hidden border border-white/5">
                <img 
                  alt="Prestige Hyderabad Area Layout Location Map" 
                  className="w-full h-full object-cover grayscale brightness-75 scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9dfiapZ0W-Jo5IHMeTfjmm1wcFJSLnmyfx1KtcH9DvyYx4Gwdx2c0VzODmwpMzoXrtp8XJt5jGsNsBCUqpLXRJGv1EoutGRXq9VlZcT6MIs24OnBn-DVhCvGcHb-xrLcbkrsT1JzFLViyFeVSWxLCHAm9DH9mGV5EgZsRl6T6vDrCKnLiYg-8Or4mWSoTutbtDmAQsv-rIQRua59RzGiSFBBndDmyCtfezf2fJOZXP2KMfjz0o9aUMsxmVDv0t1ZecA9oHqrcc9re"
                />
                <div className="absolute inset-0 bg-[#0e1322]/30 flex items-center justify-center">
                  <div className="bg-[#0e1322]/90 border border-[#ffc02c]/30 px-3 py-1.5 rounded-lg text-[10px] uppercase font-sans tracking-widest text-[#ffc02c]">
                    Secured Compound
                  </div>
                </div>
              </div>
              <p className="font-sans text-[11px] leading-relaxed text-[#9E9A90]">
                Situated directly near Outer Ring Road exits, with direct links into prime IT centers, financial nodes, and Hyderabad airport.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
