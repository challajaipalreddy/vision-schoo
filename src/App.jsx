import React, { useState, useEffect } from 'react';
import { initialSchoolData } from './data/schoolData';
import Navbar from './components/Navbar';
import NoticeTicker from './components/NoticeTicker';
import Hero from './components/Hero';
import LeadershipMessage from './components/LeadershipMessage';
import Academics from './components/Academics';
import VisionAdvantage from './components/VisionAdvantage';
import SmartLearningSafety from './components/SmartLearningSafety';
import ResultsDashboard from './components/ResultsDashboard';
import NoticeBoard from './components/NoticeBoard';
import Gallery from './components/Gallery';
import Faculty from './components/Faculty';
import Admissions from './components/Admissions';
import Testimonials from './components/Testimonials';
import FAQSection from './components/FAQSection';
import ContactFooter from './components/ContactFooter';
import AdminPortal from './components/AdminPortal';
import SearchModal from './components/SearchModal';
import QuickInquiryModal from './components/QuickInquiryModal';
import FloatingActionBar from './components/FloatingActionBar';
import VideoIntroOverlay from './components/VideoIntroOverlay';

const getStoredData = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (err) {
    return defaultValue;
  }
};

const setStoredData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`LocalStorage save warning for ${key}:`, err);
  }
};

const CLOUD_OBJECT_ID = 'ff808181a09d98f701a0dcb342a01aa6';
const CLOUD_API_URL = `https://api.restful-api.dev/objects/${CLOUD_OBJECT_ID}`;

export default function App() {
  const [showIntroVideo, setShowIntroVideo] = useState(true);
  const [heroSlides, setHeroSlides] = useState(() => getStoredData('vision_hero_slides', initialSchoolData.heroSlides));
  const [notices, setNotices] = useState(() => getStoredData('vision_notices', initialSchoolData.notices));
  const [gallery, setGallery] = useState(() => getStoredData('vision_gallery', initialSchoolData.gallery));
  const [videos, setVideos] = useState(() => getStoredData('vision_videos', initialSchoolData.videos));
  const [faculty, setFaculty] = useState(() => getStoredData('vision_faculty', initialSchoolData.faculty));
  const [testimonials, setTestimonials] = useState(() => getStoredData('vision_testimonials', initialSchoolData.testimonials));
  const [resultsHistory, setResultsHistory] = useState(() => getStoredData('vision_results_history', initialSchoolData.resultsHistory));
  const [headOfSchool, setHeadOfSchool] = useState(() => getStoredData('vision_head_of_school', initialSchoolData.headOfSchool));
  const [inquiries, setInquiries] = useState(() => getStoredData('vision_inquiries', [
    { id: 101, parentName: 'K. Somasekhar', phone: '9848012345', studentName: 'K. Sai Charan', targetClass: 'Class 8 (IIT Foundation Batch)', date: 'Sep 06, 2026', message: 'Interested in IIT foundation entrance exam.' }
  ]));

  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const stored = localStorage.getItem('vision_admin_open');
      return hash === '#admin' || hash === '#admin-portal' || stored === 'true';
    }
    return false;
  });

  // Sync state changes with localStorage safely
  useEffect(() => { setStoredData('vision_hero_slides', heroSlides); }, [heroSlides]);
  useEffect(() => { setStoredData('vision_notices', notices); }, [notices]);
  useEffect(() => { setStoredData('vision_gallery', gallery); }, [gallery]);
  useEffect(() => { setStoredData('vision_videos', videos); }, [videos]);
  useEffect(() => { setStoredData('vision_faculty', faculty); }, [faculty]);
  useEffect(() => { setStoredData('vision_testimonials', testimonials); }, [testimonials]);
  useEffect(() => { setStoredData('vision_results_history', resultsHistory); }, [resultsHistory]);
  useEffect(() => { setStoredData('vision_head_of_school', headOfSchool); }, [headOfSchool]);
  useEffect(() => { setStoredData('vision_inquiries', inquiries); }, [inquiries]);

  // Push complete current state to Cloud Store
  const pushToCloud = async (overrides = {}) => {
    setIsCloudSyncing(true);
    try {
      const payloadData = {
        heroSlides: overrides.heroSlides || heroSlides,
        notices: overrides.notices || notices,
        gallery: overrides.gallery || gallery,
        videos: overrides.videos || videos,
        faculty: overrides.faculty || faculty,
        testimonials: overrides.testimonials || testimonials,
        resultsHistory: overrides.resultsHistory || resultsHistory,
        headOfSchool: overrides.headOfSchool || headOfSchool,
        updatedAt: Date.now()
      };

      await fetch(CLOUD_API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Vision School Store', data: payloadData })
      });
      setLastSyncTime(new Date().toLocaleTimeString());
    } catch (err) {
      console.warn('Cloud push sync error:', err);
    } finally {
      setIsCloudSyncing(false);
    }
  };

  // Pull latest data from Cloud Store on mount and poll periodically
  const pullFromCloud = async () => {
    try {
      const res = await fetch(CLOUD_API_URL);
      if (!res.ok) return;
      const json = await res.json();
      if (json && json.data) {
        const d = json.data;
        if (d.heroSlides && Array.isArray(d.heroSlides) && d.heroSlides.length > 0) {
          setHeroSlides(d.heroSlides);
          setStoredData('vision_hero_slides', d.heroSlides);
        }
        if (d.notices && Array.isArray(d.notices) && d.notices.length > 0) {
          setNotices(d.notices);
          setStoredData('vision_notices', d.notices);
        }
        if (d.gallery && Array.isArray(d.gallery) && d.gallery.length > 0) {
          setGallery(d.gallery);
          setStoredData('vision_gallery', d.gallery);
        }
        if (d.videos && Array.isArray(d.videos) && d.videos.length > 0) {
          setVideos(d.videos);
          setStoredData('vision_videos', d.videos);
        }
        if (d.faculty && Array.isArray(d.faculty) && d.faculty.length > 0) {
          setFaculty(d.faculty);
          setStoredData('vision_faculty', d.faculty);
        }
        if (d.testimonials && Array.isArray(d.testimonials) && d.testimonials.length > 0) {
          setTestimonials(d.testimonials);
          setStoredData('vision_testimonials', d.testimonials);
        }
        if (d.resultsHistory && typeof d.resultsHistory === 'object' && Object.keys(d.resultsHistory).length > 0) {
          setResultsHistory(d.resultsHistory);
          setStoredData('vision_results_history', d.resultsHistory);
        }
        if (d.headOfSchool && typeof d.headOfSchool === 'object' && d.headOfSchool.name) {
          setHeadOfSchool(d.headOfSchool);
          setStoredData('vision_head_of_school', d.headOfSchool);
        }
        setLastSyncTime(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.warn('Cloud pull sync error:', err);
    }
  };

  // Initial cloud fetch and 15-second polling loop
  useEffect(() => {
    pullFromCloud();
    const interval = setInterval(pullFromCloud, 15000);
    return () => clearInterval(interval);
  }, []);

  // Sync Admin Portal open state with URL hash & browser refresh
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin' || hash === '#admin-portal') {
        setAdminOpen(true);
        localStorage.setItem('vision_admin_open', 'true');
      } else if (hash === '' || hash === '#') {
        setAdminOpen(false);
        localStorage.setItem('vision_admin_open', 'false');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenAdmin = () => {
    setAdminOpen(true);
    localStorage.setItem('vision_admin_open', 'true');
    if (window.location.hash !== '#admin') {
      window.location.hash = 'admin';
    }
  };

  const handleCloseAdmin = () => {
    setAdminOpen(false);
    localStorage.setItem('vision_admin_open', 'false');
    if (window.location.hash === '#admin' || window.location.hash === '#admin-portal') {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  // Handlers for Hero Slides
  const handleAddHeroSlide = (slide) => {
    const updated = [...heroSlides, slide];
    setHeroSlides(updated);
    pushToCloud({ heroSlides: updated });
  };

  const handleRotateHeroSlides = () => {
    if (heroSlides.length < 2) return;
    const rotated = [...heroSlides];
    const first = rotated.shift();
    rotated.push(first);
    setHeroSlides(rotated);
    pushToCloud({ heroSlides: rotated });
  };

  const handleDeleteHeroSlide = (id) => {
    const updated = heroSlides.filter(s => s.id !== id);
    setHeroSlides(updated);
    pushToCloud({ heroSlides: updated });
  };

  // Handlers for Faculty & Testimonials
  const handleAddFaculty = (member) => {
    const updated = [member, ...faculty];
    setFaculty(updated);
    pushToCloud({ faculty: updated });
  };

  const handleDeleteFaculty = (identifier) => {
    const updated = faculty.filter(f => f.id !== identifier && f.name !== identifier);
    setFaculty(updated);
    pushToCloud({ faculty: updated });
  };

  const handleAddTestimonial = (item) => {
    const updated = [item, ...testimonials];
    setTestimonials(updated);
    pushToCloud({ testimonials: updated });
  };

  const handleDeleteTestimonial = (identifier) => {
    const updated = testimonials.filter(t => t.id !== identifier && t.name !== identifier);
    setTestimonials(updated);
    pushToCloud({ testimonials: updated });
  };

  // Handlers for Gallery & Videos
  const handleAddGalleryItem = (item) => {
    const updated = [item, ...gallery];
    setGallery(updated);
    pushToCloud({ gallery: updated });
  };

  const handleDeleteGalleryItem = (id) => {
    const updated = gallery.filter(g => g.id !== id);
    setGallery(updated);
    pushToCloud({ gallery: updated });
  };

  const handleAddVideo = (video) => {
    const updated = [video, ...videos];
    setVideos(updated);
    pushToCloud({ videos: updated });
  };

  const handleDeleteVideo = (id) => {
    const updated = videos.filter(v => v.id !== id);
    setVideos(updated);
    pushToCloud({ videos: updated });
  };

  // Handlers for 10th Board Toppers
  const handleAddTopper = (year, topper) => {
    setResultsHistory(prev => {
      const yearObj = prev[year] || { passRate: "100%", topGpaCount: 1, distinctionRate: "90%", schoolAverage: "9.2 / 10", toppers: [] };
      const updated = {
        ...prev,
        [year]: {
          ...yearObj,
          topGpaCount: yearObj.topGpaCount + 1,
          toppers: [topper, ...yearObj.toppers]
        }
      };
      pushToCloud({ resultsHistory: updated });
      return updated;
    });
  };

  const handleBulkAddToppers = (year, newToppersArray) => {
    setResultsHistory(prev => {
      const yearObj = prev[year] || { passRate: "100%", topGpaCount: 0, distinctionRate: "90%", schoolAverage: "9.2 / 10", toppers: [] };
      const updated = {
        ...prev,
        [year]: {
          ...yearObj,
          topGpaCount: yearObj.topGpaCount + newToppersArray.length,
          toppers: [...newToppersArray, ...yearObj.toppers]
        }
      };
      pushToCloud({ resultsHistory: updated });
      return updated;
    });
  };

  const handleRotateToppers = (year) => {
    setResultsHistory(prev => {
      const yearObj = prev[year];
      if (!yearObj || !yearObj.toppers || yearObj.toppers.length < 2) return prev;
      const rotatedToppers = [...yearObj.toppers];
      const first = rotatedToppers.shift();
      rotatedToppers.push(first);
      const updated = {
        ...prev,
        [year]: {
          ...yearObj,
          toppers: rotatedToppers
        }
      };
      pushToCloud({ resultsHistory: updated });
      return updated;
    });
  };

  const handleDeleteTopper = (year, id) => {
    setResultsHistory(prev => {
      const yearObj = prev[year];
      if (!yearObj) return prev;
      const updated = {
        ...prev,
        [year]: {
          ...yearObj,
          toppers: yearObj.toppers.filter(t => t.id !== id)
        }
      };
      pushToCloud({ resultsHistory: updated });
      return updated;
    });
  };

  // Handlers for Notices & Inquiries
  const handleAddNotice = (newNotice) => {
    const updated = [newNotice, ...notices];
    setNotices(updated);
    pushToCloud({ notices: updated });
  };

  const handleDeleteNotice = (id) => {
    const updated = notices.filter(n => n.id !== id);
    setNotices(updated);
    pushToCloud({ notices: updated });
  };

  const handleAddInquiry = (inquiry) => {
    setInquiries([inquiry, ...inquiries]);
  };

  const handleUpdateHeadOfSchool = (updatedHead) => {
    setHeadOfSchool(updatedHead);
    pushToCloud({ headOfSchool: updatedHead });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
      
      {/* Fullscreen Cinematic School Intro Video */}
      {showIntroVideo && (
        <VideoIntroOverlay onComplete={() => setShowIntroVideo(false)} />
      )}

      {/* Navigation Header */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        onOpenInquiry={() => setInquiryModalOpen(true)}
      />

      {/* Live Announcement Marquee Ticker */}
      <NoticeTicker notices={notices} />

      {/* Top Hero Banner Carousel */}
      <Hero stats={initialSchoolData.stats} customSlides={heroSlides} />

      {/* Heritage, Vision, Mission & Principal's Desk */}
      <LeadershipMessage headOfSchool={headOfSchool} />

      {/* Academic Programs & IIT Foundation Wing */}
      <Academics />

      {/* The Vision Advantage — 4-Step Learning Methodology */}
      <VisionAdvantage />

      {/* Smart Learning Environment & Campus Safety */}
      <SmartLearningSafety />

      {/* 10th Class Board Results & 5-Year Historical Performance */}
      <ResultsDashboard resultsHistory={resultsHistory} />

      {/* Live School Circulars & Notice Board */}
      <NoticeBoard notices={notices} />

      {/* Photo & Video Gallery */}
      <Gallery gallery={gallery} videos={videos} />

      {/* Expert Faculty & Mentors */}
      <Faculty faculty={faculty} />

      {/* Admissions Portal & Application Form */}
      <Admissions onAddInquiry={handleAddInquiry} />

      {/* Community Voices & Parent Testimonials */}
      <Testimonials testimonials={testimonials} />

      {/* Frequently Asked Questions */}
      <FAQSection faqs={initialSchoolData.faqs} />

      {/* Footer & Contact */}
      <ContactFooter onOpenAdmin={handleOpenAdmin} />

      {/* Full-Screen Admin CMS Portal Modal */}
      <AdminPortal
        isOpen={adminOpen}
        onClose={handleCloseAdmin}
        heroSlides={heroSlides}
        onAddHeroSlide={handleAddHeroSlide}
        onRotateHeroSlides={handleRotateHeroSlides}
        onDeleteHeroSlide={handleDeleteHeroSlide}
        gallery={gallery}
        onAddGalleryItem={handleAddGalleryItem}
        onDeleteGalleryItem={handleDeleteGalleryItem}
        videos={videos}
        onAddVideo={handleAddVideo}
        onDeleteVideo={handleDeleteVideo}
        resultsHistory={resultsHistory}
        onAddTopper={handleAddTopper}
        onBulkAddToppers={handleBulkAddToppers}
        onRotateToppers={handleRotateToppers}
        onDeleteTopper={handleDeleteTopper}
        faculty={faculty}
        onAddFaculty={handleAddFaculty}
        onDeleteFaculty={handleDeleteFaculty}
        testimonials={testimonials}
        onAddTestimonial={handleAddTestimonial}
        onDeleteTestimonial={handleDeleteTestimonial}
        notices={notices}
        onAddNotice={handleAddNotice}
        onDeleteNotice={handleDeleteNotice}
        inquiries={inquiries}
        headOfSchool={headOfSchool}
        onUpdateHeadOfSchool={handleUpdateHeadOfSchool}
        isCloudSyncing={isCloudSyncing}
        lastSyncTime={lastSyncTime}
        onManualPushCloud={pushToCloud}
        onManualPullCloud={pullFromCloud}
      />

      {/* Global Search Overlay */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* Quick Online Inquiry Popup Modal */}
      <QuickInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        onAddInquiry={handleAddInquiry}
      />

      {/* Floating Action Bar (WhatsApp & Direct Call) */}
      <FloatingActionBar />

    </div>
  );
}
