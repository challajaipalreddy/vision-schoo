export const initialSchoolData = {
  stats: {
    yearsExcellence: "25+",
    passPercentage: "100%",
    iitSelections: "1,500+",
    expertFaculty: "50+",
    stateRanks: "35+"
  },

  heroSlides: [
    {
      id: 1,
      image: "/slide1.jpg",
      fallbackUrl: "https://lh3.googleusercontent.com/grass-cs/ACvplmMaZMQqEib0MzvzAz2_vE0s37de_ZRc0WLEOEAF-9_88EqIkLz1npPsPNChJLMedVy89s7h0vvSp0HmyyZWr9cNUqWMre0z4xUFIodH3puK_F5dm0AQSlP2ktcUPfua4dBY3K-VRQ=s1360-w1360-h1020-rw",
      title: "Welcome to Vision I.I.T. Foundation School Sattenapalle",
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
    }
  ],
  
  resultsHistory: {
    2025: {
      passRate: "100%",
      topGpaCount: 42,
      distinctionRate: "94%",
      schoolAverage: "9.4 / 10",
      toppers: [
        { id: 1, name: "K. Sai Praneeth", gpa: "10.0 / 10", rank: "State 1st Rank", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400", quote: "The IIT Foundation program from 8th class gave me absolute clarity in Math & Physics!" },
        { id: 2, name: "M. Ananya Sree", gpa: "10.0 / 10", rank: "District Topper", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400", quote: "Dedicated faculty guidance and weekly mock tests made board exams feel effortless." },
        { id: 3, name: "R. Teja Vardhan", gpa: "9.8 / 10", rank: "School Rank 3", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400", quote: "Focus on conceptual understanding helped me clear Olympiad 1st stage as well." },
        { id: 4, name: "V. Harini Chowdary", gpa: "9.8 / 10", rank: "School Rank 4", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400", quote: "Disciplined study hours and constant encouragement by teachers kept me motivated." }
      ]
    },
    2024: {
      passRate: "100%",
      topGpaCount: 38,
      distinctionRate: "92%",
      schoolAverage: "9.3 / 10",
      toppers: [
        { id: 5, name: "P. Karthik Varma", gpa: "10.0 / 10", rank: "State 3rd Rank", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400", quote: "Vision School's foundation strength paved my way to top IIT JEE rank!" },
        { id: 6, name: "S. Nikhitha", gpa: "10.0 / 10", rank: "District 2nd Rank", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400", quote: "Excellent lab facilities and interactive smart classes made concepts crystal clear." }
      ]
    },
    2023: {
      passRate: "100%",
      topGpaCount: 35,
      distinctionRate: "90%",
      schoolAverage: "9.2 / 10",
      toppers: [
        { id: 7, name: "B. Rahul Kumar", gpa: "10.0 / 10", rank: "District Topper", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400", quote: "The foundation course prepared me not just for 10th, but for competitive future exams." }
      ]
    }
  },

  notices: [
    { id: 1, title: "Admissions Open for Academic Session 2026-27 (Nursery to Class 10)", category: "Admissions", date: "Sep 05, 2026", isNew: true, details: "Online and offline application forms are now available. Entrance test for IIT Foundation batch scheduled for Sunday." },
    { id: 2, title: "10th Class Pre-Board Examination Schedule Announced", category: "Exams", date: "Sep 02, 2026", isNew: true, details: "Pre-board examinations commence from Oct 15. Detailed subject-wise syllabus is uploaded." },
    { id: 3, title: "Annual Science & Innovation Fair 2026 'IGNITE'", category: "Events", date: "Aug 28, 2026", isNew: false, details: "Students from grades 6-10 will showcase working models, robotics projects, and environmental solutions." }
  ],

  gallery: [
    { id: 1, title: "Annual Sports Day Championship", category: "Sports", type: "image", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800", caption: "Track & field athletics meet." },
    { id: 2, title: "Robotics & Innovation Lab", category: "Academic", type: "image", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800", caption: "Coding & automation projects." },
    { id: 3, title: "Cultural Fest 'Tarang 2026'", category: "Events", type: "image", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800", caption: "Music & dance performances." }
  ],

  videos: [
    { id: 101, title: "Vision School Campus Tour & Annual Day Highlights", category: "Events", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", caption: "Glimpses of campus events and student celebrations." },
    { id: 102, title: "IIT-JEE Foundation Class Demo & Experiments", category: "Academic", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", caption: "Interactive physics experiment session by Dr. K. V. Ramanathan." }
  ],

  faculty: [
    { name: "Dr. K. V. Ramanathan", role: "Dean & Senior Physics Mentor", qualification: "Ph.D. Physics (Ex-IITian)", exp: "22+ Yrs Exp", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400", bio: "Mentor to 500+ Top 1000 Rankers in JEE Advanced." },
    { name: "Mrs. S. Madhavi Latha", role: "Head of Mathematics Dept.", qualification: "M.Sc. Mathematics, B.Ed.", exp: "18+ Yrs Exp", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400", bio: "Specialist in Olympiad level geometry and algebra." },
    { name: "Mr. M. Srinivas Rao", role: "Chemistry Department Lead", qualification: "M.Sc. Organic Chemistry", exp: "16+ Yrs Exp", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400", bio: "Master teacher for physical and organic chemistry." },
    { name: "Dr. P. Swathi", role: "Biology & NEET Foundation Lead", qualification: "M.Sc. Zoology, Ph.D.", exp: "14+ Yrs Exp", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400", bio: "Inspiring future doctors through practical bio demonstrations." }
  ],

  testimonials: [
    { name: "Dr. P. Venkateswarlu", role: "Parent of K. Sai Praneeth (State 1st Ranker)", text: "Vision IIT Foundation School has transformed my son's analytical mindset. The teachers instill true problem-solving skills and discipline." },
    { name: "K. Bhavana (Alumna)", role: "Currently at IIT Bombay (CSE)", text: "The foundation program I underwent in Class 8, 9 & 10 at Vision gave me a massive head start over national peers when I started JEE preparation." },
    { name: "M. Rajeshwara Rao", role: "Parent of 9th Class Student", text: "The balance between board syllabus and IIT foundation coaching is remarkable. My daughter loves going to school every morning!" }
  ],

  faqs: [
    { question: "What makes Vision I.I.T. Foundation School unique?", answer: "We combine strong board curriculum (State aligned) with an integrated IIT-JEE & NEET foundation program starting from Class 6 onwards." },
    { question: "How does the admission process work?", answer: "Admissions begin with an online inquiry or campus visit, followed by a simple diagnostic assessment test." },
    { question: "Is transport facility available for all routes?", answer: "Yes, our school operates a fleet of modern buses covering major city routes with GPS tracking and female attendants on board." }
  ],

  headOfSchool: {
    name: "Dr. K. R. V. Prasad",
    title: "Founder & Chairman",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500",
    quote: "True education builds both intellectual clarity and moral strength.",
    message: "Welcome to Vision I.I.T. Foundation School. Our unique foundation program starts early in middle school, ensuring that students master the core fundamentals of science and mathematics without stress. With a 100% 10th Class Board pass rate and dozens of top 10/10 GPA achievers every year, our dedicated faculty works tirelessly to guide every student toward their dream career."
  }
};
