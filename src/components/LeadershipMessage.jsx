import React from 'react';
import { Target, Compass, Award, Quote, Sparkles } from 'lucide-react';

export default function LeadershipMessage({ headOfSchool }) {
  const leader = headOfSchool || {
    name: "Dr. K. R. V. Prasad",
    title: "Founder & Chairman",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500",
    quote: "True education builds both intellectual clarity and moral strength.",
    message: "Welcome to Vision I.I.T. Foundation School. Our unique foundation program starts early in middle school, ensuring that students master the core fundamentals of science and mathematics without stress. With a 100% 10th Class Board pass rate and dozens of top 10/10 GPA achievers every year, our dedicated faculty works tirelessly to guide every student toward their dream career."
  };

  return (
    <section id="about" className="py-16 bg-white text-slate-800 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            About Our School
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            Building Strong Academic Foundations Since 2001
          </h2>
          <p className="text-slate-600 text-base">
            Guided by our core motto <em className="text-amber-700 font-serif font-bold font-italic">"— Improving Thoughts —"</em>, Vision I.I.T. Foundation School nurtures intelligence, discipline, and competitive excellence.
          </p>
        </div>

        {/* 3 Pillar Cards: Vision, Mission, Dolphin Ethos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-blue-950 mb-2">Our Vision</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To empower every young student with deep conceptual mastery in Mathematics, Physics, Chemistry, and Biology needed to excel in 10th Board and national competitive exams.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-blue-950 mb-2">Our Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To deliver a balanced syllabus combining state board excellence with integrated IIT-JEE foundation coaching, fostering curiosity, critical reasoning, and integrity.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-blue-950 mb-2">The Dolphin Ethos</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Featured on our school emblem, dolphins represent intelligence, enthusiasm, teamwork, and leaping towards higher goals. We teach students to overcome challenges with joy.
            </p>
          </div>

        </div>

        {/* Head of School / Principal's Desk Message */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 text-center">
              <img
                src={leader.photo}
                alt={leader.name}
                className="w-48 h-60 sm:w-56 sm:h-64 rounded-2xl object-cover ring-4 ring-amber-400 mx-auto shadow-md"
              />
              <div className="mt-4">
                <h4 className="font-heading font-extrabold text-xl text-white">{leader.name}</h4>
                <p className="text-amber-400 text-xs font-bold uppercase mt-0.5">{leader.title}</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-3">
              <Quote className="w-8 h-8 text-amber-400" />
              {leader.quote && (
                <h3 className="font-heading font-bold text-2xl text-white">
                  "{leader.quote}"
                </h3>
              )}
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {leader.message}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
