import React, { useState } from 'react';
import { Building2, Laptop, BookOpen, Dumbbell, Bus, Sparkles, Check } from 'lucide-react';

export default function Infrastructure() {
  const [selectedFacility, setSelectedFacility] = useState(0);

  const facilities = [
    {
      id: 'labs',
      title: 'Advanced Science Labs',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000',
      description: 'Fully equipped Physics, Chemistry, and Biology laboratories designed for hands-on experimentation, scientific discovery, and competitive exam practical mastery.',
      features: ['Individual experiment stations', 'High-precision optical microscopes', 'Safety shower & exhaust hoods', 'Digital sensor data loggers']
    },
    {
      id: 'computer',
      title: 'Robotics & Computer Lab',
      icon: Laptop,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000',
      description: 'High-speed computer work-lab equipped with latest desktop processors, high-speed fiber internet, Python/C++ IDEs, and STEM robotics kits for coding enthusiasts.',
      features: ['1:1 Student to PC ratio', 'AI & Python coding modules', 'Arduino & Robotics kits', 'High-speed 1Gbps fiber net']
    },
    {
      id: 'smart-class',
      title: 'Digital Smart Classrooms',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1000',
      description: 'Air-conditioned digital classrooms with 4K interactive touch boards, 3D animated subject visualizations, and acoustic treatment for focused learning.',
      features: ['4K Interactive touch displays', 'Ergonomic dual desk seating', 'Audio-visual animated lectures', 'Lecture recording for revision']
    },
    {
      id: 'library',
      title: 'Central Digital Library',
      icon: BookOpen,
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000',
      description: 'A serene reading haven holding over 15,000 reference books, competitive IIT-JEE / NEET prep archives, international science journals, and e-learning tablets.',
      features: ['15,000+ Printed & E-books', 'Quiet individual study carrels', 'JEE/Olympiad archive corner', 'Digital book search catalog']
    },
    {
      id: 'sports',
      title: 'Sports Arena & Playground',
      icon: Dumbbell,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1000',
      description: 'Spacious outdoor athletic field for cricket, football, basketball court, and indoor badminton/chess rooms under professional NIS-certified sports coaches.',
      features: ['Full-size sports ground', 'Basketball & Badminton courts', 'Professional sports trainers', 'Annual athletics championship']
    },
    {
      id: 'transport',
      title: 'GPS Transport & Safety',
      icon: Bus,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000',
      description: 'Comprehensive transport fleet covering all major city routes with real-time GPS parent tracking, speed governors, female bus attendants, and CCTV monitoring.',
      features: ['Live GPS tracking on Parent App', 'Female attendants on every route', '100% CCTV surveillance campus', 'Emergency first-aid equipped']
    }
  ];

  const current = facilities[selectedFacility];

  return (
    <section id="facilities" className="py-16 bg-slate-50 text-slate-800 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            World-Class Infrastructure
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            Designed to Inspire & Nurture Potential
          </h2>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 space-y-2">
            {facilities.map((fac, idx) => {
              const IconComp = fac.icon;
              const isSelected = selectedFacility === idx;
              return (
                <button
                  key={fac.id}
                  onClick={() => setSelectedFacility(idx)}
                  className={`w-full p-3.5 rounded-xl text-left transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-blue-900 text-white border-blue-900 font-bold shadow'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-blue-900'}`} />
                    <span className="text-sm font-heading font-bold">{fac.title}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="relative rounded-xl overflow-hidden h-64 sm:h-72">
              <img src={current.image} alt={current.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-3 left-3 bg-blue-950/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded">
                {current.title}
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">{current.description}</p>

            <div className="border-t border-slate-100 pt-3">
              <h4 className="font-heading font-bold text-xs text-blue-900 uppercase mb-2">Key Highlights:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {current.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded border border-slate-200">
                    <Check className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
