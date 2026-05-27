import React from 'react';

interface FooterProps {
  onTabChange: (tab: 'home' | 'properties' | 'details' | 'contact') => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  return (
    <footer className="bg-[#090e1c] border-t border-white/5 py-16 text-[#9E9A90] font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        {/* Brand Column */}
        <div className="space-y-4">
          <span className="font-serif text-lg tracking-tight text-[#ffc02c] font-bold block">
            ESTATE PRESTIGE
          </span>
          <p className="text-xs leading-relaxed max-w-xs text-[#9E9A90]">
            Curating premium land parcels and executing custom architectural residences across high-value development nodes. Certified under RERA guidelines.
          </p>
        </div>

        {/* Directory Links */}
        <div className="space-y-4">
          <h4 className="font-sans text-xs uppercase tracking-wider text-white font-semibold">Directory</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onTabChange('home')} className="hover:text-[#ffc02c] transition-colors">
                Premium Home
              </button>
            </li>
            <li>
              <button onClick={() => onTabChange('properties')} className="hover:text-[#ffc02c] transition-colors">
                Land Portfolio
              </button>
            </li>
            <li>
              <button onClick={() => onTabChange('details')} className="hover:text-[#ffc02c] transition-colors">
                Technical Specifications & Specs
              </button>
            </li>
            <li>
              <button onClick={() => onTabChange('contact')} className="hover:text-[#ffc02c] transition-colors">
                Connect with an Advisor
              </button>
            </li>
          </ul>
        </div>

        {/* Strategic Nodes in Hyderabad */}
        <div className="space-y-4">
          <h4 className="font-sans text-xs uppercase tracking-wider text-white font-semibold font-bold">Strategic Nodes</h4>
          <ul className="space-y-1.5 text-xs">
            <li className="text-[#dee1f7]">Kokapet Sector V, Hyderabad</li>
            <li className="text-[#dee1f7]">Mokila Green Corridor, Hyderabad</li>
            <li className="text-[#dee1f7]">Tellapur Lakefront Heights, Hyderabad</li>
            <li className="text-[#dee1f7]">Dubai Hills Signature Estate, UAE</li>
          </ul>
        </div>

        {/* Legal Regulatory Certifications */}
        <div className="space-y-4">
          <h4 className="font-sans text-xs uppercase tracking-wider text-white font-bold font-semibold">Regulatory Integrity</h4>
          <p className="text-[11px] leading-relaxed text-[#9E9A90]">
            Estate Prestige is a registered land developer under Telangana Real Estate Regulatory Authority (TSRERA Registry No. PR5532). All measurements are standard and conform to layout zoning.
          </p>
          <div className="text-[10px] text-[#ffc02c] font-semibold border border-[#ffc02c]/20 rounded p-2 inline-block bg-[#ffc02c]/5">
            RERA APPROVED SECTORS
          </div>
        </div>
      </div>

      {/* Copy bottom */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px]">
        <p>&copy; {new Date().getFullYear()} Estate Prestige Private Ltd. All rights reserved.</p>
        <div className="flex gap-6 uppercase tracking-wider">
          <a href="#privacy" className="hover:text-[#ffc02c] transition">Privacy Terms</a>
          <a href="#compliance" className="hover:text-[#ffc02c] transition">Compliance Certificate</a>
        </div>
      </div>
    </footer>
  );
}
