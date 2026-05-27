import React, { useState } from 'react';
import { Sparkles, Check } from 'lucide-react';

export default function BottomCTA() {
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setPhone('');
    }, 5000);
  };

  return (
    <section className="bg-gradient-to-r from-[#161b2b] to-[#0e1322] py-20 border-y border-white/5 relative overflow-hidden text-left">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ffc02c]/2 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Call-to-action text */}
        <div className="lg:col-span-7 space-y-3">
          <span className="font-sans text-[11px] tracking-widest text-[#ffc02c] uppercase flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5" /> High-Liquidity Plottings
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-normal leading-tight">
            Ready to secure your generational parcel?
          </h2>
          <p className="font-sans text-xs text-[#9E9A90] max-w-xl">
            Input your handphone numbers below to register under elite registry guidelines and receive localized zoning maps immediately.
          </p>
        </div>

        {/* Input trigger block */}
        <div className="lg:col-span-5 h-[100px] flex items-center">
          {success ? (
            <div className="w-full bg-[#ffc02c]/5 border border-[#ffc02c]/30 p-4 rounded-xl flex items-center gap-3 text-xs text-[#ffc02c] font-semibold animate-fade-in">
              <span className="w-6 h-6 rounded-full bg-[#ffc02c]/20 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-[#ffc02c]" />
              </span>
              <span>Callback request logged. Advisor dialing (+91 {phone}) within 60 mins.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex gap-3">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Handphone number..."
                className="flex-grow px-4 py-3 bg-[#0e1322] border border-white/10 rounded-lg text-xs md:text-sm text-[#dee1f7] placeholder-[#5a688a] focus:outline-none focus:border-[#ffc02c] transition-all font-mono"
              />
              <button
                type="submit"
                className="bg-[#ffc02c] hover:bg-[#C9841C] text-[#402d00] font-sans text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-all duration-200 shadow-sm whitespace-nowrap"
              >
                Call me
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
