import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Award, Trophy, GraduationCap, Users } from 'lucide-react';

export default function Hero({ stats, customSlides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultSlides = [
    {
      id: 1,
      image: "/slide1.jpg",
      fallbackUrl: "https://lh3.googleusercontent.com/grass-cs/ACvplmMaZMQqEib0MzvzAz2_vE0s37de_ZRc0WLEOEAF-9_88EqIkLz1npPsPNChJLMedVy89s7h0vvSp0HmyyZWr9cNUqWMre0z4xUFIodH3puK_F5dm0AQSlP2ktcUPfua4dBY3K-VRQ=s1360-w1360-h1020-rw",
      title: "Welcome to Vision I.I.T. Foundation School",
      subtitle: "Nurturing Academic Excellence & Early IIT-JEE / NEET Competitive Advantage",
      tag: "ESTABLISHED 2001 • STATE & IIT FOUNDATION WING"
    },
    {
      id: 2,
      image: "/slide2.jpg",
      fallbackUrl: "https://lh3.googleusercontent.com/grass-cs/ACvplmM9UPZ3acPwdoIVTSL8_Y98LluyygBbhvU3solkfeAveFxfIHqq-AeQY8G744Vb4Rv1GhBUfkNQIjNtfNbAJcH_9u-xfAf9C5dEXjXnrgYHLHBJL6lv8V9TBEgQAk0rARPyHNY=s1360-w1360-h1020-rw",
      title: "Empowering Students for Bright Futures",
      subtitle: "Personalized Student Mentorship, Interactive Classrooms & Practical Mastery",
      tag: "EXPERIENCED IIT-JEE FACULTY & MENTORS"
    },
    {
      id: 3,
      image: "/slide3.jpg",
      fallbackUrl: "https://lh3.googleusercontent.com/grass-cs/ACvplmN_0DrDl2LVd1vasoJHwxQ0gKX6adjoeOuB8WAUpXoFGkBIACISCIIEs8II55ms25cVeu6h3i7M0-7jS3u23aXINRW-pcGWNYZV6ZpMm4Xqa-Av-5eJUJ1IjmhhRIUHHRJGo5YhcQ=s1360-w1360-h1020-rw",
      title: "100% 10th Board Pass Rate & Top Ranks",
      subtitle: "Consistently Producing 10/10 GPA Achievers & National Olympiad Winners",
      tag: "PROVEN HISTORICAL RESULTS"
    }
  ];

  const slides = (customSlides && customSlides.length > 0) ? customSlides : defaultSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section id="hero" className="w-full bg-white font-sans">
      
      {/* Top Photo Slider Carousel using Custom/Uploaded Images */}
      <div className="relative w-full h-[55vh] sm:h-[65vh] lg:h-[72vh] bg-slate-100 overflow-hidden group">
        
        {/* Slider Images */}
        {slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              onError={(e) => { if (slide.fallbackUrl) e.target.src = slide.fallbackUrl; }}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/25 to-transparent" />

            {/* Slide Content Caption */}
            <div className="absolute inset-0 flex items-center justify-center text-center p-4">
              <div className="max-w-4xl space-y-3 text-white">
                <span className="inline-block bg-amber-500 text-slate-950 text-xs sm:text-sm font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {slide.tag || "VISION IIT FOUNDATION SCHOOL"}
                </span>

                <h2 className="font-heading font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-white drop-shadow-md">
                  {slide.title}
                </h2>

                {slide.subtitle && (
                  <p className="text-xs sm:text-base text-slate-100 font-bold max-w-2xl mx-auto drop-shadow">
                    {slide.subtitle}
                  </p>
                )}

                <div className="pt-3 flex flex-wrap justify-center gap-3">
                  <a
                    href="#admissions"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow-lg uppercase tracking-wider transition-transform transform hover:scale-105"
                  >
                    Admissions 2026-27
                  </a>
                  <a
                    href="#results"
                    className="bg-white hover:bg-slate-100 text-blue-950 font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow uppercase tracking-wider transition-all"
                  >
                    View 10th Results
                  </a>
                </div>
              </div>
            </div>

          </div>
        ))}

        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-blue-950 shadow-md border border-slate-200 transition-all"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-blue-950 shadow-md border border-slate-200 transition-all"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentSlide ? 'w-8 bg-amber-500' : 'w-2.5 bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Highlights Bar */}
      <div className="bg-slate-50 border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-black text-xl text-blue-950">{stats.yearsExcellence}</div>
              <div className="text-xs text-slate-600 font-bold">Years of Excellence</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-black text-xl text-blue-950">{stats.passPercentage}</div>
              <div className="text-xs text-slate-600 font-bold">10th Class Pass Rate</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-black text-xl text-blue-950">{stats.iitSelections}</div>
              <div className="text-xs text-slate-600 font-bold">IIT / NIT Alumni</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-black text-xl text-blue-950">{stats.expertFaculty}</div>
              <div className="text-xs text-slate-600 font-bold">Expert Teachers</div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
