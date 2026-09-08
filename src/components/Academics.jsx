import React, { useState } from 'react';
import { Atom, Brain, CheckCircle2, ChevronRight, Cpu } from 'lucide-react';

export default function Academics() {
  const [activeTab, setActiveTab] = useState('iit-wing');

  const tabs = [
    { id: 'iit-wing', title: 'IIT & NEET Foundation Wing', subtitle: 'Class 6 - 10 (Specialized)' },
    { id: 'high-school', title: 'High School (Class 8-10)', subtitle: 'State Board Syllabus' },
    { id: 'primary', title: 'Primary & Middle School', subtitle: 'Nursery - Class 7' }
  ];

  return (
    <section id="academics" className="py-16 bg-slate-50 text-slate-800 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Academic Programs
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            Integrated State Board & Competitive Foundation
          </h2>
          <p className="text-slate-600 text-base">
            Curriculum tailored to ensure 100% 10th Board success alongside national Olympiad and IIT-JEE preparation.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-xl font-heading font-bold text-sm transition-all text-left border ${
                activeTab === tab.id
                  ? 'bg-blue-900 text-white border-blue-900 shadow'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div>{tab.title}</div>
              <div className={`text-xs ${activeTab === tab.id ? 'text-amber-300' : 'text-slate-500'}`}>
                {tab.subtitle}
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        {activeTab === 'iit-wing' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                  <Brain className="w-4 h-4 text-amber-600" />
                  Flagship Program
                </span>
                
                <h3 className="font-heading font-extrabold text-2xl text-blue-950">
                  IIT-JEE, NEET & Olympiad Integrated Wing
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  Specialized analytical problem-solving modules in Physics, Chemistry, and Mathematics designed by IIT alumni mentors to give students a 2-year early start over peers across India.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-950 text-sm">Level 1 - Level 3 Workbooks</h4>
                      <p className="text-slate-500 text-xs mt-0.5">Graded question sets for board & competitive mastery.</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-950 text-sm">Weekly Mock Assessment</h4>
                      <p className="text-slate-500 text-xs mt-0.5">Detailed error analysis and rank tracking.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="#admissions"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-lg shadow"
                  >
                    <span>Apply for Foundation Entrance</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-blue-950 text-white p-6 rounded-xl space-y-4">
                  <h4 className="font-heading font-bold text-lg text-amber-400 flex items-center gap-2 border-b border-blue-800 pb-2">
                    <Cpu className="w-5 h-5" />
                    <span>Program Highlights</span>
                  </h4>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                      <span>Concept clarity 2 years ahead of standard board syllabus.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                      <span>100% synchronized with state board 10th examinations.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                      <span>1,500+ successful alumni in top IITs, NITs & AIIMS.</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'high-school' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-heading font-extrabold text-xl text-blue-950 mb-2">High School Academic Rigour (Class 8, 9 & 10)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Focus on state board syllabus mastery, science lab practicals, answer presentation workshops, and 100% 10th Board pass rate preparation.
            </p>
          </div>
        )}

        {activeTab === 'primary' && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-heading font-extrabold text-xl text-blue-950 mb-2">Primary & Middle School (Nursery - Class 7)</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Experiential learning, play-based activities, reading corners, basic mathematics logic, and character building in a caring environment.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
