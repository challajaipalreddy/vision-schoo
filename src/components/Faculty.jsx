import React from 'react';

export default function Faculty({ faculty }) {
  return (
    <section id="faculty" className="py-16 bg-white text-slate-800 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Faculty & Mentors
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            Distinguished Subject Experts
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map((member, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-all">
              <img
                src={member.photo}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover mx-auto ring-2 ring-amber-500 shadow mb-3"
              />
              <h3 className="font-heading font-extrabold text-base text-blue-950">{member.name}</h3>
              <p className="text-amber-700 font-bold text-xs">{member.role}</p>
              <span className="inline-block text-slate-500 text-[11px] font-semibold bg-white px-2 py-0.5 rounded border border-slate-200 mt-1">
                {member.qualification}
              </span>
              <p className="text-slate-600 text-xs mt-3 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
