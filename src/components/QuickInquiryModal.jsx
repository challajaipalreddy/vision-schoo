import React, { useState } from 'react';
import { X, Send, CheckCircle2, ClipboardList, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuickInquiryModal({ isOpen, onClose, onAddInquiry }) {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    studentName: '',
    targetClass: 'Class 8 (IIT Foundation Batch)',
    previousSchool: '',
    transportNeeded: 'Yes - Transport Fleet Needed',
    contactTime: 'Morning (9:00 AM - 12:00 PM)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

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

    if (onAddInquiry) {
      onAddInquiry({
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        status: 'New Inquiry'
      });
    }

    setSubmitted(true);
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      parentName: '',
      phone: '',
      email: '',
      studentName: '',
      targetClass: 'Class 8 (IIT Foundation Batch)',
      previousSchool: '',
      transportNeeded: 'Yes - Transport Fleet Needed',
      contactTime: 'Morning (9:00 AM - 12:00 PM)',
      message: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn font-sans">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <img src="/logo.jpg" alt="Logo" className="w-12 h-12 rounded-full ring-2 ring-amber-400 p-0.5 object-cover" />
          <div>
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Admissions 2026-27
            </span>
            <h2 className="font-heading font-black text-xl sm:text-2xl text-blue-950 uppercase tracking-tight">
              Online Admission Inquiry Form
            </h2>
            <p className="text-slate-500 text-xs font-medium">
              Vision I.I.T. Foundation School • Complete all details for direct office connection
            </p>
          </div>
        </div>

        {submitted ? (
          /* SUCCESS SCREEN */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-950 border border-blue-200 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-blue-900" />
            </div>
            <h3 className="font-heading font-black text-2xl text-blue-950">Inquiry Successfully Submitted!</h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.parentName}</strong>. Your inquiry for <strong>{formData.studentName}</strong> ({formData.targetClass}) has been logged in our administrative portal.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 max-w-md mx-auto text-xs text-slate-700 font-semibold space-y-1">
              <div>📞 Our admission desk will call you at: <strong className="text-blue-950">{formData.phone}</strong></div>
              <div>⏰ Preferred Callback Time: <strong>{formData.contactTime}</strong></div>
            </div>
            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-xs px-8 py-3 rounded-xl uppercase tracking-wider shadow"
              >
                Close & Return to Website
              </button>
            </div>
          </div>
        ) : (
          /* FORM WITH ALL INPUT DETAILS */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Row 1: Parent Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                  Parent / Guardian Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-900 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-900 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Row 2: Student Name & Target Grade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sai Praneeth"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-900 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                  Seeking Grade / Class *
                </label>
                <select
                  value={formData.targetClass}
                  onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-900 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none"
                >
                  {classesList.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Email & Previous School */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. parent@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-900 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                  Previous School / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. St. Josephs School, Sattenapalli"
                  value={formData.previousSchool}
                  onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-900 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Row 4: Transport & Preferred Contact Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                  Bus Transport Facility
                </label>
                <select
                  value={formData.transportNeeded}
                  onChange={(e) => setFormData({ ...formData, transportNeeded: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-900 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none"
                >
                  <option value="Yes - Transport Fleet Needed">Yes — School Bus Transport Needed</option>
                  <option value="No - Self Transport">No — Parent Self Transport</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Callback Time
                </label>
                <select
                  value={formData.contactTime}
                  onChange={(e) => setFormData({ ...formData, contactTime: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 focus:border-blue-900 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none"
                >
                  <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                  <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                  <option value="Evening (3:00 PM - 6:00 PM)">Evening (3:00 PM - 6:00 PM)</option>
                </select>
              </div>
            </div>

            {/* Row 5: Message */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                Specific Questions / Inquiry Notes
              </label>
              <textarea
                rows="2.5"
                placeholder="Write any questions regarding IIT foundation entrance test, syllabus, or hostel..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 focus:border-blue-900 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs py-3.5 rounded-xl shadow-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-transform transform hover:scale-[1.01]"
            >
              <Send className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>SUBMIT INQUIRY DETAILS TO ADMISSION DESK</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
