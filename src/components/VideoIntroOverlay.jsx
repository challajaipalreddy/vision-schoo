import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, SkipForward, Play, Sparkles } from 'lucide-react';

export default function VideoIntroOverlay({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Autoplay policy requires muted start
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Attempt autoplay when mounted
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setHasStarted(true);
      }).catch((err) => {
        console.log("Autoplay waiting for user interaction:", err);
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
    finishIntro();
  };

  const finishIntro = () => {
    setIsVisible(false);
    if (onComplete) {
      onComplete();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setHasStarted(true);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-white flex flex-col justify-between overflow-hidden font-sans transition-opacity duration-700 animate-fadeIn">
      
      {/* Top Control Bar */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Vision School Logo" className="w-10 h-10 rounded-xl border border-amber-400/60 shadow" />
          <div>
            <h1 className="font-heading font-black text-sm sm:text-base text-white tracking-wide">
              Vision I.I.T. Foundation School
            </h1>
            <p className="text-[11px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Sattenapalle • School Cinematic Intro</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio Toggle Button */}
          <button
            onClick={toggleMute}
            className="bg-black/60 hover:bg-black/90 backdrop-blur-md text-amber-400 border border-amber-400/40 p-2.5 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 text-xs font-bold px-3.5"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Tap for Sound 🔊</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Sound On</span>
              </>
            )}
          </button>

          {/* Skip Button */}
          <button
            onClick={finishIntro}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-full shadow-xl flex items-center gap-1.5 uppercase tracking-wider transition-all transform hover:scale-105 cursor-pointer"
          >
            <span>Skip Intro</span>
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Video Container */}
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src="/school_intro.mp4"
          autoPlay
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          className="w-full h-full object-contain max-h-screen"
        />

        {/* Fallback Play button if browser blocks autoplay */}
        {!hasStarted && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs">
            <button
              onClick={handleManualPlay}
              className="w-20 h-20 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 mb-4 cursor-pointer"
            >
              <Play className="w-8 h-8 fill-slate-950 translate-x-0.5" />
            </button>
            <p className="text-white font-black text-sm uppercase tracking-wider">Tap to Play Cinematic Intro 🎥</p>
          </div>
        )}
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
        <div className="max-w-4xl mx-auto space-y-1.5">
          <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 h-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-300 uppercase tracking-wider">
            <span>Vision IIT Foundation School</span>
            <span>Entering Website...</span>
          </div>
        </div>
      </div>

    </div>
  );
}
