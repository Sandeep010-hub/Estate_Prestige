import React, { useState, useEffect } from 'react';
import { Mail, Phone, Clock, Landmark, MessageSquare, CheckCircle, MapPin } from 'lucide-react';
import { Property, Plot } from '../types';

interface ContactPageProps {
  selectedProperty?: Property;
  selectedPlot?: Plot;
  onSubmitInquiry: (data: any) => void;
}

export default function ContactPage({ selectedProperty, selectedPlot, onSubmitInquiry }: ContactPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'PLOT_INVESTMENT',
    preferredSector: selectedProperty?.id || 'prop-001',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Sync state if selected plot changes
  useEffect(() => {
    if (selectedProperty) {
      setFormData((prev) => ({
        ...prev,
        preferredSector: selectedProperty.id,
        message: selectedPlot 
          ? `I am highly interested in securing ${selectedPlot.id} (${selectedPlot.dimensions}, ${selectedPlot.area}) inside ${selectedProperty.name} in ${selectedProperty.location}. Please provide pricing particulars.`
          : `I would like to gather information regarding available plots in ${selectedProperty.name}.`
      }));
    }
  }, [selectedProperty, selectedPlot]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Luxury visual confirmation
    setSubmitted(true);
    onSubmitInquiry(formData);
    
    // Auto reset submission after a while
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        inquiryType: 'PLOT_INVESTMENT',
        preferredSector: 'prop-001',
        message: '',
      });
    }, 5000);
  };

  return (
    <main className="pt-24 min-h-screen bg-[#0e1322] text-[#dee1f7]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Title Content */}
        <div className="text-left mb-12">
          <span className="font-sans text-[11px] tracking-widest text-[#ffc02c] uppercase block mb-2">
            Private Client Relations
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-white font-normal mb-4">
            Connect with an Advisor
          </h1>
          <p className="font-sans text-xs text-[#9E9A90] max-w-xl leading-relaxed">
            Reach out regarding standard acquisitions, bespoke estate architecture, or VIP site inspection scheduling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT SIDE: Direct Quick dials and info details (5/12 cols) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="bg-[#161b2b] p-8 rounded-2xl border border-white/5 space-y-6">
              <h3 className="font-serif text-lg text-white font-normal border-b border-white/5 pb-4">
                Prestige Advisory Division
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#ffc02c]/10 flex items-center justify-center text-[#ffc02c] flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[#9E9A90] tracking-wider">Direct Hotline</span>
                    <a href="tel:+919876543210" className="font-mono text-xs md:text-sm font-semibold text-white hover:text-[#ffc02c]">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#ffc02c]/10 flex items-center justify-center text-[#ffc02c] flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[#9E9A90] tracking-wider">Private Registry Email</span>
                    <a href="mailto:advisors@estateprestige.in" className="font-mono text-xs md:text-sm font-semibold text-white hover:text-[#ffc02c]">
                      advisors@estateprestige.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#ffc02c]/10 flex items-center justify-center text-[#ffc02c] flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[#9E9A90] tracking-wider">Advisor Availability</span>
                    <span className="font-sans text-xs text-white uppercase tracking-wide">
                      Mon - Sun | 8:00 AM - 10:00 PM IST
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-[#ffc02c]/10 flex items-center justify-center text-[#ffc02c] flex-shrink-0">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[#9E9A90] tracking-wider">Hyderabad HQ Registry</span>
                    <span className="font-sans text-xs text-white leading-relaxed">
                      L12, One Golden Mile Building, Financial District, Kokapet, Hyderabad - 500075.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro FAQ Quick help cards */}
            <div className="bg-[#161b2b] p-6 rounded-2xl border border-white/5 space-y-4">
              <span className="font-sans text-[10px] tracking-widest text-[#ffc02c] uppercase block">Acquisition Timelines</span>
              <p className="font-sans text-xs text-[#9E9A90] leading-relaxed">
                Standard registration is fully expedited in-house. Standard plots can be completely registered and configured within 14 working business days.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Inquiry capturing Form (7/12 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#161b2b] p-8 rounded-2xl border border-white/5 text-left relative overflow-hidden">
              <h3 className="font-serif text-xl md:text-2xl text-white font-normal mb-6">
                Register Your Interest
              </h3>

              {submitted ? (
                <div className="bg-[#ffc02c]/10 border border-[#ffc02c]/20 p-8 rounded-xl text-center space-y-4 py-16 fade-up">
                  <div className="w-16 h-16 rounded-full bg-[#ffc02c]/20 flex items-center justify-center text-[#ffc02c] mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl text-white font-normal">Interest successfully logged.</h4>
                  <p className="font-sans text-xs text-[#9E9A90] max-w-sm mx-auto leading-relaxed">
                    Thank you. Your request is registered under high security criteria. Our designated Private Land Advisor will dial you within 60 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Grid Name & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-wider text-[#9E9A90]">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="block w-full px-4 py-3 bg-[#0e1322] border border-white/10 rounded-lg text-xs md:text-sm text-white focus:outline-none focus:border-[#ffc02c] transition-all"
                        placeholder="e.g. Anand Rao"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-wider text-[#9E9A90]">Direct Handphone</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="block w-full px-4 py-3 bg-[#0e1322] border border-white/10 rounded-lg text-xs md:text-sm text-white focus:outline-none focus:border-[#ffc02c] transition-all font-mono"
                        placeholder="e.g. +91 94451 22894"
                      />
                    </div>
                  </div>

                  {/* Mail & Type Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-wider text-[#9E9A90]">Corporate Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="block w-full px-4 py-3 bg-[#0e1322] border border-white/10 rounded-lg text-xs md:text-sm text-white focus:outline-none focus:border-[#ffc02c] transition-all"
                        placeholder="e.g. anand@hyderabadventures.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-wider text-[#9E9A90]">Service Selection</label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({...formData, inquiryType: e.target.value})}
                        className="block w-full px-4 py-3 bg-[#0e1322] border border-white/10 rounded-lg text-xs md:text-sm text-white focus:outline-none focus:border-[#ffc02c] transition-all"
                      >
                        <option value="PLOT_INVESTMENT">Standard Plot Investment</option>
                        <option value="CUSTOM_BUILD">Design & Custom Villa Builder Service</option>
                        <option value="SITE_INSPECTION">VIP Gated Site Inspection Booking</option>
                        <option value="PORTFOLIO_LIQUIDITY">Joint Venture / Layout Liquidity</option>
                      </select>
                    </div>
                  </div>

                  {/* Sector Allocation dropdown */}
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-wider text-[#9E9A90]">Target Sector</label>
                    <select
                      value={formData.preferredSector}
                      onChange={(e) => setFormData({...formData, preferredSector: e.target.value})}
                      className="block w-full px-4 py-3 bg-[#0e1322] border border-white/10 rounded-lg text-xs md:text-sm text-white focus:outline-none focus:border-[#ffc02c] transition-all"
                    >
                      <option value="prop-001">The Golden Fields, Kokapet, Hyderabad (₹12.5 Cr - ₹18 Cr)</option>
                      <option value="prop-002">Emerald Estates, Mokila, Hyderabad (₹8.5 Cr - ₹15 Cr)</option>
                      <option value="prop-003">Horizon Heights, Tellapur, Hyderabad (₹15 Cr - ₹24 Cr)</option>
                      <option value="prop-004">Emerald Heights Phase I, Dubai Hills, Dubai</option>
                      <option value="prop-005">Sapphire Cove Residences, Palm Jumeirah, Dubai</option>
                      <option value="prop-006">The Al-Barari Groves, Al Barari, Dubai</option>
                    </select>
                  </div>

                  {/* Comments Box */}
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-wider text-[#9E9A90]">Acquisition Specifics / Notes</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="block w-full px-4 py-3 bg-[#0e1322] border border-white/10 rounded-lg text-xs md:text-sm text-white focus:outline-none focus:border-[#ffc02c] transition-all resize-none"
                      placeholder="Input standard setbacks requirements, cardinal layout rules, or specific booking slots preference..."
                    />
                  </div>

                  {/* Submit Trigger */}
                  <button
                    type="submit"
                    className="w-full bg-[#ffc02c] hover:bg-[#C9841C] text-[#402d00] py-4 rounded-xl font-sans text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 transform hover:shadow-lg active:scale-95 text-center block"
                  >
                    Submit Private Enquiry
                  </button>

                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
