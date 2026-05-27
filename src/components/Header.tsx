import React from 'react';

interface HeaderProps {
  currentTab: 'home' | 'properties' | 'details' | 'contact';
  onTabChange: (tab: 'home' | 'properties' | 'details' | 'contact') => void;
  onEnquireClick: () => void;
}

export default function Header({ currentTab, onTabChange, onEnquireClick }: HeaderProps) {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0e1322]/85 backdrop-blur-md transition-all duration-300">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <button 
          onClick={() => onTabChange('home')}
          className="font-serif text-lg md:text-xl tracking-tight text-[#ffc02c] hover:opacity-90 active:scale-95 transition-all text-left"
          id="nav-logo"
        >
          ESTATE PRESTIGE
        </button>
        
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onTabChange('home')}
            className={`font-sans text-xs tracking-wider uppercase pb-1 transition-all duration-200 border-b-2 hover:text-[#ffc02c] ${
              currentTab === 'home' 
                ? 'text-[#ffc02c] border-[#ffc02c]' 
                : 'text-[#d4c5ad] border-transparent'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onTabChange('properties')}
            className={`font-sans text-xs tracking-wider uppercase pb-1 transition-all duration-200 border-b-2 hover:text-[#ffc02c] ${
              currentTab === 'properties' 
                ? 'text-[#ffc02c] border-[#ffc02c]' 
                : 'text-[#d4c5ad] border-transparent'
            }`}
          >
            Properties
          </button>
          <button
            onClick={() => onTabChange('details')}
            className={`font-sans text-xs tracking-wider uppercase pb-1 transition-all duration-200 border-b-2 hover:text-[#ffc02c] ${
              currentTab === 'details' 
                ? 'text-[#ffc02c] border-[#ffc02c]' 
                : 'text-[#d4c5ad] border-transparent'
            }`}
          >
            Services & Details
          </button>
          <button
            onClick={() => onTabChange('contact')}
            className={`font-sans text-xs tracking-wider uppercase pb-1 transition-all duration-200 border-b-2 hover:text-[#ffc02c] ${
              currentTab === 'contact' 
                ? 'text-[#ffc02c] border-[#ffc02c]' 
                : 'text-[#d4c5ad] border-transparent'
            }`}
          >
            Contact
          </button>
        </div>

        <button 
          onClick={onEnquireClick}
          className="bg-[#ffc02c] hover:bg-[#C9841C] text-[#402d00] px-5 py-2 rounded font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-sm"
          id="nav-enquire-btn"
        >
          Enquire now
        </button>
      </div>
    </nav>
  );
}
