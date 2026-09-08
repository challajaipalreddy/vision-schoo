import React, { useState } from 'react';
import { Bell, Calendar, Download, ChevronRight, ExternalLink } from 'lucide-react';

export default function NoticeBoard({ notices }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeNoticeModal, setActiveNoticeModal] = useState(null);

  const categories = ['All', 'Admissions', 'Exams', 'Events', 'Circulars', 'Achievements'];

  const filteredNotices = selectedCategory === 'All'
    ? notices
    : notices.filter(n => n.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="notices" className="py-16 bg-white text-slate-800 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            School Circulars
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            Latest Announcements & Notice Board
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotices.map((notice) => (
            <div key={notice.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded">
                    {notice.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{notice.date}</span>
                </div>
                <h3 className="font-heading font-bold text-base text-blue-950">{notice.title}</h3>
                <p className="text-slate-600 text-xs line-clamp-3">{notice.details}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => setActiveNoticeModal(notice)}
                  className="text-blue-900 hover:text-amber-600 text-xs font-bold flex items-center gap-1"
                >
                  <span>Read Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <Download className="w-4 h-4 text-amber-600 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {activeNoticeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded">
                  {activeNoticeModal.category}
                </span>
                <span className="text-xs text-slate-500">{activeNoticeModal.date}</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-blue-950">{activeNoticeModal.title}</h3>
              <p className="text-slate-600 text-sm">{activeNoticeModal.details}</p>
              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button onClick={() => setActiveNoticeModal(null)} className="px-4 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
