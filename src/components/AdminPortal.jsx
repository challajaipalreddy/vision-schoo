import React, { useState, useEffect } from 'react';
import {
  Shield, Lock, Plus, Trash2, CheckCircle2, Bell, Image, Trophy,
  Inbox, X, LogOut, LayoutDashboard, Upload, RotateCw, Video, Users,
  MessageSquare, ExternalLink, Eye, EyeOff, UserCheck, Sparkles, Wand2,
  Bot, Scan, Shuffle, RefreshCw, Zap, Scissors, ZoomIn
} from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_STUDENT_QUOTES = [
  "Vision IIT School's daily foundation tests helped me achieve 10/10 GPA!",
  "Conceptual clarity in Math and Science was the key to my top score.",
  "Rigorous practice and expert faculty guidance made my dream come true.",
  "The Dolphin Ethos taught me to excel with joy and confidence.",
  "Dedicated study hours and daily doubt clearing helped me achieve 10/10 GPA!",
  "Morning study sessions and direct mentor access boost confidence every day."
];

const POSTER_STUDENT_NAMES = [
  "B. Sai Vardhan", "K. Bhavana", "M. Likith", "P. Ananya", "V. Karthik",
  "T. Tejaswini", "R. Yashwanth", "S. Keerthana", "G. Rithvik", "N. Sneha",
  "K. Tarun", "A. Divya", "D. Charan", "S. Harini", "M. Pavan", "J. Vaishnavi"
];

const POSTER_GPAS = [
  "10.0 / 10", "10.0 / 10", "10.0 / 10", "10.0 / 10",
  "9.8 / 10", "9.8 / 10", "9.7 / 10", "9.7 / 10",
  "9.6 / 10", "9.5 / 10", "9.5 / 10", "9.4 / 10"
];

const getRandomQuote = () => {
  if (!SAMPLE_STUDENT_QUOTES || !SAMPLE_STUDENT_QUOTES.length) {
    return "Dedicated study hours and faculty guidance led to great academic success.";
  }
  return SAMPLE_STUDENT_QUOTES[Math.floor(Math.random() * SAMPLE_STUDENT_QUOTES.length)];
};

export default function AdminPortal({
  isOpen,
  onClose,
  heroSlides,
  onAddHeroSlide,
  onRotateHeroSlides,
  onDeleteHeroSlide,
  gallery,
  onAddGalleryItem,
  onDeleteGalleryItem,
  videos,
  onAddVideo,
  onDeleteVideo,
  resultsHistory,
  onAddTopper,
  onBulkAddToppers,
  onRotateToppers,
  onDeleteTopper,
  faculty,
  onAddFaculty,
  onDeleteFaculty,
  testimonials,
  onAddTestimonial,
  onDeleteTestimonial,
  notices,
  onAddNotice,
  onDeleteNotice,
  inquiries,
  headOfSchool,
  onUpdateHeadOfSchool,
  isCloudSyncing,
  lastSyncTime,
  onManualPushCloud,
  onManualPullCloud
}) {
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('vision_admin_authenticated') === 'true';
  });
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem('vision_admin_active_tab') || 'overview';
  });

  // Registration State
  const [isRegistering, setIsRegistering] = useState(false);
  const [regSuccess, setRegSuccess] = useState('');
  const [regForm, setRegForm] = useState({ name: '', masterKey: '', passcode: '', confirmPasscode: '' });

  // Head of School Form State
  const [headForm, setHeadForm] = useState({
    name: headOfSchool?.name || "Dr. K. R. V. Prasad",
    title: headOfSchool?.title || "Founder & Chairman",
    photo: headOfSchool?.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500",
    quote: headOfSchool?.quote || "True education builds both intellectual clarity and moral strength.",
    message: headOfSchool?.message || "Welcome to Vision I.I.T. Foundation School. Our unique foundation program starts early in middle school, ensuring that students master the core fundamentals of science and mathematics without stress. With a 100% 10th Class Board pass rate and dozens of top 10/10 GPA achievers every year, our dedicated faculty works tirelessly to guide every student toward their dream career."
  });

  useEffect(() => {
    if (headOfSchool) {
      setHeadForm(headOfSchool);
    }
  }, [headOfSchool]);

  const handleSaveHeadOfSchool = (e) => {
    e.preventDefault();
    if (!headForm.name || !headForm.photo) return;
    if (onUpdateHeadOfSchool) {
      onUpdateHeadOfSchool(headForm);
    }
    alert("Head of School message and image updated live on website!");
  };

  const handleSelectTab = (tabName) => {
    setActiveTab(tabName);
    sessionStorage.setItem('vision_admin_active_tab', tabName);
  };

  // Form states with Mobile/Local File Upload support
  const [newSlide, setNewSlide] = useState({ title: '', subtitle: '', tag: 'IIT FOUNDATION', image: '' });
  const [newGallery, setNewGallery] = useState({ title: '', category: 'Academic', image: '', caption: '' });
  const [newVideo, setNewVideo] = useState({ title: '', category: 'Events', videoUrl: '', caption: '' });
  const [newTopper, setNewTopper] = useState({ name: '', gpa: '10.0 / 10', rank: 'State 1st Rank', quote: '', photo: '', year: '2026' });
  const [newFaculty, setNewFaculty] = useState({ name: '', role: 'Senior Mentor', qualification: 'M.Sc., Ph.D.', exp: '15+ Yrs Exp', photo: '', bio: '' });
  const [newTestimonial, setNewTestimonial] = useState({ name: '', role: 'Parent of 10th Student', text: '' });
  const [newNotice, setNewNotice] = useState({ title: '', category: 'Circulars', details: '' });

  // Dynamic Batch Years List
  const availableYears = Object.keys(resultsHistory).sort((a, b) => Number(b) - Number(a));
  const [topperYearFilter, setTopperYearFilter] = useState(availableYears[0] || '2026');



  const handleLogin = (e) => {
    if (e) e.preventDefault();
    const trimmed = pin.trim();
    if (!trimmed) {
      setAuthError('Please enter a valid staff passcode.');
      return;
    }

    const registeredPasscodes = JSON.parse(localStorage.getItem('vision_registered_passcodes') || '[]');
    const validPasscodes = ['1234', 'admin', 'vision2026', ...registeredPasscodes];

    if (validPasscodes.includes(trimmed)) {
      setIsAuthenticated(true);
      sessionStorage.setItem('vision_admin_authenticated', 'true');
      setAuthError('');
      setPin('');
    } else {
      setAuthError('Access Denied: Invalid passcode. Register passcode if new staff.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regForm.name || !regForm.passcode || !regForm.confirmPasscode) {
      setAuthError('Please fill out all registration fields.');
      return;
    }
    if (regForm.passcode !== regForm.confirmPasscode) {
      setAuthError('Passcodes do not match!');
      return;
    }

    const masterKeyUpper = regForm.masterKey.trim().toUpperCase();
    if (masterKeyUpper && masterKeyUpper !== 'VISION' && masterKeyUpper !== 'VISION2026' && masterKeyUpper !== '1234' && masterKeyUpper !== 'ADMIN') {
      setAuthError('Invalid School Master Verification Key.');
      return;
    }

    const existingPasscodes = JSON.parse(localStorage.getItem('vision_registered_passcodes') || '[]');
    if (!existingPasscodes.includes(regForm.passcode)) {
      existingPasscodes.push(regForm.passcode);
      localStorage.setItem('vision_registered_passcodes', JSON.stringify(existingPasscodes));
    }

    setRegSuccess(`Staff Admin passcode registered for ${regForm.name}! You can now log in.`);
    setPin(regForm.passcode);
    setIsRegistering(false);
    setAuthError('');
    setRegForm({ name: '', masterKey: '', passcode: '', confirmPasscode: '' });
  };

  // Generic File Upload Handler (Auto-compress mobile/PC photos)
  const handleFileUpload = (e, setTarget) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onloadend = () => setTarget(reader.result);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
        setTarget(compressedDataUrl);
      };
      img.onerror = () => {
        setTarget(event.target.result);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Action Handlers
  const handleCreateSlide = (e) => {
    e.preventDefault();
    if (!newSlide.title) {
      alert('Please enter a headline for the slide.');
      return;
    }
    if (!newSlide.image) {
      alert('Please select a photo for the slide.');
      return;
    }
    onAddHeroSlide({
      id: Date.now(),
      title: newSlide.title,
      subtitle: newSlide.subtitle || 'Vision I.I.T. Foundation School Sattenapalle',
      tag: newSlide.tag || 'IIT FOUNDATION',
      image: newSlide.image
    });
    setNewSlide({ title: '', subtitle: '', tag: 'IIT FOUNDATION', image: '' });
    alert('Top Home Banner slide added!');
  };

  const handleCreateGallery = (e) => {
    e.preventDefault();
    if (!newGallery.image || !newGallery.title) return;
    onAddGalleryItem({ id: Date.now(), type: 'image', ...newGallery });
    setNewGallery({ title: '', category: 'Academic', image: '', caption: '' });
    alert('Photo published to live Gallery!');
  };

  const handleCreateVideo = (e) => {
    e.preventDefault();
    if (!newVideo.videoUrl || !newVideo.title) return;
    onAddVideo({ id: Date.now(), ...newVideo });
    setNewVideo({ title: '', category: 'Events', videoUrl: '', caption: '' });
    alert('Video published to Video Gallery!');
  };

  const handleCreateTopper = (e) => {
    e.preventDefault();
    if (!newTopper.name || !newTopper.year) return;
    onAddTopper(newTopper.year, {
      id: Date.now(),
      name: newTopper.name,
      gpa: newTopper.gpa,
      rank: newTopper.rank,
      quote: newTopper.quote || 'Vision IIT Foundation School gave me great strength.',
      photo: newTopper.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
    });
    setTopperYearFilter(newTopper.year);
    setNewTopper({ name: '', gpa: '10.0 / 10', rank: 'State 1st Rank', quote: '', photo: '', year: newTopper.year });
    alert(`Topper added to Batch ${newTopper.year} Results Wall!`);
  };

  const handleCreateFaculty = (e) => {
    e.preventDefault();
    if (!newFaculty.name || !newFaculty.role) return;
    onAddFaculty({
      id: Date.now(),
      ...newFaculty,
      photo: newFaculty.photo || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
    });
    setNewFaculty({ name: '', role: 'Senior Mentor', qualification: 'M.Sc., Ph.D.', exp: '15+ Yrs Exp', photo: '', bio: '' });
    alert('Faculty member added to live Subject Experts grid!');
  };

  const handleCreateTestimonial = (e) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.text) return;
    onAddTestimonial({
      id: Date.now(),
      ...newTestimonial
    });
    setNewTestimonial({ name: '', role: 'Parent of 10th Student', text: '' });
    alert('Parent Testimonial added to live website!');
  };

  const handleCreateNotice = (e) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.details) return;
    onAddNotice({
      id: Date.now(),
      ...newNotice,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    });
    setNewNotice({ title: '', category: 'Circulars', details: '' });
    alert('Announcement published to live Notice Board!');
  };

  if (!isOpen) return null;

  const currentBatchToppers = resultsHistory[topperYearFilter]?.toppers || [];

  return (
    <div className="fixed inset-0 z-[100] w-screen h-screen bg-slate-100 flex flex-col font-sans text-slate-800 overflow-hidden animate-fadeIn">
      
      {/* Top Header */}
      <header className="bg-blue-950 text-white px-6 py-4 flex items-center justify-between border-b border-blue-900 shrink-0 shadow-md">
        <div className="flex items-center gap-4">
          <img src="/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full bg-white ring-2 ring-amber-400 p-0.5" />
          <div>
            <h1 className="font-heading font-black text-xl text-white tracking-wide uppercase">
              VISION I.I.T. FOUNDATION SCHOOL — ADMIN CMS
            </h1>
            <p className="text-slate-300 text-xs font-semibold">
              Full-Screen Staff Control Panel • Dynamic Batch Years & Live Site Updates
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-blue-900/80 px-3 py-1.5 rounded-lg border border-blue-700/50 text-xs">
            <span className={`w-2.5 h-2.5 rounded-full ${isCloudSyncing ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></span>
            <span className="font-medium text-slate-200">
              {isCloudSyncing ? 'Syncing to Mobile...' : lastSyncTime ? `Cloud Synced (${lastSyncTime})` : 'Cloud Active'}
            </span>
          </div>

          <button
            onClick={() => onManualPushCloud && onManualPushCloud()}
            disabled={isCloudSyncing}
            className="bg-blue-800 hover:bg-blue-700 text-white font-bold text-xs px-3 py-2 rounded-lg border border-blue-600 transition flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            title="Force push all laptop changes to mobile phones immediately"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isCloudSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sync Cloud ☁️</span>
          </button>

          <button
            onClick={onClose}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-lg shadow uppercase flex items-center gap-1.5"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Auth Screen */}
      {!isAuthenticated ? (
        <div className="flex-1 flex items-center justify-center p-6 bg-slate-100">
          <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-3xl max-w-md w-full shadow-2xl space-y-6">
            
            {/* Header / Crest */}
            <div className="text-center space-y-3">
              <div className="relative inline-block">
                <img
                  src="/logo.jpg"
                  alt="School Crest"
                  className="w-20 h-20 rounded-full mx-auto ring-4 ring-amber-400 p-0.5 bg-white shadow-md object-cover"
                />
                <div className="absolute -bottom-1 -right-1 bg-blue-950 text-amber-400 p-1.5 rounded-full border-2 border-white shadow">
                  <Shield className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h2 className="font-heading font-black text-2xl text-blue-950 tracking-tight uppercase">
                  STAFF CMS PORTAL
                </h2>
                <p className="text-slate-500 text-xs font-semibold mt-1">
                  Vision I.I.T. Foundation School • Administrative Access
                </p>
              </div>
            </div>

            {/* Mode Switcher: Login vs Register */}
            <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => { setIsRegistering(false); setAuthError(''); setRegSuccess(''); }}
                className={`py-2 text-xs font-extrabold rounded-lg transition-all ${
                  !isRegistering ? 'bg-white text-blue-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Staff Login
              </button>
              <button
                type="button"
                onClick={() => { setIsRegistering(true); setAuthError(''); setRegSuccess(''); }}
                className={`py-2 text-xs font-extrabold rounded-lg transition-all ${
                  isRegistering ? 'bg-white text-blue-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Register Admin Passcode
              </button>
            </div>

            {regSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-extrabold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{regSuccess}</span>
              </div>
            )}

            {!isRegistering ? (
              /* LOGIN FORM */
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    Admin Passcode
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Staff Passcode"
                      value={pin}
                      onChange={(e) => {
                        setPin(e.target.value);
                        if (authError) setAuthError('');
                      }}
                      className="w-full bg-slate-50 border border-slate-300 focus:border-blue-900 rounded-xl pl-10 pr-10 py-3 text-sm font-extrabold text-slate-900 tracking-wider focus:outline-none transition-all"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {authError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-extrabold text-center flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-950 hover:bg-blue-900 text-white font-extrabold py-3.5 rounded-xl uppercase text-xs tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>AUTHENTICATE & ACCESS DASHBOARD</span>
                </button>
              </form>
            ) : (
              /* REGISTER STAFF FORM */
              <form onSubmit={handleRegister} className="space-y-3 text-left">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                    Staff Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mr. K. Somasekhar"
                    value={regForm.name}
                    onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-900 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                    Master Verification Key
                  </label>
                  <input
                    type="password"
                    placeholder="School Key (e.g. VISION)"
                    value={regForm.masterKey}
                    onChange={(e) => setRegForm({ ...regForm, masterKey: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-blue-900 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                      New Passcode
                    </label>
                    <input
                      type="password"
                      placeholder="e.g. 5566"
                      value={regForm.passcode}
                      onChange={(e) => setRegForm({ ...regForm, passcode: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 focus:border-blue-900 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                      Confirm Passcode
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm Passcode"
                      value={regForm.confirmPasscode}
                      onChange={(e) => setRegForm({ ...regForm, confirmPasscode: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 focus:border-blue-900 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {authError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold text-center">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl uppercase text-xs tracking-wider shadow mt-1"
                >
                  REGISTER ADMIN PASSCODE
                </button>
              </form>
            )}

            {/* Footer Badge */}
            <div className="pt-3 border-t border-slate-100 text-center">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>Protected Internal Administrative Workspace</span>
              </span>
            </div>

          </div>
        </div>
      ) : (
        /* Full Dashboard Layout */
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-100">
          
          {/* Sidebar Menu */}
          <aside className="w-full md:w-72 bg-white border-r border-slate-200 p-4 space-y-1.5 shrink-0 overflow-y-auto shadow-xs">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider px-3 py-1 mb-1">
              CMS Control Modules
            </div>

            <button
              onClick={() => handleSelectTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black transition-all ${
                activeTab === 'overview' ? 'bg-blue-950 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => handleSelectTab('hero')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition-all ${
                activeTab === 'hero' ? 'bg-blue-950 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Image className="w-4 h-4 text-amber-400" />
                <span>Top Home Banner Slider</span>
              </div>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded">
                {heroSlides.length}
              </span>
            </button>

            <button
              onClick={() => handleSelectTab('headOfSchool')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition-all ${
                activeTab === 'headOfSchool' ? 'bg-blue-950 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Head of School / Chairman</span>
              </div>
              <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                Live
              </span>
            </button>

            <button
              onClick={() => handleSelectTab('toppers')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black transition-all ${
                activeTab === 'toppers' ? 'bg-blue-950 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>10th Board Results</span>
            </button>

            <button
              onClick={() => handleSelectTab('faculty')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition-all ${
                activeTab === 'faculty' ? 'bg-blue-950 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Subject Experts / Faculty</span>
              </div>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded">
                {faculty.length}
              </span>
            </button>

            <button
              onClick={() => handleSelectTab('testimonials')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition-all ${
                activeTab === 'testimonials' ? 'bg-blue-950 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>Parent Testimonials</span>
              </div>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded">
                {testimonials.length}
              </span>
            </button>

            <button
              onClick={() => handleSelectTab('gallery')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition-all ${
                activeTab === 'gallery' ? 'bg-blue-950 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Image className="w-4 h-4 text-amber-400" />
                <span>Photo Gallery</span>
              </div>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded">
                {gallery.length}
              </span>
            </button>

            <button
              onClick={() => handleSelectTab('videos')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition-all ${
                activeTab === 'videos' ? 'bg-blue-950 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Video className="w-4 h-4 text-amber-400" />
                <span>Video Gallery</span>
              </div>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded">
                {videos.length}
              </span>
            </button>

            <button
              onClick={() => handleSelectTab('notices')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition-all ${
                activeTab === 'notices' ? 'bg-blue-950 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-amber-400" />
                <span>Notice Board</span>
              </div>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded">
                {notices.length}
              </span>
            </button>

            <button
              onClick={() => handleSelectTab('inquiries')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black transition-all ${
                activeTab === 'inquiries' ? 'bg-blue-950 text-white shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4 text-amber-400" />
                <span>Parent Applications</span>
              </div>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded">
                {inquiries.length}
              </span>
            </button>

            <div className="pt-4 border-t border-slate-200 mt-4">
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  sessionStorage.removeItem('vision_admin_authenticated');
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl"
              >
                <LogOut className="w-4 h-4" />
                <span>Lock Admin CMS</span>
              </button>
            </div>
          </aside>

          {/* Main Viewport */}
          <main className="flex-1 overflow-y-auto p-6 sm:p-8">
            
            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading font-black text-3xl text-blue-950">Control Dashboard Overview</h2>
                  <p className="text-slate-600 text-sm mt-1">Manage all website sections, batch years, photos, and parent inquiries.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                    <span className="text-slate-500 text-xs font-bold">Batch Years Available</span>
                    <div className="font-heading font-black text-4xl text-blue-950 mt-2">{availableYears.length}</div>
                    <span className="text-xs text-amber-700 font-bold">{availableYears.join(', ')}</span>
                  </div>

                  <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                    <span className="text-slate-500 text-xs font-bold">Subject Experts</span>
                    <div className="font-heading font-black text-4xl text-blue-950 mt-2">{faculty.length}</div>
                    <span className="text-xs text-blue-900 font-bold">Faculty Grid Members</span>
                  </div>

                  <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                    <span className="text-slate-500 text-xs font-bold">Parent Testimonials</span>
                    <div className="font-heading font-black text-4xl text-blue-950 mt-2">{testimonials.length}</div>
                    <span className="text-xs text-amber-700 font-bold">Published Reviews</span>
                  </div>

                  <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                    <span className="text-slate-500 text-xs font-bold">Parent Inquiries</span>
                    <div className="font-heading font-black text-4xl text-blue-950 mt-2">{inquiries.length}</div>
                    <span className="text-xs text-emerald-600 font-bold">Submitted Applications</span>
                  </div>
                </div>
              </div>
            )}

            {/* HEAD OF SCHOOL / CHAIRMAN CMS MODULE */}
            {activeTab === 'headOfSchool' && (
              <div className="space-y-8 max-w-4xl">
                <div>
                  <h2 className="font-heading font-black text-3xl text-blue-950">Head of School / Chairman Manager</h2>
                  <p className="text-slate-600 text-sm mt-1">Manage and update the Chairman/Principal photo, name, title, and desk message displayed on the website.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Live Preview */}
                  <div className="lg:col-span-5 space-y-4">
                    <h3 className="font-heading font-bold text-base text-slate-800">Website Live Preview</h3>
                    <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 rounded-2xl text-center space-y-3 shadow-lg">
                      <img
                        src={headForm.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500"}
                        alt={headForm.name}
                        className="w-36 h-44 rounded-2xl object-cover ring-4 ring-amber-400 mx-auto shadow-md"
                      />
                      <div>
                        <h4 className="font-heading font-extrabold text-lg text-white">{headForm.name || "Head Name"}</h4>
                        <p className="text-amber-400 text-xs font-bold uppercase mt-0.5">{headForm.title || "Designation"}</p>
                      </div>
                      {headForm.quote && (
                        <p className="text-slate-200 text-xs italic border-t border-blue-800/60 pt-3">
                          "{headForm.quote}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Edit Form */}
                  <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-5">
                    <h3 className="font-heading font-black text-xl text-blue-950 border-b border-slate-100 pb-3 flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-amber-500" />
                      <span>Update Head Details & Photo</span>
                    </h3>

                    <form onSubmit={handleSaveHeadOfSchool} className="space-y-4">
                      
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                          Full Name & Academic Titles *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. K. R. V. Prasad, M.Sc., Ph.D."
                          value={headForm.name}
                          onChange={(e) => setHeadForm({ ...headForm, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                          Designation / Role Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Founder & Chairman / Head of School"
                          value={headForm.title}
                          onChange={(e) => setHeadForm({ ...headForm, title: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-900"
                        />
                      </div>

                      {/* Photo Upload File or URL */}
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                          📱 Choose Photo from Mobile / PC Gallery *
                        </label>
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, (dataUrl) => setHeadForm({ ...headForm, photo: dataUrl }))}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs font-bold text-slate-700 cursor-pointer file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-extrabold file:bg-blue-950 file:text-white"
                          />
                          <input
                            type="url"
                            placeholder="Or paste image URL (e.g. https://...)"
                            value={headForm.photo}
                            onChange={(e) => setHeadForm({ ...headForm, photo: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                          Headline Quote (Displayed prominently)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. True education builds both intellectual clarity and moral strength."
                          value={headForm.quote}
                          onChange={(e) => setHeadForm({ ...headForm, quote: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                          Detailed Desk Message *
                        </label>
                        <textarea
                          rows="4"
                          required
                          placeholder="Write the full message to parents and students..."
                          value={headForm.message}
                          onChange={(e) => setHeadForm({ ...headForm, message: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-900 leading-relaxed"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-xs py-3.5 rounded-xl uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                      >
                        <UserCheck className="w-4 h-4 text-amber-400" />
                        <span>UPDATE HEAD OF SCHOOL MESSAGE & PHOTO</span>
                      </button>

                    </form>
                  </div>

                </div>
              </div>
            )}

            {/* 10TH BOARD RESULTS & TOPPERS MANAGER WITH DYNAMIC BATCH YEARS */}
            {activeTab === 'toppers' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h3 className="font-heading font-black text-2xl text-blue-950">10th Class Board Results & Toppers Manager</h3>
                    <p className="text-slate-600 text-xs">Add any batch year (e.g., 2026, 2025, 2024, 2027) and upload student photos from phone/PC!</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={topperYearFilter}
                      onChange={(e) => setTopperYearFilter(e.target.value)}
                      className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-extrabold text-blue-950"
                    >
                      {availableYears.map(yr => (
                        <option key={yr} value={yr}>Batch {yr}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => onRotateToppers(topperYearFilter)}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow flex items-center gap-1.5 uppercase"
                    >
                      <RotateCw className="w-4 h-4" />
                      <span>Rotate Batch {topperYearFilter} Clockwise 🔄</span>
                    </button>
                  </div>
                </div>



                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Form */}
                  <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
                    <h4 className="font-heading font-black text-base text-blue-950 flex items-center gap-2">
                      <Plus className="w-5 h-5 text-amber-600" />
                      <span>Add Topper (Dynamic Year Input)</span>
                    </h4>

                    <form onSubmit={handleCreateTopper} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Type / Select Year *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 2026"
                            value={newTopper.year}
                            onChange={(e) => setNewTopper({ ...newTopper, year: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">GPA / Score *</label>
                          <input
                            type="text"
                            required
                            placeholder="10.0 / 10"
                            value={newTopper.gpa}
                            onChange={(e) => setNewTopper({ ...newTopper, gpa: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. K. Sai Praneeth"
                          value={newTopper.name}
                          onChange={(e) => setNewTopper({ ...newTopper, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Rank Title</label>
                        <input
                          type="text"
                          placeholder="e.g. State 1st Rank / District Topper"
                          value={newTopper.rank}
                          onChange={(e) => setNewTopper({ ...newTopper, rank: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">📱 Choose Student Photo from Mobile/PC</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (url) => setNewTopper({ ...newTopper, photo: url }))}
                          className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-300 rounded-xl p-2"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Student Quote</label>
                        <textarea
                          rows="2"
                          placeholder="Short student feedback..."
                          value={newTopper.quote}
                          onChange={(e) => setNewTopper({ ...newTopper, quote: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-xs py-3 rounded-xl shadow uppercase"
                      >
                        Add Topper to Batch {newTopper.year}
                      </button>
                    </form>
                  </div>

                  {/* Toppers List */}
                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="font-heading font-black text-base text-blue-950">
                      Batch {topperYearFilter} Toppers ({currentBatchToppers.length})
                    </h4>
                    <div className="grid grid-cols-2 gap-3 max-h-[520px] overflow-y-auto pr-1">
                      {currentBatchToppers.map((t, idx) => (
                        <div key={t.id || idx} className="bg-white border border-slate-200 p-4 rounded-2xl text-center relative shadow-sm">
                          <img src={t.photo} alt={t.name} className="w-16 h-20 rounded-xl object-cover mx-auto ring-2 ring-amber-500 mb-2 shadow" />
                          <h5 className="font-bold text-blue-950 text-xs truncate">{t.name}</h5>
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-0.5">
                            {t.gpa} • {t.rank}
                          </span>
                          <button
                            onClick={() => onDeleteTopper(topperYearFilter, t.id)}
                            className="absolute top-2 right-2 text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg"
                            title="Delete Topper"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FACULTY TAB */}
            {activeTab === 'faculty' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading font-black text-2xl text-blue-950">Subject Experts & Faculty Manager</h3>
                  <p className="text-slate-600 text-xs">Add new teachers, upload photos from mobile/PC, set credentials and bios.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
                    <h4 className="font-heading font-black text-base text-blue-950">Add Subject Expert</h4>
                    <form onSubmit={handleCreateFaculty} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Teacher Full Name *</label>
                        <input
                          type="text"
                          required
                          value={newFaculty.name}
                          onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Designation / Role *</label>
                        <input
                          type="text"
                          required
                          value={newFaculty.role}
                          onChange={(e) => setNewFaculty({ ...newFaculty, role: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">📱 Photo from Mobile/PC</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (url) => setNewFaculty({ ...newFaculty, photo: url }))}
                          className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-300 rounded-xl p-2"
                        />
                      </div>
                      <button type="submit" className="w-full bg-blue-950 text-white font-extrabold text-xs py-3 rounded-xl uppercase shadow">
                        Publish Faculty Member
                      </button>
                    </form>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="font-heading font-black text-base text-blue-950">Active Faculty ({faculty.length})</h4>
                    <div className="grid grid-cols-2 gap-4 max-h-[520px] overflow-y-auto pr-1">
                      {faculty.map((member, idx) => (
                        <div key={member.id || idx} className="bg-white border border-slate-200 p-4 rounded-2xl text-center relative shadow-sm">
                          <img src={member.photo} alt={member.name} className="w-16 h-16 rounded-full object-cover mx-auto ring-2 ring-amber-500 mb-2 shadow" />
                          <h5 className="font-bold text-blue-950 text-xs">{member.name}</h5>
                          <p className="text-amber-700 font-bold text-[11px]">{member.role}</p>
                          <button onClick={() => onDeleteFaculty(member.id || member.name)} className="absolute top-2 right-2 text-rose-600 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TESTIMONIALS TAB */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading font-black text-2xl text-blue-950">Parent Testimonials Manager</h3>
                  <p className="text-slate-600 text-xs">Add reviews from parents and alumni to display on the live website.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
                    <h4 className="font-heading font-black text-base text-blue-950">Add Parent Review</h4>
                    <form onSubmit={handleCreateTestimonial} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Parent Name *</label>
                        <input
                          type="text"
                          required
                          value={newTestimonial.name}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Title / Relation *</label>
                        <input
                          type="text"
                          required
                          value={newTestimonial.role}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Review Text *</label>
                        <textarea
                          rows="4"
                          required
                          value={newTestimonial.text}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                        />
                      </div>
                      <button type="submit" className="w-full bg-blue-950 text-white font-extrabold text-xs py-3 rounded-xl uppercase shadow">
                        Publish Testimonial
                      </button>
                    </form>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="font-heading font-black text-base text-blue-950">Published Reviews ({testimonials.length})</h4>
                    <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                      {testimonials.map((item, idx) => (
                        <div key={item.id || idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex justify-between gap-4">
                          <div>
                            <p className="text-slate-600 text-xs italic">"{item.text}"</p>
                            <h5 className="font-bold text-blue-950 text-xs mt-2">{item.name}</h5>
                            <span className="text-amber-700 font-bold text-[11px]">{item.role}</span>
                          </div>
                          <button onClick={() => onDeleteTestimonial(item.id || item.name)} className="text-rose-600 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TOP SLIDER TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-heading font-black text-2xl text-blue-950">Top Home Banner Slider</h3>
                  <button onClick={onRotateHeroSlides} className="bg-amber-500 font-black text-xs px-4 py-2.5 rounded-xl uppercase shadow flex items-center gap-1.5">
                    <RotateCw className="w-4 h-4" /> Rotate Slides Clockwise 🔄
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-3">
                    <h4 className="font-heading font-black text-base text-blue-950">Add Slide (Upload Photo)</h4>
                    <form onSubmit={handleCreateSlide} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">📱 Photo from Mobile/PC</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (url) => setNewSlide({ ...newSlide, image: url }))}
                          className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-300 rounded-xl p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Headline *</label>
                        <input
                          type="text"
                          required
                          value={newSlide.title}
                          onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                        />
                      </div>
                      <button type="submit" className="w-full bg-blue-950 text-white font-extrabold text-xs py-3 rounded-xl uppercase shadow">
                        Add Slide
                      </button>
                    </form>
                  </div>

                  <div className="lg:col-span-7 space-y-3">
                    <h4 className="font-heading font-black text-base text-blue-950">Active Slides ({heroSlides.length})</h4>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                      {heroSlides.map((slide, idx) => (
                        <div key={slide.id || idx} className="bg-white border border-slate-200 p-3.5 rounded-2xl flex items-center gap-4 shadow-sm">
                          <img src={slide.image} alt={slide.title} className="w-24 h-16 object-cover rounded-xl shrink-0 border border-slate-200" />
                          <div className="flex-1 min-w-0">
                            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">Slide #{idx + 1}</span>
                            <h5 className="font-bold text-blue-950 text-xs truncate mt-1">{slide.title}</h5>
                          </div>
                          <button onClick={() => onDeleteHeroSlide(slide.id)} className="text-rose-600 p-2">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-3">
                  <h4 className="font-heading font-black text-base text-blue-950">Upload Gallery Photo</h4>
                  <form onSubmit={handleCreateGallery} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">📱 Image from Mobile/PC</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (url) => setNewGallery({ ...newGallery, image: url }))}
                        className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-300 rounded-xl p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={newGallery.title}
                        onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                      />
                    </div>
                    <button type="submit" className="w-full bg-blue-950 text-white font-extrabold text-xs py-3 rounded-xl uppercase shadow">
                      Publish Photo
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  <h4 className="font-heading font-black text-base text-blue-950">Active Photos ({gallery.length})</h4>
                  <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
                    {gallery.map((g) => (
                      <div key={g.id} className="bg-white border border-slate-200 rounded-xl p-2.5 relative group shadow-sm">
                        <img src={g.image} alt={g.title} className="w-full h-28 object-cover rounded-lg mb-1" />
                        <h5 className="font-bold text-blue-950 text-xs truncate">{g.title}</h5>
                        <button onClick={() => onDeleteGalleryItem(g.id)} className="absolute top-4 right-4 bg-rose-600 text-white p-1 rounded-full">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIDEOS TAB */}
            {activeTab === 'videos' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-3">
                  <h4 className="font-heading font-black text-base text-blue-950">Add Video</h4>
                  <form onSubmit={handleCreateVideo} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">📱 Choose Video File</label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileUpload(e, (url) => setNewVideo({ ...newVideo, videoUrl: url }))}
                        className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-300 rounded-xl p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={newVideo.title}
                        onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                      />
                    </div>
                    <button type="submit" className="w-full bg-blue-950 text-white font-extrabold text-xs py-3 rounded-xl uppercase shadow">
                      Publish Video
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  <h4 className="font-heading font-black text-base text-blue-950">Published Videos ({videos.length})</h4>
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {videos.map((v) => (
                      <div key={v.id} className="bg-white border border-slate-200 p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
                        <h5 className="font-bold text-blue-950 text-xs">{v.title}</h5>
                        <button onClick={() => onDeleteVideo(v.id)} className="text-rose-600 p-1.5">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* NOTICES TAB */}
            {activeTab === 'notices' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-3">
                  <h4 className="font-heading font-black text-base text-blue-950">Publish Notice</h4>
                  <form onSubmit={handleCreateNotice} className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Title *</label>
                      <input
                        type="text"
                        required
                        value={newNotice.title}
                        onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Details *</label>
                      <textarea
                        rows="3"
                        required
                        value={newNotice.details}
                        onChange={(e) => setNewNotice({ ...newNotice, details: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                      />
                    </div>
                    <button type="submit" className="w-full bg-amber-500 font-black text-xs py-3 rounded-xl uppercase shadow">
                      Publish Notice
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  <h4 className="font-heading font-black text-base text-blue-950">Active Circulars ({notices.length})</h4>
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {notices.map((n) => (
                      <div key={n.id} className="bg-white border border-slate-200 p-4 rounded-2xl flex justify-between items-start gap-2 shadow-sm">
                        <div>
                          <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">{n.category}</span>
                          <h5 className="font-bold text-blue-950 text-xs mt-1">{n.title}</h5>
                        </div>
                        <button onClick={() => onDeleteNotice(n.id)} className="text-rose-600 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* INQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                <h3 className="font-heading font-black text-2xl text-blue-950">Parent Applications ({inquiries.length})</h3>
                <div className="space-y-3 max-h-[550px] overflow-y-auto">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-blue-950 text-sm">{inq.studentName}</span>
                          <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">{inq.targetClass}</span>
                        </div>
                        <p className="text-slate-600 text-xs mt-1">Parent: <strong>{inq.parentName}</strong> • Phone: <a href={`tel:${inq.phone}`} className="text-blue-900 font-bold underline">{inq.phone}</a></p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold shrink-0">{inq.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>
        </div>
      )}



    </div>
  );
}
