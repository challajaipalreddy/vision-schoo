import React, { useState } from 'react';
import { ClipboardList, CheckCircle2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Admissions({ onAddInquiry }) {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    studentName: '',
    targetClass: 'Class 8 (IIT Foundation Batch)',
    previousSchool: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const classesList = [
    'Nursery / LKG / UKG',
    'Class 1 - 5 (Primary Wing)',
    'Class 6 (IIT Foundation Wing)',
    'Class 7 (IIT Foundation Wing)',
    'Class 8 (IIT Foundation Batch)',
    'Class 9 (IIT Foundation Batch)',
    'Class 10 (Board & IIT Batch)'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone || !formData.studentName) return;

    setFormSubmitted(true);
    if (onAddInquiry) {
      onAddInquiry({
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleDateString(),
        status: 'New Inquiry'
      });
    }
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
  };

  return (
    <section id="admissions" className="py-16 bg-slate-50 text-slate-800 font-sans border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Admissions 2026-27
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            Online Admission Application Form
          </h2>
          <p className="text-slate-600 text-base">
            Enroll your child in Vision I.I.T. Foundation School. Fill in the inquiry details below.
          </p>
        </div>

        {/* 4 Step Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 text-center">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs inline-flex items-center justify-center mb-1">1</span>
            <div className="font-bold text-xs text-blue-950">Online Inquiry</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs inline-flex items-center justify-center mb-1">2</span>
            <div className="font-bold text-xs text-blue-950">Diagnostic Test</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs inline-flex items-center justify-center mb-1">3</span>
            <div className="font-bold text-xs text-blue-950">Counseling</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
            <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs inline-flex items-center justify-center mb-1">4</span>
            <div className="font-bold text-xs text-blue-950">Enrollment</div>
          </div>
        </div>

        {/* Clean Application Form Card (Merit Scholarship & Prospectus Removed as requested) */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <h3 className="font-heading font-black text-xl text-blue-950 mb-4 border-b border-slate-100 pb-3">
            Inquiry & Registration Form
          </h3>

          {formSubmitted ? (
            <div className="bg-blue-50 border border-blue-200 p-8 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-14 h-14 text-blue-900 mx-auto" />
              <h4 className="font-heading font-extrabold text-2xl text-blue-950">Application Submitted!</h4>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Thank you, <strong>{formData.parentName}</strong>. Our school office will contact you shortly at <strong>{formData.phone}</strong>.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="bg-blue-950 text-white text-xs font-extrabold px-6 py-2.5 rounded-xl uppercase tracking-wider"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sai Praneeth"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Seeking Grade / Class *</label>
                  <select
                    value={formData.targetClass}
                    onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-900"
                  >
                    {classesList.map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="e.g. parent@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Additional Notes / Queries</label>
                <textarea
                  rows="3"
                  placeholder="Any specific questions for school admissions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-900"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm py-3.5 rounded-xl shadow uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Admission Application</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
