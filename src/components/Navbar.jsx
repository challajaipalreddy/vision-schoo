import React, { useState } from 'react';
import { Phone, Mail, Clock, Search, Menu, X, Shield, Sparkles, ChevronRight, MessageSquare } from 'lucide-react';

export default function Navbar({ onOpenSearch, onOpenAdmin, onOpenInquiry }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Academics & IIT Wing', href: '#academics' },
    { name: '10th Results', href: '#results' },
    { name: 'Notice Board', href: '#notices' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Faculty', href: '#faculty' },
    { name: 'Admissions', href: '#admissions' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleInquiryClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onOpenInquiry) {
      onOpenInquiry();
    } else {
      handleNavClick(e, '#admissions');
    }
  };

  return (
    <header className="w-full font-sans bg-white shadow-sm sticky top-0 z-50 border-b border-slate-200">
      
      {/* Top Info Bar */}
      <div className="bg-blue-950 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap font-medium">
            <span className="flex items-center gap-1.5 hover:text-amber-400">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <a href="tel:+919848012345">+91 98480 12345</a>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 hover:text-amber-400">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <a href="mailto:info@visioniitschool.edu.in">info@visioniitschool.edu.in</a>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Hours: 8:00 AM - 5:00 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/30 font-bold text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Admissions Open 2026-27
            </span>

            {/* TOP INQUIRE BUTTON */}
            <button
              onClick={handleInquiryClick}
              className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-0.5 rounded-full font-black text-[11px] shadow-xs uppercase tracking-wider transition-all transform hover:scale-105"
            >
              <MessageSquare className="w-3 h-3 fill-slate-950 text-slate-950" />
              <span>Inquire Now</span>
            </button>

            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 bg-blue-900 hover:bg-blue-800 text-amber-300 px-2.5 py-0.5 rounded border border-blue-700 text-[11px] font-bold transition-colors"
            >
              <Shield className="w-3 h-3 text-amber-400" />
              <span>Admin CMS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Banner (Centered Clean Title & Logo) */}
      <div className="bg-white py-4 px-4 sm:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          
          {/* Logo */}
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 shrink-0">
            <img
              src="/logo.jpg"
              alt="Vision I.I.T. Foundation School Crest"
              className="h-16 sm:h-20 w-auto rounded-full ring-2 ring-amber-500 shadow-sm bg-white p-0.5"
            />
          </a>

          {/* Center Title & Subtitles */}
          <div className="text-center flex-1">
            <h1 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl tracking-tight leading-tight uppercase">
              <span className="text-blue-950">VISION I.I.T.</span>{' '}
              <span className="text-amber-600">FOUNDATION SCHOOL</span>
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-2 mt-1 text-xs sm:text-sm font-extrabold">
              <span className="text-blue-900 bg-blue-50 px-3 py-0.5 rounded border border-blue-200 uppercase">
                STATE BOARD & IIT-JEE FOUNDATION WING
              </span>
              <span className="text-amber-700 font-extrabold">(ESTD. 2001)</span>
            </div>

            <p className="text-xs sm:text-sm font-serif italic text-amber-800 mt-1 font-bold">
              — Improving Thoughts —
            </p>
          </div>

          {/* Right Header Action Button */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              onClick={handleInquiryClick}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl shadow uppercase tracking-wider inline-flex items-center gap-2 transition-transform transform hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>Inquire Now</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Horizontal Navigation Menu Bar */}
      <div className="bg-blue-900 text-white border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 py-1.5 mx-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs xl:text-sm font-extrabold text-white hover:text-amber-300 hover:bg-blue-800 px-3.5 py-2 rounded transition-colors uppercase tracking-wider whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action: Search & Inquire */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-white hover:text-amber-300 hover:bg-blue-800 rounded-lg transition-colors"
              aria-label="Search Website"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Bar */}
          <div className="flex lg:hidden items-center justify-between w-full py-2.5">
            <button
              onClick={handleInquiryClick}
              className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase flex items-center gap-1 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
              <span>Inquire</span>
            </button>

            <div className="flex items-center gap-2">
              <button onClick={onOpenSearch} className="p-1.5 text-white">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1.5 text-white bg-blue-800 rounded">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-blue-950 text-white border-b border-blue-800 animate-fadeIn">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-sm font-extrabold text-white hover:text-amber-300 hover:bg-blue-900 px-3 py-2 rounded"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-blue-800">
              <button
                onClick={handleInquiryClick}
                className="block w-full text-center bg-amber-500 text-slate-950 font-black text-sm py-2.5 rounded shadow uppercase flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Inquire for Admission 2026-27</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
