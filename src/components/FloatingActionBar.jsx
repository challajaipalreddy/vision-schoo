import React, { useState } from 'react';
import { Phone, MessageCircle, X, Sparkles } from 'lucide-react';

export default function FloatingActionBar() {
  const [minimized, setMinimized] = useState(false);

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hello Vision I.I.T. Foundation School, I would like to inquire about admissions and IIT foundation courses.");
    window.open(`https://wa.me/919848012345?text=${text}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = "tel:9848012345";
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 font-sans">
      
      {/* Floating Action Menu */}
      {!minimized && (
        <div className="flex flex-col items-end gap-3 animate-fadeIn">
          
          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsApp}
            className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 font-extrabold text-xs"
            title="Chat on WhatsApp"
          >
            <span className="hidden sm:inline font-bold">WhatsApp Inquiry</span>
            <div className="w-8 h-8 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-xs">
              <MessageCircle className="w-5 h-5 fill-emerald-600 text-white" />
            </div>
          </button>

          {/* Quick Call Button */}
          <button
            onClick={handleCall}
            className="group flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 font-extrabold text-xs border border-amber-400/40"
            title="Call Admission Desk"
          >
            <span className="hidden sm:inline font-bold">Call Admission Desk</span>
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xs animate-pulse">
              <Phone className="w-4 h-4 fill-slate-950 text-slate-950" />
            </div>
          </button>

        </div>
      )}

      {/* Toggle Control Button */}
      <button
        onClick={() => setMinimized(!minimized)}
        className="bg-amber-500 hover:bg-amber-400 text-slate-950 p-2.5 rounded-full shadow-lg border-2 border-white transition-transform hover:scale-110 flex items-center justify-center"
        title={minimized ? "Show Quick Contact" : "Hide Contact Bar"}
      >
        {minimized ? (
          <Sparkles className="w-5 h-5 font-bold" />
        ) : (
          <X className="w-5 h-5 font-bold" />
        )}
      </button>

    </div>
  );
}
