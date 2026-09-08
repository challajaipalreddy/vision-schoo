import React, { useState } from 'react';
import { Search, X, ChevronRight, BookOpen, Trophy, Bell, Building2 } from 'lucide-react';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const quickLinks = [
    { title: '10th Class Board Results 2025', href: '#results', icon: Trophy, cat: 'Results' },
    { title: 'IIT & NEET Foundation Syllabus', href: '#academics', icon: BookOpen, cat: 'Academics' },
    { title: 'Admissions Inquiry & Entrance Test', href: '#admissions', icon: Bell, cat: 'Admissions' },
    { title: 'Physics, Chemistry & Biology Labs', href: '#facilities', icon: Building2, cat: 'Infrastructure' },
    { title: 'School Circulars & Timetables', href: '#notices', icon: Bell, cat: 'Circulars' },
  ];

  const filteredLinks = query.trim() === ''
    ? quickLinks
    : quickLinks.filter(l => l.title.toLowerCase().includes(query.toLowerCase()) || l.cat.toLowerCase().includes(query.toLowerCase()));

  const handleLinkClick = (href) => {
    onClose();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn font-sans">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-amber-400" />
            <input
              type="text"
              autoFocus
              placeholder="Search website (e.g. 10th results, labs, admissions)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-white placeholder-slate-400 text-base focus:outline-none"
            />
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 max-h-80 overflow-y-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Suggestions:</span>
          {filteredLinks.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                onClick={() => handleLinkClick(item.href)}
                className="p-3 bg-slate-950 hover:bg-slate-800 rounded-xl border border-slate-800 flex items-center justify-between cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h5>
                    <span className="text-[10px] text-slate-500">{item.cat}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400" />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
