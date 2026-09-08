import React from 'react';
import { Brain, CheckSquare, BarChart3, Users, Sparkles, ChevronRight } from 'lucide-react';

export default function VisionAdvantage() {
  const steps = [
    {
      num: '01',
      title: 'Concept Mastery & Smart Classes',
      desc: 'Deep conceptual grounding in Mathematics, Physics, Chemistry & Biology taught by senior IIT-JEE mentors.',
      icon: Brain,
      color: 'bg-blue-50 text-blue-900 border-blue-200'
    },
    {
      num: '02',
      title: 'Daily Practice Problems (DPP)',
      desc: 'Targeted daily problem sets engineered to sharpen analytical speed, logical reasoning, and accuracy.',
      icon: CheckSquare,
      color: 'bg-amber-50 text-amber-900 border-amber-200'
    },
    {
      num: '03',
      title: 'Weekly Mock Tests & Analytics',
      desc: 'Regular Board & Competitive pattern assessments with detailed performance insights sent to parents.',
      icon: BarChart3,
      color: 'bg-blue-50 text-blue-900 border-blue-200'
    },
    {
      num: '04',
      title: 'Personalized Doubt Remediation',
      desc: 'Dedicated one-on-one doubt-clearing sessions ensuring no student is left behind in any topic.',
      icon: Users,
      color: 'bg-amber-50 text-amber-900 border-amber-200'
    }
  ];

  return (
    <section id="methodology" className="py-16 bg-white text-slate-800 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Proven Pedagogical Model</span>
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            The Vision Advantage — 4-Step Learning Methodology
          </h2>
          <p className="text-slate-600 text-base">
            Our integrated foundation framework builds strong fundamentals for 10th Board Exams & Competitive Success.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative flex flex-col justify-between hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${step.color} shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-heading font-black text-2xl text-slate-300 tracking-widest">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-lg text-blue-950 mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200 flex items-center text-xs font-extrabold text-blue-950 group-hover:text-amber-600 transition-colors">
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
