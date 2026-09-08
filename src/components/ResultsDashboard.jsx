import React, { useState } from 'react';
import { Trophy, Star, Search } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResultsDashboard({ resultsHistory }) {
  // Dynamically extract all batch years available in resultsHistory
  const availableYears = Object.keys(resultsHistory).sort((a, b) => Number(b) - Number(a));
  const [selectedYear, setSelectedYear] = useState(availableYears[0] || '2025');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  const currentData = resultsHistory[selectedYear] || { passRate: "100%", topGpaCount: 0, distinctionRate: "90%", schoolAverage: "9.2 / 10", toppers: [] };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
  };

  const filteredToppers = (currentData.toppers || []).filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.rank.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="results" className="py-16 bg-white text-slate-800 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="inline-block bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            10th Class Board Results
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            10th Class Board Achievers & Historical Performance
          </h2>
          <p className="text-slate-600 text-base">
            Consistently producing 100% pass rates and top 10/10 GPA achievers in state board examinations.
          </p>
        </div>

        {/* Dynamic Year Filter Buttons (Dynamically generated from staff inputs!) */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-8">
          <span className="text-slate-500 text-xs font-bold mr-2 uppercase">Select Batch Year:</span>
          {availableYears.map((year) => (
            <button
              key={year}
              onClick={() => handleYearChange(year)}
              className={`px-4 py-2 rounded-lg font-heading font-extrabold text-xs transition-all ${
                selectedYear === year
                  ? 'bg-amber-500 text-slate-950 shadow scale-105'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Batch {year}
            </button>
          ))}
        </div>

        {/* Highlight Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-center shadow-xs">
            <div className="text-blue-900 font-black text-3xl font-heading">{currentData.passRate}</div>
            <div className="text-slate-600 text-xs font-semibold mt-1">10th Class Pass Rate</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-center shadow-xs">
            <div className="text-amber-600 font-black text-3xl font-heading">{currentData.topGpaCount}</div>
            <div className="text-slate-600 text-xs font-semibold mt-1">10/10 GPA Achievers</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-center shadow-xs">
            <div className="text-blue-900 font-black text-3xl font-heading">{currentData.distinctionRate}</div>
            <div className="text-slate-600 text-xs font-semibold mt-1">Distinction Percentage</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-center shadow-xs">
            <div className="text-blue-900 font-black text-3xl font-heading">{currentData.schoolAverage}</div>
            <div className="text-slate-600 text-xs font-semibold mt-1">Batch School Average</div>
          </div>

        </div>

        {/* Floating Student Photos Showcase Container */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden py-10">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-heading font-black text-xl text-blue-950 flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                <span>Wall of Fame — Batch {selectedYear} Toppers</span>
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">
                Hover to pause moving student photos.
              </p>
            </div>

            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topper name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-800 text-xs rounded-lg pl-9 pr-3 py-1.5 focus:outline-none focus:border-blue-900"
              />
            </div>
          </div>

          {/* Floating Showcase Ribbon (NO DUPLICATIONS) */}
          {filteredToppers.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">
              No topper entry added yet for Batch {selectedYear}. Staff can add toppers in Admin CMS!
            </div>
          ) : filteredToppers.length <= 4 ? (
            /* Render each topper exactly once centered */
            <div className="flex flex-wrap justify-center items-center gap-6 py-6">
              {filteredToppers.map((topper, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={topper.id || idx}
                    className={`w-64 shrink-0 bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-md hover:shadow-xl transition-all ${
                      isEven ? 'animate-float-slow' : 'animate-float-reverse'
                    }`}
                  >
                    <div className="relative mb-3">
                      <img
                        src={topper.photo}
                        alt={topper.name}
                        className="w-32 h-36 rounded-2xl object-cover mx-auto ring-4 ring-amber-400 shadow-md transform hover:scale-105 transition-transform"
                      />
                      <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-xs font-black px-3 py-0.5 rounded-full shadow-md">
                        {topper.gpa}
                      </span>
                    </div>

                    <h4 className="font-heading font-extrabold text-base text-blue-950 mt-3 truncate">{topper.name}</h4>
                    <span className="inline-block bg-blue-50 text-blue-950 text-xs font-bold px-2.5 py-0.5 rounded mt-1 border border-blue-200">
                      {topper.rank}
                    </span>
                    <p className="text-slate-500 text-xs italic mt-2 line-clamp-2 leading-relaxed">
                      "{topper.quote}"
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="overflow-hidden whitespace-nowrap py-6"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className={`inline-flex gap-8 transition-all ${
                  isPaused ? '' : 'animate-[marquee_24s_linear_infinite]'
                }`}
              >
                {filteredToppers.map((topper, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div
                      key={topper.id || idx}
                      className={`w-64 shrink-0 bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-md hover:shadow-xl transition-all whitespace-normal ${
                        isEven ? 'animate-float-slow' : 'animate-float-reverse'
                      }`}
                    >
                      <div className="relative mb-3">
                        <img
                          src={topper.photo}
                          alt={topper.name}
                          className="w-32 h-36 rounded-2xl object-cover mx-auto ring-4 ring-amber-400 shadow-md transform hover:scale-105 transition-transform"
                        />
                        <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-xs font-black px-3 py-0.5 rounded-full shadow-md">
                          {topper.gpa}
                        </span>
                      </div>

                      <h4 className="font-heading font-extrabold text-base text-blue-950 mt-3 truncate">{topper.name}</h4>
                      <span className="inline-block bg-blue-50 text-blue-950 text-xs font-bold px-2.5 py-0.5 rounded mt-1 border border-blue-200">
                        {topper.rank}
                      </span>
                      <p className="text-slate-500 text-xs italic mt-2 line-clamp-2 leading-relaxed">
                        "{topper.quote}"
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
