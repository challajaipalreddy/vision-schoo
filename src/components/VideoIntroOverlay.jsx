import React, { useState, useRef, useEffect } from 'react';

export default function VideoIntroOverlay({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Attempt automatic playback with sound
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().then(() => {
        setHasStarted(true);
      }).catch((err) => {
        console.log("Autoplay with sound waiting for user click:", err);
      });
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const handleVideoEnded = () => {
    setIsVisible(false);
    if (onComplete) {
      onComplete();
    }
  };

  const handleStartPlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().then(() => {
        setHasStarted(true);
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleStartPlay}
      className="fixed inset-0 z-[9999] bg-black text-white flex flex-col justify-between overflow-hidden font-sans cursor-pointer"
    >
      
      {/* Fullscreen Video Container */}
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src="/school_intro.mp4"
          autoPlay
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          className="w-full h-full object-contain max-h-screen"
        />

        {/* Unblock prompt if browser policy pauses sound autoplay */}
        {!hasStarted && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-xs text-center p-4">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse mb-3">
              <svg className="w-8 h-8 text-slate-950 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <h3 className="font-heading font-black text-lg text-white">Vision I.I.T. Foundation School</h3>
            <p className="text-amber-400 text-xs font-bold mt-1">Tap anywhere to start cinematic video intro 🎬</p>
          </div>
        )}
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
            <span>Playing Intro Video...</span>
          </div>
        </div>
      </div>

    </div>
  );
}
