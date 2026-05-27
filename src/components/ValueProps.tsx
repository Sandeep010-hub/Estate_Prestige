import React from 'react';
import { Shield, Sparkles, MapPin, Compass } from 'lucide-react';

export default function ValueProps() {
  const pillars = [
    {
      icon: Shield,
      title: 'Uncompromising Quality',
      desc: 'Engineered boundary layouts, premium stone pathways, gated entry points, and high-quality utility feeds pre-installed for every single parcel.',
    },
    {
      icon: Sparkles,
      title: 'Zoning & Master-Plan Compliance',
      desc: 'All plots are fully cleared with RERA approvals, verified technical setbacks, clear non-agricultural ownership titles ready to register.',
    },
    {
      icon: MapPin,
      title: 'High-Growth Locations',
      desc: 'Scouted growth corridors across Kokapet, Mokila, and Tellapur, ensuring maximum multi-generational capital appreciation.',
    },
    {
      icon: Compass,
      title: 'Vastu-Compliant Mapping',
      desc: 'Every segment undergoes expert micro-contouring to ensure cardinal direction alignment, favorable crosswinds, and Vastu integrity.',
    }
  ];

  return (
    <section className="bg-[#090e1c] py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-[11px] tracking-widest text-[#ffc02c] uppercase block mb-2">
            The Prestige Standard
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-normal">
            Why invest with us
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div 
                key={i}
                className="bg-[#161b2b] p-8 rounded-xl border border-white/5 hover:border-[#ffc02c]/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded bg-[#ffc02c]/10 flex items-center justify-center text-[#ffc02c] mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans text-lg font-medium text-[#dee1f7] mb-3">
                    {p.title}
                  </h3>
                  <p className="font-sans text-xs text-[#9E9A90] leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
