import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <header className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Graphic & Ethereal Layering */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Premium Hyderabad Gated Land Plots" 
          className="w-full h-full object-cover hero-animation" 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=90"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1322]/40 via-[#0e1322]/25 to-[#0e1322]/95"></div>
      </div>
      
      {/* Content Area */}
      <div className="relative z-10 text-center px-6 max-w-4xl fade-up">
        <h1 className="font-serif text-4xl md:text-7xl text-white mb-8 leading-tight tracking-tight">
          Find your perfect plot <br className="hidden md:block"/> in Hyderabad.
        </h1>
        <button 
          onClick={onExploreClick}
          className="bg-[#ffc02c] hover:bg-[#C9841C] text-[#402d00] px-10 py-4 rounded-lg font-sans text-sm md:text-base font-semibold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
        >
          Explore properties
        </button>
      </div>
      
      {/* Scroll Down Signal */}
      <div 
        onClick={onExploreClick}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer hover:opacity-100 opacity-60 transition-all"
      >
        <span className="font-sans text-[10px] tracking-widest uppercase text-[#d4c5ad]">Scroll</span>
        <ChevronDown className="w-5 h-5 text-[#ffc02c] animate-bounce" />
      </div>
    </header>
  );
}
