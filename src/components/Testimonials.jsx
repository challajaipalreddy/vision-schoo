import React from 'react';
import { Quote, Star } from 'lucide-react';

export default function Testimonials({ testimonials }) {
  return (
    <section className="py-16 bg-white text-slate-800 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            Parent & Alumni Reviews
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <Quote className="w-8 h-8 text-amber-500 mb-2" />
              <p className="text-slate-600 text-xs leading-relaxed italic">"{item.text}"</p>
              <div className="mt-4 pt-3 border-t border-slate-200">
                <h4 className="font-heading font-extrabold text-sm text-blue-950">{item.name}</h4>
                <p className="text-amber-700 text-xs font-bold">{item.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
