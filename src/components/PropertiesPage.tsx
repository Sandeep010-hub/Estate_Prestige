import React, { useState } from 'react';
import { Search, MapPin, Grid, Layers, HelpCircle } from 'lucide-react';
import { Property } from '../types';

interface PropertiesPageProps {
  properties: Property[];
  onPropertyClick: (id: string) => void;
}

export default function PropertiesPage({ properties, onPropertyClick }: PropertiesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'HYDERABAD' | 'DUBAI' | 'PREMIUM' | 'INVESTMENT'>('ALL');

  const filteredProperties = properties.filter((prop) => {
    // Filter matching location or name
    const matchesSearch = 
      prop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    // Category checks
    const isHyd = prop.location.toLowerCase().includes('hyderabad');
    const isDubai = prop.location.toLowerCase().includes('dubai');
    
    let matchesCategory = true;
    if (activeFilter === 'HYDERABAD') matchesCategory = isHyd;
    else if (activeFilter === 'DUBAI') matchesCategory = isDubai;
    else if (activeFilter === 'PREMIUM') matchesCategory = prop.tag === 'Premium Plot' || prop.tag === 'Premium Sector';
    else if (activeFilter === 'INVESTMENT') matchesCategory = prop.tag === 'Investment Grade';

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="pt-24 min-h-screen bg-[#0e1322]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Page title and descriptive intro */}
        <div className="text-left mb-10">
          <span className="font-sans text-[11px] tracking-widest text-[#ffc02c] uppercase block mb-2">
            Signature Portfolios
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-white font-normal mb-4">
            Curated Land Collections
          </h1>
          <p className="font-sans text-xs text-[#9E9A90] max-w-xl leading-relaxed">
            Acquire pristine parcels in hyper-growth tech corridors. Our plots are fully cleared, gated, and pre-integrated with first-tier services.
          </p>
        </div>

        {/* Dynamic Filters & Search Panel */}
        <div className="bg-[#161b2b] p-6 rounded-xl border border-white/5 mb-10 flex flex-col md:flex-row gap-6 items-center justify-between">
          
          {/* Custom Search field */}
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#9E9A90]">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search by location (e.g. Kokapet, Tellapur)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 bg-[#0e1322] border border-white/10 rounded-lg text-xs md:text-sm text-[#dee1f7] placeholder-[#9E9A90] focus:outline-none focus:border-[#ffc02c] transition-all"
            />
          </div>

          {/* Filtering Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-4 py-2 rounded text-[11px] font-sans tracking-wide uppercase transition-all duration-300 ${
                activeFilter === 'ALL'
                  ? 'bg-[#ffc02c] text-[#402d00] font-semibold'
                  : 'bg-[#0e1322] text-[#d4c5ad] hover:text-[#ffc02c]'
              }`}
            >
              All Plots
            </button>
            <button
              onClick={() => setActiveFilter('HYDERABAD')}
              className={`px-4 py-2 rounded text-[11px] font-sans tracking-wide uppercase transition-all duration-300 ${
                activeFilter === 'HYDERABAD'
                  ? 'bg-[#ffc02c] text-[#402d00] font-semibold'
                  : 'bg-[#0e1322] text-[#d4c5ad] hover:text-[#ffc02c]'
              }`}
            >
              Hyderabad
            </button>
            <button
              onClick={() => setActiveFilter('DUBAI')}
              className={`px-4 py-2 rounded text-[11px] font-sans tracking-wide uppercase transition-all duration-300 ${
                activeFilter === 'DUBAI'
                  ? 'bg-[#ffc02c] text-[#402d00] font-semibold'
                  : 'bg-[#0e1322] text-[#d4c5ad] hover:text-[#ffc02c]'
              }`}
            >
              Dubai Hills & Coasts
            </button>
            <button
              onClick={() => setActiveFilter('PREMIUM')}
              className={`px-4 py-2 rounded text-[11px] font-sans tracking-wide uppercase transition-all duration-300 ${
                activeFilter === 'PREMIUM'
                  ? 'bg-[#ffc02c] text-[#402d00] font-semibold'
                  : 'bg-[#0e1322] text-[#d4c5ad] hover:text-[#ffc02c]'
              }`}
            >
              Premium Sectors
            </button>
          </div>
        </div>

        {/* Results Count */}
        <p className="font-sans text-[11px] text-[#9E9A90] tracking-wider mb-6 uppercase text-left">
          Showing {filteredProperties.length} elite opportunities
        </p>

        {/* Property Grid Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.map((prop) => (
            <div
              key={prop.id}
              onClick={() => onPropertyClick(prop.id)}
              className="bg-[#1a1f2f] rounded-xl overflow-hidden border border-white/5 hover:border-[#ffc02c]/20 transition-all duration-300 group cursor-pointer flex flex-col h-[520px] shadow-lg hover:shadow-2xl"
              id={`prop-card-${prop.id}`}
            >
              {/* Media Block */}
              <div className="relative h-64 overflow-hidden">
                <img
                  alt={prop.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={prop.image}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#ffc02c] text-[#402d00] text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-sm">
                    {prop.tag}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2f] via-transparent to-transparent"></div>
              </div>

              {/* Text Block */}
              <div className="p-6 flex flex-col justify-between flex-grow text-left">
                <div>
                  <div className="flex items-center gap-1.5 text-[#ffc02c] mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="font-sans text-[11px] tracking-wide font-medium">
                      {prop.location}
                    </span>
                  </div>
                  <h3 className="font-sans text-xl font-semibold text-[#dee1f7] mb-2 group-hover:text-[#ffc02c] transition-colors">
                    {prop.name}
                  </h3>
                  <p className="font-sans text-xs text-[#9E9A90] leading-relaxed line-clamp-3 mb-4">
                    {prop.description}
                  </p>
                </div>

                {/* Micro indicators matching high quality theme */}
                <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-sans text-[#d4c5ad]">
                  <div>
                    <span className="block text-[10px] uppercase text-[#9E9A90] tracking-wider">
                      Pricing Range
                    </span>
                    <span className="font-mono text-xs font-semibold text-white">
                      {prop.priceRange}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] uppercase text-[#9E9A90] tracking-wider">
                      Plot Dimensions
                    </span>
                    <span className="font-mono text-xs text-[#ffc02c]">
                      {prop.avgPlotArea}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredProperties.length === 0 && (
            <div className="col-span-full py-20 text-center bg-[#161b2b] rounded-xl border border-white/5">
              <HelpCircle className="w-12 h-12 text-[#9E9A90] mx-auto mb-4" />
              <p className="font-sans text-[#d4c5ad] text-sm">No properties found matching your selection.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveFilter('ALL'); }}
                className="mt-4 text-xs font-sans uppercase tracking-[#ffc02c] text-[#ffc02c] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
