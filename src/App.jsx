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

const getStoredData = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (err) {
    return defaultValue;
  }
};

export default function App() {
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

  // Sync state changes with localStorage
  useEffect(() => { localStorage.setItem('vision_hero_slides', JSON.stringify(heroSlides)); }, [heroSlides]);
  useEffect(() => { localStorage.setItem('vision_notices', JSON.stringify(notices)); }, [notices]);
  useEffect(() => { localStorage.setItem('vision_gallery', JSON.stringify(gallery)); }, [gallery]);
  useEffect(() => { localStorage.setItem('vision_videos', JSON.stringify(videos)); }, [videos]);
  useEffect(() => { localStorage.setItem('vision_faculty', JSON.stringify(faculty)); }, [faculty]);
  useEffect(() => { localStorage.setItem('vision_testimonials', JSON.stringify(testimonials)); }, [testimonials]);
  useEffect(() => { localStorage.setItem('vision_results_history', JSON.stringify(resultsHistory)); }, [resultsHistory]);
  useEffect(() => { localStorage.setItem('vision_head_of_school', JSON.stringify(headOfSchool)); }, [headOfSchool]);
  useEffect(() => { localStorage.setItem('vision_inquiries', JSON.stringify(inquiries)); }, [inquiries]);

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
    setHeroSlides([...heroSlides, slide]);
  };

  const handleRotateHeroSlides = () => {
    if (heroSlides.length < 2) return;
    const rotated = [...heroSlides];
    const first = rotated.shift();
    rotated.push(first);
    setHeroSlides(rotated);
  };

  const handleDeleteHeroSlide = (id) => {
    setHeroSlides(heroSlides.filter(s => s.id !== id));
  };

  // Handlers for Faculty & Testimonials
  const handleAddFaculty = (member) => {
    setFaculty([member, ...faculty]);
  };

  const handleDeleteFaculty = (identifier) => {
    setFaculty(faculty.filter(f => f.id !== identifier && f.name !== identifier));
  };

  const handleAddTestimonial = (item) => {
    setTestimonials([item, ...testimonials]);
  };

  const handleDeleteTestimonial = (identifier) => {
    setTestimonials(testimonials.filter(t => t.id !== identifier && t.name !== identifier));
  };

  // Handlers for Gallery & Videos
  const handleAddGalleryItem = (item) => {
    setGallery([item, ...gallery]);
  };

  const handleDeleteGalleryItem = (id) => {
    setGallery(gallery.filter(g => g.id !== id));
  };

  const handleAddVideo = (video) => {
    setVideos([video, ...videos]);
  };

  const handleDeleteVideo = (id) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  // Handlers for 10th Board Toppers
  const handleAddTopper = (year, topper) => {
    setResultsHistory(prev => {
      const yearObj = prev[year] || { passRate: "100%", topGpaCount: 1, distinctionRate: "90%", schoolAverage: "9.2 / 10", toppers: [] };
      return {
        ...prev,
        [year]: {
          ...yearObj,
          topGpaCount: yearObj.topGpaCount + 1,
          toppers: [topper, ...yearObj.toppers]
        }
      };
    });
  };

  const handleBulkAddToppers = (year, newToppersArray) => {
    setResultsHistory(prev => {
      const yearObj = prev[year] || { passRate: "100%", topGpaCount: 0, distinctionRate: "90%", schoolAverage: "9.2 / 10", toppers: [] };
      return {
        ...prev,
        [year]: {
          ...yearObj,
          topGpaCount: yearObj.topGpaCount + newToppersArray.length,
          toppers: [...newToppersArray, ...yearObj.toppers]
        }
      };
    });
  };

  const handleRotateToppers = (year) => {
    setResultsHistory(prev => {
      const yearObj = prev[year];
      if (!yearObj || !yearObj.toppers || yearObj.toppers.length < 2) return prev;
      const rotatedToppers = [...yearObj.toppers];
      const first = rotatedToppers.shift();
      rotatedToppers.push(first);
      return {
        ...prev,
        [year]: {
          ...yearObj,
          toppers: rotatedToppers
        }
      };
    });
  };

  const handleDeleteTopper = (year, id) => {
    setResultsHistory(prev => {
      const yearObj = prev[year];
      if (!yearObj) return prev;
      return {
        ...prev,
        [year]: {
          ...yearObj,
          toppers: yearObj.toppers.filter(t => t.id !== id)
        }
      };
    });
  };

  // Handlers for Notices & Inquiries
  const handleAddNotice = (newNotice) => {
    setNotices([newNotice, ...notices]);
  };

  const handleDeleteNotice = (id) => {
    setNotices(notices.filter(n => n.id !== id));
  };

  const handleAddInquiry = (inquiry) => {
    setInquiries([inquiry, ...inquiries]);
  };

  const handleUpdateHeadOfSchool = (updatedHead) => {
    setHeadOfSchool(updatedHead);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
      
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
