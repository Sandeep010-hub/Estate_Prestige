import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Property } from '../types';

interface FeaturedPropertiesProps {
  properties: Property[];
  onPropertyClick: (id: string) => void;
  onViewAllClick: () => void;
}

export default function FeaturedProperties({ properties, onPropertyClick, onViewAllClick }: FeaturedPropertiesProps) {
  // Grab standard first 3 properties representing Hyderabad premium listings
  const featured = properties.slice(0, 3);
  
  return (
    <section className="bg-[#0e1322] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header content matching layout */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="font-sans text-[11px] tracking-widest text-[#ffc02c] mb-2 block uppercase">
              Exclusivity Redefined
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-normal">
              Featured properties
            </h2>
          </div>
          <button 
            onClick={onViewAllClick}
            className="hidden md:flex items-center gap-1 font-sans text-[11px] tracking-wider uppercase text-[#d4c5ad] hover:text-[#ffc02c] transition-colors"
          >
            View all listings <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        {/* Grid layout containing Netflix scale hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((prop) => (
            <div 
              key={prop.id}
              onClick={() => onPropertyClick(prop.id)}
              className="group relative bg-[#1a1f2f] rounded-xl overflow-hidden border border-white/5 cursor-pointer transition-all duration-500 hover:scale-[1.04] hover:shadow-2xl flex flex-col h-[480px]"
            >
              {/* Media Container */}
              <div className="relative w-full h-full overflow-hidden">
                <img 
                  alt={prop.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-95 group-hover:brightness-90"
                  src={prop.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1322]/90 via-[#0e1322]/10 to-transparent"></div>
              </div>
              
              {/* Floating content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col items-start text-left">
                <span className="inline-block bg-[#ffc02c]/20 text-[#ffc02c] font-sans text-[9px] font-semibold uppercase tracking-wider px-3 py-1 rounded-sm mb-3 backdrop-blur-sm">
                  {prop.tag}
                </span>
                <h3 className="font-sans text-xl font-medium text-[#dee1f7] mb-1">
                  {prop.name}
                </h3>
                <p className="font-sans text-xs text-[#d4c5ad] mb-2">
                  {prop.location}
                </p>
                <div className="h-0 opacity-0 group-hover:h-8 group-hover:opacity-100 transition-all duration-300 flex items-center justify-start text-[11px] uppercase tracking-wider text-[#ffc02c] font-semibold">
                  View Development Details &rarr;
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All */}
        <div className="mt-8 text-center md:hidden">
          <button 
            onClick={onViewAllClick}
            className="inline-flex items-center gap-1 font-sans text-xs tracking-wider uppercase text-[#ffc02c] font-semibold py-2"
          >
            View all listings <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
