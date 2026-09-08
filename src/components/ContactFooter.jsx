import React from 'react';
import { MapPin, Phone, Mail, Clock, Shield, ChevronRight } from 'lucide-react';

export default function ContactFooter({ onOpenAdmin }) {
  return (
    <footer id="contact" className="bg-blue-950 text-white pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 pb-12 border-b border-blue-900">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Vision Logo" className="w-12 h-12 rounded-full ring-2 ring-amber-400 bg-white" />
              <div>
                <h3 className="font-heading font-black text-lg text-white">VISION I.I.T. FOUNDATION SCHOOL</h3>
                <p className="text-amber-400 font-serif italic text-xs">— Improving Thoughts —</p>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">
              Premier educational institution committed to 10th Class Board excellence and competitive IIT-JEE / NEET foundation coaching.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Vision Campus, Main Road, Sattenapalli, Guntur Dist. Pin: 522403</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 98765 43210 / +91 91234 56789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>info@visioniitschool.edu.in</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-amber-400 uppercase">Quick Links</h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li><a href="#hero" className="hover:text-amber-400 flex items-center gap-1"><ChevronRight className="w-3 h-3 text-amber-400" />Home</a></li>
              <li><a href="#about" className="hover:text-amber-400 flex items-center gap-1"><ChevronRight className="w-3 h-3 text-amber-400" />About Us</a></li>
              <li><a href="#academics" className="hover:text-amber-400 flex items-center gap-1"><ChevronRight className="w-3 h-3 text-amber-400" />IIT Foundation Wing</a></li>
              <li><a href="#results" className="hover:text-amber-400 flex items-center gap-1"><ChevronRight className="w-3 h-3 text-amber-400" />10th Class Results</a></li>
              <li><a href="#facilities" className="hover:text-amber-400 flex items-center gap-1"><ChevronRight className="w-3 h-3 text-amber-400" />Infrastructure</a></li>
              <li><a href="#notices" className="hover:text-amber-400 flex items-center gap-1"><ChevronRight className="w-3 h-3 text-amber-400" />Notice Board</a></li>
              <li><a href="#admissions" className="hover:text-amber-400 flex items-center gap-1"><ChevronRight className="w-3 h-3 text-amber-400" />Admissions 2026-27</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4 bg-blue-900 border border-blue-800 rounded-xl p-5 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Campus Map Location</span>
            </h4>
            <div className="bg-blue-950 p-4 rounded-lg text-center space-y-2">
              <MapPin className="w-6 h-6 text-amber-400 mx-auto" />
              <h5 className="font-bold text-white text-xs">Vision I.I.T. Foundation School</h5>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-block bg-amber-500 text-slate-950 font-bold text-[10px] px-3 py-1 rounded shadow">
                Open Google Maps
              </a>
            </div>
            <button onClick={onOpenAdmin} className="w-full bg-blue-950 hover:bg-blue-900 text-slate-200 font-semibold text-xs py-2 rounded border border-blue-800 flex items-center justify-center gap-1">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>School Admin CMS</span>
            </button>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>© {new Date().getFullYear()} Vision I.I.T. Foundation School. All Rights Reserved.</div>
          <button onClick={onOpenAdmin} className="text-amber-400 font-semibold hover:underline">Staff Login</button>
        </div>

      </div>
    </footer>
  );
}
