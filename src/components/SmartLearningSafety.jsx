import React from 'react';
import { Cpu, Monitor, FlaskConical, Bus, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SmartLearningSafety() {
  const highlights = [
    {
      title: 'Robotics & STEM Innovation Lab',
      desc: 'Hands-on coding, automation, and science experiment kits fostering early engineering acumen.',
      icon: Cpu,
      tag: 'STEM Education'
    },
    {
      title: 'Interactive Digital Classrooms',
      desc: 'Smart digital boards and 3D visual modules making complex Math & Science concepts clear.',
      icon: Monitor,
      tag: 'Smart Tech'
    },
    {
      title: 'Physics & Chemistry Demo Labs',
      desc: 'Fully equipped practical laboratories for experimental learning and Olympiad preparation.',
      icon: FlaskConical,
      tag: 'Practical Learning'
    },
    {
      title: 'GPS-Tracked Transport Fleet',
      desc: 'Modern buses covering major city routes with real-time GPS tracking and female attendants on board.',
      icon: Bus,
      tag: 'Safe Transit'
    },
    {
      title: '24/7 CCTV & Child-Safe Campus',
      desc: 'Continuous round-the-clock surveillance, gated security checkpoint, and 100% child safety protocols.',
      icon: ShieldCheck,
      tag: 'Campus Security'
    }
  ];

  return (
    <section id="smart-learning" className="py-16 bg-slate-50 text-slate-800 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Academic Ecosystem & Care
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            Smart Learning Environment & Campus Safety
          </h2>
          <p className="text-slate-600 text-base">
            Equipping students with modern learning tools while ensuring absolute safety on campus and during transit.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-950 border border-blue-200 flex items-center justify-center shadow-xs">
                    <Icon className="w-6 h-6 text-blue-900" />
                  </div>
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-extrabold text-lg text-blue-950 flex items-center gap-2">
                    <span>{item.title}</span>
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-emerald-700 text-xs font-extrabold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Operational & Supervised</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
