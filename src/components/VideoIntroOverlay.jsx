import React, { useState, useRef, useEffect } from 'react';

export default function VideoIntroOverlay({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    // 1. Trigger autoplay with muted fallback for mobile/iOS/Android compatibility
    const playVideo = async () => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        try {
          await videoRef.current.play();
        } catch (err) {
          console.log("Autoplay error, retrying on user click:", err);
        }
      }
    };
    playVideo();

    // 2. Safety timeout (14 seconds): Ensure visitors are never stuck on a black screen
    const safetyTimer = setTimeout(() => {
      finishIntro();
    }, 14000);

    return () => clearTimeout(safetyTimer);
  }, []);

  const finishIntro = () => {
    setIsVisible(false);
    if (onComplete) {
      onComplete();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const handleContainerClick = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleContainerClick}
      className="fixed inset-0 z-[9999] bg-black text-white flex flex-col justify-between overflow-hidden font-sans cursor-pointer select-none transition-opacity duration-500"
    >
      
      {/* Fullscreen Video Container */}
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src="/school_intro.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={finishIntro}
          onError={finishIntro}
          className="w-full h-full object-contain max-h-screen"
        />
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/40 to-transparent p-4">
        <div className="max-w-4xl mx-auto space-y-1.5">
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 h-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-extrabold text-slate-300 uppercase tracking-widest">
            <span>Vision I.I.T. Foundation School Sattenapalle</span>
            <span>Intro Video Playing...</span>
          </div>
        </div>
      </div>

    </div>
  );
}
