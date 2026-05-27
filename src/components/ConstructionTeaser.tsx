import React from 'react';

interface ConstructionTeaserProps {
  onContactClick: () => void;
}

export default function ConstructionTeaser({ onContactClick }: ConstructionTeaserProps) {
  return (
    <section className="bg-[#0e1322] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Editorial Descriptive Area */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <span className="font-sans text-[11px] tracking-widest text-[#ffc02c] uppercase block mb-2">
            Signature Design & Build
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-normal mb-6 leading-tight">
            We don't just sell plots, we build dreams.
          </h2>
          <p className="font-sans text-xs text-[#9E9A90] leading-relaxed mb-6">
            Our specialized in-house Architectural Excellence Division partners with you from initial master-plan zoning to the final custom brickwork. Whether you construct a sleek 3-story concrete villa in Tellapur or a luxury private courtyard home in Kokapet, we take physical ownership of the process.
          </p>
          
          <ul className="space-y-3 mb-8 w-full">
            <li className="flex items-center gap-3 text-xs font-sans text-[#dee1f7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffc02c]" />
              Architectural Drafting & 3D Visualization
            </li>
            <li className="flex items-center gap-3 text-xs font-sans text-[#dee1f7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffc02c]" />
              RERA Compliant Approvals & Permits handling
            </li>
            <li className="flex items-center gap-3 text-xs font-sans text-[#dee1f7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffc02c]" />
              Premium construction materials & grade-A concrete
            </li>
            <li className="flex items-center gap-3 text-xs font-sans text-[#dee1f7]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffc02c]" />
              Smart Home integration & automated security installations
            </li>
          </ul>

          <button 
            onClick={onContactClick}
            className="bg-transparent hover:bg-[#ffc02c]/10 text-[#ffc02c] border border-[#ffc02c] px-6 py-3 rounded font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300"
          >
            Consult Our Architects
          </button>
        </div>

        {/* Right Side: Media Showcase with Elegant Frame */}
        <div className="lg:col-span-7 relative h-[450px] lg:h-[520px] rounded-2xl overflow-hidden group border border-white/5">
          <img 
            alt="Estate Prestige Construction Division" 
            className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1322]/80 via-transparent to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
