import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';

export default function NoticeTicker({ notices }) {
  return (
    <div className="bg-amber-50 text-slate-800 border-b border-amber-200 py-2 px-4 shadow-xs relative z-20 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-3">
        
        {/* Label Badge */}
        <div className="flex items-center gap-1.5 bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-xs font-black shrink-0 uppercase tracking-wider shadow-xs">
          <Bell className="w-3.5 h-3.5 animate-bounce" />
          <span>Latest Circulars</span>
        </div>

        {/* Ticker Content */}
        <div className="overflow-hidden whitespace-nowrap flex-1 w-full text-xs sm:text-sm text-slate-800 font-semibold">
          <div className="inline-block animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
            {notices.map((notice, idx) => (
              <span key={notice.id || idx} className="inline-flex items-center gap-2 mx-6">
                <span className="bg-blue-100 text-blue-950 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">
                  {notice.category}
                </span>
                <span className="hover:text-amber-700 transition-colors">
                  {notice.title}
                </span>
                <span className="text-slate-500 text-xs">({notice.date})</span>
                <span className="text-slate-400 ml-4">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <a
          href="#notices"
          className="shrink-0 hidden md:flex items-center gap-1 text-xs text-blue-950 hover:text-amber-700 font-bold transition-colors uppercase"
        >
          <span>All Notices</span>
          <ChevronRight className="w-4 h-4 text-amber-600" />
        </a>

      </div>
    </div>
  );
}
