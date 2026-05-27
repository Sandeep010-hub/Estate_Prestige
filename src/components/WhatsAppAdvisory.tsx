import React, { useState } from 'react';
import { MessageCircle, X, Check, Phone } from 'lucide-react';

export default function WhatsAppAdvisory() {
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMsg) return;
    
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setUserMsg('');
      setIsOpen(false);
    }, 4000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-left">
      {/* 1. Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative group"
        title="Chat with Private Advisor on WhatsApp"
        id="whatsapp-trigger"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute right-16 bg-[#0e1322]/90 border border-white/5 text-[9px] font-bold text-white px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase tracking-widest leading-none">
          WhatsApp Advisor
        </span>
      </button>

      {/* 2. Interactive Dialog Box */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-[#161b2b] rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-[#128C7E] px-5 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs" title="Designated Estate Advisor">
                EP
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider">Estate Prestige</h4>
                <p className="text-[9px] text-[#A5E3C9] font-medium uppercase tracking-widest">Active Land Advisor</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 transition text-white/80 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Dialog Container */}
          <div className="p-5 space-y-4">
            <div className="bg-[#0e1322] p-3 rounded-lg text-[11px] leading-relaxed text-[#9E9A90] border border-white/5">
              "Welcome to Estate Prestige registry. Text us directly to gather instantaneous digital pamphlets, legal titles checklist, or pricing ranges."
            </div>

            {success ? (
              <div className="bg-[#25D366]/10 border border-[#25D366]/30 p-4 rounded-xl text-center text-xs text-[#25D366] font-semibold">
                <Check className="w-4 h-4 mx-auto mb-1" />
                <span>Opening secure WhatsApp interface...</span>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-3">
                <textarea
                  rows={2}
                  required
                  value={userMsg}
                  onChange={(e) => setUserMsg(e.target.value)}
                  placeholder="Ask regarding site visits or brochures..."
                  className="w-full p-3 bg-[#0e1322] border border-white/10 rounded-lg text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#25D366] transition resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition"
                >
                  Start secure chat
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
